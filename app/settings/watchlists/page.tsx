import WatchlistCard from '@/components/WatchlistCard'
import { GlassPill, PageShell, SectionHead, Kicker, PrimaryCTA } from '@/components/ui'
import { FONT, PALETTE } from '@/design/constants'
import { SAMPLE_WATCHLISTS } from '@/data/watchlists'

export default function SettingsWatchlistsPage() {
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
            <Kicker>SETTINGS · WATCHLISTS · {SAMPLE_WATCHLISTS.length} ACTIVE</Kicker>
            <h1
              style={{
                marginTop: 10,
                fontFamily: FONT.display,
                fontSize: 40,
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: PALETTE.text,
              }}
            >
              Edit your watchlists.
            </h1>
            <p
              style={{
                marginTop: 8,
                fontFamily: FONT.body,
                fontSize: 14,
                lineHeight: 1.6,
                color: PALETTE.textSub,
                maxWidth: 620,
              }}
            >
              Rename, archive, or remove any saved list. Each row carries inline edit and
              delete controls.
            </p>
          </div>
          <PrimaryCTA href="/settings/watchlists" iconName="plus">
            New Watchlist
          </PrimaryCTA>
        </div>
      </section>

      <section style={{ paddingTop: 28, paddingBottom: 64 }}>
        <SectionHead title="YOUR WATCHLISTS" kicker="INLINE EDIT" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: 14,
          }}
        >
          {SAMPLE_WATCHLISTS.map((w) => (
            <WatchlistCard
              key={w.id}
              watchlist={w}
              trailing={
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <GlassPill accentRgb={PALETTE.brassRgb} iconName="settings">
                    EDIT
                  </GlassPill>
                  <GlassPill accentRgb={PALETTE.dangerRgb} iconName="cross">
                    DELETE
                  </GlassPill>
                </div>
              }
            />
          ))}
        </div>
      </section>
    </PageShell>
  )
}
