import React, { useState, useEffect } from 'react';
import { confirmAttendance } from '../services/sheetsService';
import ConfirmationModal from './ConfirmationModal';
import JurassicCard from './JurassicCard';

type ConfirmationStatus = 'idle' | 'loading' | 'error' | 'success';

interface ConfirmationProps {
    scriptUrl: string;
}

const Confirmation: React.FC<ConfirmationProps> = ({ scriptUrl }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [status, setStatus] = useState<ConfirmationStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const isConfigured = scriptUrl && !scriptUrl.includes('YOUR_SCRIPT_ID_HERE') && scriptUrl.trim() !== '';

    useEffect(() => {
        const confirmed = localStorage.getItem('isConfirmed');
        if (confirmed) {
            setIsConfirmed(true);
            setStatus('success');
        }
    }, []);

    const handleConfirm = async (familyCount: number) => {
        setIsModalOpen(false);
        setStatus('loading');
        setErrorMessage('');

        try {
            await confirmAttendance(scriptUrl, familyCount);
            setStatus('success');
            setIsConfirmed(true);
            localStorage.setItem('isConfirmed', 'true');
        } catch (error: any) {
            console.error('Error al guardar en Google Sheet:', error);
            setStatus('error');
            setErrorMessage(error.message || 'No se pudo guardar la confirmación. Por favor, avisa al anfitrión.');
        }
    };

    const CheckIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
    );
    
    const renderStatusArea = () => {
        switch (status) {
            case 'loading':
                return (
                    <div className="bg-blue-600 bg-opacity-30 p-4 rounded-lg border-2 border-blue-500">
                         <div className="flex items-center justify-center text-blue-200">
                            <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Registrando tu confirmación...</span>
                        </div>
                    </div>
                );
            case 'success':
                return (
                    <div>
                        <div className="bg-green-600 bg-opacity-30 p-4 rounded-lg border-2 border-green-500 animate-fadeIn">
                            <p className="text-green-200 text-lg text-center font-bold">🎉 ¡Gracias! Tu asistencia ha sido registrada. 🎉</p>
                        </div>
                    </div>
                );
            case 'error':
                 if (errorMessage) {
                    return (
                         <div>
                            <div className="bg-red-800 bg-opacity-50 p-4 rounded-lg border-2 border-red-600">
                                <p className="text-red-200 text-lg text-center">{errorMessage}</p>
                            </div>
                        </div>
                    );
                 }
                 return null;
            default:
                return null;
        }
    };


    return (
        <>
            <JurassicCard>
                <h3 className="font-bangers text-5xl md:text-6xl text-amber-400 mb-4">¡Confirma tu Expedición!</h3>
                <p className="text-lg md:text-xl mb-8 text-gray-200">
                    ¡Asegura tu lugar en la aventura más grande de la prehistoria!
                </p>
                
                <div className="mb-4" {...(!isConfigured && {title: "El anfitrión necesita configurar la invitación para habilitar la confirmación."})}>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        disabled={isConfirmed || status === 'loading' || !isConfigured}
                        className="btn-jurassic text-xl mb-4 inline-flex items-center"
                    >
                       <CheckIcon /> {isConfirmed ? '¡Aventura Confirmada!' : '¡Confirmo mi Asistencia!'}
                    </button>
                    {!isConfigured && !isConfirmed && <p className="text-xs text-yellow-400 mt-2">La confirmación está desactivada hasta que el anfitrión termine la configuración.</p>}
                </div>
                
                <div className="h-24 flex items-center justify-center p-2">
                    {renderStatusArea()}
                </div>
            </JurassicCard>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
            />
        </>
    );
};

export default Confirmation;