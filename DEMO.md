# GenWeave AI – Demo Flow

Use this script during judging to cover every major interaction in ~3 minutes.

## 1. Landing overview (30s)

1. Open `http://localhost:5173`.
2. Point out hero headline inspired by `/mnt/data/717559f5-d399-4d3e-b1a6-286b564976a0.png` and `/mnt/data/Screenshot 2025-11-20 141323.png`.
3. Highlight CTA “Design now” and nav links (Home / Builder / Gallery / Docs).

## 2. Builder walkthrough (90s)

1. Navigate to `/builder`.
2. Confirm mock server is active (`VITE_USE_MOCK=true`) or mention backend URL if live.
3. Load sample texture via “Use sample wood texture” (path: `/mnt/data/A_photograph_features_a_close-up_of_a_rustic_woode.png`).
4. Paste prompt:  
   `A comfortable, rustic coffee mug with a stoneware texture, warm light streaks, and cinematic depth of field.`
5. Select preset “Rustic Mug”, tweak grain/gloss sliders, keep quality `Balanced`.
6. Click “Generate render”.
7. Call out:
   - Progress modal (queued → preview → rendering)
   - Thumbnail arriving early
   - Compare slider + camera buttons
   - Download buttons (GLB disabled until backend sends one)

## 3. Gallery + Docs (45s)

1. `/gallery` shows how finished renders will be catalogued (Re-run, Download, Open actions).
2. `/docs` summarizes API contract + ready-to-copy curl commands.

## 4. Close (15s)

1. Mention swapping to real backend: set `VITE_BACKEND_BASE_URL`, disable `VITE_USE_MOCK`.
2. Highlight CORS reminder for `http://localhost:5173`.
3. Invite judges to try their own prompt/texture combos live.

