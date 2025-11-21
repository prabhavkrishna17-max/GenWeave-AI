# Migrating from In-Memory to Database

## Quick Migration Steps

### Option 1: Supabase (Recommended - Easiest)

#### Step 1: Install Dependencies
```bash
cd backend
pip install supabase python-dotenv
```

#### Step 2: Set Up Supabase
1. Create account at https://supabase.com
2. Create new project
3. Run the SQL from `DATABASE_SETUP.md` in Supabase SQL Editor
4. Get your Project URL and anon key

#### Step 3: Create `.env` file
```bash
# backend/.env
SUPABASE_URL=https://abenvdwuttscalxqjgsy.supabase.co
SUPABASE_KEY=sb_publishable_O18vG4n2i1aOSEBrGG_-Hg_G1vqQ2qS
```

#### Step 4: Update `main.py`

**Before:**
```python
from services.job_manager import job_manager, get_job_manager
```

**After:**
```python
from services.job_manager_db import job_manager_db as job_manager, get_job_manager_db as get_job_manager
```

That's it! Your app now uses the database.

---

### Option 2: Keep Both (Feature Flag)

You can support both in-memory and database:

```python
# backend/main.py
import os
from dotenv import load_dotenv

load_dotenv()

USE_DATABASE = os.getenv("USE_DATABASE", "false").lower() == "true"

if USE_DATABASE:
    from services.job_manager_db import job_manager_db as job_manager, get_job_manager_db as get_job_manager
else:
    from services.job_manager import job_manager, get_job_manager
```

Then set in `.env`:
```
USE_DATABASE=true
```

---

## Testing the Migration

1. **Start backend:**
   ```bash
   uvicorn main:app --reload --port 4000
   ```

2. **Create a job** via frontend or curl

3. **Check Supabase dashboard:**
   - Go to Table Editor
   - View `jobs` table
   - See your job appear!

4. **Restart backend:**
   - Job should still exist (persistence works!)

5. **Test real-time:**
   - Follow `REALTIME_FRONTEND.md` to enable real-time updates

---

## Rollback

If you need to go back to in-memory:

```python
# Just change the import back
from services.job_manager import job_manager, get_job_manager
```

Your in-memory code is unchanged, so it's safe to switch back and forth.

---

## Benefits After Migration

✅ Jobs persist across server restarts  
✅ Can run multiple backend instances  
✅ Real-time updates to frontend  
✅ Job history in database  
✅ Easy to add user authentication later


