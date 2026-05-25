const PREFIX = "platepal:cache:";
const TTL = 1000 * 60 * 60 * 6; // 6h

export function getCached<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const { v, t } = JSON.parse(raw);
    if (Date.now() - t > TTL) return null;
    return v as T;
  } catch {
    return null;
  }
}

export function setCached<T>(key: string, value: T) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify({ v: value, t: Date.now() }));
  } catch {
    /* quota */
  }
}

export async function cachedFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const hit = getCached<T>(key);
  if (hit !== null) return hit;
  const data = await fetcher();
  setCached(key, data);
  return data;
}