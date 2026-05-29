-- Rodar no SQL Editor do Supabase

-- 1. Tabela de produtos
create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  condition    text,
  style        text not null default 'style-1',
  image_url    text,
  bg_image_url text,
  warranty     text,
  whatsapp     text,
  variants     jsonb not null default '[]',
  created_at   timestamptz not null default now()
);

-- 2. Acesso público para leitura (catálogo visível a todos)
alter table public.products enable row level security;

create policy "Leitura pública" on public.products
  for select using (true);

create policy "Admin pode inserir" on public.products
  for insert with check (auth.role() = 'authenticated');

create policy "Admin pode atualizar" on public.products
  for update using (auth.role() = 'authenticated');

create policy "Admin pode deletar" on public.products
  for delete using (auth.role() = 'authenticated');

-- 3. Bucket de imagens (criar manualmente no Storage ou via SQL)
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict do nothing;

create policy "Upload autenticado" on storage.objects
  for insert with check (bucket_id = 'product-images' AND auth.role() = 'authenticated');

create policy "Leitura pública storage" on storage.objects
  for select using (bucket_id = 'product-images');
