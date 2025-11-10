import "./banners.css";

function BeneficiosWeb() {
  return (
    <section className="banner-beneficios-fondo">
      <div className="banner-beneficios-container" data-aos="fade-up">
        <h2 className="banner-beneficios-title">
          ¿Por qué deberías tener una web?
        </h2>
        <ul className="banner-beneficios-lista">
          <li>
            <span>✔</span> Aumenta la visibilidad de tu negocio
          </li>
          <li>
            <span>✔</span> Da una imagen profesional a tu público
          </li>
          <li>
            <span>✔</span> Muestra tus productos o servicios de forma clara
          </li>
          <li>
            <span>✔</span> Contacta y vende durante las 24 horas del día
          </li>
          <li>
            <span>✔</span> Facilita tareas como reservas o cobros 
          </li>
        </ul>
      </div>
    </section>
  );
}

export default BeneficiosWeb;
