import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  /** Texto curto mostrado se a imagem não carregar (ex.: iniciais "HL") */
  fallbackLabel?: string;
};

/**
 * <img> que nunca "quebra": se o arquivo ainda não existir em /public/images,
 * mostra um bloco elegante nas cores da LBA no lugar.
 */
export function SmartImage({ fallbackLabel, className, alt = "", onError, ...rest }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={cn("lba-img-fallback", className)} role="img" aria-label={alt}>
        {fallbackLabel}
      </div>
    );
  }

  return (
    <img
      {...rest}
      alt={alt}
      className={className}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
}

/** Fundo com imagem + degradê de reserva (se a imagem faltar, o degradê aparece) */
export const bgImage = (src: string, fallback = "var(--lba-img-fallback)") => ({
  backgroundImage: `url("${src}"), ${fallback}`,
});
