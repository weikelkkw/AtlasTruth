import WatchlistCard from '@/components/WatchlistCard'
import { PageShell, SectionHead, Kicker, PrimaryCTA } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'
import { SAMPLE_WATCHLISTS } from '@/data/watchlists'

export default function WatchlistsPage() {
  return (
    <PageShell maxWidth={1280}>
      <section style={{ paddingTop: 36 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <Kicker>TRACK · WATCHLISTS · {SAMPLE_WATCHLISTS.length} ACTIVE</Kicker>
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
              Your saved lines of sight.
            </h1>
          </div>
          <PrimaryCTA href="/track/watchlists" iconName="plus">
            New Watchlist
          </PrimaryCTA>
        </div>
      </section>

      <section style={{ paddingTop: 28, paddingBottom: 64 }}>
        <SectionHead title="WATCHLISTS" kicker="VOLUME OVER 14 DAYS" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: 14,
          }}
        >
          {SAMPLE_WATCHLISTS.map((w) => (
            <WatchlistCard key={w.id} watchlist={w} />
          ))}
        </div>
      </section>
    </PageShell>
  )
}
