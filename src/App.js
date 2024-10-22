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
import Servicios from './components/Servicios';
import Contacto from './components/Contacto';
import Creadores from './components/Creadores';
import { MenuIcon, XIcon, HomeIcon, InformationCircleIcon, PhoneIcon, UserCircleIcon } from '@heroicons/react/outline';

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
          {/* Header */}
          <header className={`fixed w-full z-40 transition-all duration-300 ease-in-out ${
              isScrolled ? 'bg-black/70 backdrop-blur-md py-2' : 'bg-transparent py-4'
          }`}>
            <div className="container mx-auto px-6">
              <div className="flex justify-between items-center">
                <Link to="/" className="text-3xl font-sans font-bold text-white">
                  Hotel Amigues
                </Link>

                <div className="flex items-center space-x-4">
                  <nav className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="flex items-center hover:text-red-400 transition-colors">
                      Inicio
                    </Link>
                    <Link to="/habitaciones" className="flex items-center hover:text-red-400 transition-colors">
                      Habitaciones
                    </Link>
                    <Link to="/servicios" className="flex items-center hover:text-red-400 transition-colors">
                      Servicios
                    </Link>
                    <Link to="/contacto" className="flex items-center hover:text-red-400 transition-colors">
                      Contacto
                    </Link>
                    <Link to="/creadores" className="flex items-center hover:text-red-400 transition-colors">
                      Creadores
                    </Link>


                  </nav>

                  <div className="hidden md:flex space-x-4">
                    <button
                        onClick={iniciarFuncion}
                        className="btn-primary flex items-center text-sm bg-red-900 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <UserCircleIcon className="h-5 w-5 mr-2" />
                      Iniciar Sesión
                    </button>
                    <button
                        onClick={registroFuncion}
                        className="btn-secondary flex items-center text-sm bg-gray-700 px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      <UserCircleIcon className="h-5 w-5 mr-2" />
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
            </div>
          </header>

          {/* Mobile Menu */}
          <MobileMenu
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              onLoginClick={iniciarFuncion}
              onRegisterClick={registroFuncion}
              ref={menuRef}
          />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<PaginaPrincipal />} />
            <Route path="/habitaciones" element={<Habitaciones />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/creadores" element={<Creadores />} />
          </Routes>

          {/* Modales */}
          {mostrarSesion && (
              <Login onClose={cerrarModales} />
          )}

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
                <a href="/contacto" className="footer-link">Contacto</a>
              </div>
              <div className="flex justify-center space-x-4 social-icons-container">
                <a href="#" className="social-icon">
                  <img src={facebookIcon} alt="Facebook" />
                </a>
                <a href="#" className="social-icon">
                  <img src={twitterIcon} alt="Twitter" />
                </a>
                <a href="#" className="social-icon">
                  <img src={instagramIcon} alt="Instagram" />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
  );
}

export default App;
