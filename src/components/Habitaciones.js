import React from 'react';
import { BedDouble, Wifi, Coffee, TrendingUp } from 'lucide-react';

const Habitaciones = () => {
    // Función para generar datos de habitaciones aleatorias
    const generarHabitaciones = () => {
        const tiposHabitacion = ['Sencilla', 'Doble', 'Suite', 'Familiar', 'Lujo'];
        const caracteristicas = ['Wi-Fi gratis', 'Desayuno incluido', 'Vista al mar', 'Jacuzzi privado', 'Servicio a la habitación 24/7'];
        const habitaciones = [];

        for (let i = 0; i < 6; i++) {
            const tipo = tiposHabitacion[Math.floor(Math.random() * tiposHabitacion.length)];
            const precio = (Math.random() * (3000 - 1000) + 1000).toFixed(2);
            const camas = Math.floor(Math.random() * 4) + 1;
            const caracteristicasHabitacion = caracteristicas
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);
            habitaciones.push({ tipo, precio, camas, caracteristicas: caracteristicasHabitacion });
        }

        return habitaciones;
    };

    const habitaciones = generarHabitaciones();

    return (
        <div className="container mx-auto py-40 px-4">
            <h1 className="text-4xl font-sans font-bold text-center mb-10 text-white">
                Nuestras Habitaciones
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {habitaciones.map((habitacion, index) => (
                    <div key={index} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
                        <h2 className="text-2xl font-bold mb-4">{habitacion.tipo}</h2>
                        <div className="flex items-center mb-4">
                            <BedDouble className="mr-2" />
                            <p>Camas: <strong>{habitacion.camas}</strong></p>
                        </div>
                        <p className="text-xl font-bold mb-4 text-yellow-400">${habitacion.precio} / noche</p>
                        <ul className="mb-4">
                            {habitacion.caracteristicas.map((caracteristica, i) => (
                                <li key={i} className="flex items-center mb-2">
                                    {i === 0 && <Wifi className="mr-2" />}
                                    {i === 1 && <Coffee className="mr-2" />}
                                    {i === 2 && <TrendingUp className="mr-2" />}
                                    {caracteristica}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors">
                            Reservar Ahora
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Habitaciones;