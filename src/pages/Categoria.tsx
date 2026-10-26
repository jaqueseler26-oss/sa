import { ChevronRight } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { getCategory, type CategorySlug } from "@/content/categorias";
import { useArticles } from "@/hooks/useArticles";
import { useDocumentTitle } from "@/hooks/useMotion";
import { formatDatePost } from "@/lib/format";

/**
 * /licitacoes e /agronegocio — lista de artigos da categoria.
 * Visual do original: seta à esquerda, "artigos / data" e o título grande, separados por linhas.
 */
export default function Categoria({ slug }: { slug: CategorySlug }) {
  const category = getCategory(slug);
  useDocumentTitle(category ? `${category.label} – LBA – Assessoria Jurídica` : undefined);
  const { data: articles = [], isLoading } = useArticles({ category: slug });

  if (!category) return <Navigate to="/artigos" replace />;

  return (
    <>
      <PageBanner title={category.pageTitle} />

      <section className="pb-[70px] pt-[150px] max-md:pt-[80px]">
        <div className="lba-container">
          <div className="mx-auto max-w-[1000px]">
            {isLoading && <p className="text-center text-lba-steel">Carregando artigos…</p>}

            {!isLoading && articles.length === 0 && (
              <p className="text-center">Nenhum artigo publicado nesta categoria ainda.</p>
            )}

            {articles.map((a) => (
              <article key={a.id} className="lba-post-item animate-fade-up">
                <Link to={`/${a.slug}`} aria-hidden="true" tabIndex={-1} className="lba-post-item__icon">
                  <ChevronRight size={35} strokeWidth={1.4} />
                </Link>
                <div className="min-w-0">
                  <h3 className="lba-post-item__meta">
                    <Link to={`/${a.slug}`}>artigos / {formatDatePost(a.publishedAt)}</Link>
                  </h3>
                  <p className="lba-post-item__title">
                    <Link to={`/${a.slug}`}>{a.title}</Link>
                  </p>
                  <Link to={`/${a.slug}`} className="lba-post-item__more">
                    Saiba Mais
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link to="/artigos" className="lba-btn-simple">
              Ver todas as categorias
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
