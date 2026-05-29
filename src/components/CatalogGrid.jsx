import CardPremiumDark from './CardPremiumDark.jsx'
import CardLifestyleGlass from './CardLifestyleGlass.jsx'
import CardPhotoBg from './CardPhotoBg.jsx'

export default function CatalogGrid({ products, whatsapp }) {
  if (products.length === 0) {
    return (
      <div className="catalog-grid">
        <div className="empty-catalog">
          <p>Nenhum produto disponível no momento.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="catalog-grid">
      {products.map(product => {
        if (product.style === 'style-1') return <CardPremiumDark key={product.id} product={product} whatsapp={whatsapp} />
        if (product.style === 'style-2') return <CardLifestyleGlass key={product.id} product={product} whatsapp={whatsapp} />
        if (product.style === 'style-3') return <CardPhotoBg key={product.id} product={product} whatsapp={whatsapp} />
        return <CardPremiumDark key={product.id} product={product} whatsapp={whatsapp} />
      })}
    </div>
  )
}
