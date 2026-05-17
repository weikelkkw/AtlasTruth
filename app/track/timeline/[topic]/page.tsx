import HeroFrame from '@/components/HeroFrame'
import { PageShell, SectionHead, Kicker } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'
import { VERDICT, type Verdict } from '@/lib/verdict'

interface PageProps {
  params: Promise<{ topic: string }>
}

const OUTLET_ROWS = [
  { slug: 'reuters', name: 'Reuters' },
  { slug: 'nyt', name: 'New York Times' },
  { slug: 'wsj', name: 'Wall Street Journal' },
  { slug: 'foxnews', name: 'Fox News' },
  { slug: 'bbc', name: 'BBC News' },
  { slug: 'guardian', name: 'The Guardian' },
]

const DAYS = [
  'May 10',
  'May 11',
  'May 12',
  'May 13',
  'May 14',
  'May 15',
  'May 16',
  'May 17',
]

// Realistic-ish pattern: each row x col → verdict for that outlet on that day.
const MATRIX: Verdict[][] = [
  ['verified', 'verified', 'verified', 'corroborated', 'verified', 'verified', 'verified', 'verified'],
  ['corroborated', 'verified', 'mixed', 'verified', 'verified', 'corroborated', 'verified', 'verified'],
  ['corroborated', 'verified', 'verified', 'mixed', 'verified', 'verified', 'corroborated', 'verified'],
  ['disputed', 'disputed', 'mixed', 'false', 'mixed', 'disputed', 'mixed', 'disputed'],
  ['verified', 'corroborated', 'verified', 'verified', 'mixed', 'verified', 'verified', 'corroborated'],
  ['verified', 'mixed', 'verified', 'verified', 'verified', 'mixed', 'corroborated', 'verified'],
]

export default async function TimelinePage({ params }: PageProps) {
  const { topic } = await params
  const topicLabel = decodeURIComponent(topic).replace(/[-_]/g, ' ')

  return (
    <PageShell maxWidth={1240}>
      <section style={{ paddingTop: 36 }}>
        <Kicker>TRACK · NARRATIVE TIMELINE</Kicker>
        <h1
          style={{
            marginTop: 10,
            fontFamily: FONT.display,
            fontSize: 40,
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.005em',
            color: PALETTE.text,
            textTransform: 'capitalize',
          }}
        >
          Narrative timeline &mdash;{' '}
          <span
            className="oaxii-shimmer-text"
            style={
              {
                ['--shim-a' as string]: PALETTE.emeraldRgb,
                ['--shim-b' as string]: PALETTE.brassRgb,
              } as React.CSSProperties
            }
          >
            {topicLabel}
          </span>
        </h1>
        <p
          style={{
            marginTop: 12,
            fontFamily: FONT.display,
            fontSize: 18,
            lineHeight: 1.5,
            color: PALETTE.textSub,
            maxWidth: 760,
          }}
        >
          Rows are outlets. Columns are days. Each dot is that outlet&rsquo;s verdict for
          the leading claim on that day. Sparse rows mean the outlet did not report.
        </p>
      </section>

      <section style={{ paddingTop: 28 }}>
        <SectionHead title="OUTLET × DAY MATRIX" kicker={`${OUTLET_ROWS.length} OUTLETS · ${DAYS.length} DAYS`} />
        <HeroFrame intensity="md" accentRgb={PALETTE.pillar.track.rgb}>
          <div style={{ padding: 24, overflowX: 'auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `160px repeat(${DAYS.length}, 1fr)`,
                rowGap: 14,
                columnGap: 10,
                alignItems: 'center',
                minWidth: 720,
              }}
            >
              <span />
              {DAYS.map((d) => (
                <span
                  key={d}
                  style={{
                    fontFamily: FONT.label,
                    fontSize: 9,
                    letterSpacing: '0.22em',
                    color: PALETTE.textMuted,
                    textAlign: 'center',
                  }}
                >
                  {d.toUpperCase()}
                </span>
              ))}
              {OUTLET_ROWS.map((row, rIdx) => (
                <RowFragment
                  key={row.slug}
                  name={row.name}
                  verdicts={MATRIX[rIdx]}
                />
              ))}
            </div>
          </div>
        </HeroFrame>
      </section>

      <section style={{ paddingTop: 24, paddingBottom: 64 }}>
        <SectionHead title="LEGEND" kicker="VERDICT KEY" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {(['verified', 'corroborated', 'mixed', 'disputed', 'false'] as Verdict[]).map((v) => (
            <div
              key={v}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 12px',
                borderRadius: 999,
                background: `rgba(${VERDICT[v].rgb},0.08)`,
                border: `1px solid rgba(${VERDICT[v].rgb},0.30)`,
              }}
            >
              <Dot verdict={v} size={14} />
              <span
                style={{
                  fontFamily: FONT.label,
                  fontSize: 9,
                  letterSpacing: '0.22em',
                  color: PALETTE.textSub,
                }}
              >
                {VERDICT[v].label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  )
}

function RowFragment({
  name,
  verdicts,
}: {
  name: string
  verdicts: Verdict[]
}) {
  return (
    <>
      <span
        style={{
          fontFamily: FONT.body,
          fontSize: 13,
          color: PALETTE.text,
          textAlign: 'right',
          paddingRight: 6,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </span>
      {verdicts.map((v, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Dot verdict={v} />
        </div>
      ))}
    </>
  )
}

function Dot({ verdict, size = 18 }: { verdict: Verdict; size?: number }) {
  const t = VERDICT[verdict]
  if (t.split) {
    return (
      <span
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: `linear-gradient(90deg, rgba(${t.rgb},0.85) 50%, rgba(${t.rgbAlt},0.85) 50%)`,
          boxShadow: t.badgeShadow,
          border: '1px solid rgba(232,195,118,0.35)',
        }}
      />
    )
  }
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, rgba(${t.rgb},0.95), rgba(${t.rgb},0.55))`,
        boxShadow: t.badgeShadow ?? `0 0 10px rgba(${t.rgb},0.35)`,
        border: `1px solid rgba(${t.rgb},0.45)`,
      }}
    />
  )
}
