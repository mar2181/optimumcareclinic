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
    <section className="py-10 md:py-12 bg-secondary/50 border-y border-border/30 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass-card glass-card-hover border-glow card-shine flex flex-col items-center text-center gap-3 p-5 cursor-default"
              >
                <motion.div 
                  className="h-14 w-14 rounded-2xl bg-accent/15 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="h-7 w-7 text-accent" />
                </motion.div>
                <span className="text-sm font-medium text-foreground leading-tight">
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
