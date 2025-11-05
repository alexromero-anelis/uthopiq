// components/Navbar/MobileNavbarLinks.jsx

function MobileNavbarLinks({
  open,
  cerrarMenu,
  scrollToSection,
}) {

  return (
    <div className={`navbar-links-container ${open ? "open" : ""}`}>
      <ul className="navbar-links">
        <li><button onClick={() => { scrollToSection("web"); cerrarMenu(); }}>Web</button>
        </li>
        <li><button onClick={() => scrollToSection("automatizaciones")}>Automatizaciones</button></li>
        <li><button onClick={() => scrollToSection("quienes-somos")}>Quiénes somos</button></li>
        <li><button onClick={() => scrollToSection("contacto")}>Contáctanos</button></li>
        <li><a href="https://blog.uthopiq.com/" target="_blank"><button>Blog</button></a></li>

<li className="navbar-cta-mobile">
  <button
    className="cta-button-outline px-8 py-4 rounded-lg text-lg border-2 text-center w-full"
    onClick={() => { scrollToSection("contacto"); cerrarMenu(); }}
  >
    Coméntanos tu idea
  </button>
</li>

      </ul>
    </div>
  );
}

export default MobileNavbarLinks;