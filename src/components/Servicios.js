import React from 'react';
import { Utensils, Dumbbell, Wifi, Car, Heart, Coffee } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-gray-700">
        <Icon className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
    </div>
);

const Servicios = () => {
    const services = [
        {
            icon: Utensils,
            title: "Restaurante Gourmet",
            description: "Disfrute de una experiencia culinaria excepcional con nuestro chef de renombre internacional."
        },
        {
            icon: Dumbbell,
            title: "Gimnasio 24/7",
            description: "Mantenga su rutina de ejercicios con nuestro gimnasio completamente equipado, abierto las 24 horas."
        },
        {
            icon: Wifi,
            title: "Wi-Fi de Alta Velocidad",
            description: "Conexión gratuita de alta velocidad en todas las áreas del hotel para mantenerse conectado."
        },
        {
            icon: Car,
            title: "Servicio de Aparcacoches",
            description: "Olvídese del estrés de estacionar con nuestro conveniente servicio de aparcacoches."
        },
        {
            icon: Heart,
            title: "Spa y Bienestar",
            description: "Relájese y rejuvenezca en nuestro lujoso spa con una variedad de tratamientos."
        },
        {
            icon: Coffee,
            title: "Bar y Lounge",
            description: "Disfrute de cócteles artesanales y una atmósfera sofisticada en nuestro bar con vista panorámica."
        }
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

export default Servicios;