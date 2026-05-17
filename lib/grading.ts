import type { SpectrumBand, Verdict } from './verdict'

export const GRADING_VERSION = 'v0.1.0-alpha'

export interface SubClaim {
  text: string
  verdict: Verdict
}

export interface OutletAgreement {
  outlet: string
  spectrum: SpectrumBand
  agrees: boolean
}

export interface PrimaryDoc {
  id: string
  source: string
  corroborates: 'yes' | 'no' | 'partial' | 'silent'
}

export interface Retraction {
  outlet: string
  date: string
  reason: string
  independentAgreement: boolean
}

export interface HeadlineFidelity {
  outlet: string
  matchesBody: boolean
}

export interface Evidence {
  outletAgreements: OutletAgreement[]
  primaryDocs: PrimaryDoc[]
  retractions: Retraction[]
  headlineFidelity: HeadlineFidelity[]
  subClaims?: SubClaim[]
}

export interface DecisionTrace {
  verdict: Verdict
  rule: string
  ruleDescription: string
  inputs: {
    agreeingOutlets: number
    disagreeingOutlets: number
    spectrumBands: number
    primaryDocsCorroborating: number
    primaryDocsContradicting: number
    primaryDocsPartial: number
    primaryDocsSilent: number
    activeRetractions: number
    headlineFidelityFails: number
    subClaimsTrue: number
    subClaimsFalse: number
  }
  version: string
}

function uniqueSpectrum(agreeing: OutletAgreement[]): number {
  return new Set(agreeing.map((a) => a.spectrum)).size
}

export function computeVerdict(evidence: Evidence): DecisionTrace {
  const agreeing = evidence.outletAgreements.filter((o) => o.agrees)
  const disagreeing = evidence.outletAgreements.filter((o) => !o.agrees)
  const corroborating = evidence.primaryDocs.filter((d) => d.corroborates === 'yes')
  const contradicting = evidence.primaryDocs.filter((d) => d.corroborates === 'no')
  const partial = evidence.primaryDocs.filter((d) => d.corroborates === 'partial')
  const silent = evidence.primaryDocs.filter((d) => d.corroborates === 'silent')
  const activeRetractions = evidence.retractions.filter((r) => r.independentAgreement)
  const headlineFails = evidence.headlineFidelity.filter((h) => !h.matchesBody).length
  const headlineTotal = evidence.headlineFidelity.length
  const majorityFails = headlineTotal > 0 && headlineFails > headlineTotal / 2
  const spectrumCount = uniqueSpectrum(agreeing)
  const subTrue = evidence.subClaims?.filter((s) => s.verdict === 'verified' || s.verdict === 'corroborated').length ?? 0
  const subFalse = evidence.subClaims?.filter((s) => s.verdict === 'false' || s.verdict === 'disputed').length ?? 0

  const baseInputs = {
    agreeingOutlets: agreeing.length,
    disagreeingOutlets: disagreeing.length,
    spectrumBands: spectrumCount,
    primaryDocsCorroborating: corroborating.length,
    primaryDocsContradicting: contradicting.length,
    primaryDocsPartial: partial.length,
    primaryDocsSilent: silent.length,
    activeRetractions: activeRetractions.length,
    headlineFidelityFails: headlineFails,
    subClaimsTrue: subTrue,
    subClaimsFalse: subFalse,
  }

  // Rule 1 — sub-claim split → MIXED
  if (evidence.subClaims && subTrue >= 1 && subFalse >= 1) {
    return {
      verdict: 'mixed',
      rule: 'R1',
      ruleDescription:
        'Sub-claims contain both verified/corroborated and false/disputed components. Reality is mixed.',
      inputs: baseInputs,
      version: GRADING_VERSION,
    }
  }

  // Rule 2 — primary doc directly contradicts OR active retraction → FALSE
  if (contradicting.length >= 1 || activeRetractions.length >= 1) {
    return {
      verdict: 'false',
      rule: 'R2',
      ruleDescription:
        contradicting.length >= 1
          ? 'Primary document directly contradicts the claim.'
          : 'Retraction issued by originating outlet and independent reporting agrees the original was wrong.',
      inputs: baseInputs,
      version: GRADING_VERSION,
    }
  }

  // Rule 3 — partial doc → MIXED
  if (partial.length >= 1) {
    return {
      verdict: 'mixed',
      rule: 'R3',
      ruleDescription:
        'Primary document partially corroborates the claim. The breakdown panel shows which parts match and which do not.',
      inputs: baseInputs,
      version: GRADING_VERSION,
    }
  }

  const crossSpectrumConsensus =
    agreeing.length >= 3 && spectrumCount >= 2 && !majorityFails

  // Rule 4 — full corroboration → VERIFIED
  if (crossSpectrumConsensus && corroborating.length >= 1) {
    return {
      verdict: 'verified',
      rule: 'R4',
      ruleDescription:
        '≥3 independent outlets across ≥2 spectrum bands agree, ≥1 primary document corroborates, no live retraction, headline matches body.',
      inputs: baseInputs,
      version: GRADING_VERSION,
    }
  }

  // Rule 5 — cross-spectrum consensus, doc silent → CORROBORATED
  if (crossSpectrumConsensus && silent.length === evidence.primaryDocs.length) {
    return {
      verdict: 'corroborated',
      rule: 'R5',
      ruleDescription:
        '≥3 independent outlets across ≥2 spectrum bands agree but no primary document is available yet.',
      inputs: baseInputs,
      version: GRADING_VERSION,
    }
  }

  // Rule 6 — outlets disagree / single-spectrum / headline mismatch → DISPUTED
  if (
    disagreeing.length >= 1 ||
    (agreeing.length >= 1 && spectrumCount < 2) ||
    majorityFails
  ) {
    return {
      verdict: 'disputed',
      rule: 'R6',
      ruleDescription:
        disagreeing.length >= 1
          ? 'Outlets disagree on the facts. Coverage shows reporting conflict.'
          : majorityFails
          ? 'Headline-body fidelity fails on a majority of reporting outlets.'
          : 'Coverage is single-spectrum — no cross-band confirmation.',
      inputs: baseInputs,
      version: GRADING_VERSION,
    }
  }

  // Rule 7 — fallback → UNVERIFIED
  return {
    verdict: 'unverified',
    rule: 'R7',
    ruleDescription: 'Insufficient sourcing or claim is unfalsifiable as stated.',
    inputs: baseInputs,
    version: GRADING_VERSION,
  }
}
