
import React from 'react';

interface JurassicCardProps {
    children: React.ReactNode;
}

const JurassicCard: React.FC<JurassicCardProps> = ({ children }) => {
    return (
        <div className="p-1 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-orange-800 transform hover:scale-105 transition-transform duration-300 shadow-2xl">
            <div className="bg-gray-800/80 backdrop-blur-md rounded-lg p-8 md:p-12">
                {children}
            </div>
        </div>
    );
};

export default JurassicCard;
