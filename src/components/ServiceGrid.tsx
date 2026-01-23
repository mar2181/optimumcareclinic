import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Thermometer, 
  Bandage, 
  Scan, 
  TestTube,
  Heart,
  Droplets,
  Scale,
  Sparkles,
  Dumbbell,
  Scissors,
  Zap,
  type LucideIcon
} from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant: 'urgent' | 'wellness';
}

const ServiceCard = ({ icon: Icon, title, description, variant }: ServiceCardProps) => {
  const isUrgent = variant === 'urgent';
  
  return (
    <div className="group bg-card p-6 rounded-xl border border-border hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
        isUrgent 
          ? 'bg-primary/10 group-hover:bg-primary/20' 
          : 'bg-accent/20 group-hover:bg-accent/30'
      }`}>
        <Icon className={`w-6 h-6 ${isUrgent ? 'text-primary' : 'text-accent'}`} />
      </div>
      <h4 className="font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

interface ServiceCategoryProps {
  title: string;
  services: Array<{ icon: LucideIcon; title: string; desc: string }>;
  variant: 'urgent' | 'wellness';
}

const ServiceCategory = ({ title, services, variant }: ServiceCategoryProps) => {
  const isUrgent = variant === 'urgent';
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className={`w-1 h-8 rounded-full ${isUrgent ? 'bg-primary' : 'bg-accent'}`} />
        <h3 className={`text-xl font-bold ${isUrgent ? 'text-primary' : 'text-accent'}`}>
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

  const urgentCareServices = [
    { icon: Thermometer, title: t.services.urgentCare.items.flu.title, desc: t.services.urgentCare.items.flu.desc },
    { icon: Bandage, title: t.services.urgentCare.items.injuries.title, desc: t.services.urgentCare.items.injuries.desc },
    { icon: Scan, title: t.services.urgentCare.items.xrays.title, desc: t.services.urgentCare.items.xrays.desc },
    { icon: TestTube, title: t.services.urgentCare.items.lab.title, desc: t.services.urgentCare.items.lab.desc },
  ];

  const womensWellnessServices = [
    { icon: Heart, title: t.services.womensWellness.items.hormone.title, desc: t.services.womensWellness.items.hormone.desc },
    { icon: Droplets, title: t.services.womensWellness.items.iv.title, desc: t.services.womensWellness.items.iv.desc },
    { icon: Scale, title: t.services.womensWellness.items.weightLoss.title, desc: t.services.womensWellness.items.weightLoss.desc },
    { icon: Sparkles, title: t.services.womensWellness.items.aesthetics.title, desc: t.services.womensWellness.items.aesthetics.desc },
  ];

  const mensHealthServices = [
    { icon: Dumbbell, title: t.services.mensHealth.items.trt.title, desc: t.services.mensHealth.items.trt.desc },
    { icon: Scissors, title: t.services.mensHealth.items.hair.title, desc: t.services.mensHealth.items.hair.desc },
    { icon: Zap, title: t.services.mensHealth.items.performance.title, desc: t.services.mensHealth.items.performance.desc },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-secondary">
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <ServiceCategory
            title={t.services.urgentCare.title}
            services={urgentCareServices}
            variant="urgent"
          />
          <ServiceCategory
            title={t.services.womensWellness.title}
            services={womensWellnessServices}
            variant="wellness"
          />
          <ServiceCategory
            title={t.services.mensHealth.title}
            services={mensHealthServices}
            variant="wellness"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
