
import React from 'react';

const Header = () => {
    const headerStyle = {
        backgroundImage: "url('https://i.postimg.cc/prLXKWvF/imagen-2025-05-31-151239130.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderBottom: '10px solid #5D4037'
    };

    return (
        <header style={headerStyle} className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative">
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10">
                <h1 className="font-bangers text-7xl md:text-8xl lg:text-9xl text-yellow-400 text-shadow-jurassic animate-pulse">¡Aventura Jurásica!</h1>
                <p className="font-bangers text-4xl md:text-5xl text-green-300 mt-4 text-shadow-jurassic">¡Estás invitado a la FEROZ fiesta de</p>
                <h2 className="font-bangers text-8xl md:text-9xl text-white my-6 text-shadow-jurassic">Ismael</h2>
                <p className="text-3xl md:text-4xl font-bold text-amber-400 text-shadow-jurassic">¡Cumple 7 Años!</p>
            </div>
        </header>
    );
};

export default Header;
