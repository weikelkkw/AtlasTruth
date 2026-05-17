import HeroFrame from '@/components/HeroFrame'
import OutlineIcon from '@/components/OutlineIcon'
import { PageShell, SectionHead, Kicker, PrimaryCTA } from '@/components/ui'
import { FONT, PALETTE, METHODOLOGY_VERSION } from '@/design/constants'

const SECTIONS = [
  {
    href: '/about/methodology',
    icon: 'book',
    kicker: 'METHODOLOGY',
    title: 'How we grade.',
    body:
      'The long-form, version-controlled document that defines every verdict, every score, and every line we hold.',
    cta: 'Read the Method',
  },
  {
    href: '/about/sources',
    icon: 'document',
    kicker: 'SOURCES',
    title: 'Who we read.',
    body:
      'Every monitored outlet, every indexed primary-document feed, every band on the spectrum. Real ownership groups, real countries.',
    cta: 'See Sources',
  },
  {
    href: '/about/corrections',
    icon: 'scale',
    kicker: 'CORRECTIONS',
    title: 'Where we erred.',
    body:
      'Atlas Truth&rsquo;s own corrections log. Same standard we hold outlets to, applied to ourselves — published in public, dated, never silently edited.',
    cta: 'Read Corrections',
  },
  {
    href: '/about/governance',
    icon: 'user',
    kicker: 'GOVERNANCE',
    title: 'Who decides.',
    body:
      'Named editorial board, conflict-of-interest disclosures, funding sources, and a public ombudsman email.',
    cta: 'Meet the Board',
  },
]

export default function AboutIndexPage() {
  return (
    <PageShell maxWidth={1240}>
      <section style={{ paddingTop: 36 }}>
        <Kicker>ABOUT ATLAS TRUTH · {METHODOLOGY_VERSION}</Kicker>
        <h1
          style={{
            marginTop: 10,
            fontFamily: FONT.display,
            fontSize: 48,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            color: PALETTE.text,
            textWrap: 'balance',
          }}
        >
          Open methodology.{' '}
          <span
            className="oaxii-shimmer-text"
            style={
              {
                ['--shim-a' as string]: PALETTE.brassRgb,
                ['--shim-b' as string]: PALETTE.violetRgb,
              } as React.CSSProperties
            }
          >
            Public corrections. Named board.
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
          The product holds outlets to a process standard. The same standard applies to us
          — published, dated, version-controlled, and challengeable on every claim.
        </p>
      </section>

      <section style={{ paddingTop: 28, paddingBottom: 64 }}>
        <SectionHead title="THE FOUR DOCUMENTS" kicker="START WHEREVER YOU LIKE" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 16,
          }}
        >
          {SECTIONS.map((s) => (
            <HeroFrame key={s.href} intensity="md" accentRgb={PALETTE.brassRgb}>
              <div
                style={{
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  minHeight: 280,
                }}
              >
                <OutlineIcon name={s.icon} size={36} color={PALETTE.brass} />
                <Kicker>{s.kicker}</Kicker>
                <h3
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 26,
                    lineHeight: 1.2,
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
                    lineHeight: 1.6,
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
