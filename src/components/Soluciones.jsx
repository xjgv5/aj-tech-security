import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { soluciones } from '../data'
import Reveal from './Reveal'
import CtaFinal from './CtaFinal'

const spring = { type: 'spring', visualDuration: 0.5, bounce: 0.22 }
const filtros = [
  { id: 'todas', l: 'Todas' }, { id: 'hogar', l: 'Hogar' },
  { id: 'empresa', l: 'Empresa' }, { id: 'residencial', l: 'Residenciales' },
]
const etiqueta = { hogar: 'Hogar', empresa: 'Empresa', residencial: 'Residencial' }
const eco = [
  { icon: 'fa-mobile-screen-button', t: 'Una sola app', d: 'Cámaras, accesos y alertas en un mismo lugar.' },
  { icon: 'fa-plug-circle-check', t: 'Todo integrado', d: 'Tus equipos trabajan juntos: una alerta puede abrir la cámara correcta.' },
  { icon: 'fa-headset', t: 'Un solo responsable', d: 'Nosotros instalamos y damos soporte. Sin intermediarios.' },
]

export default function Soluciones({ go }) {
  const [sel, setSel] = useState(null)
  const [f, setF] = useState('todas')
  const close = () => setSel(null)
  const s = sel !== null ? soluciones[sel] : null
  const lista = soluciones.map((x, i) => ({ ...x, i })).filter((x) => f === 'todas' || x.tipo.includes(f))

  useEffect(() => {
    const k = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])
  useEffect(() => {
    document.body.style.overflow = s ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [s])

  return (
    <section>
      <h2 className="big">Elige cómo cuidar tu espacio</h2>
      <p className="lead">Filtra por tipo de espacio y toca una tarjeta para ver los detalles.</p>

      <div className="seg" role="tablist">
        {filtros.map((x) => (
          <button key={x.id} className={f === x.id ? 'on' : ''} onClick={() => setF(x.id)}>
            {f === x.id && <motion.span layoutId="seg" className="seg-pill" transition={{ type: 'spring', stiffness: 380, damping: 28 }} />}
            <span>{x.l}</span>
          </button>
        ))}
      </div>

      <ul className="s-grid">
        <AnimatePresence mode="popLayout">
          {lista.map((x) => (
            <motion.li key={x.title} layout initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }} transition={{ type: 'spring', stiffness: 200, damping: 22 }}>
              <motion.div className="s-card" layoutId={`card-${x.i}`} style={{ borderRadius: 26 }} transition={spring}
                whileTap={{ scale: 0.98 }} onClick={() => setSel(x.i)} tabIndex={0} role="button" aria-label={x.title}
                onKeyDown={(e) => e.key === 'Enter' && setSel(x.i)}>
                <motion.div className="s-media" layoutId={`img-${x.i}`} transition={spring}>
                  <img className="s-img" src={x.img} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                  <span className="plus"><i className="fa-solid fa-plus" /></span>
                </motion.div>
                <div className="s-info">
                  <span className="sq"><i className={`fa-solid ${x.icon}`} /></span>
                  <h3>{x.title}</h3>
                  <p>{x.desc}</p>
                </div>
              </motion.div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <section className="sec">
        <Reveal>
          <h2 className="sec-t">Todo conectado, todo más fácil</h2>
          <p className="sec-s">No instalamos equipos sueltos: armamos un sistema que funciona como uno solo.</p>
        </Reveal>
        <div className="eco-grid">
          {eco.map((e, i) => (
            <motion.div key={e.t} className="eco-i" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ type: 'spring', stiffness: 90, damping: 16, delay: i * 0.1 }}>
              <span className="sq"><i className={`fa-solid ${e.icon}`} /></span>
              <h3>{e.t}</h3><p>{e.d}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <CtaFinal go={go} />

      {createPortal(
        <AnimatePresence>
          {s && <motion.div key="ov" className="m-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />}
          {s && (
            <motion.div key="wrap" className="m-wrap" onClick={close} exit={{ opacity: 0, transition: { duration: 0.4 } }}>
              <motion.div className="m-card" layoutId={`card-${sel}`} style={{ borderRadius: 32 }} transition={spring} onClick={(e) => e.stopPropagation()}>
                <motion.div className="m-media" layoutId={`img-${sel}`} transition={spring}>
                  <img src={s.img} alt="" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                  <span className="sq"><i className={`fa-solid ${s.icon}`} /></span>
                </motion.div>
                <button className="x" onClick={close} aria-label="Cerrar"><i className="fa-solid fa-xmark" /></button>
                <motion.div className="m-body" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 120, damping: 18 }}>
                  <div className="tags">{s.tipo.map((t) => <span key={t}>{etiqueta[t]}</span>)}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <p>{s.detalle}</p>
                  <h4>Qué incluye</h4>
                  <ul className="inc">{s.incluye.map((x) => <li key={x}><i className="fa-solid fa-circle-check" />{x}</li>)}</ul>
                  <h4>Ideal para</h4>
                  <div className="tags">{s.casos.map((c) => <span key={c}>{c}</span>)}</div>
                  <button className="btn fill" onClick={() => { close(); go('contacto', s.title) }}>Cotizar esta solución</button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
