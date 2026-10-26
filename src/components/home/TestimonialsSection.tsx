import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS, TESTIMONIALS_INTRO } from "@/content/home";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Stars } from "@/components/ui/Icons";
import { usePrefersReducedMotion, useScrollParallaxX } from "@/hooks/useMotion";
import { cn } from "@/lib/utils";

/**
 * "O que dizem os NOSSOS CLIENTES" — carrossel igual ao original:
 * 3 por vez (2 no tablet, 1 no celular), troca sozinho a cada 5s, velocidade 500ms,
 * em loop, pausa ao passar o mouse, setas + bolinhas, e o carrossel inteiro
 * desliza alguns pixels para o lado conforme a página rola.
 */
export function TestimonialsSection() {
  const reduced = usePrefersReducedMotion();
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", duration: 24 },
    reduced ? [] : [autoplay.current],
  );
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const parallaxRef = useRef<HTMLDivElement>(null);
  useScrollParallaxX(parallaxRef, 4);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onReInit = () => {
      setSnaps(emblaApi.scrollSnapList());
      onSelect();
    };
    onReInit();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onReInit);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onReInit);
    };
  }, [emblaApi, onSelect]);

  return (
    <>
      <section className="lba-clients-intro">
        <div className="lba-container">
          <SectionTitle
            as="h2"
            align="center"
            subtitle={TESTIMONIALS_INTRO.subtitle}
            title={TESTIMONIALS_INTRO.title}
            subtitleColor="var(--lba-royal)"
            titleColor="var(--lba-navy)"
            className="[&_h2]:!text-[57px] max-md:[&_h2]:!text-[36px]"
          />
        </div>
      </section>

      <section className="lba-testimonials" aria-roledescription="carrossel" aria-label="Depoimentos de clientes">
        <div ref={parallaxRef} className="lba-testimonials__track">
          <button
            type="button"
            className="lba-testimonials__arrow lba-testimonials__arrow--prev"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Depoimento anterior"
          >
            <ChevronLeft size={30} strokeWidth={1.2} />
          </button>

          <div className="lba-testimonials__viewport" ref={emblaRef}>
            <div className="lba-testimonials__container">
              {TESTIMONIALS.map((t) => (
                <div className="lba-testimonials__slide" key={t.name}>
                  <figure className="lba-testi">
                    <div className="lba-testi__stars">
                      <Stars count={t.stars} size={24} />
                    </div>
                    <blockquote className="lba-testi__text">{t.text}</blockquote>
                    <figcaption className="lba-testi__name">{t.name}</figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="lba-testimonials__arrow lba-testimonials__arrow--next"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Próximo depoimento"
          >
            <ChevronRight size={30} strokeWidth={1.2} />
          </button>
        </div>

        <div className="lba-testimonials__dots">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              className={cn("lba-testimonials__dot", i === selected && "is-active")}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Ir para o depoimento ${i + 1}`}
              aria-current={i === selected}
            />
          ))}
        </div>
      </section>
    </>
  );
}
