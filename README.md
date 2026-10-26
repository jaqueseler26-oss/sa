# LBA Assessoria Jurídica — site novo

Recriação fiel do site **lbaassessoriajuridica.com.br** (Lopes, Batista & Antunes — Jaru/RO),
pronta para rodar no **Lovable**, com área de artigos e painel para escrever e publicar.

- Mesmo layout, textos, cores, fontes e animações do site original (medidos no site antigo)
- Mesmos endereços de páginas e artigos (não perde o Google)
- Painel `/admin` com editor visual de artigos e caixa de mensagens do formulário
- Responsivo (celular, tablet e desktop) e acessível (respeita "reduzir movimento")

## Começar no Lovable (resumo)

1. GitHub → **Code → Download ZIP** deste repositório.
2. Lovable → novo projeto → **enviar código (Upload code)** → selecione o ZIP.
3. Cole as instruções do projeto (Knowledge) que estão em `docs/01-passo-a-passo-lovable.md`.
4. Peça ao Lovable para **ativar o Lovable Cloud** com o texto pronto do passo 4 do mesmo arquivo.
5. Envie as imagens (lista em `docs/06-imagens.md`) e cole o texto dos artigos pelo `/admin`.

Passo a passo completo: **[`docs/01-passo-a-passo-lovable.md`](docs/01-passo-a-passo-lovable.md)**
Guia técnico para a IA do Lovable: **[`LOVABLE.md`](LOVABLE.md)**

## Páginas

| Endereço | Conteúdo |
|---|---|
| `/` | Home: banner com 3 slides, equipe, serviços, contato, CTA, depoimentos |
| `/artigos` | Conteúdos (categorias Licitações e Agronegócio) |
| `/licitacoes` · `/agronegocio` | Lista de artigos |
| `/<endereço-do-artigo>` | Artigo |
| `/team/<advogado>` | Página de cada advogado(a) |
| `/politica-de-privacidade` | Política de privacidade (minuta) |
| `/admin` | Painel de conteúdo |

## Onde editar

| O quê | Arquivo |
|---|---|
| Telefone, e-mail, endereço, WhatsApp, Instagram | `src/config/site.ts` |
| Textos da Home | `src/content/home.ts` |
| Advogados (bio, OAB, habilidades, fotos) | `src/content/equipe.ts` |
| Categorias de artigos | `src/content/categorias.ts` |
| Artigos | pelo painel `/admin` |
| Cores e fontes | `src/index.css` (variáveis `--lba-*`) |

## Rodar no computador (opcional, para desenvolvedores)

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # gera a pasta dist/
```

## Pendências

Veja [`docs/08-pendencias.md`](docs/08-pendencias.md): imagens, texto dos artigos, ativação do banco,
usuário do painel e itens para o escritório confirmar (segundo telefone, política de privacidade etc.).
