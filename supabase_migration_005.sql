-- ============================================================
-- MIGRATION 005: Assistência Técnica com Seções Pré-Cadastradas
-- Rodar no SQL Editor do Supabase
-- ============================================================

-- Dropar tabelas anteriores para evitar conflito de colunas da estrutura antiga
drop table if exists public.assistance_prices cascade;

-- 1. Criar Tabela de Seções de Assistência (se não existir)
create table if not exists public.assistance_sections (
  id           uuid primary key default gen_random_uuid(),
  name         text not null unique, -- ex: 'Tela', 'Bateria'
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);

-- 2. Criar Tabela de Preços de Assistência vinculada à Seção
create table if not exists public.assistance_prices (
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

-- Seeds iniciais para Seções
insert into public.assistance_sections (name, sort_order) values
  ('Tela', 1),
  ('Bateria', 2),
  ('Vidro Traseiro', 3),
  ('Reparos em Placa', 4),
  ('Xiaomi', 5)
on conflict (name) do nothing;

-- Capturar IDs das seções para popular os preços de demonstração
do $$
declare
  sec_tela    uuid;
  sec_bateria uuid;
  sec_vidro   uuid;
begin
  select id into sec_tela    from public.assistance_sections where name = 'Tela' limit 1;
  select id into sec_bateria from public.assistance_sections where name = 'Bateria' limit 1;
  select id into sec_vidro   from public.assistance_sections where name = 'Vidro Traseiro' limit 1;

  -- Seeds iniciais para Preços vinculados
  if sec_tela is not null then
    insert into public.assistance_prices (section_id, main_model, secondary_models, price, sort_order) values
      (sec_tela, 'iPhone 6', '6s, 6s plus, 6 plus', 149.00, 1),
      (sec_tela, 'iPhone 7', '8', 179.00, 2),
      (sec_tela, 'iPhone 7 plus', '8 plus', 220.00, 3)
    on conflict do nothing;
  end if;

  if sec_bateria is not null then
    insert into public.assistance_prices (section_id, main_model, secondary_models, price, sort_order) values
      (sec_bateria, 'iPhone XR', 'XS Max, XS', 250.00, 1),
      (sec_bateria, 'iPhone 11', '11 Pro', 290.00, 2)
    on conflict do nothing;
  end if;
end $$;
