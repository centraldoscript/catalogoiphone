-- ============================================================
-- MIGRATION 007: Atualização dos Preços de Vidro Traseiro
-- Rodar no SQL Editor do Supabase
-- ============================================================

-- 1. Remover preços anteriores de Vidro Traseiro para evitar duplicidade
delete from public.assistance_prices 
where section_id = 'd1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c';

-- 2. Inserir preços oficiais de Vidro Traseiro com base no print atualizado
insert into public.assistance_prices (section_id, main_model, secondary_models, price, sort_order) values
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 8', '8 plus, x, xr, xs, xs max', 170.00, 1),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 11', '11 pro, 11 pro max', 200.00, 2),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 12', '12 pro, 12 pro max', 270.00, 3),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 13', '13 pro, 13 pro max', 300.00, 4),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 14', '14 plus, 14 pro, 14 pro max', 350.00, 5),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 15', '15 pro, 15 plus, 15 pro max', 400.00, 6),
  ('d1f5e8f4-6a2c-4b5a-9e7d-1c3b5a7e9f3c', 'iPhone 16', '16 plus, 16 pro, 16 pro max', 500.00, 7);
