import './index.css';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Hero from './components/Hero/Hero.jsx';
import Projects from './components/Projects/Projects.jsx';
import PlanesWeb from './components/Planes/Planes.jsx'
import ServiciosWeb from './components/Planes/Servicios.jsx';
import Automatizaciones from './components/Planes/PlanesAutomatizacion.jsx';
import Contacto from './components/Contacto/Contacto.jsx'
import QuienesSomos from './components/QuienesSomos/QuienesSomos.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <PlanesWeb />
      <ServiciosWeb/>
      <Automatizaciones/>
      <QuienesSomos />
      <Contacto/>
      <Footer />
    </>
  );
}

export default App;