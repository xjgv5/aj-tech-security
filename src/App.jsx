import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Inicio from './components/Inicio'
import Soluciones from './components/Soluciones'
import Contacto from './components/Contacto'

export default function App() {
  const [tab, setTab] = useState('inicio')
  const [interes, setInteres] = useState('')
  const go = (t, i) => {
    if (i !== undefined) setInteres(i)
    setTab(t)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg" aria-hidden="true" />
      <Navbar tab={tab} go={go} />
      <AnimatePresence mode="wait">
        <motion.main key={tab} className="page"
          initial={{ opacity: 0, y: 30, scale: 0.97, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -16, scale: 1.02, filter: 'blur(10px)' }}
          transition={{ type: 'spring', stiffness: 140, damping: 20, mass: 0.8 }}>
          {tab === 'inicio' && <Inicio go={go} />}
          {tab === 'soluciones' && <Soluciones go={go} />}
          {tab === 'contacto' && <Contacto interes={interes} />}
        </motion.main>
      </AnimatePresence>
    </MotionConfig>
  )
}
