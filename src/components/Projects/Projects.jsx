import './projects.css'
import Slider from './Slider/Slider';
import allProjects from './projectsData';

function Projects(){
    //Obtengo los proyectos web y automatizaciones del archhivo json
    const webProjects = allProjects.filter(p => p.tags.includes('desarrollo web'));
    const automationProjects = allProjects.filter(p => p.tags.includes('automatizacion'));
    
    return(
        <>
            <div className="proyectos" id='Proyectos'>
                <h2>Proyectos realizados</h2>

                <div className='proyectos-web'>
                    <h3>Desarrollo Web</h3>
                    <Slider projects={webProjects}/>
                </div>

                <div className='proyectos-automatizacion'>
                    <h3>Automatizaciones</h3>
                    <Slider projects={automationProjects}/>
                </div>  
            </div>
        </>
    )
}

export default Projects;