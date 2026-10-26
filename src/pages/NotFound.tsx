import { Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { useDocumentTitle } from "@/hooks/useMotion";

/** Página 404 */
export default function NotFound() {
  useDocumentTitle("Página não encontrada – LBA – Assessoria Jurídica");
  return (
    <>
      <PageBanner title="Página não encontrada" />
      <section className="py-[100px] text-center max-md:py-[60px]">
        <div className="lba-container">
          <p className="mx-auto max-w-[560px]">
            O endereço que você acessou não existe ou foi alterado. Que tal voltar para a página inicial ou ver os
            nossos conteúdos?
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Link to="/" className="lba-btn lba-btn--normal">
              Página inicial
            </Link>
            <Link to="/artigos" className="lba-btn-simple">
              Ver artigos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
