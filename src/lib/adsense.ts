import { clientEnv } from '@/env/client';

// Use the same build-time public ID for verification and seller authorization.
export function getAdsenseClient() {
  const value =
    clientEnv.VITE_GOOGLE_ADSENSE_CLIENT?.trim() || 'ca-pub-2499950673294937';
  return value && /^ca-pub-\d{16}$/.test(value) ? value : undefined;
}
