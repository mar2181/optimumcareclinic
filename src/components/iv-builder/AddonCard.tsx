import { Plus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IVAddon } from '@/hooks/useIVBuilder';
import { Badge } from '@/components/ui/badge';

interface AddonCardProps {
  addon: IVAddon;
  isSelected: boolean;
  onToggle: (addon: IVAddon) => void;
}

const AddonCard = ({ addon, isSelected, onToggle }: AddonCardProps) => {
  return (
    <button
      onClick={() => onToggle(addon)}
      className={cn(
        "w-full text-left p-4 rounded-xl transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isSelected 
          ? "bg-primary/10 border-2 border-primary shadow-md" 
          : "bg-card border-2 border-transparent shadow-sm hover:shadow-md"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-foreground">{addon.name}</h4>
            <Badge variant="secondary" className="text-xs">
              {addon.category}
            </Badge>
          </div>
          <p className="text-lg font-bold text-primary">+${addon.price}</p>
        </div>
        
        <div className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center transition-colors",
          isSelected 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted text-muted-foreground"
        )}>
          {isSelected ? (
            <Check className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </div>
      </div>
    </button>
  );
};

export default AddonCard;
