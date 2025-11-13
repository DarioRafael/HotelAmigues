import React, { useState } from 'react';
import { BedDouble, Wifi, Coffee, TrendingUp, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Reservar from './Reservar';

const importAll = (r) => r.keys().map(r);
const imagenesSencilla = importAll(require.context('../assets/imgsencilla', false, /\.(jpg|jpeg|png|webp)$/));
const imagenesDoble = importAll(require.context('../assets/imgdoble', false, /\.(jpg|jpeg|png)$/));
const imagenesFamiliar = importAll(require.context('../assets/imgfamiliar', false, /\.(jpg|jpeg|png)$/));
const imagenesDeluxe = importAll(require.context('../assets/imgdeluxe', false, /\.(jpg|jpeg|png)$/));

// Componente separado para el carrusel de imágenes
const ImageCarousel = ({ imagenes, currentIndex, onIndexChange }) => {
    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < imagenes.length - 1;

    return (
        <div className="relative">
            {/* Imagen principal */}
            <div className="relative w-full h-64 md:h-80 mb-4 bg-gray-900 rounded overflow-hidden">
                <img
                    src={imagenes[currentIndex]}
                    alt={`Imagen ${currentIndex + 1}`}
                    className="w-full h-full object-cover"
                />

                {/* Controles de navegación */}
                {canGoPrev && (
                    <button
                        onClick={() => onIndexChange(currentIndex - 1)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                    >
                        <ChevronLeft size={24} />
                    </button>
                )}
                {canGoNext && (
                    <button
                        onClick={() => onIndexChange(currentIndex + 1)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                    >
                        <ChevronRight size={24} />
                    </button>
                )}

                {/* Indicador de posición */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentIndex + 1} / {imagenes.length}
                </div>
            </div>

            {/* Miniaturas */}
            <div className="grid grid-cols-4 gap-2">
                {imagenes.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => onIndexChange(index)}
                        className={`h-20 rounded overflow-hidden border-2 transition ${
                            index === currentIndex
                                ? 'border-red-500 ring-2 ring-red-500/50'
                                : 'border-transparent hover:border-gray-500'
                        }`}
                    >
                        <img
                            src={img}
                            alt={`Miniatura ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

// Iconos para características (más limpio)
const getCaracteristicaIcon = (index) => {
    const icons = [Wifi, Coffee, TrendingUp];
    const Icon = icons[index] || TrendingUp;
    return <Icon className="mr-2" size={18} />;
};

const Habitaciones = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showReservarModal, setShowReservarModal] = useState(false);
    const [habitacionSeleccionada, setHabitacionSeleccionada] = useState('');
    const [habitacionPrecio, setHabitacionPrecio] = useState('');

    const habitaciones = [
        {
            tipo: 'Habitación Sencilla',
            precio: 50,
            camas: 1,
            descripcion: 'Una habitación cómoda para una persona, ideal para viajes de negocios.',
            detallesAdicionales: 'Consta de una habitación con una cama, baño completo y todas las comodidades básicas.',
            caracteristicas: ['Wi-Fi gratis', 'Desayuno incluido', 'Servicio a la habitación 24/7'],
            imagenes: imagenesSencilla
        },
        {
            tipo: 'Habitación Doble',
            precio: 80,
            camas: 2,
            descripcion: 'Perfecta para parejas, con dos camas y vistas impresionantes.',
            detallesAdicionales: 'Amplio espacio con todas las comodidades necesarias y vistas panorámicas.',
            caracteristicas: ['Wi-Fi gratis', 'Vista panorámica', 'Minibar incluido'],
            imagenes: imagenesDoble
        },
        {
            tipo: 'Suite Familiar',
            precio: 120,
            camas: 3,
            descripcion: 'Amplia suite con espacio para toda la familia, equipada con todas las comodidades.',
            detallesAdicionales: 'Perfecta para familias grandes con múltiples áreas de descanso.',
            caracteristicas: ['Cocina equipada', 'Área de juegos', 'Smart TV'],
            imagenes: imagenesFamiliar
        },
        {
            tipo: 'Habitación Deluxe',
            precio: 150,
            camas: 2,
            descripcion: 'Habitación de lujo con jacuzzi y balcón privado.',
            detallesAdicionales: 'La mejor experiencia de hospedaje con servicios premium.',
            caracteristicas: ['Jacuzzi privado', 'Terraza exclusiva', 'Servicio de mayordomo'],
            imagenes: imagenesDeluxe
        }
    ];

    const handleRoomClick = (room) => {
        setSelectedRoom(room);
        setCurrentImageIndex(0); // Resetear al abrir modal
    };

    const closeRoomModal = () => {
        setSelectedRoom(null);
        setCurrentImageIndex(0);
    };

    const handleReservar = (habitacion) => {
        setHabitacionSeleccionada(habitacion.tipo);
        setHabitacionPrecio(habitacion.precio);
        setShowReservarModal(true);
    };

    return (
        <div className="container mx-auto py-40 px-4">
            <h1 className="text-4xl font-sans font-bold text-center mb-10 text-white">
                Nuestras Habitaciones
            </h1>

            {/* Grid de habitaciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {habitaciones.map((habitacion, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105"
                    >
                        <div className="relative mb-4 rounded-lg overflow-hidden">
                            <img
                                src={habitacion.imagenes[0]}
                                alt={habitacion.tipo}
                                className="w-full h-48 object-cover"
                            />
                            {habitacion.imagenes.length > 1 && (
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                                    +{habitacion.imagenes.length - 1} fotos
                                </div>
                            )}
                        </div>

                        <h2 className="text-2xl font-bold mb-4">{habitacion.tipo}</h2>

                        <div className="flex items-center mb-4 text-gray-300">
                            <BedDouble className="mr-2" size={20} />
                            <span>{habitacion.camas} {habitacion.camas === 1 ? 'cama' : 'camas'}</span>
                        </div>

                        <p className="text-2xl font-bold mb-4 text-yellow-400">
                            ${habitacion.precio} <span className="text-base font-normal text-gray-400">/ noche</span>
                        </p>

                        <p className="mb-4 text-gray-300">{habitacion.descripcion}</p>

                        <ul className="mb-6 space-y-2">
                            {habitacion.caracteristicas.map((caracteristica, i) => (
                                <li key={i} className="flex items-center text-sm text-gray-300">
                                    {getCaracteristicaIcon(i)}
                                    {caracteristica}
                                </li>
                            ))}
                        </ul>

                        <div className="flex gap-3">
                            <button
                                onClick={() => handleRoomClick(habitacion)}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors"
                            >
                                Ver detalles
                            </button>
                            <button
                                onClick={() => handleReservar(habitacion)}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                            >
                                Reservar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Reservar */}
            {showReservarModal && (
                <Reservar
                    onClose={() => setShowReservarModal(false)}
                    habitacionSeleccionada={habitacionSeleccionada}
                    habitacionPrecio={habitacionPrecio}
                />
            )}

            {/* Modal de detalles de habitación */}
            {selectedRoom && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={closeRoomModal}
                >
                    <div
                        className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header del modal */}
                        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex justify-between items-start z-10">
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-2">
                                    {selectedRoom.tipo}
                                </h3>
                                <p className="text-2xl font-semibold text-yellow-400">
                                    ${selectedRoom.precio} <span className="text-base text-gray-400">por noche</span>
                                </p>
                            </div>
                            <button
                                onClick={closeRoomModal}
                                className="text-gray-400 hover:text-white transition"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        {/* Contenido del modal */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Columna izquierda: Información */}
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-3">Descripción</h4>
                                        <p className="text-gray-300 leading-relaxed">
                                            {selectedRoom.detallesAdicionales}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-3">Características</h4>
                                        <ul className="space-y-3">
                                            {selectedRoom.caracteristicas.map((caracteristica, i) => (
                                                <li key={i} className="flex items-center text-gray-300">
                                                    {getCaracteristicaIcon(i)}
                                                    {caracteristica}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex items-center text-gray-300 pt-4">
                                        <BedDouble className="mr-3" size={24} />
                                        <span className="text-lg">
                                            {selectedRoom.camas} {selectedRoom.camas === 1 ? 'cama' : 'camas'}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => {
                                            handleReservar(selectedRoom);
                                            closeRoomModal();
                                        }}
                                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors"
                                    >
                                        Reservar ahora
                                    </button>
                                </div>

                                {/* Columna derecha: Carrusel de imágenes */}
                                <div>
                                    <ImageCarousel
                                        imagenes={selectedRoom.imagenes}
                                        currentIndex={currentImageIndex}
                                        onIndexChange={setCurrentImageIndex}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Habitaciones;