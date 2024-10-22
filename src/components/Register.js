import React, { useState } from 'react';

const Register = ({ onClose }) => {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de registro aquí
        console.log("Registrando con:", { nombre, apellidos, email, password });
        onClose(); // Cerrar el modal después de registrar (o según tu lógica)
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-11/12 max-w-md transform transition-all duration-300 ease-in-out hover:scale-105">
                <h2 className="text-3xl font-serif text-white text-center mb-8">Crear Nueva Cuenta</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Nombre(s):</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="form-input text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150 ease-in-out w-full p-2"
                            placeholder="Introduce tu nombre"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Apellidos:</label>
                        <input
                            type="text"
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                            required
                            className="form-input text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150 ease-in-out w-full p-2"
                            placeholder="Introduce tus apellidos"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150 ease-in-out w-full p-2"
                            placeholder="Introduce tu email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition duration-150 ease-in-out w-full p-2"
                            placeholder="Introduce tu contraseña"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-800 text-white font-semibold py-2 rounded-md shadow hover:bg-blue-700 transition duration-200 ease-in-out">
                        Registrar
                    </button>
                </form>
                <button onClick={onClose} className="mt-4 text-red-400 hover:underline text-sm">Cerrar</button>
            </div>
        </div>
    );
};

export default Register;
