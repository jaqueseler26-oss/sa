import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Eye, ImagePlus, Loader2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { useArticleById, useSaveArticle } from "@/hooks/useArticles";
import { CATEGORIES, type CategorySlug } from "@/content/categorias";
import { SITE } from "@/config/site";
import { fromDateInput, toDateInput } from "@/lib/format";
import { uploadArticleImage } from "@/lib/articles";
import type { ArticleInput } from "@/lib/types";
import { slugify } from "@/lib/utils";

const inputCls =
  "h-11 w-full rounded-md border border-[#d5dce5] bg-white px-3 outline-none transition focus:border-lba-link focus:ring-2 focus:ring-lba-link/15";
const labelCls = "text-[13px] font-semibold text-[#3d4660]";

const emptyDraft = (): ArticleInput => ({
  slug: "",
  title: "",
  category: "licitacoes",
  excerpt: "",
  content: "",
  coverUrl: null,
  author: SITE.defaultAuthor,
  publishedAt: new Date().toISOString(),
  status: "rascunho",
});

/** /admin/artigos/novo e /admin/artigos/:id — escrever ou editar um artigo */
export default function EditorArtigo() {
  const { id } = useParams();
  const isNew = !id || id === "novo";
  return (
    <AdminShell title={isNew ? "Novo artigo" : "Editar artigo"}>
      <EditorForm key={id ?? "novo"} id={isNew ? undefined : id} />
    </AdminShell>
  );
}

