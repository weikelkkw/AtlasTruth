import HeroFrame from '@/components/HeroFrame'
import { PageShell, SectionHead, Kicker, PrimaryCTA } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'

export default function BillingPage() {
  return (
    <PageShell maxWidth={1120}>
      <section style={{ paddingTop: 36 }}>
        <Kicker>SETTINGS · BILLING</Kicker>
        <h1
          style={{
            marginTop: 10,
            fontFamily: FONT.display,
            fontSize: 40,
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            color: PALETTE.text,
          }}
        >
          Plan & usage.
        </h1>
      </section>

      <section style={{ paddingTop: 28 }}>
        <SectionHead title="CURRENT PLAN" kicker="MONTHLY · RENEWS 2026-06-01" />
        <HeroFrame intensity="md" accentRgb={PALETTE.brassRgb}>
          <div
            style={{
              padding: 28,
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 18,
              alignItems: 'center',
            }}
          >
            <div>
              <Kicker>RESEARCHER</Kicker>
              <div
                style={{
                  marginTop: 6,
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 6,
                }}
              >
                <span
                  className="oaxii-shimmer-text"
                  style={
                    {
                      fontFamily: FONT.body,
                      fontSize: 56,
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      ['--shim-a' as string]: PALETTE.brassRgb,
                      ['--shim-b' as string]: PALETTE.violetRgb,
                    } as React.CSSProperties
                  }
                >
                  $39
                </span>
                <span
                  style={{
                    fontFamily: FONT.label,
                    fontSize: 11,
                    letterSpacing: '0.22em',
                    color: PALETTE.textMuted,
                  }}
                >
                  / MONTH
                </span>
              </div>
              <p
                style={{
                  marginTop: 10,
                  fontFamily: FONT.body,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: PALETTE.textSub,
                  maxWidth: 520,
                }}
              >
                Full claim graph, unlimited watchlists, methodology overrides,
                primary-document feed access, and ad-free across every verdict page.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <PrimaryCTA iconName="settings">Manage Plan</PrimaryCTA>
              <PrimaryCTA iconName="coin" size="sm">
                Update Payment
              </PrimaryCTA>
            </div>
          </div>
        </HeroFrame>
      </section>

      <section style={{ paddingTop: 28, paddingBottom: 64 }}>
        <SectionHead title="USAGE THIS MONTH" kicker="MAY 2026 · 17 DAYS IN" />
        <HeroFrame intensity="md" accentRgb={PALETTE.cyanRgb}>
          <div
            style={{
              padding: 28,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 18,
            }}
          >
            <Stat label="CLAIMS OPENED" value="1,284" rgb={PALETTE.brassRgb} />
            <Stat label="WATCHLISTS ACTIVE" value="6" rgb={PALETTE.emeraldRgb} />
            <Stat label="PRIMARY DOCS PULLED" value="92" rgb={PALETTE.cyanRgb} />
            <Stat label="OVERRIDE SESSIONS" value="4" rgb={PALETTE.violetRgb} />
          </div>
          <div style={{ padding: '0 28px 28px', display: 'flex', justifyContent: 'flex-end' }}>
            <PrimaryCTA iconName="document">View Invoices</PrimaryCTA>
          </div>
        </HeroFrame>
      </section>
    </PageShell>
  )
}

function Stat({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return (
    <div
      style={{
        padding: '14px 16px',
        borderRadius: 14,
        background: `linear-gradient(135deg, rgba(${rgb},0.10), rgba(${rgb},0.02))`,
        border: `1px solid rgba(${rgb}, 0.20)`,
      }}
    >
      <div
        style={{
          fontFamily: FONT.label,
          fontSize: 9,
          letterSpacing: '0.22em',
          color: PALETTE.textMuted,
        }}
      >
        {label}
      </div>
      <div
        className="oaxii-shimmer-text"
        style={
          {
            marginTop: 6,
            fontFamily: FONT.body,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: '-0.02em',
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
