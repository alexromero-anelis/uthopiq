import './quienesSomos.css';
import uthopon from '../../images/uthopon.png'

function QuienesSomos() {
  return (
    <section className="quienes" id="quienes-somos">
      <h2>Quiénes Somos</h2>

      <p className="quienes-intro">
        En <strong>Uthopiq</strong> creemos en hacer el mundo digital más accesible, profesional y automatizado.
        Creamos páginas web con WordPress adaptadas a cada negocio, y conectamos procesos con automatizaciones y chatbots que ahorran tiempo y dinero.
        Somos un equipo joven, técnico y con muchas ganas de transformar ideas en soluciones prácticas.
      </p>

      <div className="socio">
        <img src={uthopon} alt="Imagen de Alejandro Romero" />
        <div className="socio-texto">
          <h3>Alejandro Romero</h3>
          <p>
            Graduado en Desarrollo de Aplicaciones Multiplataforma, con una fuerte pasión por el desarrollo web y la automatización de procesos. Cuenta con experiencia en ambas áreas, habiendo desarrollado múltiples proyectos que integran herramientas como n8n y chatbots personalizados para mejorar la eficiencia y la experiencia del usuario.
          </p>
        </div>
      </div>

      <div className="socio">
        <div className="socio-texto">
            <h3>Tomás Primo</h3>
            <p>
                Graduado en Desarrollo de Aplicaciones Multiplataforma, con experiencia previa como desarrollador backend. Actualmente enfocado en el desarrollo web y las automatizaciones, áreas que le apasionan profundamente. Combina su base técnica con una gran curiosidad por resolver problemas reales, creando soluciones que optimizan procesos y mejoran la experiencia digital de los negocios.
            </p>
        </div>
        <img src={uthopon} alt="Imagen de Tomás Primo" />
      </div>
    </section>
  );
}

export default QuienesSomos;
