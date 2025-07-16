import { useState } from "react";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import "./contacto.css";

function Contacto() {
  const [captchaToken, setCaptchaToken] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();

    // Validaciones campo por campo
    if (!nombre) {
      Swal.fire({
        icon: "warning",
        title: "No se puede enviar el mensaje",
        text: "Por favor ingresa tu nombre.",
        confirmButtonColor: "#e67e22",
      });
      return;
    }

    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "No se puede enviar el mensaje",
        text: "Por favor ingresa tu correo electrónico.",
        confirmButtonColor: "#e67e22",
      });
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "warning",
        title: "Correo inválido",
        text: "Por favor ingresa un correo electrónico válido.",
        confirmButtonColor: "#e67e22",
      });
      return;
    }

    if (!mensaje) {
      Swal.fire({
        icon: "warning",
        title: "No se puede enviar el mensaje",
        text: "Por favor escribe tu mensaje.",
        confirmButtonColor: "#e67e22",
      });
      return;
    }

    if (!captchaToken) {
      Swal.fire({
        icon: "warning",
        title: "Verificación requerida",
        text: "Por favor completa el reCAPTCHA.",
        confirmButtonColor: "#e67e22",
      });
      return;
    }

    setStatus("Enviando...");

    try {
      const formData = new FormData(form);
      formData.append("g-recaptcha-response", captchaToken);

      const response = await fetch("https://uthopiq.com/contacto.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.text();

      if (result.includes("Mensaje enviado correctamente")) {
        Swal.fire({
          icon: "success",
          title: "Mensaje enviado correctamente",
          text: "Pronto contactaremos contigo",
          confirmButtonColor: "#00c37e",
        });
        form.reset();
        setCaptchaToken(null);
        setStatus("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al enviar",
          text: result,
          confirmButtonColor: "#e74c3c",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ocurrió un error",
        text: "Intenta nuevamente en unos minutos",
        confirmButtonColor: "#e74c3c",
      });
    }
  };

  return (
    <section className="contacto" id="contacto">
      <h2>Contacto</h2>
      <p className="contacto-sub">
        ¿Tienes un proyecto o necesitas ayuda? Escríbenos y responderemos en
        menos de 24h.
      </p>

      <form className="formulario" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" />
        </label>

        <label>
          Correo electrónico:
          <input type="email" name="email" />
        </label>

        <label>
          Mensaje:
          <textarea
            name="mensaje"
            placeholder="Cuéntanos sobre tu proyecto o consulta"
          />
        </label>

        <div className="captcha-wrapper">
          <ReCAPTCHA
            sitekey="6LeYDIUrAAAAADDSGLNADq0UygjRR2aIQak6w_wT"
            onChange={(token) => setCaptchaToken(token)}
            onExpired={() => setCaptchaToken(null)}
          />
        </div>

        <button type="submit">Enviar mensaje</button>
      </form>

      <div className="contacto-info">
        <p>
          Puedes escribirnos directamente a{" "}
          <a href="mailto:contacto@uthopiq.com">contacto@uthopiq.com</a>
        </p>
      </div>
    </section>
  );
}

export default Contacto;
