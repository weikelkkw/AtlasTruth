import Link from 'next/link'
import HeroFrame from '@/components/HeroFrame'
import OutlineIcon from '@/components/OutlineIcon'
import { PageShell, SectionHead, Kicker } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'
import { OUTLETS } from '@/data/outlets'
import { SPECTRUM_BANDS, spectrumIndex } from '@/lib/verdict'

const FEEDS = [
  {
    name: 'CourtListener',
    icon: 'scale',
    description: 'Federal & state court CM/ECF dockets, orders, opinions, and PACER drops.',
  },
  {
    name: 'Federal Register',
    icon: 'document',
    description: 'Rule proposals, final rules, agency notices, and presidential documents.',
  },
  {
    name: 'SEC EDGAR',
    icon: 'building',
    description: 'Public-company filings, Form D, 8-K, 10-K, proxy and ownership disclosures.',
  },
  {
    name: 'congress.gov',
    icon: 'megaphone',
    description: 'Bill text, roll-call votes, committee actions, and member statements.',
  },
  {
    name: 'FEC Filings',
    icon: 'coin',
    description: 'Campaign finance: candidate, PAC, party, and IE committee filings.',
  },
  {
    name: 'BLS Releases',
    icon: 'pulse',
    description: 'Bureau of Labor Statistics scheduled releases: CPI, PPI, employment, JOLTS.',
  },
  {
    name: 'BEA Releases',
    icon: 'pulse',
    description: 'Bureau of Economic Analysis: GDP releases, revisions, regional accounts.',
  },
  {
    name: 'NGO Data Drops',
    icon: 'globe',
    description: 'Curated data drops from named NGOs with public methodology pages.',
  },
]

export default function SourcesPage() {
  const sortedOutlets = [...OUTLETS].sort((a, b) => b.composite - a.composite)

  return (
    <PageShell maxWidth={1240}>
      <section style={{ paddingTop: 36 }}>
        <Kicker>ABOUT · SOURCES · {OUTLETS.length} OUTLETS · {FEEDS.length} PRIMARY FEEDS</Kicker>
        <h1
          style={{
            marginTop: 10,
            fontFamily: FONT.display,
            fontSize: 44,
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            color: PALETTE.text,
          }}
        >
          Everything we read &mdash; named.
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
          The list of monitored outlets and indexed primary-document feeds. Atlas Truth
          does not grade an outlet it does not monitor, and does not corroborate a claim
          against a document not in this index.
        </p>
      </section>

      <section style={{ paddingTop: 28 }}>
        <SectionHead title="MONITORED OUTLETS" kicker="LINK TO PROFILE FOR FULL HONESTY GRADE" />
        <HeroFrame intensity="md" accentRgb={PALETTE.pillar.networks.rgb}>
          <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1.4fr 1.6fr 80px 90px',
                gap: 12,
                padding: '6px 10px',
                fontFamily: FONT.label,
                fontSize: 9,
                letterSpacing: '0.22em',
                color: PALETTE.textMuted,
              }}
            >
              <span>OUTLET</span>
              <span>SPECTRUM</span>
              <span>OWNERSHIP</span>
              <span style={{ textAlign: 'center' }}>COUNTRY</span>
              <span style={{ textAlign: 'right' }}>SCORE</span>
            </div>
            {sortedOutlets.map((o) => (
              <Link
                key={o.slug}
                href={`/networks/${o.slug}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1.4fr 1.6fr 80px 90px',
                  gap: 12,
                  alignItems: 'center',
                  padding: '10px 10px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 14,
                    color: PALETTE.text,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {o.name}
                </span>
                <span
                  style={{
                    fontFamily: FONT.label,
                    fontSize: 9,
                    letterSpacing: '0.20em',
                    color: PALETTE.textSub,
                  }}
                >
                  {SPECTRUM_BANDS[spectrumIndex(o.spectrum)].label}
                </span>
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 12,
                    color: PALETTE.textSub,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {o.ownershipGroup}
                </span>
                <span
                  style={{
                    fontFamily: FONT.label,
                    fontSize: 9,
                    letterSpacing: '0.20em',
                    color: PALETTE.textMuted,
                    textAlign: 'center',
                  }}
                >
                  {o.country}
                </span>
                <span
                  className="oaxii-shimmer-text"
                  style={
                    {
                      fontFamily: FONT.body,
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      textAlign: 'right',
                      ['--shim-a' as string]: PALETTE.brassRgb,
                      ['--shim-b' as string]: PALETTE.violetRgb,
                    } as React.CSSProperties
                  }
                >
                  {o.composite}
                </span>
              </Link>
            ))}
          </div>
        </HeroFrame>
      </section>

      <section style={{ paddingTop: 32, paddingBottom: 64 }}>
        <SectionHead title="PRIMARY-DOCUMENT FEEDS" kicker="THE PAPER TRAIL" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FEEDS.map((f) => (
            <HeroFrame key={f.name} intensity="sm" accentRgb={PALETTE.brassRgb}>
              <div
                style={{
                  padding: '14px 18px',
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr',
                  gap: 16,
                  alignItems: 'center',
                }}
              >
                <OutlineIcon name={f.icon} size={28} color={PALETTE.brass} />
                <div>
                  <div
                    style={{
                      fontFamily: FONT.body,
                      fontSize: 16,
                      fontWeight: 500,
                      color: PALETTE.text,
                    }}
                  >
                    {f.name}
                  </div>
                  <div
                    style={{
                      marginTop: 2,
                      fontFamily: FONT.body,
                      fontSize: 13,
                      lineHeight: 1.55,
                      color: PALETTE.textSub,
                    }}
                  >
                    {f.description}
                  </div>
                </div>
              </div>
            </HeroFrame>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
