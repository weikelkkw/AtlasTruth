import { claimsForStory, outletsForStory } from './stories'
import type { MatrixCell, MatrixClaim, MatrixOutlet } from '@/components/OutletMatrix'

function pickCellVerdict(outletName: string, claimId: string, agreeing: Set<string>, disagreeing: Set<string>): MatrixCell {
  if (disagreeing.has(outletName)) {
    return {
      verdict: 'false',
      excerpt: `"${outletName} reported a version that primary documents contradict on claim ${claimId}."`,
    }
  }
  if (agreeing.has(outletName)) {
    return {
      verdict: 'verified',
      excerpt: `"${outletName} reported this claim with sourcing consistent with the primary doc on ${claimId}."`,
    }
  }
  return { verdict: 'not-reported' }
}

export function matrixForStory(storyId: string): {
  outlets: MatrixOutlet[]
  claims: MatrixClaim[]
  cells: Record<string, Record<string, MatrixCell>>
} {
  const outlets = outletsForStory(storyId).map<MatrixOutlet>((o) => ({
    name: o.name,
    slug: o.slug,
    spectrum: o.spectrum,
  }))
  const claims = claimsForStory(storyId)
  const matrixClaims: MatrixClaim[] = claims.map((c) => ({ id: c.id, text: c.text }))

  const cells: Record<string, Record<string, MatrixCell>> = {}
  for (const o of outlets) {
    cells[o.slug] = {}
    for (const c of claims) {
      const agreeing = new Set(
        c.evidence.outletAgreements.filter((a) => a.agrees).map((a) => a.outlet)
      )
      const disagreeing = new Set(
        c.evidence.outletAgreements.filter((a) => !a.agrees).map((a) => a.outlet)
      )
      cells[o.slug][c.id] = pickCellVerdict(o.name, c.id, agreeing, disagreeing)
      if (cells[o.slug][c.id].verdict === 'verified') {
        if (c.trace.verdict === 'mixed') {
          cells[o.slug][c.id] = {
            verdict: 'mixed',
            excerpt: `"${o.name}'s framing of ${c.id} bundles a verified statistic with an overreaching national framing — same shape as the overall MIXED verdict."`,
          }
        } else if (c.trace.verdict === 'disputed') {
          cells[o.slug][c.id] = {
            verdict: 'disputed',
            excerpt: `"${o.name} reported this but other outlets in the spectrum tell a different story."`,
          }
        } else if (c.trace.verdict === 'false') {
          cells[o.slug][c.id] = {
            verdict: 'false',
            excerpt: `"${o.name} ran the original claim before retraction."`,
          }
        }
      }
    }
  }

  return { outlets, claims: matrixClaims, cells }
}
