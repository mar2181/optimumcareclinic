import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, ClipboardPen, Users, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import heroImage from '@/assets/hero-family-doctor.jpg';

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

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 10,
    duration: 10 + Math.random() * 10,
    size: 2 + Math.random() * 4,
  }));

  return (
    <div className="particles-container hidden md:block">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// Stats card component
const StatCard = ({ icon: Icon, value, label, delay }: { 
  icon: React.ElementType; 
  value: string; 
  label: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.5, type: "spring", stiffness: 100 }}
    className="glass-card glass-card-hover border-glow card-shine p-4 flex items-center gap-3 cursor-default"
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
      badge: "After-Hours Family Medicine",
      headline: "Your Family Doctor.",
      headlineAccent: "After Hours.",
      subhead: "Comprehensive family medicine from 5pm-10pm, when your regular doctor's office is closed. Same-day sick visits, chronic care, and preventive services for the whole family.",
      stats: {
        patients: "Patients Served",
        years: "Years Experience",
        rating: "Patient Rating",
      },
      trust: ["Open 5pm-10pm", "Bilingual Staff", "Family-Focused Care"],
    },
    es: {
      badge: "Medicina Familiar Nocturna",
      headline: "Tu Médico Familiar.",
      headlineAccent: "Después del Horario.",
      subhead: "Medicina familiar integral de 5pm a 10pm, cuando el consultorio de tu médico regular está cerrado. Visitas de enfermedad el mismo día, cuidado crónico y servicios preventivos para toda la familia.",
      stats: {
        patients: "Pacientes Atendidos",
        years: "Años de Experiencia",
        rating: "Calificación",
      },
      trust: ["Abierto 5pm-10pm", "Personal Bilingüe", "Enfoque Familiar"],
    },
  };

  const c = content[lang];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden animated-gradient-bg">
      {/* Animated Background Shapes - Desktop only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {/* Large gradient orb - top right */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl floating-shape" 
        />
        
        {/* Secondary orb - bottom left */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/30 blur-3xl floating-shape-slow" 
        />
        
        {/* Accent orb - center right */}
        <div className="absolute top-1/2 right-1/4 w-56 h-56 rounded-full bg-gold/8 blur-2xl floating-shape-delayed" />
        
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        
        {/* Geometric lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating Particles */}
        <FloatingParticles />
      </div>

      {/* ========== MOBILE LAYOUT ========== */}
      <div className="md:hidden w-full flex flex-col px-4 pt-16 pb-24 relative z-10">
        {/* Mobile Hero Image - Large rounded */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full mb-4"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
            <img
              src={heroImage}
              alt="Friendly family doctor examining a child with mother present at Optimum Care after-hours clinic in Pharr Texas"
              className="w-full h-[340px] object-cover"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Mobile Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full bg-secondary/80 backdrop-blur-sm rounded-3xl p-6 border border-border/30"
        >
          {/* Title */}
          <h1 className="text-3xl font-bold text-foreground leading-tight mb-2">
            {c.headline.replace('.', '')}
          </h1>
          
          {/* Accent Subtitle */}
          <p className="text-lg font-semibold text-accent mb-4">
            {c.headlineAccent.replace('.', '')}
          </p>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {c.subhead}
          </p>

          {/* CTA Buttons - Side by side */}
          <div className="flex gap-3">
            <Button
              asChild
              className="flex-1 bg-accent hover:bg-gold-light text-accent-foreground font-semibold py-5 rounded-xl text-sm"
            >
              <Link to="/check-in">
                {t.hero.checkInOnline}
              </Link>
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-2 border-foreground/30 text-foreground hover:bg-foreground/10 font-semibold py-5 rounded-xl text-sm"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.hero.viewPrices}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* ========== DESKTOP LAYOUT ========== */}
      <div className="hidden md:block container mx-auto px-6 py-16 md:py-20 relative z-10">
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
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-ring" />
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
                <span className="shimmer-text">{c.headlineAccent}</span>
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

            {/* CTAs with glow effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Button
                asChild
                size="lg"
                className="glow-button glow-button-always bg-accent hover:bg-gold-light text-accent-foreground font-semibold gap-2 px-8 py-6 text-lg rounded-xl shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02]"
              >
                <Link to="/check-in">
                  <ClipboardPen className="w-5 h-5" />
                  {t.hero.checkInOnline}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="glow-button border-2 border-foreground/20 text-foreground hover:bg-foreground/10 hover:border-foreground/30 font-semibold px-8 py-6 text-lg rounded-xl transition-all backdrop-blur-sm"
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
                <motion.div 
                  key={index} 
                  className="flex items-center gap-2 text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                >
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm">{item}</span>
                </motion.div>
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
                  src={heroImage}
                  alt="Friendly family doctor examining a child with mother present at Optimum Care after-hours clinic in Pharr Texas"
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

              {/* Rating card - top right with enhanced styling */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-4 -right-4 md:-right-8 glass-card border-glow p-4 flex items-center gap-2"
              >
                <Star className="w-5 h-5 text-accent fill-accent animate-bounce-gentle" />
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
