export const translations = {
  en: {
    // Navbar
    nav: {
      services: "Services",
      pricing: "Pricing",
      callNow: "Call Now",
    },
    // Hero
    hero: {
      headline: "Affordable Urgent Care. No Insurance Needed.",
      subhead: "Walk-ins welcome. High-quality medical care & wellness for the whole family.",
      viewPrices: "View Prices",
      ourServices: "Our Services",
    },
    // Footer
    footer: {
      contactUs: "Contact Us",
      address: "123 N Cage Blvd, Pharr, TX 78577",
      quickLinks: "Quick Links",
      home: "Home",
      about: "About Us",
      hours: "Hours",
      hoursDetail: {
        weekdays: "Mon - Fri: 8am - 8pm",
        saturday: "Saturday: 9am - 5pm",
        sunday: "Sunday: 10am - 4pm",
      },
      rights: "All rights reserved.",
    },
  },
  es: {
    // Navbar
    nav: {
      services: "Servicios",
      pricing: "Precios",
      callNow: "Llámenos",
    },
    // Hero
    hero: {
      headline: "Atención Médica Económica. Sin Seguro.",
      subhead: "Bienvenidos sin cita. Atención médica de alta calidad para toda la familia.",
      viewPrices: "Ver Precios",
      ourServices: "Nuestros Servicios",
    },
    // Footer
    footer: {
      contactUs: "Contáctenos",
      address: "123 N Cage Blvd, Pharr, TX 78577",
      quickLinks: "Enlaces Rápidos",
      home: "Inicio",
      about: "Nosotros",
      hours: "Horario",
      hoursDetail: {
        weekdays: "Lun - Vie: 8am - 8pm",
        saturday: "Sábado: 9am - 5pm",
        sunday: "Domingo: 10am - 4pm",
      },
      rights: "Todos los derechos reservados.",
    },
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKeys = (typeof translations)[Language];
