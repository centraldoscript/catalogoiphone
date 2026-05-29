import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import Header from '../components/Header.jsx'
import { Package, Search, X, CreditCard, Plane, Sparkles, RefreshCw } from 'lucide-react'
import CategoryIcon from '../components/CategoryIcon.jsx'
import CatalogGrid from '../components/CatalogGrid.jsx'

export default function CatalogPage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCondition, setSelectedCondition] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [whatsapp, setWhatsapp] = useState('5511999999999')
  const [appName, setAppName] = useState('Império Phones')
  const [loading, setLoading] = useState(true)
  const [showSplash, setShowSplash] = useState(true)
  const [isFading, setIsFading] = useState(false)

  const toggleConditionFilter = (condition) => {
    if (selectedCondition === condition) {
      setSelectedCondition('all')
    } else {
      setSelectedCondition(condition)
    }
  }

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        // Carrega categorias
        const { data: catData, error: catError } = await supabase
          .from('categories')
          .select('*')
          .order('sort_order', { ascending: true })
        
        if (!catError) setCategories(catData || [])

        // Carrega produtos ativos
        const { data: prodData, error: prodError } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('featured', { ascending: false })
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false })

        if (!prodError) setProducts(prodData || [])

        // Carrega configurações
        const { data: settingsData } = await supabase
          .from('settings')
          .select('*')
        
        if (settingsData) {
          const waSetting = settingsData.find(s => s.key === 'whatsapp')
          if (waSetting) setWhatsapp(waSetting.value)

          const appNameSetting = settingsData.find(s => s.key === 'app_name')
          if (appNameSetting) setAppName(appNameSetting.value)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
        // Mantém a tela de splash por pelo menos 1.8 segundos
        setTimeout(() => {
          setIsFading(true)
          setTimeout(() => {
            setShowSplash(false)
          }, 800)
        }, 1800)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    document.title = appName
  }, [appName])

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category_id === selectedCategory

    let matchesCondition = true
    if (selectedCondition === 'Novo') {
      matchesCondition = p.condition === 'Novo'
    } else if (selectedCondition === 'Usado') {
      matchesCondition = p.condition !== 'Novo'
    }

    if (!searchQuery) return matchesCategory && matchesCondition

    const query = searchQuery.toLowerCase()
    
    // Busca por nome do produto
    const nameMatch = p.name ? p.name.toLowerCase().includes(query) : false
    
    // Busca por condição
    const conditionMatch = p.condition ? p.condition.toLowerCase().includes(query) : false
    
    // Busca por garantia
    const warrantyMatch = p.warranty ? p.warranty.toLowerCase().includes(query) : false
    
    // Busca por variantes (armazenamento, preço, nota)
    const variantsMatch = p.variants && Array.isArray(p.variants)
      ? p.variants.some(v => 
          (v.size && v.size.toLowerCase().includes(query)) ||
          (v.note && v.note.toLowerCase().includes(query)) ||
          (v.price && v.price.toLowerCase().includes(query))
        )
      : false

    return matchesCategory && matchesCondition && (nameMatch || conditionMatch || warrantyMatch || variantsMatch)
  })

  const activeCategories = categories.filter(cat =>
    cat.slug === 'assistencia' || products.some(p => p.category_id === cat.id)
  )

  return (
    <>
      {showSplash && (
        <div className={`splash-overlay ${isFading ? 'fade-out' : ''}`}>
          <div className="splash-wave wave-1"></div>
          <div className="splash-wave wave-2"></div>
          <div className="splash-wave wave-3"></div>
          <div className="splash-content">
            <img src="/logo.png" alt="Império Phones" className="splash-logo-active" />
          </div>
        </div>
      )}

      <Header appName={appName} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="container">
        {/* Controles do Catálogo: Filtros e Busca */}
        {!loading && (
          <>
            <div className="state-filter-group">
              <button
                className={`state-btn ${selectedCondition === 'Novo' ? 'active' : ''}`}
                onClick={() => toggleConditionFilter('Novo')}
              >
                <Sparkles size={14} /> NOVO
              </button>
              <button
                className={`state-btn ${selectedCondition === 'Usado' ? 'active' : ''}`}
                onClick={() => toggleConditionFilter('Usado')}
              >
                <RefreshCw size={14} /> Usado
              </button>
            </div>

            <div className="catalog-controls">
              {activeCategories.length > 0 ? (
                <div className="filter-bar">
                  <div className="filter-fixed-col">
                    <button
                      className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                      onClick={() => setSelectedCategory('all')}
                    >
                      <Package size={16} /> Todos
                    </button>
                  </div>
                  <div className="filter-scrollable-col">
                    {activeCategories.map(cat => (
                      <button
                        key={cat.id}
                        className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                        onClick={() => {
                          if (cat.slug === 'assistencia') {
                            navigate('/assistencia')
                          } else {
                            setSelectedCategory(cat.id)
                          }
                        }}
                      >
                        <CategoryIcon name={cat.icon} size={16} /> {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : <div />}
            </div>
          </>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <span className="spinner" style={{ width: 36, height: 36, borderWidth: 3 }} />
          </div>
        ) : (
          <CatalogGrid products={filteredProducts} whatsapp={whatsapp} />
        )}
      </main>

      <footer className="catalog-footer">
        <div className="footer-content">
          <h2 className="footer-title">Gostou de algum aparelho?</h2>
          
          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Olá! Gostaria de falar com um consultor para finalizar meu pedido.")}`}
            target="_blank"
            rel="noreferrer"
            className="footer-btn-wa"
          >
            <span>→ Click aqui</span>
          </a>
          
          <p className="footer-subtitle">
            e fale com um consultor on-line para finalizar seu pedido.
          </p>
          
          <div className="footer-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">
                <CreditCard size={24} />
              </div>
              <div className="highlight-text">
                <span className="hl-label">PARCELAMOS</span>
                <span className="hl-value">EM ATÉ <strong>18X</strong></span>
                <span className="hl-sub">(COM ACRÉSCIMO)</span>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <Plane size={24} />
              </div>
              <div className="highlight-text">
                <span className="hl-label">ENVIAMOS PARA</span>
                <span className="hl-value">TODO BRASIL</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
