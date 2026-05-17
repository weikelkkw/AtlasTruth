import HeroFrame from '@/components/HeroFrame'
import { PageShell, SectionHead, Kicker } from '@/components/ui'
import { FONT, PALETTE, METHODOLOGY_VERSION } from '@/design/constants'

function H({ children, kicker }: { children: React.ReactNode; kicker?: string }) {
  return (
    <div style={{ marginTop: 36, marginBottom: 14 }}>
      {kicker && <Kicker>{kicker}</Kicker>}
      <h2
        style={{
          marginTop: kicker ? 6 : 0,
          fontFamily: FONT.display,
          fontSize: 30,
          lineHeight: 1.15,
          letterSpacing: '-0.005em',
          color: PALETTE.text,
          fontWeight: 500,
        }}
      >
        {children}
      </h2>
    </div>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        marginTop: 12,
        fontFamily: FONT.body,
        fontSize: 16,
        lineHeight: 1.65,
        color: PALETTE.textSub,
        maxWidth: 760,
      }}
    >
      {children}
    </p>
  )
}

function Pull({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        marginTop: 18,
        paddingLeft: 18,
        borderLeft: `2px solid ${PALETTE.brass}`,
        fontFamily: FONT.display,
        fontSize: 22,
        lineHeight: 1.45,
        color: PALETTE.text,
        fontStyle: 'italic',
        maxWidth: 760,
      }}
    >
      {children}
    </div>
  )
}

