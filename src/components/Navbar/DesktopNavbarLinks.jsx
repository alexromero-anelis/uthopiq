// components/Navbar/DesktopNavbarLinks.jsx

function DesktopNavbarLinks({ scrollToSection }) {
  return (
    <ul className="navbar-links-desktop">
      <li className="dropdown">
        <button className="dropdown-toggle" onClick={() => scrollToSection("proyectos")}>
          Proyectos
        </button>
      </li>

      <li className="dropdown">
        <button className="dropdown-toggle" onClick={() => scrollToSection("web")}>
          Web
        </button>
      </li>

      <li><button onClick={() => scrollToSection("automatizaciones")}>Automatizaciones</button></li>
      <li><button onClick={() => scrollToSection("quienes-somos")}>Quiénes somos</button></li>
      <li><button onClick={() => scrollToSection("contacto")}>Contáctanos</button></li>
    </ul>
  );
}

export default DesktopNavbarLinks;