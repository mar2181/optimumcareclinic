import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import ServiceGrid from '@/components/ServiceGrid';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsSection from '@/components/TestimonialsSection';

import PricingTable from '@/components/PricingTable';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';
import FloatingCheckInButton from '@/components/FloatingCheckInButton';
import SectionDivider from '@/components/SectionDivider';
import MobileBottomNav from '@/components/MobileBottomNav';

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
    >
      <SEOHead
        title="Optimum Health and Wellness Clinic | After-Hours Family Clinic"
        titleEs="Optimum Health and Wellness Clinic | Clínica Familiar Nocturna"
        description="After-hours cash clinic in Pharr, TX. Open nightly 5pm-10pm, 7 days a week. Walk-in sick visits, chronic care management, and family medicine — no insurance needed."
        descriptionEs="Clínica nocturna de pago en efectivo en Pharr, TX. Abierta todas las noches de 5pm a 10pm, 7 días a la semana. Visitas por enfermedad, manejo de condiciones crónicas y medicina familiar — sin seguro médico."
        canonicalUrl="https://optimumhealthandwellnessclinic.com/"
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SectionDivider variant="wave" fillClassName="fill-secondary/50" />
        <TrustBadges />
        <SectionDivider variant="curve" fillClassName="fill-secondary/30" />
        <ServiceGrid />
        <SectionDivider variant="layered" fillClassName="fill-secondary/50" />
        <WhyChooseUs />
        <SectionDivider variant="wave" flip fillClassName="fill-background" />
        <TestimonialsSection />
        <SectionDivider variant="dots" />
        <PricingTable />
        <SectionDivider variant="wave" fillClassName="fill-secondary/30" />
        <LocationSection />
        <SectionDivider variant="angular" fillClassName="fill-primary" />
      </main>
      <Footer />
      <FloatingCheckInButton />
      <MobileBottomNav />
    </motion.div>
  );
};

export default Index;
