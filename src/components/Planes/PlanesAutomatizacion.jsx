import './planes.css';
import automatizacionImg from '../../images/automatizaciones.png'; 
import { Link} from "react-router-dom";

function PlanesAutomatizacion() {
  return (
    <section className="automatizacion-section" id="automatizaciones">
      <div className="automatizacion-header" data-aos="fade-up">
        <span className="automatizacion-subtitle">Automatización con IA</span>
        <h2>Automatiza tu negocio</h2>
        <p className="automatizacion-descripcion">
          Diseñamos <strong>automatizaciones inteligentes</strong> para conectar
          tus herramientas, eliminar procesos repetitivos y aumentar tu
          productividad. Diseñamos tu flujo ideal, lo implementamos, lo probamos y lo dejamos
        funcionando sin que tengas que preocuparte por nada.
        </p>
      </div>

      <div className="automatizacion-contenido">
        <div className="automatizacion-texto">
          <h3>¿Qué tipo de automatizaciones ofrecemos?</h3>
          <ul className="automatizacion-lista estructura" data-aos="fade-up">
            <li>
              <h4>Respuestas automáticas</h4>
              <p>
                Cuando alguien llena un formulario o te escribe por WhatsApp,
                recibe una respuesta personalizada sin que tú hagas nada.
              </p>
            </li>
            <li>
              <h4>Envío de correos programados</h4>
              <p>
                Recordatorios de pagos, mensajes postventa o promociones que se
                envían solos en el momento justo.
              </p>
            </li>
            <li>
              <h4>Facturación y reportes automáticos</h4>
              <p>
                Genera facturas o reportes en PDF y recíbelos por correo sin
                mover un dedo.
              </p>
            </li>
            <li>
              <h4>Conexión entre tus herramientas</h4>
              <p>
                Cuando actualizas un dato en Google Sheets o Notion, se
                sincroniza automáticamente con otras apps que usas.
              </p>
            </li>
            <li>
              <h4>Seguimiento de clientes</h4>
              <p>
                Crea tareas, avisos o correos según lo que hace (o no hace) un
                cliente en tu web o tienda.
              </p>
            </li>
          </ul>

          <div className="automatizacion-extra-card" data-aos="fade-up">
            
          </div>

          <div className="planes-boton-container" data-aos="zoom-in">
            <Link to="/personaliza-tu-plan">
              <button className="cta-button-outline px-8 py-4 rounded-lg font-medium text-lg border-2">
                Personaliza tu flujo
              </button>
            </Link>
          </div>
        </div>

        <div className="automatizacion-imagen" data-aos="fade-left">
          <img src={automatizacionImg} alt="Automatizaciones Inteligentes" />
        </div>
      </div>
    </section>
  );
}

export default PlanesAutomatizacion;