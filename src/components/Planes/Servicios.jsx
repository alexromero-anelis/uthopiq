import './servicios.css';

const serviciosAdicionales = [
  {
    title: "Blog",
    description: "Configuración de blog con diseño y estructura optimizados.",
    price: "Desde 80€"
  },
  {
    title: "Multi-idioma",
    description: "Traducción e implementación de versiones en otros idiomas.",
    price: "Desde 50€/idioma"
  },
  {
    title: "Chatbots",
    description: "Desarrollo de chatbots para atención automática en web o WhatsApp.",
    price: "Desde 150€"
  },
  {
    title: "Automatizaciones",
    description: "Automatización de tareas con herramientas como n8n o Zapier.",
    price: "Desde 80€/flujo"
  }
];

const serviciosIncluidos = [
  {
    title: "Diseño responsive",
    description: "Tu web se verá bien en móviles, tablets y ordenadores."
  },
  {
    title: "Optimización de carga",
    description: "Archivos, imágenes y estructura pensados para cargar rápido."
  },
  {
    title: "Formulario de contacto",
    description: "Formulario funcional conectado a tu email o WhatsApp."
  },
  {
    title: "Enlace a redes sociales",
    description: "Botones y accesos a tus perfiles de redes sociales."
  },
  {
    title: "SEO básico",
    description: "Optimización inicial para buscadores: estructura, títulos y velocidad."
  },
  {
    title: "Mentorías",
    description: "Explicamos cada parte del proyecto para que sepas cómo funciona todo."
  },
  {
    title: "Seguimiento personalizado",
    description: "Resumen del proyecto + pasos realizados."
  },
  {
    title: "Diseño a medida",
    description: "Adaptado a tus gustos, necesidades y branding."
  },
  {
    title: "Mantenimiento y soporte",
    description: "Soporte durante el desarrollo y revisiones al finalizar.",
    price: "Desde 25€/mes"
  },
  {
    title: "Hosting incluido",
    description: "Alojamiento si no tienes uno propio.",
    price: "Desde 25€/mes"
  }
];


function Servicios() {
  return (
    <section className="servicios" id="servicios">
      <h2>Servicios en todos los planes</h2>
      <div className="servicios-grid">
        {serviciosIncluidos.map((servicio, index) => (
          <div className="servicio-card" key={index}>
            <h3>{servicio.title}</h3>
            <p>{servicio.description}</p>
            <span className="precio">{servicio.price}</span>
          </div>
        ))}
      </div>
      <h2>Servicios Adicionales</h2>
      <div className="servicios-grid">
        {serviciosAdicionales.map((servicio, index) => (
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

export default Servicios;
