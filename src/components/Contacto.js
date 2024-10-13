import React from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Contacto = () => {
    const contactInfo = [
        {
            icon: Mail,
            title: "Correo Electrónico",
            description: "contacto@hotelgourmet.com"
        },
        {
            icon: Phone,
            title: "Teléfono",
            description: "+34 123 456 789"
        },
        {
            icon: MapPin,
            title: "Dirección",
            description: "Calle Falsa 123, Ciudad, País"
        },
        {
            icon: Clock,
            title: "Horario de Atención",
            description: "24/7 para reservas y consultas"
        }
    ];

    const socialLinks = [
        {
            icon: Facebook,
            url: "https://facebook.com/hotelgourmet"
        },
        {
            icon: Instagram,
            url: "https://instagram.com/hotelgourmet"
        },
        {
            icon: Twitter,
            url: "https://twitter.com/hotelgourmet"
        }
    ];

    return (
        <section id="contact" className="py-40 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-serif font-bold text-center mb-12 text-white">
                    Contáctanos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {contactInfo.map((info, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <info.icon className="w-10 h-10 text-red-600" />
                            <div>
                                <h3 className="text-xl font-semibold text-white">{info.title}</h3>
                                <p className="text-gray-400">{info.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <h3 className="text-2xl font-serif font-bold text-white mb-6">
                        Síguenos en Redes Sociales
                    </h3>
                    <div className="flex justify-center space-x-8">
                        {socialLinks.map((link, index) => (
                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                                <link.icon className="w-10 h-10 text-gray-400 hover:text-red-600 transition-transform transform hover:scale-110" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contacto;
