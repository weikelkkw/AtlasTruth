'use client'

import HeroFrame from './HeroFrame'
import OutlineIcon from './OutlineIcon'
import { FONT, PALETTE } from '@/design/constants'
import { Kicker } from './ui'
import { buildSparkPath, type Watchlist } from '@/data/watchlists'

export default function WatchlistCard({
  watchlist,
  trailing,
}: {
  watchlist: Watchlist
  trailing?: React.ReactNode
}) {
  const path = buildSparkPath(watchlist.spark, 120, 36)
  return (
    <HeroFrame intensity="sm" accentRgb={PALETTE.pillar.track.rgb}>
      <div
        style={{
          padding: 18,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <Kicker>{watchlist.topic.toUpperCase()}</Kicker>
            <div
              style={{
                marginTop: 6,
                fontFamily: FONT.body,
                fontSize: 18,
                fontWeight: 500,
                color: PALETTE.text,
              }}
            >
              {watchlist.name}
            </div>
          </div>
          <OutlineIcon name="eye" size={20} color={PALETTE.pillar.track.hex} />
        </div>

        <svg width="100%" height={36} viewBox="0 0 120 36" preserveAspectRatio="none">
          <path
            d={path}
            fill="none"
            stroke={`rgb(${watchlist.accent})`}
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span
              className="oaxii-shimmer-text"
              style={
                {
                  fontFamily: FONT.body,
                  fontSize: 26,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  ['--shim-a' as string]: watchlist.accent,
                  ['--shim-b' as string]: PALETTE.brassRgb,
                } as React.CSSProperties
              }
            >
              {watchlist.claimCount}
            </span>
            <span
              style={{
                fontFamily: FONT.label,
                fontSize: 9,
                letterSpacing: '0.22em',
                color: PALETTE.textMuted,
              }}
            >
              CLAIMS
            </span>
          </div>
          <span
            style={{
              fontFamily: FONT.label,
              fontSize: 8,
              letterSpacing: '0.22em',
              color: PALETTE.textMuted,
            }}
          >
            UPDATED · {watchlist.lastUpdated}
          </span>
        </div>

        {trailing && <div>{trailing}</div>}
      </div>
    </HeroFrame>
  )
}
