import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const tabs = [
  { id: 'inicio', label: 'Inicio', icon: 'fa-house' },
  { id: 'soluciones', label: 'Soluciones', icon: 'fa-shield-halved' },
  { id: 'contacto', label: 'Contacto', icon: 'fa-envelope' },
]
const spring = { type: 'spring', stiffness: 320, damping: 30 }

export default function Navbar({ tab, go }) {
  const [scrolled, setScrolled] = useState(false)
  const [hover, setHover] = useState(false) // mouse encima
  const [open, setOpen] = useState(false)   // toque en pantallas táctiles

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 90)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => setOpen(false), 4000)
    return () => clearTimeout(t)
  }, [open])

  // Al bajar, la barra se encoge en un lector biométrico; se expande con hover o toque
  const expanded = !scrolled || hover || open
  const ir = (t) => { setOpen(false); go(t) }

  return (
    <>
      <header className="top">
        <button className="brand" onClick={() => go('inicio')} aria-label="AJ Tech Security">
          <span className="app-ico"><i className="fa-solid fa-shield-halved" /></span>
          <span>AJ Tech Security</span>
        </button>
      </header>

      <div className="nv-wrap">
        <motion.nav layout className="nv" style={{ borderRadius: 999 }} transition={spring}
          onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <AnimatePresence initial={false} mode="popLayout">
            {expanded ? (
              <motion.div key="tabs" layout className="nv-links" role="tablist"
                initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={spring}>
                {tabs.map((t) => (
                  <button key={t.id} role="tab" aria-selected={tab === t.id} className={tab === t.id ? 'on' : ''} onClick={() => ir(t.id)}>
                    {tab === t.id && <motion.span layoutId="nv-pill" className="nv-pill" transition={spring} />}
                    <i className={`fa-solid ${t.icon}`} />
                    <span>{t.label}</span>
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.button key="bio" layout className="bio" onClick={() => setOpen(true)} aria-label="Abrir navegación"
                initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
                whileTap={{ scale: 0.88 }} transition={spring}>
                <span className="bio-ring" /><span className="bio-ring r2" />
                <span className="bio-core">
                  <i className="fa-solid fa-fingerprint" />
                  <span className="bio-beam" />
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  )
}
