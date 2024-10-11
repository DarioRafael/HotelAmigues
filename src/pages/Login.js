import React, { useState } from 'react';

const Login = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de inicio de sesión aquí
        console.log("Iniciando sesión con:", { email, password });
        onClose(); // Cerrar el modal después de iniciar sesión (o según tu lógica)
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-11/12 max-w-md">
                <h2 className="text-2xl font-serif text-white mb-6">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <button type="submit" className="btn-primary w-full">Iniciar Sesión</button>
                </form>
                <button onClick={onClose} className="mt-4 text-red-500 hover:underline">Cerrar</button>
            </div>
        </div>
    );
};

export default Login;
