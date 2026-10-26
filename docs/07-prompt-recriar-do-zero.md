# 07 — Prompt para o Lovable recriar do zero (Caminho B)

> Use só se NÃO for importar o código pronto. Cole o texto abaixo como primeira mensagem de um
> projeto novo no Lovable e **anexe** estes arquivos do repositório: `src/content/home.ts`,
> `src/content/equipe.ts`, `src/content/categorias.ts`, `src/content/artigos-seed.ts`,
> `src/config/site.ts` e `src/index.css`. Depois envie as imagens (veja `06-imagens.md`).

---

```
Crie o site institucional do escritório "LBA Assessoria Jurídica" (Lopes, Batista & Antunes), de Jaru – RO,
como uma réplica fiel de um site WordPress que será desativado. Stack: React + Vite + TypeScript + Tailwind.
Todo o site em português do Brasil.

USE OS ARQUIVOS ANEXADOS COMO FONTE ÚNICA:
- Textos: content/home.ts, content/equipe.ts, content/categorias.ts, content/artigos-seed.ts (copie literalmente)
- Contatos, menu e caminhos das imagens: config/site.ts
- Cores, tipografia, medidas e animações: index.css (use as variáveis --lba-* e as classes .lba-*)

TIPOGRAFIA: títulos em "EB Garamond" MAIÚSCULAS (H1 57px, H2 47px), corpo em "Lato" 18px/1.62 cor #5a6a93,
depoimentos em "Actor" 19px. Subtítulos pequenos em Lato 14px, maiúsculas, espaçamento 0.15em.
CONTAINER: 1100px de conteúdo (1290px acima de 1440px de largura).

ROTAS (iguais ao site antigo): / , /artigos , /licitacoes , /agronegocio , /:slug (artigo) , /team/:slug ,
/politica-de-privacidade , /admin (painel). Página 404 para o resto.

HOME, nesta ordem:
1) Cabeçalho transparente sobre o banner: logo branco + menu (HOME, QUEM SOMOS, SERVIÇOS, ARTIGOS, CONTATO) em
   EB Garamond 12px negrito branco, com linha fina que cresce embaixo no hover. Não fixo. No celular: logo,
   link "→ Conteúdos" e botão que abre painel lateral (logo colorido, menu, Instagram, WhatsApp, telefones, e-mail).
2) Banner em tela cheia com 3 slides (troca a cada 9s, esmaecer de 1s). Em cada slide, a ~46% da altura: à
   esquerda do centro um "selo" creme #f1f5ed com a ponta direita inclinada (clip-path polygon(0 0,85% 0,100% 100%,0 100%)),
   texto Lato 16px negrito espaçado (linha pequena opcional 12px #41413f), cor #88865a (slide 2: #6277c1);
   à direita do centro duas linhas EB Garamond 24px maiúsculas brancas, a 2ª com recuo de 30px.
   Animações a cada slide: linha 1 entra da direita 50px aos 1,37s, linha 2 aos 1,6s (1s, ease-out),
   selo revelado da esquerda para a direita aos 2,19s. Clique no selo rola até a equipe.
3) #QuemSomos "Nosso time de / ESPECIALISTAS": topo em 3 partes (título | parágrafo #8290c2 | "ENTRE EM CONTATO →"),
   4 cards com foto vertical 570x696, nome EB Garamond 24px, "Advogado - OAB/RO ..." 12px #597992.
   Hover: inclinação 3D (máx 5°, perspectiva 1500px), máscara rgba(12,3,47,.7) com ícone do Instagram.
4) #Servicos "Um pouco dos / NOSSOS SERVIÇOS": fundo claro com imagem, faixa branca 50% atrás do título,
   3 cards (fundos #2e4a74, #09183e e branco) com ícone de linha (banco, aperto de mão, pena), título 28px,
   texto 17px e seta; sobem 8px no hover; os cards ultrapassam 90px a borda de baixo da seção.
5) Linha divisória fina.
6) #Contato: à esquerda "CONTATO / Alguma dúvida? Fale conosco!", texto, endereço, telefone em negrito, e-mail;
   à direita formulário com linha de 2px #bdd1e6 embaixo de cada campo (cresce em #35627c ao focar), ícone à
   esquerda: Nome, Endereço de Email, Telefone, Tema, Mensagem, botão "ENVIAR" #194768 com aviãozinho e
   caixa "Eu concordo com os termos da política de privacidade".
7) Faixa escura com foto e película #373737 40%: "Descubra como maximizar suas chances de vencer licitações"
   + botão "FALE CONOSCO" #5a7888 (WhatsApp).
8) Faixa #f1f5ed "O que dizem os / NOSSOS CLIENTES" e carrossel em fundo #e5e9dd: 3 cards brancos por vez,
   5 estrelas azuis, texto Actor #0d2742, nome em Times New Roman; autoplay 5s, loop, setas e bolinhas.
9) Rodapé #242353 com imagem: título grande "Assessoria Jurídica personalizada | resultados excepcionais",
   colunas Endereço (Instagram, WhatsApp) e Contato, linha, menu e "© ano – LBA Assessoria Jurídica. Todos os
   direitos reservados."
10) Botão redondo #242304 "voltar ao topo" que sobe do canto ao rolar.

PÁGINAS INTERNAS: banner com imagem, título central branco 50px e seta dourada #88865a.
- /artigos: 2 blocos (martelo "LICITAÇÕES", broto "AGRONEGÓCIO") com descrição e botão "SAIBA MAIS".
- /licitacoes e /agronegocio: lista com seta, "ARTIGOS / mês dia, ano", título Lato 30px preto e "Saiba Mais".
- Artigo: banner com categoria, título e autor/data; texto; compartilhar; anterior/próximo; relacionados.
- /team/:slug: foto, cargo/OAB, nome, 3 barras de habilidade animadas, biografia, e-mail e telefone.

PAINEL /admin (com Lovable Cloud): login por e-mail e senha só para e-mails da tabela admin_emails; lista de
artigos (busca, filtro, status), editor visual (TipTap) com título, texto, categoria, data, autor, URL,
resumo, capa, rascunho/publicado; aba "Mensagens" com o que chega pelo formulário.
Banco: tabelas articles, contact_messages, admin_emails com RLS (leitura pública só de publicados).
Os 9 artigos de content/artigos-seed.ts devem existir com os mesmos endereços.

Respeite prefers-reduced-motion. Site 100% responsivo (celular, tablet, desktop).
```
