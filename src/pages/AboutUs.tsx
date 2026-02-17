import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import teamPhoto from "@/assets/team-photo.png";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Optimum Health & Wellness Clinic</title>
        <meta name="description" content="Meet the dedicated team at Optimum Health & Wellness Clinic in Pharr, TX. Learn about our mission to provide quality after-hours healthcare." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                About <span className="text-accent">Our Team</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                At Optimum Health & Wellness Clinic, we're a family-oriented team committed to providing compassionate, quality after-hours healthcare to the Pharr community.
              </p>
            </motion.div>

            {/* Team Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-2xl border border-border mb-16"
            >
              <img
                src={teamPhoto}
                alt="The Optimum Health & Wellness Clinic team"
                className="w-full h-auto object-cover"
              />
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-2 gap-8"
            >
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We believe that quality healthcare shouldn't stop at 5 PM. Our clinic is open every day from 5 PM to 10 PM, ensuring that families in Pharr and the surrounding Rio Grande Valley have access to the care they need — when they need it most.
                </p>
              </div>
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Why Choose Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our bilingual team provides personalized, walk-in friendly care for the whole family. From sick visits and immunizations to chronic care management, we're here to serve you with warmth and professionalism.
                </p>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 text-center"
            >
              <div className="bg-card rounded-2xl p-8 border border-border inline-block">
                <p className="text-muted-foreground mb-2">Visit us at <span className="text-foreground font-semibold">3912 N Jackson Rd, Pharr, TX 78577</span></p>
                <p className="text-muted-foreground">Call us: <a href="tel:+19566273258" className="text-accent font-semibold hover:underline">(956) 627-3258</a></p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </>
  );
};

export default AboutUs;
