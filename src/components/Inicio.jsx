import { motion } from 'framer-motion'

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

function Phone() {
  const t = [0, 0.18, 0.28, 0.78, 0.9, 1]
  return (
    <motion.div className="phone" aria-hidden="true"
      initial={{ y: 90, opacity: 0, rotate: 5 }} animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 60, damping: 14, delay: 0.25 }}>
      <motion.div className="island"
        animate={{ width: [96, 96, 236, 236, 96, 96], height: [28, 28, 58, 58, 28, 28] }}
        transition={{ duration: 8, times: t, repeat: Infinity, ease: [0.32, 0.72, 0, 1] }}>
        <motion.div className="island-in"
          animate={{ opacity: [0, 0, 1, 1, 0, 0] }} transition={{ duration: 8, times: t, repeat: Infinity }}>
          <span className="ok"><i className="fa-solid fa-check" /></span>
          <div><b>Acceso concedido</b><small>Ana · Torre B</small></div>
        </motion.div>
      </motion.div>

      <div className="screen">
        <p className="hello">Casa Lomas</p>
        <div className="w-lock">
          <div><small>Puerta principal</small><b>Segura</b></div>
          <i className="fa-solid fa-lock" />
        </div>
        <div className="w-cams">
          <div><span className="live" />Entrada</div>
          <div><span className="live" />Cochera</div>
        </div>
        <div className="w-row"><i className="fa-solid fa-box" /><span>Paquete recibido</span><small>10:42</small></div>
      </div>
    </motion.div>
  )
}

export default function Inicio({ go }) {
  return (
    <>
      <section className="hero">
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
        <Phone />
      </section>

      <motion.div className="group" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={box}>
        {filas.map((f) => (
          <motion.button key={f.t} className="row link" variants={item} whileTap={{ scale: 0.98 }} onClick={() => go('soluciones')}>
            <span className="sq"><i className={`fa-solid ${f.icon}`} /></span>
            <span className="txt"><b>{f.t}</b><small>{f.d}</small></span>
            <i className="fa-solid fa-chevron-right chev" />
          </motion.button>
        ))}
      </motion.div>
    </>
  )
}
