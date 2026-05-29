-- Migration 004: Adicionar configurações de posicionamento da imagem do produto
alter table public.products
  add column if not exists image_settings jsonb not null default '{"width": 80, "x": 0, "y": 0, "rotate": 0}';
