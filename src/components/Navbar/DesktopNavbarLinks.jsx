// components/Navbar/DesktopNavbarLinks.jsx
import { Link } from "react-router-dom";

function DesktopNavbarLinks({ scrollToSection, cerrarMenu }) {
  return (
    <ul className="navbar-links-desktop">
      <li className="dropdown">
        <button className="dropdown-toggle" onClick={() => scrollToSection("proyectos")}>
          Proyectos
        </button>
        <ul className="dropdown-menu">
          <li>
            <Link to="/proyectos" className="dropdown-link" onClick={cerrarMenu}>
              Ver todos
            </Link>
          </li>
        </ul>
      </li>

      <li className="dropdown">
        <button className="dropdown-toggle" onClick={() => scrollToSection("web")}>
          Web
        </button>
        <ul className="dropdown-menu">
          <li><button onClick={() => scrollToSection("web")}>Planes</button></li>
          <li><button onClick={() => scrollToSection("servicios")}>Servicios</button></li>
        </ul>
      </li>

      <li><button onClick={() => scrollToSection("automatizaciones")}>Automatizaciones</button></li>
      <li><button onClick={() => scrollToSection("bonos")}>Bonos</button></li>
      <li><button onClick={() => scrollToSection("quienes-somos")}>Quiénes somos</button></li>
      <li><button onClick={() => scrollToSection("contacto")}>Contáctanos</button></li>
    </ul>
  );
}

export default DesktopNavbarLinks;