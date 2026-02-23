

## Align Website to Official Flyer

Based on the flyer image, here is everything that needs to change to match the official clinic information exactly.

### What the Flyer Says (Source of Truth)

- **Name**: Optimum Health & Wellness Clinic / "Cash Night Clinic"
- **Address**: 3912 N Jackson Rd, Pharr, TX 78577
- **Phone**: (956) 627-3258
- **Hours**: Open Monday to Sunday, 5PM to 10PM
- **Services** (exactly 8): Medical Consultation, Sick Visit, Medication Refills, Rapid Testing (Flu/Covid/Strep), Urinalysis, Injections, Procedures (ear lavage/wound care), Chronic Condition Management (diabetes, hypertension)
- **Payment**: Private Pay Only. No Insurances.

---

### Changes Needed (File by File)

#### 1. LocationSection.tsx -- FIX WRONG HOURS
The location section currently shows **"Mon-Fri: 7am-5pm, Sat: 8am-12pm, Sun: Closed"** which is completely wrong. Will update to Mon-Sun: 5pm-10pm to match the flyer.

#### 2. CheckIn.tsx -- FIX WRONG CLINIC NAME IN SEO
The check-in page SEO title says **"Optimum Care Pharr"** instead of "Optimum Health & Wellness Clinic". Will correct this.

#### 3. Remove IV Therapy Section from Index.tsx
The IV Builder section is **not on the flyer**. Will remove `<IVBuilderSection />` and its divider from the homepage.

#### 4. translations.ts -- Remove Non-Flyer Services from Check-In
The check-in symptom options include **"Preventive (physical, vaccines)"**, **"Employment (drug test, DOT physical)"**, and **"IV Therapy / Wellness"** which are not on the flyer. Will remove these and replace with the 8 flyer services as check-in options.

#### 5. Hero.tsx -- Remove "Preventive Services" Mention
The hero subhead mentions "preventive services" which is not a listed flyer service. Will adjust the wording to reference only the services on the flyer.

#### 6. AboutUs.tsx -- Remove "Immunizations" Mention
The About Us page mentions "immunizations" which is not on the flyer. Will update to reference only flyer-approved services.

#### 7. Footer SEO Keywords
The footer SEO keywords mention "Pediatric Care" -- will update to match only flyer services.

---

### What Is Already Correct (No Changes Needed)
- Clinic name in Navbar, Footer copyright, and SEO defaults
- Phone number (956) 627-3258 and tel: links everywhere
- Address 3912 N Jackson Rd, Pharr, TX 78577
- Footer hours in translations.ts (already Mon-Sun 5pm-10pm)
- The 8 services in ServiceGrid and PricingTable
- "Private pay only. No insurances." disclaimer

---

### Technical Summary

| File | Change |
|------|--------|
| `src/components/LocationSection.tsx` | Fix hours from 7am-5pm to Mon-Sun 5pm-10pm |
| `src/pages/CheckIn.tsx` | Fix SEO title from "Optimum Care Pharr" to "Optimum Health & Wellness Clinic" |
| `src/pages/Index.tsx` | Remove IVBuilderSection import and usage |
| `src/lib/translations.ts` | Remove non-flyer symptom options (preventive, employment_testing, iv_wellness); align check-in reasons to the 8 flyer services |
| `src/components/Hero.tsx` | Remove "preventive services" from subhead copy |
| `src/pages/AboutUs.tsx` | Remove "immunizations" reference |
| `src/components/Footer.tsx` | Update SEO keywords to remove "Pediatric Care" |

