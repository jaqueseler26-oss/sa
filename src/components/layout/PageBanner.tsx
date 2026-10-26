import type { ReactNode } from "react";
import { IMAGES } from "@/config/site";
import { bgImage } from "@/components/ui/SmartImage";
import { DownChevron } from "@/components/ui/Icons";

type Props = {
  title: string;
  /** Linha acima do título (ex.: categoria do artigo) */
  eyebrow?: ReactNode;
  /** Linha abaixo do título (ex.: autor e data) */
  meta?: ReactNode;
  /** Título longo (artigos) usa fonte um pouco menor */
  long?: boolean;
};

/** Banner das páginas internas (imagem "header-1" do original + título central + seta dourada) */
export function PageBanner({ title, eyebrow, meta, long }: Props) {
  return (
    <section className="lba-banner" style={bgImage(IMAGES.pageBanner)}>
      <div className="lba-container">
        {eyebrow && <div className="mb-4 animate-fade-in">{eyebrow}</div>}
        <h1
          className="lba-banner__title mx-auto max-w-[980px] animate-fade-up"
          style={long ? { fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.12 } : undefined}
        >
          {title}
        </h1>
        {meta && <div className="mt-5 animate-fade-in text-[15px] text-white/85">{meta}</div>}
        <DownChevron className="lba-banner__arrow" />
      </div>
    </section>
  );
}
