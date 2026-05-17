'use client'

import Link from 'next/link'
import HeroFrame from './HeroFrame'
import VerdictBadge from './VerdictBadge'
import OutlineIcon from './OutlineIcon'
import { FONT, PALETTE } from '@/design/constants'
import type { Verdict } from '@/lib/verdict'

interface Props {
  id: string
  text: string
  verdict: Verdict
  outletCount: number
  agreeCount: number
  disagreeCount: number
  primaryDocCount: number
  subClaims?: { text: string; verdict: Verdict }[]
}

export default function ClaimCard({
  id,
  text,
  verdict,
  outletCount,
  agreeCount,
  disagreeCount,
  primaryDocCount,
  subClaims,
}: Props) {
  return (
    <HeroFrame intensity="sm" accentRgb={PALETTE.pillar.claim.rgb}>
      <div
        style={{
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 12,
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontFamily: FONT.label,
              fontSize: 9,
              letterSpacing: '0.22em',
              color: PALETTE.textMuted,
            }}
          >
            CLAIM · {id}
          </div>
          <VerdictBadge verdict={verdict} size="sm" subClaims={subClaims} />
        </div>

        <Link
          href={`/claim/${id}`}
          style={{
            fontFamily: FONT.display,
            fontSize: 18,
            lineHeight: 1.35,
            color: PALETTE.text,
            textDecoration: 'none',
            display: 'block',
            minWidth: 0,
          }}
        >
          {text}
        </Link>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: 8,
          }}
        >
          {[
            { label: 'OUTLETS', value: outletCount, rgb: PALETTE.brassRgb, shimmer: true },
            { label: 'AGREE', value: agreeCount, rgb: PALETTE.emeraldRgb, shimmer: true },
            { label: 'DISAGREE', value: disagreeCount, rgb: PALETTE.dangerRgb, shimmer: false },
            { label: 'DOCS', value: primaryDocCount, rgb: PALETTE.cyanRgb, shimmer: true },
          ].map((t) => (
            <div
              key={t.label}
              style={{
                padding: '6px 8px',
                borderRadius: 10,
                background: `linear-gradient(135deg, rgba(${t.rgb},0.10), rgba(${t.rgb},0.02))`,
                border: `1px solid rgba(${t.rgb}, 0.18)`,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  fontFamily: FONT.label,
                  fontSize: 8,
                  letterSpacing: '0.20em',
                  color: PALETTE.textMuted,
                }}
              >
                {t.label}
              </div>
              <div
                className={t.shimmer ? 'oaxii-shimmer-text' : undefined}
                style={
                  t.shimmer
                    ? ({
                        fontFamily: FONT.body,
                        fontSize: 20,
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        ['--shim-a' as string]: t.rgb,
                        ['--shim-b' as string]: PALETTE.brassRgb,
                      } as React.CSSProperties)
                    : {
                        fontFamily: FONT.body,
                        fontSize: 20,
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: PALETTE.lossText,
                        textShadow: '0 0 12px rgba(239,68,68,0.45)',
                      }
                }
              >
                {t.value}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            href={`/claim/${id}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.10)',
              fontFamily: FONT.label,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: PALETTE.textSub,
              textDecoration: 'none',
            }}
          >
            OPEN CLAIM
            <OutlineIcon name="arrow" size={11} color={PALETTE.brass} glow={false} />
          </Link>
        </div>
      </div>
    </HeroFrame>
  )
}
