import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

/** Estrutura padrão das páginas públicas: cabeçalho sobre o banner + conteúdo + rodapé */
export function Layout() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
