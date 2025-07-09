import './contacto.css';

function Contacto() {
  return (
    <section className="contacto" id="contacto">
      <h2>Contacto</h2>
      <p className="contacto-sub">¿Tienes un proyecto o necesitas ayuda? Escríbenos y hablamos.</p>
      
      <form className="contacto-form">
        <input type="text" name="nombre" placeholder="Tu nombre" required />
        <input type="email" name="email" placeholder="Tu correo electrónico" required />
        <textarea name="mensaje" rows="6" placeholder="Tu mensaje" required></textarea>
        <button type="submit">Enviar mensaje</button>
      </form>

      <div className="contacto-info">
        <p>Email: <a href="mailto:uthopiq@gmail.com">uthopiq@gmail.com</a></p>
      </div>
    </section>
  );
}

export default Contacto;
