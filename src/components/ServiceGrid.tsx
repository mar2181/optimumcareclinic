import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Clock, Briefcase, Sparkles } from 'lucide-react';
import serviceSickVisit from '@/assets/service-sick-visit.jpg';
import serviceChronicCare from '@/assets/service-chronic-care.jpg';
import serviceImmunizations from '@/assets/service-immunizations.jpg';
import patientPediatric from '@/assets/patient-moment-pediatric.jpg';
import serviceEmploymentTesting from '@/assets/service-employment-testing.jpg';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  index: number;
}

const ServiceCard = ({ title, description, image, imageAlt, index }: ServiceCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    className="group glass-card glass-card-hover border-glow card-shine overflow-hidden cursor-pointer"
  >
    <div className="relative h-48 overflow-hidden">
      <img 
        src={image} 
        alt={imageAlt}
        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        loading="lazy"
      />
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <div className="p-6">
      <h4 className="font-semibold text-foreground mb-2 text-lg group-hover:text-accent transition-colors duration-300">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

interface ServiceListItemProps {
  title: string;
  description: string;
  variant: 'sameDay' | 'preventive';
  index: number;
}

const ServiceListItem = ({ title, description, variant, index }: ServiceListItemProps) => {
  const isSameDay = variant === 'sameDay';
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
      className="group flex gap-4 p-4 glass-card glass-card-hover border-glow transition-all duration-300 cursor-default"
    >
      <div className={`w-1 rounded-full flex-shrink-0 transition-all duration-300 group-hover:w-2 ${isSameDay ? 'bg-foreground/50 group-hover:bg-foreground/80' : 'bg-accent/50 group-hover:bg-accent'}`} />
      <div>
        <h4 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors duration-300">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

const ServiceGrid = () => {
  const { t, lang } = useLanguage();

  const featuredServices = [
    { 
      title: t.services.sameDayVisits.items.fluCold.title, 
      desc: t.services.sameDayVisits.items.fluCold.desc,
      image: serviceSickVisit,
      imageAlt: lang === 'es' ? 'Enfermera cuidando a un niño enfermo con su madre' : 'Nurse caring for sick child with mother'
    },
    { 
      title: t.services.preventiveChronic.items.chronic.title, 
      desc: t.services.preventiveChronic.items.chronic.desc,
      image: serviceChronicCare,
      imageAlt: lang === 'es' ? 'Doctor tomando la presión arterial de un paciente mayor' : 'Doctor taking blood pressure of elderly patient'
    },
    { 
      title: t.services.preventiveChronic.items.immunizations.title, 
      desc: t.services.preventiveChronic.items.immunizations.desc,
      image: serviceImmunizations,
      imageAlt: lang === 'es' ? 'Profesional de salud administrando vacuna' : 'Healthcare professional administering vaccine'
    },
    { 
      title: t.services.preventiveChronic.items.physicals.title, 
      desc: t.services.preventiveChronic.items.physicals.desc,
      image: patientPediatric,
      imageAlt: lang === 'es' ? 'Doctor examinando a un bebé con su padre' : 'Doctor examining baby with father'
    },
  ];

  const additionalSameDayServices = [
    { title: t.services.sameDayVisits.items.infections.title, desc: t.services.sameDayVisits.items.infections.desc },
    { title: t.services.sameDayVisits.items.stomach.title, desc: t.services.sameDayVisits.items.stomach.desc },
    { title: t.services.sameDayVisits.items.allergies.title, desc: t.services.sameDayVisits.items.allergies.desc },
  ];

  const additionalPreventiveServices = [
    { title: t.services.preventiveChronic.items.procedures.title, desc: t.services.preventiveChronic.items.procedures.desc },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
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

        {/* Featured Employment Testing Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-12 rounded-2xl overflow-hidden shadow-2xl border border-gold/20"
        >
          <div className="absolute inset-0">
            <img 
              src={serviceEmploymentTesting} 
              alt={lang === 'es' ? 'Físico de empleo y prueba de drogas después del horario' : 'After-hours employment physical and drug testing'}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/50" />
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold/5 opacity-60" />
          </div>
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-4 border border-accent/30"
              >
                <Clock className="w-4 h-4" />
                <span className="font-medium text-sm">5 PM - 10 PM</span>
                <Sparkles className="w-4 h-4" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-3">
                {t.services.employment.title}
              </h3>
              <p className="text-primary-foreground/90 text-lg mb-4">
                {t.services.employment.subtitle}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {Object.values(t.services.employment.items).map((item, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20"
                  >
                    <Briefcase className="w-4 h-4 text-accent" />
                    <span className="text-primary-foreground font-medium text-sm">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Services with Images - 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredServices.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.desc}
              image={service.image}
              imageAlt={service.imageAlt}
              index={index}
            />
          ))}
        </div>

        {/* Additional Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Same-Day Visits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 rounded-full bg-foreground" />
              <h3 className="text-xl font-bold text-foreground">
                {t.services.sameDayVisits.title}
              </h3>
            </div>
            <div className="space-y-3">
              {additionalSameDayServices.map((service, index) => (
                <ServiceListItem
                  key={index}
                  title={service.title}
                  description={service.desc}
                  variant="sameDay"
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Preventive & Chronic Care */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 rounded-full bg-accent" />
              <h3 className="text-xl font-bold text-accent">
                {t.services.preventiveChronic.title}
              </h3>
            </div>
            <div className="space-y-3">
              {additionalPreventiveServices.map((service, index) => (
                <ServiceListItem
                  key={index}
                  title={service.title}
                  description={service.desc}
                  variant="preventive"
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
