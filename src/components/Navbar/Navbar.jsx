import imagenUthopon from "../../images/uthopic-logo-completo.png";
import { useState, useEffect } from "react";
import './navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const menuHamburguesa = () => {
        setMenuOpen(!menuOpen);
    };

    const cerrarMenu = () => {
        setMenuOpen(false);
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
                        <img src={imagenUthopon} alt="Imagen de un robot rojo con la cara negra y sonrisa agradable" className="logo"/>
                        </div>
                    </a>
                </div>


                <div className="navbar-center">
                    <ul className="navbar-links-desktop">
                        <li><a href="#Proyectos">Proyectos</a></li>
                        <li><a href="#Quienes somos">Quiénes somos</a></li>
                        <li><a href="#Servicios">Servicios</a></li>
                        <li><a href="#Contactanos">Contáctanos</a></li>
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
                        <li><a href="#quienes-somos" onClick={cerrarMenu}>Quiénes somos</a></li>
                        <li><a href="#servicios" onClick={cerrarMenu}>Servicios</a></li>
                        <li><a href="#contactanos" onClick={cerrarMenu}>Contáctanos</a></li>
                    </ul>
                </div>

            </nav>

            {menuOpen && <div className="overlay" onClick={cerrarMenu}></div>}
        </>
    );
}


export default Navbar;