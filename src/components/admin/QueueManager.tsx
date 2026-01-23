import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PatientCard from './PatientCard';

interface Patient {
  id: string;
  full_name: string;
  phone_number: string;
  symptom_category: string;
  created_at: string;
  language_pref: string;
  is_seen: boolean;
}

const QueueManager = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('patient_queue_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'patient_queue',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newPatient = payload.new as Patient;
            if (!newPatient.is_seen) {
              setPatients((prev) => [newPatient, ...prev]);
            }
          } else if (payload.eventType === 'UPDATE') {
            const updated = payload.new as Patient;
            if (updated.is_seen) {
              setPatients((prev) => prev.filter((p) => p.id !== updated.id));
            }
          } else if (payload.eventType === 'DELETE') {
            const deleted = payload.old as Patient;
            setPatients((prev) => prev.filter((p) => p.id !== deleted.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('patient_queue')
      .select('*')
      .eq('is_seen', false)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setPatients(data);
    }
    setLoading(false);
  };

  const handlePatientMarkedSeen = (id: string) => {
    // Optimistic removal
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="w-5 h-5 text-accent" />
          Patient Queue
          <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-sm rounded-full">
            {patients.length}
          </span>
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={fetchPatients} disabled={loading}>
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : patients.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No patients waiting</p>
            <p className="text-sm">New check-ins will appear here automatically</p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="space-y-3 pr-4">
              {patients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  id={patient.id}
                  fullName={patient.full_name}
                  phoneNumber={patient.phone_number}
                  symptomCategory={patient.symptom_category}
                  createdAt={patient.created_at}
                  languagePref={patient.language_pref}
                  onMarkedSeen={handlePatientMarkedSeen}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default QueueManager;
