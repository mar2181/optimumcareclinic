import { Droplets, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IVTreatment, IVAddon } from '@/hooks/useIVBuilder';
import { useLanguage } from '@/contexts/LanguageContext';

interface BuilderSummaryProps {
  selectedBase: IVTreatment | null;
  selectedAddons: IVAddon[];
  totalPrice: number;
  onReset: () => void;
  onBook: () => void;
}

const BuilderSummary = ({ 
  selectedBase, 
  selectedAddons, 
  totalPrice, 
  onReset,
  onBook 
}: BuilderSummaryProps) => {
  const { t } = useLanguage();
  
  const hasSelection = selectedBase !== null;

  return (
    <Card className="shadow-lg rounded-xl border-0 glass-card">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
            <Droplets className="h-5 w-5 text-accent" />
          </div>
          <CardTitle className="text-xl">{t.ivBuilder.summary.title}</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!hasSelection ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">{t.ivBuilder.summary.empty}</p>
          </div>
        ) : (
          <>
            {/* Base Treatment */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {t.ivBuilder.summary.base}
              </p>
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">{selectedBase.name}</span>
                <span className="font-semibold text-foreground">${selectedBase.base_price}</span>
              </div>
            </div>

            {/* Add-ons */}
            {selectedAddons.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  {t.ivBuilder.summary.addons}
                </p>
                {selectedAddons.map(addon => (
                  <div key={addon.id} className="flex justify-between items-center">
                    <span className="text-foreground">{addon.name}</span>
                    <span className="text-foreground">+${addon.price}</span>
                  </div>
                ))}
              </div>
            )}

            <Separator />

            {/* Total */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-semibold text-foreground">{t.ivBuilder.summary.total}</span>
              <span className="text-3xl font-bold text-accent">${totalPrice}</span>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <Button 
                onClick={onBook}
                className="w-full h-12 text-lg font-semibold bg-accent hover:bg-gold-light text-accent-foreground"
                disabled={!hasSelection}
              >
                {t.ivBuilder.summary.book}
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={onReset}
                className="w-full text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {t.ivBuilder.summary.reset}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BuilderSummary;
