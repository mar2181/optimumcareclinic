-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_es TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view testimonials"
ON public.testimonials
FOR SELECT
USING (true);

-- Admin management
CREATE POLICY "Admins can manage testimonials"
ON public.testimonials
FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Seed testimonials with local demographic
INSERT INTO public.testimonials (name, role, content_en, content_es, rating) VALUES
('Maria G.', 'Pharr', 'Best clinic in the Valley! I feel so energized after my IV therapy. The staff is incredibly friendly and speaks perfect Spanish.', '¡La mejor clínica del Valle! Me siento con mucha energía después de mi terapia IV. El personal es increíblemente amable y habla español perfectamente.', 5),
('Jose P.', 'Mission, TX', 'Very professional and clean. No wait time and the prices are very fair. I recommend them to all my family.', 'Muy profesional y limpio. Sin tiempo de espera y los precios son muy justos. Los recomiendo a toda mi familia.', 5),
('Ana L.', 'McAllen', 'Finally a clinic that understands our community. My kids love coming here - fast, affordable, and caring doctors.', 'Por fin una clínica que entiende a nuestra comunidad. A mis hijos les encanta venir aquí - rápido, económico y doctores que se preocupan.', 5);