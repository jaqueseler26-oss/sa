# Imagens do site

Coloque aqui as imagens com **exatamente estes nomes e pastas**. Enquanto uma imagem não existir,
o site mostra um fundo azul elegante no lugar (nada aparece quebrado).

```
public/images/
├── logo/
│   ├── logo-branco.png      ← logo branco (cabeçalho sobre o banner)          1125×447
│   ├── logo-cor.png         ← logo colorido (menu lateral, painel, WhatsApp)  1125×447
│   └── logo-inverse.png     ← logo pequeno escuro (reserva)                   198×65
├── hero/
│   ├── slide-1.webp         ← banner 1 (foto da equipe com o logo)            1600×761 ou maior
│   ├── slide-2.webp         ← banner 2                                         1600×761 ou maior
│   └── slide-3.webp         ← banner 3                                         1600×761 ou maior
├── equipe/
│   ├── henrik-lopes.webp    ← fotos verticais                                  1230×1500
│   ├── rafael-batista.webp
│   ├── thais-antunes.webp
│   └── mikele-lopes.webp
└── fundos/
    ├── servicos.webp        ← fundo claro da seção "Nossos serviços"          1600×496
    ├── cta.webp             ← fundo escuro da faixa "Descubra como..."        1600×300
    ├── rodape.webp          ← fundo do rodapé                                  1600×408
    └── banner-paginas.jpg   ← fundo do topo das páginas internas              1600×390

public/favicon-32.png, public/favicon-192.png, public/apple-touch-icon.png  ← ícone da aba (quadrado)
```

Se a imagem estiver em JPG ou PNG em vez de WebP, tudo bem: salve com o nome certo e ajuste a
extensão em `src/config/site.ts` (logos, banners e fundos) ou `src/content/equipe.ts` (fotos).

A lista completa, com o endereço de cada imagem no site antigo, está em `docs/06-imagens.md`.
