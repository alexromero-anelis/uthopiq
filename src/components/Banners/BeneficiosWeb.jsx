import "./banners.css";

function BeneficiosWeb() {
  return (
    <section className="banner-beneficios-fondo">
      <div className="banner-beneficios-container" data-aos="fade-up">
        <h2 className="banner-beneficios-title">
          ¿Por qué deberías tener una página web?
        </h2>
        <ul className="banner-beneficios-lista">
          <li>
            <span>✔</span> Aumenta tu visibilidad en Google y redes sociales
          </li>
          <li>
            <span>✔</span> Genera confianza con una imagen profesional
          </li>
          <li>
            <span>✔</span> Recibe solicitudes o ventas las 24/7
          </li>
          <li>
            <span>✔</span> Muestra tus productos o servicios de forma clara
          </li>
          <li>
            <span>✔</span> Automatiza tareas como reservas, cobros o contacto
          </li>
        </ul>
      </div>
    </section>
  );
}

export default BeneficiosWeb;
