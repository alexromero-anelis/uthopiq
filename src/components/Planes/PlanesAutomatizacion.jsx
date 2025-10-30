import "./planes.css";
import CardPlan from "./CardPlan/CardPlan";
import automatizacionData from "./automatizacionData";

function PlanesAutomatizacion() {
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
  };
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
        <button
          className="cta-button-outline px-8 py-4 rounded-lg font-medium text-lg border-2"
          onClick={() => scrollToSection("contacto")}
        >
          Solicita tu automatización
        </button>
      </div>
    </section>
  );
}

export default PlanesAutomatizacion;