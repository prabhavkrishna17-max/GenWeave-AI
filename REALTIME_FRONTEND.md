# Real-Time Updates in Frontend

Once you've set up Supabase, you can subscribe to real-time job updates instead of polling!

## Benefits

- ✅ **Instant updates** - No 2-second polling delay
- ✅ **Lower server load** - Only update when status changes
- ✅ **Better UX** - Progress bar updates smoothly

## Implementation

### Step 1: Install Supabase Client

```bash
cd frontend
npm install @supabase/supabase-js
```

### Step 2: Create Supabase Client

Create `frontend/src/utils/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### Step 3: Update Builder.jsx

Replace polling with real-time subscription:

```javascript
import { supabase } from '../utils/supabase'

// In Builder component:
useEffect(() => {
  if (!jobId) return

  // Subscribe to job updates
  const channel = supabase
    .channel(`job:${jobId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'jobs',
        filter: `job_id=eq.${jobId}`,
      },
      (payload) => {
        const job = payload.new
        setStage(job.stage)
        setProgress(job.progress)
        if (job.thumbnails?.length) {
          setThumbnail(job.thumbnails[0])
        }
        if (job.stage === 'done') {
          setResultImages(job.results || [])
          setGlbUrl(job.metadata?.glb || '')
          setShowModal(false)
        }
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [jobId])
```

### Step 4: Environment Variables

Add to `frontend/.env.local`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Comparison

**Before (Polling):**
```javascript
// Poll every 2 seconds
setInterval(() => {
  getJobStatus(jobId)
}, 2000)
```

**After (Real-time):**
```javascript
// Instant updates when database changes
supabase.channel('job:123').on('UPDATE', handleUpdate)
```

## Enable Real-Time in Supabase

1. Go to Supabase Dashboard
2. Settings → API
3. Enable "Realtime" for your project
4. In SQL Editor, enable replication:

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE jobs;
```

That's it! Your frontend will now receive instant updates.


