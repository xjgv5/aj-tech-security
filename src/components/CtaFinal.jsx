import Reveal from './Reveal'

export default function CtaFinal({ go }) {
  return (
    <Reveal className="sec">
      <div className="cta-end">
        <h2>Hablemos de la seguridad de tu espacio</h2>
        <p>Cuéntanos sobre tu proyecto y te preparamos una propuesta sin compromiso.</p>
        <div className="cta" style={{ justifyContent: 'center' }}>
          <button className="btn light" onClick={() => go('contacto')}>Pedir cotización</button>
          <button className="btn tint" onClick={() => go('soluciones')}>Ver soluciones</button>
        </div>
      </div>
    </Reveal>
  )
}
