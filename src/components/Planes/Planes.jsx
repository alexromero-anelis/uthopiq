import './planes.css';
import CardPlan from './CardPlan/CardPlan';
import planesData from './planesData';
import { Link} from "react-router-dom";

function Planes() {
    return (
        <section className="planes" id="web">
            <div className="planes-header">
                <span className="planes-subtitle">Diseño web a tu medida</span>
                <h2>Nuestros Planes Web</h2>
                <p className="planes-descripcion">
                    Ofrecemos planes flexibles que se adaptan a tu proyecto. Ya sea una landing page o un sitio avanzado con automatizaciones, tenemos la solución ideal para ti.
                </p>
            </div>

            <div className="planes-grid">
                {planesData.map((plan, index) => (
                    <CardPlan key={index} {...plan} />
                ))}
            </div>

            <div className="planes-boton-container">
                <Link to="/personaliza-tu-plan">
                    <button className="cta-button-outline px-8 py-4 rounded-lg font-medium text-lg border-2">
                        Personaliza tu plan
                    </button>
                </Link>
            </div>
        </section>
    );
}

export default Planes;