import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, ClipboardPen, Users, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Animated counter hook
const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return { count, start: () => setHasStarted(true) };
};

// Stats card component
const StatCard = ({ icon: Icon, value, label, delay }: { 
  icon: React.ElementType; 
  value: string; 
  label: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="glass-card glass-card-hover p-4 flex items-center gap-3 cursor-default"
  >
    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-accent" />
    </div>
    <div>
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  </motion.div>
);

const Hero = () => {
  const { t, lang } = useLanguage();
  const patientsCounter = useCounter(5000, 2500);
  const yearsCounter = useCounter(10, 1500);

  useEffect(() => {
    // Start counters after initial animation
    const timer = setTimeout(() => {
      patientsCounter.start();
      yearsCounter.start();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const content = {
    en: {
      badge: "Premier IV Therapy & Urgent Care",
      headline: "Affordable Healthcare.",
      headlineAccent: "No Insurance Needed.",
      subhead: "Walk-in urgent care and premium wellness services for the Rio Grande Valley. Bilingual staff, transparent pricing, same-day service.",
      stats: {
        patients: "Patients Served",
        years: "Years Experience",
        rating: "Patient Rating",
      },
      trust: ["Walk-ins Welcome", "Bilingual Staff", "Cash-Only Pricing"],
    },
    es: {
      badge: "Terapia IV Premium y Cuidado de Urgencias",
      headline: "Atención Médica Accesible.",
      headlineAccent: "Sin Seguro Necesario.",
      subhead: "Clínica de urgencias sin cita y servicios premium de bienestar para el Valle del Río Grande. Personal bilingüe, precios transparentes, servicio el mismo día.",
      stats: {
        patients: "Pacientes Atendidos",
        years: "Años de Experiencia",
        rating: "Calificación",
      },
      trust: ["Sin Cita Previa", "Personal Bilingüe", "Precios en Efectivo"],
    },
  };

  const c = content[lang];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orb - top right */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl floating-shape" />
        
        {/* Secondary orb - bottom left */}
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-primary/30 blur-3xl floating-shape-slow" />
        
        {/* Accent orb - center right */}
        <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-gold/5 blur-2xl floating-shape-delayed" />
        
        {/* Geometric lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content - Takes 7 columns */}
          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass-card-gold px-4 py-2 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">{c.badge}</span>
            </motion.div>

            {/* Headline with gradient accent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-foreground">{c.headline}</span>
                <br />
                <span className="text-gradient-gold">{c.headlineAccent}</span>
              </h1>
            </motion.div>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
            >
              {c.subhead}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-gold-light text-accent-foreground font-semibold gap-2 px-8 py-6 text-lg rounded-xl shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02]"
              >
                <Link to="/check-in">
                  <ClipboardPen className="w-5 h-5" />
                  {t.hero.checkInOnline}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-foreground/20 text-foreground hover:bg-foreground/10 hover:border-foreground/30 font-semibold px-8 py-6 text-lg rounded-xl transition-all backdrop-blur-sm"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.hero.viewPrices}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              {c.trust.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Takes 5 columns */}
          <div className="lg:col-span-5 relative">
            {/* Main Image with diagonal clip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative"
            >
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30"
                style={{
                  clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 15%)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Friendly healthcare provider at Optimum Care urgent care clinic in Pharr Texas"
                  width={600}
                  height={700}
                  className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />
              </div>

              {/* Glass Stats Cards - Positioned absolutely */}
              <div className="absolute -bottom-4 -left-4 md:-left-8 flex flex-col gap-3">
                <StatCard 
                  icon={Users} 
                  value={`${patientsCounter.count.toLocaleString()}+`}
                  label={c.stats.patients}
                  delay={0.6}
                />
                <StatCard 
                  icon={Clock} 
                  value={`${yearsCounter.count}+`}
                  label={c.stats.years}
                  delay={0.7}
                />
              </div>

              {/* Rating card - top right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-4 -right-4 md:-right-8 glass-card p-4 flex items-center gap-2"
              >
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span className="text-xl font-bold text-foreground">4.9</span>
                <span className="text-xs text-muted-foreground">{c.stats.rating}</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
