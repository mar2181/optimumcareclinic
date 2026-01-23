import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, Phone, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PatientCardProps {
  id: string;
  fullName: string;
  phoneNumber: string;
  symptomCategory: string;
  createdAt: string;
  languagePref: string;
  onMarkedSeen: (id: string) => void;
}

const symptomColors: Record<string, { bg: string; text: string }> = {
  'flu_cold': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'pain_injury': { bg: 'bg-red-100', text: 'text-red-800' },
  'wellness_iv': { bg: 'bg-green-100', text: 'text-green-800' },
  'pediatric': { bg: 'bg-blue-100', text: 'text-blue-800' },
};

const symptomLabels: Record<string, string> = {
  'flu_cold': 'Flu / Cold',
  'pain_injury': 'Pain / Injury',
  'wellness_iv': 'Wellness / IV',
  'pediatric': 'Pediatric',
};

const PatientCard = ({
  id,
  fullName,
  phoneNumber,
  symptomCategory,
  createdAt,
  languagePref,
  onMarkedSeen,
}: PatientCardProps) => {
  const [isMarking, setIsMarking] = useState(false);
  const { toast } = useToast();

  const colors = symptomColors[symptomCategory] || { bg: 'bg-muted', text: 'text-muted-foreground' };
  const label = symptomLabels[symptomCategory] || symptomCategory;
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: false });

  const handleMarkSeen = async () => {
    setIsMarking(true);
    
    // Optimistic UI update
    onMarkedSeen(id);
    
    const { error } = await supabase
      .from('patient_queue')
      .update({ is_seen: true })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to mark patient as seen. Please try again.',
        variant: 'destructive',
      });
      setIsMarking(false);
      return;
    }

    toast({
      title: 'Patient Completed',
      description: `${fullName} has been marked as seen.`,
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold text-foreground">{fullName}</span>
              <Badge variant="outline" className="text-xs">
                {languagePref.toUpperCase()}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {phoneNumber}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {timeAgo} ago
              </span>
            </div>

            <Badge className={`${colors.bg} ${colors.text} border-0`}>
              {label}
            </Badge>
          </div>

          <Button
            onClick={handleMarkSeen}
            disabled={isMarking}
            variant="outline"
            className="border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
          >
            <Check className="w-4 h-4 mr-1" />
            Complete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
