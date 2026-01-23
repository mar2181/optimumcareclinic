import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import serviceSickVisit from '@/assets/service-sick-visit.jpg';
import serviceChronicCare from '@/assets/service-chronic-care.jpg';
import serviceImmunizations from '@/assets/service-immunizations.jpg';
import patientPediatric from '@/assets/patient-moment-pediatric.jpg';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const ServiceCard = ({ title, description, image, imageAlt }: ServiceCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="group glass-card glass-card-hover overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
  >
    <div className="relative h-48 overflow-hidden">
      <img 
        src={image} 
        alt={imageAlt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
    </div>
    <div className="p-6">
      <h4 className="font-semibold text-foreground mb-2 text-lg">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

interface ServiceListItemProps {
  title: string;
  description: string;
  variant: 'sameDay' | 'preventive';
}

const ServiceListItem = ({ title, description, variant }: ServiceListItemProps) => {
  const isSameDay = variant === 'sameDay';
  
  return (
    <div className="group flex gap-4 p-4 glass-card glass-card-hover transition-all duration-300">
      <div className={`w-1 rounded-full flex-shrink-0 ${isSameDay ? 'bg-foreground/50' : 'bg-accent/50'}`} />
      <div>
        <h4 className="font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
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
    <section id="services" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            {t.services.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t.services.subtitle}
          </motion.p>
        </div>

        {/* Featured Services with Images - 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredServices.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.desc}
              image={service.image}
              imageAlt={service.imageAlt}
            />
          ))}
        </div>

        {/* Additional Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Same-Day Visits */}
          <div>
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
                />
              ))}
            </div>
          </div>

          {/* Preventive & Chronic Care */}
          <div>
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
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
