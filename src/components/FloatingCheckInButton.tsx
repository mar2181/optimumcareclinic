import { Link } from 'react-router-dom';
import { ClipboardPen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FloatingCheckInButton = () => {
  const { t } = useLanguage();

  return (
    <Link
      to="/check-in"
      className="fixed bottom-6 right-6 md:hidden z-50 flex items-center gap-2 bg-accent hover:bg-gold-light text-accent-foreground px-5 py-4 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 glow-button glow-button-always float-bob attention-pulse"
      aria-label={t.checkIn.fabLabel}
    >
      <ClipboardPen className="w-5 h-5" />
      <span className="font-semibold text-sm">{t.checkIn.fabText}</span>
    </Link>
  );
};

export default FloatingCheckInButton;
