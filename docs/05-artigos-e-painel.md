# 05 — Artigos e painel de edição

## Como funciona

O site tem dois modos, escolhidos automaticamente:

| | **Modo local** (sem banco) | **Modo completo** (Lovable Cloud ligado) |
|---|---|---|
| Artigos no site | Os 9 artigos originais (`src/content/artigos-seed.ts`) | Os artigos do banco (tabela `articles`) |
| Painel `/admin` | Abre sem login; o que for salvo fica **só no navegador de quem editou** | Login por e-mail e senha; o que for salvo aparece para todo mundo |
| Imagens no texto | Ficam embutidas no navegador (só para teste) | Vão para o Storage (bucket `artigos`) |
| Formulário de contato | Monta a mensagem e oferece enviar pelo WhatsApp | Salva no banco e aparece na aba **Mensagens** do painel |

Quem decide é `src/lib/backend.ts`: se existirem as variáveis do Supabase, usa o banco.

## O painel (`/admin`)

- **Aba Artigos:** lista todos os artigos (publicados e rascunhos), com busca e filtro por categoria.
  Os artigos sem texto aparecem com o aviso "⚠ Texto ainda não colado".
- **Novo artigo / Editar:**
  - Título (o endereço é gerado sozinho a partir dele, sem acentos)
  - Texto com editor visual: título, subtítulo, negrito, itálico, sublinhado, listas, citação,
    linha, alinhamento, link e imagem
  - Status: **Publicado** (aparece no site) ou **Rascunho** (escondido)
  - Categoria (Licitações ou Agronegócio), data de publicação, autor
  - Endereço (URL), resumo para o Google e imagem de capa (opcionais)
  - Botões **Salvar rascunho** e **Publicar**; aviso se tentar sair sem salvar
- **Aba Mensagens:** mensagens do formulário com nome, tema, texto, e-mail, telefone e botão de
  WhatsApp; marcar como lida/não lida e excluir.

## Colar os textos dos 9 artigos antigos

Os títulos, datas, categorias e endereços dos 9 artigos já estão no site. Falta o **texto** de cada um:

1. Abra o artigo no site antigo (enquanto ele ainda estiver no ar) ou no arquivo original do escritório.
2. Selecione o texto do artigo e copie.
3. No site novo, entre em `/admin`, clique no artigo e cole no editor.
4. Clique em **Publicar**. O aviso "Texto ainda não colado" some.

Negritos, títulos e listas são mantidos ao colar. Imagens que estavam dentro dos artigos antigos
precisam ser enviadas de novo pelo botão de imagem do editor.

Endereços dos 9 artigos (iguais no site antigo e no novo):

| Categoria | Endereço |
|---|---|
| Licitações | `/bilhoes-em-jogo-a-alavanca-juridica-estrategica-para-contratos-de-alto-valor-em-licitacoes/` |
| Licitações | `/parcerias-publico-privadas-em-unidades-educacionais-uma-alternativa-para-reducao-de-custos-e-melhoria-na-educacao-publica/` |
| Licitações | `/receita-federal-e-monitoramento-de-transacoes-via-pix-o-que-voce-precisa-saber/` |
| Licitações | `/o-verificador-independente-escolha-estrategica-ou-obstaculo-em-contratos-de-ppp/` |
| Licitações | `/do-planejamento-a-transformacao-como-as-ppps-integram-publico-e-privado-2/` |
| Agronegócio | `/suspensao-de-embargos-ambientais-em-areas-rurais-consolidadas/` |
| Agronegócio | `/apreensao-de-veiculos-e-maquinas-locados-devido-a-infracao-ambiental/` |
| Agronegócio | `/propriedade-atingida-por-uso-irregular-de-fogo-consequencias-legais-e-medidas-de-protecao-para-o-proprietario/` |
| Agronegócio | `/prorrogacao-e-renegociacao-de-dividas-no-ambito-do-manual-de-credito-rural-mcr/` |

## Banco de dados

Arquivo: `supabase/migrations/20261026000000_lba_site.sql` (pode rodar mais de uma vez).

### Tabela `articles`
| Coluna | Tipo | Observação |
|---|---|---|
| `id` | uuid | chave |
| `slug` | text único | endereço do artigo |
| `title` | text | |
| `category` | text | `licitacoes` ou `agronegocio` |
| `excerpt` | text | resumo opcional |
| `content` | text | HTML do editor (limpo com DOMPurify antes de exibir) |
| `cover_url` | text | capa opcional |
| `author` | text | padrão "LBA Assessoria Jurídica" |
| `published_at` | timestamptz | data exibida |
| `status` | text | `publicado` ou `rascunho` |
| `created_at`, `updated_at` | timestamptz | automáticos |

### Tabela `contact_messages`
`name`, `email`, `phone`, `subject`, `message`, `consent` (precisa ser verdadeiro), `read`, `created_at`.

### Tabela `admin_emails`
E-mails que podem entrar no painel. A função `public.is_admin()` confere o e-mail de quem está logado.

### Segurança (RLS)
- Qualquer pessoa **lê** artigos publicados; só administradores veem rascunhos e criam/editam/excluem.
- Qualquer pessoa **envia** mensagem (com aceite da política); só administradores leem.
- Bucket `artigos` público para leitura; envio só por administradores.

## Criar o(s) usuário(s) do painel

1. No Lovable, abra o painel do **Cloud** → **Users / Authentication** e crie um usuário com e-mail e
   senha (ou peça ao Lovable: *"Crie um usuário de autenticação para contato@… com uma senha que eu
   vou definir"*).
2. Rode no **SQL** do Cloud (trocando o e-mail):
   ```sql
   insert into public.admin_emails (email) values ('contato@lbaassessoriajuridica.com.br')
   on conflict do nothing;
   ```
3. Acesse `seusite/admin` e entre com esse e-mail e senha.

Para mais de uma pessoa, repita com outros e-mails.

## (Opcional) Receber as mensagens do formulário por e-mail

O site antigo mandava e-mail. No novo, as mensagens ficam no painel. Para também receber por e-mail,
peça ao Lovable:

> Crie uma Edge Function que, a cada nova linha em `public.contact_messages`, envie um e-mail para
> contato@lbaassessoriajuridica.com.br com nome, e-mail, telefone, tema e mensagem, usando o Resend.
> Me diga onde colocar a chave da API do Resend.
