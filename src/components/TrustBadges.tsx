import { Shield, Stethoscope, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const trustItems = [
  {
    icon: Shield,
    labelEn: 'Licensed Medical Staff',
    labelEs: 'Personal Médico Licenciado',
  },
  {
    icon: Stethoscope,
    labelEn: 'MD Supervised',
    labelEs: 'Supervisado por MD',
  },
  {
    icon: MapPin,
    labelEn: 'Serving Pharr & McAllen',
    labelEs: 'Sirviendo a Pharr y McAllen',
  },
  {
    icon: Sparkles,
    labelEn: 'Premium Ingredients',
    labelEs: 'Ingredientes Premium',
  },
];

const TrustBadges = () => {
  const { lang } = useLanguage();

  return (
    <section className="py-8 bg-secondary/50 border-y border-border/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="glass-card glass-card-hover flex flex-col items-center text-center gap-3 p-4"
              >
                <div className="h-12 w-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {lang === 'es' ? item.labelEs : item.labelEn}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
