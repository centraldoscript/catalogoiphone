-- ============================================================
-- MIGRATION 005: Assistência Técnica com Seções Pré-Cadastradas
-- Rodar no SQL Editor do Supabase
-- ============================================================

-- Dropar tabelas anteriores para evitar conflito de colunas da estrutura antiga
drop table if exists public.assistance_prices cascade;
drop table if exists public.assistance_sections cascade;

-- 1. Criar Tabela de Seções de Assistência
create table public.assistance_sections (
  id           uuid primary key default gen_random_uuid(),
  name         text not null unique, -- ex: 'Tela', 'Bateria'
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);

-- 2. Criar Tabela de Preços de Assistência vinculada à Seção
create table public.assistance_prices (
  id               uuid primary key default gen_random_uuid(),
  section_id       uuid not null references public.assistance_sections(id) on delete cascade,
  main_model       text not null,
  secondary_models text,
  price            numeric(10,2) not null,
  sort_order       int not null default 0,
  created_at       timestamptz not null default now()
);

-- Habilitar RLS
alter table public.assistance_sections enable row level security;
alter table public.assistance_prices enable row level security;

-- Políticas de segurança para seções
create policy "Leitura pública secoes" on public.assistance_sections
  for select using (true);

create policy "Admin gerencia secoes" on public.assistance_sections
  for all using (auth.role() = 'authenticated');

-- Políticas de segurança para preços
create policy "Leitura pública preços" on public.assistance_prices
  for select using (true);

create policy "Admin gerencia preços" on public.assistance_prices
  for all using (auth.role() = 'authenticated');

-- Seeds oficiais para Seções
insert into public.assistance_sections (id, name, sort_order) values
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'Tela', 1),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'Bateria', 2),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'Vidro Traseiro', 3),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'Reparos em Placa', 4),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f5e', 'Xiaomi', 5)
on conflict (id) do update set name = excluded.name, sort_order = excluded.sort_order;

-- Seeds oficiais para Preços (Tela)
insert into public.assistance_prices (section_id, main_model, secondary_models, price, sort_order) values
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 6', '6s, 6s plus, 6 plus', 149.00, 1),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 7', '8', 179.00, 2),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 7 plus', '8 plus', 220.00, 3),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone x', 'xs, xr', 330.00, 4),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone xs max', null, 430.00, 5),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 11', null, 330.00, 6),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone pro', null, 430.00, 7),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 11 pro max', null, 480.00, 8),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 12', '12 pro', 530.00, 9),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 12 pro max', null, 720.00, 10),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 13', null, 650.00, 11),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 13 pro', '13 pro max', 999.00, 12),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 14', '14 plus', 849.00, 13),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 14 pro', '14 pro max', 1799.00, 14),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 15', '15 plus', 1499.00, 15),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 15 pro', null, 1700.00, 16),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 15 pro max', null, 2399.00, 17),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 15 pro max (original)', null, 2999.00, 18),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 16', null, 1899.00, 19),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 16 pro', null, 1999.00, 20),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 16 pro max', null, 2800.00, 21);

-- Seeds oficiais para Preços (Bateria)
insert into public.assistance_prices (section_id, main_model, secondary_models, price, sort_order) values
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 6', '6s, 6s plus, 6 plus', 149.00, 1),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 7', '8', 140.00, 2),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 7 plus', '8 plus', 169.00, 3),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone x', 'xs, xr, xs max', 199.00, 4),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 11', '11 pro, 11 pro max', 249.00, 5),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 12', '12 pro, 12 pro max', 269.00, 6),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 13', '13 pro, 13 pro max', 349.00, 7),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 14', '14 plus, 14 pro, 14 pro max', 399.00, 8),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 15', '15 plus, 15 pro, 15 pro max', 450.00, 9),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 16', '16 pro, 16 pro max', 500.00, 10);

-- Seeds oficiais para Preços (Vidro Traseiro)
insert into public.assistance_prices (section_id, main_model, secondary_models, price, sort_order) values
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 8', '8 plus, x, xr, xs, xs max', 170.00, 1),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 11', '11 pro, 11 pro max', 200.00, 2),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 12', '12 pro, 12 pro max', 270.00, 3),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 13', '13 pro, 13 pro max', 300.00, 4),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 14', '14 plus, 14 pro, 14 pro max', 350.00, 5),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 15', '15 pro, 15 plus, 15 pro max', 400.00, 6),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 16', '16 plus, 16 pro, 16 pro max', 500.00, 7);

-- Seeds oficiais para Preços (Reparos em Placa)
insert into public.assistance_prices (section_id, main_model, secondary_models, price, sort_order) values
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 7', '7 Plus', 290.00, 1),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 8', '8 Plus', 320.00, 2),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone XR', null, 350.00, 3),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone X', 'XS', 390.00, 4),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone XS Max', null, 420.00, 5),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 11', null, 450.00, 6),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 11 Pro', null, 490.00, 7),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 11 Pro Max', null, 550.00, 8),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 12', '12 Pro', 690.00, 9),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 12 Mini', null, 590.00, 10),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 12 Pro Max', null, 790.00, 11),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 13', null, 890.00, 12),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 13 Pro', null, 1100.00, 13),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 13 Pro Max', null, 1200.00, 14);
