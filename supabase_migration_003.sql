-- Migration 003: Tabela de configurações globais do sistema
create table if not exists public.settings (
  key   text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.settings enable row level security;

create policy "Leitura pública settings" on public.settings
  for select using (true);

create policy "Admin gerencia settings" on public.settings
  for all using (auth.role() = 'authenticated');

-- Seed inicial
insert into public.settings (key, value) values
  ('whatsapp', '5511999999999')
on conflict (key) do nothing;
