import { defaultPhoneSvg, defaultAbstractWaveSvg, WhatsAppIcon } from '../lib/assets.jsx'

export default function CardPremiumDark({ product, whatsapp }) {
  const phoneImage = product.image_url || defaultPhoneSvg
  const wa = whatsapp || product.whatsapp || '5511999999999'
  
  const variantsText = (product.variants || [])
    .map(v => `• *${v.size}*${v.note ? ` (${v.note})` : ''}: *${v.price}*`)
    .join('\n')

  const waMessage = encodeURIComponent(
    `Olá! Gostaria de mais informações sobre o *${product.name}*.\n\n` +
    `📌 *Condição:* ${product.condition || 'Não informada'}\n` +
    `🛡️ *Garantia:* ${product.warranty || 'Não informada'}\n\n` +
    `💵 *Versões e Preços:*\n${variantsText}`
  )

  const imgSettings = product.image_settings || { width: 80, x: 0, y: 0, rotate: 0 }
  const imgStyle = {
    width: `${imgSettings.width ?? 80}%`,
    transform: `translate(${imgSettings.x ?? 0}px, ${imgSettings.y ?? 0}px) rotate(${imgSettings.rotate ?? 0}deg)`,
  }

  return (
    <div className="card-premium-dark">
      <div className="premium-header">
        <div className="premium-subtitle">{product.condition || ''}</div>
        <h3 className="premium-title">{product.name}</h3>
      </div>

      <img className="premium-abstract-bg" src={defaultAbstractWaveSvg} alt="" />

      <div className="premium-phone-wrapper">
        <img src={phoneImage} alt={product.name} className="premium-phone-img" style={imgStyle} />
      </div>

      <div className="premium-footer">
        {(product.variants || []).map((v, i) => (
          <div className="price-pill-row" key={i}>
            <div className="price-value">{v.price}</div>
            <div className="price-capacity-badge">
              {v.size}
              <span>{v.note || ''}</span>
            </div>
          </div>
        ))}

        <a
          href={`https://wa.me/${wa}?text=${waMessage}`}
          target="_blank"
          rel="noreferrer"
          className="btn-order-wa"
        >
          <WhatsAppIcon />
          Falar com Consultor
        </a>

        {product.warranty && (
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '6px' }}>
            {product.warranty}
          </div>
        )}
      </div>
    </div>
  )
}
