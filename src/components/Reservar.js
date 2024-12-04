import React, { useState, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';

const Reservar = ({ onClose, habitacionSeleccionada, habitacionPrecio }) => {
    const [fechaMinima, setFechaMinima] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [daysDifference, setDaysDifference] = useState(0);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setFechaMinima(today);
        setStartDate(today)
    }, []);

    const calculateDaysBetween = () => {
        if (!startDate || !endDate) return 0;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setDaysDifference(diffDays);
        return diffDays;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validations = [
            { condition: !startDate || !endDate, message: 'Por favor, selecciona las fechas de inicio y fin' },
            { condition: new Date(startDate) >= new Date(endDate), message: 'La fecha de fin debe ser posterior a la fecha de inicio' }
        ];

        for (let validation of validations) {
            if (validation.condition) {
                alert(validation.message);
                return;
            }
        }

        const reservationDetails = {
            habitacion: habitacionSeleccionada,
            fechaInicio: startDate,
            fechaFin: endDate,
            dias: daysDifference,
            precioTotal: habitacionPrecio * daysDifference
        };

        console.log('Reservación creada:', reservationDetails);
        onClose();
    };

    useEffect(() => {
        if (startDate && endDate) {
            calculateDaysBetween();
        }
    }, [startDate, endDate]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4">
            <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                {/* Header */}
                <div className="bg-red-600 text-white p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Crear Reservación</h2>
                    <button onClick={onClose} className="hover:text-gray-200">
                        <X size={24} />
                    </button>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Habitación */}
                    <div>
                        <label className="block text-gray-300 mb-2">Habitación</label>
                        <input
                            type="text"
                            value={habitacionSeleccionada}
                            readOnly
                            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700"
                        />
                    </div>

                    {/* Fechas */}
                    <div className="space-y-4">
                        <div className="flex space-x-4">
                            <div className="w-full">
                                <label className="block text-gray-300 mb-2 flex items-center">
                                    <Calendar className="mr-2 text-red-400" size={20} />
                                    Fecha Inicio
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    min={fechaMinima}
                                    className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-gray-300 mb-2 flex items-center">
                                    <Calendar className="mr-2 text-red-400" size={20} />
                                    Fecha Fin
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate || fechaMinima}
                                    className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Total */}
                    <div>
                        <label className="block text-gray-300 mb-2">Precio Total</label>
                        <input
                            type="text"
                            value={`$${(habitacionPrecio * daysDifference).toFixed(2)}`}
                            readOnly
                            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 text-right font-bold"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors duration-300"
                    >
                        Confirmar Reservación
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Reservar;