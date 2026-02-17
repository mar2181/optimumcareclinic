import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOHeadProps {
  title?: string;
  titleEs?: string;
  description?: string;
  descriptionEs?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

const SEOHead = ({
  title = 'Optimum Health & Wellness Clinic | After-Hours Family Clinic',
  titleEs = 'Optimum Health & Wellness Clinic | Clínica Familiar Nocturna',
  description = 'After-hours family medicine in the Rio Grande Valley. Open 5pm-10pm daily. Same-day sick visits, chronic care, and preventive services for the whole family in Pharr, Texas.',
  descriptionEs = 'Medicina familiar nocturna en el Valle del Río Grande. Abierto 5pm-10pm todos los días. Visitas de enfermedad el mismo día, cuidado crónico y servicios preventivos para toda la familia en Pharr, Texas.',
  canonicalUrl,
  ogImage = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
}: SEOHeadProps) => {
  const { lang } = useLanguage();

  const currentTitle = lang === 'es' ? titleEs : title;
  const currentDescription = lang === 'es' ? descriptionEs : description;
  const siteName = lang === 'es' ? 'Optimum Health & Wellness Clinic' : 'Optimum Health & Wellness Clinic';

  return (
    <Helmet>
      {/* Dynamic HTML lang attribute */}
      <html lang={lang} />

      {/* Primary Meta Tags */}
      <title>{currentTitle}</title>
      <meta name="description" content={currentDescription} />
      <meta name="author" content="Optimum Health & Wellness Clinic" />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={currentDescription} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={currentTitle} />
      <meta name="twitter:description" content={currentDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="geo.region" content="US-TX" />
      <meta name="geo.placename" content="Pharr" />
      <meta name="geo.position" content="26.1947;-98.1847" />
      <meta name="ICBM" content="26.1947, -98.1847" />
    </Helmet>
  );
};

export default SEOHead;
