import HeroFrame from '@/components/HeroFrame'
import { PageShell, SectionHead, Kicker, PrimaryCTA } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'

const INPUT_STYLE = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 12,
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  fontFamily: FONT.body,
  fontSize: 15,
  color: PALETTE.text,
  outline: 'none',
} as const

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: FONT.label,
        fontSize: 9,
        letterSpacing: '0.22em',
        color: PALETTE.textMuted,
        display: 'block',
        marginBottom: 6,
      }}
    >
      {children}
    </span>
  )
}

export default function AccountPage() {
  return (
    <PageShell maxWidth={880}>
      <section style={{ paddingTop: 36 }}>
        <Kicker>SETTINGS · ACCOUNT</Kicker>
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
          Your account details.
        </h1>
      </section>

      <section style={{ paddingTop: 28 }}>
        <SectionHead title="PROFILE" kicker="NAME + EMAIL" />
        <HeroFrame intensity="md" accentRgb={PALETTE.brassRgb}>
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <Label>NAME</Label>
              <input
                type="text"
                defaultValue="Kenneth Weikel"
                style={INPUT_STYLE}
              />
            </div>
            <div>
              <Label>EMAIL</Label>
              <input
                type="email"
                defaultValue="kenneth@example.com"
                style={INPUT_STYLE}
              />
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <PrimaryCTA iconName="check">Save Changes</PrimaryCTA>
            </div>
          </div>
        </HeroFrame>
      </section>

      <section style={{ paddingTop: 24 }}>
        <SectionHead title="SECURITY" kicker="PASSWORD + SIGN-OUT" />
        <HeroFrame intensity="md" accentRgb={PALETTE.violetRgb}>
          <div
            style={{
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 15,
                    color: PALETTE.text,
                  }}
                >
                  Password
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontFamily: FONT.body,
                    fontSize: 13,
                    color: PALETTE.textSub,
                  }}
                >
                  Last changed 2026-04-18.
                </div>
              </div>
              <a
                href="#"
                style={{
                  fontFamily: FONT.label,
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  color: PALETTE.brass,
                  textDecoration: 'none',
                  padding: '10px 16px',
                  borderRadius: 999,
                  border: '1px solid rgba(232,195,118,0.45)',
                  background: 'rgba(232,195,118,0.06)',
                }}
              >
                SEND RESET LINK
              </a>
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 15,
                    color: PALETTE.text,
                  }}
                >
                  Sign out of this device
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontFamily: FONT.body,
                    fontSize: 13,
                    color: PALETTE.textSub,
                  }}
                >
                  You can sign back in any time with your email.
                </div>
              </div>
              <button
                style={{
                  fontFamily: FONT.label,
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  color: PALETTE.lossText,
                  background: 'rgba(239,68,68,0.06)',
                  border: '1px solid rgba(239,68,68,0.35)',
                  borderRadius: 999,
                  padding: '10px 16px',
                  cursor: 'pointer',
                  textShadow: '0 0 12px rgba(239,68,68,0.35)',
                }}
              >
                SIGN OUT
              </button>
            </div>
          </div>
        </HeroFrame>
      </section>

      <section style={{ paddingBottom: 64 }} />
    </PageShell>
  )
}
