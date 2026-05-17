import { notFound } from 'next/navigation'
import Link from 'next/link'
import HeroFrame from '@/components/HeroFrame'
import VerdictBadge from '@/components/VerdictBadge'
import { PageShell, SectionHead, Kicker } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'
import { outletBySlug } from '@/data/outlets'
import { CLAIMS } from '@/data/claims'
import { SPECTRUM_BANDS, spectrumIndex } from '@/lib/verdict'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function NetworkPage({ params }: PageProps) {
  const { slug } = await params
  const outlet = outletBySlug(slug)
  if (!outlet) notFound()

  const claimsReported = CLAIMS.filter((c) =>
    c.evidence.outletAgreements.some((a) => a.outlet === outlet.name)
  )

  const bandLabel = SPECTRUM_BANDS[spectrumIndex(outlet.spectrum)].label

  return (
    <PageShell maxWidth={1240}>
      <section style={{ paddingTop: 32 }}>
        <HeroFrame intensity="lg" accentRgb={PALETTE.pillar.networks.rgb}>
          <div
            style={{
              padding: '36px 36px 28px',
              display: 'grid',
              gridTemplateColumns: '96px 1fr auto',
              gap: 24,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 18,
                background:
                  'linear-gradient(145deg, rgba(167,139,250,0.24), rgba(167,139,250,0.06))',
                border: '1px solid rgba(167,139,250,0.40)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FONT.label,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: PALETTE.violet,
                boxShadow: '0 0 32px rgba(167,139,250,0.30)',
              }}
            >
              {outlet.name
                .split(/\s+/)
                .map((p) => p[0])
                .join('')
                .slice(0, 3)}
            </div>
            <div style={{ minWidth: 0 }}>
              <Kicker>
                NETWORK · {bandLabel} · {outlet.country} · {outlet.ownershipGroup.toUpperCase()}
              </Kicker>
              <h1
                style={{
                  marginTop: 8,
                  fontFamily: FONT.display,
                  fontSize: 42,
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                  fontWeight: 500,
                  color: PALETTE.text,
                }}
              >
                {outlet.name}
              </h1>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: FONT.display,
                  fontSize: 16,
                  color: PALETTE.textSub,
                  maxWidth: 600,
                }}
              >
                Honesty grades for {outlet.name} are computed from observable process behaviors,
                track record on adjudicated claims, and methodology disclosure — not from a
                political-ideology audit.
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Kicker>COMPOSITE</Kicker>
              <div
                className="oaxii-shimmer-text"
                style={
                  {
                    fontFamily: FONT.body,
                    fontSize: 72,
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    ['--shim-a' as string]: PALETTE.brassRgb,
                    ['--shim-b' as string]: PALETTE.violetRgb,
                  } as React.CSSProperties
                }
              >
                {outlet.composite}
              </div>
            </div>
          </div>
        </HeroFrame>
      </section>

      <section style={{ paddingTop: 24 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 12,
          }}
        >
          {[
            { label: 'PROCESS SCORE', value: outlet.process, accent: PALETTE.emeraldRgb },
            { label: 'TRACK RECORD', value: outlet.trackRecord, accent: PALETTE.cyanRgb },
            { label: 'METHODOLOGY DISCLOSURE', value: outlet.disclosure, accent: PALETTE.brassRgb },
            { label: 'COMPOSITE', value: outlet.composite, accent: PALETTE.violetRgb },
          ].map((k) => (
            <HeroFrame key={k.label} intensity="sm" accentRgb={k.accent}>
              <div style={{ padding: 16 }}>
                <Kicker>{k.label}</Kicker>
                <div
                  className="oaxii-shimmer-text"
                  style={
                    {
                      marginTop: 4,
                      fontFamily: FONT.body,
                      fontSize: 36,
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      ['--shim-a' as string]: k.accent,
                      ['--shim-b' as string]: PALETTE.brassRgb,
                    } as React.CSSProperties
                  }
                >
                  {k.value}
                </div>
                <div style={{ marginTop: 8 }}>
                  <svg width="100%" height={28} viewBox="0 0 100 28" preserveAspectRatio="none">
                    <path
                      d={buildSparkPath(outlet.sparkline, 100, 28)}
                      fill="none"
                      stroke={`rgb(${k.accent})`}
                      strokeWidth={1.4}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </HeroFrame>
          ))}
        </div>
      </section>

      <section style={{ paddingTop: 32 }}>
        <SectionHead
          title="TRACK RECORD"
          kicker={`${claimsReported.length} ADJUDICATED CLAIMS WHERE ${outlet.name.toUpperCase()} WAS A REPORTER`}
        />
        <HeroFrame intensity="md" accentRgb={PALETTE.pillar.networks.rgb}>
          <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {claimsReported.length === 0 && (
              <div
                style={{
                  fontFamily: FONT.body,
                  fontSize: 14,
                  color: PALETTE.textMuted,
                  textAlign: 'center',
                  padding: 22,
                }}
              >
                No adjudicated claims yet for this outlet.
              </div>
            )}
            {claimsReported.map((c) => (
              <Link
                key={c.id}
                href={`/claim/${c.id}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: 14,
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <VerdictBadge verdict={c.trace.verdict} size="sm" />
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 16,
                    lineHeight: 1.4,
                    color: PALETTE.textSub,
                    minWidth: 0,
                  }}
                >
                  {c.text}
                </div>
                <span
                  style={{
                    fontFamily: FONT.label,
                    fontSize: 8,
                    letterSpacing: '0.22em',
                    color: PALETTE.textMuted,
                  }}
                >
                  {c.updatedAt.slice(0, 10)}
                </span>
              </Link>
            ))}
          </div>
        </HeroFrame>
      </section>

      <section style={{ paddingTop: 32 }}>
        <SectionHead title="METHODOLOGY DISCLOSURE" kicker="QUARTERLY RUBRIC" />
        <HeroFrame intensity="md" accentRgb={PALETTE.brassRgb}>
          <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { q: 'Corrections policy published?', a: outlet.disclosure > 60 },
              { q: 'Ownership and conflicts disclosed?', a: outlet.disclosure > 50 },
              { q: 'Editorial standards document?', a: outlet.disclosure > 55 },
              { q: 'Bylines real and linked?', a: outlet.disclosure > 45 },
              { q: 'Funding sources disclosed?', a: outlet.disclosure > 60 },
              { q: 'Ombudsman or public editor?', a: outlet.disclosure > 70 },
            ].map((r, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  alignItems: 'center',
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 14,
                    color: PALETTE.textSub,
                  }}
                >
                  {r.q}
                </span>
                <span
                  style={{
                    fontFamily: FONT.label,
                    fontSize: 9,
                    letterSpacing: '0.22em',
                    color: r.a ? PALETTE.emerald : PALETTE.lossText,
                  }}
                >
                  {r.a ? 'YES' : 'NO'}
                </span>
              </div>
            ))}
          </div>
        </HeroFrame>
      </section>

      <section style={{ paddingTop: 32, paddingBottom: 60 }}>
        <SectionHead title="OWNERSHIP" />
        <HeroFrame intensity="md" accentRgb={PALETTE.violetRgb}>
          <div style={{ padding: 22 }}>
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 22,
                lineHeight: 1.35,
                color: PALETTE.text,
              }}
            >
              {outlet.ownershipGroup}
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: FONT.body,
                fontSize: 14,
                lineHeight: 1.55,
                color: PALETTE.textSub,
                maxWidth: 700,
              }}
            >
              Ownership structure and any controlling-stake disclosures appear here. Where
              ownership changes, Atlas Truth re-reviews spectrum placement and process
              metrics within the next quarterly cycle.
            </div>
          </div>
        </HeroFrame>
      </section>
    </PageShell>
  )
}

function buildSparkPath(values: number[], w: number, h: number): string {
  if (values.length === 0) return ''
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = Math.max(max - min, 1)
  const step = w / Math.max(values.length - 1, 1)
  return values
    .map((v, i) => {
      const x = i * step
      const y = h - ((v - min) / span) * h
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}
