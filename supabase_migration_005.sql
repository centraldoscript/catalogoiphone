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
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 5', '5s, 5c, SE', 149.00, 1),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 6', null, 160.00, 2),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 6s', null, 180.00, 3),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 6 Plus', null, 200.00, 4),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 6s Plus', null, 220.00, 5),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 7', null, 200.00, 6),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 7 Plus', null, 230.00, 7),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 8', null, 200.00, 8),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 8 Plus', null, 250.00, 9),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone SE 2020', null, 200.00, 10),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone XR', null, 380.00, 11),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone X', null, 420.00, 12),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone XS', null, 420.00, 13),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone XS Max', null, 550.00, 14),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 11', null, 420.00, 15),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 11 Pro', null, 650.00, 16),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 11 Pro Max', null, 800.00, 17),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 12 / 12 Pro', null, 750.00, 18),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 12 Mini', null, 750.00, 19),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 12 Pro Max', null, 1200.00, 20),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 13 Mini', null, 900.00, 21),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 13', null, 1050.00, 22),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 13 Pro', null, 1900.00, 23),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 13 Pro Max', null, 2100.00, 24),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 14', null, 1100.00, 25),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 14 Plus', null, 1300.00, 26),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 14 Pro', null, 2100.00, 27),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 14 Pro Max', null, 2300.00, 28),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 15', null, 1800.00, 29),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 15 Plus', null, 2100.00, 30),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 15 Pro', null, 2500.00, 31),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f1a', 'iPhone 15 Pro Max', null, 2800.00, 32);

-- Seeds oficiais para Preços (Bateria)
insert into public.assistance_prices (section_id, main_model, secondary_models, price, sort_order) values
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 5', '5s, 5c, SE', 120.00, 1),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 6', '6s', 130.00, 2),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 6 Plus', '6s Plus', 140.00, 3),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 7', '8, SE 2', 140.00, 4),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 7 Plus', '8 Plus', 150.00, 5),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone X', 'XS, XR', 180.00, 6),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone XS Max', null, 200.00, 7),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 11', null, 220.00, 8),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 11 Pro', '11 Pro Max', 250.00, 9),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 12 / 12 Pro', '12 Mini, 12 Pro Max', 290.00, 10),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 13 / 13 Mini', '13 Pro, 13 Pro Max', 350.00, 11),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 14 / 14 Plus', '14 Pro, 14 Pro Max', 450.00, 12),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b', 'iPhone 15 / 15 Plus', '15 Pro, 15 Pro Max', 550.00, 13);

-- Seeds oficiais para Preços (Vidro Traseiro)
insert into public.assistance_prices (section_id, main_model, secondary_models, price, sort_order) values
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 8', null, 190.00, 1),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 8 Plus', null, 220.00, 2),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone XR', null, 220.00, 3),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone X', 'XS', 220.00, 4),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone XS Max', null, 250.00, 5),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 11', null, 250.00, 6),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 11 Pro', null, 290.00, 7),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 11 Pro Max', null, 320.00, 8),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 12', '12 Mini', 350.00, 9),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 12 Pro', '12 Pro Max', 390.00, 10),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 13', '13 Mini', 390.00, 11),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 13 Pro', '13 Pro Max', 490.00, 12),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 14', '14 Plus', 450.00, 13),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 14 Pro', '14 Pro Max', 690.00, 14),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 15', '15 Plus', 490.00, 15),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 15 Pro', '15 Pro Max', 790.00, 16);

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
