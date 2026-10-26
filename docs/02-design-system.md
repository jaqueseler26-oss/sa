# 02 — Design system (medido no site original)

Valores extraídos do site antigo (tema WordPress "Law Office" + Elementor) com inspeção do
navegador (`getComputedStyle`). Estão implementados como variáveis CSS em `src/index.css`
(`--lba-*`) e como cores do Tailwind em `tailwind.config.ts` (`lba-*`).

## Tipografia

| Uso | Fonte | Tamanho / altura de linha | Peso | Outros |
|---|---|---|---|---|
| Corpo do texto | **Lato** | 18px / 1.62 (29,16px) | 400 | letter-spacing 0.1px · cor `#5a6a93` |
| H1 (ex.: "Alguma dúvida? Fale conosco!") | **EB Garamond** | 57px / 1 | 400 | MAIÚSCULAS · letter-spacing 1.4px |
| H2 (ex.: "Especialistas") | EB Garamond | 47px / 1.02 | 400 | MAIÚSCULAS |
| Nome nos cards da equipe (H4) | EB Garamond | 24px / 1.2 | 500 | MAIÚSCULAS |
| Título dos cards de serviço | EB Garamond | 28px / 1.2 | 400 | MAIÚSCULAS |
| H6 do rodapé ("Endereço") | EB Garamond | 19px / 1 | 500 | MAIÚSCULAS |
| Subtítulo ("NOSSO TIME DE") | Lato | 14px | 400 | MAIÚSCULAS · letter-spacing 0.15em · margem inferior 15.4px |
| Menu | EB Garamond | 12px / 18px | 700 | MAIÚSCULAS · letter-spacing 0.5px · padding 9.6px |
| Botões | Lato | 12px | 700 | MAIÚSCULAS · letter-spacing 0.26em (3.12px) |
| Texto dos depoimentos | **Actor** | 19px / 25px | 400 | cor `#0d2742` |
| Nome nos depoimentos | Times New Roman | 16px | 400 | cor `#000` |
| Linhas do banner | EB Garamond | 24px / 28px | 400 | MAIÚSCULAS · letter-spacing 2px · branco |

As fontes são carregadas pelo próprio site via pacotes `@fontsource` (em `src/main.tsx`),
sem depender do Google Fonts.

Responsivo: corpo 17px abaixo de 1280px e 16px abaixo de 768px; H1 48→36px, H2 40→32px.

## Cores

### Esquema claro (padrão do corpo)
| Token | Hex | Uso |
|---|---|---|
| `--lba-ink` | `#242304` | Títulos, botão "voltar ao topo" |
| `--lba-text` | `#5a6a93` | Texto |
| `--lba-soft` | `#8290c2` | Parágrafo da seção Equipe, subtítulo de Serviços |
| `--lba-link` | `#194768` | Links, ícones de contato, botão "Enviar" |
| `--lba-link-hover` | `#253262` | Hover de links/botões |
| `--lba-steel` | `#597992` | Cargo/OAB nos cards |
| `--lba-indigo` | `#2b396a` | Subtítulo "Nosso time de" |

### Esquema padrão (Serviços / Clientes)
| Token | Hex | Uso |
|---|---|---|
| `--lba-navy` | `#0d1f59` | Títulos "Nossos serviços", "Nossos clientes" |
| `--lba-navy-2` | `#2e4a74` | Card "Licitações" |
| `--lba-navy-3` | `#09183e` | Card "Direito Agrário" e ícone/título do card branco |
| `--lba-navy-4` | `#0b436f` | Texto do card branco "Direito Ambiental" |
| `--lba-royal` | `#102e88` | Subtítulo "O que dizem os" |
| `--lba-royal-2` | `#6278c5` | Texto "Converse agora mesmo…" |
| `--lba-paper` | `#f9f9f9` | Fundo da seção Serviços |

### Dourado / creme (detalhes)
| Token | Hex | Uso |
|---|---|---|
| `--lba-olive` | `#88865a` | Texto do selo do banner, seta das páginas internas |
| `--lba-olive-dark` | `#5d5c39` | Fundo do selo no hover |
| `--lba-olive-ink` | `#41413f` | Linha pequena do selo |
| `--lba-cream` | `#f1f5ed` | Fundo do selo e da seção "Nossos clientes" |
| `--lba-cream-2` | `#f2f2e2` | Texto do selo no hover |
| `--lba-sage` | `#e5e9dd` | Fundo do carrossel de depoimentos |
| `--lba-royal-btn` | `#6277c1` | Texto do selo azul (slide 2), hover `#3c59c1` |

