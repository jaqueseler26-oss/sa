-- =====================================================================
-- LBA ASSESSORIA JURÍDICA — banco de dados do site
-- Cria: artigos, mensagens do formulário, lista de administradores,
--       regras de segurança (RLS) e o "bucket" de imagens dos artigos.
-- Pode ser executado mais de uma vez sem problema.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1) TABELAS
-- ---------------------------------------------------------------------

create table if not exists public.articles (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  category      text not null check (category in ('licitacoes', 'agronegocio')),
  excerpt       text not null default '',
  content       text not null default '',          -- HTML gerado pelo editor do painel
  cover_url     text,
  author        text not null default 'LBA Assessoria Jurídica',
  published_at  timestamptz not null default now(),
  status        text not null default 'rascunho' check (status in ('publicado', 'rascunho')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists articles_category_published_idx
  on public.articles (category, published_at desc);

create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 2 and 120),
  email       text not null check (char_length(email) between 5 and 160),
  phone       text not null default '' check (char_length(phone) <= 40),
  subject     text not null default '' check (char_length(subject) <= 160),
  message     text not null check (char_length(message) between 2 and 5000),
  consent     boolean not null default false,
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists contact_messages_created_idx
  on public.contact_messages (created_at desc);

-- Quem pode entrar no painel /admin (e-mails em minúsculas)
create table if not exists public.admin_emails (
  email      text primary key,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 2) FUNÇÕES
-- ---------------------------------------------------------------------

-- true se o usuário logado for administrador
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_emails a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- atualiza updated_at automaticamente
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- 3) SEGURANÇA (RLS)
-- ---------------------------------------------------------------------

alter table public.articles enable row level security;
alter table public.contact_messages enable row level security;
alter table public.admin_emails enable row level security;

-- Artigos: todo mundo lê os publicados; só admin vê rascunhos e altera
drop policy if exists "artigos_leitura" on public.articles;
create policy "artigos_leitura" on public.articles
  for select using (status = 'publicado' or public.is_admin());

drop policy if exists "artigos_insert_admin" on public.articles;
create policy "artigos_insert_admin" on public.articles
  for insert to authenticated with check (public.is_admin());

drop policy if exists "artigos_update_admin" on public.articles;
create policy "artigos_update_admin" on public.articles
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "artigos_delete_admin" on public.articles;
create policy "artigos_delete_admin" on public.articles
  for delete to authenticated using (public.is_admin());

-- Mensagens: qualquer visitante envia (com aceite da política); só admin lê/edita/apaga
drop policy if exists "mensagens_insert_publico" on public.contact_messages;
create policy "mensagens_insert_publico" on public.contact_messages
  for insert to anon, authenticated with check (consent = true and read = false);

drop policy if exists "mensagens_select_admin" on public.contact_messages;
create policy "mensagens_select_admin" on public.contact_messages
  for select to authenticated using (public.is_admin());

drop policy if exists "mensagens_update_admin" on public.contact_messages;
create policy "mensagens_update_admin" on public.contact_messages
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "mensagens_delete_admin" on public.contact_messages;
create policy "mensagens_delete_admin" on public.contact_messages
  for delete to authenticated using (public.is_admin());

-- Lista de admins: só admin consegue ver (inclusões são feitas pelo SQL, ver passo 6)
drop policy if exists "admins_select_admin" on public.admin_emails;
create policy "admins_select_admin" on public.admin_emails
  for select to authenticated using (public.is_admin());

-- ---------------------------------------------------------------------
-- 4) IMAGENS DOS ARTIGOS (Storage)
-- ---------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('artigos', 'artigos', true)
on conflict (id) do nothing;

drop policy if exists "artigos_imagens_leitura" on storage.objects;
create policy "artigos_imagens_leitura" on storage.objects
  for select using (bucket_id = 'artigos');

