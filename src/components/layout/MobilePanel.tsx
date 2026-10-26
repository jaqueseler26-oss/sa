import { useEffect, useRef } from "react";
import { Mail, Phone, X } from "lucide-react";
import { NAV_ITEMS, SITE, whatsappLink } from "@/config/site";
import { SmartLink } from "@/components/layout/SmartLink";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/**
 * Painel lateral (menu do celular).
 * Mesmo conteúdo do painel das páginas internas do site original:
 * logo colorido, Instagram/WhatsApp com nome, telefones e e-mail.
 */
export function MobilePanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <>
      <div className={cn("lba-panel-overlay", open && "is-open")} onClick={onClose} aria-hidden="true" />
      <aside
        className={cn("lba-panel", open && "is-open")}
        aria-label="Menu"
        aria-hidden={!open}
        {...(!open ? { inert: "" as unknown as boolean } : {})}
      >
        <div className="flex items-start justify-between gap-4">
          <SmartLink href="/#home" onClick={onClose} aria-label="Página inicial">
            <Logo variant="color" height={47} />
          </SmartLink>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="-mr-2 -mt-1 inline-flex h-10 w-10 items-center justify-center text-lba-navy transition-colors hover:text-lba-olive"
          >
            <X size={26} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="lba-panel__nav" aria-label="Menu do celular">
          {NAV_ITEMS.map((item) => (
            <SmartLink key={item.href} href={item.href} onClick={onClose}>
              {item.label}
            </SmartLink>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-[15px] text-lba-navy">
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-lba-olive">
            <InstagramIcon size={18} /> Instagram
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-lba-olive">
            <WhatsappIcon size={18} /> Whatsapp
          </a>
        </div>

        <div className="mt-auto border-t border-[#dddddd] pt-6 text-lba-navy">
          <a href={`tel:${SITE.phone.tel}`} className="flex items-center gap-2 font-serif text-[22px] hover:text-lba-olive">
            <Phone size={17} strokeWidth={1.5} /> {SITE.phone.display}
          </a>
          {SITE.phoneSecondary && (
            <a
              href={`tel:${SITE.phoneSecondary.tel}`}
              className="mt-1 flex items-center gap-2 font-serif text-[18px] text-lba-text hover:text-lba-olive"
            >
              <Phone size={15} strokeWidth={1.5} /> {SITE.phoneSecondary.display}
            </a>
          )}
          <a href={`mailto:${SITE.email}`} className="mt-3 flex items-center gap-2 break-all text-[14px] text-lba-text hover:text-lba-link">
            <Mail size={15} strokeWidth={1.5} className="flex-none" /> {SITE.email}
          </a>
        </div>
      </aside>
    </>
  );
}
