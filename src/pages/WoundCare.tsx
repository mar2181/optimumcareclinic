import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Button } from '@/components/ui/button';
import { Phone, Clock, Shield, Heart, CheckCircle, ArrowLeft, Bandage, Users, Star } from 'lucide-react';
import woundCareHero from '@/assets/wound-care-hero.jpg';
import woundCareTreatment from '@/assets/wound-care-treatment.jpg';
import woundCarePediatric from '@/assets/wound-care-pediatric.jpg';
import serviceWoundCare from '@/assets/service-wound-care.jpg';

const content = {
  en: {
    badge: "Wound Care Services",
    headline: "Professional Wound Care.",
    headlineAccent: "When You Need It Most.",
    subhead: "Walk-in wound treatment available 5pm–10pm, 7 days a week. No appointment needed — our bilingual team is ready to help your family.",
    ctaCall: "Call Now",
    ctaBack: "Back to Home",
    whatWeTreat: "What We Treat",
    whatWeTreatItems: [
      "Minor cuts and lacerations",
      "Scrapes and abrasions",
      "Puncture wounds",
      "Minor burns",
      "Wound cleaning and irrigation",
      "Wound dressing and bandaging",
      "Wound assessment and evaluation",
      "Follow-up wound care",
    ],
    whyChoose: "Why Choose Us for Wound Care?",
    whyItems: [
      { icon: Clock, title: "After-Hours Access", desc: "Open 5pm–10pm daily when other clinics are closed" },
      { icon: Users, title: "Bilingual Staff", desc: "We speak English and Spanish fluently" },
      { icon: Shield, title: "No Insurance Needed", desc: "Affordable cash-pay pricing with no surprise bills" },
      { icon: Heart, title: "Family-Friendly", desc: "Caring treatment for adults and children alike" },
    ],
    processTitle: "Our Wound Care Process",
    processSteps: [
      { step: "1", title: "Walk In", desc: "No appointment needed. Just walk in during our evening hours." },
      { step: "2", title: "Assessment", desc: "Our medical team evaluates your wound and determines the best treatment." },
      { step: "3", title: "Treatment", desc: "Professional cleaning, treatment, and dressing of your wound." },
      { step: "4", title: "Aftercare", desc: "Clear instructions for at-home care and follow-up if needed." },
    ],
    pricing: "Wound Care Pricing",
    pricingNote: "Starting at",
    pricingAmount: "$75+",
    pricingDisclaimer: "Final price depends on wound complexity. Cash pay only — no insurance.",
    ctaSection: "Don't Wait on Wound Care",
    ctaDesc: "Minor wounds can become serious if untreated. Visit us tonight — no appointment needed.",
  },
  es: {
    badge: "Servicios de Cuidado de Heridas",
    headline: "Cuidado Profesional de Heridas.",
    headlineAccent: "Cuando Más Lo Necesitas.",
    subhead: "Tratamiento de heridas sin cita disponible de 5pm a 10pm, los 7 días de la semana. Sin cita previa — nuestro equipo bilingüe está listo para ayudar a su familia.",
    ctaCall: "Llámenos",
    ctaBack: "Volver al Inicio",
    whatWeTreat: "Qué Tratamos",
    whatWeTreatItems: [
      "Cortadas y laceraciones menores",
      "Raspaduras y abrasiones",
      "Heridas punzantes",
      "Quemaduras menores",
      "Limpieza e irrigación de heridas",
      "Vendaje y curación de heridas",
      "Evaluación y valoración de heridas",
      "Seguimiento de cuidado de heridas",
    ],
    whyChoose: "¿Por Qué Elegirnos para Cuidado de Heridas?",
    whyItems: [
      { icon: Clock, title: "Horario Nocturno", desc: "Abierto de 5pm a 10pm cuando otras clínicas están cerradas" },
      { icon: Users, title: "Personal Bilingüe", desc: "Hablamos inglés y español con fluidez" },
      { icon: Shield, title: "Sin Seguro Necesario", desc: "Precios accesibles en efectivo sin sorpresas" },
      { icon: Heart, title: "Para Toda la Familia", desc: "Atención cariñosa para adultos y niños" },
    ],
    processTitle: "Nuestro Proceso de Cuidado de Heridas",
    processSteps: [
      { step: "1", title: "Llegue Sin Cita", desc: "No necesita cita. Solo venga durante nuestro horario nocturno." },
      { step: "2", title: "Evaluación", desc: "Nuestro equipo médico evalúa su herida y determina el mejor tratamiento." },
      { step: "3", title: "Tratamiento", desc: "Limpieza profesional, tratamiento y vendaje de su herida." },
      { step: "4", title: "Cuidado Posterior", desc: "Instrucciones claras para el cuidado en casa y seguimiento si es necesario." },
    ],
    pricing: "Precios de Cuidado de Heridas",
    pricingNote: "Desde",
    pricingAmount: "$75+",
    pricingDisclaimer: "El precio final depende de la complejidad de la herida. Solo pago en efectivo — sin seguro.",
    ctaSection: "No Espere con el Cuidado de Heridas",
    ctaDesc: "Las heridas menores pueden volverse serias sin tratamiento. Visítenos esta noche — sin cita previa.",
  },
};

