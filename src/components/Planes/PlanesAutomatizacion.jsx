import "./planes.css";
import { Link } from "react-router-dom";

function PlanesAutomatizacion() {
  return (
    <section className="planes automatizacion-central" id="automatizaciones">
      <div className="planes-header" data-aos="fade-up">
        <span className="planes-subtitle">Automatización con IA</span>
        <h2>Optimiza tu negocio</h2>
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
            <li>Más tiempo para lo importante</li>
            <li>Procesos más ágiles y sin errores</li>
            <li>Mejores respuestas para tus clientes</li>
            <li>Control y trazabilidad en tiempo real</li>
            <li>Ahorro económico en tareas operativas</li>
          </ul>
        </div>

        <div className="bloque">
          <h3>¿Cómo lo hacemos?</h3>
          <ul>
            <li>Analizamos tus procesos y detectamos oportunidades</li>
            <li>Diseñamos un flujo visual y lo validamos contigo</li>
            <li>Conectamos tus herramientas favoritas</li>
            <li>Probamos todo hasta que funcione solo</li>
            <li>Te damos soporte, mejoras y actualizaciones</li>
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
