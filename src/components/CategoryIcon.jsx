import * as Lucide from 'lucide-react'

export default function CategoryIcon({ name, size = 16, className = '' }) {
  const IconComponent = Lucide[name] || Lucide.Package
  return <IconComponent size={size} className={className} />
}
