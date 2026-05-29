-- ============================================================
-- MIGRATION 008: Criação da Seção e Preços de Vidro Watch
-- Rodar no SQL Editor do Supabase
-- ============================================================

-- 1. Inserir a nova seção Vidro Watch (caso não exista)
insert into public.assistance_sections (id, name, sort_order) values
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f6f', 'Vidro Watch', 6)
on conflict (id) do update set name = excluded.name, sort_order = excluded.sort_order;

-- 2. Remover preços anteriores de Vidro Watch para evitar duplicidade
delete from public.assistance_prices 
where section_id = 'd1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f6f';

-- 3. Inserir preços oficiais de Vidro Watch com base no print atualizado
insert into public.assistance_prices (section_id, main_model, secondary_models, price, sort_order) values
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f6f', 'Series 3', '42 / 38mm', 350.00, 1),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f6f', 'Series 4', '40 / 44mm', 370.00, 2),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f6f', 'Series 5', '40 / 44mm', 450.00, 3),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f6f', 'Series 6', '40 / 44mm', 550.00, 4),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f6f', 'Series 7', '45 / 41mm', 650.00, 5),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f6f', 'Series 8', '45 / 41mm', 650.00, 6),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f6f', 'Ultra', '49mm', 999.00, 7);
