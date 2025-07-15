import { useState, useEffect } from 'react';
import CardProjects from '../components/Projects/CardProjects/CardProjects';
import projectsData from '../components/Projects/projectsData';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './proyectosPage.css';

function ProyectosPage() {
    const [filtro, setFiltro] = useState('todos');

    const filtrarProyectos = () => {
        if (filtro === 'todos') return projectsData;
        return projectsData.filter(p => p.tags.includes(filtro));
    };

    useEffect(() => {
    window.scrollTo(0, 0);
    }, []);
    

    const proyectosFiltrados = filtrarProyectos();

    return (
        <>
            <Navbar />

            <div className="proyectos-page">
                <h2>Proyectos</h2>

                <div className="filtro">
                    <label htmlFor="tipo">Tipo:</label>
                    <select
                        id="tipo"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    >
                        <option value="todos">Todos</option>
                        <option value="desarrollo web">Desarrollo Web</option>
                        <option value="automatizacion">Automatización</option>
                    </select>
                </div>

                <div className="grid-proyectos">
                    {proyectosFiltrados.map((p, index) => (
                        <CardProjects
                            key={index}
                            title={p.title}
                            description={p.description}
                            image={p.image}
                            tags={p.tags}
                        />
                    ))}
                </div>
            </div>

            
            <Footer />
        </>
    );
}

export default ProyectosPage;