export default function NetworksMethodologyPage() {
  return (
    <PageShell maxWidth={1080}>
      <section style={{ paddingTop: 36 }}>
        <HeroFrame intensity="lg" accentRgb={PALETTE.brassRgb} accentRgb2={PALETTE.violetRgb}>
          <div style={{ padding: '40px 36px' }}>
            <Kicker>
              NETWORKS METHODOLOGY · {METHODOLOGY_VERSION} · LAST UPDATED 2026-05-17
            </Kicker>
            <h1
              style={{
                marginTop: 14,
                fontFamily: FONT.display,
                fontSize: 48,
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                fontWeight: 500,
                color: PALETTE.text,
                textWrap: 'balance',
              }}
            >
              How the Honesty Index{' '}
              <span
                className="oaxii-shimmer-text"
                style={
                  {
                    ['--shim-a' as string]: PALETTE.brassRgb,
                    ['--shim-b' as string]: PALETTE.violetRgb,
                  } as React.CSSProperties
                }
              >
                is calculated.
              </span>
            </h1>
            <p
              style={{
                marginTop: 14,
                fontFamily: FONT.display,
                fontSize: 19,
                lineHeight: 1.5,
                color: PALETTE.textSub,
                maxWidth: 720,
              }}
            >
              Three measured components. One published formula. A version stamp on every
              verdict so a reader can audit which rule produced which score on any given day.
            </p>
          </div>
        </HeroFrame>
      </section>

      <section style={{ paddingTop: 16 }}>
        <H kicker="I · WHAT WE MEASURE">The three components</H>
        <P>
          The Honesty Index does not grade political position. It measures the observable
          process behaviors of a newsroom — the same way ratings agencies measure governance
          rather than mission. Every score on this site rolls up from three sub-scores, each
          on a 0&ndash;100 scale: <strong>Process</strong>, <strong>Track Record</strong>,
          and <strong>Methodology Disclosure</strong>.
        </P>
        <P>
          <strong>Process (0&ndash;100).</strong> Does the outlet publish a corrections
          policy? Does it cite primary sources? Are bylines real and linked to public
          biographies? Are opinion, analysis, and reporting clearly tagged? Are headlines
          faithful to the body of the article they introduce? These are observable, not
          inferred.
        </P>
        <P>
          <strong>Track Record (0&ndash;100).</strong> Across every adjudicated claim where
          the outlet was a reporter, what share landed VERIFIED or CORROBORATED versus FALSE,
          DISPUTED, or MIXED? How quickly does the outlet retract when contradicted by
          primary documents? Recent track record is weighted higher than historical.
        </P>
        <P>
          <strong>Methodology Disclosure (0&ndash;100).</strong> Does the outlet publish its
          editorial standards? Funding sources? Ownership and conflicts? Ombudsman contact?
          This is the most volatile of the three components because it can change overnight
          when a newsroom publishes (or retracts) a disclosure document.
        </P>
      </section>

      <section>
        <H kicker="II · THE FORMULA">The composite weighting</H>
        <HeroFrame intensity="md" accentRgb={PALETTE.brassRgb}>
          <div
            style={{
              padding: 28,
              fontFamily: FONT.display,
              fontSize: 26,
              lineHeight: 1.5,
              color: PALETTE.text,
              textAlign: 'center',
            }}
          >
            Honesty Score{' '}
            <span style={{ color: PALETTE.brass }}>=</span>{' '}
            <span
              className="oaxii-shimmer-text"
              style={
                {
                  ['--shim-a' as string]: PALETTE.emeraldRgb,
                  ['--shim-b' as string]: PALETTE.brassRgb,
                } as React.CSSProperties
              }
            >
              0.40
            </span>{' '}
            &times; Process{' '}
            <span style={{ color: PALETTE.brass }}>+</span>{' '}
            <span
              className="oaxii-shimmer-text"
              style={
                {
                  ['--shim-a' as string]: PALETTE.cyanRgb,
                  ['--shim-b' as string]: PALETTE.brassRgb,
                } as React.CSSProperties
              }
            >
              0.40
            </span>{' '}
            &times; Track Record{' '}
            <span style={{ color: PALETTE.brass }}>+</span>{' '}
            <span
              className="oaxii-shimmer-text"
              style={
                {
                  ['--shim-a' as string]: PALETTE.violetRgb,
                  ['--shim-b' as string]: PALETTE.brassRgb,
                } as React.CSSProperties
              }
            >
              0.20
            </span>{' '}
            &times; Disclosure
          </div>
        </HeroFrame>
        <P>
          Process and Track Record are weighted equally — what an outlet promises and what
          an outlet actually delivers should pull the same weight. Disclosure is one third
          of either, because while it matters, it is the lowest signal of the three and
          fastest to game.
        </P>
        <Pull>
          Two outlets with identical disclosure pages can have a 30-point spread on track
          record. The leaderboard reflects that. It always will.
        </Pull>
      </section>

      <section>
        <H kicker="III · USER OVERRIDES">You can re-weight the index</H>
        <P>
          Atlas Truth&rsquo;s defaults are 0.40 / 0.40 / 0.20. A reader who believes track
          record should dominate can re-weight on the{' '}
          <a
            href="/settings/methodology-overrides"
            style={{ color: PALETTE.brass, textDecoration: 'none' }}
          >
            methodology-overrides
          </a>{' '}
          page and the leaderboard re-sorts live in their session. The published default
          remains the published default — we don&rsquo;t hide your override from you, and
          we don&rsquo;t hide our default from anyone else.
        </P>
      </section>

      <section>
        <H kicker="IV · RECALCULATION CADENCE">When scores change</H>
        <P>
          The Honesty Index recomputes weekly in v1, on a known schedule. Every score on the
          site is timestamped to the moment it was generated, and the prior 12 readings are
          stored to power the sparkline on every <code>HonestyScoreCard</code>. A meaningful
          movement — &gt;5 points in either direction — triggers a public note in the
          outlet&rsquo;s profile so the change isn&rsquo;t invisible to the reader.
        </P>
      </section>

      <section>
        <H kicker="V · WHAT WE DO NOT MEASURE">The lines we hold</H>
        <P>
          We do not grade political position, audience demographics, advertiser pressure,
          tone, or perceived bias. Those are real and they matter — but they are not what
          this index is for. We grade observable process behaviors. If a reader wants a
          political-bias rating, there are good ones already, and we link to several in our{' '}
          <a href="/about/sources" style={{ color: PALETTE.brass, textDecoration: 'none' }}>
            sources
          </a>{' '}
          page.
        </P>
      </section>

      <section style={{ paddingTop: 36, paddingBottom: 64 }}>
        <SectionHead title="VERSION HISTORY" kicker="EVERY CHANGE IS LOGGED" />
        <HeroFrame intensity="md" accentRgb={PALETTE.brassRgb}>
          <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <ChangelogRow
              version={METHODOLOGY_VERSION}
              date="2026-05-17"
              note="Initial public release. Three-component composite with default weights 0.40 / 0.40 / 0.20. Sparkline history seeded from 12 weekly readings."
            />
            <ChangelogRow
              version="v0.0.9-internal"
              date="2026-05-10"
              note="Reviewer pass. Three named outside reviewers (academic, legal, working journalist) signed off on the formula and the dissent-log workflow."
            />
            <ChangelogRow
              version="v0.0.5-internal"
              date="2026-04-22"
              note="Process rubric expanded from 4 to 6 measured behaviors. Headline-body fidelity added as a Process input."
            />
          </div>
        </HeroFrame>
      </section>
    </PageShell>
  )
}

function ChangelogRow({
  version,
  date,
  note,
}: {
  version: string
  date: string
  note: string
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '140px 110px 1fr',
        gap: 18,
        alignItems: 'flex-start',
        padding: '10px 14px',
        borderRadius: 12,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <span
        className="oaxii-shimmer-text"
        style={
          {
            fontFamily: FONT.label,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.18em',
            ['--shim-a' as string]: PALETTE.brassRgb,
            ['--shim-b' as string]: PALETTE.cyanRgb,
          } as React.CSSProperties
        }
      >
        {version}
      </span>
      <span
        style={{
          fontFamily: FONT.label,
          fontSize: 9,
          letterSpacing: '0.22em',
          color: PALETTE.textMuted,
        }}
      >
        {date}
      </span>
      <span
        style={{
          fontFamily: FONT.body,
          fontSize: 14,
          lineHeight: 1.55,
          color: PALETTE.textSub,
        }}
      >
        {note}
      </span>
    </div>
  )
}
