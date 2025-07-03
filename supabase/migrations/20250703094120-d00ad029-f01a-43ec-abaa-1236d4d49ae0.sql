
-- Disable RLS on tables to allow anonymous read access for this public application
ALTER TABLE public."LoungesDB" DISABLE ROW LEVEL SECURITY;
ALTER TABLE public."cards" DISABLE ROW LEVEL SECURITY;
ALTER TABLE public."cards_lounge" DISABLE ROW LEVEL SECURITY;

-- Drop any existing RLS policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON public."LoungesDB";
DROP POLICY IF EXISTS "Allow public read access" ON public."cards";
DROP POLICY IF EXISTS "Allow public read access" ON public."cards_lounge";
