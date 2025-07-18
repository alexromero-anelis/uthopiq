import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";
import './personalizaPlan.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const serviciosAdicionales = [
  { title: "Blog", price: "Desde 80€" },
  { title: "Multi-idioma", price: "Desde 50€/idioma" },
  { title: "Alojamiento", price: "Desde 10€" }
];

function PersonalizaPlan() {
  const [tipoServicio, setTipoServicio] = useState('plan-web');
  const [seleccionados, setSeleccionados] = useState([]);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleServicio = (servicio) => {
    setSeleccionados((prev) =>
      prev.includes(servicio)
        ? prev.filter((s) => s !== servicio)
        : [...prev, servicio]
    );
  };

  const mostrarCampoAutomatizaciones =
    tipoServicio === 'automatizacion' || seleccionados.includes("Automatizaciones");

  const mostrarCampoChatbots =
    tipoServicio === 'automatizacion' || seleccionados.includes("Chatbots");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();

    if (!nombre || !email) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor completa tu nombre y correo electrónico.',
        confirmButtonColor: '#e67e22'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Correo inválido',
        text: 'Por favor ingresa un correo válido.',
        confirmButtonColor: '#e67e22'
      });
      return;
    }

    if (!captchaToken) {
      Swal.fire({
        icon: 'warning',
        title: 'Verificación requerida',
        text: 'Completa el reCAPTCHA para continuar.',
        confirmButtonColor: '#e67e22'
      });
      return;
    }

    setStatus("Enviando...");

    try {
      const formData = new FormData(form);
      formData.append("g-recaptcha-response", captchaToken);
      formData.append("serviciosAdicionales", seleccionados.join(', '));

      const res = await fetch("https://uthopiq.com/personalizar-plan.php", {
        method: "POST",
        body: formData
      });

      const result = await res.text();

      if (result.includes("Mensaje enviado correctamente")) {
        Swal.fire({
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Nos pondremos en contacto contigo pronto.',
          confirmButtonColor: '#00c37e'
        });
        form.reset();
        setSeleccionados([]);
        setCaptchaToken(null);
        setStatus("");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result,
          confirmButtonColor: '#e74c3c'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error inesperado',
        text: 'Intenta nuevamente en unos minutos.',
        confirmButtonColor: '#e74c3c'
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="personaliza-container">
        <h1>Personaliza tu plan</h1>
        <form className="formulario" onSubmit={handleSubmit}>
          <label>Nombre:
            <input type="text" name="nombre" />
          </label>

          <label>Correo electrónico:
            <input type="email" name="email" />
          </label>

          <label>Tipo de servicio:
            <select name="tipo-servicio" value={tipoServicio} onChange={(e) => setTipoServicio(e.target.value)}>
              <option value="plan-web">Plan web</option>
              <option value="automatizacion">Automatización o chatbot</option>
            </select>
          </label>

          {tipoServicio === 'plan-web' && (
            <>
              <label>Tipo de web:
                <select name="tipo-web">
                  <option value="landing-basica">Landing Básica</option>
                  <option value="landing-avanzada">Landing Avanzada</option>
                  <option value="web-estandar">Web Estándar</option>
                  <option value="web-avanzada">Web Avanzada</option>
                  <option value="web-a-medida">Web A Medida</option>
                </select>
              </label>

              <div className="servicios-simples">
                <p>Servicios web adicionales:</p>
                {serviciosAdicionales.map((s, i) => (
                  <label key={i} className="checkbox-simple">
                    <input
                      type="checkbox"
                      value={s.title}
                      checked={seleccionados.includes(s.title)}
                      onChange={() => toggleServicio(s.title)}
                    />
                    <span>{s.title} — {s.price}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {mostrarCampoChatbots && (
            <label>
              Chatbot deseado:
              <textarea name="chatbots" placeholder="Describe el chatbot que necesitas" />
            </label>
          )}

          {mostrarCampoAutomatizaciones && (
            <label>
              Automatizaciones deseadas:
              <textarea name="automatizaciones" placeholder="Describe tus necesidades" />
            </label>
          )}

          <div className="recaptcha-wrapper">
            <ReCAPTCHA
              sitekey="6LeYDIUrAAAAADDSGLNADq0UygjRR2aIQak6w_wT"
              onChange={(token) => setCaptchaToken(token)}
              onExpired={() => setCaptchaToken(null)}
            />
          </div>

          <button type="submit">Enviar</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default PersonalizaPlan;