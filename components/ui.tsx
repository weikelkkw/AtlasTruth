'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { type CSSProperties, type ReactNode } from 'react'
import HeroFrame from './HeroFrame'
import OutlineIcon from './OutlineIcon'
import { FONT, PALETTE } from '@/design/constants'

export function SectionHead({
  title,
  kicker,
  align = 'left',
}: {
  title: string
  kicker?: string
  align?: 'left' | 'center'
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 12,
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        marginBottom: 12,
      }}
    >
      <span style={{ width: 24, height: 1, background: PALETTE.brass }} />
      <span
        style={{
          fontFamily: FONT.label,
          fontSize: 10,
          letterSpacing: '0.22em',
          color: PALETTE.textSub,
        }}
      >
        {title}
      </span>
      {kicker && (
        <span
          style={{
            fontFamily: FONT.label,
            fontSize: 9,
            letterSpacing: '0.22em',
            color: PALETTE.textMuted,
          }}
        >
          {kicker}
        </span>
      )}
      <span
        style={{
          flex: 1,
          height: 1,
          background: 'linear-gradient(90deg, rgba(232,195,118,0.35), transparent)',
        }}
      />
    </div>
  )
}

export function KpiTile({
  label,
  value,
  accentRgb = PALETTE.brassRgb,
  secondaryRgb,
  unit,
  trend,
  loss = false,
}: {
  label: string
  value: string | number
  accentRgb?: string
  secondaryRgb?: string
  unit?: string
  trend?: string
  loss?: boolean
}) {
  return (
    <HeroFrame intensity="sm" accentRgb={accentRgb} accentRgb2={secondaryRgb}>
      <div style={{ padding: 16, minWidth: 0 }}>
        <div
          style={{
            fontFamily: FONT.label,
            fontSize: 9,
            letterSpacing: '0.22em',
            color: PALETTE.textMuted,
          }}
        >
          {label}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 6,
            marginTop: 6,
            minWidth: 0,
          }}
        >
          {loss ? (
            <span
              className="oaxii-loss-text"
              style={{
                fontFamily: FONT.body,
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              {value}
            </span>
          ) : (
            <span
              className="oaxii-shimmer-text"
              style={
                {
                  fontFamily: FONT.body,
                  fontSize: 30,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  ['--shim-a' as string]: accentRgb,
                  ['--shim-b' as string]: secondaryRgb ?? PALETTE.brassRgb,
                } as React.CSSProperties
              }
            >
              {value}
            </span>
          )}
          {unit && (
            <span
              style={{
                fontFamily: FONT.label,
                fontSize: 10,
                letterSpacing: '0.18em',
                color: PALETTE.textMuted,
              }}
            >
              {unit}
            </span>
          )}
        </div>
        {trend && (
          <div
            style={{
              marginTop: 4,
              fontFamily: FONT.label,
              fontSize: 9,
              letterSpacing: '0.18em',
              color: PALETTE.textSub,
            }}
          >
            {trend}
          </div>
        )}
      </div>
    </HeroFrame>
  )
}

export function PrimaryCTA({
  children,
  href,
  iconName,
  onClick,
  size = 'md',
}: {
  children: ReactNode
  href?: string
  iconName?: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
}) {
  const padding = size === 'lg' ? '12px 22px' : size === 'sm' ? '6px 12px' : '9px 18px'
  const fontSize = size === 'lg' ? 11 : size === 'sm' ? 9 : 10

  const inner = (
    <motion.span
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding,
        borderRadius: 999,
        cursor: 'pointer',
        background:
          'linear-gradient(145deg, rgba(232,195,118,0.18), rgba(34,211,238,0.06))',
        border: '1px solid rgba(232,195,118,0.45)',
        backdropFilter: 'blur(14px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(14px) saturate(1.4)',
        boxShadow:
          '0 10px 26px -10px rgba(232,195,118,0.50), inset 0 1px 0 rgba(255,255,255,0.10)',
      }}
    >
      {iconName && (
        <OutlineIcon name={iconName} size={fontSize + 2} color={PALETTE.brass} glow={false} />
      )}
      <span
        className="oaxii-shimmer-text"
        style={
          {
            fontFamily: FONT.label,
            fontSize,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            ['--shim-a' as string]: PALETTE.brassRgb,
            ['--shim-b' as string]: PALETTE.cyanRgb,
          } as React.CSSProperties
        }
      >
        {children}
      </span>
    </motion.span>
  )

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none' }}>
        {inner}
      </Link>
    )
  }
  return (
    <button onClick={onClick} style={{ background: 'none', border: 'none', padding: 0 }}>
      {inner}
    </button>
  )
}

export function GlassPill({
  children,
  href,
  active = false,
  onClick,
  iconName,
  accentRgb,
}: {
  children: ReactNode
  href?: string
  active?: boolean
  onClick?: () => void
  iconName?: string
  accentRgb?: string
}) {
  const rgb = accentRgb ?? PALETTE.brassRgb
  const inner = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 11px',
        borderRadius: 999,
        background: active
          ? `linear-gradient(145deg, rgba(${rgb},0.18), rgba(${rgb},0.04))`
          : 'rgba(255,255,255,0.04)',
        border: active ? `1px solid rgba(${rgb},0.45)` : '1px solid rgba(255,255,255,0.10)',
        fontFamily: FONT.label,
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: '0.20em',
        textTransform: 'uppercase',
        color: active ? `rgb(${rgb})` : PALETTE.textSub,
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
      }}
    >
      {iconName && (
        <OutlineIcon name={iconName} size={11} color={active ? `rgb(${rgb})` : PALETTE.textMuted} glow={false} />
      )}
      {active ? (
        <span
          className="oaxii-shimmer-text"
          style={
            {
              fontFamily: FONT.label,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.20em',
              ['--shim-a' as string]: rgb,
              ['--shim-b' as string]: PALETTE.brassRgb,
            } as React.CSSProperties
          }
        >
          {children}
        </span>
      ) : (
        children
      )}
    </span>
  )

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none' }}>
        {inner}
      </Link>
    )
  }

  return (
    <button onClick={onClick} style={{ background: 'none', border: 'none', padding: 0 }}>
      {inner}
    </button>
  )
}

export function FilterRow({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function PageShell({
  children,
  maxWidth = 1200,
}: {
  children: ReactNode
  maxWidth?: number
}) {
  return (
    <div
      style={{
        maxWidth,
        margin: '0 auto',
        padding: '24px 28px 0',
      }}
    >
      {children}
    </div>
  )
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        fontFamily: FONT.label,
        fontSize: 10,
        letterSpacing: '0.24em',
        textTransform: 'uppercase',
        color: PALETTE.textMuted,
      }}
    >
      {children}
    </span>
  )
}
