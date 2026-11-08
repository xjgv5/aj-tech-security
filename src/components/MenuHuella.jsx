import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, animate, motion, useMotionTemplate, useMotionValue } from 'framer-motion'

const enlaces = [
  { id: 'inicio', label: 'Inicio', desc: 'Conoce AJ Tech Security', icon: 'fa-house' },
  { id: 'soluciones', label: 'Soluciones', desc: 'Biometría, CCTV y accesos', icon: 'fa-shield-halved' },
  { id: 'contacto', label: 'Contacto', desc: 'Pide tu cotización', icon: 'fa-envelope' },
]
const curva = [0.65, 0, 0.35, 1]

// Botón de huella (como un menú hamburguesa). El menú se abre como un círculo que cubre toda la pantalla.
export default function MenuHuella({ tab, go }) {
  const [abierto, setAbierto] = useState(false)
  const [visible, setVisible] = useState(false)
  const [elegido, setElegido] = useState(null)
  const [pulso, setPulso] = useState(0)
  const r = useMotionValue(0)
  const clip = useMotionTemplate`circle(${r}px at calc(100% - 46px) 40px)`

  const abrir = () => {
    setVisible(true); setAbierto(true)
    animate(r, 2600, { duration: 0.8, ease: curva })
  }
  const cerrar = () => {
    setAbierto(false)
    animate(r, 0, { duration: 0.6, ease: curva }).then(() => { setVisible(false); setElegido(null) })
  }
  const elegir = (id) => {
    if (elegido) return
    setElegido(id)
    setPulso((p) => p + 1) // dispara el pulso de la huella
    setTimeout(() => { go(id); cerrar() }, 480) // deja ver el escaneo y luego navega
  }

  useEffect(() => {
    if (!visible) return
    const k = (e) => e.key === 'Escape' && cerrar()
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [visible])

  const clave = `${pulso}-${tab}` // el pulso se repite al elegir un enlace o al cambiar de sección

  return (
    <>
      <button className={`fp-btn ${abierto ? 'open' : ''}`} onClick={abierto ? cerrar : abrir} aria-expanded={abierto} aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}>
        <AnimatePresence>
          {abierto && (
            <motion.span className="fp-hint" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }} exit={{ opacity: 0, x: 8, transition: { duration: 0.12 } }}>
              Cerrar
            </motion.span>
          )}
        </AnimatePresence>
        <span key={`p${clave}`} className="fp-pulse" />
        <span key={`f${clave}`} className="fp-flash"><i className="fa-solid fa-fingerprint" /><span className="fp-beam" /></span>
      </button>

      {visible && createPortal(
        <motion.div className="fpm" style={{ clipPath: clip }} role="dialog" aria-modal="true" aria-label="Menú">
          <i className="fa-solid fa-fingerprint fpm-mark" aria-hidden="true" />
          <nav>
            {enlaces.map((l, i) => (
              <motion.button key={l.id} className={`fpm-link ${tab === l.id ? 'on' : ''} ${elegido === l.id ? 'picked' : ''}`} onClick={() => elegir(l.id)}
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                animate={abierto
                  ? { opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: 0.3 + i * 0.09, type: 'spring', stiffness: 110, damping: 18 } }
                  : { opacity: 0, y: -20, transition: { duration: 0.2 } }}>
                <span className="sq"><i className={`fa-solid ${l.icon}`} /></span>
                <span className="fpm-txt"><b>{l.label}</b><small>{l.desc}</small></span>
                <span className="fpm-beam" />
              </motion.button>
            ))}
          </nav>
          <motion.div className="fpm-foot" initial={{ opacity: 0 }} animate={{ opacity: abierto ? 1 : 0, transition: { delay: abierto ? 0.65 : 0 } }}>
            <a href="tel:+522220000000"><i className="fa-solid fa-phone" /> +52 222 000 0000</a>
            <a href="mailto:contacto@ajtechsecurity.com"><i className="fa-solid fa-envelope" /> contacto@ajtechsecurity.com</a>
          </motion.div>
        </motion.div>,
        document.body
      )}
    </>
  )
}
