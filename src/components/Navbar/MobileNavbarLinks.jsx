// components/Navbar/MobileNavbarLinks.jsx
import { Link } from "react-router-dom";

function MobileNavbarLinks({
  open,
  cerrarMenu,
  openSubmenu,
  setOpenSubmenu,
  scrollToSection,
  enFormulario,
}) {
  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div className={`navbar-links-container ${open ? "open" : ""}`}>
      <ul className="navbar-links">
        <li><button onClick={() => scrollToSection("inicio")}>Inicio</button></li>

        <li>
            <button onClick={() => { scrollToSection("proyectos"); cerrarMenu(); }}>
                Proyectos
            </button>
        </li>

        <li>
          <button onClick={() => toggleSubmenu("web")}>Web</button>
          {openSubmenu === "web" && (
            <ul className="submenu">
              <li><button onClick={() => scrollToSection("web")}>Planes</button></li>
              <li><button onClick={() => scrollToSection("servicios")}>Servicios</button></li>
            </ul>
          )}
        </li>

        <li><button onClick={() => scrollToSection("automatizaciones")}>Automatizaciones</button></li>
        <li><button onClick={() => scrollToSection("quienes-somos")}>Quiénes somos</button></li>
        <li><button onClick={() => scrollToSection("contacto")}>Contáctanos</button></li>

        <div className="navbar-cta-mobile">
          <Link
            to={enFormulario ? "/" : "/personaliza-tu-plan"}
            onClick={cerrarMenu}
            className="cta-button-outline px-8 py-4 rounded-lg font-medium text-lg border-2 text-center"
          >
            {enFormulario ? "Volver al inicio" : "Personaliza tu plan"}
          </Link>
        </div>
      </ul>
    </div>
  );
}

export default MobileNavbarLinks;