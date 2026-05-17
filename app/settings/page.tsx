import HeroFrame from '@/components/HeroFrame'
import OutlineIcon from '@/components/OutlineIcon'
import { PageShell, SectionHead, Kicker, PrimaryCTA } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'

const SECTIONS = [
  {
    href: '/settings/account',
    icon: 'user',
    kicker: 'ACCOUNT',
    title: 'Name, email, sign-in.',
    body: 'Your basic account details and authentication.',
    cta: 'Manage Account',
  },
  {
    href: '/settings/watchlists',
    icon: 'eye',
    kicker: 'WATCHLISTS',
    title: 'Edit your saved topics.',
    body: 'Add, rename, or remove the topic and claim watchlists that power your timeline.',
    cta: 'Manage Watchlists',
  },
  {
    href: '/settings/billing',
    icon: 'coin',
    kicker: 'BILLING',
    title: 'Plan & usage.',
    body: 'Current Researcher plan, this month&rsquo;s usage, invoices, and payment method.',
    cta: 'Manage Billing',
  },
  {
    href: '/settings/methodology-overrides',
    icon: 'settings',
    kicker: 'METHODOLOGY OVERRIDES',
    title: 'Re-weight the index.',
    body:
      'Change the default 0.40 / 0.40 / 0.20 weighting for your personal leaderboards. Atlas Truth&rsquo;s defaults stay public.',
    cta: 'Adjust Weights',
  },
]

export default function SettingsIndexPage() {
  return (
    <PageShell maxWidth={1200}>
      <section style={{ paddingTop: 36 }}>
        <Kicker>SETTINGS</Kicker>
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
          Your account, your watchlists,{' '}
          <span
            className="oaxii-shimmer-text"
            style={
              {
                ['--shim-a' as string]: PALETTE.brassRgb,
                ['--shim-b' as string]: PALETTE.cyanRgb,
              } as React.CSSProperties
            }
          >
            your methodology.
          </span>
        </h1>
      </section>

      <section style={{ paddingTop: 28, paddingBottom: 64 }}>
        <SectionHead title="SECTIONS" kicker="FOUR PANELS" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 14,
          }}
        >
          {SECTIONS.map((s) => (
            <HeroFrame key={s.href} intensity="md" accentRgb={PALETTE.brassRgb}>
              <div
                style={{
                  padding: 22,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  minHeight: 240,
                }}
              >
                <OutlineIcon name={s.icon} size={32} color={PALETTE.brass} />
                <Kicker>{s.kicker}</Kicker>
                <h3
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 22,
                    lineHeight: 1.25,
                    color: PALETTE.text,
                    fontWeight: 500,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: PALETTE.textSub,
                    flex: 1,
                  }}
                  dangerouslySetInnerHTML={{ __html: s.body }}
                />
                <div>
                  <PrimaryCTA href={s.href} iconName="arrow">
                    {s.cta}
                  </PrimaryCTA>
                </div>
              </div>
            </HeroFrame>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
