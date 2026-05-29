// SVG padrão do celular (sem imagem)
export const defaultPhoneSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 500" width="300" height="500">
    <rect x="20" y="20" width="260" height="460" rx="40" fill="#f0f0f0" stroke="#cccccc" stroke-width="6"/>
    <rect x="25" y="25" width="250" height="450" rx="36" fill="#ffffff"/>
    <rect x="40" y="40" width="110" height="110" rx="24" fill="#e2e2e2" opacity="0.9"/>
    <circle cx="68" cy="68" r="18" fill="#1a1a1a"/>
    <circle cx="68" cy="68" r="8" fill="#333333"/>
    <circle cx="122" cy="95" r="18" fill="#1a1a1a"/>
    <circle cx="122" cy="95" r="8" fill="#333333"/>
    <circle cx="68" cy="122" r="18" fill="#1a1a1a"/>
    <circle cx="68" cy="122" r="8" fill="#333333"/>
    <circle cx="122" cy="55" r="6" fill="#fffae0"/>
    <circle cx="122" cy="130" r="8" fill="#000000" opacity="0.8"/>
    <path d="M150,230 c-15,0 -20,10 -35,10 c-15,0 -25,-12 -25,-32 c0,-25 15,-40 32,-40 c12,0 20,8 26,8 c6,0 12,-8 26,-8 c12,0 24,10 24,28 c0,5 -3,15 -8,25 c-8,15 -18,29 -30,29 c-5,0 -10,-10 -15,-10 Z" fill="#b5b5b5"/>
    <path d="M165,160 c8,-10 7,-20 7,-20 c0,0 -10,1 -17,8 c-7,8 -7,18 -7,18 c0,0 9,1 17,-6 Z" fill="#b5b5b5"/>
  </svg>
`)}`

// SVG de ondas abstratas (fundo do card premium)
export const defaultAbstractWaveSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <path d="M20,100 Q60,20 100,100 T180,100" fill="none" stroke="rgba(197,168,128,0.4)" stroke-width="4"/>
    <path d="M10,80 Q70,40 110,120 T190,80" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(197,168,128,0.1)" stroke-width="1" stroke-dasharray="5,5"/>
  </svg>
`)}`

// Fundo neon padrão para o style-2
export const defaultNeonBackground = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), radial-gradient(circle at 70% 30%, #e2583e 0%, #0d0d0d 60%)`

// Ícone SVG do WhatsApp
export const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.982L2 22l5.202-1.362a9.928 9.928 0 004.808 1.246h.004c5.505 0 9.99-4.478 9.99-9.984A9.993 9.993 0 0012.012 2zm5.788 14.162c-.319.897-1.616 1.761-2.224 1.832-.54.062-1.246.096-2.008-.145a8.77 8.77 0 01-3.666-2.186 9.2 9.2 0 01-2.536-3.818c-.461-1.229-.026-2.363.39-2.923.238-.321.579-.425.772-.425h.582c.153 0 .367.013.541.424.184.437.643 1.57.704 1.696.061.127.102.274.01.458-.092.184-.138.3-.275.459-.138.16-.29.356-.413.478-.137.138-.28.288-.122.56.157.272.702 1.156 1.503 1.87.802.714 1.48.944 1.787 1.096.307.153.483.128.663-.077.18-.204.767-.892.973-1.198.204-.306.408-.255.688-.153.28.102 1.783.84 2.089.993.306.153.51.229.582.357.072.127.072.739-.247 1.636z"/>
  </svg>
)
