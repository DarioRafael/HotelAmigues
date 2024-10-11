import React, { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';

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
        // Aseguramos que el menú se cierre antes de abrir el modal
        setTimeout(() => {
            onLoginClick();
        }, 300);
    };

    const handleRegisterClick = () => {
        handleClose();
        // Aseguramos que el menú se cierre antes de abrir el modal
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
                className={`absolute right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                ${isClosing ? 'translate-x-full' : 'translate-x-0'}`}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
                >
                    <X className="w-6 h-6 text-gray-600" />
                </button>

                <div className="flex flex-col p-6 pt-16 h-full">
                    <nav className="space-y-4">
                        <a href="#about" className="block text-gray-800 hover:text-gray-600 py-2">
                            Sobre Nosotros
                        </a>
                        <a href="#rooms" className="block text-gray-800 hover:text-gray-600 py-2">
                            Habitaciones
                        </a>
                        <a href="#services" className="block text-gray-800 hover:text-gray-600 py-2">
                            Servicios
                        </a>
                        <a href="#contact" className="block text-gray-800 hover:text-gray-600 py-2">
                            Contacto
                        </a>
                    </nav>

                    <div className="mt-auto space-y-4 pb-6">
                        <button
                            onClick={handleLoginClick}
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            onClick={handleRegisterClick}
                            className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
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