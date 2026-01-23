import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Clock, Calendar, DollarSign, type LucideIcon } from 'lucide-react';

interface TrustItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const TrustItem = ({ icon: Icon, title, description }: TrustItemProps) => (
  <div className="flex flex-col items-center text-center gap-3 p-6 glass-card glass-card-hover">
    <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center">
      <Icon className="w-8 h-8 text-accent" />
    </div>
    <h3 className="font-bold text-foreground text-lg">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

const WhyChooseUs = () => {
  const { t } = useLanguage();

  const trustItems: Array<{ icon: LucideIcon; title: string; description: string }> = [
    { icon: Users, title: t.whyUs.bilingual.title, description: t.whyUs.bilingual.desc },
    { icon: Clock, title: t.whyUs.noWait.title, description: t.whyUs.noWait.desc },
    { icon: Calendar, title: t.whyUs.saturday.title, description: t.whyUs.saturday.desc },
    { icon: DollarSign, title: t.whyUs.affordable.title, description: t.whyUs.affordable.desc },
  ];

  return (
    <section className="py-12 md:py-16 bg-secondary/50">
      <div className="container mx-auto px-6">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          {t.whyUs.title}
        </h2>

        {/* Trust Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {trustItems.map((item, index) => (
            <TrustItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
