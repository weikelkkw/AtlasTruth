import Link from 'next/link'
import { FONT, PALETTE, METHODOLOGY_VERSION } from '@/design/constants'

export default function SiteFoot() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        marginTop: 80,
        padding: '32px 28px 60px',
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          display: 'flex',
          gap: 24,
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: FONT.label,
              fontSize: 9,
              letterSpacing: '0.24em',
              color: PALETTE.textMuted,
              marginBottom: 8,
            }}
          >
            ATLAS TRUTH · METHODOLOGY {METHODOLOGY_VERSION}
          </div>
          <div
            style={{
              fontFamily: FONT.display,
              fontSize: 18,
              color: PALETTE.textSub,
              maxWidth: 460,
              lineHeight: 1.4,
            }}
          >
            Truth is a method. Every verdict on this site links to its sources,
            primary documents, and the exact rule that produced it.
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(120px, auto))',
            gap: '6px 32px',
          }}
        >
          {[
            { href: '/about/methodology', label: 'Methodology' },
            { href: '/about/sources', label: 'Sources' },
            { href: '/about/corrections', label: 'Corrections' },
            { href: '/about/governance', label: 'Governance' },
            { href: '/networks/methodology', label: 'Honesty Index' },
            { href: '/settings/methodology-overrides', label: 'Overrides' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontFamily: FONT.label,
                fontSize: 9,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: PALETTE.textSub,
                textDecoration: 'none',
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
