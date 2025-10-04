-- Create enum for booking status
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

-- Create services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price_hourly NUMERIC(10, 2),
  price_daily NUMERIC(10, 2),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Services policies: public can read, authenticated users can manage
CREATE POLICY "Anyone can view services"
  ON public.services FOR SELECT
  USING (true);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  duration_hours INTEGER NOT NULL CHECK (duration_hours > 0),
  total_price NUMERIC(10, 2) NOT NULL,
  status booking_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Bookings policies: anyone can create, only authenticated can view/update
CREATE POLICY "Anyone can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

-- Create settings table
CREATE TABLE public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_admin TEXT,
  phone_admin TEXT,
  address TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  footer_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on settings
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Settings policies: public can read
CREATE POLICY "Anyone can view settings"
  ON public.settings FOR SELECT
  USING (true);

-- Create admins table using email from auth
CREATE TABLE public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on admins
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Function to check if a user is an admin
CREATE OR REPLACE FUNCTION public.is_admin(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admins WHERE email = user_email
  );
$$;

-- Admin policies for services
CREATE POLICY "Admins can insert services"
  ON public.services FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can update services"
  ON public.services FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can delete services"
  ON public.services FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Admin policies for bookings
CREATE POLICY "Admins can view all bookings"
  ON public.bookings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can update bookings"
  ON public.bookings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can delete bookings"
  ON public.bookings FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Admin policies for settings
CREATE POLICY "Admins can update settings"
  ON public.settings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can insert settings"
  ON public.settings FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Insert default settings
INSERT INTO public.settings (email_admin, phone_admin, address, footer_text)
VALUES (
  'contact@careeaseny.com',
  '(212) 555-0100',
  '123 Main Street, New York, NY 10001',
  '© 2025 CareEase NY. Professional Home Health Aide Services in New York.'
);

-- Insert sample services
INSERT INTO public.services (name, description, price_hourly, price_daily) VALUES
('Personal Care', 'Assistance with daily activities including bathing, dressing, and grooming', 35.00, 250.00),
('Companionship', 'Friendly companionship and conversation to combat loneliness', 30.00, 210.00),
('Meal Preparation', 'Planning and preparing nutritious meals according to dietary needs', 32.00, 230.00),
('Medication Reminders', 'Ensuring medications are taken on time and as prescribed', 35.00, 250.00),
('Light Housekeeping', 'Maintaining a clean and safe home environment', 28.00, 200.00),
('Transportation', 'Safe transportation to appointments, shopping, and social activities', 40.00, 280.00);