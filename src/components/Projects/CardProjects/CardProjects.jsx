import './cardProjects.css';

// Al card de los proyectos se le pasará una imagen, titulo, descripción y etiquetas
function CardProjects({ title, description, image, tags = [] }) {
    return (
        <div className="card-project">
            <img src={image} alt={title} />
            <h4>{title}</h4>
            <p>{description}</p>
            <div className="tags">
                {tags.map((tag, index) => (
                    <span key={index} className="tag">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default CardProjects;
