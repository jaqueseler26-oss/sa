import { cn } from "@/lib/utils";

type Props = {
  subtitle?: string;
  title: string;
  as?: "h1" | "h2";
  /** Cor do subtítulo (cada seção do original usa uma) */
  subtitleColor?: string;
  titleColor?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
};

/** Subtítulo pequeno + título grande, como em "NOSSO TIME DE / ESPECIALISTAS" */
export function SectionTitle({
  subtitle,
  title,
  as = "h2",
  subtitleColor,
  titleColor,
  align = "left",
  className,
  id,
}: Props) {
  const Tag = as;
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {subtitle && (
        <span className="lba-subtitle" style={{ color: subtitleColor }}>
          {subtitle}
        </span>
      )}
      <Tag id={id} className={as === "h1" ? "lba-h1" : "lba-h2"} style={{ color: titleColor }}>
        {title}
      </Tag>
    </div>
  );
}
