import { ArrowUp } from "lucide-react";
import { useScrolledPast } from "@/hooks/useMotion";
import { smoothScrollTo } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/** Botão redondo "voltar ao topo" — sobe de baixo quando a página é rolada (igual ao original) */
export function ScrollToTop() {
  const visible = useScrolledPast(500);
  return (
    <button
      type="button"
      className={cn("lba-to-top", visible && "is-visible")}
      onClick={() => smoothScrollTo(0, 800)}
      aria-label="Voltar ao topo"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp size={18} strokeWidth={2} />
    </button>
  );
}
