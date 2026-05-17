import type { DissentEntry } from '@/components/DissentLog'

export const DISSENTS: Record<string, DissentEntry[]> = {
  'c-003': [
    {
      id: 'd-003-1',
      challenger: 'Henry Ashford',
      role: 'Staff reporter, The Hill',
      timestamp: '2026-05-15 09:14',
      argument:
        'Senator Mendoza also voted against the bill, but the roll-call linkage in the methodology missed a late-filed proxy. The "only member" framing should be softened pending a re-pull of 119-S-274.',
      editorialResponse: {
        author: 'Atlas Truth editorial',
        timestamp: '2026-05-15 17:40',
        body: 'Confirmed. We re-ran the roll-call pull, found two additional party defections via late proxies, and revised the verdict to DISPUTED. Methodology v0.1.0-alpha now logs proxy votes for any party-line claim.',
      },
    },
  ],
  'c-008': [
    {
      id: 'd-008-1',
      challenger: null,
      timestamp: '2026-05-14 11:02',
      argument:
        'The clip is technically real footage — the dissent is whether splicing constitutes "endorsement." Atlas Truth should grade the clip and the framing as two separate claims.',
      editorialResponse: {
        author: 'Atlas Truth editorial',
        timestamp: '2026-05-15 09:00',
        body: 'Reasonable. We split this into two sub-claims in the breakdown panel: (a) the clip is from the press conference (verified), (b) the framing accurately summarises the statement (false per full transcript).',
      },
    },
    {
      id: 'd-008-2',
      challenger: 'Maren Holloway',
      role: 'Press secretary, No. 10 Downing Street',
      timestamp: '2026-05-14 14:18',
      argument:
        'The transcript timestamp Atlas Truth used predates the released full transcript by 9 minutes. Please use the 14:09 BST release.',
      editorialResponse: {
        author: 'Atlas Truth editorial',
        timestamp: '2026-05-14 18:45',
        body: 'Updated. Primary doc now links to the 14:09 BST release. The verdict does not change.',
      },
    },
  ],
  'c-009': [
    {
      id: 'd-009-1',
      challenger: 'Dr. Rosa Mendel',
      role: 'Criminologist, Vera Institute',
      timestamp: '2026-05-14 08:00',
      argument:
        'The MIXED breakdown is correct, but the sub-claim copy should be tighter — "homicide rate" and "violent-crime rate" are different baskets and the FBI UCR release distinguishes them. Recommend showing both.',
      editorialResponse: {
        author: 'Atlas Truth editorial',
        timestamp: '2026-05-14 16:22',
        body: 'Accepted. The sub-claim panel now shows the two FBI UCR series separately.',
      },
    },
  ],
}

export function dissentsFor(claimId: string): DissentEntry[] {
  return DISSENTS[claimId] ?? []
}
