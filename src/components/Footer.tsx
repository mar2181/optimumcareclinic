import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
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
                  <span>Mon - Fri: 7am - 5pm</span>
                  <span>Saturday: 8am - 12pm</span>
                  <span>Sunday: Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
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
            Urgent Care Pharr | Walk-in Clinic McAllen | Cash Medical Clinic Texas | Womens Health Rio Grande Valley | Testosterone Therapy Pharr | IV Therapy RGV | Sports Physicals McAllen | Affordable Healthcare South Texas
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
