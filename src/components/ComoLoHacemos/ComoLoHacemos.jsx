import "./comolohacemos.css";

function ComoLoHacemos() {
  const pasos = [
    "Analizamos tus procesos y proponemos soluciones",
    "Diseñamos un flujo visual y lo validamos contigo",
    "Conectamos las herramientas necesarias",
    "Realizamos pruebas estrictas del flujo",
    "Entrega, soporte, mejoras y actualizaciones",
  ];

  return (
    <section className="como-lo-hacemos" id="como-lo-hacemos">
      <h2 data-aos="fade-up">¿Cómo lo hacemos?</h2>
      <p className="como-subtitle" data-aos="fade-up">
        Proceso que seguimos en todos nuestros proyectos de automatización.
      </p>

      <div className="checklist" data-aos="fade-up">
        <ol role="list">
          {pasos.map((paso, i) => (
            <li>
              <span className="num">{i + 1}-</span>
              <span className="txt">{paso}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default ComoLoHacemos;