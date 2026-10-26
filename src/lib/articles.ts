/**
 * ARTIGOS — leitura e escrita.
 * Funciona com o banco (Lovable Cloud/Supabase) ou em modo local (sem banco).
 * Tabela no banco: public.articles  (veja supabase/migrations/20261026000000_lba_site.sql)
 */
import { supabase, hasBackend, ARTICLE_IMAGES_BUCKET } from "@/lib/backend";
import { SEED_ARTICLES } from "@/content/artigos-seed";
import type { Article, ArticleInput } from "@/lib/types";
import type { CategorySlug } from "@/content/categorias";
import { safeStorage, slugify, uid } from "@/lib/utils";

const LOCAL_KEY = "lba:artigos:v1";

type Row = {
  id: string;
  slug: string;
  title: string;
  category: CategorySlug;
  excerpt: string | null;
  content: string | null;
  cover_url: string | null;
  author: string | null;
  published_at: string;
  status: "publicado" | "rascunho";
  created_at?: string;
  updated_at?: string;
};

const fromRow = (r: Row): Article => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  category: r.category,
  excerpt: r.excerpt ?? "",
  content: r.content ?? "",
  coverUrl: r.cover_url,
  author: r.author ?? "",
  publishedAt: r.published_at,
  status: r.status,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

const toRow = (a: ArticleInput) => ({
  slug: a.slug,
  title: a.title,
  category: a.category,
  excerpt: a.excerpt ?? "",
  content: a.content ?? "",
  cover_url: a.coverUrl || null,
  author: a.author,
  published_at: a.publishedAt,
  status: a.status,
});

const byDateDesc = (a: Article, b: Article) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

/* ---------------------------- modo local ---------------------------- */

function readLocal(): Article[] {
  const saved = safeStorage.get<Article[] | null>(LOCAL_KEY, null);
  return saved && Array.isArray(saved) ? saved : SEED_ARTICLES.map((a) => ({ ...a }));
}

function writeLocal(list: Article[]) {
  safeStorage.set(LOCAL_KEY, list);
}

/** Restaura os 9 artigos originais no modo local (apaga edições locais) */
export function resetLocalArticles() {
  safeStorage.remove(LOCAL_KEY);
}

/* ------------------------------ leitura ------------------------------ */

export type ListOptions = { category?: CategorySlug; includeDrafts?: boolean };

export async function listArticles(opts: ListOptions = {}): Promise<Article[]> {
  const filter = (list: Article[]) =>
    list
      .filter((a) => (opts.includeDrafts ? true : a.status === "publicado"))
      .filter((a) => (opts.category ? a.category === opts.category : true))
      .sort(byDateDesc);

  if (!hasBackend) return filter(readLocal());

  let query = supabase!.from("articles").select("*").order("published_at", { ascending: false });
  if (opts.category) query = query.eq("category", opts.category);
  if (!opts.includeDrafts) query = query.eq("status", "publicado");
  const { data, error } = await query;

  if (error) {
    // Banco ainda não configurado (migração não rodou)? Mostra os artigos iniciais para o site não ficar vazio.
    console.warn("[artigos] usando dados locais:", error.message);
    if (opts.includeDrafts) throw error;
    return filter(SEED_ARTICLES);
  }
  return (data as Row[]).map(fromRow);
}

export async function getArticleBySlug(slug: string, includeDrafts = false): Promise<Article | null> {
  const clean = decodeURIComponent(slug).replace(/\/+$/, "");
  if (!hasBackend) {
    const found = readLocal().find((a) => a.slug === clean);
    if (!found) return null;
    return includeDrafts || found.status === "publicado" ? found : null;
  }
  const { data, error } = await supabase!.from("articles").select("*").eq("slug", clean).maybeSingle();
  if (error) {
    console.warn("[artigos] usando dados locais:", error.message);
    return SEED_ARTICLES.find((a) => a.slug === clean) ?? null;
  }
  if (!data) return null;
  const art = fromRow(data as Row);
  return includeDrafts || art.status === "publicado" ? art : null;
}

