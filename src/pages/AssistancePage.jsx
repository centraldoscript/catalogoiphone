import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import Header from '../components/Header.jsx'

export default function AssistancePage() {
  const [sections, setSections] = useState([])
  const [appName, setAppName] = useState('Império Phones')
  const [whatsapp, setWhatsapp] = useState('5511999999999')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        // Carrega seções
        const { data: sectionsData, error: sectionsError } = await supabase
          .from('assistance_sections')
          .select('*')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: true })

        // Carrega preços
        const { data: pricesData, error: pricesError } = await supabase
          .from('assistance_prices')
          .select('*')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: true })

        if (!sectionsError && !pricesError) {
          const mapped = (sectionsData || []).map(sec => {
            const prices = (pricesData || []).filter(p => p.section_id === sec.id)
            return {
              ...sec,
              prices
            }
          }).filter(sec => sec.prices.length > 0)

          setSections(mapped)
        }

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
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    document.title = `Assistência Técnica - ${appName}`
  }, [appName])

  return (
    <div className="assistance-page">
      <Header appName={appName} />

      <main className="container">
        <div className="assistance-hero">
          <h1>Assistência Técnica</h1>
          <p>Tabela de preços para consertos rápidos com garantia</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <span className="spinner" style={{ width: 36, height: 36, borderWidth: 3 }} />
          </div>
        ) : sections.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            Nenhum preço de conserto cadastrado no momento.
          </div>
        ) : (
          <div className="assistance-sections">
            {sections.map(section => (
              <div key={section.id} className="assistance-category-card">
                <div className="assistance-category-banner">
                  <h2>{section.name}</h2>
                </div>
                <div className="assistance-table">
                  {section.prices.map(item => (
                    <div key={item.id} className="assistance-row">
                      <div className="assistance-model-info">
                        <div className="assistance-main-model">{item.main_model}</div>
                        {item.secondary_models && (
                          <div className="assistance-secondary-models">{item.secondary_models}</div>
                        )}
                      </div>
                      <div className="assistance-divider-vertical"></div>
                      <div className="assistance-price-info">
                        <span className="assistance-price-symbol">R$</span>
                        {parseFloat(item.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('R$', '').trim()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="catalog-footer">
        <div className="footer-content">
          <h2 className="footer-title">Precisa de outro conserto?</h2>
          
          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Olá! Gostaria de fazer um orçamento para assistência técnica de outro modelo/defeito.")}`}
            target="_blank"
            rel="noreferrer"
            className="footer-btn-wa"
          >
            <span>→ Click aqui</span>
          </a>
          
          <p className="footer-subtitle">
            e fale com um técnico on-line para fazer seu orçamento sem compromisso.
          </p>
        </div>
      </footer>
    </div>
  )
}