### Esquema escuro (CTA / rodapé)
| Token | Hex | Uso |
|---|---|---|
| `--lba-footer` | `#242353` | Fundo do rodapé |
| `--lba-slate` | `#5a7888` | Botão "Fale conosco" (hover `#2d4e7f`) |
| `--lba-footer-text` | `#b4b6b9` | Texto do rodapé |
| `--lba-footer-copy` | `#d2d3d5` | Copyright |
| `--lba-footer-link` | `#e3eef2` | E-mail do rodapé (sublinhado animado) |
| CTA | `#373737` a 40% | Película sobre a foto da faixa CTA |

### Formulário
| Token | Hex | Uso |
|---|---|---|
| `--lba-input-line` | `#bdd1e6` | Linha de 2px embaixo dos campos |
| `--lba-input-focus` | `#35627c` | Linha que "cresce" ao focar |
| `--lba-input-text` | `#416195` | Texto e ícones dos campos |

### Outros
- Máscara sobre as fotos da equipe no hover: `rgba(12, 3, 47, 0.7)`
- Linhas divisórias: `rgba(150, 150, 140, 0.19)` (`#96968C30`)
- Estrelas dos depoimentos: `#1d4fb8`

## Grade e espaçamentos

| Item | Valor |
|---|---|
| Largura do conteúdo | **1100px** (container 1130px com 15px de respiro) em telas 1280–1439px; **1290px** acima de 1440px |
| Abaixo de 1280px | 100% com 40px de margem lateral (20px no celular) |
| Espaço entre seções | 100px ("huge spacer" do tema) |
| Grade da equipe | 4 colunas, 30px de espaço (2 colunas no tablet e no celular) |
| Foto da equipe | proporção 570×696 |
| Cards de serviço | 3 colunas de 347px, 29px de espaço, padding 79.2px 43.2px, altura mínima 531px, "vazam" 90px para a seção seguinte |
| Contato | 2 colunas iguais |
| CTA | 2/3 título + 1/3 botão, altura 414px |
| Depoimentos | 3 por vez, 26px de espaço; card branco com padding 20px e altura ~400px |
| Rodapé | colunas 55% / 22,5% / 22,5% |

## Componentes (classes em `src/index.css`)

| Classe | O que é |
|---|---|
| `.lba-container` | Container com as larguras acima |
| `.lba-subtitle`, `.lba-h1`, `.lba-h2` | Tipografia de seção |
| `.lba-btn` (+ `--slate`, `--normal`) | Botão sólido |
| `.lba-btn-simple` | Botão de texto com seta que troca no hover ("ENTRE EM CONTATO →") |
| `.lba-header`, `.lba-menu` | Cabeçalho transparente e menu com linha que cresce |
| `.lba-hero*` | Banner (slider) |
| `.lba-team*`, `.lba-team-card*` | Seção e cards da equipe |
| `.lba-services*`, `.lba-service*` | Seção e cards de serviço |
| `.lba-contact*`, `.lba-form*`, `.lba-field*`, `.lba-consent` | Contato e formulário |
| `.lba-cta*` | Faixa escura com botão |
| `.lba-clients-intro`, `.lba-testimonials*`, `.lba-testi*` | Depoimentos |
| `.lba-footer*` | Rodapé |
| `.lba-to-top` | Botão "voltar ao topo" |
| `.lba-banner*` | Banner das páginas internas |
| `.lba-cat-card*`, `.lba-post-item*`, `.lba-prose` | Páginas de artigos |
| `.lba-skill*` | Barras de habilidade das páginas da equipe |

## Ícones

Ícones de linha da biblioteca **lucide-react** (mesmo traço fino dos ícones do tema original):
`Landmark` (Licitações), `Handshake` (Direito Agrário), `Feather` (Direito Ambiental), `MapPin`,
`Smartphone`, `Mail`, `Gavel`, `Sprout`, `ChevronRight`, etc.
Marcas (Instagram, WhatsApp, Facebook, X, LinkedIn) vêm de **react-icons**.
