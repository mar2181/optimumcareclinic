-- Create articles table for CMS
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('men', 'women', 'family')),
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  author_id UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Anyone can read published articles
CREATE POLICY "Anyone can view published articles"
ON public.articles
FOR SELECT
USING (published = true);

-- Admins can do everything
CREATE POLICY "Admins can manage articles"
ON public.articles
FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Enable realtime for articles
ALTER PUBLICATION supabase_realtime ADD TABLE public.articles;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_articles_updated_at();

-- Seed 3 SEO-optimized articles
INSERT INTO public.articles (title, slug, category, content, excerpt, image_url, published) VALUES
(
  'Why Cash-Pay Urgent Care Saves Money in the RGV',
  'cash-pay-urgent-care-pharr-savings',
  'family',
  E'## The Hidden Costs of Traditional Healthcare\n\nMany families in the Rio Grande Valley face unexpected medical bills that can strain budgets. At Optimum Care Pharr, we believe in transparent, affordable healthcare.\n\n### Why Choose Cash-Pay?\n\n**1. No Insurance Hassles**\nSkip the paperwork, pre-authorizations, and surprise bills. Know exactly what you''ll pay before treatment.\n\n**2. Lower Overall Costs**\nWithout insurance middlemen, we pass savings directly to you. Our office visits start at just $75.\n\n**3. Immediate Care**\nNo waiting for insurance approval. Walk in, get treated, walk out healthy.\n\n### Real Savings Examples\n\n- **Flu Treatment**: $75 vs. $200+ with insurance copays and deductibles\n- **Minor Injuries**: $100 vs. emergency room bills of $500+\n- **Sports Physicals**: $35 vs. pediatrician wait times of weeks\n\n### Serving the Pharr & McAllen Community\n\nLocated at 1106 W Sam Houston Blvd, we''re your neighborhood urgent care clinic. Open until 5 PM on weekdays and Saturdays, we''re here when you need us.\n\n**Ready to experience affordable healthcare?** Walk in today or call (956) 467-4226.',
  'Discover how cash-pay urgent care at Optimum Care Pharr offers transparent pricing and real savings for RGV families without insurance hassles.',
  NULL,
  true
),
(
  'Pediatric Fevers: When to Visit the Clinic (Open Until 5 PM)',
  'pediatric-fever-urgent-care-pharr',
  'family',
  E'## Understanding Your Child''s Fever\n\nAs a parent in Pharr or McAllen, knowing when to seek medical care for your child''s fever can be stressful. Here''s your guide to making the right call.\n\n### When to Come In Immediately\n\n**Infants Under 3 Months**\nAny fever of 100.4°F or higher requires immediate attention.\n\n**Children of Any Age**\n- Fever above 104°F\n- Fever lasting more than 3 days\n- Difficulty breathing\n- Severe headache or stiff neck\n- Unusual rash\n- Signs of dehydration\n\n### Home Care Tips\n\n1. **Keep them hydrated** with water, clear broths, or electrolyte solutions\n2. **Dress lightly** - avoid bundling up\n3. **Use fever reducers** as directed (acetaminophen or ibuprofen)\n4. **Monitor temperature** every 4 hours\n\n### Why Choose Optimum Care for Pediatric Visits?\n\n- **Bilingual staff** - English and Spanish speaking\n- **Family-friendly environment**\n- **Quick wait times** - typically under 15 minutes\n- **Affordable pricing** - pediatric visits from $75\n\n### Our Hours Work for Your Schedule\n\nOpen Monday through Friday 7 AM - 5 PM and Saturday 8 AM - 12 PM. No appointment needed!\n\n**Location**: 1106 W Sam Houston Blvd, Pharr, TX 78577\n**Phone**: (956) 467-4226',
  'Learn when your child''s fever needs urgent care attention. Optimum Care Pharr offers affordable pediatric care with bilingual staff in the RGV.',
  NULL,
  true
),
(
  'IV Therapy Benefits for Fatigue and Wellness',
  'iv-therapy-fatigue-wellness-pharr',
  'men',
  E'## Feeling Exhausted? IV Therapy May Help\n\nChronic fatigue affects millions of Americans, and residents of the Rio Grande Valley are no exception. IV therapy offers a fast, effective way to restore your energy levels.\n\n### What is IV Therapy?\n\nIntravenous (IV) therapy delivers vitamins, minerals, and fluids directly into your bloodstream, bypassing the digestive system for 100% absorption.\n\n### Benefits of IV Therapy\n\n**1. Rapid Rehydration**\nPerfect for recovery from illness, hangovers, or intense physical activity.\n\n**2. Energy Boost**\nB-vitamins and other nutrients can provide immediate energy improvement.\n\n**3. Immune Support**\nHigh-dose Vitamin C and zinc help strengthen your immune system.\n\n**4. Better Absorption**\nUnlike oral supplements, IV therapy ensures complete nutrient absorption.\n\n### Our IV Therapy Options\n\n- **Hydration Boost**: Fluids + electrolytes - $99\n- **Energy Complex**: B-vitamins + minerals - $149\n- **Immune Defender**: Vitamin C + zinc - $149\n- **Complete Wellness**: Full vitamin cocktail - $199\n\n### Who Can Benefit?\n\n- Athletes and active individuals\n- Those recovering from illness\n- People with chronic fatigue\n- Anyone seeking a wellness boost\n\n### Visit Optimum Care Pharr\n\nExperience the benefits of IV therapy at our convenient location. Walk-ins welcome!\n\n**Address**: 1106 W Sam Houston Blvd, Pharr, TX 78577\n**Call**: (956) 467-4226',
  'Combat fatigue and boost wellness with IV therapy at Optimum Care Pharr. Quick, effective vitamin infusions with immediate results in the RGV.',
  NULL,
  true
);