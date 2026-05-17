import HeroFrame from '@/components/HeroFrame'
import { PageShell, SectionHead, Kicker } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'

interface CorrectionEntry {
  id: string
  date: string
  claimId?: string
  summary: string
  body: string
}

const CORRECTIONS: CorrectionEntry[] = [
  {
    id: 'cor-2026-05-15',
    date: '2026-05-15',
    claimId: 'c-003',
    summary:
      'Claim c-003 verdict changed from CORROBORATED to DISPUTED after a late-filed proxy vote was surfaced.',
    body:
      'Reader Henry Ashford (The Hill) flagged that our roll-call pull on congress.gov 119-S-274 missed two late-filed proxy votes that contradicted the original "only member of her party" framing. We re-ran the roll-call, found two additional party defections, revised the verdict, and updated the methodology to log proxy votes on any party-line claim going forward.',
  },
  {
    id: 'cor-2026-05-14',
    date: '2026-05-14',
    claimId: 'c-008',
    summary:
      'Primary-doc timestamp on claim c-008 corrected to the 14:09 BST full transcript.',
    body:
      'No. 10 press secretary Maren Holloway noted that we had linked an earlier draft of the press transcript, dated 13:00 BST, rather than the released full transcript at 14:09 BST. The verdict (FALSE) did not change, but the source link was corrected and the dissent thread updated on the record.',
  },
  {
    id: 'cor-2026-05-12',
    date: '2026-05-12',
    summary:
      'Spectrum-band placement for The Atlantic adjusted from CENTER-LEFT to LEFT for the May review cycle.',
    body:
      'Our 12-month rolling coverage comparison shifted The Atlantic from CENTER-LEFT to LEFT effective the May quarterly review. The change affects only cross-spectrum agreement computation; it does not directly alter The Atlantic’s Honesty Score components. A note appears on the outlet’s profile so the change is not invisible.',
  },
  {
    id: 'cor-2026-04-29',
    date: '2026-04-29',
    summary:
      'Methodology page updated to clarify that opinion / analysis / satire content never carries a verdict.',
    body:
      'A reader observed that our description of how opinion content is handled was ambiguous. The methodology page now states explicitly that opinion, analysis, and satire are tagged in source panels and never carry a verdict, even when factual statements are quoted within them. The grading function was already enforcing this; the documentation now matches the code.',
  },
  {
    id: 'cor-2026-04-18',
    date: '2026-04-18',
    summary:
      'Headline-body fidelity rubric expanded to count literally-true-but-misleading headlines as a fidelity failure.',
    body:
      'During the v0.0.9-internal review, our outside reviewers flagged that a literally-true headline could still mislead in context, and our Process rubric did not penalise that case. The Process rubric was expanded; six monitored outlets saw their Process sub-score adjust on the following weekly recompute. The affected outlets are listed on the changelog of /networks/methodology.',
  },
]

export default function CorrectionsPage() {
  return (
    <PageShell maxWidth={1080}>
      <section style={{ paddingTop: 36 }}>
        <Kicker>ABOUT · CORRECTIONS · {CORRECTIONS.length} ENTRIES</Kicker>
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
          Where we erred.{' '}
          <span
            className="oaxii-shimmer-text"
            style={
              {
                ['--shim-a' as string]: PALETTE.brassRgb,
                ['--shim-b' as string]: PALETTE.violetRgb,
              } as React.CSSProperties
            }
          >
            Dated. Public. Never silently edited.
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
          The same standard we apply to monitored outlets applies to Atlas Truth. Every
          editorial change to a verdict, a source link, or a methodology rule is logged
          here in plain language.
        </p>
      </section>

      <section style={{ paddingTop: 28, paddingBottom: 64 }}>
        <SectionHead title="LOG" kicker="NEWEST FIRST" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {CORRECTIONS.map((c) => (
            <HeroFrame key={c.id} intensity="md" accentRgb={PALETTE.brassRgb}>
              <div
                style={{
                  padding: 24,
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: 24,
                  alignItems: 'flex-start',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: FONT.label,
                      fontSize: 10,
                      letterSpacing: '0.22em',
                      color: PALETTE.brass,
                    }}
                  >
                    {c.date}
                  </span>
                  {c.claimId && (
                    <div
                      style={{
                        marginTop: 6,
                        fontFamily: FONT.label,
                        fontSize: 8,
                        letterSpacing: '0.22em',
                        color: PALETTE.textMuted,
                      }}
                    >
                      CLAIM · {c.claimId.toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: FONT.display,
                      fontSize: 22,
                      lineHeight: 1.3,
                      color: PALETTE.text,
                      fontWeight: 500,
                    }}
                  >
                    {c.summary}
                  </h3>
                  <p
                    style={{
                      marginTop: 10,
                      fontFamily: FONT.body,
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: PALETTE.textSub,
                    }}
                  >
                    <strong style={{ color: PALETTE.brass }}>WHAT WE CHANGED &mdash; </strong>
                    {c.body}
                  </p>
                </div>
              </div>
            </HeroFrame>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
