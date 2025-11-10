import "./hero.css";

function Hero({ scrollToSection }) {
  return (
    <div className="hero-wrapper" id="inicio">

    <div className="hero-container container mx-auto px-4 min-h-[calc(100svh-72px)] flex flex-col justify-center md:justify-center sm:justify-start pt-4 md:pt-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-7xl mb-4">
            <span className="hero-title-white">Desarrollo Web &</span>
            <br />
            <span className="hero-title-red">Agencia IA</span>
          </h1>

          <p className="hero-subtitle text-base sm:text-lg md:text-lg max-w-1xl mx-auto mb-10 leading-relaxed">
            Creamos sitios web modernos y automatizamos procesos con
            inteligencia artificial. Potencia tu negocio con soluciones
            tecnológicas que trabajan 24/7 para ti.
          </p>

          {/* Botón CTA */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <button
              className="cta-button-outline px-6 py-3 rounded-md font-medium text-lg"
              onClick={() => scrollToSection("contacto")}
            >
              Contáctanos ahora
            </button>
          </div>
        </div>

        {/* Beneficios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12 text-center px-4">
          <div className="flex flex-col items-center">
            <h3 className="benefit-title text-lg sm:text-xl mb-2">
              Desarrollo a medida
            </h3>
            <p className="benefit-text text-sm sm:text-base leading-relaxed max-w-md">
              Diseñamos soluciones adaptadas a tu negocio para maximizar
              resultados.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="benefit-title text-lg sm:text-xl mb-2">
              Inteligencia Artificial
            </h3>
            <p className="benefit-text text-sm sm:text-base leading-relaxed max-w-md">
              Automatizamos tareas para mejorar eficiencia y reducir costes
              operativos.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="benefit-title text-lg sm:text-xl mb-2">
              Acompañamiento real
            </h3>
            <p className="benefit-text text-sm sm:text-base leading-relaxed max-w-md">
              Te asesoramos en cada paso del proceso, desde la idea hasta el
              lanzamiento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
