# How to Verify Backend Connection

## Quick Check (30 seconds)

1. **Check backend port** - Look at backend terminal:
   ```
   INFO:     Uvicorn running on http://127.0.0.1:4000
   ```
   Note the port number (e.g., `4000`)

2. **Check frontend config** - Open `frontend/.env.local` (or create it):
   ```
   VITE_BACKEND_BASE_URL=http://localhost:4000
   ```
   ⚠️ **Port must match!** If backend is on 4001, change to 4001

3. **Restart frontend** if you just created/modified `.env.local`:
   ```bash
   # Stop (Ctrl+C) and restart:
   npm run dev
   ```

4. **Test connection** - Open browser: http://localhost:4000/health
   - ✅ Should show: `{"status":"ok"}`
   - ❌ If error: backend not running or wrong port

---

## Step 1: Check if `.env.local` exists

The frontend looks for environment variables in `.env.local`. If it doesn't exist, create it:

```bash
cd frontend
# Create the file
echo VITE_BACKEND_BASE_URL=http://localhost:4000 > .env.local
```

Or manually create `frontend/.env.local` with:
```
VITE_BACKEND_BASE_URL=http://localhost:4000
```

## Step 2: Verify the Port Matches

### Check Backend Port
1. Look at your backend terminal - it should show:
   ```
   INFO:     Uvicorn running on http://127.0.0.1:4000
   ```
   The port number is **4000** (or whatever you set with `--port`)

### Check Frontend Config
1. Open `frontend/.env.local`
2. Verify the URL matches:
   ```
   VITE_BACKEND_BASE_URL=http://localhost:4000
   ```
   ⚠️ **Important:** The port number (4000) must match your backend port!

## Step 3: Restart Frontend Dev Server

After creating or modifying `.env.local`, you **must restart** the frontend:

```bash
# Stop the current dev server (Ctrl+C)
# Then restart:
npm run dev
```

Vite only reads `.env.local` on startup, so changes won't take effect until restart.

## Step 4: Verify It's Working

### Method 1: Browser Console
1. Open http://localhost:5173
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. Try to generate a render in the Builder
5. Look for network requests - they should go to `http://localhost:4000/api/...`

### Method 2: Network Tab
1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Filter by "Fetch/XHR"
4. Generate a render
5. Check the request URL - should be `http://localhost:4000/api/generate`

### Method 3: Test Backend Directly
Open in browser: http://localhost:4000/health

Should return: `{"status":"ok"}`

If you get a connection error, the backend isn't running or the port is wrong.

## Step 5: Common Issues

### Port Mismatch
**Problem:** Backend on port 4001, but `.env.local` says 4000

**Solution:** Update `.env.local`:
```
VITE_BACKEND_BASE_URL=http://localhost:4001
```
Then restart frontend.

### CORS Error
**Error:** `Access to fetch at 'http://localhost:4000/api/...' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Solution:** 
- Make sure backend is running
- Check `backend/main.py` has CORS middleware for `http://localhost:5173`
- Restart backend if you just added CORS

### Connection Refused
**Error:** `Failed to fetch` or `ERR_CONNECTION_REFUSED`

**Solution:**
1. Check backend is running: `http://localhost:4000/health`
2. Verify port in `.env.local` matches backend port
3. Check firewall isn't blocking localhost

## Quick Verification Script

Run this in your frontend terminal to check the config:

```bash
# Windows PowerShell
$env:VITE_BACKEND_BASE_URL





























































































# Or check the file directly
cat .env.local
```

The output should show: `http://localhost:4000` (or your backend port)

## Default Behavior

If `.env.local` doesn't exist, the frontend defaults to:
- `VITE_BACKEND_BASE_URL=http://localhost:4000`

So if your backend runs on port 4000, you don't need `.env.local` at all!

But it's good practice to create it explicitly for clarity.

