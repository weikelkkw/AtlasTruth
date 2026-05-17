import HeroFrame from './HeroFrame'
import OutlineIcon from './OutlineIcon'
import { FONT, PALETTE } from '@/design/constants'
import { staffAvatarFor, monogramFor } from '@/lib/avatars'

export interface DissentEntry {
  id: string
  challenger: string | null
  role?: string
  timestamp: string
  argument: string
  editorialResponse?: {
    author: string
    body: string
    timestamp: string
  }
}

interface Props {
  entries: DissentEntry[]
}

export default function DissentLog({ entries }: Props) {
  return (
    <HeroFrame intensity="md" accentRgb={PALETTE.pillar.claim.rgb}>
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
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
            DISSENT LOG · APPEND-ONLY
          </span>
          <span
            style={{
              flex: 1,
              height: 1,
              background: 'linear-gradient(90deg, rgba(232,195,118,0.35), transparent)',
            }}
          />
        </div>

        {entries.length === 0 && (
          <div
            style={{
              padding: 18,
              fontFamily: FONT.body,
              fontSize: 13,
              color: PALETTE.textMuted,
              textAlign: 'center',
            }}
          >
            No dissents on record. The first formal challenge appears here.
          </div>
        )}

        {entries.map((e) => {
          const display = e.challenger ?? 'Anonymous reader'
          const avatar = e.challenger ? staffAvatarFor(e.challenger) : undefined
          return (
            <div key={e.id} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <HeroFrame intensity="sm" accentRgb={PALETTE.cyanRgb}>
                <div
                  style={{
                    padding: 14,
                    display: 'grid',
                    gridTemplateColumns: '36px 1fr auto',
                    gap: 12,
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: avatar
                        ? `center / cover no-repeat url(${avatar})`
                        : 'linear-gradient(145deg, rgba(34,211,238,0.20), rgba(34,211,238,0.04))',
                      border: '1px solid rgba(34,211,238,0.30)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: FONT.label,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      color: PALETTE.cyan,
                    }}
                  >
                    {avatar ? '' : monogramFor(display)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: FONT.body,
                        fontSize: 13,
                        fontWeight: 500,
                        color: PALETTE.text,
                      }}
                    >
                      {display}
                      {e.role && (
                        <span
                          style={{
                            marginLeft: 8,
                            fontFamily: FONT.label,
                            fontSize: 8,
                            letterSpacing: '0.18em',
                            color: PALETTE.textMuted,
                          }}
                        >
                          {e.role.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        fontFamily: FONT.body,
                        fontSize: 13,
                        lineHeight: 1.6,
                        color: PALETTE.textSub,
                      }}
                    >
                      {e.argument}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: FONT.label,
                      fontSize: 8,
                      letterSpacing: '0.22em',
                      color: PALETTE.textMuted,
                    }}
                  >
                    {e.timestamp}
                  </span>
                </div>
              </HeroFrame>

              {e.editorialResponse && (
                <div style={{ paddingLeft: 28 }}>
                  <HeroFrame intensity="sm" accentRgb={PALETTE.brassRgb}>
                    <div style={{ padding: 14 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          marginBottom: 6,
                        }}
                      >
                        <OutlineIcon name="check" size={14} color={PALETTE.brass} glow={false} />
                        <span
                          style={{
                            fontFamily: FONT.label,
                            fontSize: 9,
                            letterSpacing: '0.22em',
                            color: PALETTE.brass,
                          }}
                        >
                          EDITORIAL RESPONSE · {e.editorialResponse.author.toUpperCase()}
                        </span>
                        <span style={{ flex: 1 }} />
                        <span
                          style={{
                            fontFamily: FONT.label,
                            fontSize: 8,
                            letterSpacing: '0.22em',
                            color: PALETTE.textMuted,
                          }}
                        >
                          {e.editorialResponse.timestamp}
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: FONT.body,
                          fontSize: 13,
                          lineHeight: 1.6,
                          color: PALETTE.textSub,
                        }}
                      >
                        {e.editorialResponse.body}
                      </div>
                    </div>
                  </HeroFrame>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </HeroFrame>
  )
}
