import './servicios.css';

const servicios = [
  {
    title: "Mantenimiento Web",
    description: "Actualizaciones, backups, seguridad y soporte.",
    price: "20€/mes"
  },
  {
    title: "Mantenimiento Automatizaciones",
    description: "Revisión de flujos, logs y ajustes menores.",
    price: "Desde 15€/mes por flujo"
  },
  {
    title: "Copywriting SEO",
    description: "Textos optimizados para web o landing.",
    price: "Desde 60€/página"
  },
  {
    title: "Integración con pagos o reservas",
    description: "Instalación y configuración de pasarelas o plugins.",
    price: "Precio según complejidad"
  }
];

function ServiciosAdicionales() {
  return (
    <section className="servicios">
      <h2>Servicios Adicionales</h2>
      <div className="servicios-grid">
        {servicios.map((servicio, index) => (
          <div className="servicio-card" key={index}>
            <h3>{servicio.title}</h3>
            <p>{servicio.description}</p>
            <span className="precio">{servicio.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServiciosAdicionales;
