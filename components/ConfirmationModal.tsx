import React, { useState, useEffect } from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (count: number) => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [familyCount, setFamilyCount] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setFamilyCount(1); // Reset count when modal opens
            setIsSubmitting(false);
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleConfirmClick = () => {
        setIsSubmitting(true);
        onConfirm(familyCount);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300" onClick={onClose}>
            <div className="bg-gray-800 p-8 rounded-xl border-4 border-amber-500 max-w-md mx-4 shadow-2xl animate-slideIn" onClick={(e) => e.stopPropagation()}>
                <h4 className="font-bangers text-3xl text-amber-400 mb-4 text-center">¡Cuenta tu Manada!</h4>
                <p className="text-gray-200 mb-6 text-center">¿Cuántos miembros de tu familia vendrán a la aventura jurásica?</p>
                
                <div className="flex items-center justify-center mb-6">
                    <button onClick={() => setFamilyCount(Math.max(1, familyCount - 1))} className="bg-red-600 hover:bg-red-700 text-white font-bold text-2xl w-12 h-12 rounded-full mr-4 transition-all hover:scale-110">-</button>
                    <span className="text-4xl font-bold text-white mx-6 w-12 text-center">{familyCount}</span>
                    <button onClick={() => setFamilyCount(familyCount + 1)} className="bg-green-600 hover:bg-green-700 text-white font-bold text-2xl w-12 h-12 rounded-full ml-4 transition-all hover:scale-110">+</button>
                </div>
                
                <div className="flex gap-4">
                    <button onClick={onClose} disabled={isSubmitting} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex-1 disabled:opacity-50">
                        Cancelar
                    </button>
                    <button onClick={handleConfirmClick} disabled={isSubmitting} className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex-1 disabled:opacity-50">
                        {isSubmitting ? 'Enviando...' : '¡Confirmar!'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;