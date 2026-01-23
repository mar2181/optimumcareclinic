-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create clinic_status table for wait time
CREATE TABLE public.clinic_status (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estimated_wait_minutes INTEGER NOT NULL DEFAULT 15,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on clinic_status
ALTER TABLE public.clinic_status ENABLE ROW LEVEL SECURITY;

-- Anyone can read clinic status (for homepage display)
CREATE POLICY "Anyone can view clinic status"
ON public.clinic_status
FOR SELECT
USING (true);

-- Only admins can update clinic status
CREATE POLICY "Admins can update clinic status"
ON public.clinic_status
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert clinic status"
ON public.clinic_status
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Insert default clinic status
INSERT INTO public.clinic_status (estimated_wait_minutes) VALUES (15);

-- Update patient_queue policies to use has_role function
DROP POLICY IF EXISTS "Authenticated users can view queue" ON public.patient_queue;
DROP POLICY IF EXISTS "Authenticated users can update queue" ON public.patient_queue;

CREATE POLICY "Admins can view queue"
ON public.patient_queue
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update queue"
ON public.patient_queue
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Enable realtime for patient_queue
ALTER PUBLICATION supabase_realtime ADD TABLE public.patient_queue;
ALTER PUBLICATION supabase_realtime ADD TABLE public.clinic_status;