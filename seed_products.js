import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://loygawdcurhvmpsjymuj.supabase.co'
const SUPABASE_KEY = 'sb_publishable_adGEbim72eiTnY7I7KsMYw_gjZqDa3F'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Buscar IDs das categorias
async function getCategoryMap() {
  const { data, error } = await supabase.from('categories').select('id, slug')
  if (error) throw error
  const map = {}
  data.forEach(c => { map[c.slug] = c.id })
  return map
}

// ─── DADOS DOS PRODUTOS ────────────────────────────────────────────────
// Formato: { name, condition, category_slug, warranty, sort_order, variants: [{size, price, note?}] }

const PRODUCTS = [

  // ── IPHONES SEMINOVOS ──────────────────────────────────────────────
  {
    name: 'iPhone 17 Air', condition: 'Seminovo', category_slug: 'iphone', warranty: 'Garantia até Dezembro',
    sort_order: 1,
    variants: [{ size: '256GB', price: 'R$ 7.499' }]
  },
  {
    name: 'iPhone 17 Pro', condition: 'Seminovo', category_slug: 'iphone', warranty: 'Garantia até Dezembro',
    sort_order: 2,
    variants: [{ size: '256GB', price: 'R$ 6.999' }]
  },
  {
    name: 'iPhone 17', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 3,
    variants: [
      { size: '256GB', price: 'R$ 5.299' },
      { size: '128GB', price: 'R$ 4.850' },
    ]
  },
  {
    name: 'iPhone 16 e', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 4,
    variants: [
      { size: '128GB', price: 'R$ 3.186' },
    ]
  },
  {
    name: 'iPhone 16', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 5,
    variants: [
      { size: '128GB', price: 'R$ 3.819', note: 'Opção A' },
      { size: '128GB', price: 'R$ 3.749', note: 'Opção B' },
    ]
  },
  {
    name: 'iPhone 15 Pro Max', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 6,
    variants: [
      { size: '256GB', price: 'R$ 5.549' },
    ]
  },
  {
    name: 'iPhone 15 Pro Max', condition: 'SemiBasic', category_slug: 'iphone', warranty: 'Marcas de uso',
    sort_order: 7,
    variants: [
      { size: '256GB', price: 'R$ 3.999' },
    ]
  },
  {
    name: 'iPhone 15 Pro', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 8,
    variants: [
      { size: '256GB', price: 'R$ 3.699' },
      { size: '128GB', price: 'R$ 3.449' },
    ]
  },
  {
    name: 'iPhone 15 Plus', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 9,
    variants: [
      { size: '256GB', price: 'R$ 2.949' },
      { size: '128GB', price: 'R$ 2.699' },
    ]
  },
  {
    name: 'iPhone 15', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 10,
    variants: [
      { size: '512GB', price: 'R$ 4.849' },
      { size: '256GB', price: 'R$ 4.049' },
      { size: '128GB', price: 'R$ 3.349', note: 'Opção A' },
      { size: '128GB', price: 'R$ 3.149', note: 'Opção B' },
    ]
  },
  {
    name: 'iPhone 14 Pro Max', condition: 'SemiBasic', category_slug: 'iphone', warranty: 'Marcas de uso',
    sort_order: 11,
    variants: [{ size: '256GB', price: 'R$ 2.899' }]
  },
  {
    name: 'iPhone 14 Pro', condition: 'SemiBasic', category_slug: 'iphone', warranty: '',
    sort_order: 12,
    variants: [{ size: '128GB', price: 'R$ 2.499' }]
  },
  {
    name: 'iPhone 14', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 13,
    variants: [
      { size: '256GB', price: 'R$ 2.499' },
      { size: '128GB', price: 'R$ 2.449' },
    ]
  },
  {
    name: 'iPhone 13 Pro Max', condition: 'SemiBasic', category_slug: 'iphone', warranty: 'Mancha pequena na tela',
    sort_order: 14,
    variants: [{ size: '128GB', price: 'R$ 2.499' }]
  },
  {
    name: 'iPhone 13 Pro', condition: 'SemiBasic', category_slug: 'iphone', warranty: '',
    sort_order: 15,
    variants: [{ size: '128GB', price: 'R$ 1.999' }]
  },
  {
    name: 'iPhone 13', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 16,
    variants: [
      { size: '256GB', price: 'R$ 2.499' },
      { size: '128GB', price: 'R$ 2.299' },
      { size: '256GB', price: 'R$ 1.999', note: 'SemiBasic' },
    ]
  },
  {
    name: 'iPhone 12 Pro Max', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 17,
    variants: [{ size: '128GB', price: 'R$ 2.299' }]
  },
  {
    name: 'iPhone 12 Pro', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 18,
    variants: [{ size: '128GB', price: 'R$ 1.799' }]
  },
  {
    name: 'iPhone 12', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 19,
    variants: [{ size: '64GB', price: 'R$ 1.299' }]
  },
  {
    name: 'iPhone 11 Pro Max', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 20,
    variants: [{ size: '128GB', price: 'R$ 1.499' }]
  },
  {
    name: 'iPhone 11 Pro', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 21,
    variants: [
      { size: '128GB', price: 'R$ 1.499' },
      { size: '64GB', price: 'R$ 1.199' },
    ]
  },
  {
    name: 'iPhone 11', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 22,
    variants: [{ size: '64GB', price: 'R$ 999' }]
  },
  {
    name: 'iPhone XS Max', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 23,
    variants: [
      { size: '256GB', price: 'R$ 1.199' },
      { size: '256GB', price: 'R$ 1.099', note: 'SemiBasic' },
    ]
  },
  {
    name: 'iPhone XR', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 24,
    variants: [
      { size: '128GB', price: 'R$ 1.649' },
    ]
  },

  // ── APPLE WATCH ────────────────────────────────────────────────────
  {
    name: 'Apple Watch Ultra 2', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 30,
    variants: [{ size: '49mm', price: 'R$ 3.199' }]
  },
  {
    name: 'Apple Watch Ultra 1', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 31,
    variants: [{ size: '49mm', price: 'R$ 1.999' }]
  },
  {
    name: 'Apple Watch Série 11', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 32,
    variants: [{ size: '42mm', price: 'R$ 2.499' }]
  },
  {
    name: 'Apple Watch Série 9', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 33,
    variants: [{ size: '45mm', price: 'R$ 1.649' }]
  },
  {
    name: 'Apple Watch Série 8', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 34,
    variants: [
      { size: '45mm', price: 'R$ 1.499', note: 'Opção A' },
      { size: '45mm', price: 'R$ 1.399', note: 'Opção B' },
      { size: '44mm', price: 'R$ 1.299' },
    ]
  },
  {
    name: 'Apple Watch Série 5', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 35,
    variants: [{ size: '44mm', price: 'R$ 1.099' }]
  },
  {
    name: 'Apple Watch Série SE', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 36,
    variants: [{ size: '40mm', price: 'R$ 999' }]
  },
  {
    name: 'Apple Watch 3', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 37,
    variants: [{ size: '38mm', price: 'R$ 599' }]
  },

  // ── iPADS ──────────────────────────────────────────────────────────
  {
    name: 'iPad Pro 13" M4', condition: 'Seminovo', category_slug: 'iphone', warranty: 'Garantia Apple',
    sort_order: 40,
    variants: [{ size: '1TB', price: 'R$ 8.499' }]
  },
  {
    name: 'iPad Pro 11" M4', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 41,
    variants: [{ size: '1TB', price: 'R$ 6.999' }]
  },
  {
    name: 'iPad Pro 11" 4G HTG', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 42,
    variants: [{ size: '512GB', price: 'R$ 4.899' }]
  },
  {
    name: 'iPad Air 5 HTG', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 43,
    variants: [{ size: '256GB', price: 'R$ 3.249' }]
  },
  {
    name: 'iPad Air 4 HTG', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 44,
    variants: [{ size: '256GB', price: 'R$ 2.799' }]
  },
  {
    name: 'iPad Air Mini 7 HTG', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 45,
    variants: [{ size: '256GB', price: 'R$ 3.999' }]
  },
  {
    name: 'iPad 11', condition: 'Seminovo', category_slug: 'iphone', warranty: '10 meses de garantia',
    sort_order: 46,
    variants: [{ size: '128GB', price: 'R$ 2.099' }]
  },
  {
    name: 'iPad 9', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 47,
    variants: [{ size: '64GB', price: 'R$ 1.499' }]
  },
  {
    name: 'MacBook Air', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 48,
    variants: [{ size: '128GB', price: 'R$ 3.299' }]
  },
  {
    name: 'AirPods Pro 2', condition: 'Seminovo', category_slug: 'iphone', warranty: '',
    sort_order: 49,
    variants: [{ size: 'Único', price: 'R$ 1.299' }]
  },

  // ── IPHONES NOVOS ──────────────────────────────────────────────────
  {
    name: 'iPhone 17 Pro Max', condition: 'Novo', category_slug: 'iphone', warranty: 'Garantia Apple 1 ano',
    sort_order: 50,
    variants: [
      { size: '1TB', price: 'R$ 9.999' },
      { size: '512GB', price: 'R$ 9.499', note: 'Laranja' },
      { size: '256GB', price: 'R$ 8.249', note: 'Todas as cores' },
    ]
  },
  {
    name: 'iPhone 17 Pro', condition: 'Novo', category_slug: 'iphone', warranty: 'Garantia Apple 1 ano',
    sort_order: 51,
    variants: [
      { size: '256GB', price: 'R$ 8.699', note: 'Branco' },
      { size: '256GB', price: 'R$ 8.449', note: 'Laranja/Azul' },
      { size: '256GB', price: 'R$ 9.349' },
    ]
  },
  {
    name: 'iPhone 17', condition: 'Novo', category_slug: 'iphone', warranty: 'Garantia Apple 1 ano',
    sort_order: 52,
    variants: [
      { size: '256GB', price: 'R$ 7.499' },
      { size: '128GB', price: 'R$ 6.599' },
    ]
  },
  {
    name: 'iPhone 16 Pro Max', condition: 'Novo', category_slug: 'iphone', warranty: 'Garantia Apple 1 ano',
    sort_order: 53,
    variants: [
      { size: '1TB', price: 'R$ 8.999' },
      { size: '512GB', price: 'R$ 7.499' },
      { size: '256GB', price: 'R$ 6.499' },
    ]
  },
  {
    name: 'iPhone 16 Pro', condition: 'Novo', category_slug: 'iphone', warranty: 'Garantia Apple 1 ano',
    sort_order: 54,
    variants: [
      { size: '256GB', price: 'R$ 5.699' },
      { size: '128GB', price: 'R$ 5.499' },
    ]
  },
  {
    name: 'iPhone 16', condition: 'Novo', category_slug: 'iphone', warranty: 'Garantia Apple 1 ano',
    sort_order: 55,
    variants: [
      { size: '256GB', price: 'R$ 4.549' },
      { size: '128GB', price: 'R$ 4.049' },
    ]
  },
  {
    name: 'iPhone 16e', condition: 'Novo', category_slug: 'iphone', warranty: 'Garantia Apple 1 ano',
    sort_order: 56,
    variants: [
      { size: '256GB', price: 'R$ 3.999' },
      { size: '128GB', price: 'R$ 3.699' },
    ]
  },
  {
    name: 'iPhone 15', condition: 'Novo', category_slug: 'iphone', warranty: 'Garantia Apple 1 ano',
    sort_order: 57,
    variants: [
      { size: '128GB', price: 'R$ 3.199' },
    ]
  },
  {
    name: 'iPhone 14', condition: 'Novo', category_slug: 'iphone', warranty: 'Garantia Apple 1 ano',
    sort_order: 58,
    variants: [
      { size: '128GB', price: 'R$ 2.599' },
      { size: '64GB', price: 'R$ 2.299' },
    ]
  },

  // ── XIAOMI ─────────────────────────────────────────────────────────
  {
    name: 'Xiaomi 14T Pro', condition: 'Novo', category_slug: 'xiaomi', warranty: 'Garantia 1 ano',
    sort_order: 1,
    variants: [
      { size: '512GB / 12RAM', price: 'R$ 2.999' },
      { size: '256GB / 8RAM', price: 'R$ 2.149' },
    ]
  },
  {
    name: 'Xiaomi 14', condition: 'Novo', category_slug: 'xiaomi', warranty: 'Garantia 1 ano',
    sort_order: 2,
    variants: [
      { size: '512GB / 12RAM', price: 'R$ 3.299' },
      { size: '512GB / 8RAM', price: 'R$ 2.899' },
      { size: '256GB / 8RAM', price: 'R$ 2.649' },
    ]
  },
  {
    name: 'Xiaomi 13T Pro', condition: 'Novo', category_slug: 'xiaomi', warranty: 'Garantia 1 ano',
    sort_order: 3,
    variants: [
      { size: '512GB / 12RAM', price: 'R$ 3.049' },
      { size: '256GB / 8RAM', price: 'R$ 2.599' },
    ]
  },
  {
    name: 'Redmi Note 13 Pro', condition: 'Novo', category_slug: 'xiaomi', warranty: 'Garantia 1 ano',
    sort_order: 4,
    variants: [
      { size: '512GB / 12RAM - 5G', price: 'R$ 2.449' },
      { size: '256GB / 8RAM - 5G', price: 'R$ 2.129' },
      { size: '256GB / 8RAM', price: 'R$ 2.020' },
    ]
  },
  {
    name: 'Redmi Note 13', condition: 'Novo', category_slug: 'xiaomi', warranty: 'Garantia 1 ano',
    sort_order: 5,
    variants: [
      { size: '256GB / 8RAM - 5G', price: 'R$ 1.649' },
      { size: '256GB / 8RAM - 4G', price: 'R$ 1.649' },
      { size: '128GB / 6RAM', price: 'R$ 1.319' },
    ]
  },
  {
    name: 'Redmi 13C', condition: 'Novo', category_slug: 'xiaomi', warranty: 'Garantia 1 ano',
    sort_order: 6,
    variants: [
      { size: '128GB / 6RAM - 4G', price: 'R$ 1.219' },
      { size: '128GB / 6RAM', price: 'R$ 1.059' },
    ]
  },
  {
    name: 'Redmi 12', condition: 'Novo', category_slug: 'xiaomi', warranty: 'Garantia 1 ano',
    sort_order: 7,
    variants: [
      { size: '256GB / 8RAM', price: 'R$ 1.499' },
      { size: '256GB / 8RAM', price: 'R$ 1.399' },
      { size: '128GB / 4RAM', price: 'R$ 910' },
      { size: '256GB / 6RAM', price: 'R$ 1.099' },
    ]
  },
  {
    name: 'Redmi Note 60', condition: 'Seminovo', category_slug: 'xiaomi', warranty: '',
    sort_order: 8,
    variants: [
      { size: '128GB / 4RAM', price: 'R$ 449' },
    ]
  },
  {
    name: 'Poco X6', condition: 'Novo', category_slug: 'xiaomi', warranty: 'Garantia 1 ano',
    sort_order: 9,
    variants: [
      { size: '256GB / 8RAM', price: 'R$ 1.749' },
      { size: '256GB / 8RAM', price: 'R$ 1.649' },
    ]
  },
  {
    name: 'Poco M6 Pro', condition: 'Novo', category_slug: 'xiaomi', warranty: 'Garantia 1 ano',
    sort_order: 10,
    variants: [
      { size: '256GB / 8RAM', price: 'R$ 1.379' },
      { size: '256GB / 8RAM', price: 'R$ 1.249' },
      { size: '128GB / 6RAM', price: 'R$ 1.149' },
    ]
  },
  {
    name: 'Redmi A3', condition: 'Novo', category_slug: 'xiaomi', warranty: 'Garantia 1 ano',
    sort_order: 11,
    variants: [
      { size: '128GB / 4RAM', price: 'R$ 929' },
      { size: '64GB / 3RAM', price: 'R$ 669' },
    ]
  },
  {
    name: 'Redmi A2', condition: 'Novo', category_slug: 'xiaomi', warranty: 'Garantia 1 ano',
    sort_order: 12,
    variants: [
      { size: '64GB / 4RAM', price: 'R$ 849' },
      { size: '64GB / 3RAM', price: 'R$ 749' },
    ]
  },
  {
    name: 'Poco C65', condition: 'Novo', category_slug: 'xiaomi', warranty: 'Garantia 1 ano',
    sort_order: 13,
    variants: [
      { size: '256GB / 8RAM', price: 'R$ 999' },
      { size: '64GB / 4RAM', price: 'R$ 799' },
    ]
  },
  {
    name: 'Redmi A3x', condition: 'Novo', category_slug: 'xiaomi', warranty: 'Garantia 1 ano',
    sort_order: 14,
    variants: [
      { size: '64GB / 3RAM', price: 'R$ 699' },
    ]
  },

  // ── JBL ────────────────────────────────────────────────────────────
  {
    name: 'JBL PartyBox 710', condition: 'Novo', category_slug: 'jbl', warranty: 'Garantia 1 ano',
    sort_order: 1,
    variants: [{ size: 'Único', price: 'R$ 6.899' }]
  },
  {
    name: 'JBL PartyBox 310', condition: 'Novo', category_slug: 'jbl', warranty: 'Garantia 1 ano',
    sort_order: 2,
    variants: [{ size: 'Único', price: 'R$ 5.999' }]
  },
  {
    name: 'JBL PartyBox 110', condition: 'Novo', category_slug: 'jbl', warranty: 'Garantia 1 ano',
    sort_order: 3,
    variants: [{ size: 'Único', price: 'R$ 4.799' }]
  },
  {
    name: 'JBL Boombox 3', condition: 'Novo', category_slug: 'jbl', warranty: 'Garantia 1 ano',
    sort_order: 4,
    variants: [{ size: 'Único', price: 'R$ 3.299' }]
  },
  {
    name: 'JBL Xtreme 3', condition: 'Novo', category_slug: 'jbl', warranty: 'Garantia 1 ano',
    sort_order: 5,
    variants: [{ size: 'Único', price: 'R$ 2.999' }]
  },
  {
    name: 'JBL Charge 5', condition: 'Novo', category_slug: 'jbl', warranty: 'Garantia 1 ano',
    sort_order: 6,
    variants: [{ size: 'Único', price: 'R$ 2.299' }]
  },
  {
    name: 'JBL Flip 6', condition: 'Novo', category_slug: 'jbl', warranty: 'Garantia 1 ano',
    sort_order: 7,
    variants: [{ size: 'Único', price: 'R$ 1.899' }]
  },
  {
    name: 'JBL Clip 4', condition: 'Novo', category_slug: 'jbl', warranty: 'Garantia 1 ano',
    sort_order: 8,
    variants: [{ size: 'Único', price: 'R$ 599' }]
  },
  {
    name: 'JBL Go 3', condition: 'Novo', category_slug: 'jbl', warranty: 'Garantia 1 ano',
    sort_order: 9,
    variants: [{ size: 'Único', price: 'R$ 299' }]
  },
  {
    name: 'JBL Tune 720BT', condition: 'Novo', category_slug: 'jbl', warranty: 'Garantia 1 ano',
    sort_order: 10,
    variants: [{ size: 'Único', price: 'R$ 699' }]
  },
  {
    name: 'JBL Live 770NC', condition: 'Novo', category_slug: 'jbl', warranty: 'Garantia 1 ano',
    sort_order: 11,
    variants: [{ size: 'Único', price: 'R$ 1.599' }]
  },
  {
    name: 'JBL Tune Buds', condition: 'Novo', category_slug: 'jbl', warranty: 'Garantia 1 ano',
    sort_order: 12,
    variants: [{ size: 'Único', price: 'R$ 449' }]
  },
  {
    name: 'JBL Wave Beam', condition: 'Novo', category_slug: 'jbl', warranty: 'Garantia 1 ano',
    sort_order: 13,
    variants: [{ size: 'Único', price: 'R$ 319' }]
  },
  {
    name: 'JBL Wave 300TWS', condition: 'Novo', category_slug: 'jbl', warranty: 'Garantia 1 ano',
    sort_order: 14,
    variants: [{ size: 'Único', price: 'R$ 249' }]
  },
  {
    name: 'JBL Caixa Portátil Média', condition: 'Novo', category_slug: 'jbl', warranty: 'Garantia 1 ano',
    sort_order: 15,
    variants: [
      { size: 'Opção A', price: 'R$ 2.549' },
      { size: 'Opção B', price: 'R$ 2.199' },
      { size: 'Opção C', price: 'R$ 1.849' },
      { size: 'Opção D', price: 'R$ 1.499' },
      { size: 'Opção E', price: 'R$ 1.299' },
      { size: 'Opção F', price: 'R$ 999' },
    ]
  },

  // ── GAMES ──────────────────────────────────────────────────────────
  {
    name: 'PlayStation 5', condition: 'Novo', category_slug: 'game', warranty: 'Garantia 1 ano',
    sort_order: 1,
    variants: [
      { size: 'Mídia Física', price: 'R$ 4.299' },
      { size: 'Mídia Digital', price: 'R$ 3.899' },
    ]
  },
  {
    name: 'PlayStation 5 Slim', condition: 'Novo', category_slug: 'game', warranty: 'Garantia 1 ano',
    sort_order: 2,
    variants: [
      { size: 'Mídia Física', price: 'R$ 4.199' },
      { size: 'Mídia Digital', price: 'R$ 3.499' },
    ]
  },
  {
    name: 'PlayStation 4', condition: 'Novo', category_slug: 'game', warranty: 'Garantia 1 ano',
    sort_order: 3,
    variants: [
      { size: 'Único', price: 'R$ 2.999' },
    ]
  },
  {
    name: 'Nintendo Switch', condition: 'Novo', category_slug: 'game', warranty: 'Garantia 1 ano',
    sort_order: 4,
    variants: [
      { size: 'Único', price: 'R$ 2.849' },
    ]
  },
  {
    name: 'Xbox Series S', condition: 'Novo', category_slug: 'game', warranty: 'Garantia 1 ano',
    sort_order: 5,
    variants: [
      { size: 'Único', price: 'R$ 1.499' },
    ]
  },
  {
    name: 'Controle PS5', condition: 'Novo', category_slug: 'game', warranty: 'Garantia 1 ano',
    sort_order: 6,
    variants: [
      { size: 'Único', price: 'R$ 699' },
    ]
  },
  {
    name: 'Controle Xbox', condition: 'Novo', category_slug: 'game', warranty: 'Garantia 1 ano',
    sort_order: 7,
    variants: [
      { size: 'Único', price: 'R$ 499' },
    ]
  },
  {
    name: 'Fone Gamer', condition: 'Novo', category_slug: 'game', warranty: 'Garantia 1 ano',
    sort_order: 8,
    variants: [
      { size: 'Único', price: 'R$ 349' },
    ]
  },
]

