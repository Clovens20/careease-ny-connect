-- Add missing columns to services table
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Add unique constraint on name if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'services_name_key' AND conrelid = 'public.services'::regclass
  ) THEN
    ALTER TABLE public.services ADD CONSTRAINT services_name_key UNIQUE (name);
  END IF;
END $$;

-- Add missing columns to bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS recipient_name TEXT,
ADD COLUMN IF NOT EXISTS recipient_type TEXT,
ADD COLUMN IF NOT EXISTS assigned_agent TEXT,
ADD COLUMN IF NOT EXISTS date_range_start DATE,
ADD COLUMN IF NOT EXISTS date_range_end DATE,
ADD COLUMN IF NOT EXISTS selected_dates DATE[],
ADD COLUMN IF NOT EXISTS hours_per_day INTEGER;

-- Add check constraint for recipient_type if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'bookings_recipient_type_check'
  ) THEN
    ALTER TABLE public.bookings 
    ADD CONSTRAINT bookings_recipient_type_check 
    CHECK (recipient_type IS NULL OR recipient_type IN ('elderly', 'disabled', 'both'));
  END IF;
END $$;

-- Update date_range_start from existing date column for existing bookings
UPDATE public.bookings 
SET date_range_start = date 
WHERE date_range_start IS NULL AND date IS NOT NULL;

-- Deactivate all current services
UPDATE public.services SET is_active = false WHERE is_active IS NOT NULL;

-- Update or insert the two main services for CareEase USA
INSERT INTO public.services (name, description, price_hourly, price_daily, is_active)
VALUES 
  ('Home Health Aide (HHA)', 'Professional home health aide services for elderly and disabled individuals. Assistance with daily living activities, health monitoring, and compassionate care.', 25.00, 180.00, true),
  ('Housekeeping', 'Specialized housekeeping services adapted to the needs of elderly and disabled individuals. Maintaining a clean, safe, and comfortable living environment.', 20.00, 140.00, true)
ON CONFLICT (name) DO UPDATE 
SET 
  description = EXCLUDED.description,
  price_hourly = EXCLUDED.price_hourly,
  price_daily = EXCLUDED.price_daily,
  is_active = EXCLUDED.is_active;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_date_range ON public.bookings(date_range_start, date_range_end);
CREATE INDEX IF NOT EXISTS idx_bookings_assigned_agent ON public.bookings(assigned_agent);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active);

-- Update RLS Policies for services
DROP POLICY IF EXISTS "Anyone can read active services" ON public.services;
CREATE POLICY "Anyone can read active services" 
ON public.services 
FOR SELECT 
USING (is_active = true);

-- Update RLS Policies for bookings
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
CREATE POLICY "Anyone can create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
CREATE POLICY "Admins can view all bookings" 
ON public.bookings 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE email = auth.jwt()->>'email'
  )
);

DROP POLICY IF EXISTS "Admins can update bookings" ON public.bookings;
CREATE POLICY "Admins can update bookings" 
ON public.bookings 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE email = auth.jwt()->>'email'
  )
);

-- Add helpful comments
COMMENT ON COLUMN public.bookings.recipient_name IS 'Full name of the person who will receive the care service';
COMMENT ON COLUMN public.bookings.recipient_type IS 'Type of recipient: elderly, disabled, or both';
COMMENT ON COLUMN public.bookings.assigned_agent IS 'Name of the agent assigned to this booking';
COMMENT ON COLUMN public.bookings.date_range_start IS 'Start date of the service period';
COMMENT ON COLUMN public.bookings.date_range_end IS 'End date of the service period (if booking is for a range)';
COMMENT ON COLUMN public.bookings.selected_dates IS 'Array of specific dates selected by client';
COMMENT ON COLUMN public.bookings.hours_per_day IS 'Number of hours per day for the service';
COMMENT ON COLUMN public.services.is_active IS 'Whether this service is currently active and available for booking';