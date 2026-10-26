import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageBanner } from "@/components/layout/PageBanner";
import { ShareButtons } from "@/components/articles/ShareButtons";
import { useArticle, useArticles } from "@/hooks/useArticles";
import { useDocumentTitle } from "@/hooks/useMotion";
import { getCategory } from "@/content/categorias";
import { getNeighbors } from "@/lib/articles";
import { formatDatePost } from "@/lib/format";
import { stripHtml } from "@/lib/utils";
import { SITE, whatsappLink } from "@/config/site";
import NotFound from "@/pages/NotFound";

/**
 * Página do artigo. O endereço é o mesmo do site antigo: lbaassessoriajuridica.com.br/<slug>/
 * O HTML do artigo é limpo (DOMPurify) antes de aparecer na tela.
 */
export default function Artigo() {
  const { slug } = useParams();
  const { data: article, isLoading } = useArticle(slug);
  const { data: all = [] } = useArticles();

  const description = article ? article.excerpt || stripHtml(article.content).slice(0, 160) : undefined;
  useDocumentTitle(article ? `${article.title} – LBA – Assessoria Jurídica` : undefined, description || undefined);

  const html = useMemo(
    () =>
      article?.content
        ? DOMPurify.sanitize(article.content, { ADD_ATTR: ["target", "rel"], FORBID_TAGS: ["style", "script"] })
        : "",
    [article?.content],
  );

  if (isLoading) {
    return (
      <>
        <PageBanner title="Carregando…" />
        <div className="min-h-[40vh]" />
      </>
    );
  }
  if (!article) return <NotFound />;

  const category = getCategory(article.category);
  const { newer, older } = getNeighbors(all, article);
  const related = all.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: { "@type": "Organization", name: article.author || SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    ...(article.coverUrl ? { image: article.coverUrl } : {}),
  };

  return (
    <>
      <PageBanner
        long
        title={article.title}
        eyebrow={
          category && (
            <Link
              to={`/${category.slug}`}
              className="text-[13px] font-bold uppercase tracking-[0.2em] text-lba-cream hover:text-white"
            >
              {category.label}
            </Link>
          )
        }
        meta={
          <>
            Por {article.author || SITE.defaultAuthor} <span className="mx-2 opacity-60">·</span>{" "}
            {formatDatePost(article.publishedAt)}
          </>
        }
      />

      <article className="py-[90px] max-md:py-[60px]">
        <div className="lba-container">
          <div className="mx-auto max-w-[800px]">
            {article.coverUrl && (
              <img src={article.coverUrl} alt="" className="mb-12 w-full rounded-[2px] object-cover" loading="lazy" />
            )}

            {html ? (
              <div className="lba-prose animate-fade-in" dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <div className="border-l-[3px] border-lba-olive bg-lba-cream px-7 py-6 text-[17px]">
                O conteúdo completo deste artigo será publicado em breve. Enquanto isso, fale com a nossa equipe pelo{" "}
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-bold text-lba-link underline">
                  WhatsApp
                </a>
                .
              </div>
            )}

            <div className="mt-14 border-t border-[#e3e8ee] pt-7">
              <ShareButtons title={article.title} />
            </div>

            {(newer || older) && (
              <nav className="mt-12 grid gap-6 border-y border-[#e3e8ee] py-8 sm:grid-cols-2" aria-label="Navegação entre artigos">
                <div>
                  {older && (
                    <Link to={`/${older.slug}`} className="group block">
                      <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-lba-steel">
                        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Anterior
                      </span>
                      <h6 className="mt-2 text-[19px] normal-case leading-snug text-lba-ink transition-colors group-hover:text-lba-link">
                        {older.title}
                      </h6>
                      <span className="text-[14px] text-lba-steel">{formatDatePost(older.publishedAt)}</span>
                    </Link>
                  )}
                </div>
                <div className="sm:text-right">
                  {newer && (
                    <Link to={`/${newer.slug}`} className="group block">
                      <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-lba-steel">
                        Próximo <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </span>
                      <h6 className="mt-2 text-[19px] normal-case leading-snug text-lba-ink transition-colors group-hover:text-lba-link">
                        {newer.title}
                      </h6>
                      <span className="text-[14px] text-lba-steel">{formatDatePost(newer.publishedAt)}</span>
                    </Link>
                  )}
                </div>
              </nav>
            )}

            {related.length > 0 && (
              <section className="mt-14">
                <h3 className="text-[28px] text-lba-ink">Você também pode gostar</h3>
                <div className="mt-6 grid gap-8 sm:grid-cols-2">
                  {related.map((r) => (
                    <Link key={r.id} to={`/${r.slug}`} className="group block bg-lba-cream p-6 transition-transform hover:-translate-y-1">
                      <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-lba-olive">
                        {getCategory(r.category)?.label}
                      </span>
                      <h6 className="mt-2 text-[20px] normal-case leading-snug text-lba-ink group-hover:text-lba-link">
                        {r.title}
                      </h6>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
