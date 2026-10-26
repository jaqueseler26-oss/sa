import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToId } from "@/lib/scroll";

/**
 * Ao trocar de página: volta ao topo.
 * Se o endereço tiver âncora (ex.: /#Contato), rola até a seção depois que ela aparecer.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash || hash === "#home") {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer = 0;
    const attempt = () => {
      if (scrollToId(id, 900)) return;
      if (tries++ < 20) timer = window.setTimeout(attempt, 100);
    };
    window.scrollTo(0, 0);
    timer = window.setTimeout(attempt, 80);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