// ─── INSERÇÃO ─────────────────────────────────────────────────────────────
async function main() {
  console.log('🔗 Conectando ao Supabase...')
  const catMap = await getCategoryMap()
  console.log('📂 Categorias encontradas:', Object.keys(catMap).join(', '))

  let successCount = 0
  let errorCount = 0

  for (const p of PRODUCTS) {
    const category_id = catMap[p.category_slug] || null

    if (!category_id) {
      console.warn(`⚠️  Categoria "${p.category_slug}" não encontrada para produto "${p.name}"`)
    }

    const payload = {
      name: p.name,
      condition: p.condition,
      category_id,
      style: 'style-1',
      warranty: p.warranty || '',
      whatsapp: '',
      variants: p.variants,
      featured: false,
      is_active: true,
      sort_order: p.sort_order,
      image_settings: { width: 80, x: 0, y: 0, rotate: 0 },
    }

    const { error } = await supabase.from('products').insert(payload)

    if (error) {
      console.error(`❌ Erro ao inserir "${p.name}":`, error.message)
      errorCount++
    } else {
      console.log(`✅ "${p.name}" inserido com sucesso.`)
      successCount++
    }
  }

  console.log(`\n🏁 Concluído! ✅ ${successCount} produtos inseridos | ❌ ${errorCount} erros.`)
}

main().catch(console.error)
