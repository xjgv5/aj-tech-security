import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import Reveal from './Reveal'

function Count({ to, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const visto = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!visto) return
    const c = animate(0, to, { duration: 1.8, ease: [0.32, 0.72, 0, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [visto, to])
  return <b ref={ref}>{prefix}{n}{suffix}</b>
}


const datos = [
  { to: 24, suffix: ' h', t: 'Para responder tu cotización' },
  { to: 6, t: 'Soluciones de seguridad en un solo lugar' },
  { to: 12, suffix: ' meses', t: 'De garantía en la instalación' },
  { to: 100, suffix: '%', t: 'De pruebas antes de entregarte el sistema' },
]

export default function Numeros() {
  return (
    <Reveal className="sec">
      <h2 className="sec-t">Lo que te aseguramos</h2>
      <p className="sec-s">Compromisos claros desde el primer día.</p>
      <div className="nums">
        {datos.map((d) => (
          <div key={d.t} className="num"><Count {...d} /><small>{d.t}</small></div>
        ))}
      </div>
    </Reveal>
  )
}
