import './contacto.css';

function Contacto() {
  return (
    <section className="contacto" id="contacto">

      <h2>Contacto</h2>
      <p className="contacto-sub">¿Tienes un proyecto o necesitas ayuda? Escríbenos y responderemos en menos de 24h.</p>

      <form className="formulario">
        <label>
          Nombre:
          <input type="text" name="nombre" required />
        </label>

        <label>
          Correo electrónico:
          <input type="email" name="email" required />
        </label>

        <label>
          Mensaje:
          <textarea name="mensaje" placeholder="Cuéntanos sobre tu proyecto o consulta" required />
        </label>

        <button type="submit">Enviar mensaje</button>
      </form>

      <div className="contacto-info">
        <p>Puedes escribirnos directamente a <a href="mailto:uthopiq@gmail.com">uthopiq@gmail.com</a></p>
      </div>
    </section>
  );
}

export default Contacto;