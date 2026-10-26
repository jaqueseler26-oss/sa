/**
 * Rolagem suave com a mesma curva do botão do slider original (power1.inOut, 1000ms).
 */
const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export function smoothScrollTo(targetY: number, duration = 1000) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || duration <= 0) {
    window.scrollTo(0, targetY);
    return;
  }
  const startY = window.scrollY;
  const distance = targetY - startY;
  const start = performance.now();

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, startY + distance * easeInOutQuad(t));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/** Rola até um elemento pelo id (ex.: "Contato"). Retorna false se não achou. */
export function scrollToId(id: string, duration = 1000) {
  const el = document.getElementById(id);
  if (!el) return false;
  const y = el.getBoundingClientRect().top + window.scrollY;
  smoothScrollTo(Math.max(0, y), duration);
  return true;
}
