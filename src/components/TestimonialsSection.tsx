import { useEffect, useState, useCallback } from 'react';
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
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
      className="glass-card border-glow card-shine p-8 shadow-xl relative"
    >
      {/* Quote Icon with glow */}
      <div className="absolute -top-4 left-8">
        <motion.div 
          className="h-12 w-12 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/30"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Quote className="h-6 w-6 text-accent-foreground" />
        </motion.div>
      </div>

      {/* Stars with staggered animation */}
      <div className="flex gap-1 mb-4 pt-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            <Star className="h-5 w-5 fill-accent text-accent" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <blockquote className="text-lg text-foreground leading-relaxed mb-6">
        "{content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-accent/30">
          {testimonial.avatar_url ? (
            <img 
              src={testimonial.avatar_url} 
              alt={`${testimonial.name} - patient testimonial from ${testimonial.role}`}
              width={56}
              height={56}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-accent font-bold text-xl">
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
  <div className="glass-card p-8 shadow-lg">
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-5 w-5 rounded" />
      ))}
    </div>
    <Skeleton className="h-24 w-full mb-6" />
    <div className="flex items-center gap-4">
      <Skeleton className="h-14 w-14 rounded-full" />
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
  const [isPaused, setIsPaused] = useState(false);

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

  // Auto-play carousel
  useEffect(() => {
    if (testimonials.length <= 1 || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, isPaused]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  }, [testimonials.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  }, [testimonials.length]);

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />
      
      {/* Decorative quote marks */}
      <div className="absolute top-20 left-10 text-gold/5 pointer-events-none hidden lg:block">
        <Quote className="w-32 h-32" />
      </div>
      <div className="absolute bottom-20 right-10 text-gold/5 pointer-events-none hidden lg:block rotate-180">
        <Quote className="w-32 h-32" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 title-underline">
            {t.testimonials.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        {/* Carousel */}
        <div 
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
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
                    className="rounded-full border-2 glow-button hover:border-accent/50 transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  {/* Progress dots */}
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex 
                            ? 'w-8 bg-accent shadow-lg shadow-accent/30' 
                            : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNext}
                    className="rounded-full border-2 glow-button hover:border-accent/50 transition-all"
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
