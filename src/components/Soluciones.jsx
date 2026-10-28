import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { soluciones } from '../data'

export default function Soluciones({ go }) {
  const [sel, setSel] = useState(null)
  const close = () => setSel(null)
  const s = sel !== null ? soluciones[sel] : null

  useEffect(() => {
    const k = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])

  return (
    <section>
      <h2 className="big">Elige cómo cuidar tu espacio</h2>
      <p className="lead">Toca una tarjeta para ver para qué sirve y dónde se usa.</p>

      <div className="track">
        {soluciones.map((x, i) => (
          <motion.article key={x.title} className="card" layoutId={`card-${i}`}
            initial={{ opacity: 0, x: 80, rotate: 3 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ type: 'spring', stiffness: 90, damping: 16, delay: i * 0.05 }}
            whileHover={{ y: -8 }} whileTap={{ scale: 0.96 }} onClick={() => setSel(i)} tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSel(i)}>
            <motion.img layoutId={`img-${i}`} src={x.img} alt="" loading="lazy" />
            <div className="card-txt">
              <span className="sq"><i className={`fa-solid ${x.icon}`} /></span>
              <h3>{x.title}</h3>
              <p>{x.desc}</p>
            </div>
            <span className="plus"><i className="fa-solid fa-plus" /></span>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {s && <motion.div key="veil" className="veil" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />}
        {s && (
          <motion.div key="wrap" className="sheet-wrap" exit={{ opacity: 0, transition: { duration: 0.35 } }}>
            <motion.div className="sheet" layoutId={`card-${sel}`} drag="y" dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }} onDragEnd={(_, i) => i.offset.y > 110 && close()}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}>
              <motion.img layoutId={`img-${sel}`} src={s.img} alt="" />
              <button className="x" onClick={close} aria-label="Cerrar"><i className="fa-solid fa-xmark" /></button>
              <motion.div className="sheet-body" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="group">
                  {s.casos.map((c) => (
                    <div key={c} className="row"><span className="sq"><i className="fa-solid fa-check" /></span><span className="txt"><b>{c}</b></span></div>
                  ))}
                </div>
                <button className="btn fill wide" onClick={() => go('contacto', s.title)}>Cotizar esta solución</button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
