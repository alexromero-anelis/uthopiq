import './index.css';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Hero from './components/Hero/Hero.jsx';
import Projects from './components/Projects/Projects.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Footer />
    </>
  );
}

export default App;