drop policy if exists "artigos_imagens_upload_admin" on storage.objects;
create policy "artigos_imagens_upload_admin" on storage.objects
  for insert to authenticated with check (bucket_id = 'artigos' and public.is_admin());

drop policy if exists "artigos_imagens_update_admin" on storage.objects;
create policy "artigos_imagens_update_admin" on storage.objects
  for update to authenticated using (bucket_id = 'artigos' and public.is_admin());

drop policy if exists "artigos_imagens_delete_admin" on storage.objects;
create policy "artigos_imagens_delete_admin" on storage.objects
  for delete to authenticated using (bucket_id = 'artigos' and public.is_admin());

-- ---------------------------------------------------------------------
-- 5) OS 9 ARTIGOS DO SITE ANTIGO (mesmos títulos, datas e endereços)
--    O texto de cada um é colado depois pelo painel /admin.
-- ---------------------------------------------------------------------

insert into public.articles (slug, title, category, published_at, status) values
  ('bilhoes-em-jogo-a-alavanca-juridica-estrategica-para-contratos-de-alto-valor-em-licitacoes',
   'Bilhões em Jogo: A Alavanca Jurídica Estratégica para Contratos de Alto Valor em Licitações',
   'licitacoes', '2025-04-30 12:00:00+00', 'publicado'),
  ('parcerias-publico-privadas-em-unidades-educacionais-uma-alternativa-para-reducao-de-custos-e-melhoria-na-educacao-publica',
   'Parcerias Público-Privadas em Unidades Educacionais. Uma alternativa para redução de custos e melhoria na educação pública.',
   'licitacoes', '2025-03-13 12:00:00+00', 'publicado'),
  ('receita-federal-e-monitoramento-de-transacoes-via-pix-o-que-voce-precisa-saber',
   'Receita Federal e Monitoramento de Transações via PIX: O que Você Precisa Saber',
   'licitacoes', '2025-01-06 12:00:00+00', 'publicado'),
  ('o-verificador-independente-escolha-estrategica-ou-obstaculo-em-contratos-de-ppp',
   'O verificador independente: Escolha estratégica ou obstáculos de PPP?',
   'licitacoes', '2024-12-13 12:00:00+00', 'publicado'),
  ('do-planejamento-a-transformacao-como-as-ppps-integram-publico-e-privado-2',
   'Do planejamento á transformação: Como as PPPS integram público e privado.',
   'licitacoes', '2024-12-12 12:00:00+00', 'publicado'),
  ('suspensao-de-embargos-ambientais-em-areas-rurais-consolidadas',
   'Suspensão de embargos ambientais em Áreas Rurais Consolidadas',
   'agronegocio', '2025-04-07 12:00:00+00', 'publicado'),
  ('apreensao-de-veiculos-e-maquinas-locados-devido-a-infracao-ambiental',
   'Apreensão de veículos e máquinas locados devido a infração ambiental.',
   'agronegocio', '2025-02-17 12:00:00+00', 'publicado'),
  ('propriedade-atingida-por-uso-irregular-de-fogo-consequencias-legais-e-medidas-de-protecao-para-o-proprietario',
   'Propriedade Atingida por Uso Irregular de Fogo: Consequências Legais e Medidas de Proteção para o Proprietário',
   'agronegocio', '2025-01-22 12:00:00+00', 'publicado'),
  ('prorrogacao-e-renegociacao-de-dividas-no-ambito-do-manual-de-credito-rural-mcr',
   'Prorrogação e Renegociação de Dívidas no Âmbito do Manual de Crédito Rural (MCR)',
   'agronegocio', '2025-01-03 12:00:00+00', 'publicado')
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------
-- 6) ADMINISTRADORES — troque pelo(s) e-mail(s) de quem vai usar o painel
--    (a pessoa também precisa ter uma conta criada em Authentication → Users)
-- ---------------------------------------------------------------------

-- insert into public.admin_emails (email) values ('contato@lbaassessoriajuridica.com.br') on conflict do nothing;
