import { Home, Stethoscope, Phone, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Link } from 'react-router-dom';

const MobileBottomNav = () => {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('home');

  const labels = {
    en: {
      home: 'Home',
      services: 'Services',
      contact: 'Contact',
      menu: 'Menu',
    },
    es: {
      home: 'Inicio',
      services: 'Servicios',
      contact: 'Contacto',
      menu: 'Menú',
    },
  };

  const l = labels[lang];

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', icon: Home, label: l.home, action: () => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { id: 'services', icon: Stethoscope, label: l.services, action: () => scrollToSection('services') },
    { id: 'contact', icon: Phone, label: l.contact, action: () => scrollToSection('location') },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.4, type: 'spring', stiffness: 100 }}
      className="md:hidden fixed bottom-4 left-4 right-4 z-50"
    >
      <div className="bg-secondary/95 backdrop-blur-xl rounded-full border border-border/50 shadow-2xl shadow-black/40 px-2 py-2 flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${
              activeTab === item.id
                ? 'bg-accent/20 text-accent'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-accent' : ''}`} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}

        {/* Menu Sheet Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 text-muted-foreground hover:text-foreground"
            >
              <Menu className="w-5 h-5" />
              <span className="text-[10px] font-medium">{l.menu}</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-3xl bg-secondary/95 backdrop-blur-xl border-t border-border/50">
            <SheetHeader>
              <SheetTitle className="text-foreground">{l.menu}</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 py-4">
              <Link
                to="/check-in"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent/10 hover:bg-accent/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Home className="w-5 h-5 text-accent" />
                </div>
                <span className="font-medium text-foreground">Check In Online</span>
              </Link>
              <Link
                to="/resources"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-foreground/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="font-medium text-foreground">Resources</span>
              </Link>
              <a
                href="tel:+19566273258"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-foreground/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="font-medium text-foreground">Call Us</span>
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
};

export default MobileBottomNav;
