import './cardPlan.css';

function CardPlan({ title, image, price, features }) {
    return (
        <div className="card-plan">
            <img src={image} alt={title} className="card-plan-image" />
            <div className="card-plan-body">
                <h3>{title}</h3>
                <p className="card-plan-price">{price}</p>
                <ul className="card-plan-list">
                    {features.map((feature, index) => (
                        <li key={index}>✔ {feature}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CardPlan;
