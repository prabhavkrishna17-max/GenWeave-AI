# GenWeave AI - Quick Start Guide

This guide will help you run both the frontend and backend together.

## Prerequisites

- **Python 3.8+** (for backend)
- **Node.js 18+** and npm (for frontend)

## Step 1: Start the Backend (FastAPI)

Open a terminal and run:

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (Windows)
python -m venv .venv

# Activate virtual environment (Windows)
.venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 4000
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:4000
INFO:     Application startup complete.
```

✅ Backend is now running at `http://localhost:4000`

**Test it:** Open `http://localhost:4000/health` in your browser - you should see `{"status":"ok"}`

---

## Step 2: Start the Frontend (React + Vite)

Open a **new terminal** (keep the backend running) and run:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (first time only)
npm install

# Start the dev server
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

✅ Frontend is now running at `http://localhost:5173`

---

## Step 3: Open the App

1. Open your browser and go to: **http://localhost:5173**
2. You should see the GenWeave AI landing page
3. Click **"Design now"** or navigate to `/builder` to test the full flow

---

## Using the App

### Option A: With Real Backend (Recommended)

The frontend is already configured to connect to `http://localhost:4000` by default.

1. Make sure both servers are running
2. Go to `/builder` page
3. Enter a prompt, upload a texture (or use sample), and click "Generate render"
4. Watch the progress modal as the backend processes your request

### Option B: With Mock Server (Backend Not Required)

If you want to test the frontend without the backend:

1. Create `.env.local` in the `frontend` directory:
   ```
   VITE_USE_MOCK=true
   ```

2. Restart the frontend dev server (`npm run dev`)

---

## Troubleshooting

### Backend Issues

**Port 4000 already in use:**
```bash
# Use a different port
uvicorn main:app --reload --port 4001
```
Then update frontend `.env.local`:
```
VITE_BACKEND_BASE_URL=http://localhost:4001
```

**Python not found:**
- Make sure Python is installed and in your PATH
- Try `python3` instead of `python` on some systems

**Module not found errors:**
```bash
# Make sure you're in the backend directory and venv is activated
pip install -r requirements.txt
```

### Frontend Issues

**Port 5173 already in use:**
- Vite will automatically try the next available port
- Or stop the other process using port 5173

**npm install fails:**
```bash
# Clear cache and try again
npm cache clean --force
npm install
```

**CORS errors:**
- Make sure backend is running on port 4000
- Check that `backend/main.py` has CORS middleware configured for `http://localhost:5173`

### Connection Issues

**Frontend can't reach backend:**
1. Verify backend is running: visit `http://localhost:4000/health`
2. Check browser console for errors
3. Verify `VITE_BACKEND_BASE_URL` in frontend `.env.local` matches backend port

---

## File Structure

```
GenWeave AI/
├── backend/          # FastAPI server
│   ├── main.py       # Entry point
│   ├── routes/       # API endpoints
│   ├── services/     # Business logic
│   └── static/       # Uploaded files & results
│
└── frontend/         # React app
    ├── src/
    │   ├── components/
    │   ├── routes/
    │   └── utils/
    └── package.json
```

---

## Quick Test

Once both are running, test the full flow:

1. Go to http://localhost:5173/builder
2. Enter prompt: `"A rustic coffee mug with warm lighting"`
3. Click "Use sample wood texture"
4. Click "Generate render"
5. Watch the progress modal (should complete in ~5 seconds)
6. See the result appear in the preview panel

---

## Stopping the Servers

- **Backend:** Press `Ctrl+C` in the backend terminal
- **Frontend:** Press `Ctrl+C` in the frontend terminal

---

## Next Steps

- Check `backend/README.md` for API documentation
- Check `frontend/README.md` for frontend details
- See `frontend/DEMO.md` for demo script


