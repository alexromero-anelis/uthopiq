import { useState, useRef } from "react";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import "./contacto.css";

function Contacto() {
  const [captchaToken, setCaptchaToken] = useState(null);
  const [status, setStatus] = useState("");
  const recaptchaRef = useRef(null);

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
    const form = e.currentTarget;
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre)
      return customSwal.fire({ icon: "warning", title: "Falta tu nombre" });
    if (!emailRegex.test(email))
      return customSwal.fire({ icon: "warning", title: "Correo inválido" });
    if (!mensaje)
      return customSwal.fire({ icon: "warning", title: "Mensaje vacío" });
    if (!captchaToken)
      return customSwal.fire({
        icon: "warning",
        title: "Completa el reCAPTCHA",
      });

    setStatus("sending");
    try {
      const formData = new FormData(form);
      formData.append("g-recaptcha-response", captchaToken);

      const res = await fetch("https://uthopiq.com/contacto.php", {
        method: "POST",
        body: formData,
      });
      const txt = await res.text();

      if (txt.includes("Mensaje enviado correctamente")) {
        customSwal.fire({
          icon: "success",
          title: "¡Enviado!",
          text: "Te respondemos en &lt; 24h.",
        });
        form.reset();
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        customSwal.fire({
          icon: "error",
          title: "Error al enviar",
          text: txt || "Intenta de nuevo.",
        });
      }
    } catch {
      customSwal.fire({
        icon: "error",
        title: "Ocurrió un error",
        text: "Prueba en unos minutos.",
      });
    } finally {
      setStatus("");
    }
  };

  return (
    <section className="contacto" id="contacto">
      <header className="contacto-head" data-aos="fade-up">
        <h2>Contacto</h2>
        <p className="contacto-sub">
          ¿Tienes un proyecto o necesitas ayuda? Respondemos en menos de 24h.
        </p>
      </header>

      {/* Card con el mismo look que .card-plan */}
      <div
        className="card-contact card-plan"
        data-aos="fade-up"
        data-aos-delay="50"
      >
        <div className="card-contact-body card-plan-body">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Tu nombre"
                autoComplete="name"
              />
            </div>

            <div className="field">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tucorreo@dominio.com"
                autoComplete="email"
              />
            </div>

            <div className="field field-full">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="5"
                placeholder="Cuéntanos sobre tu proyecto"
              />
            </div>

            <div className="captcha field-full">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LeYDIUrAAAAADDSGLNADq0UygjRR2aIQak6w_wT"
                onChange={(t) => setCaptchaToken(t)}
                onExpired={() => setCaptchaToken(null)}
                theme="dark"
              />
            </div>

            <div className="actions field-full">
              <button type="submit" disabled={status === "sending"}>
                {status === "sending" ? (
                  <span className="spinner" aria-hidden="true" />
                ) : null}
                {status === "sending" ? " Enviando…" : "Enviar mensaje"}
              </button>
              <span className="hint">Respuesta en &lt; 24h</span>
            </div>
          </form>
        </div>
      </div>

      <div className="contacto-info" data-aos="fade-up" data-aos-delay="100">
        <p>
          O escríbenos a{" "}
          <a href="mailto:contacto@uthopiq.com">contacto@uthopiq.com</a>
        </p>
      </div>
    </section>
  );
}

export default Contacto;
