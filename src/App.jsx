import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Hero from './components/Hero/Hero.jsx';
import Projects from './components/Projects/Projects.jsx';
import PlanesWeb from './components/Planes/Planes.jsx';
import ServiciosWeb from './components/Planes/Servicios.jsx';
import Automatizaciones from './components/Planes/PlanesAutomatizacion.jsx';
import Contacto from './components/Contacto/Contacto.jsx';
import QuienesSomos from './components/QuienesSomos/QuienesSomos.jsx';
import PersonalizaPlan from './pages/PersonalizaPlan.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Projects />
              <PlanesWeb />
              <ServiciosWeb />
              <Automatizaciones />
              <QuienesSomos />
              <Contacto />
              <Footer />
            </>
          }
        />
        <Route path="/personaliza-tu-plan" element={<PersonalizaPlan />} />
      </Routes>
    </Router>
  );
}

export default App;
