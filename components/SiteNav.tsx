'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FONT, PALETTE } from '@/design/constants'

const PILLARS: { href: string; label: string; rgb: string }[] = [
  { href: '/headlines', label: 'HEADLINES', rgb: PALETTE.pillar.headlines.rgb },
  { href: '/claim', label: 'CLAIM', rgb: PALETTE.pillar.claim.rgb },
  { href: '/networks', label: 'NETWORKS', rgb: PALETTE.pillar.networks.rgb },
  { href: '/track', label: 'TRACK', rgb: PALETTE.pillar.track.rgb },
]

const SECONDARY: { href: string; label: string }[] = [
  { href: '/about/methodology', label: 'METHOD' },
  { href: '/about/corrections', label: 'CORRECTIONS' },
  { href: '/about/governance', label: 'GOVERNANCE' },
  { href: '/settings', label: 'SETTINGS' },
]

export default function SiteNav() {
  const pathname = usePathname() || '/'

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(16px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
        background: 'linear-gradient(180deg, rgba(5,5,12,0.85), rgba(5,5,12,0.55))',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '14px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 32,
          flexWrap: 'wrap',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 10,
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              fontFamily: FONT.display,
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: '0.01em',
              color: PALETTE.text,
            }}
          >
            Atlas
          </span>
          <span
            className="oaxii-shimmer-text"
            style={
              {
                fontFamily: FONT.display,
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: '0.01em',
                ['--shim-a' as string]: PALETTE.brassRgb,
                ['--shim-b' as string]: PALETTE.violetRgb,
              } as React.CSSProperties
            }
          >
            Truth
          </span>
        </Link>

        <nav style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
          {PILLARS.map((p) => {
            const active = pathname.startsWith(p.href)
            return (
              <Link
                key={p.href}
                href={p.href}
                style={{
                  padding: '7px 12px',
                  borderRadius: 999,
                  fontFamily: FONT.label,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  border: active
                    ? `1px solid rgba(${p.rgb}, 0.45)`
                    : '1px solid transparent',
                  background: active
                    ? `linear-gradient(145deg, rgba(${p.rgb},0.16), rgba(${p.rgb},0.04))`
                    : 'transparent',
                  color: active ? `rgb(${p.rgb})` : PALETTE.textSub,
                  transition: 'all 240ms cubic-bezier(0.2,0.8,0.2,1)',
                }}
              >
                {p.label}
              </Link>
            )
          })}
        </nav>

        <div style={{ flex: 1 }} />

        <nav style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          {SECONDARY.map((s) => {
            const active = pathname.startsWith(s.href)
            return (
              <Link
                key={s.href}
                href={s.href}
                style={{
                  fontFamily: FONT.label,
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: active ? PALETTE.brass : PALETTE.textMuted,
                  textDecoration: 'none',
                }}
              >
                {s.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
