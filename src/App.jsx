import './index.css';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Hero from './components/Hero/Hero.jsx';
import Projects from './components/Projects/Projects.jsx';
import Planes from './components/Planes/Planes.jsx'
import PlanesAutomatizacion from './components/Planes/PlanesAutomatizacion.jsx';
import Servicios from './components/Planes/Servicios.jsx';
import Contacto from './components/Contacto/Contacto.jsx'
import QuienesSomos from './components/QuienesSomos/QuienesSomos.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Planes />
      <PlanesAutomatizacion/>
      <Servicios/>
      <QuienesSomos />
      <Contacto/>
      <Footer />
    </>
  );
}

export default App;