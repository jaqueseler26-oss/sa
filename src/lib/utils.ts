import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Junta classes do Tailwind sem conflito (padrão dos projetos Lovable/shadcn) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Gera um "slug" de URL a partir de um título: "Licitações & PPP" -> "licitacoes-ppp" */
export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " e ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 140);
}

/** Remove tags HTML (para resumo/meta description) */
export function stripHtml(html: string) {
  if (!html) return "";
  return html
    .replace(/<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Gera um id simples (usado no modo local, sem banco) */
export function uid(prefix = "id") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Acesso seguro ao localStorage (pode falhar em aba anônima ou com cookies bloqueados) */
export const safeStorage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: unknown) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove(key: string) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignora */
    }
  },
};
