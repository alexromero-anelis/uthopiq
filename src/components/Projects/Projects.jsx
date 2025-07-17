import "./projects.css";
import Slider from "./Slider/Slider";
import allProjects from "./projectsData";

import { Link } from "react-router-dom"; // Asegúrate de importar esto

function Projects() {
  const webProjects = allProjects.filter((p) =>
    p.tags.includes("desarrollo web")
  );
  const automationProjects = allProjects.filter((p) =>
    p.tags.includes("automatizacion")
  );

  return (
    <>
      <div className="proyectos" id="proyectos">
        <h2 data-aos="fade-up">Proyectos realizados</h2>
        <p className="proyectos-subtitulo" data-aos="fade-up">
          Aquí algunos ejemplos de soluciones que hemos desarrollado en diseño
          web y automatización.
        </p>

        <div className="proyectos-web" data-aos="fade-up">
          <h3>Desarrollo Web</h3>
          {webProjects.length > 0 ? (
            <Slider projects={webProjects} />
          ) : (
            <p className="proyectos-aviso">
              Pronto añadiremos proyectos de desarrollo web.
            </p>
          )}
        </div>

        <div className="proyectos-automatizacion" data-aos="fade-up">
          <h3>Automatizaciones</h3>
          {automationProjects.length > 0 ? (
            <Slider projects={automationProjects} />
          ) : (
            <p className="proyectos-aviso">
              Estamos preparando automatizaciones que pronto verás aquí.
            </p>
          )}
        </div>

        <div className="proyectos-boton-ver-todos" data-aos="fade-up">
          <Link
            to="/pagina-proyectos"
            className="cta-button-outline ver-todos-btn"
          >
            Ver todos
          </Link>
        </div>
      </div>
    </>
  );
}

export default Projects;
