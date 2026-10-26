# 08 — Pendências e itens para o escritório confirmar

## Para deixar o site completo
- [ ] **Imagens**: colocar os arquivos em `public/images` (lista em `06-imagens.md`).
- [ ] **Texto dos 9 artigos**: colar pelo painel `/admin` (passo a passo em `05-artigos-e-painel.md`).
- [ ] **Lovable Cloud**: ativar e rodar a migração (passo 4 de `01-passo-a-passo-lovable.md`).
- [ ] **Usuário do painel**: criar e adicionar o e-mail em `admin_emails`.
- [ ] **Domínio**: apontar `lbaassessoriajuridica.com.br` para o novo site (DNS).

## Para o escritório confirmar
- [ ] **Segundo telefone** — `(69) 99993-2904` aparecia só no painel lateral das páginas internas do site
      antigo. Ainda é usado? (Para esconder: `phoneSecondary: null` em `src/config/site.ts`.)
- [ ] **Política de privacidade** — a página não existia no site antigo (o link estava quebrado).
      Foi criada uma minuta com base na LGPD em `src/pages/Privacidade.tsx`; revisar o texto.
- [ ] **Imagem do slide 3** — veio da demonstração do tema WordPress; confirmar a licença ou trocar.
- [ ] **Biografia do Rafael** — cita uma "Formação Complementar abaixo" que não existia no site antigo.
      Enviar a lista ou ajustar a frase em `src/content/equipe.ts`.
- [ ] **Links dos cards de serviço** — no original apontavam para "#". Hoje levam ao formulário de contato
      (`SERVICES[].href` em `src/content/home.ts`). Se preferir, podem levar às categorias de artigos.
- [ ] **Aviso por e-mail das mensagens** — opcional (ver final de `05-artigos-e-painel.md`).
- [ ] **Sitemap** — ao publicar artigos novos, incluir as URLs em `public/sitemap.xml`
      (ou pedir ao Lovable para gerar o sitemap automaticamente a partir do banco).
