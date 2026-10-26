import { Mail, MapPin, Smartphone } from "lucide-react";
import { CONTACT } from "@/content/home";
import { SITE } from "@/config/site";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactForm } from "@/components/home/ContactForm";

/** Linha divisória entre Serviços e Contato (os cards de serviço "entram" nela) */
export function DividerSection() {
  return (
    <div className="lba-divider" aria-hidden="true">
      <div className="lba-container">
        <div className="lba-divider__line" />
      </div>
    </div>
  );
}

/** Seção "Contato — Alguma dúvida? Fale conosco!" (âncora #Contato) */
export function ContactSection() {
  return (
    <section id="Contato" className="lba-contact">
      <div className="lba-container">
        <div className="lba-contact__grid">
          <div>
            <SectionTitle
              as="h1"
              subtitle={CONTACT.subtitle}
              title={CONTACT.title}
              subtitleColor="var(--lba-link)"
            />
            <p className="mt-6 max-w-[520px]">{CONTACT.text}</p>
            <ul className="lba-contact__info">
              <li>
                <MapPin size={18} strokeWidth={1.4} />
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="lba-underline-hover">
                  {SITE.address}
                </a>
              </li>
              <li>
                <Smartphone size={18} strokeWidth={1.4} />
                <a href={`tel:${SITE.phone.tel}`} className="lba-contact__phone">
                  {SITE.phone.display}
                </a>
              </li>
              <li>
                <Mail size={18} strokeWidth={1.4} />
                <a href={`mailto:${SITE.email}`} className="lba-underline-hover break-all">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:pt-[6px]">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
