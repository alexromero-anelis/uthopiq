import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import "aos/dist/aos.css";

import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Hero from './components/Hero/Hero.jsx';
import Projects from './components/Projects/Projects.jsx';
import PlanesWeb from './components/Planes/Planes.jsx';
import Automatizaciones from './components/Planes/PlanesAutomatizacion.jsx';
import Contacto from './components/Contacto/Contacto.jsx';
import QuienesSomos from './components/QuienesSomos/QuienesSomos.jsx';
import PersonalizaPlan from './pages/PersonalizaPlan.jsx';
import PaginaProyectos from './pages/ProyectosPage.jsx';
// import ChatWidgetLoader from './components/ChatBot/ChatWidgetLoader.jsx'
import ComoLoHacemos from "./components/ComoLoHacemos/ComoLoHacemos.jsx";
import AOS from "aos";
import { useEffect } from "react";
import CasosUso from "./components/Banners/CasosUso";
import BeneficiosWeb from "./components/Banners/BeneficiosWeb.jsx";

function App() {
  // Scroll suave reutilizable
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero scrollToSection={scrollToSection} />
              <Projects />
              <PlanesWeb />
              <BeneficiosWeb />
              <Automatizaciones />
              <CasosUso />
              <ComoLoHacemos />
              <QuienesSomos />
              <Contacto />
              <Footer />
              {/* <ChatWidgetLoader /> */}
            </>
          }
        />
        <Route path="/personaliza-tu-plan" element={<PersonalizaPlan />} />
        <Route path="/proyectos" element={<PaginaProyectos />} />
      </Routes>
    </Router>
  );
}

export default App;