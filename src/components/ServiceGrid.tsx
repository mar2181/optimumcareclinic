import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Thermometer, 
  Bug, 
  Salad,
  Flower2,
  Heart,
  Activity,
  Syringe,
  Scissors,
  type LucideIcon
} from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant: 'sameDay' | 'preventive';
}

const ServiceCard = ({ icon: Icon, title, description, variant }: ServiceCardProps) => {
  const isSameDay = variant === 'sameDay';
  
  return (
    <div className="group glass-card glass-card-hover p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
        isSameDay 
          ? 'bg-foreground/10 group-hover:bg-foreground/15' 
          : 'bg-accent/20 group-hover:bg-accent/30'
      }`}>
        <Icon className={`w-6 h-6 ${isSameDay ? 'text-foreground' : 'text-accent'}`} />
      </div>
      <h4 className="font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

interface ServiceCategoryProps {
  title: string;
  services: Array<{ icon: LucideIcon; title: string; desc: string }>;
  variant: 'sameDay' | 'preventive';
}

const ServiceCategory = ({ title, services, variant }: ServiceCategoryProps) => {
  const isSameDay = variant === 'sameDay';
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className={`w-1 h-8 rounded-full ${isSameDay ? 'bg-foreground' : 'bg-accent'}`} />
        <h3 className={`text-xl font-bold ${isSameDay ? 'text-foreground' : 'text-accent'}`}>
          {title}
        </h3>
      </div>
      <div className="grid gap-4">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.desc}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
};

const ServiceGrid = () => {
  const { t } = useLanguage();

  const sameDayServices = [
    { icon: Thermometer, title: t.services.sameDayVisits.items.fluCold.title, desc: t.services.sameDayVisits.items.fluCold.desc },
    { icon: Bug, title: t.services.sameDayVisits.items.infections.title, desc: t.services.sameDayVisits.items.infections.desc },
    { icon: Salad, title: t.services.sameDayVisits.items.stomach.title, desc: t.services.sameDayVisits.items.stomach.desc },
    { icon: Flower2, title: t.services.sameDayVisits.items.allergies.title, desc: t.services.sameDayVisits.items.allergies.desc },
  ];

  const preventiveServices = [
    { icon: Heart, title: t.services.preventiveChronic.items.physicals.title, desc: t.services.preventiveChronic.items.physicals.desc },
    { icon: Activity, title: t.services.preventiveChronic.items.chronic.title, desc: t.services.preventiveChronic.items.chronic.desc },
    { icon: Syringe, title: t.services.preventiveChronic.items.immunizations.title, desc: t.services.preventiveChronic.items.immunizations.desc },
    { icon: Scissors, title: t.services.preventiveChronic.items.procedures.title, desc: t.services.preventiveChronic.items.procedures.desc },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ServiceCategory
            title={t.services.sameDayVisits.title}
            services={sameDayServices}
            variant="sameDay"
          />
          <ServiceCategory
            title={t.services.preventiveChronic.title}
            services={preventiveServices}
            variant="preventive"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
