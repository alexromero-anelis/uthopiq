import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import "./personalizaPlan.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import planesData from '../components/Planes/planesData.js';

const serviciosAdicionales = [
  { title: "Blog", price: "Desde 80€" },
  { title: "Multi-idioma", price: "Desde 50€/idioma" },
  { title: "Alojamiento", price: "Desde 10€" },
];

// 👇 mapeo slug <-> título del JSON (alineado con tus planesData)
const optionToTitle = {
  "landing-basica": "Landing Básica",
  "landing-avanzada": "Landing Avanzada",
  "web-basica": "Web Básica",
  "web-avanzada": "Web Avanzada",
  "tienda-online": "Tienda Online",
  "web-a-medida": null, // especial: sin card en JSON, se describe aparte
};

const titleToOption = Object.fromEntries(
  Object.entries(optionToTitle)
    .filter(([, t]) => t) // quita null
    .map(([k, v]) => [v, k])
);

function PersonalizaPlan() {
  const [tipoServicio, setTipoServicio] = useState("plan-web");

  // por defecto selecciono el primer plan de tu JSON
  const defaultOption = titleToOption[planesData[0]?.title] || "landing-basica";
  const [tipoWeb, setTipoWeb] = useState(defaultOption);

  const [seleccionados, setSeleccionados] = useState([]);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const toggleServicio = (servicio) => {
    setSeleccionados((prev) =>
      prev.includes(servicio)
        ? prev.filter((s) => s !== servicio)
        : [...prev, servicio]
    );
  };

  const mostrarCampoAutomatizaciones =
    tipoServicio === "automatizacion" ||
    seleccionados.includes("Automatizaciones");

  const mostrarCampoChatbots =
    tipoServicio === "automatizacion" || seleccionados.includes("Chatbots");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();

    if (!nombre || !email) {
      customSwal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: "Por favor completa tu nombre y correo electrónico.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      customSwal.fire({
        icon: "warning",
        title: "Correo inválido",
        text: "Por favor ingresa un correo válido.",
      });
      return;
    }

    if (!captchaToken) {
      customSwal.fire({
        icon: "warning",
        title: "Verificación requerida",
        text: "Completa el reCAPTCHA para continuar.",
      });
      return;
    }

    setStatus("Enviando...");

    try {
      const formData = new FormData(form);
      formData.append("g-recaptcha-response", captchaToken);
      formData.append("serviciosAdicionales", seleccionados.join(", "));

      // 👇 envía el TÍTULO del plan (mejor para tu backend y para humanos)
      const planTitle = optionToTitle[tipoWeb] || "Web a Medida";
      formData.set("tipo-web", planTitle);

      const res = await fetch("https://uthopiq.com/personalizar-plan.php", {
        method: "POST",
        body: formData,
      });

      const result = await res.text();

      if (result.includes("Mensaje enviado correctamente")) {
        customSwal.fire({
          icon: "success",
          title: "Solicitud enviada",
          text: "Nos pondremos en contacto contigo pronto.",
        });
        form.reset();
        setSeleccionados([]);
        setCaptchaToken(null);
        setStatus("");
        setTipoServicio("plan-web");
        setTipoWeb(defaultOption);
      } else {
        customSwal.fire({
          icon: "error",
          title: "Error",
          text: result,
        });
      }
    } catch (error) {
      customSwal.fire({
        icon: "error",
        title: "Error inesperado",
        text: "Intenta nuevamente en unos minutos.",
      });
    }
  };

  // helpers UI
  const selectedPlanTitle = optionToTitle[tipoWeb]; // puede ser null en web-a-medida
  const selectedPlan =
    selectedPlanTitle &&
    planesData.find((p) => p.title.toLowerCase() === selectedPlanTitle.toLowerCase());

  // plans que existen en el JSON (excluye "Web a Medida")
  const jsonPlanTitles = new Set(planesData.map((p) => p.title));

  return (
    <>
      <Navbar />
      <div className="personaliza-container">
        <h1>Personaliza tu plan</h1>

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
            Tipo de servicio:
            <select
              name="tipo-servicio"
              value={tipoServicio}
              onChange={(e) => setTipoServicio(e.target.value)}
            >
              <option value="plan-web">Plan web</option>
              <option value="automatizacion">Automatización o chatbot</option>
            </select>
          </label>

          {tipoServicio === "plan-web" && (
            <>
              {/* Grid de cards para elegir visualmente */}
              <div className="personaliza-planes-grid">
                {planesData.map((plan, idx) => {
                  const optionValue = titleToOption[plan.title]; // undefined si no está mapeado
                  if (!optionValue) return null; // por seguridad
                  const isSelected = tipoWeb === optionValue;

                  return (
                    <div
                      key={idx}
                      className={`plan-card-selectable ${isSelected ? "selected" : ""}`}
                      onClick={() => setTipoWeb(optionValue)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setTipoWeb(optionValue);
                      }}
                    >
                      {/* usa tu mismo estilo que en CardPlan o directamente reusa el componente si quieres */}
                      <div className="plan-card-header">
                        <h3>{plan.title}</h3>
                      </div>
                      <ul className="plan-card-features">
                        {plan.features.slice(0, 6).map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                      {/* si en planesData tienes className como 'doble-columna' puedes usarlo para estilos */}
                    </div>
                  );
                })}
              </div>

              {/* Vista detallada del plan seleccionado o mensaje para "a medida" */}
              <div className="plan-detalle">
                {selectedPlan ? (
                  <>
                    <h4>Características de “{selectedPlan.title}”</h4>
                    <ul>
                      {selectedPlan.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <h4>Plan “Web a medida”</h4>
                    <p>
                      Dinos qué necesitas (páginas, integraciones, SEO, automatizaciones, área privada,
                      etc.) y te planteamos una propuesta personalizada.
                    </p>
                  </>
                )}
              </div>

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
                    <span>
                      {s.title} — {s.price}
                    </span>
                  </label>
                ))}
              </div>
            </>
          )}

          {mostrarCampoChatbots && (
            <label>
              Chatbot deseado:
              <textarea
                name="chatbots"
                placeholder="Describe el chatbot que necesitas"
              />
            </label>
          )}

          {mostrarCampoAutomatizaciones && (
            <label>
              Automatizaciones deseadas:
              <textarea
                name="automatizaciones"
                placeholder="Describe tus necesidades"
              />
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