import CoverflowCarousel from "./CoverflowCarousel";
import "./agents.css";
import { useNavigate } from "react-router-dom";

const agents = [
  { id: 1, name: "Ena",  role: "Gestor de Reservas", image: "/images/agentes/gestor-reservas.png",
    description: "Gestiona y confirma citas automáticamente, enviando recordatorios personalizados para reducir ausencias y optimizar tu agenda diaria.",
    accent: "#1e15c7ff", backA: "rgba(40, 32, 70, 0.55)", backB: "rgba(20, 16, 35, 0.6)", backC: "rgba(15, 12, 25, 0.7)" },
  { id: 2, name: "Milo", role: "Gestor de Recordatorios", image: "/images/agentes/gestor-recordatorios.png",
    description: "Envía recordatorios por mensaje o correo para garantizar que tus clientes nunca olviden sus citas, mejorando la asistencia y la comunicación.",
    accent: "#ff86cdff", backA: "rgba(66, 22, 22, 0.55)", backB: "rgba(30, 12, 12, 0.6)", backC: "rgba(22, 8, 8, 0.7)" },
  { id: 4, name: "Nero", role: "Asistente de Voz", image: "/images/agentes/asistente-voz.png",
    description: "Atiende llamadas, responde preguntas frecuentes y guía a tus clientes con voz natural, disponible las 24 horas.",
    accent: "#492a9cff", backA: "rgba(19, 35, 32, 0.55)", backB: "rgba(10, 16, 16, 0.6)", backC: "rgba(9, 14, 14, 0.7)" },
  { id: 5, name: "Lynk", role: "Chatbot Conversacional", image: "/images/agentes/chatbot.png",
    description: "Gestiona conversaciones en múltiples plataformas como WhatsApp, Telegram o chat web, ofreciendo soporte instantáneo y respuestas inteligentes 24/7.",
    accent: "#047a00ff", backA: "rgba(10, 40, 50, 0.55)", backB: "rgba(8, 22, 28, 0.6)", backC: "rgba(6, 18, 24, 0.7)" },
  { id: 6, name: "Aron", role: "Gestor de Facturas", image: "/images/agentes/gestor-facturas.png",
    description: "Genera, organiza y envía facturas automáticamente, con seguimiento de pagos y reportes claros para tu negocio.",
    accent: "#cc0404ff", backA: "rgba(56, 20, 30, 0.55)", backB: "rgba(28, 12, 16, 0.6)", backC: "rgba(20, 9, 12, 0.7)" },
  { id: 7, name: "Vex",  role: "Gestor de Redes Sociales", image: "/images/agentes/gestor-rrss.png",
    description: "Publica y programa contenido, responde mensajes y mide el rendimiento de tus campañas con precisión y eficiencia.",
    accent: "#cdd8ebff", backA: "rgba(18, 34, 66, 0.55)", backB: "rgba(12, 18, 30, 0.6)", backC: "rgba(8, 12, 22, 0.7)" },
  { id: 3, name: "Axel", role: "Consultor de Negocio", image: "/images/agentes/consultor-negocio.png",
    description: "Analiza tus procesos y propone automatizaciones a medida para aumentar la productividad y reducir tareas repetitivas.",
    accent: "#d38a0bff", backA: "rgba(66, 47, 19, 0.55)", backB: "rgba(30, 24, 12, 0.6)", backC: "rgba(22, 18, 8, 0.7)" },
];

export default function CoverflowSection() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const goToSection = () => {
      const interval = setInterval(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          clearInterval(interval);
        }
      }, 100);
    };
    if (location.pathname !== "/") { navigate("/"); setTimeout(goToSection, 200); }
    else { goToSection(); }
  };

  return (
    <section className="agents" id="team">
      <div className="agents-header" data-aos="fade-up">
        <h2>Conoce a nuestros agentes</h2>
        <p className="agents-descripcion">
          Cada agente tiene una misión: hacer tu trabajo más fácil y eficiente.
        </p>
      </div>

      <div data-aos="fade-up">
        <CoverflowCarousel items={agents} initialIndex={3} />
      </div>

      <div className="agents-boton-container" data-aos="fade-up">
        <button
          onClick={() => scrollToSection("contacto")}
          className="cta-button-outline px-8 py-4 rounded-lg font-medium text-lg border-2"
        >
          Habla con un agente
        </button>
      </div>
    </section>
  );
}
