import type { Verdict } from '@/lib/verdict'
import { computeVerdict, type DecisionTrace, type Evidence } from '@/lib/grading'
import { OUTLETS } from './outlets'

export interface Claim {
  id: string
  storyId: string
  text: string
  evidence: Evidence
  trace: DecisionTrace
  category: 'us' | 'world' | 'politics' | 'business' | 'science' | 'tech'
  publishedAt: string
  updatedAt: string
  dissents: number
}

function pick(slugs: string[]) {
  return slugs
    .map((s) => OUTLETS.find((o) => o.slug === s))
    .filter(Boolean) as (typeof OUTLETS)[number][]
}

function evidenceFor(opts: {
  agreeing: string[]
  disagreeing?: string[]
  primaryDocs?: Evidence['primaryDocs']
  retractions?: Evidence['retractions']
  headlineFidelity?: Evidence['headlineFidelity']
  subClaims?: Evidence['subClaims']
}): Evidence {
  return {
    outletAgreements: [
      ...pick(opts.agreeing).map((o) => ({
        outlet: o.name,
        spectrum: o.spectrum,
        agrees: true,
      })),
      ...pick(opts.disagreeing ?? []).map((o) => ({
        outlet: o.name,
        spectrum: o.spectrum,
        agrees: false,
      })),
    ],
    primaryDocs: opts.primaryDocs ?? [],
    retractions: opts.retractions ?? [],
    headlineFidelity:
      opts.headlineFidelity ??
      pick(opts.agreeing).map((o) => ({ outlet: o.name, matchesBody: true })),
    subClaims: opts.subClaims,
  }
}

interface ClaimSeed {
  id: string
  storyId: string
  text: string
  category: Claim['category']
  publishedAt: string
  updatedAt: string
  dissents: number
  build: () => Evidence
}

