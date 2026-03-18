import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Button } from '@/components/ui/button';
import { Phone, Stethoscope, Thermometer, Pill, FlaskConical, TestTube, Syringe, Scissors, HeartPulse, Bandage, ArrowRight } from 'lucide-react';
import serviceMedicalConsultation from '@/assets/service-medical-consultation.jpg';
import serviceSickVisitNew from '@/assets/service-sick-visit-new.jpg';
import serviceMedicationRefills from '@/assets/service-medication-refills.jpg';
import serviceRapidTesting from '@/assets/service-rapid-testing.jpg';
import serviceUrinalysis from '@/assets/service-urinalysis.jpg';
import serviceInjections from '@/assets/service-injections.jpg';
import serviceProcedures from '@/assets/service-procedures.jpg';
import serviceChronicCareNew from '@/assets/service-chronic-care-new.jpg';
import serviceWoundCare from '@/assets/service-wound-care.jpg';

const content = {
  en: {
    badge: "What We Offer",
    headline: "Our Services",
    subhead: "Quality after-hours healthcare for the whole family. Walk in any evening, 5pm–10pm, 7 days a week. No insurance needed.",
    ctaCall: "Call Now",
    learnMore: "Learn More",
    services: [
      {
        title: "Medical Consultation",
        desc: "Comprehensive medical evaluations and consultations for all ages. Our providers take the time to listen, diagnose, and create a treatment plan that works for you.",
        price: "$135",
        image: serviceMedicalConsultation,
        icon: Stethoscope,
      },
      {
        title: "Sick Visit",
        desc: "Walk-in care for illness, fever, cough, sore throat, ear infections, and general discomfort. Get seen the same day without an appointment.",
        price: "$95",
        image: serviceSickVisitNew,
        icon: Thermometer,
      },
      {
        title: "Medication Refills",
        desc: "Need a prescription refill but your regular physician's office is closed? We can help with routine medication refills to keep you on track.",
        price: "$75",
        image: serviceMedicationRefills,
        icon: Pill,
      },
      {
        title: "Rapid Testing",
        desc: "Get quick, accurate results for Flu, COVID-19, and Strep tests. Results in minutes so you know what you're dealing with and can start treatment right away.",
        price: "$55",
        image: serviceRapidTesting,
        icon: FlaskConical,
      },
      {
        title: "Urinalysis",
        desc: "Urine testing to detect urinary tract infections, kidney issues, diabetes indicators, and other conditions. Fast, on-site results.",
        price: "$45",
        image: serviceUrinalysis,
        icon: TestTube,
      },
      {
        title: "Injections",
        desc: "Therapeutic and preventive injections including B12, anti-nausea, pain management, and steroid injections administered by our experienced staff.",
        price: "$50+",
        image: serviceInjections,
        icon: Syringe,
      },
      {
        title: "Procedures",
        desc: "Minor in-office procedures including ear lavage (wax removal), wound care, abscess drainage, and other minor treatments.",
        price: "$75+",
        image: serviceProcedures,
        icon: Scissors,
      },
      {
        title: "Chronic Condition Management",
        desc: "Ongoing care and monitoring for diabetes, hypertension, high cholesterol, and other chronic conditions. Medication management and regular check-ups.",
        price: "$110",
        image: serviceChronicCareNew,
        icon: HeartPulse,
      },
      {
        title: "Wound Care",
        desc: "Professional wound cleaning, treatment, and dressing for cuts, scrapes, lacerations, minor burns, and puncture wounds. Walk in — no appointment needed.",
        price: "$75+",
        image: serviceWoundCare,
        icon: Bandage,
        link: "/wound-care",
      },
    ],
    pricingNote: "Cash pay only. No insurance required. Prices may vary based on complexity.",
    ctaTitle: "Ready to Be Seen?",
    ctaDesc: "Walk in tonight — no appointment needed. We're open 5pm–10pm, 7 days a week.",
  },
  es: {
    badge: "Lo Que Ofrecemos",
    headline: "Nuestros Servicios",
    subhead: "Atención médica nocturna de calidad para toda la familia. Venga sin cita cualquier noche, de 5pm a 10pm, los 7 días de la semana. Sin seguro médico.",
    ctaCall: "Llámenos",
    learnMore: "Más Información",
    services: [
      {
        title: "Consulta Médica",
        desc: "Evaluaciones y consultas médicas completas para todas las edades. Nuestros proveedores se toman el tiempo para escuchar, diagnosticar y crear un plan de tratamiento.",
        price: "$135",
        image: serviceMedicalConsultation,
        icon: Stethoscope,
      },
      {
        title: "Visita por Enfermedad",
        desc: "Atención sin cita para enfermedades, fiebre, tos, dolor de garganta, infecciones de oído y malestar general. Sea atendido el mismo día.",
        price: "$95",
        image: serviceSickVisitNew,
        icon: Thermometer,
      },
      {
        title: "Recetas Médicas",
        desc: "¿Necesita renovar una receta pero el consultorio de su médico está cerrado? Podemos ayudarle con recetas de rutina.",
        price: "$75",
        image: serviceMedicationRefills,
        icon: Pill,
      },
      {
        title: "Pruebas Rápidas",
        desc: "Resultados rápidos y precisos para pruebas de Gripe, COVID-19 y Estreptococo. Resultados en minutos para comenzar el tratamiento de inmediato.",
        price: "$55",
        image: serviceRapidTesting,
        icon: FlaskConical,
      },
      {
        title: "Análisis de Orina",
        desc: "Pruebas de orina para detectar infecciones urinarias, problemas renales, indicadores de diabetes y otras condiciones. Resultados rápidos en el lugar.",
        price: "$45",
        image: serviceUrinalysis,
        icon: TestTube,
      },
      {
        title: "Inyecciones",
        desc: "Inyecciones terapéuticas y preventivas incluyendo B12, antináuseas, manejo del dolor e inyecciones de esteroides administradas por nuestro personal.",
        price: "$50+",
        image: serviceInjections,
        icon: Syringe,
      },
      {
        title: "Procedimientos",
        desc: "Procedimientos menores incluyendo lavado de oídos, cuidado de heridas, drenaje de abscesos y otros tratamientos menores.",
        price: "$75+",
        image: serviceProcedures,
        icon: Scissors,
      },
      {
        title: "Manejo de Condiciones Crónicas",
        desc: "Cuidado continuo y monitoreo para diabetes, hipertensión, colesterol alto y otras condiciones crónicas. Manejo de medicamentos y chequeos regulares.",
        price: "$110",
        image: serviceChronicCareNew,
        icon: HeartPulse,
      },
      {
        title: "Cuidado de Heridas",
        desc: "Limpieza, tratamiento y vendaje profesional para cortadas, raspaduras, laceraciones, quemaduras menores y heridas punzantes. Sin cita previa.",
        price: "$75+",
        image: serviceWoundCare,
        icon: Bandage,
        link: "/wound-care",
      },
    ],
    pricingNote: "Pago en efectivo únicamente. Sin seguro requerido. Los precios pueden variar según la complejidad.",
    ctaTitle: "¿Listo Para Ser Atendido?",
    ctaDesc: "Venga esta noche — sin cita previa. Estamos abiertos de 5pm a 10pm, los 7 días de la semana.",
  },
};

