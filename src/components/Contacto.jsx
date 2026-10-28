import { useState } from 'react'
import { motion } from 'framer-motion'
import { soluciones } from '../data'
import Select from './Select'

const info = [
  { icon: 'fa-phone', t: '+52 222 000 0000', href: 'tel:+522220000000' },
  { icon: 'fa-envelope', t: 'contacto@ajtechsecurity.com', href: 'mailto:contacto@ajtechsecurity.com' },
  { icon: 'fa-location-dot', t: 'Puebla, México' },
  { icon: 'fa-clock', t: 'Lun a Sáb, 9:00 a 18:00' },
]

export default function Contacto({ interes }) {
  const [sent, setSent] = useState(false)
  const [sol, setSol] = useState(interes || '')
  const onSubmit = (e) => { e.preventDefault(); setSent(true) } // Conecta aquí EmailJS / Formspree

  return (
    <section className="contact">
      <div>
        <h2 className="big">Cuéntanos qué necesitas</h2>
        <p className="lead">Te respondemos en menos de 24 horas con una propuesta a tu medida.</p>
        <div className="group">
          {info.map((i) => {
            const Tag = i.href ? 'a' : 'div'
            return (
              <Tag key={i.t} className="row" href={i.href}>
                <span className="sq"><i className={`fa-solid ${i.icon}`} /></span>
                <span className="txt"><b>{i.t}</b></span>
              </Tag>
            )
          })}
        </div>
        <a className="btn tint" href="https://wa.me/522220000000" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-whatsapp" /> Escribir por WhatsApp
        </a>
      </div>

      {sent ? (
        <motion.div className="done" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}>
          <span className="ok big-ok"><i className="fa-solid fa-check" /></span>
          <h3>Mensaje enviado</h3>
          <p>Gracias. Pronto nos pondremos en contacto contigo.</p>
        </motion.div>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="group">
            <label className="row"><span className="lbl">Nombre</span><input required placeholder="Tu nombre" /></label>
            <label className="row"><span className="lbl">Correo</span><input required type="email" placeholder="tucorreo@ejemplo.com" /></label>
            <div className="row"><span className="lbl">Interés</span>
              <Select value={sol} onChange={setSol} placeholder="Selecciona una" options={soluciones.map((s) => s.title)} />
            </div>
            <label className="row top-a"><span className="lbl">Mensaje</span><textarea rows="3" required placeholder="Cuéntanos sobre tu espacio" /></label>
          </div>
          <button className="btn fill wide" type="submit">Enviar mensaje</button>
        </form>
      )}
    </section>
  )
}
