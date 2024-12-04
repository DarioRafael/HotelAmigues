import React from 'react';
import { Utensils, Coffee, Wifi, Car, GlassWater, Book, Home, Dumbbell, ShoppingBag, Tv2, Truck, ClipboardList } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, cost, status }) => (
    <div className={`bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-gray-700 ${status === 'Activo' ? 'border-2 border-green-500' : ''}`}>
        <Icon className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
        <p className="text-gray-400 mt-4">Costo: ${cost}</p>
        <p className={`mt-2 font-medium ${status === 'Activo' ? 'text-green-500' : 'text-red-500'}`}>{status}</p>
    </div>
);

const HotelServices = () => {
    const services = [
        { icon: Utensils, title: 'Desayuno', description: 'Desayuno buffet con opciones locales e internacionales', cost: 10, status: 'Activo' },
        { icon: Coffee, title: 'Spa', description: 'Servicio de spa para relajación y tratamientos corporales', cost: 40, status: 'Activo' },
        { icon: Wifi, title: 'Wi-Fi', description: 'Acceso a internet en todo el hotel', cost: 5, status: 'Activo' },
        { icon: Car, title: 'Transporte', description: 'Servicio de transporte al aeropuerto o zona turística', cost: 20, status: 'Activo' },
        { icon: Dumbbell, title: 'Gimnasio', description: 'Acceso a gimnasio 24 horas con equipo de última generación', cost: 15, status: 'Activo' },
        { icon: GlassWater, title: 'Piscina', description: 'Acceso a la piscina del hotel', cost: 10, status: 'Activo' },
        { icon: Book, title: 'Excursiones', description: 'Organización de excursiones y tours por la ciudad', cost: 30, status: 'Activo' },
        { icon: Home, title: 'Estacionamiento', description: 'Estacionamiento privado para huéspedes', cost: 5, status: 'Activo' },
        { icon: Tv2, title: 'Bar', description: 'Acceso al bar del hotel, con bebidas alcohólicas y no alcohólicas', cost: 8, status: 'Activo' },
        { icon: Truck, title: 'Alquiler de bicicletas', description: 'Alquiler de bicicletas para recorrer la zona', cost: 12, status: 'Activo' },
        { icon: ShoppingBag, title: 'Minibar', description: 'Servicio de minibar disponible en la habitación', cost: 25, status: 'Activo' },
        { icon: ClipboardList, title: 'Laundry', description: 'Servicio de lavandería para ropa de huéspedes', cost: 20, status: 'Activo' },
    ];

    return (
        <section id="services" className="py-40 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-sans font-bold text-center mb-12 text-white">
                    Nuestros Servicios
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HotelServices;