function EditorForm({ id }: { id?: string }) {
  const navigate = useNavigate();
  const { data: existing, isLoading } = useArticleById(id);
  const save = useSaveArticle();
  const [draft, setDraft] = useState<ArticleInput>(emptyDraft);
  const [slugTouched, setSlugTouched] = useState(false);
  const [dirty, setDirty] = useState(false);
  const coverRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (existing) {
      setDraft({ ...existing });
      setSlugTouched(true);
      setDirty(false);
    }
  }, [existing]);

  // avisa antes de sair com alterações não salvas
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const update = <K extends keyof ArticleInput>(key: K, value: ArticleInput[K]) => {
    setDraft((d) => {
      const next = { ...d, [key]: value };
      if (key === "title" && !slugTouched) next.slug = slugify(String(value));
      return next;
    });
    setDirty(true);
  };

  const publicUrl = useMemo(() => `${SITE.url}/${draft.slug || slugify(draft.title) || "…"}/`, [draft.slug, draft.title]);

  const onSave = async (statusOverride?: ArticleInput["status"]) => {
    if (draft.title.trim().length < 3) {
      toast.error("Escreva um título para o artigo.");
      return;
    }
    const payload: ArticleInput = { ...draft, status: statusOverride ?? draft.status };
    try {
      const saved = await save.mutateAsync(payload);
      setDraft({ ...saved });
      setDirty(false);
      toast.success(saved.status === "publicado" ? "Artigo salvo e publicado!" : "Rascunho salvo.");
      if (!id || id !== saved.id) navigate(`/admin/artigos/${saved.id}`, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Não foi possível salvar.");
    }
  };

  const onCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const t = toast.loading("Enviando imagem de capa…");
    try {
      update("coverUrl", await uploadArticleImage(file));
      toast.success("Capa atualizada.", { id: t });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao enviar.", { id: t });
    }
  };

  if (id && isLoading) {
    return (
      <div className="flex items-center justify-center gap-3 py-24 text-lba-steel">
        <Loader2 className="animate-spin" size={20} /> Carregando artigo…
      </div>
    );
  }
  if (id && !isLoading && !existing) {
    return (
      <div className="py-20 text-center">
        <p>Artigo não encontrado.</p>
        <Link to="/admin" className="lba-btn mt-6">
          Voltar ao painel
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/admin" className="inline-flex items-center gap-2 text-[14px] font-semibold text-lba-link hover:underline">
          <ArrowLeft size={16} /> Voltar aos artigos
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          {existing?.status === "publicado" && (
            <Link
              to={`/${existing.slug}`}
              target="_blank"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-[#d5dce5] bg-white px-4 text-[13px] font-semibold text-lba-link hover:border-lba-link"
            >
              <Eye size={15} /> Ver no site
            </Link>
          )}
          <button
            type="button"
            onClick={() => onSave("rascunho")}
            disabled={save.isPending}
            className="inline-flex h-11 items-center gap-2 rounded-md border border-[#d5dce5] bg-white px-4 text-[13px] font-semibold text-[#3d4660] hover:border-lba-link disabled:opacity-60"
          >
            Salvar rascunho
          </button>
          <button type="button" onClick={() => onSave("publicado")} disabled={save.isPending} className="lba-btn">
            {save.isPending ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Publicar
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* coluna principal */}
        <div className="grid gap-5">
          <label className="grid gap-1.5">
            <span className={labelCls}>Título</span>
            <input
              value={draft.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Ex.: Como participar de licitações com segurança jurídica"
              className={`${inputCls} h-14 font-serif text-[22px]`}
            />
          </label>

          <div className="grid gap-1.5">
            <span className={labelCls}>Texto do artigo</span>
            <RichTextEditor value={draft.content} onChange={(html) => update("content", html)} />
            <p className="text-[12.5px] text-lba-steel">
              Dica: você pode copiar o texto do Word, do Google Docs ou do site antigo e colar aqui — negritos, títulos e
              listas são mantidos.
            </p>
          </div>
        </div>

        {/* coluna lateral */}
        <aside className="grid content-start gap-5">
          <div className="grid gap-4 rounded-xl border border-[#e3e8ee] bg-white p-5 shadow-sm">
            <label className="grid gap-1.5">
              <span className={labelCls}>Status</span>
              <select
                value={draft.status}
                onChange={(e) => update("status", e.target.value as ArticleInput["status"])}
                className={inputCls}
              >
                <option value="publicado">Publicado (aparece no site)</option>
                <option value="rascunho">Rascunho (escondido)</option>
              </select>
            </label>
            <label className="grid gap-1.5">
              <span className={labelCls}>Categoria</span>
              <select
                value={draft.category}
                onChange={(e) => update("category", e.target.value as CategorySlug)}
                className={inputCls}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5">
              <span className={labelCls}>Data de publicação</span>
              <input
                type="date"
                value={toDateInput(draft.publishedAt)}
                onChange={(e) => update("publishedAt", fromDateInput(e.target.value))}
                className={inputCls}
              />
            </label>
            <label className="grid gap-1.5">
              <span className={labelCls}>Autor</span>
              <input value={draft.author} onChange={(e) => update("author", e.target.value)} className={inputCls} />
            </label>
          </div>

          <div className="grid gap-4 rounded-xl border border-[#e3e8ee] bg-white p-5 shadow-sm">
            <label className="grid gap-1.5">
              <span className={labelCls}>Endereço (URL)</span>
              <input
                value={draft.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  update("slug", slugify(e.target.value));
                }}
                placeholder="gerado-a-partir-do-titulo"
                className={`${inputCls} font-mono text-[13px]`}
              />
              <span className="break-all text-[12px] text-lba-steel">{publicUrl}</span>
            </label>
            <label className="grid gap-1.5">
              <span className={labelCls}>Resumo (opcional)</span>
              <textarea
                value={draft.excerpt}
                onChange={(e) => update("excerpt", e.target.value)}
                rows={3}
                maxLength={300}
                placeholder="Aparece no Google e quando o link é compartilhado."
                className="w-full rounded-md border border-[#d5dce5] bg-white px-3 py-2 outline-none transition focus:border-lba-link focus:ring-2 focus:ring-lba-link/15"
              />
            </label>
          </div>

          <div className="grid gap-3 rounded-xl border border-[#e3e8ee] bg-white p-5 shadow-sm">
            <span className={labelCls}>Imagem de capa (opcional)</span>
            {draft.coverUrl ? (
              <div className="relative">
                <img src={draft.coverUrl} alt="" className="aspect-[16/9] w-full rounded-md object-cover" />
                <button
                  type="button"
                  onClick={() => update("coverUrl", null)}
                  className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-[#b42318] shadow"
                  aria-label="Remover capa"
                >
                  <X size={15} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => coverRef.current?.click()}
                className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-[#d5dce5] text-[13px] font-semibold text-lba-steel hover:border-lba-link hover:text-lba-link"
              >
                <ImagePlus size={22} /> Enviar imagem
              </button>
            )}
            <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={onCover} />
          </div>
        </aside>
      </div>
    </div>
  );
}
