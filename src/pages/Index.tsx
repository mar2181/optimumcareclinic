import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import ServiceGrid from '@/components/ServiceGrid';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsSection from '@/components/TestimonialsSection';
import IVBuilderSection from '@/components/iv-builder/IVBuilderSection';
import PricingTable from '@/components/PricingTable';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';
import FloatingCheckInButton from '@/components/FloatingCheckInButton';
import SectionDivider from '@/components/SectionDivider';

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
    >
      <SEOHead
        title="Optimum Care Pharr | After-Hours Family Clinic"
        titleEs="Optimum Care Pharr | Clínica Familiar Nocturna"
        description="After-hours family medicine in the Rio Grande Valley. Open 5pm-10pm daily. Same-day sick visits, chronic care, and preventive services for the whole family in Pharr, Texas."
        descriptionEs="Medicina familiar nocturna en el Valle del Río Grande. Abierto 5pm-10pm todos los días. Visitas de enfermedad el mismo día, cuidado crónico y servicios preventivos para toda la familia en Pharr, Texas."
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
        <IVBuilderSection />
        <SectionDivider variant="curve" fillClassName="fill-background" />
        <PricingTable />
        <SectionDivider variant="wave" fillClassName="fill-secondary/30" />
        <LocationSection />
        <SectionDivider variant="angular" fillClassName="fill-primary" />
      </main>
      <Footer />
      <FloatingCheckInButton />
    </motion.div>
  );
};

export default Index;
