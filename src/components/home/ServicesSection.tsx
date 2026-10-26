import { IMAGES } from "@/config/site";
import { SERVICES, SERVICES_INTRO } from "@/content/home";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { bgImage } from "@/components/ui/SmartImage";
import { LongArrow, ServiceIcon } from "@/components/ui/Icons";
import { SmartLink } from "@/components/layout/SmartLink";
import { cn } from "@/lib/utils";

/**
 * Seção "Um pouco dos NOSSOS SERVIÇOS" (âncora #Servicos).
 * Três cards (azul, azul-escuro e branco) que sobem 8px no hover
 * e "transbordam" para a seção seguinte, como no original.
 */
export function ServicesSection() {
  return (
    <section
      id="Servicos"
      className="lba-services"
      style={bgImage(IMAGES.servicesBg, "linear-gradient(#f9f9f9,#f9f9f9)")}
    >
      <div className="lba-container">
        <div className="lba-services__intro">
          <SectionTitle
            subtitle={SERVICES_INTRO.subtitle}
            title={SERVICES_INTRO.title}
            subtitleColor="var(--lba-soft)"
            titleColor="var(--lba-navy)"
          />
          <p className="mt-5" style={{ color: "var(--lba-royal-2)" }}>
            {SERVICES_INTRO.text}
          </p>
        </div>

        <div className="lba-services__grid">
          {SERVICES.map((s, i) => (
            <article key={s.title} className={cn("lba-service", `lba-service--${i + 1}`)}>
              <ServiceIcon name={s.icon} className="lba-service__icon" />
              <h4 className="lba-service__title">{s.title}</h4>
              <p className="lba-service__desc">{s.description}</p>
              <span className="lba-service__more" aria-hidden="true">
                <LongArrow width={20} />
              </span>
              <SmartLink href={s.href} className="lba-service__link" aria-label={`Saiba mais sobre ${s.title}`} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
