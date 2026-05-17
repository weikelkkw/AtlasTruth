import Link from 'next/link'
import HeroFrame from '@/components/HeroFrame'
import SpectrumStrip from '@/components/SpectrumStrip'
import { PageShell, SectionHead, Kicker, GlassPill, FilterRow } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'
import { STORIES, outletsForStory, claimsForStory } from '@/data/stories'

const CATEGORIES = [
  { slug: 'all', label: 'ALL' },
  { slug: 'breaking', label: 'BREAKING' },
  { slug: 'us', label: 'US' },
  { slug: 'world', label: 'WORLD' },
  { slug: 'politics', label: 'POLITICS' },
  { slug: 'business', label: 'BUSINESS' },
  { slug: 'science', label: 'SCIENCE' },
  { slug: 'tech', label: 'TECH' },
]

export default function HeadlinesPage() {
  return (
    <PageShell maxWidth={1320}>
      <section style={{ paddingTop: 36 }}>
        <Kicker>HEADLINES · {STORIES.length} LIVE STORIES</Kicker>
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
          Today, across every spectrum.
        </h1>
      </section>

      <section style={{ paddingTop: 24 }}>
        <FilterRow>
          {CATEGORIES.map((c) => (
            <GlassPill
              key={c.slug}
              href={c.slug === 'all' ? '/headlines' : `/headlines/${c.slug}`}
              accentRgb={PALETTE.brassRgb}
              active={c.slug === 'all'}
            >
              {c.label}
            </GlassPill>
          ))}
        </FilterRow>
      </section>

      <section style={{ paddingTop: 24 }}>
        <SectionHead title="STORY GRID" kicker="TAP A STORY TO SEE THE MATRIX" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 14,
          }}
        >
          {STORIES.map((s) => {
            const outlets = outletsForStory(s.id)
            const claims = claimsForStory(s.id)
            const counts = {
              verified: claims.filter((c) => c.trace.verdict === 'verified').length,
              corroborated: claims.filter((c) => c.trace.verdict === 'corroborated').length,
              mixed: claims.filter((c) => c.trace.verdict === 'mixed').length,
              disputed: claims.filter((c) => c.trace.verdict === 'disputed').length,
              false: claims.filter((c) => c.trace.verdict === 'false').length,
            }
            const isBreaking = s.category === 'breaking'
            return (
              <HeroFrame
                key={s.id}
                intensity="sm"
                accentRgb={isBreaking ? PALETTE.amberRgb : PALETTE.brassRgb}
              >
                <Link
                  href={`/headlines/story/${s.id}`}
                  style={{
                    display: 'block',
                    padding: 18,
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Kicker>
                      {s.category.toUpperCase()} · {s.age.toUpperCase()}
                    </Kicker>
                    {isBreaking && (
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: 999,
                          fontFamily: FONT.label,
                          fontSize: 8,
                          letterSpacing: '0.22em',
                          color: PALETTE.amber,
                          border: '1px solid rgba(245,158,11,0.4)',
                          background: 'rgba(245,158,11,0.08)',
                        }}
                      >
                        UNVERIFIED · BREAKING
                      </span>
                    )}
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
                    {s.headline}
                  </h3>
                  <p
                    style={{
                      marginTop: 6,
                      fontFamily: FONT.display,
                      fontSize: 15,
                      color: PALETTE.textSub,
                      lineHeight: 1.45,
                    }}
                  >
                    {s.dek}
                  </p>
                  <div style={{ marginTop: 14 }}>
                    <SpectrumStrip
                      outlets={outlets.map((o) => ({
                        name: o.name,
                        spectrum: o.spectrum,
                        honestyScore: o.composite,
                      }))}
                      height={28}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: 14,
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                      gap: 6,
                    }}
                  >
                    <Mini label="OUTLETS" value={s.outletSlugs.length} rgb={PALETTE.cyanRgb} />
                    <Mini label="CLAIMS" value={claims.length} rgb={PALETTE.brassRgb} />
                    <Mini label="MIXED" value={counts.mixed} rgb={PALETTE.violetRgb} />
                    <Mini label="FALSE" value={counts.false} rgb={PALETTE.dangerRgb} loss />
                  </div>
                </Link>
              </HeroFrame>
            )
          })}
        </div>
      </section>
    </PageShell>
  )
}

function Mini({
  label,
  value,
  rgb,
  loss,
}: {
  label: string
  value: number
  rgb: string
  loss?: boolean
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
        className={loss ? undefined : 'oaxii-shimmer-text'}
        style={
          loss
            ? {
                fontFamily: FONT.body,
                fontSize: 16,
                fontWeight: 700,
                color: PALETTE.lossText,
                textShadow: '0 0 12px rgba(239,68,68,0.45)',
              }
            : ({
                fontFamily: FONT.body,
                fontSize: 16,
                fontWeight: 700,
                ['--shim-a' as string]: rgb,
                ['--shim-b' as string]: PALETTE.brassRgb,
              } as React.CSSProperties)
        }
      >
        {value}
      </div>
    </div>
  )
}
