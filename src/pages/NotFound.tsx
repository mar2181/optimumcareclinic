import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();
  const { lang } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const content = {
    en: {
      title: "Page Not Found",
      message: "Oops! The page you're looking for doesn't exist or has been moved.",
      backHome: "Back to Home",
      seoTitle: "Page Not Found | Optimum Care Pharr",
    },
    es: {
      title: "Página No Encontrada",
      message: "¡Ups! La página que buscas no existe o ha sido movida.",
      backHome: "Volver al Inicio",
      seoTitle: "Página No Encontrada | Optimum Care Pharr",
    },
  };

  const t = content[lang];

  return (
    <>
      <SEOHead
        title={t.seoTitle}
        titleEs={content.es.seoTitle}
        description="The requested page could not be found."
        descriptionEs="La página solicitada no pudo ser encontrada."
      />
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          {/* 404 Number */}
          <div className="mb-8">
            <span className="text-9xl font-bold bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent">
              404
            </span>
          </div>

          {/* Message */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {t.title}
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {t.message}
          </p>

          {/* CTA Button */}
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-navy-light text-primary-foreground gap-2 rounded-xl font-semibold"
          >
            <Link to="/">
              <Home className="w-5 h-5" />
              {t.backHome}
            </Link>
          </Button>

          {/* Decorative elements */}
          <div className="mt-12 flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary/30" />
            <div className="w-2 h-2 rounded-full bg-accent/50" />
            <div className="w-2 h-2 rounded-full bg-primary/30" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
