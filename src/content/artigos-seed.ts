/**
 * ARTIGOS INICIAIS — os 9 artigos que existiam no site original.
 *
 * Títulos, datas, categorias e endereços (slugs) são os mesmos do site antigo,
 * para que os links já indexados no Google continuem funcionando
 * (ex.: lbaassessoriajuridica.com.br/receita-federal-e-monitoramento-de-transacoes-via-pix-o-que-voce-precisa-saber/).
 *
 * O TEXTO de cada artigo deve ser colado pelo painel /admin (botão "Editar").
 * Enquanto o texto estiver vazio, a página do artigo mostra um aviso discreto.
 *
 * Com o Lovable Cloud ligado, estes dados vão para o banco pela migração
 * supabase/migrations/20261026000000_lba_site.sql e este arquivo passa a servir só de reserva.
 */
import type { Article } from "@/lib/types";
import { SITE } from "@/config/site";

const base = {
  content: "",
  excerpt: "",
  coverUrl: null,
  author: SITE.defaultAuthor,
  status: "publicado" as const,
};

export const SEED_ARTICLES: Article[] = [
  // ---------- LICITAÇÕES ----------
  {
    ...base,
    id: "seed-bilhoes-em-jogo",
    slug: "bilhoes-em-jogo-a-alavanca-juridica-estrategica-para-contratos-de-alto-valor-em-licitacoes",
    title: "Bilhões em Jogo: A Alavanca Jurídica Estratégica para Contratos de Alto Valor em Licitações",
    category: "licitacoes",
    publishedAt: "2025-04-30T12:00:00.000Z",
  },
  {
    ...base,
    id: "seed-ppp-unidades-educacionais",
    slug: "parcerias-publico-privadas-em-unidades-educacionais-uma-alternativa-para-reducao-de-custos-e-melhoria-na-educacao-publica",
    title:
      "Parcerias Público-Privadas em Unidades Educacionais. Uma alternativa para redução de custos e melhoria na educação pública.",
    category: "licitacoes",
    publishedAt: "2025-03-13T12:00:00.000Z",
  },
  {
    ...base,
    id: "seed-receita-federal-pix",
    slug: "receita-federal-e-monitoramento-de-transacoes-via-pix-o-que-voce-precisa-saber",
    title: "Receita Federal e Monitoramento de Transações via PIX: O que Você Precisa Saber",
    category: "licitacoes",
    publishedAt: "2025-01-06T12:00:00.000Z",
  },
  {
    ...base,
    id: "seed-verificador-independente",
    slug: "o-verificador-independente-escolha-estrategica-ou-obstaculo-em-contratos-de-ppp",
    title: "O verificador independente: Escolha estratégica ou obstáculos de PPP?",
    category: "licitacoes",
    publishedAt: "2024-12-13T12:00:00.000Z",
  },
  {
    ...base,
    id: "seed-planejamento-transformacao-ppps",
    slug: "do-planejamento-a-transformacao-como-as-ppps-integram-publico-e-privado-2",
    title: "Do planejamento á transformação: Como as PPPS integram público e privado.",
    category: "licitacoes",
    publishedAt: "2024-12-12T12:00:00.000Z",
  },

  // ---------- AGRONEGÓCIO ----------
  {
    ...base,
    id: "seed-suspensao-embargos",
    slug: "suspensao-de-embargos-ambientais-em-areas-rurais-consolidadas",
    title: "Suspensão de embargos ambientais em Áreas Rurais Consolidadas",
    category: "agronegocio",
    publishedAt: "2025-04-07T12:00:00.000Z",
  },
  {
    ...base,
    id: "seed-apreensao-veiculos",
    slug: "apreensao-de-veiculos-e-maquinas-locados-devido-a-infracao-ambiental",
    title: "Apreensão de veículos e máquinas locados devido a infração ambiental.",
    category: "agronegocio",
    publishedAt: "2025-02-17T12:00:00.000Z",
  },
  {
    ...base,
    id: "seed-uso-irregular-fogo",
    slug: "propriedade-atingida-por-uso-irregular-de-fogo-consequencias-legais-e-medidas-de-protecao-para-o-proprietario",
    title:
      "Propriedade Atingida por Uso Irregular de Fogo: Consequências Legais e Medidas de Proteção para o Proprietário",
    category: "agronegocio",
    publishedAt: "2025-01-22T12:00:00.000Z",
  },
  {
    ...base,
    id: "seed-credito-rural-mcr",
    slug: "prorrogacao-e-renegociacao-de-dividas-no-ambito-do-manual-de-credito-rural-mcr",
    title: "Prorrogação e Renegociação de Dívidas no Âmbito do Manual de Crédito Rural (MCR)",
    category: "agronegocio",
    publishedAt: "2025-01-03T12:00:00.000Z",
  },
];
