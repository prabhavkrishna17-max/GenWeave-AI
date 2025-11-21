# Real-Time Database Setup Guide

## Why Use a Real-Time Database?

Currently, your app uses **in-memory storage** - jobs are lost when the server restarts. A real-time database provides:

✅ **Persistence** - Jobs survive server restarts  
✅ **Real-time updates** - Frontend can subscribe to job status changes  
✅ **Scalability** - Multiple backend instances can share the same database  
✅ **History** - Keep track of all past renders  
✅ **Multi-user** - Support multiple users with their own jobs

---

## Recommended Options

### 1. **Supabase** (Recommended for FastAPI)
- PostgreSQL-based with real-time subscriptions
- Free tier available
- Easy to set up
- Works great with FastAPI

### 2. **Firebase Realtime Database / Firestore**
- Google's real-time database
- Great for rapid prototyping
- Free tier available

### 3. **MongoDB with Change Streams**
- Document-based database
- Real-time change streams
- Good for flexible schemas

### 4. **PostgreSQL + LISTEN/NOTIFY**
- Traditional SQL database
- Real-time via PostgreSQL notifications
- Most control, requires more setup

---

## Quick Start: Supabase Integration

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up / Log in
3. Create a new project
4. Note your **Project URL** and **anon key**

### Step 2: Create Database Table

Run this SQL in Supabase SQL Editor:

```sql
-- Create jobs table
CREATE TABLE jobs (
    job_id TEXT PRIMARY KEY,
    prompt TEXT NOT NULL,
    quality TEXT NOT NULL,
    settings JSONB DEFAULT '{}',
    texture_path TEXT,
    stage TEXT DEFAULT 'queued',
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    thumbnails TEXT[] DEFAULT '{}',
    results TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_jobs_stage ON jobs(stage);
CREATE INDEX idx_jobs_created_at ON jobs(created_at DESC);

-- Enable Row Level Security (optional, for multi-user)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Allow public read/write (for development)
CREATE POLICY "Allow all operations" ON jobs
    FOR ALL
    USING (true)
    WITH CHECK (true);
```

### Step 3: Install Dependencies

```bash
cd backend
pip install supabase python-dotenv
```

### Step 4: Environment Variables

Create `backend/.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key-here
```

### Step 5: Update Code

See `services/job_manager_db.py` for the database-backed implementation.

---

## Implementation Options

I'll provide you with:

1. **Supabase implementation** - Easiest, recommended
2. **PostgreSQL implementation** - More control
3. **MongoDB implementation** - Flexible schema

Choose based on your needs!


