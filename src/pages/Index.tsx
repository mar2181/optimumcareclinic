import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServiceGrid from '@/components/ServiceGrid';
import WhyChooseUs from '@/components/WhyChooseUs';
import PricingTable from '@/components/PricingTable';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';
import FloatingCheckInButton from '@/components/FloatingCheckInButton';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ServiceGrid />
        <WhyChooseUs />
        <PricingTable />
        <LocationSection />
      </main>
      <Footer />
      <FloatingCheckInButton />
    </div>
  );
};

export default Index;
