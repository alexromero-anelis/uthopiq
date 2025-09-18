// components/Navbar/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import imagenUthopon from "../../images/uthopiq-logo-completo.png";
import DesktopNavbarLinks from "./DesktopNavbarLinks";
import MobileNavbarLinks from "./MobileNavbarLinks";
import "./navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const enFormulario = location.pathname === "/pagina-proyectos";

  const cerrarMenu = () => {
    setMenuOpen(false);
    setOpenSubmenu(null);
  };

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
      setTimeout(goToSection, 200);
    } else {
      goToSection();
    }

    cerrarMenu();
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  const html = document.documentElement;

  if (menuOpen) {
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    html.style.height = "100%";
  } else {
    document.body.style.overflow = "";
    html.style.overflow = "";
    html.style.height = "";
  }
}, [menuOpen]);


  return (
    <>
      <nav
        className={`navbar ${scrolled ? "navbar-solid" : "navbar-transparent"}`}
      >
        <div className="navbar-left">
          <Link to="https://uthopiq.com/" aria-label="Ir a inicio">
            <div className="logo-container">
              <img src={imagenUthopon} alt="Logo Uthopiq" className="logo" />
            </div>
          </Link>
        </div>

        <div className="navbar-center">
          <DesktopNavbarLinks
            scrollToSection={scrollToSection}
            cerrarMenu={cerrarMenu}
          />
        </div>

        <div className="navbar-right">
          <div className="navbar-cta-desktop">
            <button
              className="cta-button-outline px-8 py-4 rounded-lg font-medium text-lg border-2"
              onClick={() => scrollToSection("contacto")}
            >
              Coméntanos tu idea
            </button>
          </div>
        </div>

        <button
          className={`navbar-hamburguesa ${menuOpen ? "cerrar" : "abrir"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="icon">{menuOpen ? "✕" : "☰"}</span>
        </button>

        <MobileNavbarLinks
          open={menuOpen}
          cerrarMenu={cerrarMenu}
          openSubmenu={openSubmenu}
          setOpenSubmenu={setOpenSubmenu}
          scrollToSection={scrollToSection}
          enFormulario={enFormulario}
        />
      </nav>

      {menuOpen && <div className="overlay" onClick={cerrarMenu}></div>}
    </>
  );
}

export default Navbar;