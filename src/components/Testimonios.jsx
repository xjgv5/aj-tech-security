import { motion } from 'framer-motion'
import Reveal from './Reveal'

// Testimonios de ejemplo
const lista = [
  { q: 'Desde que instalaron el acceso biométrico sabemos quién entra y a qué hora. El control en la bodega cambió por completo.', n: 'Carlos Méndez', r: 'Gerente de operaciones' },
  { q: 'Las visitas de nuestro fraccionamiento ahora se autorizan desde el celular. Los vecinos están encantados.', n: 'Laura Ríos', r: 'Administradora residencial' },
  { q: 'Instalación rápida, limpia y con soporte cuando lo necesitamos. Las cámaras funcionan perfecto.', n: 'Jorge Salinas', r: 'Dueño de comercio' },
]

export default function Testimonios() {
  return (
    <section className="sec">
      <Reveal>
        <h2 className="sec-t">Lo que dicen nuestros clientes</h2>
        <p className="sec-s">Resultados reales en casas, comercios y comunidades.</p>
      </Reveal>
      <div className="quotes">
        {lista.map((t, i) => (
          <motion.figure key={t.n} className="quote"
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 90, damping: 16, delay: i * 0.1 }}>
            <div className="stars" aria-label="5 estrellas">
              {[...Array(5)].map((_, k) => <i key={k} className="fa-solid fa-star" />)}
            </div>
            <blockquote>{t.q}</blockquote>
            <figcaption className="who">
              <span className="av">{t.n[0]}</span>
              <span className="txt"><b>{t.n}</b><small>{t.r}</small></span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
