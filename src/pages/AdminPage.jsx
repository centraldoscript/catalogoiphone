import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { LogOut, Smartphone, Plus, Edit, Trash2, X, Folder, Package, Tag, Wrench, Headphones, Gamepad2, RefreshCw, Volume2, Tv, Gift, ShoppingBag } from 'lucide-react'
import CategoryIcon from '../components/CategoryIcon.jsx'
import { removeBackground } from '@imgly/background-removal'
import CardPremiumDark from '../components/CardPremiumDark.jsx'
import CardLifestyleGlass from '../components/CardLifestyleGlass.jsx'
import CardPhotoBg from '../components/CardPhotoBg.jsx'

const BUCKET = 'product-images'

const emptyProductForm = {
  name: '',
  category_id: '',
  model: '',
  condition: '',
  style: 'style-1',
  warranty: '',
  whatsapp: '5511999999999',
  featured: false,
  is_active: true,
  sort_order: 0,
  image_settings: { width: 80, x: 0, y: 0, rotate: 0, bg_blur: 18, bg_brightness: 60, bg_saturation: 140, bg_scale: 130 },
}

const emptyCategoryForm = {
  name: '',
  slug: '',
  icon: 'Package',
  sort_order: 0,
}

const emptyVariant = () => ({ size: '', price: '', note: '' })

const AVAILABLE_ICONS = [
  { name: 'Smartphone', label: 'Celular' },
  { name: 'Volume2', label: 'Caixa de Som' },
  { name: 'RefreshCw', label: 'Seta de Reciclagem' },
  { name: 'Gamepad2', label: 'Controle de Jogo' },
  { name: 'Headphones', label: 'Fone de Ouvido' },
  { name: 'Wrench', label: 'Chave Inglesa / Suporte' },
  { name: 'Package', label: 'Pacote / Padrão' },
  { name: 'Tag', label: 'Etiqueta' },
  { name: 'Tv', label: 'Televisão' },
  { name: 'Gift', label: 'Presente' },
  { name: 'ShoppingBag', label: 'Sacola de Compras' },
]

