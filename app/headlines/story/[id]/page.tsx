import { notFound } from 'next/navigation'
import HeroFrame from '@/components/HeroFrame'
import SpectrumStrip from '@/components/SpectrumStrip'
import OutletMatrix from '@/components/OutletMatrix'
import ClaimCard from '@/components/ClaimCard'
import { PageShell, SectionHead, Kicker } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'
import { storyById, outletsForStory, claimsForStory } from '@/data/stories'
import { matrixForStory } from '@/data/matrix'
import { summarize } from '@/data/claims'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function StoryPage({ params }: PageProps) {
  const { id } = await params
  const story = storyById(id)
  if (!story) notFound()

  const outlets = outletsForStory(id)
  const claims = claimsForStory(id)
  const matrix = matrixForStory(id)

  return (
    <PageShell maxWidth={1320}>
      <section style={{ paddingTop: 32 }}>
        <HeroFrame intensity="lg" accentRgb={PALETTE.brassRgb}>
          <div style={{ padding: '36px 36px 28px' }}>
            <Kicker>
              STORY · {claims.length} CLAIMS · {outlets.length} OUTLETS · UPDATED{' '}
              {story.age.toUpperCase()}
            </Kicker>
            <h1
              style={{
                marginTop: 12,
                fontFamily: FONT.display,
                fontSize: 42,
                lineHeight: 1.1,
                fontWeight: 500,
                color: PALETTE.text,
                letterSpacing: '-0.01em',
                maxWidth: 920,
              }}
            >
              {story.headline}
            </h1>
            <p
              style={{
                marginTop: 12,
                fontFamily: FONT.display,
                fontSize: 18,
                lineHeight: 1.5,
                color: PALETTE.textSub,
                maxWidth: 760,
              }}
            >
              {story.dek}
            </p>
            <div style={{ marginTop: 22, maxWidth: 700 }}>
              <SpectrumStrip
                outlets={outlets.map((o) => ({
                  name: o.name,
                  spectrum: o.spectrum,
                  honestyScore: o.composite,
                }))}
                height={36}
                showLabels
              />
            </div>
          </div>
        </HeroFrame>
      </section>

      <section style={{ paddingTop: 32 }}>
        <SectionHead title="OUTLET × CLAIM MATRIX" kicker="WHO REPORTED WHAT" />
        <OutletMatrix outlets={matrix.outlets} claims={matrix.claims} cells={matrix.cells} />
      </section>

      <section style={{ paddingTop: 36 }}>
        <SectionHead title="THE CLAIMS" kicker="TAP ANY CLAIM TO SEE RECEIPTS" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 14,
          }}
        >
          {claims.map((c) => {
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
