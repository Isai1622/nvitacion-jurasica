
import React, { useState, useEffect, useCallback } from 'react';
import { getTotalAttendees } from '../services/sheetsService';
import JurassicCard from './JurassicCard';

interface GuestCounterDisplayProps {
    scriptUrl: string;
}

const GuestCounterDisplay: React.FC<GuestCounterDisplayProps> = ({ scriptUrl }) => {
    const [count, setCount] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const isConfigured = scriptUrl && !scriptUrl.includes('YOUR_SCRIPT_ID_HERE') && scriptUrl.trim() !== '';

    const fetchCount = useCallback(async (isInitialLoad = false) => {
        if (!isConfigured) {
            setError('El contador de invitados se activará cuando el anfitrión configure la conexión.');
            setIsLoading(false);
            return;
        }
        if (isInitialLoad) {
            setIsLoading(true);
        }
        setError('');
        try {
            const total = await getTotalAttendees(scriptUrl);
            setCount(total);
        } catch (e: any) {
            // Display the specific error message from the service
            setError(e.message || 'Ocurrió un error desconocido al cargar el contador.');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [scriptUrl, isConfigured]);

    useEffect(() => {
        fetchCount(true); // Fetch on initial load with loading indicator
        const interval = setInterval(() => fetchCount(false), 30000); // Refresh every 30 seconds without loading indicator
        return () => clearInterval(interval);
    }, [fetchCount]);

    const renderContent = () => {
        if (isLoading && count === null) {
            return <div className="text-gray-400 animate-pulse">Buscando huellas...</div>;
        }
        if (error) {
            return <div className="text-yellow-400 text-sm p-4 leading-relaxed">{error}</div>;
        }
        return (
            <div className="flex items-center justify-center group">
                 <span className="text-6xl font-bold text-white transition-transform duration-300 group-hover:scale-110">{count ?? 0}</span>
                <div className="ml-4 text-left">
                     <p className="text-xl font-bold text-amber-300">Exploradores</p>
                     <p className="text-lg text-gray-200">Confirmados</p>
                </div>
            </div>
        );
    }
    
    return (
        <JurassicCard>
             <h3 className="font-bangers text-4xl text-amber-400 mb-6">Registro de Expedición</h3>
             <div className="transition-all duration-300 ease-in-out p-4 rounded-lg bg-black/20 hover:bg-black/40 min-h-[100px] flex items-center justify-center">
                {renderContent()}
            </div>
        </JurassicCard>
    );
};

export default GuestCounterDisplay;
