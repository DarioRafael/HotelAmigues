import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { HomeIcon, KeyIcon, CogIcon, MailIcon, UserIcon } from "@heroicons/react/outline";

const MobileMenu = ({ isOpen, onClose, onLoginClick, onRegisterClick }) => {
    const menuRef = useRef(null);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 300);
    };

    const handleLoginClick = () => {
        handleClose();
        setTimeout(() => {
            onLoginClick();
        }, 300);
    };

    const handleRegisterClick = () => {
        handleClose();
        setTimeout(() => {
            onRegisterClick();
        }, 300);
    };

    if (!isOpen && !isClosing) return null;

    return (
        <div className={`fixed inset-0 z-50 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div
                ref={menuRef}
                className={`absolute right-0 top-0 h-full w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
                ${isClosing ? 'translate-x-full' : 'translate-x-0'}`}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-700 text-gray-300 hover:text-white"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="flex flex-col p-6 pt-16 h-full">
                    <nav className="space-y-4">
                        <Link to="/" className="block text-gray-300 hover:text-white py-2" onClick={handleClose}>
                            <div className="flex items-center space-x-2">
                                <HomeIcon className="h-6 w-6 text-red-600"/> {/* Ícono de inicio */}
                                <span className="text-white">Inicio</span> {/* Texto al lado del ícono */}
                            </div>
                        </Link>
                        <Link to="/habitaciones" className="block text-gray-300 hover:text-white py-2"
                              onClick={handleClose}>
                            <div className="flex items-center space-x-2">
                                <KeyIcon className="h-6 w-6 text-red-600" /> {/* Ícono de inicio */}
                                <span className="text-white">Habitación</span> {/* Texto al lado del ícono */}
                            </div>
                        </Link>
                        <Link to="/servicios" className="block text-gray-300 hover:text-white py-2"
                              onClick={handleClose}>
                            <div className="flex items-center space-x-2">
                                <CogIcon className="h-6 w-6 text-red-600"/> {/* Ícono de inicio */}
                                <span className="text-white">Servicios</span> {/* Texto al lado del ícono */}
                            </div>
                        </Link>
                        <a href="/contacto" className="block text-gray-300 hover:text-white py-2">
                            <div className="flex items-center space-x-2">
                                <MailIcon className="h-6 w-6 text-red-600"/> {/* Ícono de inicio */}
                                <span className="text-white">Contacto</span> {/* Texto al lado del ícono */}
                            </div>
                        </a>
                        <Link to="/creadores" className="block text-gray-300 hover:text-white py-2"
                              onClick={handleClose}>
                            <div className="flex items-center space-x-2">
                                <UserIcon className="h-6 w-6 text-red-600"/> {/* Ícono de inicio */}
                                <span className="text-white">Creadores</span> {/* Texto al lado del ícono */}
                            </div>
                        </Link>
                    </nav>

                    <div className="mt-auto space-y-4 pb-6">
                        <button
                            onClick={handleLoginClick}
                            className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            onClick={handleRegisterClick}
                            className="w-full py-2 px-4 border border-red-600 text-red-400 rounded-lg hover:bg-red-900 hover:text-red-300 transition-colors"
                        >
                            Nueva Cuenta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;