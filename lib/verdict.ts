export type Verdict =
  | 'verified'
  | 'corroborated'
  | 'mixed'
  | 'disputed'
  | 'false'
  | 'unverified'

export interface VerdictTreatment {
  label: string
  rgb: string
  rgbAlt?: string
  shimmer: boolean
  textColor?: string
  textShadow?: string
  badgeShadow?: string
  split: boolean
  iconName: string
}

export const VERDICT: Record<Verdict, VerdictTreatment> = {
  verified: {
    label: 'VERIFIED',
    rgb: '16,185,129',
    shimmer: true,
    badgeShadow: '0 0 18px rgba(16,185,129,0.45)',
    split: false,
    iconName: 'shield',
  },
  corroborated: {
    label: 'CORROBORATED',
    rgb: '232,195,118',
    shimmer: true,
    badgeShadow: '0 0 18px rgba(232,195,118,0.45)',
    split: false,
    iconName: 'check',
  },
  mixed: {
    label: 'MIXED',
    rgb: '16,185,129',
    rgbAlt: '239,68,68',
    shimmer: false,
    textColor: '#e5e7eb',
    badgeShadow:
      '0 0 14px rgba(16,185,129,0.30), 0 0 14px rgba(239,68,68,0.30)',
    split: true,
    iconName: 'split',
  },
  disputed: {
    label: 'DISPUTED',
    rgb: '245,158,11',
    shimmer: false,
    textColor: '#fbbf24',
    badgeShadow: '0 0 14px rgba(245,158,11,0.35)',
    split: false,
    iconName: 'alert',
  },
  false: {
    label: 'FALSE',
    rgb: '239,68,68',
    shimmer: false,
    textColor: '#fca5a5',
    textShadow: '0 0 12px rgba(239,68,68,0.45)',
    badgeShadow: '0 0 14px rgba(239,68,68,0.35)',
    split: false,
    iconName: 'cross',
  },
  unverified: {
    label: 'UNVERIFIED',
    rgb: '156,163,175',
    shimmer: false,
    textColor: 'rgba(255,255,255,0.55)',
    split: false,
    iconName: 'question',
  },
}

export type SpectrumBand =
  | 'far-left'
  | 'left'
  | 'center-left'
  | 'center'
  | 'center-right'
  | 'right'
  | 'far-right'

export const SPECTRUM_BANDS: { slug: SpectrumBand; label: string; tint: string }[] = [
  { slug: 'far-left', label: 'FAR LEFT', tint: '34,76,160' },
  { slug: 'left', label: 'LEFT', tint: '50,116,200' },
  { slug: 'center-left', label: 'CENTER-LEFT', tint: '88,160,224' },
  { slug: 'center', label: 'CENTER', tint: '232,195,118' },
  { slug: 'center-right', label: 'CENTER-RIGHT', tint: '232,140,90' },
  { slug: 'right', label: 'RIGHT', tint: '200,80,60' },
  { slug: 'far-right', label: 'FAR RIGHT', tint: '160,40,40' },
]

export function spectrumIndex(b: SpectrumBand): number {
  return SPECTRUM_BANDS.findIndex((s) => s.slug === b)
}

export function verdictAccentRgb(v: Verdict): string {
  return VERDICT[v].rgb
}

export function getVerdict(score: number): Verdict {
  if (!Number.isFinite(score)) return 'unverified'
  if (score >= 80) return 'verified'
  if (score >= 65) return 'corroborated'
  if (score >= 50) return 'mixed'
  if (score >= 35) return 'disputed'
  return 'false'
}
