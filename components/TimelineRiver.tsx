import HeroFrame from './HeroFrame'
import { FONT, PALETTE } from '@/design/constants'

export type DriftDirection = 'softer' | 'harder' | 'neutral'

export interface RiverEntry {
  id: string
  outlet: string
  outletSlug: string
  spectrumTint?: string
  date: string
  phrase: string
  drift: DriftDirection
}

interface Props {
  entries: RiverEntry[]
}

const DRIFT_COLOR: Record<DriftDirection, string> = {
  softer: '232,195,118',
  harder: '239,68,68',
  neutral: '167,139,250',
}

const DRIFT_LABEL: Record<DriftDirection, string> = {
  softer: 'SOFTENED',
  harder: 'SHARPENED',
  neutral: 'UNCHANGED',
}

export default function TimelineRiver({ entries }: Props) {
  return (
    <HeroFrame intensity="md" accentRgb={PALETTE.pillar.track.rgb}>
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ height: 1, width: 24, background: PALETTE.brass }} />
          <span
            style={{
              fontFamily: FONT.label,
              fontSize: 10,
              letterSpacing: '0.22em',
              color: PALETTE.textSub,
            }}
          >
            NARRATIVE DRIFT — RIVER
          </span>
          <span
            style={{
              flex: 1,
              height: 1,
              background: 'linear-gradient(90deg, rgba(232,195,118,0.35), transparent)',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {entries.map((e) => {
            const tint = DRIFT_COLOR[e.drift]
            return (
              <div
                key={e.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '4px 130px 1fr 110px',
                  gap: 14,
                  alignItems: 'center',
                  padding: '10px 12px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <span
                  style={{
                    alignSelf: 'stretch',
                    width: 3,
                    background: `linear-gradient(180deg, rgba(${tint},0.85), rgba(${tint},0.25))`,
                    borderRadius: 2,
                    boxShadow: `0 0 12px rgba(${tint},0.55)`,
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: FONT.body,
                      fontSize: 13,
                      color: PALETTE.text,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {e.outlet}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.label,
                      fontSize: 8,
                      letterSpacing: '0.22em',
                      color: PALETTE.textMuted,
                      marginTop: 2,
                    }}
                  >
                    {e.date}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 16,
                    lineHeight: 1.45,
                    color: PALETTE.textSub,
                  }}
                >
                  &ldquo;{e.phrase}&rdquo;
                </div>
                <span
                  style={{
                    justifySelf: 'flex-end',
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: `rgba(${tint},0.10)`,
                    border: `1px solid rgba(${tint},0.30)`,
                    fontFamily: FONT.label,
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.20em',
                    color: `rgb(${tint})`,
                  }}
                >
                  {DRIFT_LABEL[e.drift]}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </HeroFrame>
  )
}
