-- Create blog_posts table separate from articles
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  author_name TEXT DEFAULT 'Optimum Health & Wellness Clinic',
  tags TEXT[] DEFAULT '{}',
  meta_description TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  author_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog posts"
  ON public.blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage blog posts"
  ON public.blog_posts FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_articles_updated_at();

CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_published_created ON public.blog_posts(published, created_at DESC);

-- Seed first post
INSERT INTO public.blog_posts (title, slug, excerpt, content, tags, meta_description) VALUES (
  'Why Choose a Cash Clinic in Pharr, TX: Affordable After-Hours Care Without Insurance',
  'why-choose-cash-clinic-pharr-tx',
  'Discover why families across the Rio Grande Valley are turning to cash-pay clinics in Pharr for fast, affordable after-hours medical care — no insurance required.',
  '## Healthcare in the RGV Is Changing — And Cash Clinics Are Leading the Way

If you live in Pharr, McAllen, San Juan, or anywhere across the Rio Grande Valley, you''ve probably felt the squeeze: rising insurance premiums, long ER wait times, and family doctors who close at 5 PM. At **Optimum Health and Wellness Clinic**, we built something different — an honest, transparent, after-hours cash clinic where one flat fee covers your visit. No surprise bills. No insurance hoops. Just care.

## What Is a Cash Clinic?

A cash clinic — sometimes called a direct-pay or self-pay clinic — is a medical practice that bypasses insurance entirely. Patients pay a clear, upfront price for their visit. That''s it.

At our clinic in Pharr, **every standard visit is just $70**. Whether you''re coming in for a sore throat, a sports injury, a medication refill, or a chronic condition check-up, the price is the same.

## Why Pharr Families Are Switching to Cash-Pay Care

### 1. Transparent, Affordable Pricing
The average ER visit in Texas costs over $1,200 — even with insurance. Urgent care centers often charge $150–$300 plus facility fees. Our $70 flat rate makes quality medical care accessible for working families, students, and anyone without coverage.

### 2. Open When You Actually Need Us
We''re open **5 PM to 10 PM, seven days a week**, including weekends and holidays. That means after work, after school, and after your regular doctor has already gone home.

### 3. No Insurance? No Problem
You don''t need to be insured. You don''t need to call ahead. Just walk in. We treat patients of all backgrounds — uninsured, under-insured, visiting from out of town, or simply tired of dealing with insurance paperwork.

### 4. Real Physicians, Not Just Quick Fixes
Every visit is with a licensed physician. We handle everything from acute illness to chronic disease management, wound care, and prescription refills.

## When Should You Choose a Cash Clinic Over the ER?

The emergency room is the right call for life-threatening situations — chest pain, stroke symptoms, major trauma. But for the everyday issues that send most people to the ER, a cash clinic is faster, cheaper, and just as effective:

- **Fevers, flu, and strep throat**
- **Ear infections and sinus issues**
- **Cuts, sprains, and minor injuries**
- **UTIs and skin infections**
- **Medication refills and chronic care follow-ups**
- **Wound care and dressing changes**

## Serving Pharr, McAllen, San Juan, and the Greater RGV

Located in the heart of Pharr, Texas, we''re proud to serve families from across Hidalgo County. Our bilingual (English/Spanish) team is here to make healthcare simple, affordable, and accessible for everyone in our community.

## Walk In Tonight — We''re Open Until 10 PM

No appointment needed. No insurance required. Just $70 for a complete visit with a real physician.

**Optimum Health and Wellness Clinic**
Open 5 PM – 10 PM, 7 days a week
Call us: **(956) 627-3258**',
  ARRAY['cash clinic', 'Pharr TX', 'after-hours care', 'no insurance', 'urgent care', 'RGV healthcare'],
  'Affordable $70 cash clinic in Pharr, TX. Open 5pm-10pm daily, no insurance needed. Serving McAllen, San Juan & the RGV with walk-in after-hours care.'
);