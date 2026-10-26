# 03 — Páginas e seções

Mapa completo do site, na mesma ordem e com os mesmos endereços do site original.
Os **textos** ficam em `src/content/` (um arquivo por assunto) — os componentes só cuidam do visual.

## Rotas

| Endereço | Página | Arquivo |
|---|---|---|
| `/` | Home | `src/pages/Index.tsx` |
| `/artigos` | "Conteúdos" (categorias) | `src/pages/Artigos.tsx` |
| `/licitacoes` | Lista de artigos de Licitações | `src/pages/Categoria.tsx` |
| `/agronegocio` | Lista de artigos de Agronegócio | `src/pages/Categoria.tsx` |
| `/:slug` | Artigo (ex.: `/receita-federal-e-monitoramento-de-transacoes-via-pix-o-que-voce-precisa-saber/`) | `src/pages/Artigo.tsx` |
| `/team/:slug` | Página de cada advogado(a) | `src/pages/Equipe.tsx` |
| `/politica-de-privacidade` | Política de privacidade (minuta nova) | `src/pages/Privacidade.tsx` |
| `/admin` | Painel: artigos e mensagens | `src/pages/admin/Admin.tsx` |
| `/admin/artigos/novo`, `/admin/artigos/:id` | Editor de artigo | `src/pages/admin/EditorArtigo.tsx` |
| qualquer outro | 404 | `src/pages/NotFound.tsx` |

Os endereços dos artigos e das páginas da equipe são **idênticos** aos do WordPress antigo, para
manter os links do Google e de quem já compartilhou.

## Home (`/`) — de cima para baixo

### 1. Cabeçalho (sobre o banner) — `components/layout/Header.tsx`
- Transparente, por cima do banner, 20px de respiro. **Não** fica fixo ao rolar (igual ao original).
- Logo branco (53px de altura) + menu logo ao lado: HOME · QUEM SOMOS · SERVIÇOS · ARTIGOS · CONTATO.
- Itens com âncora rolam suavemente até a seção. O item da seção visível fica sublinhado.
- Celular/tablet (< 1024px): logo + link "→ CONTEÚDOS" (como no original) + botão de menu que abre
  um painel lateral com logo colorido, menu, Instagram, WhatsApp, telefones e e-mail.

### 2. Banner principal (`#home`) — `components/home/HeroSlider.tsx` · textos em `HERO_SLIDES`
- Tela cheia (100% da altura), 3 slides com foto de fundo, troca a cada 9s com esmaecimento.
- Composição de cada slide: uma faixa horizontal a ~46% da altura. À esquerda do centro, o **selo
  creme** com a ponta direita inclinada; à direita do centro, **duas linhas** em maiúsculas
  (a segunda com recuo de 30px).
- Clique no selo → rola até "Quem Somos".
- Slide 2 tem o selo com texto azul; os outros, dourado.

### 3. Equipe — "Nosso time de ESPECIALISTAS" (`#QuemSomos`) — `TeamSection.tsx` · `src/content/equipe.ts`
- Linha de topo em 3 partes: subtítulo + título à esquerda, parágrafo no meio, botão
  "ENTRE EM CONTATO →" à direita (abre o WhatsApp).
- 4 cards: foto vertical, nome (maiúsculas) e "Advogado - OAB/RO 0000".
- Hover: inclinação 3D + máscara escura com o ícone do Instagram. Clique → `/team/<slug>`.

### 4. Serviços — "Um pouco dos NOSSOS SERVIÇOS" (`#Servicos`) — `ServicesSection.tsx` · `SERVICES`
- Fundo claro com imagem; faixa branca translúcida (50%) atrás do título.
- 3 cards: azul (Licitações), azul-escuro (Direito Agrário) e branco (Direito Ambiental), cada um
  com ícone de linha, título, descrição e seta. Sobem 8px no hover.
- Os cards "vazam" 90px para baixo, por cima da linha divisória (como no original).
- O link dos cards está em `SERVICES[].href` (no original era "#"; aqui leva ao Contato).

### 5. Linha divisória — `DividerSection`
- 1px cinza claro entre Serviços e Contato.

### 6. Contato — "Alguma dúvida? Fale conosco!" (`#Contato`) — `ContactSection.tsx`, `ContactForm.tsx`
- Coluna esquerda: subtítulo "CONTATO", título H1, texto, endereço (abre o Google Maps), telefone
  em negrito, e-mail.
