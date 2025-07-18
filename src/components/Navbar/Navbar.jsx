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
  const enFormulario =
    location.pathname === "/personaliza-tu-plan" ||
    location.pathname === "/pagina-proyectos";

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
          <DesktopNavbarLinks
            scrollToSection={scrollToSection}
            cerrarMenu={cerrarMenu}
          />
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
          <button
            className="navbar-hamburguesa"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        )}

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