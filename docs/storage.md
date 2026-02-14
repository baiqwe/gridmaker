# Storage (R2) and Better Auth Cloudflare

MkFast uses **Cloudflare R2 only**, via the Worker bucket binding. No S3 SDK or third-party storage library is used.

## How our storage is implemented

- **Bucket**: Bound in `wrangler.jsonc` as `FILES` (`r2_buckets`). The Worker uses `env.FILES` (from `cloudflare:workers`).
- **Upload**: `POST /api/storage/upload` → validate session and file → `bucket.put(key, body, { httpMetadata: { contentType } })` → return `{ url, key }`.
- **URL**: If `STORAGE_PUBLIC_URL` is set, `url` is `publicUrl + key`. Otherwise we return a same-origin URL: `/api/storage/file?key=...`.
- **Serve**: `GET /api/storage/file?key=...` streams the object from R2 (`bucket.get(key)`). Used when no custom domain is configured.
- **Delete**: `storage.deleteFile(key)` → `bucket.delete(key)` (e.g. for future “remove avatar” or cleanup).

So we rely only on the [Cloudflare R2 Workers API](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/): no s3-mini or other SDK.

---

## Better Auth Cloudflare plugin

You asked about [better-auth-cloudflare](https://github.com/zpg6/better-auth-cloudflare) (and its [R2 module](https://github.com/zpg6/better-auth-cloudflare/blob/main/src/r2.ts)). Here are direct answers.

### 1. How is it implemented?

- **Better Auth integration**: Uses `createAuthEndpoint`, `getSessionFromCtx`, `sessionMiddleware` so all file endpoints are session-protected.
- **R2**: Uses the Worker’s R2 bucket binding to `put`/`get`/`delete`/`list` objects (same idea as our R2 usage).
- **Database**: Stores **file metadata** in the DB (via Better Auth’s adapter) in a `userFile` model: `id`, `userId`, `filename`, `originalName`, `contentType`, `size`, `r2Key`, `uploadedAt`, plus optional custom fields. Blobs live in R2; metadata and “which user owns which file” live in the DB.
- **Endpoints**: Upload (raw body + headers for filename/metadata), download by file id, delete by file id, list (paginated), get metadata. Download/delete/list read the DB first to resolve `fileId` → `r2Key` and enforce ownership.

So it’s “R2 + DB-backed file metadata + Better Auth session”, not “R2 only”.

### 2. Do you need to introduce this plugin?

- **For avatar-only (current MkFast use case): no.** We only need: upload → get a URL → save that URL in `user.image`. No file table, no list/download/delete by file id. Our R2 binding + upload route + optional `/api/storage/file` proxy are enough.
- **If you later want “user files”** (multiple files per user, list them, download/delete by file id, metadata in DB), then a plugin like this (or the same ideas implemented yourself) is useful. The tradeoff is maintenance: it’s a community repo, so you’d rely on the author or your own fork.

### 3. What does this project provide?

- **D1 / R2 / KV** integrations for Better Auth on Cloudflare.
- **R2 plugin value**: DB-backed file metadata, per-user isolation, session-based endpoints, upload/download/delete/list with validation and hooks. So the “special” part is the **metadata-in-DB + auth** layer on top of R2, not R2 itself.

### 4. If you don’t use the plugin, how do you implement storage?

We already did it in MkFast:

- **Only R2**: Use the Workers binding (`env.FILES`), no S3 SDK.
- **Upload**: One route that checks session, validates file, calls `bucket.put`, returns `{ url, key }`. Optionally rewrite `url` to the same-origin proxy when `STORAGE_PUBLIC_URL` is not set.
- **Serve**: One route `GET /api/storage/file?key=...` that calls `bucket.get(key)` and streams the body. Safe as long as keys are unguessable (e.g. `avatars/<uuid>.<ext>`).
- **Delete / list**: Implement only if you need them; they’re simple `bucket.delete(key)` and `bucket.list({ prefix })`. If you later add a file table (like the plugin), you’d add DB logic and optionally use the same R2 binding.

So: **no plugin required** for the current avatar flow; the plugin is relevant if you want a full “user files” feature with metadata in the DB.
