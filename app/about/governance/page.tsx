import HeroFrame from '@/components/HeroFrame'
import OutlineIcon from '@/components/OutlineIcon'
import { PageShell, SectionHead, Kicker } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'
import { staffAvatarFor, monogramFor } from '@/lib/avatars'

interface BoardMember {
  name: string
  role: string
  bio: string
  conflicts: string
}

const BOARD: BoardMember[] = [
  {
    name: 'Maren Holloway',
    role: 'Editor-in-chief',
    bio: 'Twenty years on a cross-spectrum political desk; previously deputy standards editor at a wire service. Maren chairs the editorial board and owns final sign-off on methodology version releases.',
    conflicts: 'Spouse holds <0.1% in a publicly-traded media parent (Disclosed Q1 2026).',
  },
  {
    name: 'Jordan Reyes',
    role: 'Director of methodology',
    bio: 'Computational social scientist by training; built the original four-signal grading function and the primary-document retrieval pass. Maintains the versioned methodology document.',
    conflicts: 'Adviser to a public-interest legal nonprofit on records-access tooling (Disclosed Q1 2026).',
  },
  {
    name: 'Priya Anand',
    role: 'Standards & corrections lead',
    bio: 'Former public editor at a national daily. Owns the corrections log and the dissent-log response workflow. Sets the cadence of methodology reviews.',
    conflicts: 'No material outside positions disclosed.',
  },
  {
    name: 'Samuel Okonkwo',
    role: 'Ombudsman & public editor',
    bio: 'Independent ombudsman, retained on a fixed annual contract, reports outside the editorial reporting line. Reviews reader complaints and publishes a quarterly assessment.',
    conflicts: 'Independent of the editorial board; reports to the governance committee.',
  },
  {
    name: 'Dr. Rosa Mendel',
    role: 'External academic adviser',
    bio: 'Criminologist (Vera Institute affiliation). One of three named outside reviewers who signed off on the methodology before public release. Continues to consult on rubric updates.',
    conflicts: 'Receives a documented honorarium per quarterly review (Disclosed Q1 2026).',
  },
]

const FUNDING = [
  {
    label: 'READER SUBSCRIPTIONS',
    detail: '~74% of operating revenue. $39/mo Researcher and $9/mo Reader tiers. No advertising on any verdict page.',
  },
  {
    label: 'INSTITUTIONAL LICENSES',
    detail: '~22% of operating revenue. Universities and newsrooms license the claim graph + primary-doc index. Names of >$25k licensees disclosed annually.',
  },
  {
    label: 'PHILANTHROPIC GRANTS',
    detail: '~4% of operating revenue. Two named grantmakers with no editorial input. Grant agreements published in full.',
  },
]

