import { defaultNeonBackground, WhatsAppIcon } from '../lib/assets.jsx'

export default function CardLifestyleGlass({ product, whatsapp }) {
  const bgStyle = product.bg_image_url
    ? { backgroundImage: `url('${product.bg_image_url}')` }
    : { backgroundImage: defaultNeonBackground }

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

  return (
    <div className="card-lifestyle-glass" style={bgStyle}>
      <div className="glass-badge">{product.condition || 'Destaque'}</div>

      <div className="glass-overlay-card">
        <div>
          <h3 className="glass-title">{product.name}</h3>
          {product.condition && <div className="glass-condition">{product.condition}</div>}
        </div>

        <div className="glass-details-list">
          {(product.variants || []).map((v, i) => (
            <div key={i}>
              <div className="glass-detail-item">
                <span className="glass-detail-label">Armazenamento{v.note ? ` (${v.note})` : ''}:</span>
                <span className="glass-detail-val">{v.size}</span>
              </div>
              <div className="glass-detail-item">
                <span className="glass-detail-label">Preço à vista:</span>
                <span className="glass-detail-val price">{v.price}</span>
              </div>
            </div>
          ))}
        </div>

        {product.warranty && (
          <div className="glass-warranty">{product.warranty}</div>
        )}

        <a
          href={`https://wa.me/${wa}?text=${waMessage}`}
          target="_blank"
          rel="noreferrer"
          className="btn-order-wa"
        >
          <WhatsAppIcon />
          Falar com Consultor
        </a>
      </div>
    </div>
  )
}
