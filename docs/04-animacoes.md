# 04 — Animações ("movimentações")

Todas as animações do site original foram medidas e recriadas **sem bibliotecas pesadas**
(CSS + pequenos hooks em `src/hooks/useMotion.ts`). Todas respeitam a opção de acessibilidade
"reduzir movimento" do sistema (ficam desligadas para quem pediu isso).

Curvas usadas (equivalentes às do GSAP do Slider Revolution):
- `power2.out` → `cubic-bezier(0.215, 0.61, 0.355, 1)`
- `power3.out` → `cubic-bezier(0.165, 0.84, 0.44, 1)`
- `power1.inOut` → `cubic-bezier(0.455, 0.03, 0.515, 0.955)`

## Banner principal (Slider Revolution → `HeroSlider.tsx` + `.lba-hero*`)

| Elemento | Animação | Início | Duração | Curva |
|---|---|---|---|---|
| Troca de slide | esmaecer (cross-fade) | a cada 9s | 1000ms | ease |
| Linha 1 do texto | entra da direita (50px) + aparece | 1370ms após o slide entrar | 1000ms | power2.out |
| Linha 2 do texto | idem | 1600ms | 1000ms | power2.out |
| Selo creme | revelado da esquerda para a direita (máscara) | 2190ms | 1000ms | power3.out |
| Saída das camadas | somem antes do próximo slide | fim do slide | 300ms | ease |
| Hover do selo | fundo creme → oliva escuro (azul no slide 2), texto clareia | — | 300ms | — |
| Clique no selo | rolagem suave até "Quem Somos" | — | 1000ms | power1.inOut |

Extras: pausa quando a aba não está visível; no celular dá para arrastar para trocar de slide.

## Menu ("zoom line")
- Linha de 1px embaixo do item cresce de 0 a 100% da largura em 200ms no hover.
- O item da seção visível na Home fica com a linha.

## Botão "simples" com seta (`.lba-btn-simple`, ex.: "ENTRE EM CONTATO →")
- No hover, a seta atual desliza 20px para a direita e some, e uma nova seta entra pela esquerda
  (300ms). O texto escurece.

## Cards da equipe (`useTilt` + `.lba-team-card*`)
- **Inclinação 3D** acompanhando o mouse: até 5°, perspectiva 1500px, transição 1000ms com
  `cubic-bezier(.03,.98,.52,.99)`, volta ao centro ao sair (mesmos parâmetros do vanilla-tilt original).
- **Máscara** `rgba(12,3,47,.7)` aparece sobre a foto em 300ms (atraso de 100ms).
- **Ícone do Instagram** sobe 14px e aparece no centro da foto.
- Foto aproxima 3% suavemente.
- Em telas de toque o tilt fica desligado; a máscara aparece ao tocar.

## Cards de serviço
- Sobem 8px no hover (300ms ease-out); a seta anda 6px para a direita.

## Formulário
- A linha embaixo do campo "cresce" da esquerda para a direita na cor `#35627c` ao focar (400ms).

## Links com sublinhado animado
- E-mail do rodapé: sublinhado de 2px cresce de 0 a 100% (800ms, `cubic-bezier(0.25,0.8,0.25,1)`).
- Endereço e e-mail do Contato: sublinhado de 1px cresce no hover (500ms).

## Depoimentos (Elementor Testimonial Carousel → Embla Carousel)
- 3 por vez (2 no tablet, 1 no celular), avança sozinho a cada **5s**, loop infinito, pausa com o mouse em cima.
- Setas e bolinhas; a bolinha ativa fica preta.
- **Movimento horizontal com a rolagem** (Elementor Motion Effects, velocidade 4): o carrossel
  desliza até ±40px para o lado enquanto a página rola (±20px no tablet; desligado no celular para
  não atrapalhar a leitura).

## Botão "voltar ao topo"
- Fica escondido 72px abaixo da tela e sobe para 36px do canto quando a página passa de 500px de
  rolagem (300ms). Clique → rolagem suave até o topo.

## Páginas internas
- Título do banner entra subindo levemente (fade-up); itens das listas de artigos aparecem com fade-up.
- Barras de habilidade (páginas da equipe) enchem de 0 até a % quando aparecem na tela (1,6s).

## Menu lateral do celular
- Desliza da direita (450ms, power3.out) com fundo escurecido; fecha com Esc, no X ou tocando fora.
