
-- Drop the old overly-permissive waitlist policies
DROP POLICY IF EXISTS "Enable read for authenticated users only" ON public.waitlist;
DROP POLICY IF EXISTS "Enable insert for anyone" ON public.waitlist;

-- Re-create insert policy: anyone can insert (public waitlist signup)
CREATE POLICY "Anyone can join waitlist"
ON public.waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Select is now admin-only via the policy we already created
