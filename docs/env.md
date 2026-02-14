# Environment Variables (Vite .env only)

## What is `import.meta.env.VITE_BASE_URL`?

It is a **build-time** value. Vite reads `.env*` files and **replaces** every `import.meta.env.VITE_BASE_URL` in your code with the actual string (e.g. `"https://demo.mkflare.com"`) when you run `vite dev` or `vite build`. So the value does **not** come from the server at runtime; it is baked into the bundle.

## Where does the value come from?

Vite loads env files by **mode**:

| Command     | Mode        | Files loaded (later overrides earlier)     |
|------------|-------------|--------------------------------------------|
| `pnpm dev` | development | `.env` → `.env.development` → `.env.local` |
| `pnpm build` | production | `.env` → `.env.production` → `.env.production.local` |

Only variables that start with `VITE_` are exposed to your app; others are only available in Vite config.

## Single source: use only .env* files

You do **not** need `vars` in `wrangler.jsonc` or `.dev.vars` for `VITE_BASE_URL`.

- **Local dev** (`pnpm dev`): set `VITE_BASE_URL=http://localhost:3000` in `.env.local`.
- **Build & deploy** (`pnpm build` then `wrangler deploy`): set `VITE_BASE_URL=https://demo.mkflare.com` in `.env.production`.

When you run `pnpm build`, Vite uses production mode and loads `.env.production`, so both client and server bundles get the production URL. No extra config needed for deploy.

## Files summary

| File                      | When used    | Purpose |
|---------------------------|--------------|--------|
| `.env.local`              | `pnpm dev`   | Local base URL (e.g. localhost). Gitignored. |
| `.env.production`         | `pnpm build` | Production base URL. **Do not commit**; copy from `.env.production.example`. |

Optional: `.dev.vars` is only for `wrangler dev` (e.g. Worker secrets). Not needed for `VITE_BASE_URL` if you only use .env.

## Storage (S3-compatible, e.g. R2)

For avatar upload and file storage, set in `.dev.vars` (local) or Wrangler secrets (production), and set `websiteConfig.storage.enable` to `true` in `src/config/website.ts`:

- `STORAGE_REGION` – e.g. `auto` for Cloudflare R2
- `STORAGE_ENDPOINT` – S3 endpoint URL (e.g. R2 bucket endpoint)
- `STORAGE_ACCESS_KEY_ID` – S3 access key
- `STORAGE_SECRET_ACCESS_KEY` – S3 secret key
- `STORAGE_BUCKET_NAME` – Bucket name
- `STORAGE_PUBLIC_URL` – (optional) Custom public URL for files
- `STORAGE_FORCE_PATH_STYLE` – (optional) Set to `false` to disable path-style
