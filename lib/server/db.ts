import 'server-only';
import type { Firestore } from 'firebase-admin/firestore';

// One Firestore handle per server instance. Returns null when running without Google credentials
// (local dev), so callers can degrade gracefully instead of crashing.
let cached: Firestore | null | undefined;

export async function getDb(): Promise<Firestore | null> {
  if (cached !== undefined) return cached;
  const configured = !!(process.env.FIREBASE_CONFIG || process.env.GOOGLE_CLOUD_PROJECT || process.env.GOOGLE_APPLICATION_CREDENTIALS);
  if (!configured) { cached = null; return cached; }
  try {
    const { getApps, initializeApp, applicationDefault } = await import('firebase-admin/app');
    const { getFirestore } = await import('firebase-admin/firestore');
    if (!getApps().length) initializeApp({ credential: applicationDefault() });
    cached = getFirestore();
  } catch (err) {
    console.error('db: init failed', err);
    cached = null;
  }
  return cached;
}
