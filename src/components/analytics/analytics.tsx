import { ClarityAnalytics } from './clarity-analytics';
import { DataFastAnalytics } from './data-fast-analytics';
import { GoogleAnalytics } from './google-analytics';
import { PlausibleAnalytics } from './plausible-analytics';
import { UmamiAnalytics } from './umami-analytics';

/**
 * Renders all script-based analytics (only in production, when env vars are set).
 * Place as sibling in body, e.g. next to Toaster — no need to wrap app content.
 */
export function Analytics() {
  if (!import.meta.env.PROD) return null;

  return (
    <>
      <GoogleAnalytics />
      <UmamiAnalytics />
      <PlausibleAnalytics />
      <DataFastAnalytics />
      <ClarityAnalytics />
    </>
  );
}
