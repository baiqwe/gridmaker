import { generateImage } from '@tanstack/ai';
import { falImage } from '@tanstack/ai-fal';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { serverEnv } from '@/env/server';

/**
 * AI demo server functions.
 *
 * - Text summarization: Cloudflare Workers AI (`@cf/facebook/bart-large-cnn`)
 *   via the plain Workers AI REST API (no extra adapter needed).
 *   Endpoint: https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/{model}
 *
 * - Image generation: fal.ai (`fal-ai/flux/schnell`) via the
 *   `@tanstack/ai-fal` adapter.
 *
 * Required env (Worker secrets):
 * - CLOUDFLARE_ACCOUNT_ID  (for summarize)
 * - CLOUDFLARE_API_TOKEN   Workers AI API token (for summarize)
 * - FAL_KEY                fal.ai API key (for image generation)
 */

const summarizeSchema = z.object({
  text: z
    .string()
    .min(50, 'Please provide at least 50 characters to summarize.')
    .max(8000, 'Text is too long, please keep it under 8000 characters.'),
});

const imageSchema = z.object({
  prompt: z
    .string()
    .min(3, 'Prompt is too short.')
    .max(500, 'Prompt is too long, please keep it under 500 characters.'),
});

/**
 * Summarize a long piece of text using Cloudflare Workers AI BART CNN
 * via the Workers AI REST API.
 */
export const summarizeText = createServerFn({ method: 'POST' })
  .inputValidator(summarizeSchema)
  .handler(async ({ data }) => {
    const accountId = serverEnv.CLOUDFLARE_ACCOUNT_ID;
    const apiKey = serverEnv.CLOUDFLARE_API_TOKEN;
    if (!accountId || !apiKey) {
      throw new Error(
        'Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN env. ' +
          'Set them as Worker secrets to use the Workers AI REST API.'
      );
    }

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/facebook/bart-large-cnn`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_text: data.text }),
      }
    );

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      throw new Error(
        `Workers AI request failed (${response.status}): ${errBody.slice(0, 200)}`
      );
    }

    const payload = (await response.json()) as {
      success?: boolean;
      result?: { summary?: string };
      errors?: Array<{ message?: string }>;
    };

    if (!payload.success || !payload.result?.summary) {
      const message =
        payload.errors?.[0]?.message ?? 'Empty response from Workers AI.';
      throw new Error(`Summarization failed: ${message}`);
    }

    return { summary: payload.result.summary };
  });

/**
 * Generate an image from a text prompt using fal.ai (Flux Schnell).
 * Returns the hosted image URL produced by fal.
 */
export const generateAiImage = createServerFn({ method: 'POST' })
  .inputValidator(imageSchema)
  .handler(async ({ data }) => {
    const apiKey = serverEnv.FAL_KEY;
    if (!apiKey) {
      throw new Error(
        'Missing FAL_KEY env. Set it as a Worker secret to use fal.ai.'
      );
    }

    const adapter = falImage('fal-ai/flux/schnell', { apiKey });

    const result = await generateImage({ adapter, prompt: data.prompt });

    const image = result.images?.[0];
    const imageUrl = image?.url;
    if (!imageUrl) {
      throw new Error('Image generation failed: empty response.');
    }

    return { imageUrl };
  });
