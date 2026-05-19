import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { computeWeightedScore } from '@/lib/grading';
import { getVerdict } from '@/lib/verdict';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const GNEWS_CATEGORIES = ['general', 'world', 'nation', 'business', 'technology', 'science', 'sports', 'health'];

async function fetchGNews(category: string): Promise<GNewsArticle[]> {
  const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${process.env.GNEWS_API_KEY}`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.articles ?? [];
}

interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  source: { name: string; url: string };
  publishedAt: string;
}

async function gradeArticle(article: GNewsArticle, category: string) {
  const prompt = `You are the Atlas Truth editorial analysis engine. Grade this news article on 5 pillars using the Atlas Truth methodology v0.1.0-alpha.

ARTICLE:
Headline: ${article.title}
Outlet: ${article.source.name}
Category: ${category}
Summary: ${article.description ?? ''}
Content excerpt: ${(article.content ?? '').slice(0, 800)}

INSTRUCTIONS:
Score each pillar 0-100 (100 = best). Be rigorous. A score of 80+ means genuinely excellent. Most articles should score 40-75 range.

Respond with ONLY valid JSON in this exact format:
{
  "accuracy": <0-100>,
  "context": <0-100>,
  "sourceTransparency": <0-100>,
  "sensationalism": <0-100>,
  "originalityBias": <0-100>,
  "analysisNotes": "<2-3 sentence honest assessment of what the article does well and poorly>"
}

PILLAR DEFINITIONS:
- accuracy (30% weight): Are claims factually verifiable? Are statistics cited correctly?
- context (25% weight): Does the article give adequate background? Does it avoid misleading omissions?
- sourceTransparency (20% weight): Are sources named and attributed? Can claims be traced?
- sensationalism (15% weight): Is the headline proportionate to the content? Avoid emotional manipulation?
- originalityBias (10% weight): Does the framing reflect a specific ideological lean? Is it balanced?`;

  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 400,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = message.content[0].type === 'text' ? message.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON in grading response');
  return JSON.parse(jsonMatch[0]);
}

export async function POST() {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO stories (
      id, headline, outlet, category, published_at, summary, url,
      score_accuracy, score_context, score_source_transparency,
      score_sensationalism, score_originality_bias,
      weighted_score, verdict, analysis_notes, graded_at
    ) VALUES (
      @id, @headline, @outlet, @category, @published_at, @summary, @url,
      @score_accuracy, @score_context, @score_source_transparency,
      @score_sensationalism, @score_originality_bias,
      @weighted_score, @verdict, @analysis_notes, @graded_at
    )
  `);

  const logInsert = db.prepare(`
    INSERT INTO ingestion_log (source, fetched, inserted, skipped, errors)
    VALUES (@source, @fetched, @inserted, @skipped, @errors)
  `);

  let totalFetched = 0;
  let totalInserted = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const category of GNEWS_CATEGORIES) {
    const articles = await fetchGNews(category);
    totalFetched += articles.length;

    for (const article of articles) {
      try {
        const existing = db.prepare('SELECT id FROM stories WHERE url = ?').get(article.url);
        if (existing) { totalSkipped++; continue; }

        const grades = await gradeArticle(article, category);
        const pillarScores = {
          accuracy: grades.accuracy,
          context: grades.context,
          sourceTransparency: grades.sourceTransparency,
          sensationalism: grades.sensationalism,
          originalityBias: grades.originalityBias,
        };
        const weightedScore = computeWeightedScore(pillarScores);
        const verdict = getVerdict(weightedScore);

        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        insert.run({
          id,
          headline: article.title,
          outlet: article.source.name,
          category,
          published_at: article.publishedAt,
          summary: article.description ?? '',
          url: article.url,
          score_accuracy: grades.accuracy,
          score_context: grades.context,
          score_source_transparency: grades.sourceTransparency,
          score_sensationalism: grades.sensationalism,
          score_originality_bias: grades.originalityBias,
          weighted_score: weightedScore,
          verdict,
          analysis_notes: grades.analysisNotes,
          graded_at: new Date().toISOString(),
        });
        totalInserted++;
      } catch {
        totalErrors++;
      }
    }

    logInsert.run({
      source: `gnews:${category}`,
      fetched: articles.length,
      inserted: totalInserted,
      skipped: totalSkipped,
      errors: totalErrors,
    });
  }

  return NextResponse.json({
    ok: true,
    fetched: totalFetched,
    inserted: totalInserted,
    skipped: totalSkipped,
    errors: totalErrors,
  });
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST to trigger ingestion' }, { status: 405 });
}
