import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Layout } from "@/components/layout/Layout";
import { ScrollManager } from "@/components/layout/ScrollManager";
import Index from "@/pages/Index";
import Artigos from "@/pages/Artigos";
import Categoria from "@/pages/Categoria";
import Artigo from "@/pages/Artigo";
import Equipe from "@/pages/Equipe";
import Privacidade from "@/pages/Privacidade";
import NotFound from "@/pages/NotFound";

// O painel só é carregado quando alguém acessa /admin (deixa o site mais leve)
const Admin = lazy(() => import("@/pages/admin/Admin"));
const EditorArtigo = lazy(() => import("@/pages/admin/EditorArtigo"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

/**
 * ROTAS DO SITE (mesmos endereços do site antigo, para não perder o Google):
 *   /                      → Home
 *   /artigos               → "Conteúdos" (categorias)
 *   /licitacoes            → artigos de Licitações
 *   /agronegocio           → artigos de Agronegócio
 *   /team/:slug            → página de cada advogado(a)
 *   /politica-de-privacidade
 *   /admin                 → painel (login)  |  /admin/artigos/novo  |  /admin/artigos/:id
 *   /:slug                 → página do artigo (ex.: /receita-federal-e-monitoramento-...)
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/artigos" element={<Artigos />} />
            <Route path="/licitacoes" element={<Categoria slug="licitacoes" />} />
            <Route path="/agronegocio" element={<Categoria slug="agronegocio" />} />
            <Route path="/team/:slug" element={<Equipe />} />
            <Route path="/politica-de-privacidade" element={<Privacidade />} />
            <Route path="/:slug" element={<Artigo />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route
            path="/admin"
            element={
              <Suspense fallback={null}>
                <Admin />
              </Suspense>
            }
          />
          <Route
            path="/admin/artigos/:id"
            element={
              <Suspense fallback={null}>
                <EditorArtigo />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors closeButton />
    </QueryClientProvider>
  );
}
