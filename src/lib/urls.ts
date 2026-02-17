/** Fallback when VITE_BASE_URL is not set in .env (see docs/env.md). */
const DEFAULT_BASE_URL = 'http://localhost:8888';

/**
 * Site origin (build-time). Read via import.meta.env; set in .env.local (dev) or .env.production (build).
 */
export function getBaseUrl(): string {
  return import.meta.env.VITE_BASE_URL ?? DEFAULT_BASE_URL;
}

/**
 * Get the URL of the image, if the image is a relative path, it will be prefixed with the base URL
 * @param image - The image URL
 * @returns The URL of the image
 */
export function getImageUrl(image: string): string {
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  if (image.startsWith('/')) {
    return `${getBaseUrl()}${image}`;
  }
  return `${getBaseUrl()}/${image}`;
}

/**
 * Get the Stripe dashboard customer URL
 * @param customerId - The Stripe customer ID
 * @returns The Stripe dashboard customer URL
 */
export function getStripeDashboardCustomerUrl(customerId: string): string {
  if (import.meta.env.DEV) {
    return `https://dashboard.stripe.com/test/customers/${customerId}`;
  }
  return `https://dashboard.stripe.com/customers/${customerId}`;
}
