-- Create unavailable_dates table for managing service availability
CREATE TABLE IF NOT EXISTS public.unavailable_dates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  is_booked BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.unavailable_dates ENABLE ROW LEVEL SECURITY;

-- Anyone can view unavailable dates
CREATE POLICY "Anyone can view unavailable dates"
ON public.unavailable_dates
FOR SELECT
USING (true);

-- Admins can insert unavailable dates
CREATE POLICY "Admins can insert unavailable dates"
ON public.unavailable_dates
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admins
    WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())::text
  )
);

-- Admins can update unavailable dates
CREATE POLICY "Admins can update unavailable dates"
ON public.unavailable_dates
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.admins
    WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())::text
  )
);

-- Admins can delete unavailable dates
CREATE POLICY "Admins can delete unavailable dates"
ON public.unavailable_dates
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.admins
    WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())::text
  )
);

-- Enable realtime for bookings
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;

-- Enable realtime for unavailable_dates
ALTER PUBLICATION supabase_realtime ADD TABLE public.unavailable_dates;

-- Create index for better performance
CREATE INDEX idx_unavailable_dates_date ON public.unavailable_dates(date);
CREATE INDEX idx_unavailable_dates_service ON public.unavailable_dates(service_id);