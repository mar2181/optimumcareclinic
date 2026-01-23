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

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
    >
      <SEOHead
        title="Optimum Health Pharr | IV Therapy & Vitamin Drips"
        titleEs="Optimum Health Pharr | Terapia IV y Vitaminas"
        description="Premier IV hydration clinic in the Rio Grande Valley. Boost immunity and energy with vitamin drips, urgent care, and wellness services in Pharr, Texas."
        descriptionEs="Clínica premier de hidratación IV en el Valle del Río Grande. Aumenta tu inmunidad y energía con infusiones de vitaminas y servicios de bienestar en Pharr, Texas."
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBadges />
        <ServiceGrid />
        <WhyChooseUs />
        <TestimonialsSection />
        <IVBuilderSection />
        <PricingTable />
        <LocationSection />
      </main>
      <Footer />
      <FloatingCheckInButton />
    </motion.div>
  );
};

export default Index;
