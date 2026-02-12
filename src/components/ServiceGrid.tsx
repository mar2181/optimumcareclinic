import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Stethoscope, Thermometer, Pill, FlaskConical, TestTube, Syringe, Scissors, HeartPulse } from 'lucide-react';
import serviceSickVisit from '@/assets/service-sick-visit.jpg';
import serviceChronicCare from '@/assets/service-chronic-care.jpg';
import serviceImmunizations from '@/assets/service-immunizations.jpg';
import patientPediatric from '@/assets/patient-moment-pediatric.jpg';

const serviceIcons = [Stethoscope, Thermometer, Pill, FlaskConical, TestTube, Syringe, Scissors, HeartPulse];

const ServiceGrid = () => {
  const { t } = useLanguage();
  const items = Object.values(t.services.items);

  return (
    <section id="services" className="py-16 md:py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 title-underline"
          >
            {t.services.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6"
          >
            {t.services.subtitle}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group glass-card glass-card-hover border-glow card-shine overflow-hidden cursor-default p-6"
              >
                <div className="mb-4 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground mb-2 text-lg group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h4>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
