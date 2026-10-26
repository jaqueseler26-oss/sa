/**
 * Ícones do site.
 * - Ícones de linha: lucide-react (mesmo estilo dos ícones finos do tema original)
 * - Ícones de marcas (Instagram, WhatsApp, Facebook, X, LinkedIn): react-icons
 */
import { Feather, Handshake, Landmark, Star } from "lucide-react";
import { FaInstagram, FaWhatsapp, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { Service } from "@/content/home";

export { FaInstagram as InstagramIcon, FaWhatsapp as WhatsappIcon, FaFacebookF as FacebookIcon };
export { FaXTwitter as XIcon, FaLinkedinIn as LinkedinIcon };

const SERVICE_ICONS = { bank: Landmark, deal: Handshake, feather: Feather } as const;

export function ServiceIcon({ name, className }: { name: Service["icon"]; className?: string }) {
  const Icon = SERVICE_ICONS[name];
  return <Icon className={className} strokeWidth={1} aria-hidden="true" />;
}

/** Seta longa (→) usada nos cards de serviço */
export function LongArrow({ className, width = 20 }: { className?: string; width?: number }) {
  return (
    <svg
      className={className}
      width={width}
      height={Math.round(width * 0.55)}
      viewBox="0 0 20 11"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 5.5h18M14 1.5l4.2 4-4.2 4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** Seta para baixo do banner das páginas internas (igual ao ícone original) */
export function DownChevron({ className }: { className?: string }) {
  return (
    <svg className={className} width="15" height="9" viewBox="0 0 14.626 8.639" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.392.722l-.479-.482a.8.8 0 0 0-1.132 0L7.316 5.7 1.844.228a.8.8 0 0 0-1.132 0l-.479.479a.8.8 0 0 0 0 1.131l6.515 6.538a.818.818 0 0 0 .567.257.818.818 0 0 0 .566-.257l6.508-6.52a.808.808 0 0 0 .234-.571.8.8 0 0 0-.231-.563z"
      />
    </svg>
  );
}

/** 5 estrelas dos depoimentos (substitui a imagem de estrelas do site antigo, com nitidez em qualquer tela) */
export function Stars({ count = 5, size = 22 }: { count?: number; size?: number }) {
  return (
    <span className="inline-flex gap-[3px]" aria-label={`${count} de 5 estrelas`} role="img">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} width={size} height={size} fill="currentColor" strokeWidth={0} aria-hidden="true" />
      ))}
    </span>
  );
}
