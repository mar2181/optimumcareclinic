import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Clock, Save, Loader2 } from 'lucide-react';

const waitTimeOptions = [5, 10, 15, 20, 30, 45, 60];

const WaitTimeControl = () => {
  const [currentWait, setCurrentWait] = useState<number>(15);
  const [selectedWait, setSelectedWait] = useState<number>(15);
  const [isSaving, setIsSaving] = useState(false);
  const [statusId, setStatusId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCurrentWaitTime();
  }, []);

  const fetchCurrentWaitTime = async () => {
    const { data, error } = await supabase
      .from('clinic_status')
      .select('*')
      .limit(1)
      .single();

    if (!error && data) {
      setCurrentWait(data.estimated_wait_minutes);
      setSelectedWait(data.estimated_wait_minutes);
      setStatusId(data.id);
    }
  };

  const handleSave = async () => {
    if (!statusId) return;
    
    setIsSaving(true);

    const { error } = await supabase
      .from('clinic_status')
      .update({ 
        estimated_wait_minutes: selectedWait,
        updated_at: new Date().toISOString()
      })
      .eq('id', statusId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update wait time. Please try again.',
        variant: 'destructive',
      });
      setIsSaving(false);
      return;
    }

    setCurrentWait(selectedWait);
    toast({
      title: 'Wait Time Updated',
      description: `Estimated wait time is now ${selectedWait} minutes.`,
    });
    setIsSaving(false);
  };

  const hasChanged = currentWait !== selectedWait;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="w-5 h-5 text-accent" />
          Estimated Wait Time
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-4xl font-bold text-primary">{currentWait}</span>
          <span className="text-muted-foreground">minutes</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {waitTimeOptions.map((time) => (
            <Button
              key={time}
              variant={selectedWait === time ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedWait(time)}
              className="min-w-[3rem]"
            >
              {time}m
            </Button>
          ))}
        </div>

        {hasChanged && (
          <Button onClick={handleSave} disabled={isSaving} className="w-full">
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Update Wait Time
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default WaitTimeControl;
