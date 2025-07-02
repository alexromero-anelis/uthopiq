import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import logo from "../../images/uthopon.png";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer-container">
        <div className="footer-grid">
            {/* Columna 1: Sobre la empresa */}
            <div>
                <img src={logo} alt="UTHOPIQ Logo" className="mb-4 w-12 h-12" />
                <p className="footer-description">En <strong>UTHOPIQ</strong> somos especialistas en desarrollo web, automatización con inteligencia artificial y mentoría tecnológica.</p>
                <div className="footer-social">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
                </div>
            </div>

            {/* Columna 2: Servicios */}
            <div>
                <h3 className="footer-title">Servicios</h3>
                <ul className="footer-column">
                    <li>Desarrollo de Páginas Web</li>
                    <li>Automatizaciones con IA</li>
                    <li>Mentorías en Inteligencia Artificial</li>
                    <li>Consultoría Personalizada</li>
                    <li>Integración de Chatbots</li>
                </ul>
            </div>

            {/* Columna 3: Empresa */}
            <div>
                <h3 className="footer-title">Empresa</h3>
                <ul className="footer-column footer-links">
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Proyectos</a></li>
                    <li><a href="#">Quiénes Somos</a></li>
                    <li><a href="#">Servicios</a></li>
                    <li><a href="#">Contáctanos</a></li>
                </ul>
            </div>

            {/* Columna 4: Contacto */}
            <div>
                <h3 className="footer-title">Contacto</h3>
                <div className="footer-column footer-contact">
                    <div className="flex items-start gap-2">
                        <MapPin size={18} className="icon" />
                        <span>Elda, Alicante – España</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail size={18} className="icon" />
                        <a href="mailto:contacto@uthopiq.com">uthopiq@gmail.com</a>
                    </div>
                </div>
            </div>
        </div>

        {/* Separador */}
        <div className="footer-separator" />

        {/* Línea inferior */}
        <div className="footer-bottom">
            <p>&copy;{new Date().getFullYear()} <span style={{ color: "white", fontWeight: "bold" }}>Uthopiq</span>. Todos los derechos reservados.</p>
            <div className="links">
                <a href="#">Política de Privacidad</a>
                <a href="#">Términos de Servicio</a>
                <a href="#">Cookies</a>
            </div>
        </div>
    </footer>
  );
}

export default Footer;