const nav = [['inicio', 'Inicio'], ['soluciones', 'Soluciones'], ['contacto', 'Contacto']]

export default function Footer({ go }) {
  return (
    <footer className="ft">
      <div className="ft-grid">
        <div>
          <p className="ft-brand"><span className="app-ico"><i className="fa-solid fa-shield-halved" /></span>AJ Tech Security</p>
          <p className="ft-txt">Seguridad e infraestructura IT para hogares, empresas y residenciales.</p>
        </div>
        <div>
          <h4>Navegación</h4>
          {nav.map(([id, l]) => <button key={id} onClick={() => go(id)}>{l}</button>)}
        </div>
        <div>
          <h4>Contacto</h4>
          <a href="tel:+522220000000">+52 222 000 0000</a>
          <a href="mailto:contacto@ajtechsecurity.com">contacto@ajtechsecurity.com</a>
          <span>Puebla, México</span>
        </div>
      </div>
      <div className="ft-bar">
        <span>© {new Date().getFullYear()} AJ Tech Security. Todos los derechos reservados.</span>
        <div className="soc">
          <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
          <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
          <a href="https://wa.me/522220000000" target="_blank" rel="noreferrer" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp" /></a>
        </div>
      </div>
    </footer>
  )
}
