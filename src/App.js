import React, { useState, useEffect, useRef } from 'react';
import './styles/global.css';
import facebookIcon from './images/icon-facebook.webp';
import twitterIcon from './images/icon-twitter.webp';
import instagramIcon from './images/icon-instagram.webp';
import backWallpaper from './images/back-wallpaper-amigues.webp';
import Login from './components/Login';
import Register from './components/Register';
import MobileMenu from './components/MobileMenu';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

function App() {
  const [mostrarSesion, setMostrarSesion] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
          element.classList.add('active');
        }
      });
    };

    const handleClickOutside = (event) => {
      if (isMenuOpen &&
          menuRef.current &&
          !menuRef.current.contains(event.target) &&
          !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const iniciarFuncion = () => {
    setMostrarSesion(true);
    setMostrarRegistro(false);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const registroFuncion = () => {
    setMostrarSesion(false);
    setMostrarRegistro(true);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const cerrarModales = () => {
    setMostrarSesion(false);
    setMostrarRegistro(false);
  };

  return (
      <div className="min-h-screen bg-gray-900 text-white">
        <header className={`fixed w-full z-40 transition-all duration-300 ${
            isScrolled ? 'bg-black/70 backdrop-blur-md' : 'bg-transparent'
        }`}>
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-serif font-bold text-white">
                Hotel Amigues
              </h1>

              <div className="flex items-center">
                {/* Botones de autenticación para desktop */}
                <div className="hidden md:flex items-center space-x-4">
                  <button onClick={() => setMostrarSesion(true)} className="btn-primary text-sm">
                    Iniciar Sesión
                  </button>
                  <button onClick={() => setMostrarRegistro(true)} className="btn-secondary text-sm">
                    Nueva Cuenta
                  </button>
                </div>

                {/* Botón del menú móvil */}
                <div className="md:hidden">
                  <button
                      onClick={() => setIsMenuOpen(true)}
                      className="text-white focus:outline-none"
                      aria-label="Abrir menú"
                  >
                    <MenuIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Navegación desktop */}
            <nav className="hidden md:flex justify-center space-x-6 mt-4">
              <a href="#about" className="hover:text-red-400 transition-colors">Sobre Nosotros</a>
              <a href="#rooms" className="hover:text-red-400 transition-colors">Habitaciones</a>
              <a href="#services" className="hover:text-red-400 transition-colors">Servicios</a>
              <a href="#contact" className="hover:text-red-400 transition-colors">Contacto</a>
            </nav>
          </div>
        </header>

        {/* Menú móvil como componente separado */}
        <MobileMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onLoginClick={iniciarFuncion}
            onRegisterClick={registroFuncion}
        />

        {/* Hero Section con efecto parallax */}
        <section className="parallax h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center px-4">
            <div className="max-w-3xl reveal">
              <h1 className="text-5xl md:text-6xl font-serif mb-6">
                Bienvenido a Hotel Amigues
              </h1>
              <p className="text-xl mb-8">
                Donde cada estancia se convierte en un momento inolvidable
              </p>
            </div>
          </div>
        </section>

        {/* Sección de información */}
        <main className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto reveal">
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-10 text-white">
                Información sobre nuestro Hotel
              </h2>
              <div className="space-y-6 text-gray-300">
                <p className="reveal">
                  Hotel "Amigues" es un lugar donde la comodidad y la hospitalidad se encuentran.
                  Ofrecemos habitaciones modernas y acogedoras en ubicaciones privilegiadas en toda la ciudad.
                  Ya sea que estés viajando por negocios o por placer, nuestros hoteles proporcionan todo
                  lo que necesitas para una estadía memorable.
                </p>
                <p className="reveal">
                  Disfruta de nuestras comodidades de lujo, como piscinas, gimnasios, Wi-Fi gratuito
                  y restaurantes gourmet. Nuestro personal está comprometido a ofrecerte el mejor servicio,
                  asegurándose de que cada momento de tu estancia sea perfecto.
                </p>
                <p className="reveal">
                  No importa cuál sea tu destino, en Hotel "Amigues" te garantizamos una experiencia
                  inolvidable. ¡Te esperamos para hacer de tu estancia un momento especial!
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Modal de Iniciar Sesión */}
        {mostrarSesion && (
            <Login onClose={cerrarModales} />
        )}

        {/* Modal de Registro */}
        {mostrarRegistro && (
            <Register onClose={cerrarModales} />
        )}

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-200 py-10">
          <div className="container mx-auto px-4 text-center">
            <p className="mb-4">© 2024 Hotel "Amigues". Todos los derechos reservados.</p>
            <div className="flex justify-center space-x-6 mb-4">
              <a href="#" className="footer-link">Política de Privacidad</a>
              <a href="#" className="footer-link">Términos de Servicio</a>
              <a href="#" className="footer-link">Contacto</a>
            </div>
            <div className="flex justify-center space-x-4 social-icons-container">
              <a href="#" className="social-icon">
                <img src={facebookIcon} alt="Facebook" className="w-6 h-6"/>
              </a>
              <a href="#" className="social-icon">
                <img src={twitterIcon} alt="Twitter" className="w-6 h-6"/>
              </a>
              <a href="#" className="social-icon">
                <img src={instagramIcon} alt="Instagram" className="w-6 h-6"/>
              </a>
            </div>
          </div>
        </footer>
      </div>
  );
}

export default App;
