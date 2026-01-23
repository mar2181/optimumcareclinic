import { useLanguage } from '@/contexts/LanguageContext';
import { Check, Info } from 'lucide-react';

interface PricingRowProps {
  name: string;
  price: string;
  note?: string;
  isEven: boolean;
}

const PricingRow = ({ name, price, note, isEven }: PricingRowProps) => (
  <div className={`flex items-center justify-between py-4 px-6 rounded-xl transition-colors ${
    isEven ? 'bg-muted/50' : 'bg-transparent'
  }`}>
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
        <Check className="w-4 h-4 text-accent" />
      </div>
      <span className="font-medium text-foreground">{name}</span>
    </div>
    <div className="text-right">
      {note && (
        <span className="text-xs text-muted-foreground mr-2">{note}</span>
      )}
      <span className="font-bold text-lg text-accent">{price}</span>
    </div>
  </div>
);

const PricingTable = () => {
  const { t, lang } = useLanguage();

  const pricingItems = [
    { name: t.pricing.items.visit.name, price: t.pricing.items.visit.price },
    { name: t.pricing.items.physical.name, price: t.pricing.items.physical.price },
    { name: t.pricing.items.annualPhysical.name, price: t.pricing.items.annualPhysical.price },
    { name: t.pricing.items.flu.name, price: t.pricing.items.flu.price },
    { name: t.pricing.items.chronic.name, price: t.pricing.items.chronic.price },
    { name: t.pricing.items.procedure.name, price: t.pricing.items.procedure.price },
    { name: t.pricing.items.iv.name, price: t.pricing.items.iv.price, note: t.pricing.startingAt },
  ];

  const headerTitle = lang === 'es' ? 'Menú de Precios' : 'Self-Pay Price Menu';

  return (
    <section id="pricing" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.pricing.title}
          </h2>
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full">
            <Check className="w-5 h-5 text-accent" />
            <span className="font-medium">{t.pricing.subtitle}</span>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-card overflow-hidden">
            {/* Header */}
            <div className="bg-accent/20 p-6 text-center border-b border-border/30">
              <h3 className="text-xl font-bold text-accent">
                {headerTitle}
              </h3>
            </div>

            {/* Pricing List */}
            <div className="p-4 md:p-6 space-y-2">
              {pricingItems.map((item, index) => (
                <PricingRow
                  key={index}
                  name={item.name}
                  price={item.price}
                  note={item.note}
                  isEven={index % 2 === 0}
                />
              ))}
            </div>

            {/* Disclaimer */}
            <div className="px-6 pb-6">
              <div className="flex items-start gap-3 p-4 bg-muted rounded-xl">
                <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  {t.pricing.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
