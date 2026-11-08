import { motion } from 'framer-motion'
import Reveal from './Reveal'

const pasos = [
  { icon: 'fa-magnifying-glass', t: 'Visita y diagnóstico', d: 'Recorremos tu espacio y detectamos puntos vulnerables.' },
  { icon: 'fa-pen-ruler', t: 'Diseño a tu medida', d: 'Armamos una propuesta clara, con equipos y costos.' },
  { icon: 'fa-screwdriver-wrench', t: 'Instalación', d: 'Instalamos, configuramos y te capacitamos.' },
  { icon: 'fa-headset', t: 'Soporte continuo', d: 'Mantenimiento y atención cuando nos necesites.' },
]

export default function Proceso() {
  return (
    <section className="sec">
      <Reveal>
        <h2 className="sec-t">Así trabajamos</h2>
        <p className="sec-s">De la primera visita al soporte diario, en cuatro pasos simples.</p>
      </Reveal>
      <div className="steps">
        {pasos.map((p, i) => (
          <motion.article key={p.t} className="step"
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 90, damping: 16, delay: i * 0.1 }}>
            <span className="sq"><i className={`fa-solid ${p.icon}`} /></span>
            <h3>{p.t}</h3>
            <p>{p.d}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
