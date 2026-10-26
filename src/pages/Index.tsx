import { HeroSlider } from "@/components/home/HeroSlider";
import { TeamSection } from "@/components/home/TeamSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ContactSection, DividerSection } from "@/components/home/ContactSection";
import { CtaSection } from "@/components/home/CtaSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { useDocumentTitle } from "@/hooks/useMotion";
import { SITE } from "@/config/site";

/** PÁGINA INICIAL — mesma ordem de seções do site original */
export default function Index() {
  useDocumentTitle(SITE.title);
  return (
    <>
      <HeroSlider />
      <TeamSection />
      <ServicesSection />
      <DividerSection />
      <ContactSection />
      <CtaSection />
      <TestimonialsSection />
    </>
  );
}
