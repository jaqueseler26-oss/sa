import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_SLIDES, HERO_TIMING } from "@/content/home";
import { bgImage } from "@/components/ui/SmartImage";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/**
 * BANNER PRINCIPAL — réplica do Slider Revolution do site original.
 *
 * - 3 slides em tela cheia, troca a cada 9s com transição de esmaecer (1s)
 * - Em cada slide: linha 1 entra deslizando da direita (1,37s), linha 2 (1,60s)
 *   e o "selo" creme é revelado da esquerda para a direita (2,19s)
 * - O selo tem a ponta direita inclinada e, ao clicar, rola suavemente até "Quem Somos"
 * - No celular dá para trocar de slide arrastando para os lados
 */
export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const timer = useRef<number>();
  const touchX = useRef<number | null>(null);
  const total = HERO_SLIDES.length;

  const goTo = useCallback(
    (next: number) => {
      setActive((current) => {
        const target = (next + total) % total;
        if (target === current) return current;
        setLeaving(current);
        return target;
      });
    },
    [total],
  );

  // troca automática (pausa quando a aba não está visível)
  useEffect(() => {
    const schedule = () => {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        if (document.visibilityState === "visible") goTo(active + 1);
        else schedule();
      }, HERO_TIMING.slideDuration);
    };
    schedule();
    return () => window.clearTimeout(timer.current);
  }, [active, goTo]);

  // remove o estado "saindo" depois do esmaecer
  useEffect(() => {
    if (leaving === null) return;
    const t = window.setTimeout(() => setLeaving(null), HERO_TIMING.crossfade + 50);
    return () => window.clearTimeout(t);
  }, [leaving]);

  // pré-carrega as próximas imagens
  useEffect(() => {
    HERO_SLIDES.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) goTo(active + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  return (
    <section
      id="home"
      className="lba-hero"
      aria-roledescription="carrossel"
      aria-label="Destaques da LBA Assessoria Jurídica"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {HERO_SLIDES.map((slide, i) => {
        const isActive = i === active;
        const isLeaving = i === leaving;
        return (
          <div
            key={i}
            className={cn("lba-hero__slide", isActive && "is-active", isLeaving && "is-leaving")}
            style={bgImage(slide.image)}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${total}`}
            aria-hidden={!isActive}
          >
            <div className="lba-hero__row">
              <div className="lba-hero__col-left">
                <div className="lba-hero__badge-mask">
                  <button
                    type="button"
                    tabIndex={isActive ? 0 : -1}
                    className={cn("lba-hero__badge", slide.tone === "royal" && "is-royal")}
                    onClick={() => scrollToId("QuemSomos", 1000)}
                    aria-label="Conheça a nossa equipe"
                  >
                    {slide.badge.smallLine && <small>{slide.badge.smallLine}</small>}
                    {slide.badge.mainLine &&
                      slide.badge.mainLine.split("\n").map((line, k) => (
                        <span key={k} className="block">
                          {line}
                        </span>
                      ))}
                  </button>
                </div>
              </div>
              <div className="lba-hero__col-right">
                <p className="lba-hero__line lba-hero__line--1">{slide.lines[0]}</p>
                <p className="lba-hero__line lba-hero__line--2">{slide.lines[1]}</p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
