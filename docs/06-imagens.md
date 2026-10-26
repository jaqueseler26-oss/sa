# 06 — Imagens

Todas as imagens do site antigo, onde cada uma aparece no site novo e o nome que ela deve ter.
O código já aponta para estes caminhos; basta os arquivos existirem em `public/`.

> Enquanto um arquivo não existir, o componente mostra um degradê azul da marca no lugar
> (`SmartImage`, `bgImage` e `Logo`), então o site nunca aparece com imagem quebrada.

## Inventário

| Arquivo no projeto novo | Onde aparece | Arquivo no site antigo (tamanho original) |
|---|---|---|
| `public/images/logo/logo-branco.png` | Cabeçalho sobre o banner | `/wp-content/uploads/2020/06/Logo-Branco.png` (1125×447) |
| `public/images/logo/logo-cor.png` | Menu lateral do celular, painel /admin, imagem de compartilhamento | `/wp-content/uploads/2020/06/Logo-Cor.png` (1125×447) |
| `public/images/logo/logo-inverse.png` | Reserva (versão pequena escura) | `/wp-content/uploads/2022/01/Logo-inverse.png` (198×65) |
| `public/favicon-32.png` · `public/favicon-192.png` · `public/apple-touch-icon.png` (180) | Ícone da aba do navegador | `/wp-content/uploads/2024/04/cropped-LBA-fav2.png` (512×512) |
| `public/images/hero/slide-1.webp` | Banner principal — slide 1 ("Não aceite menos que…") | `/wp-content/uploads/2024/05/LBA-Slide-4.png` (1600×761) |
| `public/images/hero/slide-2.webp` | Banner principal — slide 2 ("Lopes, Batista & Antunes") | `/wp-content/uploads/2024/05/LBA-Slide-3.png` (1600×761) |
| `public/images/hero/slide-3.webp` | Banner principal — slide 3 ("LBA assessoria jurídica") | `/wp-content/uploads/revslider/law_office-3/image-3121.jpg` (1600×761) ⚠️ |
| `public/images/equipe/henrik-lopes.webp` | Card da equipe + página /team/henrik-lopes | `/wp-content/uploads/2020/04/LBA-Adv-Henrik.png` (1230×1500) |
| `public/images/equipe/rafael-batista.webp` | Card + /team/rafael-batista | `/wp-content/uploads/2020/04/LBA-Adv-Raafel.png` (1230×1500) |
| `public/images/equipe/thais-antunes.webp` | Card + /team/thais-antunes | `/wp-content/uploads/2020/04/LBA-Adv-Thais.png` (1230×1500) |
| `public/images/equipe/mikele-lopes.webp` | Card + /team/mikele-lopes | `/wp-content/uploads/2020/04/LBA-Adv-Mikele.png` (1230×1500) |
| `public/images/fundos/servicos.webp` | Fundo da seção "Nossos serviços" | `/wp-content/uploads/2022/01/image-10.jpg` (1600×496) |
| `public/images/fundos/cta.webp` | Fundo da faixa "Descubra como maximizar…" | `/wp-content/uploads/2022/01/image-11.jpg` (1600×300) |
| `public/images/fundos/rodape.webp` | Fundo do rodapé | `/wp-content/uploads/2021/08/footer-3.png` (1600×408) |
| `public/images/fundos/banner-paginas.jpg` | Topo das páginas internas (Artigos, categorias, artigo, equipe) | `/wp-content/uploads/2020/06/header-1.jpg` (1600×390) |
| — | Estrelas dos depoimentos | `/wp-content/uploads/2025/03/A-1080-x-1080-mm-2048x2048.png` — **substituída por estrelas desenhadas em código** (ficam nítidas em qualquer tela) |

Todos os caminhos antigos começam com `https://lbaassessoriajuridica.com.br`.

⚠️ **Slide 3:** essa imagem veio da demonstração do tema "Law Office" (pasta `revslider/law_office-3`).
Imagens de demonstração de temas costumam ter licença só para demonstração. Recomendo trocar por uma
foto própria do escritório ou de banco de imagens licenciado.

## Qualidade

- As fotos da equipe no site antigo existem em tamanho original **1230×1500** (PNG de ~2,5 MB cada).
  No site novo, use WebP com qualidade 88–90: fica visualmente idêntico e com ~200 KB.
- Os banners têm 1600×761. Se o escritório tiver as fotos originais em resolução maior
  (ex.: 2400 px de largura), use-as: o banner ocupa a tela inteira e fica ainda mais nítido em telas grandes.

## Como adicionar as imagens pelo Lovable

1. No chat do Lovable, arraste os arquivos de imagem.
2. Envie o pedido:

   > Salve estas imagens exatamente nos caminhos listados em `docs/06-imagens.md`
   > (por exemplo, a foto do Henrik em `public/images/equipe/henrik-lopes.webp`).
   > Se alguma estiver em JPG ou PNG, mantenha o arquivo e atualize a extensão no
   > `src/config/site.ts` ou no `src/content/equipe.ts`. Não mude mais nada.

## Formatos esperados pelo código

- Logos: `.png` (com fundo transparente)
- Slides, fotos da equipe e fundos: `.webp` (o banner das páginas internas é `.jpg`)
- Para trocar o formato, altere o caminho em `src/config/site.ts` (logos, slides e fundos)
  ou em `src/content/equipe.ts` (fotos dos advogados).
