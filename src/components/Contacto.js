import React from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Facebook,
    Instagram,
    Twitter,
    Send,
    ArrowRight
} from 'lucide-react';
import '../styles/contactoSyle.css';

const Contacto = () => {
    const contactInfo = [
        {
            icon: Mail,
            title: "Correo Electrónico",
            description: "hotelamiguestec@hotmail.com",
            color: "bg-purple-500"
        },
        {
            icon: Phone,
            title: "Teléfono",
            description: "+52 834 215 7902",
            color: "bg-blue-500"
        },
        {
            icon: MapPin,
            title: "Ubicación",
            description: "Blvd. Emilio Portes Gil 1301, , 87010 Cdad. Victoria, Tamps.",
            color: "bg-red-500"
        },
        {
            icon: Clock,
            title: "Horario de Atención",
            description: "Disponible 24/7 para ti",
            color: "bg-green-500"
        }
    ];

    const socialLinks = [
        {
            icon: Facebook,
            url: "#",
            color: "hover:text-blue-500"
        },
        {
            icon: Instagram,
            url: "#",
            color: "hover:text-pink-500"
        },
        {
            icon: Twitter,
            url: "#",
            color: "hover:text-blue-400"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
            <motion.div
                className="container mx-auto"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-sans font-bold text-white mb-4">
                        Conecta con Nosotros
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Estamos aquí para hacer de tu estancia una experiencia inolvidable.
                        No dudes en contactarnos para cualquier consulta.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {contactInfo.map((info, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gray-800 rounded-xl p-6 shadow-lg transform transition-all hover:shadow-2xl"
                        >
                            <div className="flex items-center space-x-6">
                                <div className={`${info.color} p-4 rounded-lg`}>
                                    <info.icon className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                                    <p className="text-gray-400">{info.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    variants={itemVariants}
                    className="bg-gray-800 rounded-xl p-8 shadow-lg mb-16"
                >
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                        ¿Tienes alguna pregunta?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            className="bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                        <textarea
                            className="bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none md:col-span-2"
                            placeholder="Tu mensaje"
                            rows="4"
                        />
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg md:col-span-2 flex items-center justify-center space-x-2 group transition-all duration-300">
                            <span>Enviar Mensaje</span>
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="text-center"
                >
                    <h3 className="text-2xl font-bold text-white mb-8">
                        Síguenos en Redes Sociales
                    </h3>
                    <div className="flex justify-center space-x-8">
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.url}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                className={`${link.color} transition-colors duration-300`}
                            >
                                <link.icon className="w-8 h-8" />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Contacto;