import './planes.css';
import CardPlan from './CardPlan/CardPlan';
import planesAutomatizacion from './planesAutomatizacionData';

function PlanesAutomatizacion() {
    return (
        <section className="planes" id="automatizaciones">
            <h2>Nuestras Automatizaciones</h2>
            <div className="planes-grid">
                {planesAutomatizacion.map((plan, index) => (
                    <CardPlan key={index} {...plan} />
                ))}
            </div>
        </section>
    );
}

export default PlanesAutomatizacion;
