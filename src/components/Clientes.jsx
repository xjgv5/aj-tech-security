import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, animate, motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import Reveal from './Reveal'

// Clientes y fotos de prueba (picsum). Cambia por los reales: fotos: ['/img/clientes/lomas1.jpg', ...]
const foto = (s, n) => `https://picsum.photos/seed/${s}${n}/1100/700`
const base = [
  { name: 'Residencial Lomas', icon: 'fa-house-chimney', serv: 'Acceso residencial', desc: 'Control de visitas y residentes con acceso por app.', seed: 'lomas' },
  { name: 'Grupo Altamira', icon: 'fa-building', serv: 'Control biométrico', desc: 'Acceso por huella en oficinas corporativas.', seed: 'altamira' },
  { name: 'Plaza Norte', icon: 'fa-store', serv: 'CCTV', desc: 'Videovigilancia en pasillos y estacionamiento.', seed: 'plaza' },
  { name: 'Logística Andina', icon: 'fa-truck-fast', serv: 'Control vehicular', desc: 'Plumas y registro de entradas y salidas.', seed: 'logis' },
  { name: 'Colegio Nuevo Siglo', icon: 'fa-graduation-cap', serv: 'CCTV y accesos', desc: 'Seguridad en entradas y áreas comunes.', seed: 'colegio' },
  { name: 'Clínica Vitalia', icon: 'fa-hospital', serv: 'Redes y CCTV', desc: 'Infraestructura de red y cámaras en la clínica.', seed: 'clinica' },
  { name: 'Torre Mirador', icon: 'fa-city', serv: 'Acceso y alarmas', desc: 'Accesos, alarmas e intercomunicación.', seed: 'torre' },
  { name: 'AutoParque', icon: 'fa-square-parking', serv: 'Control vehicular', desc: 'Lectura de placas y control de estacionamiento.', seed: 'auto' },
].map((c) => ({ ...c, fotos: [1, 2, 3, 4].map((n) => foto(c.seed, n)) }))

const spring = { type: 'spring', stiffness: 220, damping: 24 }

export default function Clientes() {
  const [sel, setSel] = useState(null)
  const [idx, setIdx] = useState(0)
  const c = sel !== null ? base[sel] : null
  const close = () => setSel(null)
  const mover = (d) => c && setIdx((i) => (i + d + c.fotos.length) % c.fotos.length)

  // Carrusel: avanza solo, se arrastra con el dedo o el mouse y tiene flechas en escritorio
  const track = useRef(null)
  const W = useRef(0) // ancho de una copia de la lista
  const x = useMotionValue(0)
  const pausa = useRef({ hover: false, drag: false, modal: false })
  const movido = useRef(false)
  const anim = useRef(null)
  const [pulso, setPulso] = useState({ l: 0, r: 0 })
  const norm = (v) => (W.current ? -2 * W.current + ((((v + 2 * W.current) % W.current) + W.current) % W.current) : v)
  const soltar = () => { pausa.current.drag = false; x.set(norm(x.get())) }
  const desplazar = (dir) => {
    anim.current?.stop(); pausa.current.drag = true
    anim.current = animate(x, x.get() - dir * 380, { type: 'spring', stiffness: 80, damping: 20, onComplete: soltar })
    setPulso((s) => ({ ...s, [dir > 0 ? 'r' : 'l']: s[dir > 0 ? 'r' : 'l'] + 1 }))
  }
  useAnimationFrame((_, d) => {
    const q = pausa.current
    if (W.current && !q.hover && !q.drag && !q.modal) x.set(norm(x.get() - (36 * d) / 1000))
  })
  useEffect(() => {
    const el = track.current
    const medir = () => { const primera = !W.current; W.current = el.scrollWidth / 3; if (primera) x.set(-W.current) }
    medir()
    const ro = new ResizeObserver(medir); ro.observe(el)
    return () => ro.disconnect()
  }, [])
  useEffect(() => { pausa.current.modal = !!c }, [c])

  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') mover(1)
      if (e.key === 'ArrowLeft') mover(-1)
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  })
  useEffect(() => {
    document.body.style.overflow = c ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [c])

  const lista = [...base, ...base, ...base] // 3 copias para el bucle infinito
  return (
    <Reveal className="sec sec-c">
      <p className="sec-s">Empresas y comunidades que confían en nosotros. Toca una para ver su proyecto.</p>
      <div className="logos-wrap" onMouseEnter={() => { pausa.current.hover = true }} onMouseLeave={() => { pausa.current.hover = false }}>
        <button className="arr l" onClick={() => desplazar(-1)} aria-label="Anterior">
          <span key={`l${pulso.l}`} className="arr-pulse" /><i className="fa-solid fa-chevron-left" />
        </button>
        <div className="logos">
          <motion.div ref={track} className="logos-track" style={{ x }} drag="x" dragMomentum={false} dragElastic={0}
            onDragStart={() => { movido.current = true; pausa.current.drag = true; anim.current?.stop() }}
            onDragEnd={(_, info) => {
              anim.current = animate(x, x.get() + info.velocity.x * 0.4, { type: 'spring', stiffness: 70, damping: 20, onComplete: soltar })
              setTimeout(() => { movido.current = false }, 60)
            }}>
            {lista.map((cl, i) => (
              <button key={i} className="logo-i" tabIndex={i < base.length ? 0 : -1} aria-hidden={i >= base.length}
                onClick={() => { if (movido.current) return; setSel(i % base.length); setIdx(0) }}>
                <i className={`fa-solid ${cl.icon}`} />{cl.name}
              </button>
            ))}
          </motion.div>
        </div>
        <button className="arr r" onClick={() => desplazar(1)} aria-label="Siguiente">
          <span key={`r${pulso.r}`} className="arr-pulse" /><i className="fa-solid fa-chevron-right" />
        </button>
      </div>

      {createPortal(
        <AnimatePresence>
          {c && <motion.div key="ov" className="m-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />}
          {c && (
            <motion.div key="wrap" className="cm-wrap" onClick={close} exit={{ opacity: 0, transition: { duration: 0.3 } }}>
              <motion.div className="cm" initial={{ opacity: 0, y: 60, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.96 }} transition={spring} onClick={(e) => e.stopPropagation()}>
                <button className="x" onClick={close} aria-label="Cerrar"><i className="fa-solid fa-xmark" /></button>
                <div className="cm-view">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img key={c.name + idx} src={c.fotos[idx]} alt={`Proyecto de ${c.name}`}
                      initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} />
                  </AnimatePresence>
                  <button className="nav-b prev" onClick={() => mover(-1)} aria-label="Anterior"><i className="fa-solid fa-chevron-left" /></button>
                  <button className="nav-b next" onClick={() => mover(1)} aria-label="Siguiente"><i className="fa-solid fa-chevron-right" /></button>
                </div>
                <div className="cm-info">
                  <span className="sq"><i className={`fa-solid ${c.icon}`} /></span>
                  <div><h3>{c.name}</h3><p>{c.serv} · {c.desc}</p></div>
                </div>
                <div className="cm-thumbs">
                  {c.fotos.map((f, k) => (
                    <button key={f} className={k === idx ? 'on' : ''} onClick={() => setIdx(k)} aria-label={`Foto ${k + 1}`}><img src={f} alt="" /></button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </Reveal>
  )
}
