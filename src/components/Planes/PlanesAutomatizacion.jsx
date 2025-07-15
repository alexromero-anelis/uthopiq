import './planes.css';
import automatizacionImg from '../../images/automatizaciones.png'; 
import { Link} from "react-router-dom";

function PlanesAutomatizacion() {
    return (
<section className="planes automatizacion" id="automatizaciones">
    <div className="planes-header">
        <span className="planes-subtitle">Automatizaciones con IA</span>
        <h2>Automatizaciones personalizadas</h2>
        <p className="planes-descripcion">
            Creamos automatizaciones personalizadas para conectar tus herramientas, eliminar tareas repetitivas y aumentar la productividad de tu negocio.
        </p>
    </div>

    <div className="planes-contenido">
        <div className="planes-texto">
            <div className="beneficios-grid beneficios-4">
                <div className="beneficio">
                    <h4>Eficiencia</h4>
                    <p>Ahorra tiempo automatizando tareas clave.</p>
                </div>
                <div className="beneficio">
                    <h4>Precisión</h4>
                    <p>Reduce errores humanos con flujos automatizados.</p>
                </div>
                <div className="beneficio">
                    <h4>Escalabilidad</h4>
                    <p>Optimiza procesos sin aumentar costes operativos.</p>
                </div>
                <div className="beneficio">
                    <h4>Adaptabilidad</h4>
                    <p>Conecta cualquier herramienta o API fácilmente.</p>
                </div>
            </div>
            <Link to="/personaliza-tu-plan" className="btn-cta animado">
                Solicita tu automatización
            </Link>
        </div>
        <div className="planes-imagen">
            <div className="imagen-contenedor">
                <img src={automatizacionImg} alt="Automatización con IA" />
            </div>
        </div>
    </div>
</section>

    );
}

export default PlanesAutomatizacion;