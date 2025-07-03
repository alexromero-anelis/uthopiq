import imagenUthopon from "../../images/uthopon.png";
import imagenTexto from "../../images/uthopic-nombre.png";
import { useState } from "react";
import './navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const menuHamburguesa = () => {
        setMenuOpen(!menuOpen);
    };

    const cerrarMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <nav className="navbar">
                <a href="#Inicio">
                    <div className="navbar-left">
                        <img src={imagenUthopon} alt="Imagen de un robot rojo con la cara negra y sonrisa agradable" />
                        <img src={imagenTexto} alt="Texto con el nombre de uthopiq" />
                    </div>
                </a>

                <div className="navbar-center">
                    <ul className="navbar-links-desktop">
                        <li><a href="#Proyectos">Proyectos</a></li>
                        <li><a href="#Quienes somos">Quienes somos</a></li>
                        <li><a href="#Servicios">Servicios</a></li>
                        <li><a href="#Contactanos">Contactanos</a></li>
                    </ul>
                </div>

                {!menuOpen && (
                    <button className="navbar-hamburguesa" onClick={menuHamburguesa}>
                        ☰
                    </button>
                )}

                <div className={`navbar-links-container ${menuOpen ? 'open' : ''}`}>
                    <img src={imagenUthopon} alt="Imagen de un robot rojo con la cara negra y sonrisa agradable" />
                    <ul className="navbar-links">
                        <li><a href="#Inicio" onClick={cerrarMenu}>Inicio</a></li>
                        <li><a href="#Proyectos" onClick={cerrarMenu}>Proyectos</a></li>
                        <li><a href="#Quienes somos" onClick={cerrarMenu}>Quienes somos</a></li>
                        <li><a href="#Servicios" onClick={cerrarMenu}>Servicios</a></li>
                        <li><a href="#Contactanos" onClick={cerrarMenu}>Contactanos</a></li>
                    </ul>
                </div>
            </nav>

            {menuOpen && <div className="overlay" onClick={cerrarMenu}></div>}
        </>
    );
}


export default Navbar;