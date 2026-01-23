import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { CheckCircle, ClipboardList, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import SEOHead from '@/components/SEOHead';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const checkInSchema = z.object({
  fullName: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must be less than 100 characters" }),
  phoneNumber: z.string().trim().min(10, { message: "Please enter a valid phone number" }).max(20, { message: "Phone number too long" }),
  symptomCategory: z.string().min(1, { message: "Please select a symptom category" }),
  cashPayAcknowledge: z.boolean().refine((val) => val === true, { message: "You must acknowledge this is a cash-pay clinic" }),
});

type CheckInFormData = z.infer<typeof checkInSchema>;

const CheckIn = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckInFormData>({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      symptomCategory: '',
      cashPayAcknowledge: false,
    },
  });

  const symptomOptions = [
    { value: 'sick_visit', label: t.checkIn.symptoms.sickVisit },
    { value: 'chronic_care', label: t.checkIn.symptoms.chronicCare },
    { value: 'preventive', label: t.checkIn.symptoms.preventive },
    { value: 'employment_testing', label: t.checkIn.symptoms.employmentTesting },
    { value: 'procedure', label: t.checkIn.symptoms.procedure },
    { value: 'iv_wellness', label: t.checkIn.symptoms.ivWellness },
  ];

  const onSubmit = async (data: CheckInFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('patient_queue').insert({
        full_name: data.fullName,
        phone_number: data.phoneNumber,
        symptom_category: data.symptomCategory,
        language_pref: lang,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success(t.checkIn.successToast);
    } catch (error) {
      console.error('Check-in error:', error);
      toast.error(t.checkIn.errorToast);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-background flex items-center justify-center p-6"
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl shadow-xl border border-border p-8 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              {t.checkIn.successTitle}
            </h1>
            <p className="text-muted-foreground mb-6">
              {t.checkIn.successMessage}
            </p>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.checkIn.backHome}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <SEOHead
        title="Online Check-In | Optimum Care Pharr"
        titleEs="Registro en Línea | Optimum Care Pharr"
        description="Skip the wait with online check-in at Optimum Care Pharr. Fast, convenient digital registration for after-hours family medicine."
        descriptionEs="Evita la espera con el registro en línea en Optimum Care Pharr. Registro digital rápido y conveniente para medicina familiar nocturna."
      />
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-primary-foreground hover:bg-primary-foreground/10 gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.checkIn.backHome}
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{t.checkIn.title}</h1>
              <p className="text-primary-foreground/80 text-sm">{t.checkIn.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-md mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      {t.checkIn.nameLabel}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.checkIn.namePlaceholder}
                        className="h-12 text-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      {t.checkIn.phoneLabel}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder={t.checkIn.phonePlaceholder}
                        className="h-12 text-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Symptom Category */}
              <FormField
                control={form.control}
                name="symptomCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      {t.checkIn.symptomLabel}
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-lg">
                          <SelectValue placeholder={t.checkIn.symptomPlaceholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {symptomOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-lg py-3">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cash Pay Acknowledgment */}
              <FormField
                control={form.control}
                name="cashPayAcknowledge"
                render={({ field }) => (
                  <FormItem className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                    <div className="flex items-start gap-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 border-accent data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                        />
                      </FormControl>
                      <FormLabel className="text-sm text-foreground leading-relaxed font-normal cursor-pointer">
                        {t.checkIn.cashPayLabel}
                      </FormLabel>
                    </div>
                    <FormMessage className="mt-2" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-semibold bg-accent hover:bg-gold-light text-accent-foreground rounded-xl shadow-lg"
              >
                {isSubmitting ? t.checkIn.submitting : t.checkIn.submitButton}
              </Button>
            </form>
          </Form>

          {/* Privacy Note */}
          <p className="text-xs text-muted-foreground text-center mt-6">
            {t.checkIn.privacyNote}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckIn;
