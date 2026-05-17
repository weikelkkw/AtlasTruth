import Link from 'next/link'
import { notFound } from 'next/navigation'
import HeroFrame from '@/components/HeroFrame'
import SpectrumStrip from '@/components/SpectrumStrip'
import { PageShell, SectionHead, Kicker, GlassPill, FilterRow } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'
import { STORIES, outletsForStory, claimsForStory } from '@/data/stories'

const CATEGORIES = ['breaking', 'us', 'world', 'politics', 'business', 'science', 'tech'] as const
type Cat = (typeof CATEGORIES)[number]

const ALL_PILLS = [
  { slug: 'all', label: 'ALL' },
  { slug: 'breaking', label: 'BREAKING' },
  { slug: 'us', label: 'US' },
  { slug: 'world', label: 'WORLD' },
  { slug: 'politics', label: 'POLITICS' },
  { slug: 'business', label: 'BUSINESS' },
  { slug: 'science', label: 'SCIENCE' },
  { slug: 'tech', label: 'TECH' },
]

interface PageProps {
  params: Promise<{ category: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  if (!CATEGORIES.includes(category as Cat)) notFound()
  const cat = category as Cat

  const stories = STORIES.filter((s) => s.category === cat)

  return (
    <PageShell maxWidth={1320}>
      <section style={{ paddingTop: 36 }}>
        <Kicker>{cat.toUpperCase()} · {stories.length} LIVE STORIES</Kicker>
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
          {cat === 'breaking'
            ? 'Live wire — honest about what we cannot grade yet.'
            : `Today in ${cat}, across every spectrum.`}
        </h1>
      </section>

      <section style={{ paddingTop: 24 }}>
        <FilterRow>
          {ALL_PILLS.map((c) => (
            <GlassPill
              key={c.slug}
              href={c.slug === 'all' ? '/headlines' : `/headlines/${c.slug}`}
              accentRgb={PALETTE.brassRgb}
              active={c.slug === cat}
            >
              {c.label}
            </GlassPill>
          ))}
        </FilterRow>
      </section>

      <section style={{ paddingTop: 24, paddingBottom: 60 }}>
        <SectionHead title="STORY GRID" kicker={`FILTERED · ${cat.toUpperCase()}`} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 14,
          }}
        >
          {stories.length === 0 && (
            <div
              style={{
                gridColumn: '1 / -1',
                padding: 40,
                textAlign: 'center',
                fontFamily: FONT.body,
                fontSize: 14,
                color: PALETTE.textMuted,
              }}
            >
              No live stories in this category right now.
            </div>
          )}
          {stories.map((s) => {
            const outlets = outletsForStory(s.id)
            const claims = claimsForStory(s.id)
            const isBreaking = s.category === 'breaking'
            return (
              <HeroFrame
                key={s.id}
                intensity="sm"
                accentRgb={isBreaking ? PALETTE.amberRgb : PALETTE.brassRgb}
              >
                <Link
                  href={`/headlines/story/${s.id}`}
                  style={{ display: 'block', padding: 18, textDecoration: 'none', color: 'inherit' }}
                >
                  <Kicker>
                    {s.category.toUpperCase()} · {s.age.toUpperCase()}
                  </Kicker>
                  <h3
                    style={{
                      marginTop: 8,
                      fontFamily: FONT.body,
                      fontSize: 18,
                      fontWeight: 500,
                      letterSpacing: '-0.005em',
                      color: PALETTE.text,
                      lineHeight: 1.3,
                    }}
                  >
                    {s.headline}
                  </h3>
                  <p
                    style={{
                      marginTop: 6,
                      fontFamily: FONT.display,
                      fontSize: 15,
                      color: PALETTE.textSub,
                      lineHeight: 1.45,
                    }}
                  >
                    {s.dek}
                  </p>
                  <div style={{ marginTop: 14 }}>
                    <SpectrumStrip
                      outlets={outlets.map((o) => ({
                        name: o.name,
                        spectrum: o.spectrum,
                        honestyScore: o.composite,
                      }))}
                      height={28}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      fontFamily: FONT.label,
                      fontSize: 9,
                      letterSpacing: '0.22em',
                      color: PALETTE.brass,
                    }}
                  >
                    {claims.length} CLAIMS · {outlets.length} OUTLETS
                  </div>
                </Link>
              </HeroFrame>
            )
          })}
        </div>
      </section>
    </PageShell>
  )
}
