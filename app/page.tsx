import Link from 'next/link'
import HeroFrame from '@/components/HeroFrame'
import SpectrumStrip from '@/components/SpectrumStrip'
import VerdictBadge from '@/components/VerdictBadge'
import OutlineIcon from '@/components/OutlineIcon'
import HonestyScoreCard from '@/components/HonestyScoreCard'
import ClaimCard from '@/components/ClaimCard'
import { PrimaryCTA, SectionHead, PageShell, Kicker } from '@/components/ui'
import { FONT, PALETTE, METHODOLOGY_VERSION } from '@/design/constants'
import { STORIES, outletsForStory, claimsForStory } from '@/data/stories'
import { OUTLETS } from '@/data/outlets'
import { CLAIMS, summarize } from '@/data/claims'

export default function HomePage() {
  const topStories = STORIES.filter((s) => s.category !== 'breaking').slice(0, 5)
  const sortedHonest = [...OUTLETS].sort((a, b) => b.composite - a.composite)
  const top10 = sortedHonest.slice(0, 5)
  const bottom10 = sortedHonest.slice(-5).reverse()

  return (
    <PageShell maxWidth={1280}>
      <section style={{ paddingTop: 36, paddingBottom: 28 }}>
        <HeroFrame intensity="lg" accentRgb={PALETTE.brassRgb} accentRgb2={PALETTE.violetRgb}>
          <div
            style={{
              padding: '52px 44px',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
              gap: 40,
              alignItems: 'center',
            }}
          >
            <div style={{ minWidth: 0 }}>
              <Kicker>
                LIVE · UPDATED EVERY 90 SECONDS · METHODOLOGY {METHODOLOGY_VERSION}
              </Kicker>
              <h1
                style={{
                  marginTop: 16,
                  marginBottom: 18,
                  fontFamily: FONT.display,
                  fontSize: 56,
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                  fontWeight: 500,
                  color: PALETTE.text,
                  textWrap: 'balance',
                }}
              >
                The receipts,
                <br />
                <span
                  className="oaxii-shimmer-text"
                  style={
                    {
                      ['--shim-a' as string]: PALETTE.brassRgb,
                      ['--shim-b' as string]: PALETTE.violetRgb,
                    } as React.CSSProperties
                  }
                >
                  before the takes.
                </span>
              </h1>
              <p
                style={{
                  fontFamily: FONT.display,
                  fontSize: 21,
                  lineHeight: 1.5,
                  color: PALETTE.textSub,
                  maxWidth: 560,
                  marginBottom: 26,
                }}
              >
                A premium news intelligence surface. Cross-spectrum aggregation, a per-claim
                graph against primary documents, and a transparent honesty index for every
                outlet — every verdict linked back to its sources in three taps.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <PrimaryCTA href="/headlines" iconName="newspaper">
                  Today&apos;s Headlines
                </PrimaryCTA>
                <PrimaryCTA href="/about/methodology" iconName="book">
                  Read the Method
                </PrimaryCTA>
              </div>
            </div>

            <div style={{ display: 'grid', gap: 12, minWidth: 0 }}>
              {[
                {
                  label: 'STORIES TRACKED',
                  value: STORIES.length.toLocaleString(),
                  rgb: PALETTE.brassRgb,
                },
                {
                  label: 'CLAIMS ADJUDICATED',
                  value: CLAIMS.length.toLocaleString(),
                  rgb: PALETTE.cyanRgb,
                },
                {
                  label: 'OUTLETS MONITORED',
                  value: OUTLETS.length.toLocaleString(),
                  rgb: PALETTE.violetRgb,
                },
              ].map((s) => (
                <HeroFrame key={s.label} intensity="sm" accentRgb={s.rgb}>
                  <div
                    style={{
                      padding: 18,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT.label,
                        fontSize: 10,
                        letterSpacing: '0.22em',
                        color: PALETTE.textMuted,
                      }}
                    >
                      {s.label}
                    </span>
                    <span
                      className="oaxii-shimmer-text"
                      style={
                        {
                          fontFamily: FONT.body,
                          fontSize: 36,
                          fontWeight: 700,
                          letterSpacing: '-0.02em',
                          ['--shim-a' as string]: s.rgb,
                          ['--shim-b' as string]: PALETTE.brassRgb,
                        } as React.CSSProperties
                      }
                    >
                      {s.value}
                    </span>
                  </div>
                </HeroFrame>
              ))}
            </div>
          </div>
        </HeroFrame>
      </section>

      <section style={{ paddingTop: 36 }}>
        <SectionHead title="TOP OF THE HOUR" kicker="5 LIVE STORIES" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {topStories.map((s) => {
            const claims = claimsForStory(s.id)
            const counts = {
              verified: claims.filter((c) => c.trace.verdict === 'verified').length,
              mixed: claims.filter((c) => c.trace.verdict === 'mixed').length,
              disputed: claims.filter((c) => c.trace.verdict === 'disputed').length,
              false: claims.filter((c) => c.trace.verdict === 'false').length,
            }
            const outlets = outletsForStory(s.id)
            return (
              <HeroFrame key={s.id} intensity="md" accentRgb={PALETTE.brassRgb}>
                <Link
                  href={`/headlines/story/${s.id}`}
                  style={{
                    display: 'block',
                    padding: 22,
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 340px)',
                      gap: 24,
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <Kicker>
                        {s.category.toUpperCase()} · {s.age.toUpperCase()}
                      </Kicker>
                      <h3
                        style={{
                          marginTop: 8,
                          fontFamily: FONT.body,
                          fontSize: 22,
                          fontWeight: 500,
                          letterSpacing: '-0.01em',
                          color: PALETTE.text,
                          lineHeight: 1.25,
                        }}
                      >
                        {s.headline}
                      </h3>
                      <p
                        style={{
                          marginTop: 8,
                          fontFamily: FONT.display,
                          fontSize: 16,
                          color: PALETTE.textSub,
                          lineHeight: 1.45,
                        }}
                      >
                        {s.dek}
                      </p>
                      <div style={{ marginTop: 14, maxWidth: 420 }}>
                        <SpectrumStrip
                          outlets={outlets.map((o) => ({
                            name: o.name,
                            spectrum: o.spectrum,
                            honestyScore: o.composite,
                          }))}
                          height={32}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                        gap: 8,
                      }}
                    >
                      <Stat label="CLAIMS" value={claims.length} rgb={PALETTE.brassRgb} shimmer />
                      <Stat label="VERIFIED" value={counts.verified} rgb={PALETTE.emeraldRgb} shimmer />
                      <Stat label="MIXED" value={counts.mixed} rgb={PALETTE.violetRgb} />
                      <Stat label="DISPUTED" value={counts.disputed} rgb={PALETTE.amberRgb} />
                      <Stat label="FALSE" value={counts.false} rgb={PALETTE.dangerRgb} loss />
                      <Stat label="OUTLETS" value={s.outletSlugs.length} rgb={PALETTE.cyanRgb} shimmer />
                    </div>
                  </div>
                </Link>
              </HeroFrame>
            )
          })}
        </div>
      </section>

      <section style={{ paddingTop: 48 }}>
        <SectionHead title="HONESTY LEADERBOARD" kicker="THIS MONTH" />
        <HeroFrame intensity="md" accentRgb={PALETTE.violetRgb}>
          <div style={{ padding: 22 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                gap: 24,
              }}
            >
              <div>
                <Kicker>TOP 5 · HIGHEST INTEGRITY</Kicker>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
                  {top10.map((o) => (
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
              </div>
              <div>
                <Kicker>BOTTOM 5 · NEEDS WORK</Kicker>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
                  {bottom10.map((o) => (
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
              </div>
            </div>
            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
              <PrimaryCTA href="/networks" iconName="network">
                See Full Leaderboard
              </PrimaryCTA>
            </div>
          </div>
        </HeroFrame>
      </section>

      <section style={{ paddingTop: 48 }}>
        <SectionHead title="A SAMPLE OF TODAY'S CLAIMS" kicker="GO STRAIGHT TO RECEIPTS" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 14,
          }}
        >
          {CLAIMS.slice(0, 6).map((c) => {
            const s = summarize(c)
            return (
              <ClaimCard
                key={c.id}
                id={s.id}
                text={s.text}
                verdict={s.verdict}
                outletCount={s.outletCount}
                agreeCount={s.agreeCount}
                disagreeCount={s.disagreeCount}
                primaryDocCount={s.primaryDocCount}
                subClaims={s.subClaims}
              />
            )
          })}
        </div>
      </section>

      <section style={{ paddingTop: 56, paddingBottom: 64 }}>
        <HeroFrame intensity="md" accentRgb={PALETTE.brassRgb}>
          <div
            style={{
              padding: '32px 36px',
              display: 'flex',
              gap: 24,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <OutlineIcon name="scale" size={42} color={PALETTE.brass} />
            <div style={{ flex: 1, minWidth: 240 }}>
              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: 24,
                  color: PALETTE.text,
                  lineHeight: 1.3,
                  maxWidth: 640,
                }}
              >
                Atlas Truth holds itself to the same standard it holds outlets.
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: FONT.display,
                  fontSize: 16,
                  color: PALETTE.textSub,
                  lineHeight: 1.5,
                  maxWidth: 640,
                }}
              >
                Our corrections log is public. Our methodology is version-controlled. Our
                editorial board is named, with conflict-of-interest disclosures.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <VerdictBadge verdict="verified" size="md" />
              <VerdictBadge verdict="corroborated" size="md" />
              <VerdictBadge
                verdict="mixed"
                size="md"
                subClaims={[
                  { text: 'Sample sub-claim verified.', verdict: 'verified' },
                  { text: 'Sample sub-claim false.', verdict: 'false' },
                ]}
              />
              <VerdictBadge verdict="disputed" size="md" />
              <VerdictBadge verdict="false" size="md" />
              <VerdictBadge verdict="unverified" size="md" />
            </div>
          </div>
        </HeroFrame>
      </section>
    </PageShell>
  )
}

function Stat({
  label,
  value,
  rgb,
  shimmer,
  loss,
}: {
  label: string
  value: number
  rgb: string
  shimmer?: boolean
  loss?: boolean
}) {
  return (
    <div
      style={{
        padding: '10px 12px',
        borderRadius: 12,
        background: `linear-gradient(135deg, rgba(${rgb},0.10), rgba(${rgb},0.02))`,
        border: `1px solid rgba(${rgb}, 0.18)`,
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontFamily: FONT.label,
          fontSize: 8,
          letterSpacing: '0.22em',
          color: PALETTE.textMuted,
        }}
      >
        {label}
      </div>
      <div
        className={shimmer ? 'oaxii-shimmer-text' : undefined}
        style={
          shimmer
            ? ({
                fontFamily: FONT.body,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                ['--shim-a' as string]: rgb,
                ['--shim-b' as string]: PALETTE.brassRgb,
              } as React.CSSProperties)
            : {
                fontFamily: FONT.body,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: loss ? PALETTE.lossText : PALETTE.textSub,
                textShadow: loss ? '0 0 12px rgba(239,68,68,0.45)' : undefined,
              }
        }
      >
        {value}
      </div>
    </div>
  )
}
