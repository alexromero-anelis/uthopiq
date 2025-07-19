import { useState } from "react";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import "./contacto.css";

function Contacto() {
  const [captchaToken, setCaptchaToken] = useState(null);
  const [status, setStatus] = useState("");

  // SweetAlert2 personalizado
  const customSwal = Swal.mixin({
    customClass: {
      popup: "uthopiq-popup",
      confirmButton: "uthopiq-confirm-button",
      cancelButton: "uthopiq-cancel-button",
      title: "uthopiq-title",
      htmlContainer: "uthopiq-text",
    },
    buttonsStyling: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();

    if (!nombre) {
      customSwal.fire({
        icon: "warning",
        title: "No se puede enviar el mensaje",
        text: "Por favor ingresa tu nombre.",
      });
      return;
    }

    if (!email) {
      customSwal.fire({
        icon: "warning",
        title: "No se puede enviar el mensaje",
        text: "Por favor ingresa tu correo electrónico.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      customSwal.fire({
        icon: "warning",
        title: "Correo inválido",
        text: "Por favor ingresa un correo electrónico válido.",
      });
      return;
    }

    if (!mensaje) {
      customSwal.fire({
        icon: "warning",
        title: "No se puede enviar el mensaje",
        text: "Por favor escribe tu mensaje.",
      });
      return;
    }

    if (!captchaToken) {
      customSwal.fire({
        icon: "warning",
        title: "Verificación requerida",
        text: "Por favor completa el reCAPTCHA.",
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
        customSwal.fire({
          icon: "success",
          title: "Mensaje enviado correctamente",
          text: "Pronto contactaremos contigo",
        });
        form.reset();
        setCaptchaToken(null);
        setStatus("");
      } else {
        customSwal.fire({
          icon: "error",
          title: "Error al enviar",
          text: result,
        });
      }
    } catch (error) {
      customSwal.fire({
        icon: "error",
        title: "Ocurrió un error",
        text: "Intenta nuevamente en unos minutos",
      });
    }
  };

  return (
    <section className="contacto" id="contacto">
      <h2 data-aos="fade-up">Contacto</h2>
      <p className="contacto-sub" data-aos="fade-up">
        ¿Tienes un proyecto o necesitas ayuda? Escríbenos y responderemos en
        menos de 24h.
      </p>

      <form className="formulario" onSubmit={handleSubmit} data-aos="fade-up">
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

      <div className="contacto-info" data-aos="fade-up">
        <p>
          Puedes escribirnos directamente a{" "}
          <a href="mailto:contacto@uthopiq.com">contacto@uthopiq.com</a>
        </p>
      </div>
    </section>
  );
}

export default Contacto;
