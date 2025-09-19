import "./quienesSomos.css";
import alejandro from "../../images/alejandro.jpg";
import tomas from "../../images/tomas.jpg";

function QuienesSomos() {
  return (
    <section className="quienes" id="quienes-somos">
      <h2 data-aos="fade-up">Quiénes Somos</h2>

      <p className="quienes-intro" data-aos="fade-up">
        En <strong>Uthopiq</strong> creemos en hacer el mundo digital más
        accesible, profesional y automatizado. Creamos páginas web adaptadas 
        a cada negocio, y conectamos procesos con automatizaciones y
        chatbots que ahorran tiempo y dinero. Somos un equipo joven, técnico y
        con muchas ganas de transformar ideas en soluciones prácticas.
      </p>

      <div className="socio" data-aos="fade-up">
        <img src={alejandro} alt="Imagen de Alejandro Romero" data-aos="fade-up" />
        <div className="socio-texto">
          <h3>
            <a
              href="https://www.linkedin.com/in/alejandro-romero-collados-73667923b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alejandro Romero
            </a>
          </h3>
          <p>
            Con una fuerte pasión por el desarrollo web y la automatización de procesos.
            Cuenta con experiencia en ambas áreas, habiendo desarrollado
            múltiples proyectos que integran herramientas como n8n y chatbots
            personalizados para mejorar la eficiencia y la experiencia del
            usuario.
          </p>
        </div>
      </div>

      <div className="socio tomas" data-aos="fade-up">
        <div className="socio-texto">
          <h3>
            <a
              href="https://www.linkedin.com/in/tom%C3%A1s-primo-rico-801498231/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tomás Primo
            </a>
          </h3>
          <p>
            Con experiencia previa como desarrollador backend. Actualmente enfocado
            en el desarrollo web y las automatizaciones, áreas que le apasionan
            profundamente. Combina su base técnica con una gran curiosidad por
            resolver problemas reales, creando soluciones que optimizan procesos
            y mejoran la experiencia digital de los negocios.
          </p>
        </div>
        <img src={tomas} alt="Imagen de Tomás Primo" data-aos="fade-up" />
      </div>
    </section>
  );
}

export default QuienesSomos;
