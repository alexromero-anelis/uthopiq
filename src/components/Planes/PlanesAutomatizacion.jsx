import './planes.css';
import automatizacionImg from '../../images/automatizaciones.png'; 

function PlanesAutomatizacion() {
    return (
        <section className="planes" id="automatizaciones">
            <h2>Nuestras Automatizaciones</h2>
            <div className="planes-contenido">
                <div className="planes-texto">
                    <p>
                        Desarrollamos automatizaciones totalmente personalizadas para tu negocio, conectando tus herramientas favoritas con inteligencia artificial para ahorrar tiempo, reducir errores y mejorar la productividad.
                        <br /><br />
                        Tanto si tienes una idea como si no sabes por dónde empezar, estamos aquí para ayudarte.
                    </p>
                    <a href="#Contacto" className="btn-cta">
                        Solicita tu automatización
                    </a>
                </div>
                <div className="planes-imagen">
                    <img src={automatizacionImg} alt="Automatización con IA" />
                </div>
            </div>
        </section>
    );
}

export default PlanesAutomatizacion;