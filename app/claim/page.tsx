import ClaimCard from '@/components/ClaimCard'
import { PageShell, SectionHead, Kicker, GlassPill, FilterRow } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'
import { CLAIMS, summarize } from '@/data/claims'

const VERDICT_FILTERS = [
  { slug: 'all', label: 'ALL' },
  { slug: 'verified', label: 'VERIFIED' },
  { slug: 'corroborated', label: 'CORROBORATED' },
  { slug: 'mixed', label: 'MIXED' },
  { slug: 'disputed', label: 'DISPUTED' },
  { slug: 'false', label: 'FALSE' },
  { slug: 'unverified', label: 'UNVERIFIED' },
]

export default function ClaimIndexPage() {
  const adjudicated = [...CLAIMS].sort((a, b) =>
    a.updatedAt > b.updatedAt ? -1 : 1
  )

  return (
    <PageShell maxWidth={1320}>
      <section style={{ paddingTop: 36 }}>
        <Kicker>CLAIM GRAPH · {adjudicated.length} ADJUDICATED</Kicker>
        <h1
          style={{
            marginTop: 10,
            fontFamily: FONT.display,
            fontSize: 44,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            color: PALETTE.text,
          }}
        >
          Every claim, traceable to receipts.
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
          A single source-of-truth ledger for every adjudicated factual claim across the
          outlets we monitor. Each row links the verdict, the supporting outlets, and the
          primary documents — methodology version stamped on every decision.
        </p>
      </section>

      <section style={{ paddingTop: 24 }}>
        <FilterRow>
          {VERDICT_FILTERS.map((f) => (
            <GlassPill
              key={f.slug}
              accentRgb={PALETTE.pillar.claim.rgb}
              active={f.slug === 'all'}
            >
              {f.label}
            </GlassPill>
          ))}
        </FilterRow>
      </section>

      <section style={{ paddingTop: 24, paddingBottom: 64 }}>
        <SectionHead title="RECENT ADJUDICATIONS" kicker="NEWEST FIRST" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 14,
          }}
        >
          {adjudicated.map((c) => {
            const s = summarize(c)
            return (
              <ClaimCard
                key={c.id}
                id={s.id}
                text={s.text}
                verdict={s.verdict}
                outletCount={s.outletCount}
                agreeCount={s.agreeCount}
                disagreeCount={s.disagreeCount}
                primaryDocCount={s.primaryDocCount}
                subClaims={s.subClaims}
              />
            )
          })}
        </div>
      </section>
    </PageShell>
  )
}
