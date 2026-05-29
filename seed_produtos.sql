-- ============================================================
-- SEED DE PRODUTOS - LAG iPhones
-- Cole e execute este script no SQL Editor do Supabase
-- ============================================================

-- Captura os IDs das categorias em variáveis temporárias
DO $$
DECLARE
  cat_iphone    uuid;
  cat_xiaomi    uuid;
  cat_jbl       uuid;
  cat_game      uuid;
BEGIN

  SELECT id INTO cat_iphone    FROM categories WHERE slug = 'iphone'    LIMIT 1;
  SELECT id INTO cat_xiaomi    FROM categories WHERE slug = 'xiaomi'     LIMIT 1;
  SELECT id INTO cat_jbl       FROM categories WHERE slug = 'jbl'        LIMIT 1;
  SELECT id INTO cat_game      FROM categories WHERE slug = 'game'       LIMIT 1;

  -- ── IPHONES SEMINOVOS ────────────────────────────────────────
  INSERT INTO products (name, condition, category_id, style, warranty, variants, featured, is_active, sort_order, image_settings) VALUES
  ('iPhone 17 Air',    'Seminovo', cat_iphone, 'style-1', 'Garantia até Dezembro', '[{"size":"256GB","price":"R$ 7.499"}]'::jsonb, false, true, 1, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 17 Pro',    'Seminovo', cat_iphone, 'style-1', 'Garantia até Dezembro', '[{"size":"256GB","price":"R$ 6.999"}]'::jsonb, false, true, 2, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 17',        'Seminovo', cat_iphone, 'style-1', '', '[{"size":"256GB","price":"R$ 5.299"},{"size":"128GB","price":"R$ 4.850"}]'::jsonb, false, true, 3, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 16 e',      'Seminovo', cat_iphone, 'style-1', '', '[{"size":"128GB","price":"R$ 3.186"}]'::jsonb, false, true, 4, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 16',        'Seminovo', cat_iphone, 'style-1', '', '[{"size":"128GB","price":"R$ 3.819","note":"Opção A"},{"size":"128GB","price":"R$ 3.749","note":"Opção B"}]'::jsonb, false, true, 5, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 15 Pro Max','Seminovo', cat_iphone, 'style-1', '', '[{"size":"256GB","price":"R$ 5.549"}]'::jsonb, false, true, 6, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 15 Pro Max','SemiBasic',cat_iphone, 'style-1', 'Marcas de uso', '[{"size":"256GB","price":"R$ 3.999"}]'::jsonb, false, true, 7, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 15 Pro',    'Seminovo', cat_iphone, 'style-1', '', '[{"size":"256GB","price":"R$ 3.699"},{"size":"128GB","price":"R$ 3.449"}]'::jsonb, false, true, 8, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 15 Plus',   'Seminovo', cat_iphone, 'style-1', '', '[{"size":"256GB","price":"R$ 2.949"},{"size":"128GB","price":"R$ 2.699"}]'::jsonb, false, true, 9, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 15',        'Seminovo', cat_iphone, 'style-1', '', '[{"size":"512GB","price":"R$ 4.849"},{"size":"256GB","price":"R$ 4.049"},{"size":"128GB","price":"R$ 3.349","note":"Opção A"},{"size":"128GB","price":"R$ 3.149","note":"Opção B"}]'::jsonb, false, true, 10, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 14 Pro Max','SemiBasic',cat_iphone, 'style-1', 'Marcas de uso', '[{"size":"256GB","price":"R$ 2.899"}]'::jsonb, false, true, 11, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 14 Pro',    'SemiBasic',cat_iphone, 'style-1', '', '[{"size":"128GB","price":"R$ 2.499"}]'::jsonb, false, true, 12, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 14',        'Seminovo', cat_iphone, 'style-1', '', '[{"size":"256GB","price":"R$ 2.499"},{"size":"128GB","price":"R$ 2.449"}]'::jsonb, false, true, 13, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 13 Pro Max','SemiBasic',cat_iphone, 'style-1', 'Mancha pequena na tela', '[{"size":"128GB","price":"R$ 2.499"}]'::jsonb, false, true, 14, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 13 Pro',    'SemiBasic',cat_iphone, 'style-1', '', '[{"size":"128GB","price":"R$ 1.999"}]'::jsonb, false, true, 15, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 13',        'Seminovo', cat_iphone, 'style-1', '', '[{"size":"256GB","price":"R$ 2.499"},{"size":"128GB","price":"R$ 2.299"},{"size":"256GB","price":"R$ 1.999","note":"SemiBasic"}]'::jsonb, false, true, 16, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 12 Pro Max','Seminovo', cat_iphone, 'style-1', '', '[{"size":"128GB","price":"R$ 2.299"}]'::jsonb, false, true, 17, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 12 Pro',    'Seminovo', cat_iphone, 'style-1', '', '[{"size":"128GB","price":"R$ 1.799"}]'::jsonb, false, true, 18, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 12',        'Seminovo', cat_iphone, 'style-1', '', '[{"size":"64GB","price":"R$ 1.299"}]'::jsonb, false, true, 19, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 11 Pro Max','Seminovo', cat_iphone, 'style-1', '', '[{"size":"128GB","price":"R$ 1.499"}]'::jsonb, false, true, 20, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 11 Pro',    'Seminovo', cat_iphone, 'style-1', '', '[{"size":"128GB","price":"R$ 1.499"},{"size":"64GB","price":"R$ 1.199"}]'::jsonb, false, true, 21, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 11',        'Seminovo', cat_iphone, 'style-1', '', '[{"size":"64GB","price":"R$ 999"}]'::jsonb, false, true, 22, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone XS Max',    'Seminovo', cat_iphone, 'style-1', '', '[{"size":"256GB","price":"R$ 1.199"},{"size":"256GB","price":"R$ 1.099","note":"SemiBasic"}]'::jsonb, false, true, 23, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone XR',        'Seminovo', cat_iphone, 'style-1', '', '[{"size":"128GB","price":"R$ 1.649"}]'::jsonb, false, true, 24, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb);

  -- ── APPLE WATCH ─────────────────────────────────────────────
  INSERT INTO products (name, condition, category_id, style, warranty, variants, featured, is_active, sort_order, image_settings) VALUES
  ('Apple Watch Ultra 2',  'Seminovo', cat_iphone, 'style-1', '', '[{"size":"49mm","price":"R$ 3.199"}]'::jsonb, false, true, 30, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Apple Watch Ultra 1',  'Seminovo', cat_iphone, 'style-1', '', '[{"size":"49mm","price":"R$ 1.999"}]'::jsonb, false, true, 31, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Apple Watch Série 11', 'Seminovo', cat_iphone, 'style-1', '', '[{"size":"42mm","price":"R$ 2.499"}]'::jsonb, false, true, 32, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Apple Watch Série 9',  'Seminovo', cat_iphone, 'style-1', '', '[{"size":"45mm","price":"R$ 1.649"}]'::jsonb, false, true, 33, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Apple Watch Série 8',  'Seminovo', cat_iphone, 'style-1', '', '[{"size":"45mm","price":"R$ 1.499","note":"Opção A"},{"size":"45mm","price":"R$ 1.399","note":"Opção B"},{"size":"44mm","price":"R$ 1.299"}]'::jsonb, false, true, 34, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Apple Watch Série 5',  'Seminovo', cat_iphone, 'style-1', '', '[{"size":"44mm","price":"R$ 1.099"}]'::jsonb, false, true, 35, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Apple Watch Série SE', 'Seminovo', cat_iphone, 'style-1', '', '[{"size":"40mm","price":"R$ 999"}]'::jsonb, false, true, 36, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Apple Watch 3',        'Seminovo', cat_iphone, 'style-1', '', '[{"size":"38mm","price":"R$ 599"}]'::jsonb, false, true, 37, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb);

  -- ── iPADS / MAC / AIRPODS ────────────────────────────────────
  INSERT INTO products (name, condition, category_id, style, warranty, variants, featured, is_active, sort_order, image_settings) VALUES
  ('iPad Pro 13" M4',     'Seminovo', cat_iphone, 'style-1', 'Garantia Apple', '[{"size":"1TB","price":"R$ 8.499"}]'::jsonb, false, true, 40, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPad Pro 11" M4',     'Seminovo', cat_iphone, 'style-1', '', '[{"size":"1TB","price":"R$ 6.999"}]'::jsonb, false, true, 41, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPad Pro 11" 4G HTG', 'Seminovo', cat_iphone, 'style-1', '', '[{"size":"512GB","price":"R$ 4.899"}]'::jsonb, false, true, 42, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPad Air 5 HTG',      'Seminovo', cat_iphone, 'style-1', '', '[{"size":"256GB","price":"R$ 3.249"}]'::jsonb, false, true, 43, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPad Air 4 HTG',      'Seminovo', cat_iphone, 'style-1', '', '[{"size":"256GB","price":"R$ 2.799"}]'::jsonb, false, true, 44, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPad Air Mini 7 HTG', 'Seminovo', cat_iphone, 'style-1', '', '[{"size":"256GB","price":"R$ 3.999"}]'::jsonb, false, true, 45, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPad 11',             'Seminovo', cat_iphone, 'style-1', '10 meses de garantia', '[{"size":"128GB","price":"R$ 2.099"}]'::jsonb, false, true, 46, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPad 9',              'Seminovo', cat_iphone, 'style-1', '', '[{"size":"64GB","price":"R$ 1.499"}]'::jsonb, false, true, 47, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('MacBook Air',         'Seminovo', cat_iphone, 'style-1', '', '[{"size":"128GB","price":"R$ 3.299"}]'::jsonb, false, true, 48, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('AirPods Pro 2',       'Seminovo', cat_iphone, 'style-1', '', '[{"size":"Único","price":"R$ 1.299"}]'::jsonb, false, true, 49, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb);

  -- ── IPHONES NOVOS ────────────────────────────────────────────
  INSERT INTO products (name, condition, category_id, style, warranty, variants, featured, is_active, sort_order, image_settings) VALUES
  ('iPhone 17 Pro Max', 'Novo', cat_iphone, 'style-1', 'Garantia Apple 1 ano', '[{"size":"1TB","price":"R$ 9.999"},{"size":"512GB","price":"R$ 9.499","note":"Laranja"},{"size":"256GB","price":"R$ 8.249","note":"Todas as cores"}]'::jsonb, true, true, 50, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 17 Pro',     'Novo', cat_iphone, 'style-1', 'Garantia Apple 1 ano', '[{"size":"256GB","price":"R$ 9.349"},{"size":"256GB","price":"R$ 8.699","note":"Branco"},{"size":"256GB","price":"R$ 8.449","note":"Laranja/Azul"}]'::jsonb, true, true, 51, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 17',         'Novo', cat_iphone, 'style-1', 'Garantia Apple 1 ano', '[{"size":"256GB","price":"R$ 7.499"},{"size":"128GB","price":"R$ 6.599"}]'::jsonb, true, true, 52, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 16 Pro Max', 'Novo', cat_iphone, 'style-1', 'Garantia Apple 1 ano', '[{"size":"1TB","price":"R$ 8.999"},{"size":"512GB","price":"R$ 7.499"},{"size":"256GB","price":"R$ 6.499"}]'::jsonb, false, true, 53, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 16 Pro',     'Novo', cat_iphone, 'style-1', 'Garantia Apple 1 ano', '[{"size":"256GB","price":"R$ 5.699"},{"size":"128GB","price":"R$ 5.499"}]'::jsonb, false, true, 54, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 16',         'Novo', cat_iphone, 'style-1', 'Garantia Apple 1 ano', '[{"size":"256GB","price":"R$ 4.549"},{"size":"128GB","price":"R$ 4.049"}]'::jsonb, false, true, 55, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 16e',        'Novo', cat_iphone, 'style-1', 'Garantia Apple 1 ano', '[{"size":"256GB","price":"R$ 3.999"},{"size":"128GB","price":"R$ 3.699"}]'::jsonb, false, true, 56, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 15',         'Novo', cat_iphone, 'style-1', 'Garantia Apple 1 ano', '[{"size":"128GB","price":"R$ 3.199"}]'::jsonb, false, true, 57, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('iPhone 14',         'Novo', cat_iphone, 'style-1', 'Garantia Apple 1 ano', '[{"size":"128GB","price":"R$ 2.599"},{"size":"64GB","price":"R$ 2.299"}]'::jsonb, false, true, 58, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb);

  -- ── XIAOMI ───────────────────────────────────────────────────
  INSERT INTO products (name, condition, category_id, style, warranty, variants, featured, is_active, sort_order, image_settings) VALUES
  ('Xiaomi 14T Pro',     'Novo', cat_xiaomi, 'style-1', 'Garantia 1 ano', '[{"size":"512GB / 12RAM","price":"R$ 2.999"},{"size":"256GB / 8RAM","price":"R$ 2.149"}]'::jsonb, false, true, 1, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Xiaomi 14',          'Novo', cat_xiaomi, 'style-1', 'Garantia 1 ano', '[{"size":"512GB / 12RAM","price":"R$ 3.299"},{"size":"512GB / 8RAM","price":"R$ 2.899"},{"size":"256GB / 8RAM","price":"R$ 2.649"}]'::jsonb, false, true, 2, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Xiaomi 13T Pro',     'Novo', cat_xiaomi, 'style-1', 'Garantia 1 ano', '[{"size":"512GB / 12RAM","price":"R$ 3.049"},{"size":"256GB / 8RAM","price":"R$ 2.599"}]'::jsonb, false, true, 3, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Redmi Note 13 Pro',  'Novo', cat_xiaomi, 'style-1', 'Garantia 1 ano', '[{"size":"512GB / 12RAM - 5G","price":"R$ 2.449"},{"size":"256GB / 8RAM - 5G","price":"R$ 2.129"},{"size":"256GB / 8RAM","price":"R$ 2.020"}]'::jsonb, false, true, 4, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Redmi Note 13',      'Novo', cat_xiaomi, 'style-1', 'Garantia 1 ano', '[{"size":"256GB / 8RAM - 5G","price":"R$ 1.649"},{"size":"128GB / 6RAM","price":"R$ 1.319"}]'::jsonb, false, true, 5, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Redmi 13C',          'Novo', cat_xiaomi, 'style-1', 'Garantia 1 ano', '[{"size":"128GB / 6RAM - 4G","price":"R$ 1.219"},{"size":"128GB / 6RAM","price":"R$ 1.059"}]'::jsonb, false, true, 6, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Redmi 12',           'Novo', cat_xiaomi, 'style-1', 'Garantia 1 ano', '[{"size":"256GB / 8RAM","price":"R$ 1.499"},{"size":"128GB / 4RAM","price":"R$ 910"},{"size":"256GB / 6RAM","price":"R$ 1.099"}]'::jsonb, false, true, 7, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Redmi Note 60',      'Seminovo', cat_xiaomi, 'style-1', '', '[{"size":"128GB / 4RAM","price":"R$ 449"}]'::jsonb, false, true, 8, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Poco X6',            'Novo', cat_xiaomi, 'style-1', 'Garantia 1 ano', '[{"size":"256GB / 8RAM","price":"R$ 1.749"}]'::jsonb, false, true, 9, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Poco M6 Pro',        'Novo', cat_xiaomi, 'style-1', 'Garantia 1 ano', '[{"size":"256GB / 8RAM","price":"R$ 1.379"},{"size":"128GB / 6RAM","price":"R$ 1.149"}]'::jsonb, false, true, 10, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Redmi A3',           'Novo', cat_xiaomi, 'style-1', 'Garantia 1 ano', '[{"size":"128GB / 4RAM","price":"R$ 929"},{"size":"64GB / 3RAM","price":"R$ 669"}]'::jsonb, false, true, 11, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Redmi A2',           'Novo', cat_xiaomi, 'style-1', 'Garantia 1 ano', '[{"size":"64GB / 4RAM","price":"R$ 849"},{"size":"64GB / 3RAM","price":"R$ 749"}]'::jsonb, false, true, 12, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Poco C65',           'Novo', cat_xiaomi, 'style-1', 'Garantia 1 ano', '[{"size":"256GB / 8RAM","price":"R$ 999"},{"size":"64GB / 4RAM","price":"R$ 799"}]'::jsonb, false, true, 13, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Redmi A3x',          'Novo', cat_xiaomi, 'style-1', 'Garantia 1 ano', '[{"size":"64GB / 3RAM","price":"R$ 699"}]'::jsonb, false, true, 14, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb);

  -- ── JBL ─────────────────────────────────────────────────────
  INSERT INTO products (name, condition, category_id, style, warranty, variants, featured, is_active, sort_order, image_settings) VALUES
  ('JBL PartyBox 710',       'Novo', cat_jbl, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 6.899"}]'::jsonb, false, true, 1, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('JBL PartyBox 310',       'Novo', cat_jbl, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 5.999"}]'::jsonb, false, true, 2, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('JBL PartyBox 110',       'Novo', cat_jbl, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 4.799"}]'::jsonb, false, true, 3, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('JBL Boombox 3',          'Novo', cat_jbl, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 3.299"}]'::jsonb, false, true, 4, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('JBL Xtreme 3',           'Novo', cat_jbl, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 2.999"}]'::jsonb, false, true, 5, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('JBL Charge 5',           'Novo', cat_jbl, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 2.299"}]'::jsonb, false, true, 6, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('JBL Flip 6',             'Novo', cat_jbl, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 1.899"}]'::jsonb, false, true, 7, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('JBL Clip 4',             'Novo', cat_jbl, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 599"}]'::jsonb, false, true, 8, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('JBL Go 3',               'Novo', cat_jbl, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 299"}]'::jsonb, false, true, 9, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('JBL Tune 720BT',         'Novo', cat_jbl, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 699"}]'::jsonb, false, true, 10, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('JBL Live 770NC',         'Novo', cat_jbl, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 1.599"}]'::jsonb, false, true, 11, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('JBL Tune Buds',          'Novo', cat_jbl, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 449"}]'::jsonb, false, true, 12, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('JBL Wave Beam',          'Novo', cat_jbl, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 319"}]'::jsonb, false, true, 13, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('JBL Wave 300TWS',        'Novo', cat_jbl, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 249"}]'::jsonb, false, true, 14, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb);

  -- ── GAMES ────────────────────────────────────────────────────
  INSERT INTO products (name, condition, category_id, style, warranty, variants, featured, is_active, sort_order, image_settings) VALUES
  ('PlayStation 5',      'Novo', cat_game, 'style-1', 'Garantia 1 ano', '[{"size":"Mídia Física","price":"R$ 4.299"},{"size":"Mídia Digital","price":"R$ 3.899"}]'::jsonb, false, true, 1, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('PlayStation 5 Slim', 'Novo', cat_game, 'style-1', 'Garantia 1 ano', '[{"size":"Mídia Física","price":"R$ 4.199"},{"size":"Mídia Digital","price":"R$ 3.499"}]'::jsonb, false, true, 2, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('PlayStation 4',      'Novo', cat_game, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 2.999"}]'::jsonb, false, true, 3, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Nintendo Switch',    'Novo', cat_game, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 2.849"}]'::jsonb, false, true, 4, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Xbox Series S',      'Novo', cat_game, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 1.499"}]'::jsonb, false, true, 5, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Controle PS5',       'Novo', cat_game, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 699"}]'::jsonb, false, true, 6, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Controle Xbox',      'Novo', cat_game, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 499"}]'::jsonb, false, true, 7, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb),
  ('Fone Gamer',         'Novo', cat_game, 'style-1', 'Garantia 1 ano', '[{"size":"Único","price":"R$ 349"}]'::jsonb, false, true, 8, '{"width":80,"x":0,"y":0,"rotate":0}'::jsonb);

  RAISE NOTICE '✅ Todos os produtos inseridos com sucesso!';
END $$;
