import './cardPlan.css';
import { Gift } from 'lucide-react';

function CardPlan({ title, price, features, className = "" }) {
    return (
        <div className={`card-plan ${className}`}>
            <div className="card-plan-body">
                <h3>{title}</h3>
                <p className="card-plan-price">{price}</p>
                <ul className="card-plan-list">
                    {features.map((feature, index) => {
                        const isBonus = feature.includes("Incluye bono");
                        return (
                            <li key={index}>
                                {isBonus ? (
                                    <span className="alineado">
                                    <Gift size={16} strokeWidth={2} className="icono-bono" />
                                    {feature}
                                    </span>
                                ) : (
                                    <>✔ {feature}</>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default CardPlan;