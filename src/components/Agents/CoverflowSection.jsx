import CoverflowCarousel from "./CoverflowCarousel";
import "./agents.css";
import { useNavigate } from "react-router-dom";
const agents = [
  { id: 3, name: "Axel", role: "Estrategia y Crecimiento", image: "/images/agentes/consultor-negocio.png",
    description: "Analiza tus procesos y propone mejoras o automatizaciones para aumentar productividad, eficiencia y competitividad en el mercado.",
    accent: "#d38a0bff", backA: "rgba(66, 47, 19, 0.55)", backB: "rgba(30, 24, 12, 0.6)", backC: "rgba(22, 18, 8, 0.7)" },

  { id: 1, name: "Ena", role: "Marketing y Captación de leads", image: "/images/agentes/gestor-reservas.png",
    description: "Atrae y califica prospectos desde tu web, anuncios y redes. Gestiona campañas automatizadas, nutre leads y coordina llamadas o demos con tu equipo. Maximiza conversiones con seguimiento inteligente.",
    accent: "#1e15c7ff", backA: "rgba(40, 32, 70, 0.55)", backB: "rgba(20, 16, 35, 0.6)", backC: "rgba(15, 12, 25, 0.7)" },

  { id: 2, name: "Milo", role: "Análisis de datos y Reportes", image: "/images/agentes/gestor-recordatorios.png",
    description: "Centraliza datos de ventas, marketing y operaciones. Crea dashboards y reportes predictivos para detectar oportunidades y optimizar decisiones estratégicas en tiempo real.",
    accent: "#ff86cdff", backA: "rgba(66, 22, 22, 0.55)", backB: "rgba(30, 12, 12, 0.6)", backC: "rgba(22, 8, 8, 0.7)" },

  { id: 5, name: "Lynk", role: "Chatbot conversacional y Soporte", image: "/images/agentes/chatbot.png",
    description: "Ofrece soporte instantáneo en WhatsApp, Telegram o chat web. Atiende clientes, gestiona ventas y da seguimiento postventa con IA conversacional 24/7.",
    accent: "#047a00ff", backA: "rgba(10, 40, 50, 0.55)", backB: "rgba(8, 22, 28, 0.6)", backC: "rgba(6, 18, 24, 0.7)" },

  { id: 7, name: "Vex", role: "Comunicación y Redes sociales", image: "/images/agentes/gestor-rrss.png",
    description: "Administra redes, campañas y reputación digital. Programa contenido, responde mensajes y mantiene la coherencia visual de tu marca en todos los canales.",
    accent: "#cdd8ebff", backA: "rgba(18, 34, 66, 0.55)", backB: "rgba(12, 18, 30, 0.6)", backC: "rgba(8, 12, 22, 0.7)" },

  { id: 4, name: "Nero", role: "Asistente de voz", image: "/images/agentes/asistente-voz.png",
    description: "Atiende llamadas y responde con voz natural. Agenda citas, resuelve dudas y ejecuta tareas conectadas a tus sistemas las 24 horas.",
    accent: "#492a9cff", backA: "rgba(19, 35, 32, 0.55)", backB: "rgba(10, 16, 16, 0.6)", backC: "rgba(9, 14, 14, 0.7)" },

  { id: 6, name: "Aron", role: "Finanzas y Administración", image: "/images/agentes/gestor-facturas.png",
    description: "Automatiza facturación, presupuestos y cobros. Supervisa pagos y flujo de caja, generando reportes financieros claros y actualizados.",
    accent: "#cc0404ff", backA: "rgba(56, 20, 30, 0.55)", backB: "rgba(28, 12, 16, 0.6)", backC: "rgba(20, 9, 12, 0.7)" },
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
        <h2>Nuestros Agentes</h2>
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
