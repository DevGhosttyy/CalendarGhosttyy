export async function apiFetch<T=any>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch((import.meta.env.VITE_EDGE_URL || '') + path, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) }
  });
  if(!res.ok) throw new Error(await res.text());
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : (await res.text() as any);
}
