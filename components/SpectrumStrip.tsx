'use client'

import { useState } from 'react'
import { SPECTRUM_BANDS, type SpectrumBand, spectrumIndex } from '@/lib/verdict'
import { FONT, PALETTE } from '@/design/constants'

interface OutletDot {
  name: string
  spectrum: SpectrumBand
  agrees?: boolean
  logo?: string
  honestyScore?: number
}

interface Props {
  outlets: OutletDot[]
  height?: number
  showLabels?: boolean
}

export default function SpectrumStrip({ outlets, height = 38, showLabels = false }: Props) {
  const [hover, setHover] = useState<string | null>(null)

  return (
    <div style={{ width: '100%', minWidth: 0 }}>
      <div
        style={{
          position: 'relative',
          height,
          width: '100%',
          borderRadius: 999,
          background:
            'linear-gradient(90deg, rgba(50,116,200,0.18), rgba(88,160,224,0.12), rgba(232,195,118,0.18), rgba(232,140,90,0.14), rgba(200,80,60,0.18))',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: 'inset 0 0 24px rgba(0,0,0,0.35)',
          overflow: 'visible',
        }}
      >
        {SPECTRUM_BANDS.map((_, i) => {
          if (i === 0) return null
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${(i / SPECTRUM_BANDS.length) * 100}%`,
                top: '20%',
                bottom: '20%',
                width: 1,
                background: 'rgba(255,255,255,0.06)',
              }}
            />
          )
        })}

        {outlets.map((o, i) => {
          const bandIdx = spectrumIndex(o.spectrum)
          const center = ((bandIdx + 0.5) / SPECTRUM_BANDS.length) * 100
          const left = `calc(${center}% - ${height / 2 - 4}px)`
          const dotSize = height - 14
          const isHover = hover === o.name + i

          return (
            <div
              key={o.name + i}
              onMouseEnter={() => setHover(o.name + i)}
              onMouseLeave={() => setHover(null)}
              style={{
                position: 'absolute',
                left,
                top: '50%',
                transform: 'translateY(-50%)',
                width: dotSize,
                height: dotSize,
                borderRadius: '50%',
                background: 'rgba(10,10,20,0.85)',
                border: o.agrees === false
                  ? '1px solid rgba(239,68,68,0.6)'
                  : '1px solid rgba(232,195,118,0.55)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FONT.label,
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: o.agrees === false ? PALETTE.lossText : PALETTE.text,
                cursor: 'default',
                boxShadow: isHover
                  ? '0 0 12px rgba(232,195,118,0.55)'
                  : '0 2px 6px rgba(0,0,0,0.5)',
                zIndex: isHover ? 5 : 2,
                transition: 'box-shadow 200ms ease',
              }}
            >
              {o.name
                .split(/\s+/)
                .map((p) => p[0])
                .join('')
                .slice(0, 3)}
              {isHover && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 8px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '6px 10px',
                    background: 'rgba(10,10,20,0.96)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 8,
                    whiteSpace: 'nowrap',
                    fontFamily: FONT.body,
                    fontSize: 11,
                    color: PALETTE.text,
                    zIndex: 30,
                    pointerEvents: 'none',
                  }}
                >
                  {o.name}
                  <span
                    style={{
                      fontFamily: FONT.label,
                      fontSize: 8,
                      letterSpacing: '0.18em',
                      color: PALETTE.textMuted,
                      marginLeft: 8,
                    }}
                  >
                    {SPECTRUM_BANDS[bandIdx].label}
                  </span>
                  {typeof o.honestyScore === 'number' && (
                    <span
                      style={{
                        marginLeft: 8,
                        fontFamily: FONT.label,
                        fontSize: 8,
                        color: PALETTE.brass,
                        letterSpacing: '0.12em',
                      }}
                    >
                      H{o.honestyScore}
                    </span>
                  )}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {showLabels && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 6,
            fontFamily: FONT.label,
            fontSize: 8,
            letterSpacing: '0.18em',
            color: PALETTE.textMuted,
          }}
        >
          {SPECTRUM_BANDS.map((b) => (
            <span key={b.slug}>{b.label}</span>
          ))}
        </div>
      )}
    </div>
  )
}
