import type { Metadata } from 'next'
import { Cormorant_Garamond, Syncopate, DM_Sans } from 'next/font/google'
import './globals.css'
import SiteNav from '@/components/SiteNav'
import SiteFoot from '@/components/SiteFoot'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
})
const syncopate = Syncopate({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-syncopate',
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Atlas Truth — The Receipts, Before the Takes',
  description:
    'A premium news intelligence surface. Cross-spectrum aggregation, claim graph, primary-document corroboration, and a transparent honesty index for every outlet.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${syncopate.variable} ${dmSans.variable}`}
    >
      <body>
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <SiteNav />
          <main style={{ flex: 1 }}>{children}</main>
          <SiteFoot />
        </div>
      </body>
    </html>
  )
}
