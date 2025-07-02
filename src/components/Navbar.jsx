import imagenUthopon from '../images/uthopon.png';
import './navbar.css';

function Navbar(){
    return(
        <nav className="navbar">
            <div className="navbar-left">
                <div className="navbar-logo">
                <img src={imagenUthopon} alt="Imagen de un robot rojo con la cara negra"/>
                </div>
                <p className="navbar-text"><a href="#Inicio"></a> uthopic</p>
            </div>
            <ul className="navbar-links">
                <li><a href="#Proyectos">Proyectos</a></li>
                <li><a href="#Quienes somos">Quienes somos</a></li>
                <li><a href="#Servicios">Servicios</a></li>
                <li><a href="#Contactanos">Contactanos</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;