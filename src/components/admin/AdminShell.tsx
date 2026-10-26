import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Loader2, LogOut, TriangleAlert } from "lucide-react";
import { hasBackend } from "@/lib/backend";
import { Logo } from "@/components/ui/Logo";
import { signOut, useAdminSession } from "@/lib/auth";
import { useDocumentTitle } from "@/hooks/useMotion";
import { LoginForm } from "@/components/admin/LoginForm";

/** Moldura do painel: barra superior + verificação de login */
export function AdminShell({ children, title = "Painel" }: { children: ReactNode; title?: string }) {
  useDocumentTitle(`${title} – Painel LBA`);
  const session = useAdminSession();

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-sans text-[15px] text-[#2b3550]">
      <header className="sticky top-0 z-30 border-b border-[#e3e8ee] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center gap-4 px-5">
          <Link to="/admin" className="flex items-center gap-3">
            <Logo variant="color" height={36} />
            <span className="hidden border-l border-[#e3e8ee] pl-3 text-[13px] font-bold uppercase tracking-[0.18em] text-lba-steel sm:inline">
              Painel de conteúdo
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/artigos"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-[13px] font-semibold text-lba-link hover:bg-[#eef3f8]"
            >
              <ExternalLink size={15} /> Ver site
            </Link>
            {session.status === "admin" && (
              <button
                type="button"
                onClick={() => signOut()}
                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-[13px] font-semibold text-[#5b6478] hover:bg-[#eef3f8]"
              >
                <LogOut size={15} /> Sair
              </button>
            )}
          </div>
        </div>
      </header>

      {!hasBackend && (
        <div className="border-b border-[#f0dfb5] bg-[#fff8e6]">
          <div className="mx-auto flex max-w-[1180px] items-start gap-3 px-5 py-3 text-[13.5px] text-[#6b5413]">
            <TriangleAlert size={18} className="mt-0.5 flex-none" />
            <p>
              <strong>Modo local (sem banco de dados).</strong> Você pode testar tudo, mas as alterações ficam salvas
              só neste navegador. Para publicar de verdade, ative o <strong>Lovable Cloud</strong> — o passo a passo
              está no arquivo <code className="rounded bg-[#f6ecd0] px-1">LOVABLE.md</code>.
            </p>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-[1180px] px-5 py-8">
        {session.status === "loading" && (
          <div className="flex items-center justify-center gap-3 py-24 text-lba-steel">
            <Loader2 className="animate-spin" size={20} /> Carregando…
          </div>
        )}
        {session.status === "signed-out" && <LoginForm />}
        {session.status === "forbidden" && (
          <div className="mx-auto max-w-[480px] rounded-xl border border-[#e3e8ee] bg-white p-8 text-center shadow-sm">
            <h1 className="font-serif text-[28px] normal-case text-lba-navy">Acesso não liberado</h1>
            <p className="mt-3 text-[#5b6478]">
              A conta <strong>{session.email}</strong> entrou, mas ainda não tem permissão de administrador. Peça para
              adicionar este e-mail na tabela <code>admin_emails</code> (veja o LOVABLE.md).
            </p>
            <button type="button" onClick={() => signOut()} className="lba-btn mt-6">
              Sair
            </button>
          </div>
        )}
        {(session.status === "admin" || session.status === "local") && children}
      </main>
    </div>
  );
}
