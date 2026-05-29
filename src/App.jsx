import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CatalogPage from './pages/CatalogPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import AssistancePage from './pages/AssistancePage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/assistencia" element={<AssistancePage />} />
      </Routes>
    </BrowserRouter>
  )
}
