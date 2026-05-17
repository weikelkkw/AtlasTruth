'use client'

import { useState, type CSSProperties } from 'react'
import { VERDICT, type Verdict } from '@/lib/verdict'
import { FONT, PALETTE } from '@/design/constants'

interface SubClaim {
  text: string
  verdict: Verdict
}

interface Props {
  verdict: Verdict
  size?: 'sm' | 'md' | 'lg'
  subClaims?: SubClaim[]
  showLabel?: boolean
  style?: CSSProperties
}

const DIMS = {
  sm: { padX: 8, padY: 4, font: 9, gap: 4, plinth: 18, iconSize: 11 },
  md: { padX: 12, padY: 6, font: 10, gap: 6, plinth: 24, iconSize: 14 },
  lg: { padX: 16, padY: 9, font: 12, gap: 8, plinth: 36, iconSize: 18 },
}

import OutlineIcon from './OutlineIcon'

export default function VerdictBadge({
  verdict,
  size = 'md',
  subClaims,
  showLabel = true,
  style,
}: Props) {
  const t = VERDICT[verdict]
  const dims = DIMS[size]
  const [hover, setHover] = useState(false)

  if (t.split) {
    return (
      <span
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: 999,
          overflow: 'visible',
          boxShadow: t.badgeShadow,
          ...style,
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '999px 0 0 999px',
            padding: `${dims.padY}px ${dims.padX / 2 + 2}px ${dims.padY}px ${dims.padX}px`,
            background: `linear-gradient(135deg, rgba(${t.rgb},0.30), rgba(${t.rgb},0.12))`,
            border: `1px solid rgba(${t.rgb}, 0.45)`,
            borderRight: 'none',
          }}
        >
          <OutlineIcon
            name="check"
            size={dims.iconSize}
            color={`rgb(${t.rgb})`}
            glow={false}
          />
        </span>
        <span
          style={{
            width: 1,
            alignSelf: 'stretch',
            background: PALETTE.brass,
            opacity: 0.65,
          }}
        />
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: dims.gap,
            borderRadius: '0 999px 999px 0',
            padding: `${dims.padY}px ${dims.padX}px ${dims.padY}px ${dims.padX / 2 + 2}px`,
            background: `linear-gradient(135deg, rgba(${t.rgbAlt!},0.30), rgba(${t.rgbAlt!},0.12))`,
            border: `1px solid rgba(${t.rgbAlt!}, 0.45)`,
            borderLeft: 'none',
          }}
        >
          <OutlineIcon
            name="cross"
            size={dims.iconSize}
            color={`rgb(${t.rgbAlt!})`}
            glow={false}
          />
          {showLabel && (
            <span
              style={{
                fontFamily: FONT.label,
                fontSize: dims.font,
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: t.textColor ?? PALETTE.text,
                marginLeft: 2,
              }}
            >
              {t.label}
            </span>
          )}
        </span>
        {hover && subClaims && subClaims.length > 0 && (
          <span
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: 280,
              padding: 12,
              borderRadius: 12,
              background: 'rgba(10,10,20,0.96)',
              border: '1px solid rgba(255,255,255,0.10)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              boxShadow: '0 14px 30px -10px rgba(0,0,0,0.6)',
              zIndex: 30,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: FONT.label,
                fontSize: 9,
                letterSpacing: '0.22em',
                color: PALETTE.textMuted,
              }}
            >
              SUB-CLAIM BREAKDOWN
            </span>
            {subClaims.map((s, i) => (
              <span
                key={i}
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'flex-start',
                  fontFamily: FONT.body,
                  fontSize: 12,
                  color: PALETTE.textSub,
                  lineHeight: 1.45,
                }}
              >
                <VerdictBadge verdict={s.verdict} size="sm" showLabel={false} />
                <span>{s.text}</span>
              </span>
            ))}
          </span>
        )}
      </span>
    )
  }

  const labelStyle: CSSProperties = {
    fontFamily: FONT.label,
    fontSize: dims.font,
    fontWeight: 700,
    letterSpacing: '0.18em',
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: dims.gap,
        padding: `${dims.padY}px ${dims.padX}px`,
        borderRadius: 999,
        background: `linear-gradient(135deg, rgba(${t.rgb},0.18), rgba(${t.rgb},0.06))`,
        border: `1px solid rgba(${t.rgb}, 0.40)`,
        boxShadow: t.badgeShadow,
        ...style,
      }}
    >
      <OutlineIcon name={t.iconName} size={dims.iconSize} color={`rgb(${t.rgb})`} glow={false} />
      {showLabel &&
        (t.shimmer ? (
          <span
            className="oaxii-shimmer-text"
            style={
              {
                ...labelStyle,
                ['--shim-a' as string]: t.rgb,
                ['--shim-b' as string]: PALETTE.brassRgb,
              } as React.CSSProperties
            }
          >
            {t.label}
          </span>
        ) : (
          <span
            style={{
              ...labelStyle,
              color: t.textColor ?? PALETTE.text,
              textShadow: t.textShadow,
            }}
          >
            {t.label}
          </span>
        ))}
    </span>
  )
}
