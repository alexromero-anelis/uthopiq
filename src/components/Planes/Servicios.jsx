// Servicios.jsx
import { useState, useEffect } from "react";
import {
  Paintbrush,
  Settings,
  Handshake,
  Globe,
  FileText,
  Bot,
  Workflow,
  LifeBuoy,
} from "lucide-react";
import "./servicios.css";

const serviciosAdicionales = [
  {
    title: "Blog",
    description: "Configuración de blog con diseño y estructura optimizados.",
    price: "Desde 80€",
    icon: FileText,
  },
  {
    title: "Multi-idioma",
    description: "Traducción e implementación de versiones en otros idiomas.",
    price: "Desde 50€/idioma",
    icon: Globe,
  },
  {
    title: "Chatbots",
    description:
      "Desarrollo de chatbots para atención automática en web o WhatsApp.",
    price: " ",
    icon: Bot,
  },
  {
    title: "Automatizaciones",
    description:
      "Implementación de flujos automáticos para ahorrar tiempo y mejorar procesos.",
    price: "Depende de la dificultad",
    icon: Workflow,
  },
  {
    title: "Bonos de soporte técnico",
    description: "Soporte durante el desarrollo y revisiones al finalizar.",
    icon: LifeBuoy,
    isBono: true,
  },
];

function Servicios() {
  const [showModal, setShowModal] = useState(false);
  const [showHostingModal, setShowHostingModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showModal]);

  useEffect(() => {
    const isModalOpen = showModal || showHostingModal;
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showModal, showHostingModal]);

  return (
    <>
      <section className="servicios" id="servicios">
        <h2>Servicios incluidos en planes web</h2>
        <div className="servicios-grupos">
          <div className="servicio-grupo">
            <div className="grupo-header">
              <Paintbrush className="grupo-icono" />
              <h3>Diseño & Rendimiento</h3>
            </div>
            <ul>
              <li>
                <strong>Responsive completo:</strong> Tu sitio se adapta a todos
                los dispositivos.
              </li>
              <li>
                <strong>Diseño personalizado:</strong> Adaptado a tus colores,
                logo y estilo.
              </li>
              <li>
                <strong>Optimizado:</strong> Carga rápida, estructura clara y
                ligero.
              </li>
            </ul>
          </div>
          <div className="servicio-grupo">
            <div className="grupo-header">
              <Settings className="grupo-icono" />
              <h3>Funcionalidades Técnicas</h3>
            </div>
            <ul>
              <li>
                <strong>Formulario funcional:</strong> Conectado a email o
                WhatsApp.
              </li>
              <li>
                <strong>Redes sociales:</strong> Enlaces a tus perfiles activos.
              </li>
              <li>
                <strong>SEO básico:</strong> Títulos, estructura y metadatos.
              </li>
              <li className="servicio-alojamiento destacado">
                <div className="alojamiento-contenido">
                  <strong>Alojamiento</strong>{" "}
                  <span className="suscripcion-label">(pago mensual)</span>
                </div>
                <button
                  className="ver-bonos hosting-link"
                  onClick={() => setShowHostingModal(true)}
                >
                  Consultar precios de alojamiento
                </button>
              </li>
            </ul>
          </div>
          <div className="servicio-grupo">
            <div className="grupo-header">
              <Handshake className="grupo-icono" />
              <h3>Acompañamiento</h3>
            </div>
            <ul>
              <li>
                <strong>Mentorías:</strong> Aprende a usar tu web con confianza.
              </li>
              <li>
                <strong>Seguimiento:</strong> Soporte tras la entrega según
                necesidad.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="servicios servicios-adicionales">
        <h2>Servicios Adicionales</h2>

        {/* Primera fila: 3 servicios */}
        <div className="servicios-grupos">
          {serviciosAdicionales.slice(0, 3).map((servicio, index) => {
            const Icon = servicio.icon;
            return (
              <div className="servicio-grupo" key={index}>
                <div className="grupo-header">
                  <Icon className="grupo-icono" />
                  <h3>{servicio.title}</h3>
                </div>
                <ul>
                  <li>{servicio.description}</li>
                  {servicio.price && (
                    <li>
                      <strong>Precio:</strong> {servicio.price}
                    </li>
                  )}
                  {servicio.isBono && (
                    <li>
                      <button
                        className="ver-bonos"
                        onClick={() => setShowModal(true)}
                      >
                        Ver bonos
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Segunda fila: 2 servicios */}
        <div className="servicios-grupos">
          {serviciosAdicionales.slice(3).map((servicio, index) => {
            const Icon = servicio.icon;
            return (
              <div className="servicio-grupo" key={index + 3}>
                <div className="grupo-header">
                  <Icon className="grupo-icono" />
                  <h3>{servicio.title}</h3>
                </div>
                <ul>
                  <li>{servicio.description}</li>
                  {servicio.price && (
                    <li>
                      <strong>Precio:</strong> {servicio.price}
                    </li>
                  )}
                  {servicio.isBono && (
                    <div className="bono-boton-wrapper">
                      <button
                        className="ver-bonos"
                        onClick={() => setShowModal(true)}
                      >
                        Ver bonos
                      </button>
                    </div>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h3>Bonos de soporte </h3>
            <p className="modal-subtitle">
              Usa estos bonos después de la entrega para soporte técnico o
              mejoras.
            </p>
            <div className="bono-simple-table">
              <div className="bono-simple-row header">
                <span>Bono de horas</span>
                <span>Precio</span>
              </div>
              <div className="bono-simple-row">
                <span>5 horas</span>
                <span>50 €</span>
              </div>
              <div className="bono-simple-row">
                <span>10 horas</span>
                <span>90 €</span>
              </div>
              <div className="bono-simple-row">
                <span>20 horas</span>
                <span>160 €</span>
              </div>
              <div className="bono-simple-row">
                <span>30 horas</span>
                <span>210 €</span>
              </div>
              <div className="bono-simple-row">
                <span>50 horas</span>
                <span>300 €</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showHostingModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowHostingModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowHostingModal(false)}
            >
              ×
            </button>
            <h3>Planes de alojamiento</h3>
            <p className="modal-subtitle">
              Consulta los precios según el tipo de página web que necesites.
            </p>
            <div className="bono-simple-table">
              <div className="bono-simple-row header">
                <span>Tipo de Web</span>
                <span>Precio</span>
              </div>
              <div className="bono-simple-row">
                <span>Landing Básica</span>
                <span>10 €/mes</span>
              </div>
              <div className="bono-simple-row">
                <span>Landing Avanzada</span>
                <span>15 €/mes</span>
              </div>
              <div className="bono-simple-row">
                <span>Web estándar</span>
                <span>25 €/mes</span>
              </div>
              <div className="bono-simple-row">
                <span>Web avanzada</span>
                <span>30 €/mes</span>
              </div>
              <div className="bono-simple-row">
                <span>Tienda online</span>
                <span>50 €/mes</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Servicios;
