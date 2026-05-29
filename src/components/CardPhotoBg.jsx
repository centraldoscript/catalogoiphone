import { WhatsAppIcon } from '../lib/assets.jsx'

export default function CardPhotoBg({ product, whatsapp }) {
  const phoneImage = product.image_url || null
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

  const s = product.image_settings || {}
  const imgStyle = {
    width: `${s.width ?? 80}%`,
    transform: `translate(${s.x ?? 0}px, ${s.y ?? 0}px) rotate(${s.rotate ?? 0}deg)`,
  }

  const bgScale = s.bg_scale ?? 130
  const bgFilter = [
    `blur(${s.bg_blur ?? 18}px)`,
    `brightness(${(s.bg_brightness ?? 60) / 100})`,
    `saturate(${(s.bg_saturation ?? 140) / 100})`,
  ].join(' ')

  return (
    <div className="card-photo-bg">

      {/* Camada de fundo: mesma foto com efeitos */}
      {phoneImage && (
        <div
          className="cpb-bg"
          style={{
            backgroundImage: `url('${phoneImage}')`,
            filter: bgFilter,
            width: `${bgScale}%`,
            height: `${bgScale}%`,
          }}
        />
      )}

      {/* Gradiente escurecendo para o rodapé */}
      <div className="cpb-gradient" />

      {/* Título no topo */}
      <div className="cpb-header">
        {product.condition && <div className="cpb-badge">{product.condition}</div>}
        <h3 className="cpb-title">{product.name}</h3>
      </div>

      {/* Foto do produto (frente) */}
      <div className="cpb-phone-wrapper">
        {phoneImage && (
          <img
            src={phoneImage}
            alt={product.name}
            className="cpb-phone-img"
            style={imgStyle}
          />
        )}
      </div>

      {/* Rodapé glass */}
      <div className="cpb-footer">
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
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', textAlign: 'center' }}>
            {product.warranty}
          </div>
        )}
      </div>
    </div>
  )
}
