import { useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content_en: string;
  content_es: string;
  rating: number;
  avatar_url: string | null;
}

const TestimonialCard = ({ testimonial, lang }: { testimonial: Testimonial; lang: 'en' | 'es' }) => {
  const content = lang === 'es' ? testimonial.content_es : testimonial.content_en;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-card/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/50 relative"
    >
      {/* Quote Icon */}
      <div className="absolute -top-4 left-8">
        <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center shadow-md">
          <Quote className="h-5 w-5 text-accent-foreground" />
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4 pt-2">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-accent text-accent" />
        ))}
      </div>

      {/* Content */}
      <blockquote className="text-lg text-foreground leading-relaxed mb-6">
        "{content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
          {testimonial.avatar_url ? (
            <img 
              src={testimonial.avatar_url} 
              alt={`${testimonial.name} - patient testimonial from ${testimonial.role}`}
              width={48}
              height={48}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-primary font-bold text-lg">
              {testimonial.name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <p className="font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialSkeleton = () => (
  <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/50">
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-5 w-5 rounded" />
      ))}
    </div>
    <Skeleton className="h-24 w-full mb-6" />
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div>
        <Skeleton className="h-5 w-24 mb-1" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const { lang, t } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && !error) {
        setTestimonials(data);
      }
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          {loading ? (
            <TestimonialSkeleton />
          ) : testimonials.length > 0 ? (
            <>
              <AnimatePresence mode="wait">
                <TestimonialCard 
                  key={testimonials[currentIndex].id}
                  testimonial={testimonials[currentIndex]} 
                  lang={lang} 
                />
              </AnimatePresence>

              {/* Navigation */}
              {testimonials.length > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPrevious}
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  {/* Dots */}
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentIndex 
                            ? 'w-6 bg-primary' 
                            : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNext}
                    className="rounded-full"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-muted-foreground">{t.testimonials.noReviews}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
