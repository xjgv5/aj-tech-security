import { motion } from 'framer-motion'
import Plano from './Plano'
import Particulas from './Particulas'
import Clientes from './Clientes'
import Proceso from './Proceso'
import Numeros from './Numeros'
import Testimonios from './Testimonios'
import Faq from './Faq'
import CtaFinal from './CtaFinal'

const box = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 34, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 110, damping: 18 } },
}
const filas = [
  { icon: 'fa-fingerprint', t: 'Entra sin llaves', d: 'Huella, rostro o tarjeta. Cada acceso queda registrado.' },
  { icon: 'fa-video', t: 'Mira lo que pasa', d: 'Tus cámaras en vivo, desde cualquier lugar.' },
  { icon: 'fa-house-lock', t: 'Controla las visitas', d: 'Autoriza invitados y proveedores en tu residencial.' },
]

export default function Inicio({ go }) {
  return (
    <>
      <section className="hero">
        <Particulas />
        <motion.div variants={box} initial="hidden" animate="show">
          <motion.h1 variants={item}>Tu espacio en calma, aunque no estés.</motion.h1>
          <motion.p className="lead" variants={item}>
            Control de acceso biométrico, cámaras y accesos para residenciales, con una app tan simple como abrir tu celular.
          </motion.p>
          <motion.div className="cta" variants={item}>
            <button className="btn fill" onClick={() => go('soluciones')}>Ver soluciones</button>
            <button className="btn tint" onClick={() => go('contacto')}>Pedir cotización</button>
          </motion.div>
        </motion.div>
        <Plano />
      </section>

      <Clientes />

      <div className="sec" style={{ marginTop: 90 }}>
        <h2 className="sec-t">Todo para sentirte seguro</h2>
        <p className="sec-s">Soluciones pensadas para que cuidar tu espacio sea fácil.</p>
      </div>
      <motion.div className="group" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={box}>
        {filas.map((f) => (
          <motion.button key={f.t} className="row link" variants={item} whileTap={{ scale: 0.98 }} onClick={() => go('soluciones')}>
            <span className="sq"><i className={`fa-solid ${f.icon}`} /></span>
            <span className="txt"><b>{f.t}</b><small>{f.d}</small></span>
            <i className="fa-solid fa-chevron-right chev" />
          </motion.button>
        ))}
      </motion.div>

      <Proceso />
      <Numeros />
      <Testimonios />
      <Faq />
      <CtaFinal go={go} />
    </>
  )
}
