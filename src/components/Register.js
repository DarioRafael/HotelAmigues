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
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-11/12 max-w-md">
                <h2 className="text-2xl font-serif text-white mb-6">Crear Nueva Cuenta</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-200">Nombre(s):</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="form-input text-black" // Añadir text-black aquí
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200">Apellidos:</label>
                        <input
                            type="text"
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                            required
                            className="form-input text-black" // Añadir text-black aquí
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input text-black" // Añadir text-black aquí
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200">Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input text-black" // Añadir text-black aquí
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full">Registrar</button>
                </form>
                <button onClick={onClose} className="mt-4 text-red-500 hover:underline">Cerrar</button>
            </div>
        </div>
    );
};

export default Register;
