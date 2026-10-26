import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, FileText, Inbox, Pencil, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { MessagesList } from "@/components/admin/MessagesList";
import { useArticles, useDeleteArticle, articleKeys } from "@/hooks/useArticles";
import { CATEGORIES, getCategory } from "@/content/categorias";
import { formatDatePost } from "@/lib/format";
import { resetLocalArticles } from "@/lib/articles";
import { listMessages } from "@/lib/messages";
import { hasBackend } from "@/lib/backend";
import { stripHtml, cn } from "@/lib/utils";

/** /admin — lista de artigos e caixa de mensagens */
export default function Admin() {
  return (
    <AdminShell title="Painel">
      <Dashboard />
    </AdminShell>
  );
}

function Dashboard() {
  const [tab, setTab] = useState<"artigos" | "mensagens">("artigos");
  const { data: messages = [] } = useQuery({ queryKey: ["mensagens"], queryFn: listMessages });
  const unread = messages.filter((m) => !m.read).length;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-[34px] normal-case leading-tight text-lba-navy">Painel de conteúdo</h1>
          <p className="text-[#5b6478]">Escreva, edite e publique os artigos do site.</p>
        </div>
        <Link to="/admin/artigos/novo" className="lba-btn">
          <Plus size={16} /> Novo artigo
        </Link>
      </div>

      <div className="mt-8 flex gap-1 border-b border-[#e3e8ee]">
        {[
          { id: "artigos" as const, label: "Artigos", icon: <FileText size={16} /> },
          {
            id: "mensagens" as const,
            label: "Mensagens",
            icon: <Inbox size={16} />,
            badge: unread,
          },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-3 text-[14px] font-semibold transition-colors",
              tab === t.id ? "border-lba-link text-lba-link" : "border-transparent text-[#5b6478] hover:text-lba-link",
            )}
          >
            {t.icon} {t.label}
            {Boolean(t.badge) && (
              <span className="rounded-full bg-lba-link px-2 py-0.5 text-[11px] text-white">{t.badge}</span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6">{tab === "artigos" ? <ArticlesTable /> : <MessagesList />}</div>
    </>
  );
}

function ArticlesTable() {
  const qc = useQueryClient();
  const { data: articles = [], isLoading, error } = useArticles({ includeDrafts: true });
  const del = useDeleteArticle();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("todas");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles
      .filter((a) => (cat === "todas" ? true : a.category === cat))
      .filter((a) => (q ? a.title.toLowerCase().includes(q) : true));
  }, [articles, query, cat]);

  const onDelete = (id: string, title: string) => {
    if (!window.confirm(`Excluir o artigo "${title}"? Esta ação não pode ser desfeita.`)) return;
    del.mutate(id, {
      onSuccess: () => toast.success("Artigo excluído."),
      onError: (e) => toast.error(e instanceof Error ? e.message : "Não foi possível excluir."),
    });
  };

  if (isLoading) return <p className="py-10 text-center text-lba-steel">Carregando artigos…</p>;
  if (error)
    return (
      <p className="rounded-lg bg-[#fdf0f0] p-4 text-[#b42318]">
        Não foi possível carregar os artigos do banco. Confira se a migração foi aplicada (LOVABLE.md).
      </p>
    );

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label className="relative min-w-[240px] flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-lba-steel" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar pelo título…"
            className="h-10 w-full rounded-md border border-[#d5dce5] bg-white pl-9 pr-3 outline-none focus:border-lba-link"
          />
        </label>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="h-10 rounded-md border border-[#d5dce5] bg-white px-3 outline-none focus:border-lba-link"
          aria-label="Filtrar por categoria"
        >
          <option value="todas">Todas as categorias</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
        {!hasBackend && (
          <button
            type="button"
            onClick={() => {
              if (!window.confirm("Restaurar os 9 artigos originais? Suas edições locais serão apagadas.")) return;
              resetLocalArticles();
              qc.invalidateQueries({ queryKey: articleKeys.all });
              toast.success("Artigos originais restaurados.");
            }}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-[#d5dce5] bg-white px-3 text-[13px] font-semibold text-[#5b6478] hover:border-lba-link hover:text-lba-link"
          >
            <RefreshCw size={14} /> Restaurar originais
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-[#e3e8ee] bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#f8fafc] text-[12px] uppercase tracking-[0.12em] text-lba-steel">
            <tr>
              <th className="px-5 py-3 font-semibold">Título</th>
              <th className="hidden px-3 py-3 font-semibold md:table-cell">Categoria</th>
              <th className="hidden px-3 py-3 font-semibold sm:table-cell">Data</th>
              <th className="px-3 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 text-right font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => {
              const empty = !stripHtml(a.content);
              return (
                <tr key={a.id} className="border-t border-[#eef1f4] align-top hover:bg-[#fafbfd]">
                  <td className="px-5 py-4">
                    <Link to={`/admin/artigos/${a.id}`} className="font-semibold text-[#1f2840] hover:text-lba-link">
                      {a.title}
                    </Link>
                    {empty && (
                      <span className="mt-1 block text-[12px] font-semibold text-[#b26b00]">⚠ Texto ainda não colado</span>
                    )}
                  </td>
                  <td className="hidden px-3 py-4 text-[14px] md:table-cell">{getCategory(a.category)?.label}</td>
                  <td className="hidden whitespace-nowrap px-3 py-4 text-[14px] sm:table-cell">{formatDatePost(a.publishedAt)}</td>
                  <td className="px-3 py-4">
                    <span
                      className={cn(
                        "inline-block rounded-full px-2.5 py-1 text-[12px] font-semibold",
                        a.status === "publicado" ? "bg-[#e8f7ee] text-[#1f7a3a]" : "bg-[#f1f3f6] text-[#5b6478]",
                      )}
                    >
                      {a.status === "publicado" ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <Link
                        to={`/admin/artigos/${a.id}`}
                        className="rounded-md p-2 text-lba-link hover:bg-[#eef3f8]"
                        aria-label="Editar"
                        title="Editar"
                      >
                        <Pencil size={16} />
                      </Link>
                      {a.status === "publicado" && (
                        <Link
                          to={`/${a.slug}`}
                          target="_blank"
                          className="rounded-md p-2 text-lba-link hover:bg-[#eef3f8]"
                          aria-label="Ver no site"
                          title="Ver no site"
                        >
                          <Eye size={16} />
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => onDelete(a.id, a.title)}
                        className="rounded-md p-2 text-[#b42318] hover:bg-[#fdf0f0]"
                        aria-label="Excluir"
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {!filtered.length && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-lba-steel">
                  Nenhum artigo encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
