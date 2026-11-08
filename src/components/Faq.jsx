import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'

const preguntas = [
  { q: '¿Cuánto tarda la instalación?', a: 'Depende del proyecto. Un sistema de cámaras o un control de acceso suele quedar listo en uno o dos días; en residenciales lo planeamos por etapas.' },
  { q: '¿Puedo ver mis cámaras desde el celular?', a: 'Sí. Configuramos la app para que veas tus cámaras en vivo y recibas alertas desde cualquier lugar.' },
  { q: '¿Ofrecen garantía y mantenimiento?', a: 'Todos los equipos tienen garantía y contamos con planes de mantenimiento para que el sistema siempre funcione.' },
  { q: '¿Atienden residenciales y empresas?', a: 'Sí: casas, comercios, empresas, fraccionamientos y condominios. Cada propuesta se adapta al espacio.' },
  { q: '¿Cómo pido una cotización?', a: 'Escríbenos desde la pestaña Contacto o por WhatsApp. Te respondemos en menos de 24 horas.' },
]

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="sec">
      <Reveal>
        <h2 className="sec-t">Preguntas frecuentes</h2>
        <p className="sec-s">Lo que más nos preguntan antes de empezar.</p>
      </Reveal>
      <Reveal className="group">
        {preguntas.map((p, i) => (
          <div key={p.q} className="faq">
            <button className="row link" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
              <span className="txt"><b>{p.q}</b></span>
              <motion.i className="fa-solid fa-plus chev" animate={{ rotate: open === i ? 45 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div className="faq-a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 28 }}>
                  <p>{p.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
