import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Clock } from 'lucide-react';

const WaitTimeDisplay = () => {
  const [waitTime, setWaitTime] = useState<number | null>(null);

  useEffect(() => {
    fetchWaitTime();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('clinic_status_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'clinic_status',
        },
        (payload) => {
          const updated = payload.new as { estimated_wait_minutes: number };
          setWaitTime(updated.estimated_wait_minutes);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchWaitTime = async () => {
    const { data, error } = await supabase
      .from('clinic_status')
      .select('estimated_wait_minutes')
      .limit(1)
      .single();

    if (!error && data) {
      setWaitTime(data.estimated_wait_minutes);
    }
  };

  if (waitTime === null) return null;

  return (
    <div className="flex items-center gap-1.5 text-sm font-medium">
      <Clock className="w-4 h-4 text-accent" />
      <span className="text-foreground">
        Wait: <span className="text-accent font-bold">{waitTime}m</span>
      </span>
    </div>
  );
};

export default WaitTimeDisplay;
