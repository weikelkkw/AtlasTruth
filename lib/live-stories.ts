import db from './db'

export type UICategory =
  | 'us'
  | 'world'
  | 'politics'
  | 'business'
  | 'science'
  | 'tech'
  | 'breaking'

export interface GradedStory {
  id: string
  headline: string
  summary: string
  url: string
  outlet: string
  category: string
  uiCategory: UICategory
  publishedAt: string
  age: string
  weightedScore: number | null
  verdict: string | null
  analysisNotes: string | null
  scoreAccuracy: number | null
  scoreContext: number | null
  scoreSourceTransparency: number | null
  scoreSensationalism: number | null
  scoreOriginalityBias: number | null
  gradedAt: string | null
}

export const CATEGORY_MAP: Record<string, UICategory> = {
  general: 'us',
  world: 'world',
  nation: 'us',
  business: 'business',
  technology: 'tech',
  science: 'science',
  sports: 'us',
  health: 'science',
}

export function computeAge(publishedAt: string): string {
  const then = new Date(publishedAt).getTime()
  if (!Number.isFinite(then)) return ''
  const diffMs = Date.now() - then
  if (diffMs < 0) return 'now'

  const seconds = Math.floor(diffMs / 1000)
  if (seconds < 60) return 'now'

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h`

  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d`

  const weeks = Math.floor(days / 7)
  return `${weeks}w`
}

function asString(v: unknown): string {
  return typeof v === 'string' ? v : ''
}

function asNullableString(v: unknown): string | null {
  return typeof v === 'string' ? v : null
}

function asNullableNumber(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? v : null
}

export function rowToGradedStory(row: Record<string, unknown>): GradedStory {
  const category = asString(row.category)
  const publishedAt = asString(row.published_at)
  return {
    id: asString(row.id),
    headline: asString(row.headline),
    summary: asString(row.summary),
    url: asString(row.url),
    outlet: asString(row.outlet),
    category,
    uiCategory: CATEGORY_MAP[category] ?? 'us',
    publishedAt,
    age: computeAge(publishedAt),
    weightedScore: asNullableNumber(row.weighted_score),
    verdict: asNullableString(row.verdict),
    analysisNotes: asNullableString(row.analysis_notes),
    scoreAccuracy: asNullableNumber(row.score_accuracy),
    scoreContext: asNullableNumber(row.score_context),
    scoreSourceTransparency: asNullableNumber(row.score_source_transparency),
    scoreSensationalism: asNullableNumber(row.score_sensationalism),
    scoreOriginalityBias: asNullableNumber(row.score_originality_bias),
    gradedAt: asNullableString(row.graded_at),
  }
}

export function getLiveStories(limit: number = 50): GradedStory[] {
  const rows = db
    .prepare('SELECT * FROM stories ORDER BY published_at DESC LIMIT ?')
    .all(limit) as Record<string, unknown>[]
  return rows.map(rowToGradedStory)
}
