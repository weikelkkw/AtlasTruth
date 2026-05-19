import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { deepGradeArticle } from '@/lib/deep-grader'

const GNEWS_CATEGORIES = ['general', 'world', 'nation', 'business', 'technology', 'science', 'sports', 'health']

interface GNewsArticle {
  title: string
  description: string
  content: string
  url: string
  source: { name: string; url: string }
  publishedAt: string
}

async function fetchGNews(category: string): Promise<GNewsArticle[]> {
  const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${process.env.GNEWS_API_KEY}`
  const res = await fetch(url, { next: { revalidate: 0 } })
  if (!res.ok) return []
  const data = await res.json()
  return data.articles ?? []
}

function dedupeByUrl(articles: { url: string }[]): { url: string }[] {
  const seen = new Set<string>()
  const out: { url: string }[] = []
  for (const a of articles) {
    if (!a.url || seen.has(a.url)) continue
    seen.add(a.url)
    out.push(a)
  }
  return out
}

export async function POST() {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO stories (
      id, headline, outlet, category, published_at, summary, url,
      score_accuracy, score_context, score_source_transparency,
      score_sensationalism, score_originality_bias,
      weighted_score, verdict, analysis_notes, graded_at,
      claims_json, research_depth, sources_found
    ) VALUES (
      @id, @headline, @outlet, @category, @published_at, @summary, @url,
      NULL, NULL, NULL, NULL, NULL,
      @weighted_score, @verdict, @analysis_notes, @graded_at,
      @claims_json, @research_depth, @sources_found
    )
  `)

  const logInsert = db.prepare(`
    INSERT INTO ingestion_log (source, fetched, inserted, skipped, errors)
    VALUES (@source, @fetched, @inserted, @skipped, @errors)
  `)

  const combined: (GNewsArticle & { category: string })[] = []
  for (const category of GNEWS_CATEGORIES) {
    const articles = await fetchGNews(category)
    for (const a of articles) combined.push({ ...a, category })
  }
  const deduped = dedupeByUrl(combined) as (GNewsArticle & { category: string })[]
  const top10 = deduped.slice(0, 10)

  let processed = 0
  let inserted = 0
  let skipped = 0
  let errors = 0

  for (const article of top10) {
    processed++
    try {
      const existing = db.prepare('SELECT id FROM stories WHERE url = ?').get(article.url)
      if (existing) { skipped++; continue }

      const result = await deepGradeArticle({
        headline: article.title,
        summary: article.description ?? '',
        url: article.url,
        outlet: article.source.name,
      })

      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      insert.run({
        id,
        headline: article.title,
        outlet: article.source.name,
        category: article.category,
        published_at: article.publishedAt,
        summary: article.description ?? '',
        url: article.url,
        weighted_score: result.weightedScore,
        verdict: result.storyVerdict,
        analysis_notes: result.storyAnalysis,
        graded_at: new Date().toISOString(),
        claims_json: JSON.stringify(result.claims),
        research_depth: 'deep',
        sources_found: result.sourcesFound,
      })
      inserted++
    } catch (err) {
      console.error('deep-ingest article error:', err)
      errors++
    }
  }

  logInsert.run({
    source: 'deep-ingest:gnews',
    fetched: top10.length,
    inserted,
    skipped,
    errors,
  })

  return NextResponse.json({
    ok: true,
    processed,
    inserted,
    skipped,
    errors,
  })
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST to trigger deep ingestion' }, { status: 405 })
}
