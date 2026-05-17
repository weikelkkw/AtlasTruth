import Link from 'next/link'
import { notFound } from 'next/navigation'
import HeroFrame from '@/components/HeroFrame'
import VerdictBadge from '@/components/VerdictBadge'
import DissentLog from '@/components/DissentLog'
import OutlineIcon from '@/components/OutlineIcon'
import { PageShell, SectionHead, Kicker } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'
import { claimById } from '@/data/claims'
import { dissentsFor } from '@/data/dissent'
import { OUTLETS } from '@/data/outlets'
import { storyById } from '@/data/stories'
import { SPECTRUM_BANDS, spectrumIndex } from '@/lib/verdict'

interface PageProps {
  params: Promise<{ id: string }>
}

function outletByName(name: string) {
  return OUTLETS.find((o) => o.name === name)
}

export default async function ClaimPage({ params }: PageProps) {
  const { id } = await params
  const claim = claimById(id)
  if (!claim) notFound()

  const story = storyById(claim.storyId)
  const dissents = dissentsFor(id)
  const isMixed = claim.trace.verdict === 'mixed'

  return (
    <PageShell maxWidth={1180}>
      <section style={{ paddingTop: 32 }}>
        <HeroFrame intensity="lg" accentRgb={PALETTE.pillar.claim.rgb}>
          <div style={{ padding: '36px 36px 30px' }}>
            <div
              style={{
                display: 'flex',
                gap: 18,
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <Kicker>
                  CLAIM · {claim.id.toUpperCase()} · UPDATED {claim.updatedAt.slice(0, 10)} ·{' '}
                  {dissents.length} DISSENT{dissents.length === 1 ? '' : 'S'}
                </Kicker>
                {story && (
                  <Link
                    href={`/headlines/story/${story.id}`}
                    style={{
                      display: 'inline-block',
                      marginTop: 8,
                      fontFamily: FONT.label,
                      fontSize: 9,
                      letterSpacing: '0.22em',
                      color: PALETTE.brass,
                      textDecoration: 'none',
                    }}
                  >
                    ← STORY · {story.headline.toUpperCase()}
                  </Link>
                )}
                <h1
                  style={{
                    marginTop: 14,
                    fontFamily: FONT.display,
                    fontSize: 36,
                    lineHeight: 1.18,
                    color: PALETTE.text,
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    textWrap: 'balance',
                  }}
                >
                  {claim.text}
                </h1>
              </div>
              <VerdictBadge
                verdict={claim.trace.verdict}
                size="lg"
                subClaims={claim.evidence.subClaims}
              />
            </div>
          </div>
        </HeroFrame>
      </section>

      {isMixed && claim.evidence.subClaims && (
        <section style={{ paddingTop: 24 }}>
          <SectionHead title="MIXED VERDICT — BREAKDOWN" kicker="WHAT IS TRUE / WHAT IS NOT" />
          <HeroFrame intensity="md" accentRgb={PALETTE.violetRgb}>
            <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {claim.evidence.subClaims.map((sc, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: 14,
                    alignItems: 'flex-start',
                    padding: '12px 14px',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <VerdictBadge verdict={sc.verdict} size="sm" />
                  <div
                    style={{
                      fontFamily: FONT.display,
                      fontSize: 17,
                      lineHeight: 1.45,
                      color: PALETTE.textSub,
                    }}
                  >
                    {sc.text}
                  </div>
                </div>
              ))}
            </div>
          </HeroFrame>
        </section>
      )}

      <section style={{ paddingTop: 28 }}>
        <SectionHead title="SOURCES" kicker={`${claim.evidence.outletAgreements.length} OUTLETS REPORTED`} />
        <HeroFrame intensity="md" accentRgb={PALETTE.pillar.claim.rgb}>
          <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {claim.evidence.outletAgreements.map((a, i) => {
              const o = outletByName(a.outlet)
              const tint = SPECTRUM_BANDS[spectrumIndex(a.spectrum)].tint
              return (
                <div
                  key={`${a.outlet}-${i}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '4px 36px 1fr auto',
                    gap: 14,
                    alignItems: 'center',
                    padding: '10px 12px',
                    borderRadius: 12,
                    background: a.agrees
                      ? 'rgba(16,185,129,0.04)'
                      : 'rgba(239,68,68,0.05)',
                    border: a.agrees
                      ? '1px solid rgba(16,185,129,0.18)'
                      : '1px solid rgba(239,68,68,0.18)',
                  }}
                >
                  <span
                    style={{
                      alignSelf: 'stretch',
                      width: 4,
                      borderRadius: 2,
                      background: `linear-gradient(180deg, rgba(${tint},0.85), rgba(${tint},0.20))`,
                      boxShadow: `0 0 12px rgba(${tint},0.45)`,
                    }}
                  />
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background:
                        'linear-gradient(145deg, rgba(167,139,250,0.20), rgba(167,139,250,0.04))',
                      border: '1px solid rgba(167,139,250,0.30)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: FONT.label,
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      color: PALETTE.violet,
                    }}
                  >
                    {a.outlet
                      .split(/\s+/)
                      .map((p) => p[0])
                      .join('')
                      .slice(0, 3)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <Link
                      href={o ? `/networks/${o.slug}` : '#'}
                      style={{
                        fontFamily: FONT.body,
                        fontSize: 15,
                        color: PALETTE.text,
                        textDecoration: 'none',
                      }}
                    >
                      {a.outlet}
                    </Link>
                    <div
                      style={{
                        fontFamily: FONT.label,
                        fontSize: 8,
                        letterSpacing: '0.22em',
                        color: PALETTE.textMuted,
                        marginTop: 2,
                      }}
                    >
                      {SPECTRUM_BANDS[spectrumIndex(a.spectrum)].label}
                      {o && (
                        <span style={{ marginLeft: 10, color: PALETTE.brass }}>
                          HONESTY {o.composite}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 999,
                      fontFamily: FONT.label,
                      fontSize: 9,
                      letterSpacing: '0.20em',
                      color: a.agrees ? PALETTE.emerald : PALETTE.lossText,
                      border: a.agrees
                        ? '1px solid rgba(16,185,129,0.35)'
                        : '1px solid rgba(239,68,68,0.35)',
                      background: a.agrees
                        ? 'rgba(16,185,129,0.08)'
                        : 'rgba(239,68,68,0.08)',
                    }}
                  >
                    {a.agrees ? 'IN AGREEMENT' : 'IN DISAGREEMENT'}
                  </span>
                </div>
              )
            })}
          </div>
        </HeroFrame>
      </section>

      {claim.evidence.primaryDocs.length > 0 && (
        <section style={{ paddingTop: 28 }}>
          <SectionHead title="PRIMARY DOCUMENTS" kicker="THE PAPER TRAIL" />
          <HeroFrame intensity="md" accentRgb={PALETTE.brassRgb}>
            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {claim.evidence.primaryDocs.map((d) => {
                const corroboratesText = {
                  yes: 'CORROBORATES',
                  no: 'CONTRADICTS',
                  partial: 'PARTIALLY CORROBORATES',
                  silent: 'SILENT',
                }[d.corroborates]
                const tint =
                  d.corroborates === 'yes'
                    ? PALETTE.emeraldRgb
                    : d.corroborates === 'no'
                    ? PALETTE.dangerRgb
                    : d.corroborates === 'partial'
                    ? PALETTE.amberRgb
                    : PALETTE.textMuted
                return (
                  <div
                    key={d.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr auto',
                      gap: 14,
                      alignItems: 'center',
                      padding: '12px 14px',
                      borderRadius: 12,
                      background: 'rgba(232,195,118,0.04)',
                      border: '1px solid rgba(232,195,118,0.15)',
                    }}
                  >
                    <OutlineIcon name="document" size={28} color={PALETTE.brass} />
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: FONT.body,
                          fontSize: 15,
                          color: PALETTE.text,
                        }}
                      >
                        {d.source}
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
                        DOC ID · {d.id.toUpperCase()}
                      </div>
                    </div>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: 999,
                        fontFamily: FONT.label,
                        fontSize: 9,
                        letterSpacing: '0.20em',
                        color: `rgb(${tint})`,
                        border: `1px solid rgba(${tint}, 0.35)`,
                        background: `rgba(${tint}, 0.08)`,
                      }}
                    >
                      {corroboratesText}
                    </span>
                  </div>
                )
              })}
            </div>
          </HeroFrame>
        </section>
      )}

      <section style={{ paddingTop: 28 }}>
        <SectionHead title="DECISION TRACE" kicker={`RULE ${claim.trace.rule} · METHODOLOGY ${claim.trace.version}`} />
        <HeroFrame intensity="md" accentRgb={PALETTE.brassRgb}>
          <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 18,
                lineHeight: 1.5,
                color: PALETTE.textSub,
                maxWidth: 760,
              }}
            >
              {claim.trace.ruleDescription}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: 10,
              }}
            >
              {Object.entries(claim.trace.inputs).map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
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
                    {k.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  </div>
                  <div
                    className="oaxii-shimmer-text"
                    style={
                      {
                        fontFamily: FONT.body,
                        fontSize: 20,
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        ['--shim-a' as string]: PALETTE.brassRgb,
                        ['--shim-b' as string]: PALETTE.cyanRgb,
                      } as React.CSSProperties
                    }
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/about/methodology"
              style={{
                alignSelf: 'flex-start',
                fontFamily: FONT.label,
                fontSize: 9,
                letterSpacing: '0.22em',
                color: PALETTE.brass,
                textDecoration: 'none',
              }}
            >
              READ THE FULL METHODOLOGY →
            </Link>
          </div>
        </HeroFrame>
      </section>

      <section style={{ paddingTop: 28, paddingBottom: 60 }}>
        <SectionHead title="DISSENT LOG" kicker="HOLD US ACCOUNTABLE" />
        <DissentLog entries={dissents} />
      </section>
    </PageShell>
  )
}
