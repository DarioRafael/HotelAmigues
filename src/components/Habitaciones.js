import React, { useState } from 'react';
import { BedDouble, Wifi, Coffee, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import Reservar from './Reservar'; // Adjust import path as needed

// const importAll = (r) => r.keys().map(r);
// const imagenesSencilla = importAll(require.context('./assets/imgsencilla', false, /\.(jpg|jpeg|png)$/));
// const imagenesDoble = importAll(require.context('./assets/imgdoble', false, /\.(jpg|jpeg|png)$/));
// const imagenesFamiliar = importAll(require.context('./assets/imgfamiliar', false, /\.(jpg|jpeg|png)$/));
// const imagenesDeluxe = importAll(require.context('./assets/imgdeluxe', false, /\.(jpg|jpeg|png)$/));

const Habitaciones = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [showReservarModal, setShowReservarModal] = useState(false);
    const [habitacionSeleccionada, setHabitacionSeleccionada] = useState('');
    const [habitacionPrecio, setHabitacionPrecio] = useState('');

    const habitaciones = [
        {
            tipo: 'Habitación Sencilla',
            precio: 50,
            camas: 1,
            descripcion: 'Una habitación cómoda para una persona, ideal para viajes de negocios.',
            detallesAdicionales: 'Consta de una habitacion con una cama, baño, etc',
            caracteristicas: ['Wi-Fi gratis', 'Desayuno incluido', 'Servicio a la habitación 24/7'],
            //imagenes: imagenesSencilla
        },
        {
            tipo: 'Habitación Doble',
            precio: 80,
            camas: 2,
            descripcion: 'Perfecta para parejas, con dos camas y vistas impresionantes.',
            detallesAdicionales: 'Amplio espacio con todas las comodidades necesarias',
            caracteristicas: ['Wi-Fi gratis', 'Vista panorámica', 'Minibar incluido'],
            //imagenes: imagenesDoble
        },
        {
            tipo: 'Suite Familiar',
            precio: 120,
            camas: 3,
            descripcion: 'Amplia suite con espacio para toda la familia, equipada con todas las comodidades.',
            detallesAdicionales: 'Perfecta para familias grandes',
            caracteristicas: ['Cocina equipada', 'Área de juegos', 'Smart TV'],
            //imagenes: imagenesFamiliar
        },
        {
            tipo: 'Habitación Deluxe',
            precio: 150,
            camas: 2,
            descripcion: 'Habitación de lujo con jacuzzi y balcón privado.',
            detallesAdicionales: 'La mejor experiencia de hospedaje',
            caracteristicas: ['Jacuzzi privado', 'Terraza exclusiva', 'Servicio de mayordomo'],
            //imagenes: imagenesDeluxe
        }
    ];

    const handleRoomClick = (room) => {
        setSelectedRoom(room);
    };

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    const closeImageModal = () => {
        setSelectedImageIndex(null);
    };

    const nextImage = () => {
        if (selectedRoom && selectedImageIndex < selectedRoom.imagenes.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    };

    const prevImage = () => {
        if (selectedRoom && selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {habitaciones.map((habitacion, index) => (
                    <div key={index}
                         className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
                        <img
                            src={habitacion.imagenes[0]}
                            alt={habitacion.tipo}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-2xl font-bold mb-4">{habitacion.tipo}</h2>
                        <div className="flex items-center mb-4">
                            <BedDouble className="mr-2"/>
                            <p>Camas: <strong>{habitacion.camas}</strong></p>
                        </div>
                        <p className="text-xl font-bold mb-4 text-yellow-400">${habitacion.precio} / noche</p>
                        <p className="mb-4 text-gray-300">{habitacion.descripcion}</p>
                        <ul className="mb-4">
                            {habitacion.caracteristicas.map((caracteristica, i) => (
                                <li key={i} className="flex items-center mb-2">
                                    {i === 0 && <Wifi className="mr-2"/>}
                                    {i === 1 && <Coffee className="mr-2"/>}
                                    {i === 2 && <TrendingUp className="mr-2"/>}
                                    {caracteristica}
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => handleRoomClick(habitacion)}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                            >
                                Ver más detalles
                            </button>
                            <button
                                onClick={() => handleReservar(habitacion)}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
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

            {/* Modal para detalles de la habitación */}
            {selectedRoom && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2">
                        <h3 className="text-2xl font-bold mb-2">{selectedRoom.tipo}</h3>
                        <p className="text-gray-300 mb-4">{selectedRoom.detallesAdicionales}</p>
                        <p className="text-lg font-semibold">${selectedRoom.precio} por noche</p>

                        <div className="mt-4 grid grid-cols-3 gap-2">
                            {selectedRoom.imagenes.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`${selectedRoom.tipo} - Imagen ${index + 1}`}
                                    className="w-full h-32 object-cover rounded cursor-pointer"
                                    onClick={() => handleImageClick(index)}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => setSelectedRoom(null)}
                            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal para imagen ampliada */}
            {selectedImageIndex !== null && selectedRoom && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="relative bg-gray-800 rounded-lg flex items-center justify-center w-full max-w-4xl h-[80vh]">
                        {selectedImageIndex > 0 && (
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded z-10 bg-opacity-50"
                            >
                                <ChevronLeft />
                            </button>
                        )}
                        {selectedImageIndex < selectedRoom.imagenes.length - 1 && (
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded z-10 bg-opacity-50"
                            >
                                <ChevronRight />
                            </button>
                        )}
                        <img
                            src={selectedRoom.imagenes[selectedImageIndex]}
                            alt="Imagen Ampliada"
                            className="max-w-full max-h-full object-contain"
                        />
                        <button
                            onClick={closeImageModal}
                            className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Habitaciones;