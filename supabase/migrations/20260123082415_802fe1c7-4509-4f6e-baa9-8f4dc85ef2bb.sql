-- Create patient_queue table for digital check-in
CREATE TABLE public.patient_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  symptom_category TEXT NOT NULL,
  is_seen BOOLEAN NOT NULL DEFAULT false,
  language_pref TEXT NOT NULL DEFAULT 'en'
);

-- Enable Row Level Security
ALTER TABLE public.patient_queue ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT (create a check-in ticket) - no auth required for patients
CREATE POLICY "Anyone can check in"
  ON public.patient_queue
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view the queue (for admin panel later)
CREATE POLICY "Authenticated users can view queue"
  ON public.patient_queue
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update tickets (mark as seen)
CREATE POLICY "Authenticated users can update queue"
  ON public.patient_queue
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);