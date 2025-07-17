import "./bonos.css";

function Bonos() {
  return (
    <section className="bonos" id="bonos">
      <h2 data-aos="fade-up">Bonos de soporte técnico</h2>
      <p className="bonos-subtitle" data-aos="fade-up">
        Usa estos bonos después de la entrega para soporte técnico, cambios o mejoras.
      </p>
      <div className="bono-simple-table" data-aos="fade-up">
        <div className="bono-simple-row header">
          <span>Bono de horas</span>
          <span>Precio</span>
        </div>
        <div className="bono-simple-row"><span>5 horas</span><span>50 €</span></div>
        <div className="bono-simple-row"><span>10 horas</span><span>90 €</span></div>
        <div className="bono-simple-row"><span>20 horas</span><span>160 €</span></div>
        <div className="bono-simple-row"><span>30 horas</span><span>210 €</span></div>
        <div className="bono-simple-row"><span>50 horas</span><span>300 €</span></div>
      </div>
    </section>
  );
}

export default Bonos;