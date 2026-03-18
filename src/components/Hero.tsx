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

// Stats card for the bottom bar
const StatCard = ({ icon: Icon, value, label }: {
  icon: React.ElementType;
  value: string;
  label: string;
}) => (
  <div className="flex items-center gap-3 px-4 py-2 md:px-6 md:py-3">
    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-accent" />
    </div>
    <div>
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-xs text-white/60">{label}</p>
    </div>
  </div>
);

const Hero = () => {
  const { t, lang } = useLanguage();
  const patientsCounter = useCounter(5000, 2500);
  const yearsCounter = useCounter(10, 1500);

  useEffect(() => {
    const timer = setTimeout(() => {
      patientsCounter.start();
      yearsCounter.start();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const content = {
    en: {
      badge: "After-Hours Cash Clinic",
      headline: "Your Family Physician.",
      headlineAccent: "After Hours.",
      subhead: "We're a cash-pay clinic — no insurance, no hassle. Open 5pm–10pm, 7 days a week. Walk-in sick visits, chronic care, medication refills, and more at affordable flat rates.",
      stats: {
        patients: "Patients Served",
        years: "Years Experience",
        rating: "Patient Rating",
      },
      trust: ["Cash-Pay Only", "Open 5pm-10pm", "Bilingual Staff"],
    },
    es: {
      badge: "Clínica Nocturna de Pago en Efectivo",
      headline: "Tu Médico Familiar.",
      headlineAccent: "Después del Horario.",
      subhead: "Somos una clínica de pago en efectivo — sin seguro, sin complicaciones. Abierto de 5pm a 10pm, los 7 días de la semana. Visitas por enfermedad, cuidado crónico, recetas médicas y más a precios accesibles.",
      stats: {
        patients: "Pacientes Atendidos",
        years: "Años de Experiencia",
        rating: "Calificación",
      },
      trust: ["Solo Efectivo", "Abierto 5pm-10pm", "Personal Bilingüe"],
    },
  };

  const c = content[lang];

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Ken Burns background image */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImage}
          alt="Friendly family physician examining a child with mother present at Optimum Health and Wellness Clinic in Pharr Texas"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Multi-layer gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-transparent" />

      {/* Subtle animated orbs behind overlay */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-40 hidden md:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/15 blur-3xl floating-shape"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl floating-shape-slow"
        />
        <FloatingParticles />
      </div>

      {/* ========== CONTENT OVERLAY ========== */}
      <div className="relative z-10 flex flex-col justify-end min-h-screen">
        {/* Main content area */}
        <div className="container mx-auto px-5 md:px-8 pb-6 md:pb-10 pt-28 md:pt-32 flex-1 flex flex-col justify-end">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-card-gold px-4 py-2 w-fit mb-5 md:mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-ring" />
            <span className="text-sm font-medium text-accent">{c.badge}</span>
          </motion.div>

          {/* Headline with cinematic blur-to-sharp reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] max-w-3xl">
              <span className="text-white">{c.headline}</span>
              <br />
              <span className="shimmer-text">{c.headlineAccent}</span>
            </h1>
          </motion.div>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-base md:text-xl text-white/70 leading-relaxed max-w-xl mt-4 md:mt-6"
          >
            {c.subhead}
          </motion.p>


          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-4 md:gap-6 mt-5 md:mt-6"
          >
            {c.trust.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 text-white/60"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
              >
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
