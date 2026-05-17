import HeroFrame from '@/components/HeroFrame'
import OutlineIcon from '@/components/OutlineIcon'
import { PageShell, SectionHead, Kicker, PrimaryCTA } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'

const FEATURES = [
  {
    href: '/track/watchlists',
    icon: 'eye',
    kicker: 'WATCHLISTS',
    title: 'Track topics and people over time.',
    body:
      'Build a saved list of topics, claims, or named figures and Atlas Truth quietly logs every adjudicated claim that touches them. Sparklines surface volume shifts before headlines do.',
    cta: 'Open Watchlists',
  },
  {
    href: '/track/timeline/sample-topic',
    icon: 'clock',
    kicker: 'NARRATIVE TIMELINE',
    title: 'Watch a story move across outlets.',
    body:
      'A grid of outlets on one axis and time on the other. Each cell shows that outlet&rsquo;s verdict colour for that day. Spot when coverage diverged from the documentary record.',
    cta: 'View Timeline',
  },
  {
    href: '/track/drift/c-008',
    icon: 'river',
    kicker: 'PHRASING DRIFT',
    title: 'See language sharpen — or soften — across the press.',
    body:
      'A claim&rsquo;s exact wording is rarely the same on day 7 as on day 1. The TimelineRiver shows the phrase each outlet used, when, and which direction the language drifted.',
    cta: 'Open River',
  },
]

export default function TrackIndexPage() {
  return (
    <PageShell maxWidth={1240}>
      <section style={{ paddingTop: 36 }}>
        <Kicker>TRACK PILLAR · LONGITUDINAL READING</Kicker>
        <h1
          style={{
            marginTop: 10,
            fontFamily: FONT.display,
            fontSize: 48,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            color: PALETTE.text,
          }}
        >
          A story is not a moment.{' '}
          <span
            className="oaxii-shimmer-text"
            style={
              {
                ['--shim-a' as string]: PALETTE.emeraldRgb,
                ['--shim-b' as string]: PALETTE.brassRgb,
              } as React.CSSProperties
            }
          >
            It is a trajectory.
          </span>
        </h1>
        <p
          style={{
            marginTop: 14,
            fontFamily: FONT.display,
            fontSize: 19,
            lineHeight: 1.5,
            color: PALETTE.textSub,
            maxWidth: 760,
          }}
        >
          Atlas Truth&rsquo;s Track pillar follows claims, phrasing, and outlet behaviour
          over days and weeks — not just the moment a story breaks.
        </p>
      </section>

      <section style={{ paddingTop: 28, paddingBottom: 64 }}>
        <SectionHead title="FEATURES" kicker="THREE WAYS TO TRACK" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 16,
          }}
        >
          {FEATURES.map((f) => (
            <HeroFrame key={f.href} intensity="md" accentRgb={PALETTE.pillar.track.rgb}>
              <div
                style={{
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  minHeight: 320,
                }}
              >
                <OutlineIcon name={f.icon} size={36} color={PALETTE.pillar.track.hex} />
                <Kicker>{f.kicker}</Kicker>
                <h3
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 26,
                    lineHeight: 1.2,
                    color: PALETTE.text,
                    fontWeight: 500,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: PALETTE.textSub,
                    flex: 1,
                  }}
                  dangerouslySetInnerHTML={{ __html: f.body }}
                />
                <div>
                  <PrimaryCTA href={f.href} iconName="arrow">
                    {f.cta}
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
