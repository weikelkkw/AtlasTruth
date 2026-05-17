import { PALETTE } from '@/design/constants'

export interface Watchlist {
  id: string
  name: string
  topic: string
  claimCount: number
  lastUpdated: string
  spark: number[]
  accent: string
}

const spark = (seed: number): number[] => {
  const out: number[] = []
  let v = seed
  for (let i = 0; i < 14; i++) {
    v += Math.round((Math.sin(i * 0.9 + seed) + Math.cos(i * 0.4)) * 4)
    out.push(Math.max(8, Math.min(80, v)))
  }
  return out
}

export const SAMPLE_WATCHLISTS: Watchlist[] = [
  {
    id: 'wl-1',
    name: 'SCOTUS coverage',
    topic: 'U.S. Supreme Court · per-claim cross-spectrum',
    claimCount: 42,
    lastUpdated: '2026-05-17 06:14',
    spark: spark(28),
    accent: PALETTE.brassRgb,
  },
  {
    id: 'wl-2',
    name: 'EU climate policy',
    topic: 'European Commission · climate dossier',
    claimCount: 28,
    lastUpdated: '2026-05-17 04:02',
    spark: spark(34),
    accent: PALETTE.emeraldRgb,
  },
  {
    id: 'wl-3',
    name: 'AI capability claims',
    topic: 'Frontier-lab benchmarks · model releases',
    claimCount: 19,
    lastUpdated: '2026-05-16 22:18',
    spark: spark(40),
    accent: PALETTE.cyanRgb,
  },
  {
    id: 'wl-4',
    name: 'Fed open-market statements',
    topic: 'FOMC · governor speeches',
    claimCount: 16,
    lastUpdated: '2026-05-16 17:50',
    spark: spark(46),
    accent: PALETTE.violetRgb,
  },
  {
    id: 'wl-5',
    name: 'Crime-stat reporting',
    topic: 'FBI UCR · city-level violent crime',
    claimCount: 11,
    lastUpdated: '2026-05-15 09:00',
    spark: spark(22),
    accent: PALETTE.amberRgb,
  },
  {
    id: 'wl-6',
    name: 'Ukraine theatre coverage',
    topic: 'Front-line reporting · DoD briefings',
    claimCount: 33,
    lastUpdated: '2026-05-17 07:22',
    spark: spark(38),
    accent: PALETTE.brassRgb,
  },
]

export function buildSparkPath(values: number[], w: number, h: number): string {
  if (values.length === 0) return ''
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = Math.max(max - min, 1)
  const step = w / Math.max(values.length - 1, 1)
  return values
    .map((v, i) => {
      const x = i * step
      const y = h - ((v - min) / span) * h
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}
