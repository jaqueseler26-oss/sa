import type { CategorySlug } from "@/content/categorias";

export type ArticleStatus = "publicado" | "rascunho";

export type Article = {
  id: string;
  slug: string;
  title: string;
  category: CategorySlug;
  /** Resumo curto (opcional) — usado em compartilhamentos e no Google */
  excerpt: string;
  /** Conteúdo em HTML (gerado pelo editor do painel) */
  content: string;
  /** Imagem de capa (opcional) */
  coverUrl: string | null;
  author: string;
  /** Data de publicação em ISO (ex.: 2025-04-30T12:00:00.000Z) */
  publishedAt: string;
  status: ArticleStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type ArticleInput = Omit<Article, "id" | "createdAt" | "updatedAt"> & { id?: string };

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
  read: boolean;
  createdAt: string;
};

export type ContactMessageInput = Omit<ContactMessage, "id" | "createdAt" | "read">;
