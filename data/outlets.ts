import type { SpectrumBand } from '@/lib/verdict'

export interface Outlet {
  slug: string
  name: string
  ownershipGroup: string
  spectrum: SpectrumBand
  country: 'US' | 'UK' | 'EU' | 'AU' | 'CA' | 'INTL'
  language: 'en'
  composite: number
  process: number
  trackRecord: number
  disclosure: number
  sparkline: number[]
}

const spark = (base: number): number[] => {
  const out: number[] = []
  let v = base - 6
  for (let i = 0; i < 12; i++) {
    v += Math.round((Math.sin(i * 0.7) + Math.cos(i * 0.4)) * 3)
    out.push(Math.max(20, Math.min(95, v + i / 2)))
  }
  return out
}

export const OUTLETS: Outlet[] = [
  { slug: 'reuters', name: 'Reuters', ownershipGroup: 'Thomson Reuters', spectrum: 'center', country: 'UK', language: 'en', composite: 88, process: 92, trackRecord: 86, disclosure: 84, sparkline: spark(88) },
  { slug: 'ap', name: 'Associated Press', ownershipGroup: 'AP (Co-op)', spectrum: 'center', country: 'US', language: 'en', composite: 86, process: 90, trackRecord: 84, disclosure: 82, sparkline: spark(86) },
  { slug: 'bbc', name: 'BBC News', ownershipGroup: 'BBC (Public)', spectrum: 'center-left', country: 'UK', language: 'en', composite: 82, process: 86, trackRecord: 80, disclosure: 78, sparkline: spark(82) },
  { slug: 'npr', name: 'NPR', ownershipGroup: 'NPR (Member-funded)', spectrum: 'center-left', country: 'US', language: 'en', composite: 80, process: 84, trackRecord: 78, disclosure: 76, sparkline: spark(80) },
  { slug: 'pbs', name: 'PBS NewsHour', ownershipGroup: 'PBS', spectrum: 'center-left', country: 'US', language: 'en', composite: 79, process: 82, trackRecord: 78, disclosure: 76, sparkline: spark(79) },
  { slug: 'wsj', name: 'Wall Street Journal', ownershipGroup: 'News Corp', spectrum: 'center-right', country: 'US', language: 'en', composite: 78, process: 80, trackRecord: 80, disclosure: 70, sparkline: spark(78) },
  { slug: 'ft', name: 'Financial Times', ownershipGroup: 'Nikkei', spectrum: 'center-right', country: 'UK', language: 'en', composite: 81, process: 84, trackRecord: 82, disclosure: 72, sparkline: spark(81) },
  { slug: 'economist', name: 'The Economist', ownershipGroup: 'Exor / Trust', spectrum: 'center-right', country: 'UK', language: 'en', composite: 80, process: 82, trackRecord: 80, disclosure: 76, sparkline: spark(80) },
  { slug: 'cnn', name: 'CNN', ownershipGroup: 'Warner Bros Discovery', spectrum: 'left', country: 'US', language: 'en', composite: 64, process: 70, trackRecord: 62, disclosure: 60, sparkline: spark(64) },
  { slug: 'msnbc', name: 'MSNBC', ownershipGroup: 'NBCUniversal', spectrum: 'left', country: 'US', language: 'en', composite: 58, process: 62, trackRecord: 56, disclosure: 56, sparkline: spark(58) },
  { slug: 'nyt', name: 'New York Times', ownershipGroup: 'NYT Co.', spectrum: 'center-left', country: 'US', language: 'en', composite: 76, process: 80, trackRecord: 76, disclosure: 72, sparkline: spark(76) },
  { slug: 'wapo', name: 'Washington Post', ownershipGroup: 'Nash Holdings', spectrum: 'center-left', country: 'US', language: 'en', composite: 74, process: 78, trackRecord: 72, disclosure: 72, sparkline: spark(74) },
  { slug: 'guardian', name: 'The Guardian', ownershipGroup: 'Scott Trust', spectrum: 'left', country: 'UK', language: 'en', composite: 72, process: 76, trackRecord: 70, disclosure: 70, sparkline: spark(72) },
  { slug: 'foxnews', name: 'Fox News', ownershipGroup: 'Fox Corporation', spectrum: 'right', country: 'US', language: 'en', composite: 52, process: 56, trackRecord: 50, disclosure: 52, sparkline: spark(52) },
  { slug: 'nypost', name: 'New York Post', ownershipGroup: 'News Corp', spectrum: 'right', country: 'US', language: 'en', composite: 50, process: 52, trackRecord: 50, disclosure: 48, sparkline: spark(50) },
  { slug: 'dailymail', name: 'Daily Mail', ownershipGroup: 'DMGT', spectrum: 'right', country: 'UK', language: 'en', composite: 46, process: 48, trackRecord: 44, disclosure: 46, sparkline: spark(46) },
  { slug: 'breitbart', name: 'Breitbart', ownershipGroup: 'Breitbart News Network', spectrum: 'far-right', country: 'US', language: 'en', composite: 32, process: 34, trackRecord: 30, disclosure: 32, sparkline: spark(32) },
  { slug: 'dailywire', name: 'The Daily Wire', ownershipGroup: 'Bentkey Services', spectrum: 'far-right', country: 'US', language: 'en', composite: 38, process: 40, trackRecord: 36, disclosure: 38, sparkline: spark(38) },
  { slug: 'jacobin', name: 'Jacobin', ownershipGroup: 'Jacobin Foundation', spectrum: 'far-left', country: 'US', language: 'en', composite: 44, process: 46, trackRecord: 42, disclosure: 44, sparkline: spark(44) },
  { slug: 'theintercept', name: 'The Intercept', ownershipGroup: 'First Look Media', spectrum: 'far-left', country: 'US', language: 'en', composite: 56, process: 58, trackRecord: 56, disclosure: 54, sparkline: spark(56) },
  { slug: 'aljazeera', name: 'Al Jazeera English', ownershipGroup: 'Al Jazeera Media', spectrum: 'center-left', country: 'INTL', language: 'en', composite: 70, process: 72, trackRecord: 70, disclosure: 66, sparkline: spark(70) },
  { slug: 'bloomberg', name: 'Bloomberg', ownershipGroup: 'Bloomberg LP', spectrum: 'center', country: 'US', language: 'en', composite: 82, process: 84, trackRecord: 82, disclosure: 78, sparkline: spark(82) },
  { slug: 'axios', name: 'Axios', ownershipGroup: 'Cox Enterprises', spectrum: 'center', country: 'US', language: 'en', composite: 76, process: 78, trackRecord: 76, disclosure: 72, sparkline: spark(76) },
  { slug: 'politico', name: 'Politico', ownershipGroup: 'Axel Springer', spectrum: 'center', country: 'US', language: 'en', composite: 74, process: 76, trackRecord: 74, disclosure: 70, sparkline: spark(74) },
  { slug: 'thehill', name: 'The Hill', ownershipGroup: 'Nexstar', spectrum: 'center', country: 'US', language: 'en', composite: 68, process: 70, trackRecord: 68, disclosure: 64, sparkline: spark(68) },
  { slug: 'theatlantic', name: 'The Atlantic', ownershipGroup: 'Emerson Collective', spectrum: 'left', country: 'US', language: 'en', composite: 72, process: 74, trackRecord: 72, disclosure: 70, sparkline: spark(72) },
  { slug: 'newyorker', name: 'The New Yorker', ownershipGroup: 'Condé Nast', spectrum: 'left', country: 'US', language: 'en', composite: 73, process: 76, trackRecord: 72, disclosure: 70, sparkline: spark(73) },
  { slug: 'nationalreview', name: 'National Review', ownershipGroup: 'National Review Inst.', spectrum: 'right', country: 'US', language: 'en', composite: 60, process: 62, trackRecord: 60, disclosure: 56, sparkline: spark(60) },
  { slug: 'reason', name: 'Reason', ownershipGroup: 'Reason Foundation', spectrum: 'center-right', country: 'US', language: 'en', composite: 68, process: 70, trackRecord: 68, disclosure: 64, sparkline: spark(68) },
  { slug: 'thetimes', name: 'The Times (London)', ownershipGroup: 'News UK', spectrum: 'center-right', country: 'UK', language: 'en', composite: 74, process: 76, trackRecord: 74, disclosure: 70, sparkline: spark(74) },
  { slug: 'cbcnews', name: 'CBC News', ownershipGroup: 'CBC/Radio-Canada', spectrum: 'center-left', country: 'CA', language: 'en', composite: 76, process: 78, trackRecord: 76, disclosure: 72, sparkline: spark(76) },
  { slug: 'abcaus', name: 'ABC News (Australia)', ownershipGroup: 'ABC', spectrum: 'center', country: 'AU', language: 'en', composite: 78, process: 80, trackRecord: 78, disclosure: 74, sparkline: spark(78) },
  { slug: 'cbs', name: 'CBS News', ownershipGroup: 'Paramount', spectrum: 'center-left', country: 'US', language: 'en', composite: 70, process: 72, trackRecord: 70, disclosure: 66, sparkline: spark(70) },
  { slug: 'nbc', name: 'NBC News', ownershipGroup: 'NBCUniversal', spectrum: 'center-left', country: 'US', language: 'en', composite: 70, process: 72, trackRecord: 70, disclosure: 66, sparkline: spark(70) },
  { slug: 'abcnews', name: 'ABC News', ownershipGroup: 'Disney', spectrum: 'center-left', country: 'US', language: 'en', composite: 70, process: 72, trackRecord: 70, disclosure: 66, sparkline: spark(70) },
  { slug: 'usatoday', name: 'USA Today', ownershipGroup: 'Gannett', spectrum: 'center', country: 'US', language: 'en', composite: 70, process: 72, trackRecord: 70, disclosure: 66, sparkline: spark(70) },
  { slug: 'newsweek', name: 'Newsweek', ownershipGroup: 'IBT Media', spectrum: 'center', country: 'US', language: 'en', composite: 56, process: 58, trackRecord: 56, disclosure: 54, sparkline: spark(56) },
  { slug: 'businessinsider', name: 'Business Insider', ownershipGroup: 'Axel Springer', spectrum: 'center', country: 'US', language: 'en', composite: 64, process: 66, trackRecord: 64, disclosure: 60, sparkline: spark(64) },
  { slug: 'vox', name: 'Vox', ownershipGroup: 'Vox Media', spectrum: 'left', country: 'US', language: 'en', composite: 64, process: 66, trackRecord: 64, disclosure: 62, sparkline: spark(64) },
  { slug: 'propublica', name: 'ProPublica', ownershipGroup: 'Pro Publica Inc.', spectrum: 'center-left', country: 'US', language: 'en', composite: 86, process: 88, trackRecord: 88, disclosure: 80, sparkline: spark(86) },
]

export function outletBySlug(slug: string): Outlet | undefined {
  return OUTLETS.find((o) => o.slug === slug)
}
