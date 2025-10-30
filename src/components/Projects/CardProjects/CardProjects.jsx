import './cardProjects.css';

function isAutomationByTags(tags = []) {
  return tags.some(t => t === 'automatizacion' || t === 'chatbot');
}

function CardProjects({ title, image, tags = [], link, demo }) {
  const showVisit = !!link && !isAutomationByTags(tags);

  return (
    <div className="card-project" tabIndex={0}>
      <div className="card-project-media">
        <img src={image} alt={title} loading="lazy" />
        {demo && <div className="demo-label">DEMO</div>}
      </div>

      {/* NUEVO wrapper para aplicar el panel interior tipo glass */}
      <div className="card-project-body">
        <h4 className="card-project-title">{title}</h4>

        <div className="card-project-footer">
          <div className="tags">
            {tags.map((tag, i) => (
              <span key={i} className="tag">#{tag}</span>
            ))}
          </div>

          {showVisit && (
            <a
              className="visit-btn"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visitar web de ${title}`}
            >
              Visitar web
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardProjects;
