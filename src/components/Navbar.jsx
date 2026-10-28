import { motion } from 'framer-motion'

const tabs = [
  { id: 'inicio', label: 'Inicio', icon: 'fa-house' },
  { id: 'soluciones', label: 'Soluciones', icon: 'fa-shield-halved' },
  { id: 'contacto', label: 'Contacto', icon: 'fa-envelope' },
]

export default function Navbar({ tab, go }) {
  return (
    <>
      <header className="top">
        <button className="brand" onClick={() => go('inicio')}>
          <span className="app-ico"><i className="fa-solid fa-shield-halved" /></span>
          <span>AJ Tech Security</span>
        </button>
      </header>

      <nav className="dock" role="tablist" aria-label="Navegación">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id}
            className={tab === t.id ? 'on' : ''} onClick={() => go(t.id)}>
            {tab === t.id && (
              <motion.span layoutId="pill" className="pill"
                transition={{ type: 'spring', stiffness: 380, damping: 28 }} />
            )}
            <i className={`fa-solid ${t.icon}`} />
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
    </>
  )
}
