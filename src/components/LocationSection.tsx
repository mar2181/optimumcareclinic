import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LocationSection = () => {
  const { lang } = useLanguage();

  const content = {
    en: {
      title: "Visit Our Clinic",
      subtitle: "Conveniently located in Pharr, Texas",
      getDirections: "Get Directions",
      callUs: "Call Us",
      hours: "Hours of Operation",
      hoursDetail: {
        weekdays: "Monday - Friday: 7am - 5pm",
        saturday: "Saturday: 8am - 12pm",
        sunday: "Sunday: Closed",
      },
    },
    es: {
      title: "Visítenos",
      subtitle: "Ubicados convenientemente en Pharr, Texas",
      getDirections: "Cómo Llegar",
      callUs: "Llámenos",
      hours: "Horario de Atención",
      hoursDetail: {
        weekdays: "Lunes - Viernes: 7am - 5pm",
        saturday: "Sábado: 8am - 12pm",
        sunday: "Domingo: Cerrado",
      },
    },
  };

  const t = content[lang];
  const address = "1106 W Sam Houston Blvd, Pharr, TX 78577";
  const phone = "(956) 467-4226";
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  const mapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3585.7!2d-98.1847!3d26.1947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDExJzQxLjAiTiA5OMKwMTEnMDQuOSJX!5e0!3m2!1sen!2sus!4v1234567890";

  return (
    <section id="location" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
            <iframe
              src={mapsEmbedUrl}
              className="w-full h-64 lg:h-full min-h-[300px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Optimum Care Pharr Location"
            />
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-6 justify-center">
            {/* Address */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-accent transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">{address}</p>
                <span className="text-sm text-accent font-medium">{t.getDirections} →</span>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+19564674226"
              className="group flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">{phone}</p>
                <span className="text-sm text-primary font-medium">{t.callUs} →</span>
              </div>
            </a>

            {/* Hours */}
            <div className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">{t.hours}</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>{t.hoursDetail.weekdays}</p>
                  <p>{t.hoursDetail.saturday}</p>
                  <p>{t.hoursDetail.sunday}</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-gold-light text-accent-foreground font-semibold gap-2 rounded-xl flex-1"
              >
                <a href="tel:+19564674226">
                  <Phone className="w-5 h-5" />
                  {t.callUs}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary text-foreground hover:bg-primary hover:text-primary-foreground font-semibold rounded-xl flex-1"
              >
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin className="w-5 h-5" />
                  {t.getDirections}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
