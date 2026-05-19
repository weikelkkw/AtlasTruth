import HeroFrame from '@/components/HeroFrame'
import VerdictBadge from '@/components/VerdictBadge'
import { Kicker } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'
import { VERDICT, type Verdict } from '@/lib/verdict'
import type { GradedStory } from '@/lib/live-stories'

interface Props {
  story: GradedStory
}

const PILLARS: { key: keyof GradedStory; label: string }[] = [
  { key: 'scoreAccuracy', label: 'ACCURACY' },
  { key: 'scoreContext', label: 'CONTEXT' },
  { key: 'scoreSourceTransparency', label: 'SOURCE' },
  { key: 'scoreSensationalism', label: 'SENSATION' },
  { key: 'scoreOriginalityBias', label: 'ORIGINALITY' },
]

function asVerdict(v: string | null): Verdict | null {
  if (!v) return null
  return v in VERDICT ? (v as Verdict) : null
}

export default function LiveStoryCard({ story }: Props) {
  const verdict = asVerdict(story.verdict)
  const pillarValues = PILLARS.map((p) => story[p.key] as number | null)
  const hasAnyPillar = pillarValues.some((v) => typeof v === 'number')

  const scoreDisplay =
    typeof story.weightedScore === 'number' ? Math.round(story.weightedScore) : '—'
  const verdictDisplay = story.verdict ? story.verdict.toUpperCase() : '—'
  const accuracyDisplay = typeof story.scoreAccuracy === 'number' ? story.scoreAccuracy : '—'
  const contextDisplay = typeof story.scoreContext === 'number' ? story.scoreContext : '—'

  return (
    <HeroFrame intensity="sm" accentRgb={PALETTE.brassRgb}>
      <a
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          padding: 18,
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Kicker>
            {story.uiCategory.toUpperCase()} · {story.age.toUpperCase()}
          </Kicker>
          {verdict && <VerdictBadge verdict={verdict} size="sm" />}
        </div>

        <h3
          style={{
            marginTop: 8,
            fontFamily: FONT.body,
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: '-0.005em',
            color: PALETTE.text,
            lineHeight: 1.3,
          }}
        >
          {story.headline}
        </h3>

        <div style={{ marginTop: 8 }}>
          <span
            style={{
              display: 'inline-block',
              padding: '3px 8px',
              borderRadius: 999,
              fontFamily: FONT.label,
              fontSize: 8,
              letterSpacing: '0.22em',
              color: PALETTE.brass,
              border: `1px solid rgba(${PALETTE.brassRgb}, 0.32)`,
              background: `rgba(${PALETTE.brassRgb}, 0.06)`,
              textTransform: 'uppercase',
            }}
          >
            {story.outlet}
          </span>
        </div>

        <p
          style={{
            marginTop: 8,
            fontFamily: FONT.display,
            fontSize: 15,
            color: PALETTE.textSub,
            lineHeight: 1.45,
          }}
        >
          {story.summary}
        </p>

        {hasAnyPillar && (
          <div
            style={{
              marginTop: 14,
              display: 'grid',
              gridTemplateColumns: `repeat(${PILLARS.length}, minmax(0, 1fr))`,
              gap: 6,
            }}
          >
            {PILLARS.map((p, i) => {
              const v = pillarValues[i]
              const pct = typeof v === 'number' ? Math.max(0, Math.min(100, v)) : 0
              const fillOpacity = typeof v === 'number' ? 0.25 + (pct / 100) * 0.65 : 0.05
              return (
                <div key={p.key} style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: FONT.label,
                      fontSize: 6,
                      letterSpacing: '0.18em',
                      color: PALETTE.textMuted,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {p.label}
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      height: 6,
                      borderRadius: 3,
                      background: `rgba(${PALETTE.brassRgb}, 0.06)`,
                      border: `1px solid rgba(${PALETTE.brassRgb}, 0.10)`,
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: '100%',
                        background: `rgba(${PALETTE.brassRgb}, ${fillOpacity})`,
                        boxShadow:
                          typeof v === 'number'
                            ? `0 0 8px rgba(${PALETTE.brassRgb}, ${fillOpacity * 0.6})`
                            : undefined,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div
          style={{
            marginTop: 14,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: 6,
          }}
        >
          <Mini label="SCORE" value={scoreDisplay} rgb={PALETTE.brassRgb} />
          <Mini label="VERDICT" value={verdictDisplay} rgb={PALETTE.cyanRgb} small />
          <Mini label="ACCURACY" value={accuracyDisplay} rgb={PALETTE.emeraldRgb} />
          <Mini label="CONTEXT" value={contextDisplay} rgb={PALETTE.violetRgb} />
        </div>
      </a>
    </HeroFrame>
  )
}

function Mini({
  label,
  value,
  rgb,
  small,
}: {
  label: string
  value: string | number
  rgb: string
  small?: boolean
}) {
  return (
    <div
      style={{
        padding: '6px 8px',
        borderRadius: 8,
        background: `linear-gradient(135deg, rgba(${rgb},0.10), rgba(${rgb},0.02))`,
        border: `1px solid rgba(${rgb}, 0.18)`,
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontFamily: FONT.label,
          fontSize: 7,
          letterSpacing: '0.20em',
          color: PALETTE.textMuted,
        }}
      >
        {label}
      </div>
      <div
        className="oaxii-shimmer-text"
        style={
          {
            fontFamily: FONT.body,
            fontSize: small ? 11 : 16,
            fontWeight: 700,
            letterSpacing: small ? '0.06em' : '-0.02em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            ['--shim-a' as string]: rgb,
            ['--shim-b' as string]: PALETTE.brassRgb,
          } as React.CSSProperties
        }
      >
        {value}
      </div>
    </div>
  )
}
