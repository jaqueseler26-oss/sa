/** Hooks (React Query) para ler e salvar artigos — usados nas páginas e no painel */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteArticle,
  getArticleById,
  getArticleBySlug,
  listArticles,
  saveArticle,
  type ListOptions,
} from "@/lib/articles";
import type { ArticleInput } from "@/lib/types";

export const articleKeys = {
  all: ["artigos"] as const,
  list: (opts: ListOptions) => ["artigos", "lista", opts] as const,
  slug: (slug: string, drafts: boolean) => ["artigos", "slug", slug, drafts] as const,
  id: (id: string) => ["artigos", "id", id] as const,
};

export function useArticles(opts: ListOptions = {}) {
  return useQuery({
    queryKey: articleKeys.list(opts),
    queryFn: () => listArticles(opts),
    staleTime: 60_000,
  });
}

export function useArticle(slug: string | undefined, includeDrafts = false) {
  return useQuery({
    queryKey: articleKeys.slug(slug ?? "", includeDrafts),
    queryFn: () => getArticleBySlug(slug!, includeDrafts),
    enabled: Boolean(slug),
    staleTime: 60_000,
  });
}

export function useArticleById(id: string | undefined) {
  return useQuery({
    queryKey: articleKeys.id(id ?? ""),
    queryFn: () => getArticleById(id!),
    enabled: Boolean(id),
  });
}

export function useSaveArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ArticleInput) => saveArticle(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: articleKeys.all }),
  });
}

export function useDeleteArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteArticle(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: articleKeys.all }),
  });
}
