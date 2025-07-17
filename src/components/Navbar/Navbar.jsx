import imagenUthopon from "../../images/uthopiq-logo-completo.png";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [proyectosSubmenuOpen, setProyectosSubmenuOpen] = useState(false);
  const [webSubmenuOpen, setWebSubmenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const enFormulario =
    location.pathname === "/personaliza-tu-plan" ||
    location.pathname === "/pagina-proyectos";

  const menuHamburguesa = () => {
    setMenuOpen(!menuOpen);
  };

  const cerrarMenu = () => {
    setMenuOpen(false);
    setWebSubmenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const goToSection = () => {
      const interval = setInterval(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          clearInterval(interval);
        }
      }, 100);
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(goToSection, 200); // da tiempo a montar el DOM
    } else {
      goToSection();
    }

    cerrarMenu();
  };

  return (
    <>
      <nav
        className={`navbar ${scrolled ? "navbar-solid" : "navbar-transparent"}`}
      >
        <div className="navbar-left">
          <Link to="/" aria-label="Ir a inicio">
            <div className="logo-container">
              <img src={imagenUthopon} alt="Logo Uthopiq" className="logo" />
            </div>
          </Link>
        </div>

        <div className="navbar-center">
          <ul className="navbar-links-desktop">
            <li className="dropdown">
              <button
                className="dropdown-toggle"
                onClick={() => scrollToSection("proyectos")}
              >
                Proyectos
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    to="/pagina-proyectos"
                    className="dropdown-link"
                    onClick={cerrarMenu}
                  >
                    Ver todos
                  </Link>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <button
                className="dropdown-toggle"
                onClick={() => scrollToSection("web")}
              >
                Web
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button onClick={() => scrollToSection("web")}>Planes</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("servicios")}>
                    Servicios
                  </button>
                </li>
              </ul>
            </li>
            <li>
              <button onClick={() => scrollToSection("automatizaciones")}>
                Automatizaciones
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("bonos")}>Bonos</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("quienes-somos")}>
                Quiénes somos
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("contacto")}>
                Contáctanos
              </button>
            </li>
          </ul>
        </div>

        <div className="navbar-right">
          <Link
            to={enFormulario ? "/" : "/personaliza-tu-plan"}
            className="navbar-cta-desktop"
          >
            <button className="cta-button-outline px-8 py-4 rounded-lg font-medium text-lg border-2">
              {enFormulario ? "Volver al inicio" : "Personaliza tu plan"}
            </button>
          </Link>
        </div>

        {!menuOpen && (
          <button className="navbar-hamburguesa" onClick={menuHamburguesa}>
            ☰
          </button>
        )}

        <div className={`navbar-links-container ${menuOpen ? "open" : ""}`}>
          <img src={imagenUthopon} alt="Logo de Uthopiq" />
          <ul className="navbar-links">
            <li>
              <button onClick={() => scrollToSection("inicio")}>Inicio</button>
            </li>
            <li>
              <button
                onClick={() => setProyectosSubmenuOpen(!proyectosSubmenuOpen)}
              >
                Proyectos
              </button>
              {proyectosSubmenuOpen && (
                <ul className="submenu">
                  <li>
                    <Link to="/pagina-proyectos">
                      <button onClick={cerrarMenu}>Ver todos</button>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <button onClick={() => setWebSubmenuOpen(!webSubmenuOpen)}>
                Web
              </button>
              {webSubmenuOpen && (
                <ul className="submenu">
                  <li>
                    <button onClick={() => scrollToSection("web")}>
                      Planes
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection("servicios")}>
                      Servicios
                    </button>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <button onClick={() => scrollToSection("automatizaciones")}>
                Automatizaciones
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("quienes-somos")}>
                Quiénes somos
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("contacto")}>
                Contáctanos
              </button>
            </li>

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
      </nav>

      {menuOpen && <div className="overlay" onClick={cerrarMenu}></div>}
    </>
  );
}

export default Navbar;
