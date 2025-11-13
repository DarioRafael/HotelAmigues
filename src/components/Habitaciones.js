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

            {/* Layout horizontal de habitaciones */}
            <div className="space-y-8 max-w-7xl mx-auto">
                {habitaciones.map((habitacion, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 text-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-red-500/20 hover:scale-[1.01] border border-gray-700"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                            {/* Columna izquierda: Imagen (40% del ancho) */}
                            <div className="relative lg:col-span-2 h-64 lg:h-auto group">
                                <img
                                    src={habitacion.imagenes[0]}
                                    alt={habitacion.tipo}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Overlay con degradado */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                {/* Badge de fotos */}
                                {habitacion.imagenes.length > 1 && (
                                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {habitacion.imagenes.length} fotos
                                    </div>
                                )}

                                {/* Precio flotante en móvil */}
                                <div className="lg:hidden absolute bottom-4 left-4">
                                    <div className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
                                        <span className="text-2xl font-bold">${habitacion.precio}</span>
                                        <span className="text-sm opacity-90"> / noche</span>
                                    </div>
                                </div>
                            </div>

                            {/* Columna derecha: Información (60% del ancho) */}
                            <div className="lg:col-span-3 p-6 lg:p-8 flex flex-col">
                                <div className="flex-1">
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h2 className="text-3xl font-bold mb-2">{habitacion.tipo}</h2>
                                            <div className="flex items-center text-gray-400">
                                                <BedDouble className="mr-2" size={18} />
                                                <span className="text-sm">{habitacion.camas} {habitacion.camas === 1 ? 'cama' : 'camas'}</span>
                                            </div>
                                        </div>

                                        {/* Precio en desktop */}
                                        <div className="hidden lg:block text-right">
                                            <div className="text-3xl font-bold text-yellow-400">${habitacion.precio}</div>
                                            <div className="text-sm text-gray-400">por noche</div>
                                        </div>
                                    </div>

                                    {/* Descripción */}
                                    <p className="text-gray-300 mb-6 leading-relaxed">{habitacion.descripcion}</p>

                                    {/* Características en grid */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Incluye</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {habitacion.caracteristicas.map((caracteristica, i) => (
                                                <div key={i} className="flex items-center text-gray-300 bg-gray-700/50 rounded-lg px-3 py-2">
                                                    <div className="text-yellow-400 mr-3">
                                                        {getCaracteristicaIcon(i)}
                                                    </div>
                                                    <span className="text-sm">{caracteristica}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Botones */}
                                <div className="flex gap-3 pt-4 border-t border-gray-700">
                                    <button
                                        onClick={() => handleRoomClick(habitacion)}
                                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg"
                                    >
                                        Ver detalles
                                    </button>
                                    <button
                                        onClick={() => handleReservar(habitacion)}
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-red-500/50"
                                    >
                                        Reservar ahora
                                    </button>
                                </div>
                            </div>
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