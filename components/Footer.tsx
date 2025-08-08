
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-center p-10 border-t-8 border-amber-600">
            <img src="https://i.postimg.cc/xTK6Fhkc/imagen-2025-05-31-155230852.png" alt="Logo Fósil Dinosaurio" className="mx-auto w-20 h-20 mb-5 opacity-80" />
            <p className="text-gray-400 text-lg">
                © {new Date().getFullYear()} ¡La Era de Ismael! ¡No extingas la diversión!
            </p>
        </footer>
    );
};

export default Footer;
