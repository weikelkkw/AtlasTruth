'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { PALETTE, type PillarSlug } from '@/design/constants'

interface Theme {
  base: string
  text: string
  textSub: string
  textMuted: string
  accent: string
  accentRgb: string
  glass: string
  glassBorder: string
}

function buildTheme(pillar: PillarSlug): Theme {
  const p = PALETTE.pillar[pillar]
  return {
    base: PALETTE.base,
    text: PALETTE.text,
    textSub: PALETTE.textSub,
    textMuted: PALETTE.textMuted,
    accent: p.hex,
    accentRgb: p.rgb,
    glass: PALETTE.glass,
    glassBorder: PALETTE.glassBorder,
  }
}

const ThemeContext = createContext<Theme>(buildTheme('headlines'))

export function ThemeProvider({
  pillar = 'headlines',
  children,
}: {
  pillar?: PillarSlug
  children: ReactNode
}) {
  return <ThemeContext.Provider value={buildTheme(pillar)}>{children}</ThemeContext.Provider>
}

export function useTheme(): Theme {
  return useContext(ThemeContext)
}
