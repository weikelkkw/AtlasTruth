export interface BraveSearchResult {
  title: string
  url: string
  snippet: string
  source: string
}

export async function braveSearch(
  query: string,
  count: number = 5
): Promise<BraveSearchResult[]> {
  const key = process.env.BRAVE_SEARCH_API_KEY
  if (!key) {
    console.error('BRAVE_SEARCH_API_KEY not set')
    return []
  }
  try {
    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${count}&search_lang=en`
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'X-Subscription-Token': key,
      },
    })
    if (!res.ok) {
      console.error('Brave Search error:', res.status, await res.text())
      return []
    }
    const data = await res.json()
    const results = data?.web?.results ?? []
    return results.map((r: Record<string, unknown>) => ({
      title: String(r.title ?? ''),
      url: String(r.url ?? ''),
      snippet: String(r.description ?? ''),
      source: (() => {
        try { return new URL(String(r.url ?? '')).hostname } catch { return String(r.url ?? '') }
      })(),
    }))
  } catch (err) {
    console.error('braveSearch error:', err)
    return []
  }
}
