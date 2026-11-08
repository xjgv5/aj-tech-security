import { useEffect, useRef } from 'react'

// Partículas con temática de seguridad que viajan desde el fondo hacia ti
const ICONOS = ['\uf577', '\uf03d', '\uf023', '\uf3ed', '\uf1eb', '\uf084', '\uf06e'] // huella, cámara, candado, escudo, wifi, llave, ojo
const CODIGOS = ['0xA4F2', 'ACCESS OK', 'ID 3F9A', 'AUTH', 'SCAN', '192.168.1.24', 'LOCK 01', 'REC']
const MINT = '143,217,182'
const BLUE = '190,210,255'

const nueva = (lejos) => {
  const r = Math.random()
  return {
    tipo: r < 0.7 ? 'punto' : r < 0.84 ? 'cruz' : 'icono',
    x: Math.random() * 2 - 1, y: Math.random() * 2 - 1,
    z: lejos ? 1 : Math.random() * 0.97 + 0.03, v: 0.05 + Math.random() * 0.07,
    g: ICONOS[(Math.random() * ICONOS.length) | 0], t: CODIGOS[(Math.random() * CODIGOS.length) | 0],
  }
}

export default function Particulas() {
  const cv = useRef(null)
  const probe = useRef(null)

  useEffect(() => {
    const canvas = cv.current
    const ctx = canvas.getContext('2d')
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ps = Array.from({ length: 45 }, () => nueva(false))
    const m = { x: 0, y: 0, sx: 0, sy: 0 }
    const cs = getComputedStyle(probe.current) // toma la fuente real de Font Awesome (v6 o v7)
    let w = 0, h = 0, raf = 0, last = 0, visible = true, vivo = true

    const resize = () => {
      const r = canvas.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width; h = r.height
      canvas.width = w * d; canvas.height = h * d
      ctx.setTransform(d, 0, 0, d, 0, 0)
      if (quieto) draw(0)
    }

    const draw = (dt) => {
      ctx.clearRect(0, 0, w, h)
      m.sx += (m.x - m.sx) * 0.05; m.sy += (m.y - m.sy) * 0.05
      const cx = w * 0.5 + m.sx * 40, cy = h * 0.46 + m.sy * 28, k = Math.max(w, h) * 0.25
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      for (const p of ps) {
        p.z -= p.v * dt
        const sx = cx + (p.x * k) / p.z, sy = cy + (p.y * k) / p.z
        if (p.z < 0.03 || sx < -60 || sx > w + 60 || sy < -60 || sy > h + 60) { Object.assign(p, nueva(true)); continue }
        const a = Math.min(1, (1 - p.z) * 4) * Math.min(1, (p.z - 0.03) * 10) * 0.5
        const sc = Math.min(1 / p.z, 14)
        if (p.tipo === 'punto') {
          const z0 = p.z + p.v * 0.3
          ctx.strokeStyle = `rgba(${BLUE},${a * 0.5})`; ctx.lineWidth = Math.max(0.6, sc * 0.35)
          ctx.beginPath(); ctx.moveTo(cx + (p.x * k) / z0, cy + (p.y * k) / z0); ctx.lineTo(sx, sy); ctx.stroke()
        } else if (p.tipo === 'cruz') {
          const s = 2 + sc * 0.9
          ctx.strokeStyle = `rgba(255,255,255,${a})`; ctx.lineWidth = 1
          ctx.beginPath(); ctx.moveTo(sx - s, sy); ctx.lineTo(sx + s, sy); ctx.moveTo(sx, sy - s); ctx.lineTo(sx, sy + s); ctx.stroke()
        } else if (p.tipo === 'icono') {
          ctx.font = `${cs.fontWeight} ${Math.min(6 * sc, 36)}px ${cs.fontFamily}`
          ctx.fillStyle = `rgba(${MINT},${a})`; ctx.shadowColor = `rgba(${MINT},.6)`; ctx.shadowBlur = 8
          ctx.fillText(p.g, sx, sy); ctx.shadowBlur = 0
        } else {
          ctx.font = `${Math.min(6 * sc, 17)}px ui-monospace, Menlo, monospace`
          ctx.fillStyle = `rgba(${MINT},${a * 0.8})`; ctx.fillText(p.t, sx, sy)
        }
      }
    }

    const loop = (t) => {
      if (!vivo) return
      raf = requestAnimationFrame(loop)
      const dt = Math.min((t - last) / 1000, 0.05); last = t
      if (visible) draw(dt)
    }
    const onMove = (e) => { m.x = e.clientX / window.innerWidth - 0.5; m.y = e.clientY / window.innerHeight - 0.5 }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    const ro = new ResizeObserver(resize)

    io.observe(canvas); ro.observe(canvas)
    window.addEventListener('pointermove', onMove)
    document.fonts.load(`900 16px ${cs.fontFamily}`).catch(() => {}).then(() => {
      if (vivo && !quieto) raf = requestAnimationFrame(loop)
      else if (vivo) draw(0)
    })
    return () => { vivo = false; cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); window.removeEventListener('pointermove', onMove) }
  }, [])

  return (
    <>
      <canvas ref={cv} className="fx" aria-hidden="true" />
      <i ref={probe} className="fa-solid fa-lock fx-probe" aria-hidden="true" />
    </>
  )
}
