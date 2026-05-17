import Link from 'next/link'
import { notFound } from 'next/navigation'
import HeroFrame from '@/components/HeroFrame'
import TimelineRiver, { type RiverEntry } from '@/components/TimelineRiver'
import { PageShell, SectionHead, Kicker } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'
import { claimById } from '@/data/claims'

interface PageProps {
  params: Promise<{ claim: string }>
}

function buildRiver(): RiverEntry[] {
  return [
    {
      id: 'r-1',
      outlet: 'New York Post',
      outletSlug: 'nypost',
      date: '2026-05-11 09:14',
      phrase: 'PM endorses third-party run',
      drift: 'harder',
    },
    {
      id: 'r-2',
      outlet: 'Daily Mail',
      outletSlug: 'dailymail',
      date: '2026-05-12 06:02',
      phrase: 'PM caught backing rival candidate, footage shows',
      drift: 'harder',
    },
    {
      id: 'r-3',
      outlet: 'Breitbart',
      outletSlug: 'breitbart',
      date: '2026-05-13 04:30',
      phrase: 'Prime minister openly endorses third-party challenger',
      drift: 'harder',
    },
    {
      id: 'r-4',
      outlet: 'BBC News',
      outletSlug: 'bbc',
      date: '2026-05-14 11:48',
      phrase: 'Clip of PM remarks circulated out of context, full transcript shows opposite',
      drift: 'softer',
    },
    {
      id: 'r-5',
      outlet: 'Reuters',
      outletSlug: 'reuters',
      date: '2026-05-15 08:00',
      phrase: 'Edited 12-second clip mischaracterised No. 10 remarks, transcript released',
      drift: 'neutral',
    },
    {
      id: 'r-6',
      outlet: 'The Guardian',
      outletSlug: 'guardian',
      date: '2026-05-17 07:22',
      phrase: 'Spliced footage of PM endorsement contradicted by full transcript',
      drift: 'softer',
    },
  ]
}

export default async function DriftPage({ params }: PageProps) {
  const { claim: claimId } = await params
  const claim = claimById(claimId)
  if (!claim) notFound()

  const entries = buildRiver()

  return (
    <PageShell maxWidth={1180}>
      <section style={{ paddingTop: 32 }}>
        <Link
          href={`/claim/${claim.id}`}
          style={{
            display: 'inline-block',
            fontFamily: FONT.label,
            fontSize: 9,
            letterSpacing: '0.22em',
            color: PALETTE.brass,
            textDecoration: 'none',
          }}
        >
          ← BACK TO CLAIM · {claim.id.toUpperCase()}
        </Link>
        <Kicker>
          <span style={{ marginTop: 14, display: 'inline-block' }}>
            TRACK · PHRASING DRIFT · {entries.length} ENTRIES
          </span>
        </Kicker>
        <h1
          style={{
            marginTop: 10,
            fontFamily: FONT.display,
            fontSize: 36,
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: '-0.005em',
            color: PALETTE.text,
            textWrap: 'balance',
          }}
        >
          {claim.text}
        </h1>
      </section>

      <section style={{ paddingTop: 28 }}>
        <SectionHead title="PHRASING DRIFT" kicker="MAY 11 → MAY 17" />
        <TimelineRiver entries={entries} />
      </section>

      <section style={{ paddingTop: 24, paddingBottom: 64 }}>
        <HeroFrame intensity="sm" accentRgb={PALETTE.pillar.track.rgb}>
          <div
            style={{
              padding: 18,
              fontFamily: FONT.body,
              fontSize: 14,
              lineHeight: 1.6,
              color: PALETTE.textSub,
            }}
          >
            Drift labels are computed against the earliest outlet wording for the claim.
            &ldquo;Sharpened&rdquo; means the language grew more declarative; &ldquo;softened&rdquo;
            means the language hedged toward documentary qualifiers like &ldquo;alleged&rdquo;
            or &ldquo;mischaracterised&rdquo;. Each row is timestamped to the outlet&rsquo;s
            published edit time, not its first push notification.
          </div>
        </HeroFrame>
      </section>
    </PageShell>
  )
}
