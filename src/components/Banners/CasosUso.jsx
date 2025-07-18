import "./banners.css";

function CasosUso() {
  return (
    <section className="casos-uso-fondo">
      <div className="casos-uso-container" data-aos="fade-up">
        <h2 className="casos-uso-title">¿Qué puedes automatizar?</h2>
        <ul className="casos-uso-lista">
          <li>
            <span>✔</span> Responder automáticamente a mensajes de WhatsApp de
            clientes
          </li>
          <li>
            <span>✔</span> Enviar correos postventa o recordatorios de pago
            vencido
          </li>
          <li>
            <span>✔</span> Crear tareas en Notion o Asana desde formularios web
          </li>
          <li>
            <span>✔</span> Generar facturas o reportes en PDF y enviarlos por
            email
          </li>
          <li>
            <span>✔</span> Sincronizar datos entre Google Sheets, tu CRM y otras
            herramientas
          </li>
        </ul>
      </div>
    </section>
  );
}

export default CasosUso;
