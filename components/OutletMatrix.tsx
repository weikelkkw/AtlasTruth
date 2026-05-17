'use client'

import Link from 'next/link'
import { useState } from 'react'
import { VERDICT, type Verdict, type SpectrumBand, spectrumIndex } from '@/lib/verdict'
import HeroFrame from './HeroFrame'
import { FONT, PALETTE } from '@/design/constants'

export interface MatrixCell {
  verdict: Verdict | 'not-reported'
  excerpt?: string
}

export interface MatrixOutlet {
  name: string
  slug: string
  spectrum: SpectrumBand
}

export interface MatrixClaim {
  id: string
  text: string
}

interface Props {
  outlets: MatrixOutlet[]
  claims: MatrixClaim[]
  cells: Record<string, Record<string, MatrixCell>>
}

export default function OutletMatrix({ outlets, claims, cells }: Props) {
  const [tip, setTip] = useState<{ o: string; c: string; ex: string } | null>(null)

  const sortedOutlets = [...outlets].sort(
    (a, b) => spectrumIndex(a.spectrum) - spectrumIndex(b.spectrum)
  )

  return (
    <HeroFrame intensity="md" accentRgb={PALETTE.pillar.headlines.rgb}>
      <div style={{ padding: 18 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 10,
            marginBottom: 16,
          }}
        >
          <span style={{ height: 1, width: 24, background: PALETTE.brass }} />
          <span
            style={{
              fontFamily: FONT.label,
              fontSize: 10,
              letterSpacing: '0.22em',
              color: PALETTE.textSub,
            }}
          >
            OUTLET × CLAIM MATRIX
          </span>
          <span
            style={{
              flex: 1,
              height: 1,
              background:
                'linear-gradient(90deg, rgba(232,195,118,0.35), transparent)',
            }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `220px repeat(${claims.length}, minmax(56px, 1fr))`,
            gap: 6,
            alignItems: 'stretch',
            minWidth: 0,
            overflowX: 'auto',
          }}
        >
          <div />
          {claims.map((c) => (
            <div
              key={c.id}
              style={{
                fontFamily: FONT.label,
                fontSize: 8,
                letterSpacing: '0.14em',
                color: PALETTE.textMuted,
                padding: '0 4px 8px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                lineHeight: 1.3,
                writingMode: 'horizontal-tb',
                textAlign: 'center',
              }}
              title={c.text}
            >
              C{c.id.slice(-2)}
            </div>
          ))}

          {sortedOutlets.map((o) => (
            <ContentRow
              key={o.slug}
              outlet={o}
              claims={claims}
              row={cells[o.slug] ?? {}}
              onTip={setTip}
            />
          ))}
        </div>

        {tip && (
          <div
            style={{
              marginTop: 14,
              padding: '10px 14px',
              borderRadius: 12,
              background: 'rgba(10,10,20,0.85)',
              border: '1px solid rgba(255,255,255,0.10)',
              fontFamily: FONT.body,
              fontSize: 12,
              color: PALETTE.textSub,
              lineHeight: 1.5,
            }}
          >
            <span
              style={{
                fontFamily: FONT.label,
                fontSize: 9,
                letterSpacing: '0.22em',
                color: PALETTE.brass,
                marginRight: 8,
              }}
            >
              {tip.o}
            </span>
            {tip.ex}
          </div>
        )}
      </div>
    </HeroFrame>
  )

  function ContentRow({
    outlet,
    claims,
    row,
    onTip,
  }: {
    outlet: MatrixOutlet
    claims: MatrixClaim[]
    row: Record<string, MatrixCell>
    onTip: (t: { o: string; c: string; ex: string } | null) => void
  }) {
    return (
      <>
        <Link
          href={`/networks/${outlet.slug}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 4px',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            fontFamily: FONT.body,
            fontSize: 13,
            color: PALETTE.text,
            textDecoration: 'none',
            minWidth: 0,
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: 'linear-gradient(145deg, rgba(167,139,250,0.20), rgba(167,139,250,0.04))',
              border: '1px solid rgba(167,139,250,0.30)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONT.label,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: PALETTE.violet,
              flexShrink: 0,
            }}
          >
            {outlet.name
              .split(/\s+/)
              .map((p) => p[0])
              .join('')
              .slice(0, 3)}
          </span>
          <span
            style={{
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {outlet.name}
          </span>
        </Link>

        {claims.map((c) => {
          const cell = row[c.id] ?? { verdict: 'not-reported' }
          const isReported = cell.verdict !== 'not-reported'
          const v = isReported ? VERDICT[cell.verdict as Verdict] : null
          return (
            <Link
              key={c.id + outlet.slug}
              href={`/claim/${c.id}`}
              onMouseEnter={() =>
                isReported && cell.excerpt
                  ? onTip({ o: outlet.name, c: c.id, ex: cell.excerpt })
                  : null
              }
              onMouseLeave={() => onTip(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 4px',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                background: v
                  ? `linear-gradient(135deg, rgba(${v.rgb},0.30), rgba(${v.rgb},0.10))`
                  : 'rgba(255,255,255,0.02)',
                border: v
                  ? `1px solid rgba(${v.rgb},0.35)`
                  : '1px solid rgba(255,255,255,0.04)',
                borderRadius: 6,
                margin: 2,
                minHeight: 28,
                cursor: isReported ? 'pointer' : 'default',
                transition: 'transform 200ms ease',
              }}
            >
              {v ? (
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: `rgb(${v.rgb})`,
                    boxShadow: `0 0 8px rgba(${v.rgb}, 0.7)`,
                  }}
                />
              ) : (
                <span
                  style={{
                    fontFamily: FONT.label,
                    fontSize: 8,
                    letterSpacing: '0.12em',
                    color: 'rgba(255,255,255,0.18)',
                  }}
                >
                  —
                </span>
              )}
            </Link>
          )
        })}
      </>
    )
  }
}
