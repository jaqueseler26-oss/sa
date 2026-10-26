import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, Menu } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/config/site";
import { SmartLink } from "@/components/layout/SmartLink";
import { MobilePanel } from "@/components/layout/MobilePanel";
import { Logo } from "@/components/ui/Logo";

const HOME_SECTIONS = ["home", "QuemSomos", "Servicos", "Contato"];

/** Descobre qual seção da Home está na tela (para marcar o item do menu) */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState("home");
  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => {
      const probe = window.innerHeight * 0.35;
      let current = "home";
      for (const id of HOME_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled]);
  return active;
}

/**
 * Cabeçalho transparente sobre o banner (igual ao original):
 * logo branco + menu em EB Garamond com linha que cresce no hover.
 * No celular: logo + "➔ Conteúdos" (como no original) + botão de menu lateral.
 */
export function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const activeSection = useActiveSection(isHome);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => setPanelOpen(false), [location.pathname]);

  const isActive = (href: string) => {
    if (href === "/artigos") {
      return (
        !isHome &&
        !location.pathname.startsWith("/team") &&
        !location.pathname.startsWith("/politica") &&
        !location.pathname.startsWith("/admin")
      );
    }
    if (!isHome) return false;
    const hash = href.split("#")[1];
    return hash === activeSection;
  };

  return (
    <>
      <header className="lba-header">
        <div className="lba-header__row">
          <SmartLink href="/#home" className="lba-header__logo" aria-label={`${SITE.name} — página inicial`}>
            <Logo variant="white" />
          </SmartLink>

          <nav aria-label="Menu principal">
            <ul className="lba-menu">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <SmartLink href={item.href} aria-current={isActive(item.href) ? "true" : undefined}>
                    <span>{item.label}</span>
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <SmartLink href="/artigos" className="lba-header__mobile-link">
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            Conteúdos
          </SmartLink>
          <button
            type="button"
            className="lba-burger"
            aria-label="Abrir menu"
            aria-expanded={panelOpen}
            onClick={() => setPanelOpen(true)}
          >
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>
      </header>
      <MobilePanel open={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  );
}
