import Anthropic from '@anthropic-ai/sdk'
import { braveSearch, type BraveSearchResult } from './brave-search'
import {
  computeVerdict,
  type Evidence,
  type SubClaim,
  type OutletAgreement,
  type PrimaryDoc,
  type Retraction,
  type HeadlineFidelity,
} from './grading'
import type { SpectrumBand, Verdict } from './verdict'

const MODEL = 'claude-sonnet-4-5'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export interface ExtractedClaim {
  id: string
  text: string
  searchQuery: string
}

export interface ResearchedClaim extends ExtractedClaim {
  evidence: Evidence
  sources: BraveSearchResult[]
}

export interface DeepGradeResult {
  claims: ResearchedClaim[]
  storyVerdict: string
  storyAnalysis: string
  sourcesFound: number
  weightedScore: number
}

function extractJson(text: string): unknown | null {
  const match = text.match(/\{[\s\S]*\}/)
  if (!match) return null
  try {
    return JSON.parse(match[0])
  } catch {
    return null
  }
}

function asString(v: unknown): string {
  return typeof v === 'string' ? v : ''
}

const ALLOWED_SPECTRUM: SpectrumBand[] = [
  'far-left',
  'left',
  'center-left',
  'center',
  'center-right',
  'right',
  'far-right',
]

function asSpectrum(v: unknown): SpectrumBand {
  return ALLOWED_SPECTRUM.includes(v as SpectrumBand) ? (v as SpectrumBand) : 'center'
}

function asCorroborates(v: unknown): PrimaryDoc['corroborates'] {
  const allowed = ['yes', 'no', 'partial', 'silent'] as const
  return allowed.includes(v as (typeof allowed)[number])
    ? (v as PrimaryDoc['corroborates'])
    : 'silent'
}

function emptyEvidence(): Evidence {
  return {
    outletAgreements: [],
    primaryDocs: [],
    retractions: [],
    headlineFidelity: [{ outlet: 'article', matchesBody: true }],
    subClaims: [],
  }
}

export async function extractClaims(
  headline: string,
  summary: string,
  url: string
): Promise<ExtractedClaim[]> {
  const prompt = `Given this article headline, summary, and URL, extract 3-5 discrete factual claims that can be independently verified. For each claim, also write the best web search query to verify or refute it.

HEADLINE: ${headline}
SUMMARY: ${summary}
URL: ${url}

Return ONLY valid JSON in this exact shape, no prose, no markdown fence:
{"claims": [{"id": "c1", "text": "the factual claim as a single sentence", "searchQuery": "the best web search query to verify or refute it"}]}`

  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    })
    const text = message.content[0]?.type === 'text' ? message.content[0].text : ''
    const parsed = extractJson(text) as { claims?: unknown } | null
    if (!parsed || !Array.isArray(parsed.claims)) return []
    return parsed.claims
      .map((c, i): ExtractedClaim | null => {
        if (!c || typeof c !== 'object') return null
        const obj = c as Record<string, unknown>
        const id = asString(obj.id) || `c${i + 1}`
        const text = asString(obj.text)
        const searchQuery = asString(obj.searchQuery)
        if (!text || !searchQuery) return null
        return { id, text, searchQuery }
      })
      .filter((c): c is ExtractedClaim => c !== null)
  } catch (err) {
    console.error('extractClaims error:', err)
    return []
  }
}

function dedupeByUrl(results: BraveSearchResult[], limit: number): BraveSearchResult[] {
  const seen = new Set<string>()
  const out: BraveSearchResult[] = []
  for (const r of results) {
    if (!r.url || seen.has(r.url)) continue
    seen.add(r.url)
    out.push(r)
    if (out.length >= limit) break
  }
  return out
}

