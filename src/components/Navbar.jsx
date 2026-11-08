import MenuHuella from './MenuHuella'

export default function Navbar({ tab, go }) {
  return (
    <>
      <header className="top">
        <button className="brand" onClick={() => go('inicio')} aria-label="AJ Tech Security">
          <span className="app-ico"><i className="fa-solid fa-shield-halved" /></span>
          <span>AJ Tech Security</span>
        </button>
      </header>
      <MenuHuella tab={tab} go={go} />
    </>
  )
}