export default function GovernancePage() {
  return (
    <PageShell maxWidth={1180}>
      <section style={{ paddingTop: 36 }}>
        <Kicker>ABOUT · GOVERNANCE · {BOARD.length} BOARD MEMBERS</Kicker>
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
          Who decides &mdash;{' '}
          <span
            className="oaxii-shimmer-text"
            style={
              {
                ['--shim-a' as string]: PALETTE.violetRgb,
                ['--shim-b' as string]: PALETTE.brassRgb,
              } as React.CSSProperties
            }
          >
            and what they hold.
          </span>
        </h1>
        <p
          style={{
            marginTop: 14,
            fontFamily: FONT.display,
            fontSize: 18,
            lineHeight: 1.5,
            color: PALETTE.textSub,
            maxWidth: 760,
          }}
        >
          Named editorial board, disclosed conflicts of interest, transparent funding, and
          an independent ombudsman reporting outside the editorial reporting line.
        </p>
      </section>

      <section style={{ paddingTop: 28 }}>
        <SectionHead title="EDITORIAL BOARD" kicker="ROLES + DISCLOSURES" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 14,
          }}
        >
          {BOARD.map((b) => (
            <HeroFrame key={b.name} intensity="md" accentRgb={PALETTE.pillar.networks.rgb}>
              <div
                style={{
                  padding: 22,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <Avatar name={b.name} />
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: FONT.display,
                        fontSize: 22,
                        lineHeight: 1.2,
                        color: PALETTE.text,
                        fontWeight: 500,
                      }}
                    >
                      {b.name}
                    </div>
                    <div
                      style={{
                        marginTop: 2,
                        fontFamily: FONT.label,
                        fontSize: 9,
                        letterSpacing: '0.22em',
                        color: PALETTE.violet,
                      }}
                    >
                      {b.role.toUpperCase()}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: PALETTE.textSub,
                  }}
                >
                  {b.bio}
                </p>
                <div
                  style={{
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: 'rgba(232,195,118,0.05)',
                    border: '1px solid rgba(232,195,118,0.18)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT.label,
                      fontSize: 8,
                      letterSpacing: '0.22em',
                      color: PALETTE.brass,
                    }}
                  >
                    CONFLICT OF INTEREST
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      fontFamily: FONT.body,
                      fontSize: 13,
                      lineHeight: 1.55,
                      color: PALETTE.textSub,
                    }}
                  >
                    {b.conflicts}
                  </div>
                </div>
              </div>
            </HeroFrame>
          ))}
        </div>
      </section>

      <section style={{ paddingTop: 36 }}>
        <SectionHead title="FUNDING" kicker="WHERE THE MONEY COMES FROM" />
        <HeroFrame intensity="md" accentRgb={PALETTE.brassRgb}>
          <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FUNDING.map((f) => (
              <div
                key={f.label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '220px 1fr',
                  gap: 18,
                  alignItems: 'flex-start',
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.label,
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    color: PALETTE.brass,
                  }}
                >
                  {f.label}
                </span>
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: PALETTE.textSub,
                  }}
                >
                  {f.detail}
                </span>
              </div>
            ))}
          </div>
        </HeroFrame>
      </section>

      <section style={{ paddingTop: 36, paddingBottom: 64 }}>
        <SectionHead title="OMBUDSMAN" kicker="INDEPENDENT REPORTING LINE" />
        <HeroFrame intensity="md" accentRgb={PALETTE.violetRgb}>
          <div
            style={{
              padding: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              flexWrap: 'wrap',
            }}
          >
            <OutlineIcon name="user" size={42} color={PALETTE.violet} />
            <div style={{ flex: 1, minWidth: 240 }}>
              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: 22,
                  color: PALETTE.text,
                }}
              >
                Samuel Okonkwo, Public Editor
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontFamily: FONT.body,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: PALETTE.textSub,
                  maxWidth: 620,
                }}
              >
                For reader complaints, methodology challenges, or any concern that an
                editorial decision was wrongly made &mdash; reach the ombudsman directly.
                Replies within five business days.
              </div>
            </div>
            <a
              href="mailto:ombudsman@atlas-truth.example"
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
              OMBUDSMAN@ATLAS-TRUTH.EXAMPLE
            </a>
          </div>
        </HeroFrame>
      </section>
    </PageShell>
  )
}

function Avatar({ name }: { name: string }) {
  const src = staffAvatarFor(name)
  if (src) {
    return (
      <img
        src={src}
        alt=""
        style={{
          width: 60,
          height: 60,
          borderRadius: 14,
          objectFit: 'cover',
          border: '1px solid rgba(167,139,250,0.40)',
          boxShadow: '0 0 24px rgba(167,139,250,0.25)',
        }}
      />
    )
  }
  return (
    <div
      style={{
        width: 60,
        height: 60,
        borderRadius: 14,
        background:
          'linear-gradient(145deg, rgba(167,139,250,0.22), rgba(167,139,250,0.04))',
        border: '1px solid rgba(167,139,250,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONT.label,
        fontSize: 14,
        fontWeight: 700,
        color: PALETTE.violet,
      }}
    >
      {monogramFor(name)}
    </div>
  )
}