export async function researchClaim(
  claim: ExtractedClaim,
  articleHeadline: string
): Promise<{ sources: BraveSearchResult[]; evidence: Evidence }> {
  const [primary, retraction] = await Promise.all([
    braveSearch(claim.searchQuery, 5),
    braveSearch(`${claim.searchQuery} retraction correction disputed`, 5),
  ])
  const sources = dedupeByUrl([...primary, ...retraction], 8)

  if (sources.length === 0) {
    return { sources, evidence: emptyEvidence() }
  }

  const numbered = sources
    .map((s, i) => `${i + 1}. ${s.title}\n   ${s.snippet}\n   URL: ${s.url}`)
    .join('\n\n')

  const prompt = `You are evaluating evidence for a single factual claim drawn from a news article.

ARTICLE HEADLINE: ${articleHeadline}
CLAIM: ${claim.text}

SEARCH RESULTS:
${numbered}

Assess what these sources say about the claim. Classify each source by political spectrum and whether it agrees with the claim. Identify any primary documents (official reports, government data, court filings, scientific papers) and whether they corroborate the claim. Flag any retractions or corrections.

Return ONLY valid JSON, no prose, no markdown fence:
{
  "outletAgreements": [{"outlet": "outlet name", "spectrum": "left|center-left|center|center-right|right", "agrees": true, "quote": "short quote or paraphrase"}],
  "primaryDocs": [{"title": "doc title", "url": "url", "corroborates": "yes|no|partial|silent"}],
  "retractions": [{"source": "outlet", "date": "YYYY-MM-DD", "description": "what was retracted"}],
  "headlineFidelity": {"matchesBody": true, "explanation": "does the article headline match the underlying facts"},
  "subClaims": []
}`

  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    })
    const text = message.content[0]?.type === 'text' ? message.content[0].text : ''
    const parsed = extractJson(text) as Record<string, unknown> | null
    if (!parsed) return { sources, evidence: emptyEvidence() }

    const outletAgreements: OutletAgreement[] = Array.isArray(parsed.outletAgreements)
      ? parsed.outletAgreements
          .map((o): OutletAgreement | null => {
            if (!o || typeof o !== 'object') return null
            const obj = o as Record<string, unknown>
            const outlet = asString(obj.outlet)
            if (!outlet) return null
            return {
              outlet,
              spectrum: asSpectrum(obj.spectrum),
              agrees: obj.agrees === true,
            }
          })
          .filter((x): x is OutletAgreement => x !== null)
      : []

    const primaryDocs: PrimaryDoc[] = Array.isArray(parsed.primaryDocs)
      ? parsed.primaryDocs
          .map((d, i): PrimaryDoc | null => {
            if (!d || typeof d !== 'object') return null
            const obj = d as Record<string, unknown>
            const title = asString(obj.title)
            const url = asString(obj.url)
            if (!title && !url) return null
            return {
              id: url || `${claim.id}-doc-${i}`,
              source: title || url,
              corroborates: asCorroborates(obj.corroborates),
            }
          })
          .filter((x): x is PrimaryDoc => x !== null)
      : []

    const retractions: Retraction[] = Array.isArray(parsed.retractions)
      ? parsed.retractions
          .map((r): Retraction | null => {
            if (!r || typeof r !== 'object') return null
            const obj = r as Record<string, unknown>
            const outlet = asString(obj.source) || asString(obj.outlet)
            if (!outlet) return null
            return {
              outlet,
              date: asString(obj.date),
              reason: asString(obj.description) || asString(obj.reason),
              independentAgreement: false,
            }
          })
          .filter((x): x is Retraction => x !== null)
      : []

    const hfRaw = parsed.headlineFidelity as Record<string, unknown> | undefined
    const headlineFidelity: HeadlineFidelity[] = [
      {
        outlet: 'article',
        matchesBody: hfRaw?.matchesBody !== false,
      },
    ]

    const subClaims: SubClaim[] = Array.isArray(parsed.subClaims) ? (parsed.subClaims as SubClaim[]) : []

    return {
      sources,
      evidence: { outletAgreements, primaryDocs, retractions, headlineFidelity, subClaims },
    }
  } catch (err) {
    console.error('researchClaim error:', err)
    return { sources, evidence: emptyEvidence() }
  }
}

const VERDICT_SCORE: Record<Verdict, number> = {
  verified: 90,
  corroborated: 75,
  mixed: 50,
  disputed: 30,
  false: 10,
  unverified: 40,
}

function synthesizeStoryVerdict(verdicts: Verdict[]): string {
  if (verdicts.length === 0) return 'unverified'
  if (verdicts.some((v) => v === 'false')) return 'disputed'
  if (verdicts.every((v) => v === 'verified')) return 'verified'
  const strong = verdicts.filter((v) => v === 'verified' || v === 'corroborated').length
  if (strong > verdicts.length / 2) return 'corroborated'
  return 'mixed'
}

async function writeStoryAnalysis(
  article: { headline: string; summary: string },
  researched: ResearchedClaim[],
  verdicts: Verdict[],
  sourcesFound: number
): Promise<string> {
  const breakdown = researched
    .map((r, i) => `${i + 1}. "${r.text}" → ${verdicts[i]}`)
    .join('\n')

  const prompt = `Write a 2-3 sentence honest assessment of what was found while fact-checking this article. Be direct. Cite that ${sourcesFound} web sources were consulted across ${researched.length} claims.

ARTICLE: ${article.headline}
SUMMARY: ${article.summary}

CLAIM VERDICTS:
${breakdown}

Return only the 2-3 sentence assessment, no preamble.`

  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }],
    })
    const text = message.content[0]?.type === 'text' ? message.content[0].text.trim() : ''
    return text || `Reviewed ${researched.length} claims against ${sourcesFound} web sources.`
  } catch (err) {
    console.error('writeStoryAnalysis error:', err)
    return `Reviewed ${researched.length} claims against ${sourcesFound} web sources.`
  }
}

export async function deepGradeArticle(article: {
  headline: string
  summary: string
  url: string
  outlet: string
}): Promise<DeepGradeResult> {
  const extracted = await extractClaims(article.headline, article.summary, article.url)
  if (extracted.length === 0) {
    return {
      claims: [],
      storyVerdict: 'unverified',
      storyAnalysis: 'No verifiable claims could be extracted from this article.',
      sourcesFound: 0,
      weightedScore: 0,
    }
  }

  const researched = await Promise.all(
    extracted.map(async (c): Promise<ResearchedClaim> => {
      const { sources, evidence } = await researchClaim(c, article.headline)
      return { ...c, sources, evidence }
    })
  )

  const verdicts: Verdict[] = researched.map((r) => computeVerdict(r.evidence).verdict)
  const storyVerdict = synthesizeStoryVerdict(verdicts)
  const weightedScore =
    verdicts.reduce((sum, v) => sum + VERDICT_SCORE[v], 0) / verdicts.length

  const allUrls = new Set<string>()
  for (const r of researched) for (const s of r.sources) if (s.url) allUrls.add(s.url)
  const sourcesFound = allUrls.size

  const storyAnalysis = await writeStoryAnalysis(article, researched, verdicts, sourcesFound)

  return {
    claims: researched,
    storyVerdict,
    storyAnalysis,
    sourcesFound,
    weightedScore,
  }
}
