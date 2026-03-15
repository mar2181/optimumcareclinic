import { useLanguage } from '@/contexts/LanguageContext';
import { DollarSign, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PricingTable = () => {
  const { lang } = useLanguage();

  const content = {
    en: {
      title: "Simple, Transparent Pricing",
      price: "$70",
      label: "per visit",
      description: "One flat rate for your visit — no hidden fees, no insurance needed. Just quality care at a price you can afford.",
      cta: "View All Services",
    },
    es: {
      title: "Precios Simples y Transparentes",
      price: "$70",
      label: "por visita",
      description: "Una tarifa fija por tu visita — sin cargos ocultos, sin seguro necesario. Solo atención de calidad a un precio accesible.",
      cta: "Ver Todos los Servicios",
    },
  };

  const c = content[lang];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
              {c.title}
            </h2>

            {/* Price callout */}
            <div className="glass-card p-8 md:p-12 inline-flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-accent" />
              </div>
              <div>
                <span className="text-6xl md:text-7xl font-bold text-accent">{c.price}</span>
                <span className="text-xl text-muted-foreground ml-2">{c.label}</span>
              </div>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                {c.description}
              </p>
              <Button asChild className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                <Link to="/services">
                  {c.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
