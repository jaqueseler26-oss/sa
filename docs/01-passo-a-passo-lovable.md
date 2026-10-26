# 01 — Passo a passo no Lovable

Há dois caminhos. O **Caminho A** é o recomendado: o Lovable recebe o site pronto, idêntico ao que
foi testado. O **Caminho B** só serve se você quiser que o Lovable construa tudo do zero.

---

## Caminho A — Enviar o código pronto (recomendado)

O Lovable não conecta um repositório GitHub que já existe; ele importa o código por **arquivo ZIP**.

### 1. Baixar o ZIP do GitHub
1. Abra `https://github.com/jaqueseler26-oss/sa`.
2. Clique no botão verde **Code** → **Download ZIP**.

### 2. Importar no Lovable
1. No Lovable, crie um projeto novo usando a opção de **enviar/importar código** (*Upload code*) e
   selecione o ZIP.
2. Espere o Lovable abrir a prévia. O site já funciona em "modo local" (artigos originais visíveis,
   painel salvando só no navegador).

### 3. Dar as instruções do projeto ao Lovable
Abra **Project settings → Knowledge** (conhecimento/instruções do projeto) e cole:

```
Este projeto é a recriação fiel do site da LBA Assessoria Jurídica.
Antes de qualquer alteração, leia LOVABLE.md e a pasta docs/.
Regras:
- Não mude o visual nem as animações sem eu pedir; o design copia o site original.
- Textos ficam em src/content/*.ts e dados de contato em src/config/site.ts.
- Cores e fontes: use as variáveis --lba-* (src/index.css) e as cores lba-* do Tailwind.
- Mantenha os endereços (rotas) existentes; eles são iguais aos do site antigo.
- Responda e escreva textos sempre em português do Brasil.
```

### 4. Ligar o banco de dados (para o painel funcionar de verdade)
No chat do Lovable, envie:

```
Ative o Lovable Cloud neste projeto. Depois:
1) Execute a migração supabase/migrations/20261026000000_lba_site.sql inteira.
2) Faça src/lib/backend.ts usar o cliente do Cloud: substitua o conteúdo por
   import { supabase as cloud } from "@/integrations/supabase/client";
   export const supabase = cloud;
   export const hasBackend = true;
   export const ARTICLE_IMAGES_BUCKET = "artigos";
3) Não altere mais nada no visual.
```

### 5. Criar o seu acesso ao painel
Siga a seção "Criar o(s) usuário(s) do painel" em `docs/05-artigos-e-painel.md`
(criar o usuário e adicionar o e-mail em `admin_emails`).

### 6. Colocar as imagens
Arraste as imagens no chat do Lovable e use o pedido pronto de `docs/06-imagens.md`.

### 7. Colar o texto dos artigos
Entre em `/admin` e cole o texto de cada um dos 9 artigos (veja `docs/05-artigos-e-painel.md`).

### 8. (Opcional) Conectar ao GitHub e publicar com o domínio
- Em **GitHub**, o Lovable cria um repositório novo e sincroniza nos dois sentidos.
- Em **Publish/Domains**, publique e aponte `lbaassessoriajuridica.com.br` para o Lovable
  (o DNS do domínio precisa ser alterado no registro.br ou onde o domínio estiver).

---

## Caminho B — Pedir para o Lovable construir do zero

Use o texto de `docs/07-prompt-recriar-do-zero.md` como primeira mensagem de um projeto novo e anexe
os arquivos de `src/content/` e `src/index.css` deste repositório. O resultado tende a ficar
parecido, mas **não idêntico** — por isso o Caminho A é o recomendado.

---

## Testes rápidos depois de importar

- [ ] A Home mostra o banner com o selo creme e as duas linhas entrando em sequência
- [ ] Passar o mouse nas fotos da equipe inclina o card e mostra o Instagram
- [ ] Os cards de serviço sobem no hover
- [ ] O formulário mostra erros se enviado vazio
- [ ] Os depoimentos trocam sozinhos a cada 5s
- [ ] `/artigos`, `/licitacoes` e `/agronegocio` abrem
- [ ] `/receita-federal-e-monitoramento-de-transacoes-via-pix-o-que-voce-precisa-saber/` abre o artigo
- [ ] `/team/henrik-lopes` abre a página do advogado com as barras animadas
- [ ] `/admin` abre o painel
