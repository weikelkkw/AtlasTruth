const STAFF_AVATAR_MAP: Record<string, string> = {
  'Maren Holloway': 'https://i.pravatar.cc/200?img=47',
  'Jordan Reyes': 'https://i.pravatar.cc/200?img=12',
  'Priya Anand': 'https://i.pravatar.cc/200?img=44',
  'Samuel Okonkwo': 'https://i.pravatar.cc/200?img=33',
  'Dr. Rosa Mendel': 'https://i.pravatar.cc/200?img=49',
  'Henry Ashford': 'https://i.pravatar.cc/200?img=68',
  'Linh Trang': 'https://i.pravatar.cc/200?img=23',
}

export function staffAvatarFor(name: string | undefined | null): string | undefined {
  if (!name) return undefined
  return STAFF_AVATAR_MAP[name.trim()]
}

export function monogramFor(name: string | undefined | null): string {
  if (!name) return '·'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '·'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
