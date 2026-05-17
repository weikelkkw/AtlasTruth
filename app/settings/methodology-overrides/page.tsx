import HeroFrame from '@/components/HeroFrame'
import { PageShell, SectionHead, Kicker } from '@/components/ui'
import { FONT, PALETTE, METHODOLOGY_VERSION } from '@/design/constants'

const SLIDERS = [
  {
    key: 'process',
    label: 'PROCESS WEIGHT',
    default: 0.4,
    accent: PALETTE.emeraldRgb,
    description:
      'Observable newsroom process: corrections policy, citation density, headline-body fidelity, opinion tagging.',
  },
  {
    key: 'track',
    label: 'TRACK RECORD WEIGHT',
    default: 0.4,
    accent: PALETTE.cyanRgb,
    description:
      'Adjudicated outcomes: share of VERIFIED / CORROBORATED versus FALSE / DISPUTED across the outlet&rsquo;s reporting.',
  },
  {
    key: 'disclosure',
    label: 'DISCLOSURE WEIGHT',
    default: 0.2,
    accent: PALETTE.violetRgb,
    description:
      'Methodology disclosure: ownership, funding, editorial standards, ombudsman, public corrections workflow.',
  },
]

export default function MethodologyOverridesPage() {
  return (
    <PageShell maxWidth={1080}>
      <section style={{ paddingTop: 36 }}>
        <Kicker>SETTINGS · METHODOLOGY OVERRIDES · {METHODOLOGY_VERSION}</Kicker>
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
          Re-weight the index.{' '}
          <span
            className="oaxii-shimmer-text"
            style={
              {
                ['--shim-a' as string]: PALETTE.brassRgb,
                ['--shim-b' as string]: PALETTE.violetRgb,
              } as React.CSSProperties
            }
          >
            Your defaults, not ours.
          </span>
        </h1>
        <p
          style={{
            marginTop: 14,
            fontFamily: FONT.body,
            fontSize: 16,
            lineHeight: 1.65,
            color: PALETTE.textSub,
            maxWidth: 720,
          }}
        >
          Atlas Truth publishes a default composite formula of{' '}
          <strong>0.40 Process / 0.40 Track Record / 0.20 Disclosure</strong>. If you
          believe a different weighting matches your priors, change it here. Your
          leaderboards re-sort live as you change the weights. The published defaults stay
          published.
        </p>
      </section>

      <section style={{ paddingTop: 28 }}>
        <SectionHead title="WEIGHTS" kicker="DRAG TO ADJUST" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {SLIDERS.map((s) => (
            <HeroFrame key={s.key} intensity="sm" accentRgb={s.accent}>
              <div
                style={{
                  padding: 22,
                  display: 'grid',
                  gridTemplateColumns: '1fr 100px',
                  gap: 22,
                  alignItems: 'center',
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 10,
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT.label,
                        fontSize: 11,
                        letterSpacing: '0.22em',
                        color: `rgb(${s.accent})`,
                      }}
                    >
                      {s.label}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT.label,
                        fontSize: 9,
                        letterSpacing: '0.22em',
                        color: PALETTE.textMuted,
                      }}
                    >
                      DEFAULT {s.default.toFixed(2)}
                    </span>
                  </div>
                  <p
                    style={{
                      marginTop: 8,
                      fontFamily: FONT.body,
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: PALETTE.textSub,
                      maxWidth: 580,
                    }}
                    dangerouslySetInnerHTML={{ __html: s.description }}
                  />
                  <div style={{ marginTop: 14 }}>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      defaultValue={s.default}
                      style={{
                        width: '100%',
                        accentColor: `rgb(${s.accent})`,
                        background: 'transparent',
                      }}
                    />
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span
                    className="oaxii-shimmer-text"
                    style={
                      {
                        fontFamily: FONT.body,
                        fontSize: 36,
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        ['--shim-a' as string]: s.accent,
                        ['--shim-b' as string]: PALETTE.brassRgb,
                      } as React.CSSProperties
                    }
                  >
                    {s.default.toFixed(2)}
                  </span>
                </div>
              </div>
            </HeroFrame>
          ))}
        </div>
      </section>

      <section style={{ paddingTop: 28, paddingBottom: 64 }}>
        <SectionHead title="WHAT THIS DOES" kicker="LIVE RE-SORT" />
        <HeroFrame intensity="md" accentRgb={PALETTE.brassRgb}>
          <div
            style={{
              padding: 26,
              fontFamily: FONT.body,
              fontSize: 15,
              lineHeight: 1.7,
              color: PALETTE.textSub,
              maxWidth: 740,
            }}
          >
            <p>
              When you change a weight, every leaderboard in your session re-sorts on the
              fly &mdash; the home page Honesty Leaderboard, the full{' '}
              <code>/networks</code> list, and any cross-spectrum agreement displayed on a
              story or claim page. Your override is local to your session and your account;
              it does not change what other readers see.
            </p>
            <p style={{ marginTop: 12 }}>
              Atlas Truth&rsquo;s published default formula remains{' '}
              <strong>0.40 / 0.40 / 0.20</strong> per the methodology document. The
              published score on every outlet profile is computed against the published
              defaults; your personal override is shown alongside it, never in place of it.
            </p>
            <p style={{ marginTop: 12 }}>
              See the full reasoning on the{' '}
              <a
                href="/networks/methodology"
                style={{ color: PALETTE.brass, textDecoration: 'none' }}
              >
                networks methodology
              </a>{' '}
              page.
            </p>
          </div>
        </HeroFrame>
      </section>
    </PageShell>
  )
}