export async function getArticleById(id: string): Promise<Article | null> {
  if (!hasBackend) return readLocal().find((a) => a.id === id) ?? null;
  const { data, error } = await supabase!.from("articles").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? fromRow(data as Row) : null;
}

/* ------------------------------ escrita ------------------------------ */

async function ensureUniqueSlug(slug: string, ignoreId?: string): Promise<string> {
  const base = slugify(slug) || "artigo";
  let candidate = base;
  for (let i = 2; i < 50; i++) {
    let taken = false;
    if (!hasBackend) {
      taken = readLocal().some((a) => a.slug === candidate && a.id !== ignoreId);
    } else {
      const { data } = await supabase!.from("articles").select("id").eq("slug", candidate).maybeSingle();
      taken = Boolean(data && (data as { id: string }).id !== ignoreId);
    }
    if (!taken) return candidate;
    candidate = `${base}-${i}`;
  }
  return `${base}-${Date.now()}`;
}

export async function saveArticle(input: ArticleInput): Promise<Article> {
  const slug = await ensureUniqueSlug(input.slug || input.title, input.id);
  const payload: ArticleInput = { ...input, slug };

  if (!hasBackend) {
    const list = readLocal();
    const now = new Date().toISOString();
    if (input.id) {
      const idx = list.findIndex((a) => a.id === input.id);
      const updated: Article = { ...(list[idx] as Article), ...payload, id: input.id, updatedAt: now };
      if (idx >= 0) list[idx] = updated;
      else list.push(updated);
      writeLocal(list);
      return updated;
    }
    const created: Article = { ...payload, id: uid("artigo"), createdAt: now, updatedAt: now } as Article;
    list.push(created);
    writeLocal(list);
    return created;
  }

  if (input.id && !input.id.startsWith("seed-")) {
    const { data, error } = await supabase!
      .from("articles")
      .update(toRow(payload))
      .eq("id", input.id)
      .select("*")
      .single();
    if (error) throw error;
    return fromRow(data as Row);
  }
  // upsert pelo slug (cobre o caso de editar um artigo inicial que ainda não estava no banco)
  const { data, error } = await supabase!
    .from("articles")
    .upsert(toRow(payload), { onConflict: "slug" })
    .select("*")
    .single();
  if (error) throw error;
  return fromRow(data as Row);
}

export async function deleteArticle(id: string): Promise<void> {
  if (!hasBackend) {
    writeLocal(readLocal().filter((a) => a.id !== id));
    return;
  }
  const { error } = await supabase!.from("articles").delete().eq("id", id);
  if (error) throw error;
}

/* ------------------------------ imagens ------------------------------ */

/** Envia uma imagem do artigo. Com banco: vai para o Storage. Sem banco: vira data URL (só para teste). */
export async function uploadArticleImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Envie um arquivo de imagem (JPG, PNG ou WebP).");
  if (file.size > 8 * 1024 * 1024) throw new Error("Imagem muito grande (máximo 8 MB).");

  if (!hasBackend) {
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Não foi possível ler a imagem."));
      reader.readAsDataURL(file);
    });
  }

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `${new Date().getFullYear()}/${uid("img")}.${ext}`;
  const { error } = await supabase!.storage
    .from(ARTICLE_IMAGES_BUCKET)
    .upload(path, file, { cacheControl: "31536000", upsert: false, contentType: file.type });
  if (error) throw error;
  const { data } = supabase!.storage.from(ARTICLE_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/** Artigo anterior/seguinte em ordem cronológica (como no site original) */
export function getNeighbors(all: Article[], current: Article) {
  const sorted = [...all].sort(byDateDesc);
  const i = sorted.findIndex((a) => a.id === current.id || a.slug === current.slug);
  return {
    newer: i > 0 ? sorted[i - 1] : null,
    older: i >= 0 && i < sorted.length - 1 ? sorted[i + 1] : null,
  };
}
