import { CLAIMS } from './claims'
import { OUTLETS } from './outlets'

export interface Story {
  id: string
  headline: string
  dek: string
  category: 'us' | 'world' | 'politics' | 'business' | 'science' | 'tech' | 'breaking'
  age: string
  outletSlugs: string[]
  publishedAt: string
}

export const STORIES: Story[] = [
  {
    id: 's-001',
    headline: 'Senate passes SAFE Frontier Act after 17-hour debate',
    dek: 'A bipartisan 58–42 vote sends the bill to the House.',
    category: 'politics',
    age: '3d',
    outletSlugs: ['reuters', 'ap', 'wsj', 'nyt', 'foxnews', 'bbc', 'guardian', 'politico'],
    publishedAt: '2026-05-14T19:14:00Z',
  },
  {
    id: 's-002',
    headline: 'BEA revises Q1 GDP growth down to 1.4%',
    dek: 'The downward revision came in below consensus and shifted Fed expectations.',
    category: 'business',
    age: '5d',
    outletSlugs: ['reuters', 'ap', 'bloomberg', 'ft', 'wsj', 'axios'],
    publishedAt: '2026-05-12T13:30:00Z',
  },
  {
    id: 's-003',
    headline: 'Daily Mail retracts story claiming chancellor had resigned',
    dek: 'The wire on this one moved fast — and was wrong.',
    category: 'world',
    age: '6d',
    outletSlugs: ['dailymail', 'reuters', 'bbc', 'guardian', 'ft'],
    publishedAt: '2026-05-11T07:00:00Z',
  },
  {
    id: 's-004',
    headline: 'Nature: Atlantic cod populations down 38% since 2010',
    dek: 'Peer-reviewed study draws on 14 years of fisheries data.',
    category: 'science',
    age: '7d',
    outletSlugs: ['reuters', 'bbc', 'guardian', 'nyt', 'theatlantic'],
    publishedAt: '2026-05-10T15:00:00Z',
  },
  {
    id: 's-005',
    headline: 'Anthropic closes $4.5B Series F',
    dek: 'A sovereign-wealth consortium led the round at a $185B valuation.',
    category: 'tech',
    age: '8d',
    outletSlugs: ['reuters', 'bloomberg', 'ft', 'wsj', 'theatlantic'],
    publishedAt: '2026-05-09T12:00:00Z',
  },
  {
    id: 's-006',
    headline: 'Edited PM clip ricochets across partisan press',
    dek: 'A 12-second clip generated a 36-hour news cycle. The transcript is here.',
    category: 'world',
    age: '4d',
    outletSlugs: ['nypost', 'dailymail', 'breitbart', 'bbc', 'reuters', 'guardian'],
    publishedAt: '2026-05-13T18:00:00Z',
  },
  {
    id: 's-007',
    headline: 'Campaign trail "crime crisis" claim splits the spectrum',
    dek: 'Part of the framing is supported by FBI UCR data — part of it is not.',
    category: 'us',
    age: '4d',
    outletSlugs: ['foxnews', 'wsj', 'nypost', 'thehill', 'nyt', 'wapo', 'guardian'],
    publishedAt: '2026-05-13T21:00:00Z',
  },
  {
    id: 's-008',
    headline: 'BREAKING · Tanker explosion reported off Singapore',
    dek: 'Single-source report. No primary documents yet. Atlas Truth does not grade this claim.',
    category: 'breaking',
    age: '5h',
    outletSlugs: ['reuters'],
    publishedAt: '2026-05-17T03:30:00Z',
  },
  {
    id: 's-009',
    headline: 'EU approves €12B green-hydrogen subsidy package',
    dek: 'The Commission moved a vote it had been signaling for months.',
    category: 'world',
    age: '1d',
    outletSlugs: ['ft', 'reuters', 'bbc', 'guardian', 'economist', 'politico'],
    publishedAt: '2026-05-16T11:00:00Z',
  },
  {
    id: 's-010',
    headline: 'Fed governor: rate cuts "remain on the table this summer"',
    dek: 'A speech in Chicago triggered a market move on the long end.',
    category: 'business',
    age: '2d',
    outletSlugs: ['bloomberg', 'reuters', 'ft', 'wsj'],
    publishedAt: '2026-05-15T17:00:00Z',
  },
]

export function storyById(id: string): Story | undefined {
  return STORIES.find((s) => s.id === id)
}

export function outletsForStory(id: string) {
  const story = storyById(id)
  if (!story) return []
  return story.outletSlugs
    .map((slug) => OUTLETS.find((o) => o.slug === slug))
    .filter(Boolean) as (typeof OUTLETS)[number][]
}

export function claimsForStory(id: string) {
  return CLAIMS.filter((c) => c.storyId === id)
}
