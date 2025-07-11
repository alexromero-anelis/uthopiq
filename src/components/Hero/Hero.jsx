import FondoAnimado from "./FondoAnimado.jsx"
import "./hero.css"

function Hero() 
{
    return (
        <div className="hero-wrapper" id="inicio">
            <FondoAnimado />

            <div className="hero-container container mx-auto px-4 py-16 md:py-24 relative z-10">
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl mb-4">
                        <span className="hero-title-white">Desarrollo Web &</span>
                        <br />
                        <span className="hero-title-red">Soluciones IA</span>
                    </h1>

                    <p className="hero-subtitle text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
                    Creamos sitios web modernos y automatizamos procesos con inteligencia artificial. Potencia tu negocio con
                    soluciones tecnológicas que trabajan 24/7 para ti.
                    </p>

                    {/* Botones CTA */}
                    <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-20">
                        <button className="cta-button px-8 py-4 rounded-lg font-medium text-lg">
                            Contáctanos ahora
                        </button>
                        <button className="cta-button-outline px-8 py-4 rounded-lg font-medium text-lg border-2">
                            Personaliza tu plan
                        </button>
                    </div>
                </div>

                {/* Beneficios de la agencia */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-16 text-center px-4">
                    <div className="flex flex-col items-center">
                        <h3 className="benefit-title text-xl md:text-2xl mb-3">Desarrollo a medida</h3>
                        <p className="benefit-text text-base leading-relaxed">
                            Diseñamos soluciones adaptadas a tu negocio para maximizar resultados.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="benefit-title text-xl md:text-2xl mb-3">Inteligencia Artificial</h3>
                        <p className="benefit-text text-base leading-relaxed">
                            Automatizamos tareas para mejorar eficiencia y reducir costes operativos.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="benefit-title text-xl md:text-2xl mb-3">Acompañamiento real</h3>
                        <p className="benefit-text text-base leading-relaxed">
                            Te asesoramos en cada paso del proceso, desde la idea hasta el lanzamiento.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Hero;