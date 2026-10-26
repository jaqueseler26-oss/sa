/**
 * Hooks de animação usados no site.
 * Todas as animações respeitam a preferência "reduzir movimento" do sistema do visitante.
 */
import { useEffect, useRef, useState, type RefObject } from "react";

/** true quando o visitante pediu menos animação no sistema operacional */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

/** Detecta quando um elemento entra na tela (para disparar animações uma única vez) */
export function useInView<T extends Element>(options: IntersectionObserverInit = { threshold: 0.25 }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  return { ref, inView };
}

/** Rolagem vertical maior que um limite (usado no botão "voltar ao topo") */
export function useScrolledPast(limit = 400) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > limit);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [limit]);
  return past;
}

/**
 * Efeito 3D de inclinação nos cards da equipe — réplica do vanilla-tilt do site original:
 * max 5°, perspectiva 1500px, velocidade 1000ms, easing cubic-bezier(.03,.98,.52,.99), volta ao centro ao sair.
 */
export function useTilt<T extends HTMLElement>(max = 5, perspective = 1500, speed = 1000) {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (window.matchMedia("(hover: none)").matches) return; // celulares: sem tilt

    let frame = 0;
    const transition = `transform ${speed}ms cubic-bezier(.03,.98,.52,.99)`;
    el.style.willChange = "transform";

    const onEnter = () => {
      el.style.transition = transition;
    };
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width; // 0..1
        const py = (e.clientY - r.top) / r.height; // 0..1
        const tiltX = (max / 2 - px * max).toFixed(2); // rotateY
        const tiltY = (py * max - max / 2).toFixed(2); // rotateX
        el.style.transform = `perspective(${perspective}px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(1,1,1)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.transition = transition;
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [max, perspective, speed, reduced]);

  return ref;
}

/**
 * Movimento horizontal conforme a rolagem (Elementor "Motion Effects → Horizontal Scroll", velocidade 4).
 * Usado no carrossel de depoimentos: ele "desliza" alguns pixels enquanto a página rola.
 */
export function useScrollParallaxX<T extends HTMLElement>(target: RefObject<T>, speed = 4) {
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const el = target.current;
    if (!el || reduced) return;
    let frame = 0;
    const update = () => {
      // no celular o deslocamento atrapalha a leitura dos cards, então fica desligado
      if (window.innerWidth < 768) {
        el.style.transform = "";
        return;
      }
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progresso 0 (entrando por baixo) -> 1 (saindo por cima)
      const progress = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      const amplitude = window.innerWidth < 1280 ? 10 : 20; // até ±40px no desktop (velocidade 4)
      const offset = (progress - 0.5) * speed * amplitude;
      el.style.transform = `translate3d(${offset.toFixed(1)}px,0,0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [target, speed, reduced]);
}

/** Atualiza o título da aba do navegador */
export function useDocumentTitle(title: string | undefined, description?: string) {
  useEffect(() => {
    if (!title) return;
    const previous = document.title;
    document.title = title;
    let meta: HTMLMetaElement | null = null;
    let previousDesc: string | null = null;
    if (description) {
      meta = document.querySelector('meta[name="description"]');
      if (meta) {
        previousDesc = meta.getAttribute("content");
        meta.setAttribute("content", description);
      }
    }
    return () => {
      document.title = previous;
      if (meta && previousDesc !== null) meta.setAttribute("content", previousDesc);
    };
  }, [title, description]);
}
