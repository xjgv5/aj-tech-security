import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Plano de un edificio con cámaras, accesos y sensores. Una persona lo recorre y cada paso queda en la bitácora.
const muros = [
  'M20 130 V20 H460 V280 H20 V170',      // perímetro (con la entrada a la izquierda)
  'M170 20 V125 M170 165 V280',          // lobby (con el acceso biométrico)
  'M330 20 V150 H375 M415 150 H460',     // sala de servidores (con su puerta)
  'M250 190 V280',                       // oficinas
]
const camaras = [{ x: 34, y: 34, r: 45 }, { x: 215, y: 30, r: 62 }, { x: 305, y: 268, r: -148 }]
const sensores = [[100, 255], [260, 60], [440, 40], [210, 240]]
const puertas = [[170, 145], [395, 150]]
const ruta = [[14, 150], [170, 145], [250, 145], [395, 150], [395, 90], [395, 50]]
const eventos = [
  { icon: 'fa-person-walking', t: 'Persona detectada', s: 'Lobby · Cámara 1' },
  { icon: 'fa-fingerprint', t: 'Rostro reconocido', s: 'Ana · Acceso principal' },
  { icon: 'fa-video', t: 'Movimiento normal', s: 'Pasillo · Cámara 2' },
  { icon: 'fa-lock-open', t: 'Acceso concedido', s: 'Sala de servidores' },
  { icon: 'fa-lock', t: 'Puerta cerrada', s: 'Sala de servidores' },
  { icon: 'fa-shield-halved', t: 'Zona segura', s: 'Sin alertas activas' },
]
const hora = (id) => {
  const s = 38460 + id * 3
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((v) => String(v).padStart(2, '0')).join(':')
}

export default function Plano() {
  const [n, setN] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setN((v) => v + 1), 2600)
    return () => clearInterval(id)
  }, [])
  const step = n % 6
  const [px, py] = ruta[step]
  const abierta = [step === 1 || step === 2, step === 3]
  const mueve = step === 0 ? { duration: 0 } : { duration: 2.2, ease: [0.45, 0, 0.25, 1] }

  const mx = useMotionValue(0), my = useMotionValue(0)
  const sp = { stiffness: 120, damping: 16 }
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), sp)
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), sp)
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <div className="stage" onPointerMove={move} onPointerLeave={() => { mx.set(0); my.set(0) }} aria-hidden="true">
      <motion.div className="panel" style={{ rotateX: rx, rotateY: ry }}
        initial={{ y: 70, opacity: 0, scale: 0.94 }} animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 60, damping: 14, delay: 0.25 }}>
        <div className="p-bar">
          <span className="p-dots"><i /><i /><i /></span>
          <span>Torre B · Planta baja</span>
          <span className="p-live"><span className="live" />En vivo</span>
        </div>

        <svg className="plano" viewBox="0 0 480 300">
          <defs>
            <linearGradient id="fov" x1="0" x2="1">
              <stop offset="0" stopColor="#8fd9b6" stopOpacity=".42" /><stop offset="1" stopColor="#8fd9b6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.rect x="330" y="20" width="130" height="130" rx="6" fill="#0f7a55"
            animate={{ opacity: step === 3 || step === 4 ? 0.3 : 0.08 }} transition={{ duration: 0.6 }} />
          {muros.map((d, i) => (
            <motion.path key={d} d={d} fill="none" stroke="rgba(150,175,230,.55)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, delay: 0.2 + i * 0.25, ease: 'easeInOut' }} />
          ))}
          <text className="plbl" x="34" y="270">Lobby</text>
          <text className="plbl" x="184" y="270">Pasillo</text>
          <text className="plbl" x="340" y="138">Servidores</text>

          {camaras.map((c, i) => (
            <g key={i} transform={`translate(${c.x} ${c.y}) rotate(${c.r})`}>
              <path className="cone" d="M0 0 L120 -42 L120 42 Z" fill="url(#fov)" style={{ animationDelay: `${-i * 1.7}s` }} />
              <circle r="5" fill="#eef2f8" />
            </g>
          ))}
          {sensores.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill="#8fd9b6" />
              <circle className="ping" cx={x} cy={y} r="3" fill="none" stroke="#8fd9b6" strokeWidth="1" style={{ animationDelay: `${-i * 0.7}s` }} />
            </g>
          ))}
          {puertas.map(([x, y], i) => (
            <g key={i}>
              <motion.circle cx={x} cy={y} r="7" strokeWidth="2" initial={false}
                animate={{ fill: abierta[i] ? '#8fd9b6' : '#0a1222', stroke: abierta[i] ? '#8fd9b6' : 'rgba(238,242,248,.85)' }} />
              {((i === 0 && step === 1) || (i === 1 && step === 3)) && (
                <motion.circle key={n} cx={x} cy={y} fill="none" stroke="#8fd9b6" strokeWidth="2"
                  initial={{ r: 7, opacity: 0.8 }} animate={{ r: 32, opacity: 0 }} transition={{ duration: 1.3 }} />
              )}
            </g>
          ))}

          <motion.circle r="14" fill="#8fd9b6" initial={false} animate={{ cx: px, cy: py, opacity: step === 0 ? [0, 0.2] : 0.2 }}
            transition={{ cx: mueve, cy: mueve, opacity: { duration: 0.5 } }} />
          <motion.circle r="5" fill="#fff" initial={false} animate={{ cx: px, cy: py, opacity: step === 0 ? [0, 1] : 1 }}
            transition={{ cx: mueve, cy: mueve, opacity: { duration: 0.5 } }} />
        </svg>

        <div className="p-stats">
          <div><b>3/3</b>cámaras en línea</div>
          <div><b>2</b>accesos protegidos</div>
          <div><b>0</b>alertas activas</div>
        </div>

        <div className="p-log">
          <AnimatePresence mode="popLayout" initial={false}>
            {[n, n - 1, n - 2].filter((id) => id >= 0).map((id) => {
              const e = eventos[id % 6]
              return (
                <motion.div key={id} layout className="p-ev" initial={{ opacity: 0, y: -24, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}>
                  <span className="sq"><i className={`fa-solid ${e.icon}`} /></span>
                  <span className="t"><b>{e.t}</b><small>{e.s}</small></span>
                  <time>{hora(id)}</time>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
