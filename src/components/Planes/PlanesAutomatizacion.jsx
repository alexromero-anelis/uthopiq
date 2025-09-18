import "./planes.css";
import CardPlan from "./CardPlan/CardPlan";
import automatizacionData from "./automatizacionData";
import { Link } from "react-router-dom";

function PlanesAutomatizacion() {
  return (
    <section className="planes automatizacion-central" id="automatizaciones">
      <div className="planes-header" data-aos="fade-up">
        <span className="planes-subtitle">Optimiza tu negocio</span>
        <h2>Automatización con IA</h2>
        <p className="planes-descripcion">
          Descubre cómo la inteligencia artificial puede ayudarte a ahorrar
          tiempo, reducir costes y mejorar la experiencia de tus clientes.
        </p>
      </div>

      <div className="planes-grid" data-aos="fade-up">
        {automatizacionData.map((plan, index) => (
          <CardPlan key={index} {...plan} />
        ))}
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