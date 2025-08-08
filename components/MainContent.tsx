
import React from 'react';
import Confirmation from './Counter';
import JurassicCard from './JurassicCard';
import GuestCounterDisplay from './GuestCounterDisplay';

interface MainContentProps {
    scriptUrl: string;
}


const MainContent: React.FC<MainContentProps> = ({ scriptUrl }) => {
    const mainStyle = {
        backgroundImage: "url('https://www.transparenttextures.com/patterns/jungle.png')",
    };

    const CalendarIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
    );

    const ClockIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
    );
    
    const MapIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );

    return (
        <main className="py-20 px-6 bg-green-900 bg-opacity-80 relative" style={mainStyle}>
            <div className="container mx-auto max-w-4xl text-center relative z-10 space-y-12">
                
                <JurassicCard>
                    <img src="https://i.postimg.cc/jjZLF1L6/isma.jpg" alt="Ismael Explorador Jurásico" className="mx-auto rounded-full border-4 border-amber-500 mb-6 w-36 h-36 md:w-44 md:h-44 object-cover shadow-lg" />
                    <h3 className="font-bangers text-5xl md:text-6xl text-amber-400 mb-6">¡Prepárate para la Expedición!</h3>
                    <p className="text-lg md:text-xl mb-4 text-gray-200">Únete a Ismael en una peligrosa (¡pero divertida!) misión para celebrar su cumpleaños. ¡Habrá dinosaurios, juegos de excavación, y un pastel volcánico!</p>
                    <p className="text-lg md:text-xl mb-8 text-gray-200">¡Será una aventura prehistórica inolvidable!</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-lg">
                        <div className="bg-amber-600 bg-opacity-30 p-6 rounded-lg border-2 border-amber-500 hover:bg-opacity-40 transition-all">
                            <h4 className="font-bold text-2xl text-amber-300 mb-2 flex items-center"><CalendarIcon />Fecha:</h4>
                            <p className="text-white text-xl">Sábado, 16 de Agosto</p>
                        </div>
                        <div className="bg-amber-600 bg-opacity-30 p-6 rounded-lg border-2 border-amber-500 hover:bg-opacity-40 transition-all">
                            <h4 className="font-bold text-2xl text-amber-300 mb-2 flex items-center"><ClockIcon />Hora:</h4>
                            <p className="text-white text-xl">5:00 PM - 10:00 PM</p>
                        </div>
                    </div>
                </JurassicCard>
                
                <GuestCounterDisplay scriptUrl={scriptUrl} />

                <Confirmation scriptUrl={scriptUrl} />
                
                <JurassicCard>
                    <h3 className="font-bangers text-5xl md:text-6xl text-amber-400 mb-8">¡Encuentra el Nido del T-Rex!</h3>
                    <img src="https://i.postimg.cc/QNnn3NRw/imagen-2025-08-07-185454590.png" alt="Mapa del Tesoro Jurásico" className="rounded-lg shadow-xl mb-8 w-full h-auto max-h-72 object-cover border-4 border-amber-600" />
                    <p className="text-lg md:text-xl mb-8 text-gray-200">La celebración se llevará a cabo en un campamento base secreto, ¡cuidado con los velociraptores en el camino!</p>
                    <a href="https://www.google.com/maps/place//@28.7213169,-106.006974,17z/data=!4m6!1m5!3m4!2zMjjCsDQzJzE2LjYiTiAxMDbCsDAwJzE1LjkiVw!8m2!3d28.7212887!4d-106.0044098?hl=es&entry=ttu&g_ep=EgoyMDI1MDgwNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="btn-jurassic inline-flex items-center text-xl">
                       <MapIcon /> Ubicación
                    </a>
                </JurassicCard>

            </div>
        </main>
    );
};

export default MainContent;
