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
        <h2>Proyectos realizados</h2>
        <p className="proyectos-subtitulo">
          Aquí algunos ejemplos de soluciones que hemos desarrollado en diseño
          web y automatización.
        </p>

        <div className="proyectos-web">
          <h3>Desarrollo Web</h3>
          <Slider projects={webProjects} />
        </div>

        <div className="proyectos-automatizacion">
          <h3>Automatizaciones</h3>
          <Slider projects={automationProjects} />
        </div>

        <div className="proyectos-boton-ver-todos">
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