const WoundCare = () => {
  const { lang } = useLanguage();
  const c = content[lang];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
    >
      <SEOHead
        title="Wound Care Services | Optimum Health and Wellness Clinic"
        titleEs="Cuidado de Heridas | Optimum Health and Wellness Clinic"
        description="Professional wound care in Pharr, TX. Walk-in wound treatment available 5pm-10pm daily. Minor cuts, lacerations, burns, and more. No insurance needed."
        descriptionEs="Cuidado profesional de heridas en Pharr, TX. Tratamiento de heridas sin cita de 5pm a 10pm. Cortadas, laceraciones, quemaduras y más. Sin seguro médico."
      />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden">
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="absolute inset-0 z-0"
          >
            <img
              src={woundCareHero}
              alt="Hispanic doctor providing professional wound care treatment at Optimum Wellness Foundation"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

          <div className="relative z-10 container mx-auto px-5 md:px-8 pb-10 md:pb-16 pt-28">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 glass-card-gold px-4 py-2 w-fit mb-5"
            >
              <Bandage className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">{c.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] max-w-3xl"
            >
              <span className="text-white">{c.headline}</span>
              <br />
              <span className="shimmer-text">{c.headlineAccent}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="text-base md:text-xl text-white/70 leading-relaxed max-w-xl mt-4 md:mt-6"
            >
              {c.subhead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 120 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8"
            >
              <Button
                asChild
                size="lg"
                className="glow-button bg-accent hover:bg-gold-light text-accent-foreground font-semibold gap-2 px-8 py-6 text-base md:text-lg rounded-xl"
              >
                <a href="tel:+19566273258">
                  <Phone className="w-5 h-5" />
                  {c.ctaCall}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-6 text-base md:text-lg rounded-xl backdrop-blur-sm"
              >
                <Link to="/">
                  <ArrowLeft className="w-5 h-5" />
                  {c.ctaBack}
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* What We Treat */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 title-underline">
                  {c.whatWeTreat}
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {c.whatWeTreatItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-3 p-3 rounded-xl glass-card"
                    >
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={serviceWoundCare}
                  alt="Hispanic nurse providing wound care treatment"
                  className="w-full h-auto object-cover rounded-2xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center title-underline"
            >
              {c.whyChoose}
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.whyItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={woundCareTreatment}
                  alt="Hispanic doctor treating a wound on a young patient"
                  className="w-full h-auto object-cover rounded-2xl"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 title-underline">
                  {c.processTitle}
                </h2>
                <div className="space-y-6">
                  {c.processSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        <span className="text-accent-foreground font-bold">{step.step}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{step.title}</h3>
                        <p className="text-muted-foreground mt-1">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pediatric Section with Image */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 text-center"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {c.pricing}
                  </h2>
                  <p className="text-muted-foreground mb-4">{c.pricingNote}</p>
                  <span className="text-5xl md:text-6xl font-bold text-accent">{c.pricingAmount}</span>
                  <p className="text-sm text-muted-foreground mt-6">{c.pricingDisclaimer}</p>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={woundCarePediatric}
                  alt="Hispanic nurse treating a child's wound while mother watches"
                  className="w-full h-auto object-cover rounded-2xl"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.ctaSection}</h2>
              <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8 text-lg">{c.ctaDesc}</p>
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-gold-light text-accent-foreground font-semibold gap-2 px-10 py-6 text-lg rounded-xl"
              >
                <a href="tel:+19566273258">
                  <Phone className="w-5 h-5" />
                  {c.ctaCall} — (956) 627-3258
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </motion.div>
  );
};

export default WoundCare;
