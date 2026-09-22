import 'server-only';
import { createHash } from 'node:crypto';

// Small per-instance sliding-window limiter. Good enough to stop floods from one visitor.
const buckets = new Map<string, number[]>();

export function limited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const list = (buckets.get(key) || []).filter(t => now - t < windowMs);
  list.push(now); buckets.set(key, list);
  if (buckets.size > 5000) buckets.clear();
  return list.length > max;
}

export function ipHashOf(req: Request): string {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  return createHash('sha256').update(ip).digest('hex').slice(0, 16);
}
