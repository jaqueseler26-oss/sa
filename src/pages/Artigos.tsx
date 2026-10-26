import { Gavel, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { CATEGORIES } from "@/content/categorias";
import { useArticles } from "@/hooks/useArticles";
import { useDocumentTitle } from "@/hooks/useMotion";

const ICONS = { gavel: Gavel, seedling: Sprout } as const;

/** /artigos — página "Conteúdos" com os dois cards de categoria (igual ao original) */
export default function Artigos() {
  useDocumentTitle("Conteúdos – LBA – Assessoria Jurídica", "Artigos da LBA Assessoria Jurídica sobre licitações e agronegócio.");
  const { data: all = [] } = useArticles();

  return (
    <>
      <PageBanner title="Conteúdos" />

      <section className="pb-[60px] pt-[150px] max-md:pt-[80px]">
        <div className="lba-container">
          <div className="grid gap-16 md:grid-cols-2">
            {CATEGORIES.map((cat) => {
              const Icon = ICONS[cat.icon];
              const count = all.filter((a) => a.category === cat.slug).length;
              return (
                <div key={cat.slug} className="lba-cat-card">
                  <Icon className="lba-cat-card__icon" size={50} strokeWidth={1.3} aria-hidden="true" />
                  <h2 className="lba-cat-card__title">{cat.cardTitle}</h2>
                  <p className="lba-cat-card__desc">
                    {cat.description}
                    {count > 0 && (
                      <span className="mt-1 block text-[14px] uppercase tracking-[0.15em] text-lba-steel">
                        {count} {count === 1 ? "artigo" : "artigos"}
                      </span>
                    )}
                  </p>
                  <Link to={`/${cat.slug}`} className="lba-btn lba-btn--normal">
                    Saiba mais
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
