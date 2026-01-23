import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useIVBuilder, IVTreatment, IVAddon } from '@/hooks/useIVBuilder';
import TreatmentCard from './TreatmentCard';
import AddonCard from './AddonCard';
import BuilderSummary from './BuilderSummary';

const TreatmentSkeleton = () => (
  <div className="p-6 rounded-xl glass-card">
    <Skeleton className="h-6 w-32 mb-3" />
    <Skeleton className="h-10 w-20 mb-3" />
    <Skeleton className="h-16 w-full mb-4" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-44" />
    </div>
  </div>
);

const AddonSkeleton = () => (
  <div className="p-4 rounded-xl glass-card">
    <div className="flex items-center justify-between">
      <div>
        <Skeleton className="h-5 w-24 mb-2" />
        <Skeleton className="h-6 w-16" />
      </div>
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  </div>
);

const IVBuilderSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [treatments, setTreatments] = useState<IVTreatment[]>([]);
  const [addons, setAddons] = useState<IVAddon[]>([]);
  const [loading, setLoading] = useState(true);
  
  const {
    selectedBase,
    selectedAddons,
    totalPrice,
    selectBase,
    toggleAddon,
    resetBuilder,
    isAddonSelected,
  } = useIVBuilder();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      const [treatmentsRes, addonsRes] = await Promise.all([
        supabase.from('iv_treatments').select('*').order('base_price', { ascending: false }),
        supabase.from('iv_addons').select('*').order('price', { ascending: true }),
      ]);

      if (treatmentsRes.data) {
        setTreatments(treatmentsRes.data as IVTreatment[]);
      }
      if (addonsRes.data) {
        setAddons(addonsRes.data as IVAddon[]);
      }
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleBook = () => {
    // Navigate to check-in with IV builder selections
    navigate('/check-in', { 
      state: { 
        ivSelection: {
          base: selectedBase,
          addons: selectedAddons,
          total: totalPrice
        }
      }
    });
  };

  return (
    <section id="iv-builder" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.ivBuilder.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.ivBuilder.subtitle}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Menu */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Base Selection */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                  1
                </span>
                {t.ivBuilder.step1}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {loading ? (
                  <>
                    <TreatmentSkeleton />
                    <TreatmentSkeleton />
                    <TreatmentSkeleton />
                  </>
                ) : (
                  treatments.map(treatment => (
                    <TreatmentCard
                      key={treatment.id}
                      treatment={treatment}
                      isSelected={selectedBase?.id === treatment.id}
                      onSelect={selectBase}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Step 2: Boosters */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                  2
                </span>
                {t.ivBuilder.step2}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {loading ? (
                  <>
                    <AddonSkeleton />
                    <AddonSkeleton />
                    <AddonSkeleton />
                  </>
                ) : (
                  addons.map(addon => (
                    <AddonCard
                      key={addon.id}
                      addon={addon}
                      isSelected={isAddonSelected(addon.id)}
                      onToggle={toggleAddon}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BuilderSummary
                selectedBase={selectedBase}
                selectedAddons={selectedAddons}
                totalPrice={totalPrice}
                onReset={resetBuilder}
                onBook={handleBook}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVBuilderSection;
