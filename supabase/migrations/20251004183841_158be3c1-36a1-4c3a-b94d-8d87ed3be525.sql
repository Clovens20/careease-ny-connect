-- Allow anyone to read from admins table for authorization check
CREATE POLICY "Allow reading admins for authorization check" 
ON public.admins 
FOR SELECT 
USING (true);