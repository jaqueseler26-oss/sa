import { useState } from "react";
import { IMAGES } from "@/config/site";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "white" | "color";
  className?: string;
  height?: number;
};

/**
 * Logo da LBA (arquivo em /public/images/logo).
 * Se o arquivo ainda não estiver no projeto, mostra o nome em texto no lugar (nunca aparece imagem quebrada).
 */
export function Logo({ variant = "white", className, height = 53 }: Props) {
  const [failed, setFailed] = useState(false);
  const src = variant === "white" ? IMAGES.logoWhite : IMAGES.logoColor;

  if (failed) {
    return (
      <span
        className={cn("inline-flex flex-col justify-center leading-none", className)}
        style={{ height, color: variant === "white" ? "#fff" : "var(--lba-navy)" }}
        aria-label="LBA - Assessoria Jurídica"
      >
        <span className="font-serif text-[32px] font-semibold tracking-[0.12em]">LBA</span>
        <span className="mt-1 font-sans text-[8.5px] font-bold uppercase tracking-[0.28em] opacity-80">
          Assessoria Jurídica
        </span>
      </span>
    );
  }

  return (
    <img
      src={src}
      alt="LBA - Assessoria Jurídica"
      className={cn("block w-auto", className)}
      style={{ height }}
      width={Math.round((height * 1125) / 447)}
      height={height}
      onError={() => setFailed(true)}
    />
  );
}
