-- ============================================================
-- MIGRATION 006: Atualização dos Preços de Bateria
-- Rodar no SQL Editor do Supabase
-- ============================================================

-- 1. Remover preços anteriores de Bateria para evitar duplicidade
delete from public.assistance_prices 
where section_id = 'd1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f2b';

-- 2. Inserir preços oficiais de Bateria com base no print atualizado
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
