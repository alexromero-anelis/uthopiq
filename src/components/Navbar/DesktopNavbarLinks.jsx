// components/Navbar/DesktopNavbarLinks.jsx

function DesktopNavbarLinks({ scrollToSection }) {
  return (
    <ul className="navbar-links-desktop">

      <li className="dropdown">
        <button className="dropdown-toggle" onClick={() => scrollToSection("web")}>
          Web
        </button>
      </li>

      <li><button onClick={() => scrollToSection("automatizaciones")}>Automatizaciones</button></li>
      <li><button onClick={() => scrollToSection("quienes-somos")}>Quiénes somos</button></li>
      <li><a href="https://blog.uthopiq.com/" target="_blank"><button>Blog</button></a></li>
    </ul>
  );
}

export default DesktopNavbarLinks;