import './planes.css';
import CardPlan from './CardPlan/CardPlan';
import planesData from './planesData';

function Planes() {
    return (
        <section className="planes" id="planes">
            <h2>Nuestros Planes Web</h2>
            <div className="planes-grid">
                {planesData.map((plan, index) => (
                    <CardPlan key={index} {...plan} />
                ))}
            </div>
            <div className="planes-boton-container">
                <a href="/personaliza-tu-plan" rel="noopener noreferrer">
                    <button className="cta-button-outline px-8 py-4 rounded-lg font-medium text-lg border-2">
                        Personaliza tu plan
                    </button>
                </a>
            </div>
        </section>
    );
}

export default Planes;
