import imagenUthopon from "../../images/uthopiq-logo-completo.png";
import { useState, useEffect } from "react";
import './navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [webSubmenuOpen, setWebSubmenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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

    return (
        <>
            <nav className={`navbar ${scrolled ? 'navbar-solid' : 'navbar-transparent'}`}>
                <div className="navbar-left">
                    <a href="#inicio" aria-label="Ir a inicio">
                        <div className="logo-container">
                            <img src={imagenUthopon} alt="Logo Uthopiq" className="logo" />
                        </div>
                    </a>
                </div>

                <div className="navbar-center">
                    <ul className="navbar-links-desktop">
                        <li><a href="#proyectos">Proyectos</a></li>
                        <li className="dropdown">
                            <a href="#web" className="dropdown-toggle">Web</a>
                            <ul className="dropdown-menu">
                                <li><a href="#planes">Planes</a></li>
                                <li><a href="#servicios">Servicios</a></li>
                            </ul>
                        </li>
                        <li><a href="#automatizaciones">Automatizaciones</a></li>
                        <li><a href="#quienes-somos">Quiénes somos</a></li>
                        <li><a href="#contacto">Contáctanos</a></li>
                    </ul>
                </div>

                {!menuOpen && (
                    <button className="navbar-hamburguesa" onClick={menuHamburguesa}>
                        ☰
                    </button>
                )}

                <div className={`navbar-links-container ${menuOpen ? 'open' : ''}`}>
                    <img src={imagenUthopon} alt="Logo de Uthopiq" />
                    <ul className="navbar-links">
                        <li><a href="#inicio" onClick={cerrarMenu}>Inicio</a></li>
                        <li><a href="#proyectos" onClick={cerrarMenu}>Proyectos</a></li>

                        <li>
                            <a href="#web" onClick={(e) => {
                                e.preventDefault();
                                setWebSubmenuOpen(!webSubmenuOpen);
                            }}>Web</a>
                            {webSubmenuOpen && (
                                <ul className="submenu">
                                    <li><a href="#planes" onClick={cerrarMenu}>Planes</a></li>
                                    <li><a href="#servicios" onClick={cerrarMenu}>Servicios</a></li>
                                </ul>
                            )}
                        </li>

                        <li><a href="#automatizaciones" onClick={cerrarMenu}>Automatizaciones</a></li>
                        <li><a href="#quienes-somos" onClick={cerrarMenu}>Quiénes somos</a></li>
                        <li><a href="#contacto" onClick={cerrarMenu}>Contáctanos</a></li>
                    </ul>
                </div>
            </nav>

            {menuOpen && <div className="overlay" onClick={cerrarMenu}></div>}
        </>
    );
}

export default Navbar;
