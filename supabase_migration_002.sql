-- ============================================================
-- MIGRATION 002: categories + refatoração de products
-- Rodar no SQL Editor do Supabase
-- ============================================================

-- 1. Tabela de categorias
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  icon        text default '📦',
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.categories enable row level security;

create policy "Leitura pública categorias" on public.categories
  for select using (true);

create policy "Admin gerencia categorias" on public.categories
  for all using (auth.role() = 'authenticated');

-- 2. Seeds de categorias
insert into public.categories (name, slug, icon, sort_order) values
  ('iPhone',      'iphone',      'Smartphone', 1),
  ('Xiaomi',      'xiaomi',      'Smartphone', 2),
  ('JBL',         'jbl',         'Volume2', 3),
  ('Seminovo',    'seminovo',    'RefreshCw', 4),
  ('Game',        'game',        'Gamepad2', 5),
  ('Acessório',   'acessorio',   'Headphones', 6),
  ('Assistência', 'assistencia', 'Wrench', 7)
on conflict (slug) do nothing;


-- 3. Adicionar colunas novas na tabela products (se ainda não existirem)
alter table public.products
  add column if not exists category_id  uuid references public.categories(id) on delete set null,
  add column if not exists model        text,
  add column if not exists description  text,
  add column if not exists featured     boolean not null default false,
  add column if not exists is_active    boolean not null default true,
  add column if not exists sort_order   int     not null default 0;

-- 4. Índice para ordenação
create index if not exists idx_products_category on public.products(category_id);
create index if not exists idx_products_active   on public.products(is_active);
create index if not exists idx_products_order    on public.products(sort_order, created_at desc);
