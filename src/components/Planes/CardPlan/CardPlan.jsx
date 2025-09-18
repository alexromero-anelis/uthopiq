import './cardPlan.css';

function CardPlan({ title, description, features, className = "" }) {
  return (
    <div className={`card-plan ${className}`}>
      <div className="card-plan-body">
        <h3>{title}</h3>
        <p className="card-plan-description">{description}</p>
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