export default function AdminPage() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  // Tab navigation: 'products' | 'categories'
  const [activeTab, setActiveTab] = useState('products')

  // Login form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  // Dashboard shared states
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loadingList, setLoadingList] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerType, setDrawerType] = useState('product') // 'product' | 'category'

  // Product edit states
  const [editingProduct, setEditingProduct] = useState(null)
  const [productForm, setProductForm] = useState(emptyProductForm)
  const [variants, setVariants] = useState([emptyVariant()])
  const [phoneFile, setPhoneFile] = useState(null)
  const [phonePreview, setPhonePreview] = useState(null)
  const [bgFile, setBgFile] = useState(null)
  const [bgPreview, setBgPreview] = useState(null)

  // Category edit states
  const [editingCategory, setEditingCategory] = useState(null)
  const [categoryForm, setCategoryForm] = useState(emptyCategoryForm)

  const [saving, setSaving] = useState(false)
  const [removingBg, setRemovingBg] = useState(false)

  // Settings states
  const [settings, setSettings] = useState({ whatsapp: '', app_name: 'Império Phones' })
  const [savingSettings, setSavingSettings] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [updatingAuth, setUpdatingAuth] = useState(false)

  // 1. Verificar sessão
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setAuthLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    loadSettings()

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    document.title = `Admin | ${settings.app_name || 'Painel'}`
  }, [settings.app_name])

  // Clipboard Paste handler para colar imagem do clipboard diretamente no formulário
  useEffect(() => {
    function handlePaste(e) {
      if (!drawerOpen || drawerType !== 'product') return
      
      const items = e.clipboardData?.items
      if (!items) return

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile()
          if (!file) continue

          const url = URL.createObjectURL(file)
          setPhoneFile(file)
          setPhonePreview(url)
          
          e.preventDefault()
          break
        }
      }
    }

    window.addEventListener('paste', handlePaste)
    return () => window.removeEventListener('paste', handlePaste)
  }, [drawerOpen, drawerType])

  // 2. Carregar dados se logado
  useEffect(() => {
    if (user) {
      loadAllData()
    }
  }, [user])

  async function loadSettings() {
    try {
      const { data } = await supabase
        .from('settings')
        .select('*')
      if (data) {
        const settingsMap = {}
        data.forEach(item => {
          settingsMap[item.key] = item.value
        })
        setSettings(prev => ({ ...prev, ...settingsMap }))
      }
    } catch (err) {
      console.error('Erro ao carregar configurações:', err)
    }
  }

  async function handleSettingsSubmit(e) {
    e.preventDefault()
    setSavingSettings(true)
    try {
      const promises = Object.entries(settings).map(async ([key, value]) => {
        const { error } = await supabase
          .from('settings')
          .upsert({ key, value })
        if (error) throw error
      })
      await Promise.all(promises)
      alert('Configurações salvas com sucesso!')
    } catch (err) {
      alert('Erro ao salvar configurações: ' + err.message)
    } finally {
      setSavingSettings(false)
    }
  }

  async function handleAuthUpdate(e) {
    e.preventDefault()
    setUpdatingAuth(true)
    try {
      const updatePayload = {}
      if (newEmail && newEmail !== user.email) {
        updatePayload.email = newEmail
      }
      if (newPassword) {
        updatePayload.password = newPassword
      }

      if (Object.keys(updatePayload).length === 0) {
        alert('Nenhuma alteração de e-mail ou senha inserida.')
        return
      }

      const { error } = await supabase.auth.updateUser(updatePayload)
      if (error) throw error

      alert('Dados de acesso atualizados com sucesso! (Se alterou o e-mail, verifique a caixa de entrada para confirmar)')
      setNewPassword('')
    } catch (err) {
      alert('Erro ao atualizar dados de acesso: ' + err.message)
    } finally {
      setUpdatingAuth(false)
    }
  }

  async function loadAllData() {
    setLoadingList(true)
    if (user) {
      setNewEmail(user.email || '')
    }
    await Promise.all([loadCategories(), loadProducts(), loadSettings()])
    setLoadingList(false)
  }

  // Preencher form do produto ao editar
  useEffect(() => {
    if (editingProduct) {
      setProductForm({
        name: editingProduct.name || '',
        category_id: editingProduct.category_id || '',
        model: editingProduct.model || '',
        condition: editingProduct.condition || '',
        style: editingProduct.style || 'style-1',
        warranty: editingProduct.warranty || '',
        whatsapp: editingProduct.whatsapp || '5511999999999',
        featured: editingProduct.featured ?? false,
        is_active: editingProduct.is_active ?? true,
        sort_order: editingProduct.sort_order ?? 0,
        image_settings: editingProduct.image_settings || { width: 80, x: 0, y: 0, rotate: 0 },
      })
      setVariants(editingProduct.variants?.length ? editingProduct.variants : [emptyVariant()])
      setPhonePreview(editingProduct.image_url || null)
      setBgPreview(editingProduct.bg_image_url || null)
      setPhoneFile(null)
      setBgFile(null)
    } else {
      resetProductForm()
    }
  }, [editingProduct])

  // Preencher form da categoria ao editar
  useEffect(() => {
    if (editingCategory) {
      setCategoryForm({
        name: editingCategory.name || '',
        slug: editingCategory.slug || '',
        icon: editingCategory.icon || 'Package',
        sort_order: editingCategory.sort_order ?? 0,
      })
    } else {
      setCategoryForm(emptyCategoryForm)
    }
  }, [editingCategory])

  function resetProductForm() {
    setProductForm({
      ...emptyProductForm,
      category_id: categories[0]?.id || '',
    })
    setVariants([emptyVariant()])
    setPhoneFile(null)
    setPhonePreview(null)
    setBgFile(null)
    setBgPreview(null)
  }

  async function loadCategories() {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })
    const cats = data || []
    setCategories(cats)
    return cats
  }

  async function loadProducts() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    setProducts(data || [])
  }

  async function handleLogin(e) {
    e.preventDefault()
    setLoginError('')
    setLoginLoading(true)
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
    setLoginLoading(false)
    if (err) {
      setLoginError('E-mail ou senha incorretos.')
      return
    }
    setUser(data.user)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  function handleFileChange(e, type) {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    if (type === 'phone') {
      setPhoneFile(file)
      setPhonePreview(url)
    } else {
      setBgFile(file)
      setBgPreview(url)
    }
  }

  async function uploadImage(file, folder) {
    const ext = file.name.split('.').pop()
    const path = `${folder}/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true })
    if (error) throw error
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    return data.publicUrl
  }

  // Slugify automático para categoria
  function handleCategoryNameChange(name) {
    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
    setCategoryForm(f => ({ ...f, name, slug }))
  }

  // Submit de Produtos
  async function handleProductSubmit(e) {
    e.preventDefault()
    if (variants.some(v => !v.size || !v.price)) {
      alert('Preencha o tamanho e preço de todas as variantes.')
      return
    }
    setSaving(true)

    try {
      let imageUrl = editingProduct?.image_url || null
      let bgImageUrl = editingProduct?.bg_image_url || null

      if (phoneFile) imageUrl = await uploadImage(phoneFile, 'phones')
      if (bgFile) bgImageUrl = await uploadImage(bgFile, 'backgrounds')

      const payload = {
        name: productForm.name,
        category_id: productForm.category_id || null,
        model: productForm.model,
        condition: productForm.condition,
        style: productForm.style,
        warranty: productForm.warranty,
        whatsapp: productForm.whatsapp,
        featured: productForm.featured,
        is_active: productForm.is_active,
        sort_order: parseInt(productForm.sort_order, 10) || 0,
        variants,
        image_url: imageUrl,
        bg_image_url: bgImageUrl,
        image_settings: productForm.image_settings || { width: 80, x: 0, y: 0, rotate: 0 },
      }

      let error
      if (editingProduct) {
        ;({ error } = await supabase.from('products').update(payload).eq('id', editingProduct.id))
      } else {
        ;({ error } = await supabase.from('products').insert(payload))
      }

      if (error) throw error

      setDrawerOpen(false)
      setEditingProduct(null)
      resetProductForm()
      await loadProducts()
    } catch (err) {
      alert('Erro ao salvar produto: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  // Submit de Categorias
  async function handleCategorySubmit(e) {
    e.preventDefault()
    if (!categoryForm.name || !categoryForm.slug) {
      alert('Preencha o nome e slug da categoria.')
      return
    }
    setSaving(true)

    try {
      const payload = {
        name: categoryForm.name,
        slug: categoryForm.slug,
        icon: categoryForm.icon,
        sort_order: parseInt(categoryForm.sort_order, 10) || 0,
      }

      let error
      if (editingCategory) {
        ;({ error } = await supabase.from('categories').update(payload).eq('id', editingCategory.id))
      } else {
        ;({ error } = await supabase.from('categories').insert(payload))
      }

      if (error) throw error

      setDrawerOpen(false)
      setEditingCategory(null)
      setCategoryForm(emptyCategoryForm)
      await loadCategories()
    } catch (err) {
      alert('Erro ao salvar categoria: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleProductDelete(id) {
    if (!confirm('Remover este produto?')) return
    await supabase.from('products').delete().eq('id', id)
    await loadProducts()
  }

  async function handleCategoryDelete(id) {
    if (!confirm('Remover esta categoria? Produtos vinculados perderão a categoria.')) return
    await supabase.from('categories').delete().eq('id', id)
    await loadCategories()
  }

  async function handleRemoveBackground() {
    let source = phoneFile
    if (!source && phonePreview) {
      try {
        const response = await fetch(phonePreview)
        source = await response.blob()
      } catch (e) {
        alert('Erro ao carregar imagem remota para remover fundo: ' + e.message)
        return
      }
    }
    if (!source) return

    setRemovingBg(true)
    try {
      const processedBlob = await removeBackground(source)
      const fileName = phoneFile?.name 
        ? `${phoneFile.name.substring(0, phoneFile.name.lastIndexOf('.'))}-nobg.png`
        : 'product-nobg.png'
      const cleanFile = new File([processedBlob], fileName, { type: 'image/png' })
      setPhoneFile(cleanFile)
      setPhonePreview(URL.createObjectURL(cleanFile))
    } catch (err) {
      alert('Erro ao remover fundo: ' + err.message)
      console.error(err)
    } finally {
      setRemovingBg(false)
    }
  }

  function updateVariant(index, field, value) {
    let finalValue = value
    if (field === 'price') {
      const digits = value.replace(/\D/g, '')
      if (digits) {
        finalValue = (parseInt(digits, 10) / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
      } else {
        finalValue = ''
      }
    }
    setVariants(prev => prev.map((v, i) => i === index ? { ...v, [field]: finalValue } : v))
  }

  function removeVariant(index) {
    setVariants(prev => prev.filter((_, i) => i !== index))
  }

  if (authLoading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)' }}>
        <span className="spinner" style={{ width: 40, height: 40, borderWidth: 3 }} />
      </div>
    )
  }

  if (!user) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)', padding: '20px' }}>
        <div className="modal-card" style={{ animation: 'none', width: '100%', maxWidth: '400px' }}>
          <div className="modal-logo" style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <img src="/logo.png" alt={settings.app_name || 'Império Phones'} style={{ height: '48px', objectFit: 'contain' }} />
          </div>
          <div className="modal-subtitle">Painel de Administração</div>

          {loginError && <div className="modal-error">{loginError}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="admin-email">E-mail</label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@email.com"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="admin-password">Senha</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="btn primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '8px' }}
              disabled={loginLoading}
            >
              {loginLoading ? <span className="spinner" /> : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <header className="admin-topbar">
        <div className="admin-topbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.png" alt={settings.app_name || 'Império Phones'} style={{ height: '30px', objectFit: 'contain' }} />
          <span style={{ fontSize: '11px', background: 'rgba(235, 94, 26, 0.15)', color: '#eb5e1a', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', letterSpacing: '0.5px' }}>ADMIN</span>
        </div>
        <div className="admin-topbar-right">
          <span className="admin-user-email">{user.email}</span>
          <button
            className="btn"
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <LogOut size={14} /> Sair
          </button>
        </div>
      </header>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="sidebar-label">Navegação</div>
          <button
            className={`sidebar-link ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Smartphone size={16} /> Produtos
          </button>
          <button
            className={`sidebar-link ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Folder size={16} /> Categorias
          </button>
          <button
            className={`sidebar-link ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Wrench size={16} /> Configurações
          </button>
        </aside>

        <main className="admin-content">
          {activeTab === 'settings' ? (
            <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div>
                <div className="admin-content-header" style={{ marginBottom: '20px' }}>
                  <h2>Configurações Gerais</h2>
                </div>
                <form onSubmit={handleSettingsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="form-group">
                    <label htmlFor="setting-appname">Nome do App / Loja</label>
                    <input
                      id="setting-appname"
                      type="text"
                      value={settings.app_name || ''}
                      onChange={e => setSettings(prev => ({ ...prev, app_name: e.target.value }))}
                      placeholder="Ex: LAG iPhones"
                      required
                    />
                    <small style={{ color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                      Este nome será exibido no cabeçalho do catálogo e no painel do administrador.
                    </small>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="setting-whatsapp">WhatsApp Geral (DDD + número)</label>
                    <input
                      id="setting-whatsapp"
                      type="text"
                      value={settings.whatsapp || ''}
                      onChange={e => setSettings(prev => ({ ...prev, whatsapp: e.target.value }))}
                      placeholder="Ex: 5511999999999"
                      required
                    />
                    <small style={{ color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                      Este número será usado em todos os botões de WhatsApp dos cards do catálogo.
                    </small>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn primary"
                    style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start' }}
                    disabled={savingSettings}
                  >
                    {savingSettings ? <span className="spinner" /> : 'Salvar Configurações'}
                  </button>
                </form>
              </div>

              <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '30px' }}>
                <div className="admin-content-header" style={{ marginBottom: '20px' }}>
                  <h2>Acesso ao Painel</h2>
                </div>
                <form onSubmit={handleAuthUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="form-group">
                    <label htmlFor="auth-email">E-mail do Administrador (Usuário)</label>
                    <input
                      id="auth-email"
                      type="email"
                      value={newEmail}
                      onChange={e => setNewEmail(e.target.value)}
                      placeholder="admin@email.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="auth-password">Nova Senha (deixe em branco para não alterar)</label>
                    <input
                      id="auth-password"
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn primary"
                    style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start' }}
                    disabled={updatingAuth}
                  >
                    {updatingAuth ? <span className="spinner" /> : 'Atualizar Acesso'}
                  </button>
                </form>
              </div>
            </div>
          ) : activeTab === 'products' ? (
            <>
              <div className="admin-content-header">
                <h2>Produtos Cadastrados</h2>
                <button
                  className="btn primary"
                  onClick={() => {
                    setEditingProduct(null)
                    resetProductForm()
                    setDrawerType('product')
                    setDrawerOpen(true)
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Plus size={16} /> Novo Produto
                </button>
              </div>

              {loadingList ? (
                <div style={{ textAlign: 'center', padding: '40px' }}><span className="spinner" /></div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '60px' }}>Foto</th>
                      <th>Nome</th>
                      <th>Categoria</th>
                      <th>Modelo</th>
                      <th>Condição</th>
                      <th>Estilo</th>
                      <th>Destaque</th>
                      <th>Ativo</th>
                      <th style={{ width: '100px', textAlign: 'right' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => {
                      const cat = categories.find(c => c.id === p.category_id)
                      return (
                        <tr key={p.id}>
                          <td>
                            <img
                              src={p.image_url || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect fill="%23111"/></svg>'}
                              alt=""
                              style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px', background: '#111' }}
                            />
                          </td>
                          <td style={{ fontWeight: '500' }}>{p.name}</td>
                          <td>
                            {cat ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <CategoryIcon name={cat.icon} size={16} />
                                <span>{cat.name}</span>
                              </div>
                            ) : '-'}
                          </td>
                          <td>{p.model || '-'}</td>
                          <td>{p.condition || '-'}</td>
                          <td>
                            <span style={{ fontSize: '12px', color: 'var(--accent-gold)' }}>
                              {p.style === 'style-1' ? 'Design 1' : p.style === 'style-2' ? 'Design 2' : 'Design 3'}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${p.featured ? 'featured' : 'inactive'}`}>
                              {p.featured ? 'Sim' : 'Não'}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${p.is_active ? 'active' : 'inactive'}`}>
                              {p.is_active ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                              <button
                                className="btn-icon"
                                title="Editar"
                                onClick={() => {
                                  setEditingProduct(p)
                                  setDrawerType('product')
                                  setDrawerOpen(true)
                                }}
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                className="btn-icon del"
                                title="Excluir"
                                onClick={() => handleProductDelete(p.id)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </>
          ) : (
            <>
              <div className="admin-content-header">
                <h2>Categorias Cadastradas</h2>
                <button
                  className="btn primary"
                  onClick={() => {
                    setEditingCategory(null)
                    setCategoryForm(emptyCategoryForm)
                    setDrawerType('category')
                    setDrawerOpen(true)
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Plus size={16} /> Nova Categoria
                </button>
              </div>

              {loadingList ? (
                <div style={{ textAlign: 'center', padding: '40px' }}><span className="spinner" /></div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '60px' }}>Ícone</th>
                      <th>Nome</th>
                      <th>Slug</th>
                      <th>Ordem</th>
                      <th style={{ width: '100px', textAlign: 'right' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(cat => (
                      <tr key={cat.id}>
                        <td>
                          <div style={{ background: 'rgba(255,255,255,0.05)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px' }}>
                            <CategoryIcon name={cat.icon} size={18} />
                          </div>
                        </td>
                        <td style={{ fontWeight: '500' }}>{cat.name}</td>
                        <td><code>{cat.slug}</code></td>
                        <td>{cat.sort_order}</td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                            <button
                              className="btn-icon"
                              title="Editar"
                              onClick={() => {
                                setEditingCategory(cat)
                                setDrawerType('category')
                                setDrawerOpen(true)
                              }}
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              className="btn-icon del"
                              title="Excluir"
                              onClick={() => handleCategoryDelete(cat.id)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </main>
      </div>

      {/* Drawer do Formulário de Produto/Categoria */}
      <div className={`drawer-backdrop ${drawerOpen ? 'show' : ''}`} onClick={() => setDrawerOpen(false)} />
      
      <div className={`admin-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h3>
            {drawerType === 'product'
              ? (editingProduct ? 'Editar Produto' : 'Novo Produto')
              : (editingCategory ? 'Editar Categoria' : 'Nova Categoria')
            }
          </h3>
          <button className="close-btn" onClick={() => setDrawerOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="drawer-inner">
          {/* Coluna do formulário */}
          <div className="drawer-form-col">
          <div className="drawer-body">
          {drawerType === 'product' ? (
            <form id="product-form" onSubmit={handleProductSubmit}>
              {/* Nome */}
              <div className="form-group">
                <label htmlFor="p-name">Nome do Produto</label>
                <input
                  id="p-name"
                  type="text"
                  value={productForm.name}
                  onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Ex: iPhone 17 Pro Max"
                  required
                />
              </div>

              {/* Categoria */}
              <div className="form-group">
                <label htmlFor="p-category">Categoria</label>
                <select
                  id="p-category"
                  value={productForm.category_id}
                  onChange={e => setProductForm(f => ({ ...f, category_id: e.target.value }))}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Modelo / Subdivisão */}
              <div className="form-group">
                <label htmlFor="p-model">Modelo / Subdivisão</label>
                <input
                  id="p-model"
                  type="text"
                  value={productForm.model}
                  onChange={e => setProductForm(f => ({ ...f, model: e.target.value }))}
                  placeholder="Ex: Pro Max, Pro, Plus"
                />
              </div>

              {/* Condição + Estilo */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="p-condition">Condição / Subtítulo</label>
                  <input
                    id="p-condition"
                    type="text"
                    value={productForm.condition}
                    onChange={e => setProductForm(f => ({ ...f, condition: e.target.value }))}
                    placeholder="Ex: Seminovo"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="p-style">Estilo de Exibição</label>
                  <select
                    id="p-style"
                    value={productForm.style}
                    onChange={e => setProductForm(f => ({ ...f, style: e.target.value }))}
                  >
                    <option value="style-1">Design 1 – Fundo Preto</option>
                    <option value="style-2">Design 2 – Foto + Vidro</option>
                    <option value="style-3">Design 3 – Foto como Fundo</option>
                  </select>
                </div>
              </div>

              {/* Configurações de Destaque / Ativo / Ordem */}
              <div className="form-row">
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
                  <input
                    id="p-featured"
                    type="checkbox"
                    checked={productForm.featured}
                    onChange={e => setProductForm(f => ({ ...f, featured: e.target.checked }))}
                    style={{ width: 'auto', cursor: 'pointer' }}
                  />
                  <label htmlFor="p-featured" style={{ margin: 0, cursor: 'pointer' }}>Destaque</label>
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
                  <input
                    id="p-active"
                    type="checkbox"
                    checked={productForm.is_active}
                    onChange={e => setProductForm(f => ({ ...f, is_active: e.target.checked }))}
                    style={{ width: 'auto', cursor: 'pointer' }}
                  />
                  <label htmlFor="p-active" style={{ margin: 0, cursor: 'pointer' }}>Ativo no Catálogo</label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="p-sort">Ordem de Exibição (Menor primeiro)</label>
                <input
                  id="p-sort"
                  type="number"
                  value={productForm.sort_order}
                  onChange={e => setProductForm(f => ({ ...f, sort_order: e.target.value }))}
                  placeholder="0"
                />
              </div>

              {/* Upload: foto do aparelho */}
              <div className="form-group">
                <label>Foto do Aparelho</label>

                {/* Botão de seleção de arquivo separado */}
                <label
                  htmlFor="phone-file-input"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '2px dashed rgba(255,255,255,0.15)',
                    borderRadius: '10px',
                    padding: '10px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: 'var(--text-muted)',
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-gold)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                >
                  📎 {phonePreview ? 'Trocar Imagem' : 'Clique ou Cole (Ctrl+V) – JPG, PNG, WebP'}
                </label>
                <input
                  id="phone-file-input"
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileChange(e, 'phone')}
                  style={{ display: 'none' }}
                />

                {phonePreview && (
                  <>
                    {/* Preview da imagem */}
                    <div style={{ overflow: 'hidden', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '8px' }}>
                      <img
                        src={phonePreview}
                        alt="preview"
                        style={{
                          maxHeight: '100%',
                          objectFit: 'contain',
                          width: `${productForm.image_settings?.width ?? 80}%`,
                          transform: `translate(${productForm.image_settings?.x ?? 0}px, ${productForm.image_settings?.y ?? 0}px) rotate(${productForm.image_settings?.rotate ?? 0}deg)`,
                          transition: 'none',
                          pointerEvents: 'none',
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      className="btn"
                      onClick={handleRemoveBackground}
                      disabled={removingBg}
                      style={{ width: '100%', marginTop: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                      {removingBg ? <span className="spinner" /> : '✨ Remover Fundo (IA)'}
                    </button>

                    <div
                      style={{ marginTop: '16px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', userSelect: 'none' }}
                      onMouseDown={e => e.stopPropagation()}
                    >
                      <div style={{ fontWeight: '600', fontSize: '11px', color: 'var(--accent-gold)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ajuste de Posicionamento</div>

                      {[
                        { label: 'Largura', key: 'width', min: 30, max: 150, unit: '%' },
                        { label: 'Posição Horizontal (X)', key: 'x', min: -100, max: 100, unit: 'px' },
                        { label: 'Posição Vertical (Y)', key: 'y', min: -100, max: 100, unit: 'px' },
                        { label: 'Rotação', key: 'rotate', min: -180, max: 180, unit: '°' },
                      ].map(({ label, key, min, max, unit }) => (
                        <div key={key} style={{ marginBottom: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#aaa', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            <span>{label}</span>
                            <span style={{ color: '#fff' }}>{productForm.image_settings?.[key] ?? (key === 'width' ? 80 : 0)}{unit}</span>
                          </div>
                          <input
                            type="range"
                            min={min}
                            max={max}
                            value={productForm.image_settings?.[key] ?? (key === 'width' ? 80 : 0)}
                            onChange={e => setProductForm(f => ({
                              ...f,
                              image_settings: { ...(f.image_settings || { width: 80, x: 0, y: 0, rotate: 0 }), [key]: parseInt(e.target.value) }
                            }))}
                            style={{ width: '100%', cursor: 'grab', touchAction: 'none' }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Controles do fundo (só style-3) */}
                    {productForm.style === 'style-3' && (
                      <div
                        style={{ marginTop: '12px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', userSelect: 'none' }}
                        onMouseDown={e => e.stopPropagation()}
                      >
                        <div style={{ fontWeight: '600', fontSize: '11px', color: 'var(--accent-gold)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Efeitos do Fundo</div>
                        {[
                          { label: 'Largura do Fundo', key: 'bg_scale', min: 100, max: 250, unit: '%' },
                          { label: 'Blur', key: 'bg_blur', min: 0, max: 40, unit: 'px' },
                          { label: 'Brilho', key: 'bg_brightness', min: 10, max: 150, unit: '%' },
                          { label: 'Saturação', key: 'bg_saturation', min: 0, max: 300, unit: '%' },
                        ].map(({ label, key, min, max, unit }) => {
                          const defaultValue = key === 'bg_blur' ? 18 : key === 'bg_brightness' ? 60 : key === 'bg_saturation' ? 140 : 130;
                          return (
                            <div key={key} style={{ marginBottom: '12px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#aaa', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                <span>{label}</span>
                                <span style={{ color: '#fff' }}>{productForm.image_settings?.[key] ?? defaultValue}{unit}</span>
                              </div>
                              <input
                                type="range"
                                min={min}
                                max={max}
                                value={productForm.image_settings?.[key] ?? defaultValue}
                                onChange={e => setProductForm(f => ({
                                  ...f,
                                  image_settings: { ...(f.image_settings || {}), [key]: parseInt(e.target.value) }
                                }))}
                                style={{ width: '100%', cursor: 'grab', touchAction: 'none' }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Upload: fundo (só style-2) */}
              {productForm.style === 'style-2' && (
                <div className="form-group">
                  <label>Foto de Fundo / Ambiente</label>
                  <div className="upload-area">
                    <input type="file" accept="image/*" onChange={e => handleFileChange(e, 'bg')} />
                    {bgPreview
                      ? <img src={bgPreview} className="upload-preview" alt="preview fundo" />
                      : (
                        <div className="upload-text">
                          <strong>Clique para enviar</strong>
                          JPG, PNG ou WebP
                        </div>
                      )
                    }
                  </div>
                </div>
              )}

              {/* Variantes */}
              <div className="variant-builder">
                <label>Tabela de Preços (Variantes)</label>
                {variants.map((v, i) => (
                  <div className="variant-row" key={i}>
                    <input
                      type="text"
                      placeholder="Gigas (256GB)"
                      value={v.size}
                      onChange={e => updateVariant(i, 'size', e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Preço (R$ 6.999)"
                      value={v.price}
                      onChange={e => updateVariant(i, 'price', e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Cor/Nota"
                      value={v.note}
                      onChange={e => updateVariant(i, 'note', e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn-small-del"
                      onClick={() => removeVariant(i)}
                      disabled={variants.length === 1}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn-add-var"
                  onClick={() => setVariants(prev => [...prev, emptyVariant()])}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Plus size={14} /> Adicionar Opção
                </button>
              </div>

              {/* Garantia + WhatsApp */}
              <div className="form-group">
                <label htmlFor="p-warranty">Nota / Garantia</label>
                <input
                  id="p-warranty"
                  type="text"
                  value={productForm.warranty}
                  onChange={e => setProductForm(f => ({ ...f, warranty: e.target.value }))}
                  placeholder="Ex: Garantia da loja de 1 ano"
                />
              </div>



              <button
                type="submit"
                className="btn primary"
                style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                disabled={saving}
              >
                {saving ? <span className="spinner" /> : (editingProduct ? 'Salvar Alterações' : 'Adicionar ao Catálogo')}
              </button>
            </form>
          ) : (
            <form id="category-form" onSubmit={handleCategorySubmit}>
              {/* Nome da Categoria */}
              <div className="form-group">
                <label htmlFor="cat-name">Nome da Categoria</label>
                <input
                  id="cat-name"
                  type="text"
                  value={categoryForm.name}
                  onChange={e => handleCategoryNameChange(e.target.value)}
                  placeholder="Ex: iPhone, Xiaomi, JBL"
                  required
                />
              </div>

              {/* Slug da Categoria */}
              <div className="form-group">
                <label htmlFor="cat-slug">Slug (Gerado Automaticamente)</label>
                <input
                  id="cat-slug"
                  type="text"
                  value={categoryForm.slug}
                  onChange={e => setCategoryForm(f => ({ ...f, slug: e.target.value }))}
                  placeholder="ex-iphone"
                  required
                />
              </div>

              {/* Ícone Lucide */}
              <div className="form-group">
                <label htmlFor="cat-icon">Ícone Lucide</label>
                <select
                  id="cat-icon"
                  value={categoryForm.icon}
                  onChange={e => setCategoryForm(f => ({ ...f, icon: e.target.value }))}
                  required
                >
                  {AVAILABLE_ICONS.map(ic => (
                    <option key={ic.name} value={ic.name}>
                      {ic.label} ({ic.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Ordem de Exibição */}
              <div className="form-group">
                <label htmlFor="cat-sort">Ordem de Exibição</label>
                <input
                  id="cat-sort"
                  type="number"
                  value={categoryForm.sort_order}
                  onChange={e => setCategoryForm(f => ({ ...f, sort_order: e.target.value }))}
                  placeholder="0"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn primary"
                style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                disabled={saving}
              >
                {saving ? <span className="spinner" /> : (editingCategory ? 'Salvar Categoria' : 'Criar Categoria')}
              </button>
            </form>
          )}
          </div>{/* /drawer-body */}
          </div>{/* /drawer-form-col */}

          {/* Coluna de preview ao vivo – só para produtos */}
          {drawerType === 'product' && (
            <div className="drawer-preview-col">
              <div className="drawer-preview-label">Preview ao Vivo</div>
              <div style={{ width: '100%', aspectRatio: '360/600', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '360px',
                  height: '600px',
                  transform: 'scale(0.78)',
                  transformOrigin: 'top left',
                  pointerEvents: 'none',
                }}>
                  {productForm.style === 'style-1' ? (
                    <CardPremiumDark
                      product={{
                        ...productForm,
                        id: '__preview__',
                        image_url: phonePreview,
                        bg_image_url: bgPreview,
                        variants: variants.filter(v => v.size || v.price),
                      }}
                      whatsapp=""
                    />
                  ) : productForm.style === 'style-3' ? (
                    <CardPhotoBg
                      product={{
                        ...productForm,
                        id: '__preview__',
                        image_url: phonePreview,
                        variants: variants.filter(v => v.size || v.price),
                      }}
                      whatsapp=""
                    />
                  ) : (
                    <CardLifestyleGlass
                      product={{
                        ...productForm,
                        id: '__preview__',
                        image_url: phonePreview,
                        bg_image_url: bgPreview,
                        variants: variants.filter(v => v.size || v.price),
                      }}
                      whatsapp=""
                    />
                  )}
                </div>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
                Escala 78% · Atualiza em tempo real
              </div>
            </div>
          )}
        </div>{/* /drawer-inner */}
      </div>
    </div>
  )
}
