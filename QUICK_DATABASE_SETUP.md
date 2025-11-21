# Quick Database Setup (5 Minutes)

## Supabase Setup (Recommended)

### 1. Create Supabase Account & Project
- Go to https://supabase.com
- Sign up / Log in
- Click "New Project"
- Fill in:
  - Name: `genweave-ai`
  - Database Password: (save this!)
  - Region: Choose closest to you
- Wait ~2 minutes for project to initialize

### 2. Run SQL Schema
1. In Supabase Dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy entire contents of `backend/database/schema.sql`
4. Paste and click **Run** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

### 3. Get Your Credentials
1. Go to **Settings** → **API** (left sidebar)
2. Copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### 4. Configure Backend
Create `backend/.env`:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-key-here
```

### 5. Install & Switch
```bash
cd backend
pip install supabase python-dotenv
```

### 6. Update main.py
Change this line:
```python
# OLD:
from services.job_manager import job_manager, get_job_manager

# NEW:
from services.job_manager_db import job_manager_db as job_manager, get_job_manager_db as get_job_manager
```

### 7. Test It!
```bash
uvicorn main:app --reload --port 4000
```

Create a job via frontend, then check Supabase Dashboard → **Table Editor** → `jobs` table. You should see your job!

---

## Verify It Works

1. **Create a job** (via frontend or curl)
2. **Check Supabase** - Table Editor → jobs table
3. **Restart backend** - Job should still exist!
4. **Check status** - GET `/api/status/{job_id}` should work

---

## Enable Real-Time (Optional)

For instant frontend updates:

1. In Supabase Dashboard → **Database** → **Replication**
2. Find `jobs` table
3. Toggle **Enable** (should already be enabled from schema.sql)

Then follow `REALTIME_FRONTEND.md` to update your frontend.

---

## Troubleshooting

**"Missing SUPABASE_URL" error:**
- Make sure `.env` file exists in `backend/` directory
- Check file is named exactly `.env` (not `.env.txt`)

**"Table jobs does not exist":**
- Run the SQL schema again in Supabase SQL Editor
- Check for any error messages

**"Permission denied":**
- Make sure you're using the **anon** key, not the service_role key
- Check Row Level Security policies in Supabase

---

## That's It! 🎉

Your app now has:
- ✅ Persistent storage
- ✅ Real-time capabilities
- ✅ Job history
- ✅ Multi-instance support


