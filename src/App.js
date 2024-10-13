import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './styles/global.css';
import facebookIcon from './images/icon-facebook.webp';
import twitterIcon from './images/icon-twitter.webp';
import instagramIcon from './images/icon-instagram.webp';
import Login from './components/Login';
import Register from './components/Register';
import MobileMenu from './components/MobileMenu';
import PaginaPrincipal from './components/PaginaPrincipal';
import Habitaciones from './components/Habitaciones';
import { MenuIcon, XIcon, HomeIcon } from '@heroicons/react/outline';

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
      <Router>
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
                  <Link to="/" className="mr-4">
                    <HomeIcon className="h-6 w-6 text-white hover:text-red-400 transition-colors" />
                  </Link>

                  <div className="hidden md:flex items-center space-x-4">
                    <button onClick={() => setMostrarSesion(true)} className="btn-primary text-sm">
                      Iniciar Sesión
                    </button>
                    <button onClick={() => setMostrarRegistro(true)} className="btn-secondary text-sm">
                      Nueva Cuenta
                    </button>
                  </div>

                  <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="text-white focus:outline-none"
                        aria-label="Abrir menú"
                        ref={buttonRef}
                    >
                      <MenuIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>

              <nav className="hidden md:flex justify-center space-x-6 mt-4">
                <Link to="/" className="hover:text-red-400 transition-colors">Inicio</Link>
                <Link to="/habitaciones" className="hover:text-red-400 transition-colors">Habitaciones</Link>
                <a href="#services" className="hover:text-red-400 transition-colors">Servicios</a>
                <a href="#contact" className="hover:text-red-400 transition-colors">Contacto</a>
              </nav>
            </div>
          </header>

          <MobileMenu
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              onLoginClick={iniciarFuncion}
              onRegisterClick={registroFuncion}
              ref={menuRef}
          />

          <Routes>
            <Route path="/" element={<PaginaPrincipal />} />
            <Route path="/habitaciones" element={<Habitaciones />} />
          </Routes>

          {mostrarSesion && (
              <Login onClose={cerrarModales} />
          )}

          {mostrarRegistro && (
              <Register onClose={cerrarModales} />
          )}

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
      </Router>
  );
}

export default App;