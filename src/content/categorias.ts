/**
 * CATEGORIAS DE ARTIGOS — iguais ao site original ("Conteúdos").
 * As URLs /licitacoes e /agronegocio foram mantidas para não perder posição no Google.
 * Para criar uma nova categoria: adicione aqui, e ela aparece no painel e na página /artigos.
 */

export type CategorySlug = "licitacoes" | "agronegocio";

export type Category = {
  slug: CategorySlug;
  label: string; // nome curto
  cardTitle: string; // título do card na página /artigos
  pageTitle: string; // título do banner da página da categoria
  description: string; // texto do card na página /artigos
  icon: "gavel" | "seedling";
};

export const CATEGORIES: Category[] = [
  {
    slug: "licitacoes",
    label: "Licitações",
    cardTitle: "Licitações",
    pageTitle: "Artigos licitações",
    description: "Entenda tudo sobre licitações com nossos artigos exclusivos.",
    icon: "gavel",
  },
  {
    slug: "agronegocio",
    label: "Agronegócio",
    cardTitle: "Agronegócio",
    pageTitle: "Artigos agronegócio",
    description: "Fique por dentro das tendências do agronegócio.",
    icon: "seedling",
  },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
