import { useState } from "react";
import { Check, Link2, Mail } from "lucide-react";
import { FacebookIcon, LinkedinIcon, WhatsappIcon, XIcon } from "@/components/ui/Icons";

/** Botões de compartilhar (o original tinha X/Twitter, Facebook, e-mail e copiar link; somamos WhatsApp e LinkedIn) */
export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const items = [
    { label: "WhatsApp", href: `https://api.whatsapp.com/send?text=${t}%20${u}`, icon: <WhatsappIcon size={15} /> },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: <FacebookIcon size={14} /> },
    { label: "X (Twitter)", href: `https://twitter.com/intent/tweet?text=${t}&url=${u}`, icon: <XIcon size={14} /> },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: <LinkedinIcon size={14} /> },
    { label: "E-mail", href: `mailto:?subject=${t}&body=${u}`, icon: <Mail size={15} strokeWidth={1.6} /> },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* navegador sem permissão de cópia */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-2 text-[12px] font-bold uppercase tracking-[0.2em] text-lba-ink">Compartilhar</span>
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Compartilhar no ${it.label}`}
          title={it.label}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d7dfe8] text-lba-link transition-colors hover:border-lba-link hover:bg-lba-link hover:text-white"
        >
          {it.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label="Copiar link"
        title="Copiar link"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d7dfe8] text-lba-link transition-colors hover:border-lba-link hover:bg-lba-link hover:text-white"
      >
        {copied ? <Check size={15} /> : <Link2 size={15} />}
      </button>
    </div>
  );
}
