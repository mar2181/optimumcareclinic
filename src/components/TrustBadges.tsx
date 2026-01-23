import { Shield, Stethoscope, Clock, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const trustItems = [
  {
    icon: Shield,
    labelEn: 'Licensed Family Medicine Staff',
    labelEs: 'Personal de Medicina Familiar Licenciado',
  },
  {
    icon: Stethoscope,
    labelEn: 'Board Certified Providers',
    labelEs: 'Proveedores Certificados',
  },
  {
    icon: Clock,
    labelEn: 'Open 5pm-10pm Daily',
    labelEs: 'Abierto 5pm-10pm Diario',
  },
  {
    icon: Users,
    labelEn: 'All Ages Welcome',
    labelEs: 'Todas las Edades Bienvenidas',
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
