import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, MapPin, Clock, Globe } from 'lucide-react';

const Footer = () => {
  const { lang, t } = useLanguage();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const serviceAreaTextEn = "Proudly serving the Rio Grande Valley communities of Pharr, McAllen, Mission, Edinburg, and San Juan.";
  const serviceAreaTextEs = "Sirviendo orgullosamente a las comunidades del Valle del Río Grande: Pharr, McAllen, Mission, Edinburg y San Juan.";

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-accent">{t.footer.contactUs}</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=1106+W+Sam+Houston+Blvd+Pharr+TX+78577"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>1106 W Sam Houston Blvd, Pharr, TX 78577</span>
              </a>
              <a
                href="tel:+19564674226"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>(956) 467-4226</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-accent">{t.footer.quickLinks}</h3>
            <div className="flex flex-col gap-3">
              <a href="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                {t.footer.home}
              </a>
              <a 
                href="#services" 
                onClick={(e) => scrollToSection(e, 'services')}
                className="text-primary-foreground/80 hover:text-accent transition-colors"
              >
                {t.nav.services}
              </a>
              <a 
                href="#pricing" 
                onClick={(e) => scrollToSection(e, 'pricing')}
                className="text-primary-foreground/80 hover:text-accent transition-colors"
              >
                {t.nav.pricing}
              </a>
              <a 
                href="#location" 
                onClick={(e) => scrollToSection(e, 'location')}
                className="text-primary-foreground/80 hover:text-accent transition-colors"
              >
                {t.footer.contactUs}
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-accent">{t.footer.hours}</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 text-primary-foreground/80">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <span>{t.footer.hoursDetail.weekdays}</span>
                  <span>{t.footer.hoursDetail.saturday}</span>
                  <span>{t.footer.hoursDetail.sunday}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Service Area */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-accent flex items-center gap-2">
              <Globe className="w-5 h-5" />
              {lang === 'es' ? 'Área de Servicio' : 'Service Area'}
            </h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              {lang === 'es' ? serviceAreaTextEs : serviceAreaTextEn}
            </p>
            {/* Map Embed */}
            <div className="rounded-lg overflow-hidden h-32 mt-2" style={{ width: '100%', minHeight: '128px' }}>
              <iframe
                title="Optimum Care clinic location in Pharr Texas serving the Rio Grande Valley"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.8867!2d-98.1847!3d26.1947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDExJzQwLjkiTiA5OMKwMTEnMDQuOSJX!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="128"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Newsletter Subscribe */}
        <div className="mt-10 pt-8 border-t border-primary-foreground/10">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold text-accent mb-2">{t.footer.subscribe.title}</h3>
            <p className="text-sm text-primary-foreground/70 mb-4">{t.footer.subscribe.note}</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t.footer.subscribe.placeholder}
                className="flex-1 px-4 py-2 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                {t.footer.subscribe.button}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold">O</span>
              </div>
              <span className="text-lg font-bold">
                Optimum <span className="text-accent">Care</span>
              </span>
            </div>
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} Optimum Care Pharr. {t.footer.rights}
            </p>
          </div>

          {/* SEO Keywords */}
          <p className="mt-6 text-xs text-primary-foreground/40 text-center">
            After-Hours Doctor Pharr | Family Clinic McAllen | Evening Clinic Texas | Pediatric Care Rio Grande Valley | Same-Day Doctor RGV | Family Medicine South Texas | Walk-in Clinic Pharr | After Hours Care McAllen
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
