import { useState, useEffect } from 'react';
import './personalizaPlan.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const serviciosAdicionales = [
  { title: "Blog", price: "Desde 80€" },
  { title: "Multi-idioma", price: "Desde 50€/idioma" },
  { title: "Chatbots", price: "Desde 150€" },
  { title: "Automatizaciones", price: "Desde 80€/flujo" }
];

function PersonalizaPlan() {
  const [tipoServicio, setTipoServicio] = useState('plan-web');
  const [seleccionados, setSeleccionados] = useState([]);

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

  return (
    <>
      <Navbar />

      <div className="personaliza-container">
        <h1>Personaliza tu plan</h1>
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

          {tipoServicio === 'plan-web' && (
            <>
              <label>
                Tipo de web:
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
                {serviciosAdicionales.map((servicio, i) => (
                  <label key={i} className="checkbox-simple">
                    <input
                      type="checkbox"
                      value={servicio.title}
                      checked={seleccionados.includes(servicio.title)}
                      onChange={() => toggleServicio(servicio.title)}
                    />
                    <span>{servicio.title} — {servicio.price}</span>
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
                placeholder="Escribe el tipo de chatbot que deseas"
              />
            </label>
          )}

          {mostrarCampoAutomatizaciones && (
            <label>
              Automatizaciones deseadas:
              <textarea
                name="automatizaciones"
                placeholder="Escribe aquí tus ideas y necesidades"
              />
            </label>
          )}

          <button type="submit">Enviar</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default PersonalizaPlan;