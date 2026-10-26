import { CTA } from "@/content/home";
import { IMAGES, whatsappLink } from "@/config/site";
import { bgImage } from "@/components/ui/SmartImage";

/** Faixa escura "Descubra como maximizar suas chances de vencer licitações" + botão Fale conosco */
export function CtaSection() {
  return (
    <section className="lba-cta" style={bgImage(IMAGES.ctaBg, "linear-gradient(110deg,#1d2333,#2b2f3a)")}>
      <div className="lba-container">
        <div className="lba-cta__grid">
          <h2 className="lba-h2 lba-cta__title">{CTA.title}</h2>
          <div className="lba-cta__action">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="lba-btn lba-btn--slate">
              {CTA.button}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
