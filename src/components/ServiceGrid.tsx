import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Stethoscope, Thermometer, Pill, FlaskConical, TestTube, Syringe, Scissors, HeartPulse } from 'lucide-react';
import serviceMedicalConsultation from '@/assets/service-medical-consultation.jpg';
import serviceSickVisitNew from '@/assets/service-sick-visit-new.jpg';
import serviceMedicationRefills from '@/assets/service-medication-refills.jpg';
import serviceRapidTesting from '@/assets/service-rapid-testing.jpg';
import serviceUrinalysis from '@/assets/service-urinalysis.jpg';
import serviceInjections from '@/assets/service-injections.jpg';
import serviceProcedures from '@/assets/service-procedures.jpg';
import serviceChronicCareNew from '@/assets/service-chronic-care-new.jpg';

const serviceIcons = [Stethoscope, Thermometer, Pill, FlaskConical, TestTube, Syringe, Scissors, HeartPulse];
const serviceImages = [
  serviceMedicalConsultation,
  serviceSickVisitNew,
  serviceMedicationRefills,
  serviceRapidTesting,
  serviceUrinalysis,
  serviceInjections,
  serviceProcedures,
  serviceChronicCareNew,
];

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
                className="group glass-card glass-card-hover border-glow card-shine overflow-hidden cursor-default"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={serviceImages[index]}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-accent/90 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h4 className="font-semibold text-foreground mb-2 text-lg group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
