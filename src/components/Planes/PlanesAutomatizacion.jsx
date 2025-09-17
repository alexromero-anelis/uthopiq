import "./planes.css";
import { Link } from "react-router-dom";

function PlanesAutomatizacion() {
  return (
    <section className="planes automatizacion-central" id="automatizaciones">
      <div className="planes-header" data-aos="fade-up">
        <span className="planes-subtitle">Optimiza tu negocio</span>
        <h2>Automatización con IA</h2>
        <p className="planes-descripcion">
          Automatizamos tareas repetitivas, conectamos tus herramientas y
          diseñamos flujos inteligentes adaptados a tu forma de trabajar. Ya sea
          que vendas productos, ofrezcas servicios o gestiones clientes, podemos
          ayudarte a ganar tiempo y precisión.
        </p>
      </div>

      <div className="automatizacion-bloques" data-aos="fade-up">
        <div className="bloque">
          <h3>¿Qué ganas al automatizar?</h3>
          <ul>
            <li>Ahorro económico</li>
            <li>Más tiempo para lo importante</li>
            <li>Elimina tareas repetitivas</li>
            <li>Procesos más eficientes</li>
            <li>Respuestas instantáneas a clientes</li>
          </ul>
        </div>

        <div className="bloque">
          <h3>¿Cómo lo hacemos?</h3>
          <ul>
            <li>Analizamos tus procesos y proponemos soluciones</li>
            <li>Diseñamos un flujo visual y lo validamos contigo</li>
            <li>Conectamos las herramientas necesarias</li>
            <li>Realizamos pruebas estrictas del flujo</li>
            <li>Entrega, soporte, mejoras y actualizaciones</li>
          </ul>
        </div>
      </div>

      <div className="planes-boton-container" data-aos="zoom-in">
        <Link to="/personaliza-tu-plan">
          <button className="cta-button-outline px-8 py-4 rounded-lg font-medium text-lg border-2">
            Solicita tu automatización
          </button>
        </Link>
      </div>
    </section>
  );
}

export default PlanesAutomatizacion;
