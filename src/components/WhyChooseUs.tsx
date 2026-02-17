import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Moon, CalendarCheck, DollarSign, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import staffTeam from '@/assets/staff-team.jpg';

interface TrustItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
}

const TrustItem = ({ icon: Icon, title, description, delay }: TrustItemProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="flex flex-col items-center text-center gap-3 p-6 glass-card glass-card-hover border-glow card-shine cursor-default"
  >
    <motion.div 
      className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Icon className="w-8 h-8 text-accent" />
    </motion.div>
    <h3 className="font-bold text-foreground text-lg">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </motion.div>
);

const WhyChooseUs = () => {
  const { t, lang } = useLanguage();

  const trustItems: Array<{ icon: LucideIcon; title: string; description: string }> = [
    { icon: Users, title: t.whyUs.bilingual.title, description: t.whyUs.bilingual.desc },
    { icon: Moon, title: t.whyUs.afterHours.title, description: t.whyUs.afterHours.desc },
    { icon: CalendarCheck, title: t.whyUs.sameDay.title, description: t.whyUs.sameDay.desc },
    { icon: DollarSign, title: t.whyUs.affordable.title, description: t.whyUs.affordable.desc },
  ];

  const teamImageAlt = lang === 'es' 
    ? 'Equipo médico diverso y amigable de Optimum Health & Wellness Clinic' 
    : 'Friendly diverse medical team at Optimum Health & Wellness Clinic';

  return (
    <section className="py-12 md:py-20 bg-secondary/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-mesh opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Team Image with parallax-like effect */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
              {/* Decorative border glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-transparent to-gold/20 rounded-2xl blur-sm opacity-50" />
              
              <motion.img 
                src={staffTeam} 
                alt={teamImageAlt}
                className="w-full h-[400px] md:h-[500px] object-cover relative z-10 rounded-2xl"
                loading="lazy"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent z-20 rounded-2xl" />
            </div>
            
            {/* Floating badge with glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-4 -right-4 md:right-8 glass-card-gold p-4 flex items-center gap-3 border-glow shadow-lg shadow-gold/20"
            >
              <motion.div 
                className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Users className="w-6 h-6 text-accent" />
              </motion.div>
              <div>
                <p className="text-lg font-bold text-foreground">100%</p>
                <p className="text-xs text-muted-foreground">
                  {lang === 'es' ? 'Personal Bilingüe' : 'Bilingual Staff'}
                </p>
              </div>
            </motion.div>

            {/* Decorative floating shapes */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gold/10 blur-2xl floating-shape pointer-events-none" />
            <div className="absolute -bottom-8 right-1/3 w-32 h-32 rounded-full bg-accent/5 blur-2xl floating-shape-delayed pointer-events-none" />
          </motion.div>

          {/* Right - Content */}
          <div>
            {/* Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8 title-underline"
            >
              {t.whyUs.title}
            </motion.h2>

            {/* Trust Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
              {trustItems.map((item, index) => (
                <TrustItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
