import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import WaitTimeDisplay from '@/components/WaitTimeDisplay';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'es' : 'en');
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    handleNavClick();
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.2 },
    }),
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">O</span>
            </div>
            <span className="text-xl font-bold text-foreground">
              Optimum <span className="text-accent">Health</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Wait Time Display */}
            <WaitTimeDisplay />
            
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

            <a 
              href="#services" 
              onClick={(e) => scrollToSection(e, 'services')}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              {t.nav.services}
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => scrollToSection(e, 'pricing')}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              {t.nav.pricing}
            </a>
            <a 
              href="/resources"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              {t.nav.resources}
            </a>

            <Button asChild className="bg-primary hover:bg-navy-light text-primary-foreground gap-2">
              <a href="tel:+19566273258">
                <Phone className="w-4 h-4" />
                {t.nav.callNow}
              </a>
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
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="flex flex-col gap-4 py-4">
                {/* Wait Time Display */}
                <motion.div custom={0} variants={itemVariants} className="flex justify-center py-2">
                  <WaitTimeDisplay />
                </motion.div>
                
                {/* Language Toggle */}
                <motion.div custom={1} variants={itemVariants} className="flex items-center justify-center gap-3 py-2">
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
                </motion.div>

                <motion.a
                  custom={2}
                  variants={itemVariants}
                  href="#services"
                  onClick={(e) => scrollToSection(e, 'services')}
                  className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2 text-center"
                >
                  {t.nav.services}
                </motion.a>
                <motion.a
                  custom={3}
                  variants={itemVariants}
                  href="#pricing"
                  onClick={(e) => scrollToSection(e, 'pricing')}
                  className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2 text-center"
                >
                  {t.nav.pricing}
                </motion.a>
                <motion.a
                  custom={4}
                  variants={itemVariants}
                  href="/resources"
                  onClick={handleNavClick}
                  className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2 text-center"
                >
                  {t.nav.resources}
                </motion.a>

                <motion.div custom={5} variants={itemVariants}>
                  <Button asChild className="bg-primary hover:bg-navy-light text-primary-foreground gap-2 w-full">
                    <a href="tel:+19566273258">
                      <Phone className="w-4 h-4" />
                      {t.nav.callNow}
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
