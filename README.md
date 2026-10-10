# GenWeave AI

> **Generative 3D Material Staging & AI Product Render Studio**  
> A full-stack creative intelligence platform converting surface textures and natural language prompts into staged, photorealistic 3D product renders with asynchronous job queuing, real-time stage progress polling, and fine-grained material parameter controls.

[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue.svg?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115%2B-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React 18](https://img.shields.io/badge/React-18.3-61DAFB.svg?logo=react&logoColor=0A0F1D)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## 1. Project Overview & Value Proposition

In physical product design and e-commerce staging, generating photorealistic marketing scenes for novel materials (timber, woven textile, hammered copper, ceramic) usually requires specialized 3D software (Blender, Maya) and manual UV mapping.

**GenWeave AI** streamlines this into an intuitive, prompt-guided workflow:
1. Creators upload raw surface textures or swatch photographs.
2. They specify natural language scene prompts and material physics properties (grain scale, roughness, specular lighting).
3. The platform processes the job asynchronously through a rendering pipeline with real-time stage feedback, generating low-latency thumbnails and final high-resolution staged product renders.

---

## 2. Project Status

- **Status:** Full-Stack Architecture Prototype (Vite React UI + FastAPI Ingestion & Job Queue).
- **Default Branch:** `main`.
- **Modes:** Supports both standalone mocked UI simulation (`VITE_USE_MOCK=true`) and live backend API integration.

---

## 3. Architecture & Data Flow

```
┌──────────────────────────────────────────────────────────────┐
│ GenWeave AI Frontend (React 18 + Vite + Tailwind CSS)        │
│ • Material Swatch & Texture Upload Dropzone                  │
│ • Dynamic Material Controls (Grain Scale, Lighting, Quality) │
│ • Multi-Stage Progress Bar & Thumbnail Polling Stream        │
└──────────────────────────────┬───────────────────────────────┘
                               │ POST /api/generate (Multipart)
                               ▼
┌──────────────────────────────────────────────────────────────┐
│ FastAPI Ingestion Server (main.py)                           │
│ • Multipart File Validation & Temporary Texture Storage      │
│ • Job Dispatch & UUID Assignment                             │
│ • CORS Middleware (localhost:5173)                           │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│ Job Manager & Rendering Pipeline (services/)                 │
│ • Stage Progression: Queued ──► Processing ──► Rendering ──► Done │
│ • Static Asset Server (/static/results, /static/uploads)     │
│ • Database Persistence (SQLite / Supabase / PostgreSQL)      │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. API Contract & Lifecycle

The client communicates with the backend via four standardized contract endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/generate` | Multipart upload: texture file, prompt, quality, and material settings. Returns `{ job_id, status }`. |
| `GET` | `/api/status/{job_id}` | Polls current rendering stage (`queued`, `processing`, `rendering`, `done`), progress percentage, and preview thumbnails. |
| `GET` | `/api/result/{job_id}` | Retrieves completed asset URLs (`final_images`, optional 3D `.glb` assets, metadata). |
| `GET` | `/health` | Server heartbeat check returning `{"status": "ok"}`. |

---

## 5. Implemented Features

- **Prompt + Texture Fusion:** Pair textual scene descriptions (*"Minimalist ceramic mug on wet slate"*) with uploaded high-resolution material swatches.
- **Dynamic Physics Parameters:** Granular control over material attributes such as `grainScale`, `roughness`, and `specularIntensity`.
- **Asynchronous Staging & Polling:** Frontend polls `/api/status/{job_id}` every 2 seconds, displaying low-resolution progressive thumbnails before final render delivery.
- **Flexible Data Layer:** Database setup guides and configuration templates for SQLite, Supabase, and PostgreSQL persistence.
- **Built-in Mock Server:** Zero-backend developer preview mode enabled via `VITE_USE_MOCK=true`.

---

## 6. Technology Stack

### Backend
- **Framework:** FastAPI (`0.115.2`), Uvicorn (`0.32.0`)
- **File & Image Processing:** Python-Multipart (`0.0.12`), Pillow (`11.0.0`), aiofiles (`24.1.0`), HTTPX (`0.27.2`)
- **Database Adapters:** Supported for SQLite, PostgreSQL (`psycopg2-binary`), and Supabase (`supabase-py`)

### Frontend
- **Framework:** React 18 (`18.3.1`), Vite (`5.4.10`)
- **Styling:** Tailwind CSS (`3.4.14`), PostCSS, Autoprefixer
- **Icons & Animation:** Lucide React (`0.454.0`), CSS Keyframe Animations

---

## 7. Prerequisites

- Python 3.10 or higher
- Node.js 18.x or higher
- npm or yarn

---

## 8. Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/prabhavkrishna17-max/GenWeave-AI.git
cd GenWeave-AI
```

### 2. Frontend Setup
```bash
npm install
```

### 3. Backend Setup
```bash
python -m venv venv

# Windows PowerShell
venv\Scripts\Activate.ps1
# macOS / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

---

## 9. Running the Application

### Option A: Running with Standalone Mock Server (Fast Preview)
Create or edit `.env.local`:
```ini
VITE_USE_MOCK=true
VITE_BACKEND_BASE_URL=http://localhost:4000
```
Start Vite:
```bash
npm run dev
```
Navigate to `http://localhost:5173` to explore the builder with simulated job stages.

### Option B: Running with Live FastAPI Backend
1. Start the FastAPI server:
   ```bash
   python main.py
   ```
   The backend starts at `http://localhost:4000` (or `8000`).
2. Verify backend health:
   ```bash
   node check-backend.js
   ```
3. Set frontend `.env.local`:
   ```ini
   VITE_USE_MOCK=false
   VITE_BACKEND_BASE_URL=http://localhost:4000
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```

---

## 10. Database Configuration (Optional)

For production state storage, see our dedicated guides:
- [QUICKSTART.md](QUICKSTART.md) — Rapid onboarding instructions.
- [DATABASE_SETUP.md](DATABASE_SETUP.md) — Comprehensive schema setup for Supabase and PostgreSQL.
- [MIGRATE_TO_DATABASE.md](MIGRATE_TO_DATABASE.md) — Migrating in-memory job dictionaries to relational tables.

---

## 11. Known Limitations

- **Compute Backend:** In lightweight local setups, final rendering generates staged composites; coupling to distributed GPU rendering clusters requires external worker queues (Celery/Redis).
- **3D Meshes:** Output format is currently optimized for multi-angle 2D photorealistic renders; full `.glb` / `.gltf` mesh baking is on the roadmap.

---

## 12. Contributor Credits

- **Prabhav Krishna R** ([@prabhavkrishna17-max](https://github.com/prabhavkrishna17-max)) — Full-stack system architecture, frontend material builder, FastAPI job coordination.
