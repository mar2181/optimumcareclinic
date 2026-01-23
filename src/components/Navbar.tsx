import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'es' : 'en');
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">O</span>
            </div>
            <span className="text-xl font-bold text-foreground">
              Optimum <span className="text-accent">Care</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Language Toggle */}
            <div className="flex items-center gap-2 text-sm">
              <span className={lang === 'en' ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
                EN
              </span>
              <Switch
                checked={lang === 'es'}
                onCheckedChange={toggleLanguage}
                className="data-[state=checked]:bg-accent"
              />
              <span className={lang === 'es' ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
                ES
              </span>
            </div>

            <a href="#services" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              {t.nav.services}
            </a>
            <a href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              {t.nav.pricing}
            </a>

            <Button className="bg-primary hover:bg-navy-light text-primary-foreground gap-2">
              <Phone className="w-4 h-4" />
              {t.nav.callNow}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {/* Language Toggle */}
              <div className="flex items-center justify-center gap-3 py-2">
                <span className={lang === 'en' ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
                  EN
                </span>
                <Switch
                  checked={lang === 'es'}
                  onCheckedChange={toggleLanguage}
                  className="data-[state=checked]:bg-accent"
                />
                <span className={lang === 'es' ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
                  ES
                </span>
              </div>

              <a
                href="#services"
                className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2 text-center"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.services}
              </a>
              <a
                href="#pricing"
                className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2 text-center"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.pricing}
              </a>

              <Button className="bg-primary hover:bg-navy-light text-primary-foreground gap-2 w-full">
                <Phone className="w-4 h-4" />
                {t.nav.callNow}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