const Services = () => {
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
        title="Our Services | Optimum Health and Wellness Clinic"
        titleEs="Nuestros Servicios | Optimum Health and Wellness Clinic"
        description="After-hours medical services in Pharr, TX. Sick visits, medical consultations, rapid testing, wound care, chronic care, and more. Open 5pm-10pm daily."
        descriptionEs="Servicios médicos nocturnos en Pharr, TX. Visitas por enfermedad, consultas médicas, pruebas rápidas, cuidado de heridas, cuidado crónico y más. Abierto 5pm-10pm."
      />
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6"
            >
              <Stethoscope className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">{c.badge}</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              {c.headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto"
            >
              {c.subhead}
            </motion.p>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="space-y-16 md:space-y-24">
              {c.services.map((service, index) => {
                const Icon = service.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${!isEven ? 'md:[direction:rtl]' : ''}`}
                  >
                    {/* Image */}
                    <div className={`relative rounded-2xl overflow-hidden shadow-2xl group ${!isEven ? 'md:[direction:ltr]' : ''}`}>
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-accent/90 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent-foreground" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${!isEven ? 'md:[direction:ltr]' : ''}`}>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                        {service.desc}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button
                          asChild
                          className="bg-accent hover:bg-gold-light text-accent-foreground font-semibold gap-2 rounded-xl"
                        >
                          <a href="tel:+19566273258">
                            <Phone className="w-4 h-4" />
                            {c.ctaCall}
                          </a>
                        </Button>
                        {'link' in service && service.link && (
                          <Button
                            asChild
                            variant="outline"
                            className="gap-2 rounded-xl"
                          >
                            <Link to={service.link}>
                              {c.learnMore}
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pricing disclaimer */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-sm text-muted-foreground mt-16 max-w-xl mx-auto"
            >
              {c.pricingNote}
            </motion.p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.ctaTitle}</h2>
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

export default Services;
