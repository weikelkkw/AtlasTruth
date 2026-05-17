'use client'

import type { CSSProperties, JSX } from 'react'

interface Props {
  name: string
  color?: string
  size?: number
  style?: CSSProperties
  glow?: boolean
}

const COMMON = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function Eye({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M2 12C4 7 8 4.5 12 4.5S20 7 22 12C20 17 16 19.5 12 19.5S4 17 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function Document({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M6 3H14L19 8V20A1 1 0 0 1 18 21H6A1 1 0 0 1 5 20V4A1 1 0 0 1 6 3Z" />
      <path d="M14 3V8H19" />
      <path d="M8 12H16M8 15H16M8 18H12" />
    </svg>
  )
}

function Scale({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M12 3V21" />
      <path d="M6 21H18" />
      <path d="M4 9L8 9L6 5L4 9ZM4 9C4 11 5 12 6 12C7 12 8 11 8 9" />
      <path d="M16 12L20 12L18 8L16 12ZM16 12C16 14 17 15 18 15C19 15 20 14 20 12" />
    </svg>
  )
}

function CheckShield({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M12 3L20 6V12C20 16 16 19.5 12 21C8 19.5 4 16 4 12V6L12 3Z" />
      <path d="M8.5 12L11 14.5L15.5 10" />
    </svg>
  )
}

function AlertTriangle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M12 4L21 20H3L12 4Z" />
      <path d="M12 10V14" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" />
    </svg>
  )
}

function Cross({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M6 6L18 18M18 6L6 18" />
    </svg>
  )
}

function Question({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5C9.5 8 10.5 7 12 7S14.5 8 14.5 9.5C14.5 11 13 11.5 12 12.5V14" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </svg>
  )
}

function SplitDiamond({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M12 3L21 12L12 21L3 12L12 3Z" />
      <path d="M12 3V21" />
    </svg>
  )
}

function Newspaper({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M4 5H17V19A2 2 0 0 1 19 21H6A2 2 0 0 1 4 19V5Z" />
      <path d="M17 9H20V19A2 2 0 0 1 19 21" />
      <path d="M7 9H14M7 12H14M7 15H11" />
    </svg>
  )
}

function Compass({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9L13 13L9 15L11 11L15 9Z" />
    </svg>
  )
}

function Pulse({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M3 12H7L9 7L12 17L14 11L16 12H21" />
    </svg>
  )
}

function River({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M3 6C6 6 6 9 9 9C12 9 12 6 15 6C18 6 18 9 21 9" />
      <path d="M3 12C6 12 6 15 9 15C12 15 12 12 15 12C18 12 18 15 21 15" />
      <path d="M3 18C6 18 6 21 9 21C12 21 12 18 15 18C18 18 18 21 21 21" />
    </svg>
  )
}

function Network({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M12 7L6 16M12 7L18 16M7 18H17" />
    </svg>
  )
}

function Settings({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3V5M12 19V21M3 12H5M19 12H21M5.6 5.6L7 7M17 17L18.4 18.4M5.6 18.4L7 17M17 7L18.4 5.6" />
    </svg>
  )
}

function Arrow({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M5 12H19M13 6L19 12L13 18" />
    </svg>
  )
}

function Search({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16L20 20" />
    </svg>
  )
}

function Clock({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7V12L15 14" />
    </svg>
  )
}

function User({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4 21C4 17 7 14 12 14C17 14 20 17 20 21" />
    </svg>
  )
}

function Pin({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M12 21C12 21 19 14 19 9A7 7 0 0 0 5 9C5 14 12 21 12 21Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

function Star({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M12 3L14.5 9L21 9.5L16 14L17.5 20.5L12 17L6.5 20.5L8 14L3 9.5L9.5 9L12 3Z" />
    </svg>
  )
}

function Book({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M5 4H17A2 2 0 0 1 19 6V20H7A2 2 0 0 1 5 18V4Z" />
      <path d="M5 18A2 2 0 0 1 7 16H19" />
      <path d="M9 8H15" />
    </svg>
  )
}

function Plus({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M12 5V19M5 12H19" />
    </svg>
  )
}

function Filter({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M4 5H20L14 13V20L10 18V13L4 5Z" />
    </svg>
  )
}

function Sparkle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M12 3V8M12 16V21M3 12H8M16 12H21M6 6L9 9M15 15L18 18M6 18L9 15M15 9L18 6" />
    </svg>
  )
}

function Globe({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12H21M12 3C14.5 6 15.5 9 15.5 12C15.5 15 14.5 18 12 21M12 3C9.5 6 8.5 9 8.5 12C8.5 15 9.5 18 12 21" />
    </svg>
  )
}

function Building({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <rect x="4" y="4" width="16" height="17" rx="1" />
      <path d="M8 8H10M14 8H16M8 12H10M14 12H16M8 16H10M14 16H16" />
      <path d="M11 21V17H13V21" />
    </svg>
  )
}

function Beaker({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M9 3V9L4 19A1 1 0 0 0 5 21H19A1 1 0 0 0 20 19L15 9V3" />
      <path d="M8 3H16" />
    </svg>
  )
}

function Cpu({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <rect x="5" y="5" width="14" height="14" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M3 9H5M3 12H5M3 15H5M19 9H21M19 12H21M19 15H21M9 3V5M12 3V5M15 3V5M9 19V21M12 19V21M15 19V21" />
    </svg>
  )
}

function Coin({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6V18C4 19.5 7.5 21 12 21C16.5 21 20 19.5 20 18V6" />
      <path d="M4 12C4 13.5 7.5 15 12 15C16.5 15 20 13.5 20 12" />
    </svg>
  )
}

function Megaphone({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...COMMON} aria-hidden>
      <path d="M3 10V14L17 18V6L3 10Z" />
      <path d="M17 9V15A3 3 0 0 0 17 9Z" />
      <path d="M6 14V19" />
    </svg>
  )
}

const GLYPHS: Record<string, (props: { size: number }) => JSX.Element> = {
  eye: Eye,
  document: Document,
  scale: Scale,
  shield: CheckShield,
  check: CheckShield,
  alert: AlertTriangle,
  warning: AlertTriangle,
  cross: Cross,
  false: Cross,
  question: Question,
  unverified: Question,
  split: SplitDiamond,
  mixed: SplitDiamond,
  newspaper: Newspaper,
  headlines: Newspaper,
  compass: Compass,
  pulse: Pulse,
  river: River,
  track: River,
  network: Network,
  networks: Network,
  settings: Settings,
  arrow: Arrow,
  search: Search,
  clock: Clock,
  user: User,
  pin: Pin,
  star: Star,
  book: Book,
  methodology: Book,
  plus: Plus,
  filter: Filter,
  sparkle: Sparkle,
  globe: Globe,
  building: Building,
  beaker: Beaker,
  cpu: Cpu,
  coin: Coin,
  business: Coin,
  megaphone: Megaphone,
  politics: Megaphone,
}

function resolve(name: string): (props: { size: number }) => JSX.Element {
  const n = name.toLowerCase()
  if (GLYPHS[n]) return GLYPHS[n]
  for (const key of Object.keys(GLYPHS)) {
    if (n.includes(key)) return GLYPHS[key]
  }
  return Sparkle
}

export default function OutlineIcon({
  name,
  color = '#e8c376',
  size = 22,
  style,
  glow = true,
}: Props) {
  const Icon = resolve(name)
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
        filter: glow
          ? `drop-shadow(0 0 6px ${color}66) drop-shadow(0 0 14px ${color}33)`
          : undefined,
        ...style,
      }}
    >
      <Icon size={size} />
    </span>
  )
}