- Coluna direita: formulário com linha embaixo de cada campo e ícone à esquerda:
  Nome · E-mail · Telefone (com máscara) · Tema · Mensagem · botão "ENVIAR" com aviãozinho ·
  caixa "Eu concordo com os termos da política de privacidade".
- Validação em português, campo anti-robô invisível.
- Envio: com banco → salva e aparece no painel; sem banco → mostra botão para mandar pelo WhatsApp.

### 7. CTA — "Descubra como maximizar suas chances de vencer licitações" — `CtaSection.tsx`
- Foto escura de fundo com película de 40%; título branco à esquerda (2/3) e botão
  "FALE CONOSCO" à direita (abre o WhatsApp).

### 8. Depoimentos — "O que dizem os NOSSOS CLIENTES" — `TestimonialsSection.tsx` · `TESTIMONIALS`
- Faixa creme com subtítulo e título centralizados.
- Carrossel em fundo verde-acinzentado: 3 cards brancos por vez, 5 estrelas azuis, texto e nome.
- Troca sozinho, setas nas laterais, bolinhas embaixo; desliza levemente para o lado ao rolar a página.

### 9. Rodapé — `components/layout/Footer.tsx`
- Fundo azul-marinho com imagem; título grande "Assessoria Jurídica personalizada | resultados
  excepcionais"; colunas Endereço (com Instagram e WhatsApp) e Contato (e-mail com sublinhado
  animado + telefone); linha; menu + "© ano – LBA Assessoria Jurídica. Todos os direitos reservados."
- O ano é automático.

### 10. Botão "voltar ao topo" — `ScrollToTop.tsx`
- Círculo escuro de 45px que sobe do canto inferior direito ao rolar a página.

## Páginas internas

Todas começam com o **banner interno** (`PageBanner.tsx`): imagem `banner-paginas.jpg`, título
central grande em maiúsculas e a pequena seta dourada para baixo.

- **/artigos ("Conteúdos")**: dois blocos centralizados — ícone de martelo + "LICITAÇÕES" e ícone de
  broto + "AGRONEGÓCIO", cada um com descrição, contagem de artigos e botão "SAIBA MAIS".
- **/licitacoes e /agronegocio**: lista com seta à esquerda, linha "ARTIGOS / data", título grande e
  "Saiba Mais", separados por linhas. Ordem: mais recente primeiro.
- **Artigo**: banner com categoria, título e "Por autor · data"; texto do artigo (ou aviso, se o texto
  ainda não foi colado); botões de compartilhar (WhatsApp, Facebook, X, LinkedIn, e-mail, copiar link);
  anterior/próximo; "Você também pode gostar" (2 artigos da mesma categoria).
- **Equipe (/team/…)**: foto grande, botões Instagram e "Falar com…", cargo/OAB, nome, 3 barras de
  habilidade animadas (mesmas % do original), minibiografia, caixa com e-mail e telefone e
  "Conheça também" com os outros três.
- **Política de privacidade**: texto novo (minuta LGPD) — revisar antes de publicar.
- **404**: mensagem e botões para a Home e para os artigos.

## Diferenças intencionais em relação ao original

| Original | Site novo | Motivo |
|---|---|---|
| Cards da página "licitacoes"/"agronegocio" com 2 links trocados (o card "Bilhões em Jogo" abria outro artigo, idem "Suspensão de embargos") | Cada card abre o artigo certo | Correção de erro |
| Link da política de privacidade quebrado (página não existia) | Página nova com minuta LGPD | O formulário exige o aceite |
| Comentários do WordPress e "Likes" no artigo, com textos em inglês | Removidos; compartilhar com WhatsApp e LinkedIn | Escritório de advocacia não precisa de comentários públicos |
| "© 2024" fixo | Ano automático | Manutenção |
| Menu escondido no celular | Painel lateral com menu, telefones e redes | Navegação no celular |
| Estrelas dos depoimentos eram uma imagem | Estrelas desenhadas em código | Nitidez em qualquer tela |
| Formulário enviava e-mail pelo WordPress | Salva no banco e aparece no painel (+ opção WhatsApp) | Funciona sem servidor de e-mail; ver `05-artigos-e-painel.md` para aviso por e-mail |
