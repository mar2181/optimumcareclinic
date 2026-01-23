-- Create iv_treatments table
CREATE TABLE public.iv_treatments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  base_price NUMERIC(10, 2) NOT NULL,
  benefits TEXT[] NOT NULL DEFAULT '{}',
  duration_min INTEGER NOT NULL DEFAULT 45,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create iv_addons table
CREATE TABLE public.iv_addons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.iv_treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.iv_addons ENABLE ROW LEVEL SECURITY;

-- Public read access for iv_treatments
CREATE POLICY "Anyone can view iv treatments"
ON public.iv_treatments
FOR SELECT
USING (true);

-- Public read access for iv_addons
CREATE POLICY "Anyone can view iv addons"
ON public.iv_addons
FOR SELECT
USING (true);

-- Admin management for iv_treatments
CREATE POLICY "Admins can manage iv treatments"
ON public.iv_treatments
FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Admin management for iv_addons
CREATE POLICY "Admins can manage iv addons"
ON public.iv_addons
FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Seed iv_treatments
INSERT INTO public.iv_treatments (name, description, base_price, benefits, duration_min) VALUES
('Myers Cocktail', 'Our signature blend for maximum energy and vitality. The gold standard of IV therapy, packed with essential vitamins and minerals to boost your overall wellness.', 189.00, ARRAY['Increased Energy', 'Enhanced Immunity', 'Reduced Fatigue', 'Better Mental Clarity'], 45),
('Immune Boost', 'Supercharge your immune system and recover faster from illness. Perfect for flu season or when you feel something coming on.', 149.00, ARRAY['Faster Flu Recovery', 'Stronger Immune Response', 'Reduced Cold Duration', 'Antioxidant Protection'], 30),
('Inner Beauty', 'Radiate from the inside out with our beauty-focused IV therapy. Promotes healthy skin, hair, and nails with powerful antioxidants.', 169.00, ARRAY['Skin Glow Enhancement', 'Collagen Support', 'Hair & Nail Strength', 'Anti-Aging Benefits'], 45);

-- Seed iv_addons
INSERT INTO public.iv_addons (name, price, category) VALUES
('Toradol', 45.00, 'Pain Relief'),
('B12 Shot', 30.00, 'Energy'),
('Glutathione', 50.00, 'Antioxidant');