# LOVABLE.md — guia do projeto para a IA do Lovable

> **Lovable: leia este arquivo inteiro antes de qualquer alteração.**
> Este projeto é a recriação fiel do site da **LBA Assessoria Jurídica** (lbaassessoriajuridica.com.br),
> feito a pedido dos donos, que perderam o acesso ao WordPress antigo. O visual, os textos, as cores,
> as fontes e as animações foram medidos no site original — **não "melhore" o design por conta própria**.

## Stack (padrão Lovable)

- React 18 + Vite 5 + TypeScript + Tailwind CSS 3 (alias `@` → `src/`, porta 8080, `lovable-tagger`)
- React Router 6 · TanStack Query · Embla Carousel (depoimentos) · TipTap (editor do painel)
- Supabase / **Lovable Cloud** (opcional — o site funciona sem, em "modo local")
- Fontes via `@fontsource` (EB Garamond, Lato, Actor) importadas em `src/main.tsx`
- Ícones: `lucide-react` (linhas) e `react-icons` (marcas)

## Onde fica cada coisa

```
src/
├── config/site.ts          ← telefone, e-mail, endereço, WhatsApp, Instagram, menu, caminhos das imagens
├── content/
│   ├── home.ts             ← TODOS os textos da Home (slides, equipe, serviços, contato, CTA, depoimentos, rodapé)
│   ├── equipe.ts           ← advogados: nome, OAB, Instagram, foto, habilidades (%), biografia
│   ├── categorias.ts       ← categorias de artigos (Licitações, Agronegócio)
│   └── artigos-seed.ts     ← os 9 artigos do site antigo (usados sem banco e como reserva)
├── index.css               ← design system: variáveis --lba-*, classes .lba-* e animações
├── components/
│   ├── layout/             ← Header, MobilePanel, Footer, PageBanner, ScrollToTop, SmartLink, ScrollManager
│   ├── home/               ← HeroSlider, TeamSection, ServicesSection, ContactSection, ContactForm, CtaSection, TestimonialsSection
│   ├── articles/           ← ShareButtons
│   ├── admin/              ← AdminShell, LoginForm, RichTextEditor, MessagesList
│   └── ui/                 ← SmartImage (imagem com reserva), Logo, SectionTitle, Icons
├── hooks/                  ← useMotion (tilt 3D, parallax, in-view, título da aba), useArticles (React Query)
├── lib/                    ← backend (Supabase), articles, messages, auth, scroll, format, utils, types
└── pages/                  ← Index, Artigos, Categoria, Artigo, Equipe, Privacidade, NotFound, admin/*
supabase/migrations/        ← SQL do banco (tabelas, RLS, bucket e os 9 artigos)
docs/                       ← especificação completa (design, seções, animações, painel, imagens)
public/images/              ← imagens do site (ver public/images/LEIA-ME.md)
```

## Regras para alterações

1. **Textos** → editar em `src/content/*.ts` (nunca escrever texto direto nos componentes).
2. **Contatos e links** → `src/config/site.ts`.
3. **Cores/fontes** → usar as variáveis `--lba-*` ou as cores Tailwind `lba-*`. Não introduzir paleta nova.
4. **Rotas** → manter as existentes; elas reproduzem os endereços do site antigo (bom para o Google).
   A rota `/:slug` (artigos) fica por último, antes do `*`.
5. **Imagens** → sempre em `public/images/...` com os nomes de `docs/06-imagens.md`.
   Use `SmartImage`/`bgImage`/`Logo` para não haver imagem quebrada.
6. **Animações** → respeitar `prefers-reduced-motion` (já tratado em `index.css` e nos hooks).
7. **Conteúdo dos artigos** → HTML salvo pelo editor; sempre exibir com `DOMPurify.sanitize`.
8. Escrever tudo em **português do Brasil**.
9. Não adicionar shadcn/ui ou outras bibliotecas visuais para seções que já existem.

## Ativar o banco de dados (Lovable Cloud)

Quando o usuário pedir para ativar o banco/painel:

1. Ativar o **Lovable Cloud**.
2. Executar `supabase/migrations/20261026000000_lba_site.sql` **inteiro** (é idempotente).
3. Trocar o conteúdo de `src/lib/backend.ts` por:
   ```ts
   import { supabase as cloud } from "@/integrations/supabase/client";
   export const supabase = cloud;
   export const hasBackend = true;
   export const ARTICLE_IMAGES_BUCKET = "artigos";
   ```
   (Se o Cloud expuser `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`, o arquivo atual já funciona
   sem mudança — ele detecta as variáveis sozinho.)
4. Criar o usuário de autenticação do escritório e inserir o e-mail dele:
   `insert into public.admin_emails (email) values ('<email>') on conflict do nothing;`
5. Testar: `/admin` → login → editar um artigo → publicar → abrir `/<slug>`.

## Pedidos prontos (o usuário pode copiar e colar)

- **Trocar telefone/e-mail/endereço:** "Altere o telefone para (69) 9xxxx-xxxx em `src/config/site.ts`."
- **Novo advogado:** "Adicione em `src/content/equipe.ts` a advogada Fulana de Tal, OAB/RO 00.000,
  Instagram …, foto em `public/images/equipe/fulana-de-tal.webp`, habilidades … e biografia …;
  na Home a grade continua com o mesmo estilo."
- **Nova categoria de artigos:** "Crie a categoria 'Direito Ambiental' (slug `direito-ambiental`) em
  `src/content/categorias.ts`, com rota própria igual a `/licitacoes`, inclua no CHECK da coluna
  `category` do banco e no seletor do editor."
- **Sitemap automático:** "Gere o `sitemap.xml` a partir dos artigos publicados no banco."
- **E-mail das mensagens:** ver final de `docs/05-artigos-e-painel.md`.

## Documentação detalhada

| Arquivo | Conteúdo |
|---|---|
| `docs/01-passo-a-passo-lovable.md` | Como importar, ativar o banco e testar |
| `docs/02-design-system.md` | Cores, tipografia, grade e componentes (valores medidos) |
| `docs/03-paginas-e-secoes.md` | Todas as páginas e seções + diferenças intencionais |
| `docs/04-animacoes.md` | Todas as animações com tempos e curvas |
| `docs/05-artigos-e-painel.md` | Painel, banco, segurança, colar artigos antigos |
| `docs/06-imagens.md` | Inventário de imagens (origem → destino) |
| `docs/07-prompt-recriar-do-zero.md` | Prompt para reconstruir do zero (alternativa) |
| `docs/08-pendencias.md` | O que falta e o que o escritório precisa confirmar |
