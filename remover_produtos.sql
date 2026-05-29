-- ============================================================
-- REMOVE SEED DE PRODUTOS (PRESERVA OS 2 MAIS ANTIGOS)
-- Cole e execute este script no SQL Editor do Supabase
-- ============================================================

DELETE FROM products 
WHERE id NOT IN (
  SELECT id 
  FROM products 
  ORDER BY created_at ASC 
  LIMIT 2
);
