export default function Footer() {
  return (
    <footer className="foot">
      <span>© {new Date().getFullYear()} AJ Tech Security. Todos los derechos reservados.</span>
      <div className="soc">
        <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
        <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
        <a href="https://wa.me/522220000000" target="_blank" rel="noreferrer" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp" /></a>
      </div>
    </footer>
  )
}
