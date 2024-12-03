import React, { useState, useEffect } from 'react';
import { BedDouble, Wifi, Coffee, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

const importAll = (r) => r.keys().map(r);
const imagenesSencilla = importAll(require.context('./assets/imgsencilla', false, /\.(jpg|jpeg|png)$/));
const imagenesDoble = importAll(require.context('./assets/imgdoble', false, /\.(jpg|jpeg|png)$/));
const imagenesFamiliar = importAll(require.context('./assets/imgfamiliar', false, /\.(jpg|jpeg|png)$/));
const imagenesDeluxe = importAll(require.context('./assets/imgdeluxe', false, /\.(jpg|jpeg|png)$/));

const Reservar = ({ onClose, habitacionSeleccionada, habitacionPrecio }) => {
    const [fechaMinima, setFechaMinima] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [daysDifference, setDaysDifference] = useState(0);

    useEffect(() => {
        // Establecer la fecha mínima como la fecha actual en formato YYYY-MM-DD
        const today = new Date().toISOString().split('T')[0];
        setFechaMinima(today);
    }, []);

    const calculateDaysBetween = () => {
        if (!startDate || !endDate) {
            alert('Por favor, ingresa ambas fechas');
            return 0;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        // Calcular diferencia en milisegundos
        const diffTime = Math.abs(end - start);

        // Convertir milisegundos a días
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setDaysDifference(diffDays);
        return diffDays;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciones antes de crear la reserva
        if (!startDate || !endDate) {
            alert('Por favor, selecciona las fechas de inicio y fin');
            return;
        }

        if (new Date(startDate) >= new Date(endDate)) {
            alert('La fecha de fin debe ser posterior a la fecha de inicio');
            return;
        }

        console.log("Reservacion Creada");
        onClose();
    };

    useEffect(() => {
        // Calcular días cada vez que cambien las fechas
        if (startDate && endDate) {
            calculateDaysBetween();
        }
    }, [startDate, endDate]);

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-11/12 max-w-md transform transition-all duration-300 ease-in-out hover:scale-105">
                <h2 className="text-3xl font-serif text-white text-center mb-8">Crear Reservacion</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Habitacion:</label>
                        <input
                            type="text"
                            className="form-input text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150 ease-in-out w-full p-2"
                            value={habitacionSeleccionada}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1 flex justify-between">
                            <span>Fecha Inicio:</span>
                            <span>Fecha Fin:</span>
                        </label>
                        <div className="flex space-x-2">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="form-input text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150 ease-in-out w-full p-2"
                                min={fechaMinima}
                            />
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="form-input text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150 ease-in-out w-full p-2"
                                min={startDate || fechaMinima}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Precio Total:</label>
                        <input
                            type="text"
                            className="form-input text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150 ease-in-out w-full p-2"
                            value={`$${(habitacionPrecio * daysDifference).toFixed(2)}`}
                            readOnly
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-800 text-white font-semibold py-2 rounded-md shadow hover:bg-blue-700 transition duration-200 ease-in-out"
                    >
                        Reservar
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="mt-4 text-red-400 hover:underline text-sm w-full"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

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
            imagenes: imagenesSencilla
        },
        {
            tipo: 'Habitación Doble',
            precio: 80,
            camas: 2,
            descripcion: 'Perfecta para parejas, con dos camas y vistas impresionantes.',
            detallesAdicionales: 'Amplio espacio con todas las comodidades necesarias',
            caracteristicas: ['Wi-Fi gratis', 'Vista panorámica', 'Minibar incluido'],
            imagenes: imagenesDoble
        },
        {
            tipo: 'Suite Familiar',
            precio: 120,
            camas: 3,
            descripcion: 'Amplia suite con espacio para toda la familia, equipada con todas las comodidades.',
            detallesAdicionales: 'Perfecta para familias grandes',
            caracteristicas: ['Cocina equipada', 'Área de juegos', 'Smart TV'],
            imagenes: imagenesFamiliar
        },
        {
            tipo: 'Habitación Deluxe',
            precio: 150,
            camas: 2,
            descripcion: 'Habitación de lujo con jacuzzi y balcón privado.',
            detallesAdicionales: 'La mejor experiencia de hospedaje',
            caracteristicas: ['Jacuzzi privado', 'Terraza exclusiva', 'Servicio de mayordomo'],
            imagenes: imagenesDeluxe
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