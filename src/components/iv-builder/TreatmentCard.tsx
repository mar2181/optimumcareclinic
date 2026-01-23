import { Check, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IVTreatment } from '@/hooks/useIVBuilder';
import { Badge } from '@/components/ui/badge';

interface TreatmentCardProps {
  treatment: IVTreatment;
  isSelected: boolean;
  onSelect: (treatment: IVTreatment) => void;
}

const TreatmentCard = ({ treatment, isSelected, onSelect }: TreatmentCardProps) => {
  return (
    <button
      onClick={() => onSelect(treatment)}
      className={cn(
        "w-full text-left p-6 rounded-xl transition-all duration-200 glass-card glass-card-hover",
        "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background",
        isSelected && "ring-2 ring-accent shadow-lg"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-foreground">{treatment.name}</h3>
            {isSelected && (
              <Badge className="bg-accent text-accent-foreground">
                Selected
              </Badge>
            )}
          </div>
          
          <p className="text-3xl font-bold text-accent mb-3">
            ${treatment.base_price}
          </p>
          
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
            {treatment.description}
          </p>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Clock className="h-4 w-4" />
            <span>{treatment.duration_min} minutes</span>
          </div>
          
          <ul className="space-y-2">
            {treatment.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </button>
  );
};

export default TreatmentCard;
