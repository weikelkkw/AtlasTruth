export const FONT = {
  display: 'var(--font-cormorant), Georgia, serif',
  body: 'var(--font-dm-sans), system-ui, sans-serif',
  label: 'var(--font-syncopate), system-ui, sans-serif',
} as const

export const PALETTE = {
  base: '#05050b',
  baseSoft: '#0a0a14',
  text: '#f5f5f7',
  textSub: 'rgba(245,245,247,0.78)',
  textMuted: 'rgba(245,245,247,0.55)',
  glass: 'rgba(255,255,255,0.04)',
  glassBorder: 'rgba(255,255,255,0.08)',

  brass: '#e8c376',
  brassRgb: '232,195,118',
  cyan: '#22d3ee',
  cyanRgb: '34,211,238',
  violet: '#a78bfa',
  violetRgb: '167,139,250',
  emerald: '#10b981',
  emeraldRgb: '16,185,129',
  amber: '#f59e0b',
  amberRgb: '245,158,11',
  danger: '#ef4444',
  dangerRgb: '239,68,68',
  lossText: '#fca5a5',

  pillar: {
    headlines: { hex: '#e8c376', rgb: '232,195,118', secondary: '34,211,238' },
    claim: { hex: '#22d3ee', rgb: '34,211,238', secondary: '232,195,118' },
    networks: { hex: '#a78bfa', rgb: '167,139,250', secondary: '232,195,118' },
    track: { hex: '#10b981', rgb: '16,185,129', secondary: '232,195,118' },
    methodology: { hex: '#e8c376', rgb: '232,195,118', secondary: '167,139,250' },
  },
} as const

export type PillarSlug = keyof typeof PALETTE.pillar

export const SPRING = 'cubic-bezier(0.2, 0.8, 0.2, 1)'

export const METHODOLOGY_VERSION = 'v0.1.0-alpha'
