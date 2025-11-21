# GenWeave AI – Frontend

Dark, production-ready Vite + React + Tailwind UI for the GenWeave AI material builder. Mirrors the provided inspiration screens with a hero landing page, multi-route experience, and a fully wired builder that polls the backend contract.

## Quick start

```bash
cd frontend
npm install
# Optional: enable mock APIs
cp .env.example .env.local
# edit .env.local and set VITE_USE_MOCK=true
npm run dev
```

Visit `http://localhost:5173`.

## Environment variables

| Name | Default | Purpose |
| --- | --- | --- |
| `VITE_BACKEND_BASE_URL` | `http://localhost:4000` | Base URL for all fetch calls |
| `VITE_USE_MOCK` | `false` | When `true`, `src/mockServer.js` intercepts fetch and simulates /api/* |

Set variables in `.env.local`. Restart Vite after changes.

## API contract wiring

All requests live in `src/utils/api.js`. They hit the backend contract described by the product brief:

1. `POST /api/generate` (multipart form-data) → returns `{ job_id, status }`
2. `GET /api/status/:job_id` → returns `{ job_id, stage, progress, thumbnails }`
3. `GET /api/result/:job_id` → returns `{ job_id, final_images, glb?, metadata }`
4. `GET /api/projects` (optional gallery preload)

Builder flow:

1. User selects prompt, texture, settings.
2. `createJob` uploads the payload and stores `job_id`.
3. Poll `getJobStatus` every 2s until `stage === 'done'` or `'error'`.
4. Fetch results via `getJobResult`, update preview + download buttons.

> TODO markers inside `api.js` specify where backend engineers swap the mock base URL, auth headers, or CORS handling.

## Mock server

- `VITE_USE_MOCK=true` enables `src/mockServer.js`, overriding `window.fetch`.
- Mock server simulates stage progression, low-res thumbnails, and final renders using Unsplash placeholders plus `src/assets/sample-wood.png`.
- Disable mocks by omitting the env var and pointing `VITE_BACKEND_BASE_URL` at the real backend.

## Example requests

```bash
curl -X POST $BACKEND_BASE_URL/api/generate \
  -F "prompt=Rustic mug hero render" \
  -F "quality=balanced" \
  -F "settings={\"grainScale\":48}" \
  -F "texture=@./sample.png"

curl $BACKEND_BASE_URL/api/status/<job_id>
curl $BACKEND_BASE_URL/api/result/<job_id>
```

## CORS reminder

Enable CORS on the backend for `http://localhost:5173` (Vite dev origin). Include credentials if auth cookies are required:

```ts
res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
res.header('Access-Control-Allow-Credentials', 'true');
```

## Folder structure

```
frontend/
├─ public/            # Vite entry HTML (fonts + root)
├─ src/
│  ├─ components/     # UI atoms and molecules
│  ├─ routes/         # Router views (Home / Builder / Gallery / Docs)
│  ├─ utils/          # API + constants
│  ├─ assets/         # Sample textures
│  └─ mockServer.js   # Optional mock fetch layer
└─ README.md
```

## Design cues

- Slightly dark gradients, glass panels, neon accents (#A3E635 + #FF8A00).
- Hero layout, card spacing, and typography inspired directly by `/mnt/data/717559f5-d399-4d3e-b1a6-286b564976a0.png` and `/mnt/data/Screenshot 2025-11-20 141323.png`.

## Swapping in the real backend

1. Ensure backend exposes the listed endpoints and accepts multipart file uploads for `/api/generate`.
2. Set `VITE_BACKEND_BASE_URL`.
3. Remove `VITE_USE_MOCK` env var (or set to `false`).
4. Restart `npm run dev`.
5. Verify builder flow end-to-end.