const SEEDS: ClaimSeed[] = [
  {
    id: 'c-001',
    storyId: 's-001',
    text: 'On May 14, 2026, the U.S. Senate passed the SAFE Frontier Act with a 58–42 vote.',
    category: 'politics',
    publishedAt: '2026-05-14T19:14:00Z',
    updatedAt: '2026-05-17T08:00:00Z',
    dissents: 3,
    build: () =>
      evidenceFor({
        agreeing: ['reuters', 'ap', 'wsj', 'nyt', 'foxnews', 'bbc', 'guardian', 'politico'],
        primaryDocs: [
          {
            id: 'doc-119-s-274',
            source: 'congress.gov roll-call 119-S-274',
            corroborates: 'yes',
          },
        ],
      }),
  },
  {
    id: 'c-002',
    storyId: 's-001',
    text: 'The bill includes $4.2 billion in new border-security spending.',
    category: 'politics',
    publishedAt: '2026-05-14T20:00:00Z',
    updatedAt: '2026-05-17T08:00:00Z',
    dissents: 5,
    build: () =>
      evidenceFor({
        agreeing: ['reuters', 'ap', 'wsj', 'nyt', 'foxnews', 'politico', 'bbc'],
        primaryDocs: [
          { id: 'doc-bill-text-119-274', source: 'congress.gov bill text', corroborates: 'yes' },
        ],
      }),
  },
  {
    id: 'c-003',
    storyId: 's-001',
    text: 'Senator Cole was the only member of her party to vote against the bill.',
    category: 'politics',
    publishedAt: '2026-05-15T01:00:00Z',
    updatedAt: '2026-05-17T08:00:00Z',
    dissents: 2,
    build: () =>
      evidenceFor({
        agreeing: ['politico', 'nyt', 'wsj'],
        disagreeing: ['foxnews'],
        primaryDocs: [
          { id: 'doc-119-s-274', source: 'congress.gov roll-call 119-S-274', corroborates: 'partial' },
        ],
      }),
  },
  {
    id: 'c-004',
    storyId: 's-002',
    text: 'Q1 2026 U.S. GDP growth was revised down to 1.4% from an initial 1.8%.',
    category: 'business',
    publishedAt: '2026-05-12T13:30:00Z',
    updatedAt: '2026-05-17T08:00:00Z',
    dissents: 1,
    build: () =>
      evidenceFor({
        agreeing: ['reuters', 'ap', 'bloomberg', 'ft', 'wsj', 'cnbc-like-axios'.replace('cnbc-like-axios','axios')],
        primaryDocs: [
          { id: 'doc-bea-q1-rev', source: 'BEA Q1 2026 revision release', corroborates: 'yes' },
        ],
      }),
  },
  {
    id: 'c-005',
    storyId: 's-003',
    text: 'A retracted Daily Mail story claimed the chancellor had resigned hours before the budget speech.',
    category: 'world',
    publishedAt: '2026-05-11T07:00:00Z',
    updatedAt: '2026-05-17T08:00:00Z',
    dissents: 8,
    build: () =>
      evidenceFor({
        agreeing: ['dailymail'],
        disagreeing: ['reuters', 'bbc', 'guardian', 'ft'],
        retractions: [
          {
            outlet: 'Daily Mail',
            date: '2026-05-11',
            reason: 'Claim retracted after No. 10 statement contradicted it.',
            independentAgreement: true,
          },
        ],
        headlineFidelity: [
          { outlet: 'Daily Mail', matchesBody: false },
        ],
      }),
  },
  {
    id: 'c-006',
    storyId: 's-004',
    text: 'A peer-reviewed Nature study published May 10 reports a 38% reduction in Atlantic cod populations since 2010.',
    category: 'science',
    publishedAt: '2026-05-10T15:00:00Z',
    updatedAt: '2026-05-17T08:00:00Z',
    dissents: 0,
    build: () =>
      evidenceFor({
        agreeing: ['reuters', 'bbc', 'guardian', 'nyt', 'theatlantic'],
        primaryDocs: [
          { id: 'doc-nature-2026-05', source: 'Nature 631, 421–425 (2026)', corroborates: 'yes' },
        ],
      }),
  },
  {
    id: 'c-007',
    storyId: 's-005',
    text: 'Anthropic raised $4.5B in a Series F led by a sovereign-wealth consortium.',
    category: 'tech',
    publishedAt: '2026-05-09T12:00:00Z',
    updatedAt: '2026-05-17T08:00:00Z',
    dissents: 2,
    build: () =>
      evidenceFor({
        agreeing: ['reuters', 'bloomberg', 'ft', 'wsj', 'theatlantic'],
        primaryDocs: [
          { id: 'doc-sec-form-d', source: 'SEC EDGAR Form D filing', corroborates: 'yes' },
        ],
      }),
  },
  {
    id: 'c-008',
    storyId: 's-006',
    text: 'A widely-shared clip showed the prime minister "endorsing a third-party candidate" — but the full transcript shows the opposite.',
    category: 'world',
    publishedAt: '2026-05-13T18:00:00Z',
    updatedAt: '2026-05-17T08:00:00Z',
    dissents: 11,
    build: () =>
      evidenceFor({
        agreeing: ['nypost', 'dailymail', 'breitbart'],
        disagreeing: ['bbc', 'reuters', 'guardian'],
        primaryDocs: [
          {
            id: 'doc-press-transcript-2026-05-13',
            source: 'No. 10 press transcript (full)',
            corroborates: 'no',
          },
        ],
        headlineFidelity: [
          { outlet: 'New York Post', matchesBody: false },
          { outlet: 'Daily Mail', matchesBody: false },
          { outlet: 'Breitbart', matchesBody: false },
        ],
      }),
  },
  {
    id: 'c-009',
    storyId: 's-007',
    text: 'A campaign claim that "crime is at a 30-year high" combines a true homicide-rate uptick in 12 cities with a misleading national framing.',
    category: 'us',
    publishedAt: '2026-05-13T21:00:00Z',
    updatedAt: '2026-05-17T08:00:00Z',
    dissents: 4,
    build: () =>
      evidenceFor({
        agreeing: ['foxnews', 'wsj', 'nypost', 'thehill'],
        disagreeing: ['nyt', 'wapo', 'guardian'],
        primaryDocs: [
          { id: 'doc-fbi-ucr-2026', source: 'FBI UCR 2026 release', corroborates: 'partial' },
        ],
        subClaims: [
          { text: 'Homicide rate rose in 12 of the 50 largest cities Q1 YoY.', verdict: 'verified' },
          { text: 'Aggregate national violent-crime rate is at a 30-year high.', verdict: 'false' },
        ],
      }),
  },
  {
    id: 'c-010',
    storyId: 's-008',
    text: 'Initial single-source reports of an oil-tanker explosion off the Singapore coast.',
    category: 'world',
    publishedAt: '2026-05-17T03:30:00Z',
    updatedAt: '2026-05-17T08:00:00Z',
    dissents: 0,
    build: () =>
      evidenceFor({
        agreeing: ['reuters'],
      }),
  },
  {
    id: 'c-011',
    storyId: 's-009',
    text: 'The EU Commission approved a €12B green-hydrogen subsidy package on May 16.',
    category: 'world',
    publishedAt: '2026-05-16T11:00:00Z',
    updatedAt: '2026-05-17T08:00:00Z',
    dissents: 1,
    build: () =>
      evidenceFor({
        agreeing: ['ft', 'reuters', 'bbc', 'guardian', 'economist', 'politico'],
        primaryDocs: [
          { id: 'doc-eu-c-2026-431', source: 'European Commission press release C(2026)431', corroborates: 'yes' },
        ],
      }),
  },
  {
    id: 'c-012',
    storyId: 's-010',
    text: 'A Fed governor stated in a speech that rate cuts "remain on the table this summer."',
    category: 'business',
    publishedAt: '2026-05-15T17:00:00Z',
    updatedAt: '2026-05-17T08:00:00Z',
    dissents: 0,
    build: () =>
      evidenceFor({
        agreeing: ['bloomberg', 'reuters', 'ft', 'wsj'],
        primaryDocs: [
          { id: 'doc-fed-speech-2026-05-15', source: 'Federal Reserve speech transcript', corroborates: 'yes' },
        ],
      }),
  },
]

export const CLAIMS: Claim[] = SEEDS.map((s) => {
  const evidence = s.build()
  const trace = computeVerdict(evidence)
  return {
    id: s.id,
    storyId: s.storyId,
    text: s.text,
    evidence,
    trace,
    category: s.category,
    publishedAt: s.publishedAt,
    updatedAt: s.updatedAt,
    dissents: s.dissents,
  }
})

export function claimById(id: string): Claim | undefined {
  return CLAIMS.find((c) => c.id === id)
}

export function claimsByStory(storyId: string): Claim[] {
  return CLAIMS.filter((c) => c.storyId === storyId)
}

export type ClaimSummary = {
  id: string
  text: string
  verdict: Verdict
  outletCount: number
  agreeCount: number
  disagreeCount: number
  primaryDocCount: number
  subClaims?: { text: string; verdict: Verdict }[]
}

export function summarize(c: Claim): ClaimSummary {
  const agree = c.evidence.outletAgreements.filter((a) => a.agrees).length
  const disagree = c.evidence.outletAgreements.filter((a) => !a.agrees).length
  return {
    id: c.id,
    text: c.text,
    verdict: c.trace.verdict,
    outletCount: c.evidence.outletAgreements.length,
    agreeCount: agree,
    disagreeCount: disagree,
    primaryDocCount: c.evidence.primaryDocs.length,
    subClaims: c.evidence.subClaims,
  }
}
