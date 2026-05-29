-- ============================================================
-- MIGRATION 009: Atualização dos Preços de Reparos em Placa
-- Rodar no SQL Editor do Supabase
-- ============================================================

-- 1. Remover preços anteriores de Reparos em Placa para evitar duplicidade
delete from public.assistance_prices 
where section_id = 'd1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d';

-- 2. Inserir preços oficiais de Reparos em Placa com base no print atualizado
insert into public.assistance_prices (section_id, main_model, secondary_models, price, sort_order) values
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 7', '7 plus, 8, 8 plus', 150.00, 1),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone x', 'xs, xr, xs max', 200.00, 2),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 11', null, 300.00, 3),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 11 pro', '11 pro max', 400.00, 4),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 12', '12 pro', 699.00, 5),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 12 pro max', null, 900.00, 6),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 13', '13 pro', 999.00, 7),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 13 pro max', null, 1299.00, 8),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 14', null, 1100.00, 9),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 14 pro', '14 pro max', 1500.00, 10),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 15', null, 1200.00, 11),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 15 pro', '15 pro max', 1800.00, 12),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f4d', 'iPhone 16', '16 pro, 16 pro max', 2000.00, 13);
