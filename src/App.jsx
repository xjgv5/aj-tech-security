import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Inicio from './components/Inicio'
import Soluciones from './components/Soluciones'
import Contacto from './components/Contacto'
import Footer from './components/Footer'

// Cambia el estilo de transición entre pestañas: 'profundidad' | 'empuje' | 'revelado'
const ESTILO = 'profundidad'
const orden = ['inicio', 'soluciones', 'contacto']

const estilos = {
  // Avanzas "a través" de la página, como las partículas del hero
  profundidad: {
    initial: { opacity: 0, scale: 0.88, y: 24 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 22 } },
    exit: { opacity: 0, scale: 1.14, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
  },
  // Como la navegación de iOS: la nueva página empuja a la anterior según la dirección
  empuje: {
    initial: (d) => ({ x: d > 0 ? '45%' : '-45%', opacity: 0 }),
    animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 170, damping: 24 } },
    exit: (d) => ({ x: d > 0 ? '-25%' : '25%', opacity: 0, scale: 0.95, transition: { duration: 0.4 } }),
  },
  // Un círculo se abre desde la barra de tabs y descubre la nueva página
  revelado: {
    initial: { clipPath: 'circle(0% at 50% 100%)' },
    animate: { clipPath: 'circle(150% at 50% 100%)', transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] } },
    exit: { opacity: 0.99, transition: { duration: 0.8 } },
  },
}

export default function App() {
  const [tab, setTab] = useState('inicio')
  const [dir, setDir] = useState(1)
  const [interes, setInteres] = useState('')

  const go = (t, i) => {
    if (i !== undefined) setInteres(i)
    setDir(Math.sign(orden.indexOf(t) - orden.indexOf(tab)) || 1)
    setTab(t)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg" aria-hidden="true" />
      <Navbar tab={tab} go={go} />
      <AnimatePresence mode="popLayout" custom={dir}>
        <motion.main key={tab} className="page" custom={dir} variants={estilos[ESTILO]} initial="initial" animate="animate" exit="exit">
          {tab === 'inicio' && <Inicio go={go} />}
          {tab === 'soluciones' && <Soluciones go={go} />}
          {tab === 'contacto' && <Contacto interes={interes} />}
          <Footer go={go} />
        </motion.main>
      </AnimatePresence>
    </MotionConfig>
  )
}
