'use client'

import Link from 'next/link'
import HeroFrame from './HeroFrame'
import { FONT, PALETTE } from '@/design/constants'
import { SPECTRUM_BANDS, type SpectrumBand, spectrumIndex } from '@/lib/verdict'

interface Props {
  slug: string
  name: string
  ownershipGroup: string
  spectrum: SpectrumBand
  composite: number
  process: number
  trackRecord: number
  disclosure: number
  sparkline: number[]
}

function buildSparkPath(values: number[], w: number, h: number): string {
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

export default function HonestyScoreCard({
  slug,
  name,
  ownershipGroup,
  spectrum,
  composite,
  process,
  trackRecord,
  disclosure,
  sparkline,
}: Props) {
  const bandLabel = SPECTRUM_BANDS[spectrumIndex(spectrum)].label
  const path = buildSparkPath(sparkline, 100, 24)

  return (
    <Link href={`/networks/${slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <HeroFrame intensity="sm" accentRgb={PALETTE.pillar.networks.rgb}>
        <div
          style={{
            padding: 16,
            display: 'grid',
            gridTemplateColumns: '46px 1fr auto auto',
            gap: 14,
            alignItems: 'center',
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 10,
              background:
                'linear-gradient(145deg, rgba(167,139,250,0.22), rgba(167,139,250,0.04))',
              border: '1px solid rgba(167,139,250,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONT.label,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: PALETTE.violet,
            }}
          >
            {name
              .split(/\s+/)
              .map((p) => p[0])
              .join('')
              .slice(0, 3)}
          </div>

          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: FONT.body,
                fontSize: 15,
                fontWeight: 500,
                color: PALETTE.text,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </div>
            <div
              style={{
                fontFamily: FONT.label,
                fontSize: 8,
                letterSpacing: '0.22em',
                color: PALETTE.textMuted,
                marginTop: 2,
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
              }}
            >
              <span>{ownershipGroup}</span>
              <span>·</span>
              <span style={{ color: PALETTE.textSub }}>{bandLabel}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width={100} height={24} aria-hidden>
              <path
                d={path}
                fill="none"
                stroke={`rgba(232,195,118,0.85)`}
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              minWidth: 60,
            }}
          >
            <span
              className="oaxii-shimmer-text"
              style={
                {
                  fontFamily: FONT.body,
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  ['--shim-a' as string]: PALETTE.brassRgb,
                  ['--shim-b' as string]: PALETTE.violetRgb,
                } as React.CSSProperties
              }
            >
              {composite}
            </span>
            <span
              style={{
                fontFamily: FONT.label,
                fontSize: 8,
                letterSpacing: '0.18em',
                color: PALETTE.textMuted,
              }}
            >
              P{process} · T{trackRecord} · D{disclosure}
            </span>
          </div>
        </div>
      </HeroFrame>
    </Link>
  )
}
