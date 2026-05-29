import { Search, X, Wrench } from 'lucide-react'

export default function Header({ appName, searchQuery, setSearchQuery }) {
  return (
    <header>
      <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img
            src="/logo.png"
            alt={appName || 'Império Phones'}
            className="logo-img"
            style={{ height: '42px', objectFit: 'contain', transition: 'transform 0.3s ease' }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </a>
      </div>

      <div className="header-actions">
        {setSearchQuery !== undefined && (
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar modelo, GB..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearchQuery('')}
                title="Limpar busca"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}

        <a href="/assistencia" className="btn-header-assistance">
          <Wrench size={15} />
          <span>Assistência Técnica</span>
        </a>
      </div>
    </header>
  )
}

