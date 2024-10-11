// Login.js
import React, { useState } from 'react';

const Login = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de autenticación aquí
        console.log("Iniciando sesión con:", { email, password });
        onClose(); // Cerrar el modal después de iniciar sesión (o según tu lógica)
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-serif mb-4">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <button type="submit" className="btn-primary w-full">Entrar</button>
                </form>
                <button onClick={onClose} className="mt-4 text-red-500">Cerrar</button>
            </div>
        </div>
    );
};

export default Login;
