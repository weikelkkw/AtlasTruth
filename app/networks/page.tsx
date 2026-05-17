import HonestyScoreCard from '@/components/HonestyScoreCard'
import { PageShell, SectionHead, Kicker, GlassPill, FilterRow } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'
import { OUTLETS } from '@/data/outlets'
import { SPECTRUM_BANDS } from '@/lib/verdict'

const SORTS = [
  { slug: 'composite', label: 'COMPOSITE' },
  { slug: 'process', label: 'PROCESS' },
  { slug: 'track', label: 'TRACK RECORD' },
  { slug: 'disclosure', label: 'DISCLOSURE' },
]

export default function NetworksIndexPage() {
  const sorted = [...OUTLETS].sort((a, b) => b.composite - a.composite)

  return (
    <PageShell maxWidth={1240}>
      <section style={{ paddingTop: 36 }}>
        <Kicker>HONESTY INDEX · {OUTLETS.length} OUTLETS</Kicker>
        <h1
          style={{
            marginTop: 10,
            fontFamily: FONT.display,
            fontSize: 44,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            color: PALETTE.text,
          }}
        >
          The leaderboard,{' '}
          <span
            className="oaxii-shimmer-text"
            style={
              {
                ['--shim-a' as string]: PALETTE.violetRgb,
                ['--shim-b' as string]: PALETTE.brassRgb,
              } as React.CSSProperties
            }
          >
            by process — not politics.
          </span>
        </h1>
        <p
          style={{
            marginTop: 12,
            fontFamily: FONT.display,
            fontSize: 18,
            lineHeight: 1.5,
            color: PALETTE.textSub,
            maxWidth: 720,
          }}
        >
          Each outlet&rsquo;s composite score is the weighted sum of three measured
          components: process behaviors, adjudicated track record, and methodology
          disclosure. The formula is public and version-stamped.
        </p>
      </section>

      <section style={{ paddingTop: 24 }}>
        <FilterRow>
          <GlassPill accentRgb={PALETTE.pillar.networks.rgb} active>
            ALL BANDS
          </GlassPill>
          {SPECTRUM_BANDS.map((b) => (
            <GlassPill key={b.slug} accentRgb={PALETTE.pillar.networks.rgb}>
              {b.label}
            </GlassPill>
          ))}
        </FilterRow>
      </section>

      <section style={{ paddingTop: 12 }}>
        <FilterRow>
          <span
            style={{
              fontFamily: FONT.label,
              fontSize: 9,
              letterSpacing: '0.22em',
              color: PALETTE.textMuted,
              alignSelf: 'center',
              marginRight: 4,
            }}
          >
            SORT BY
          </span>
          {SORTS.map((s) => (
            <GlassPill
              key={s.slug}
              accentRgb={PALETTE.brassRgb}
              active={s.slug === 'composite'}
            >
              {s.label}
            </GlassPill>
          ))}
        </FilterRow>
      </section>

      <section style={{ paddingTop: 24, paddingBottom: 64 }}>
        <SectionHead title="LEADERBOARD" kicker="HIGHEST → LOWEST COMPOSITE" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {sorted.map((o) => (
            <HonestyScoreCard
              key={o.slug}
              slug={o.slug}
              name={o.name}
              ownershipGroup={o.ownershipGroup}
              spectrum={o.spectrum}
              composite={o.composite}
              process={o.process}
              trackRecord={o.trackRecord}
              disclosure={o.disclosure}
              sparkline={o.sparkline}
            />
          ))}
        </div>
      </section>
    </PageShell>
  )
}
