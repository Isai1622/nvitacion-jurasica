import React, { useEffect, useState } from 'react';

const Leaf = ({ top, left, right, delay, scale, rotate }: { top: string, left?: string, right?: string, delay: string, scale: number, rotate: number }) => (
    <div
        className="absolute hidden md:block"
        style={{
            top,
            left,
            right: left ? undefined : right,
            animation: `sway-leaf ${6 + parseFloat(delay)}s infinite ease-in-out`,
            animationDelay: delay,
            width: '60px',
            height: '60px',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%232F855A" d="M50,0 C20,20 10,70 50,100 C90,70 80,20 50,0 Z M50,10 C75,30 70,65 50,90 C30,65 25,30 50,10 Z" transform="rotate(30 50 50)"/></svg>')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            opacity: 0.6,
            zIndex: 0,
        }}
    />
);

const Footprint = ({ top, left, delay, rotate, scaleX }: { top: string, left: string, delay: string, rotate: number, scaleX: number }) => (
    <div
        className="absolute"
        style={{
            top,
            left,
            width: '50px',
            height: '60px',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="%23443322" opacity="0.6"><path d="M52.9,21.4c-2.3-2.8-5.8-4.1-9.3-3.6c-3.5,0.5-6.5,2.6-8.4,5.4c-1.2,1.8-2,3.9-2.2,6.1c-0.3,2.2,0.2,4.4,1.2,6.4 c1.1,2,2.8,3.7,4.8,4.8c2.7,1.5,5.8,2,8.9,1.4c3.1-0.6,5.9-2.4,7.9-4.9c0.8-1,1.4-2.1,1.8-3.3c0.4-1.2,0.6-2.4,0.5-3.7 C60.1,27.4,57.2,23.6,52.9,21.4z M26.6,39.3c-1.6,1.3-3.6,2-5.7,2c-2.1,0-4.1-0.7-5.7-2c-1.6-1.3-2.7-3-3.2-4.9 c-0.5-1.9-0.3-3.9,0.5-5.7c0.8-1.8,2.2-3.3,4-4.3c1.8-1,3.8-1.4,5.8-1.2c2,0.2,3.9,1,5.4,2.3c1.5,1.3,2.5,3,2.9,4.9 C30.1,35.3,29.4,37.6,26.6,39.3z M37.4,56.9c-2.1,1.1-4.5,1.6-6.9,1.4c-2.4-0.2-4.7-1-6.6-2.4c-1.9-1.4-3.4-3.2-4.3-5.3 c-0.9-2.1-1.2-4.4-0.7-6.7c0.4-2.3,1.6-4.4,3.3-6c1.7-1.6,3.9-2.7,6.2-3.1c2.3-0.4,4.7,0,6.8,1.1c2.1,1.1,3.9,2.7,5.1,4.7 C42.9,44.6,43.6,49.2,37.4,56.9z"/></svg>')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            opacity: 0.2,
            animation: 'walk-path 15s linear infinite',
            animationDelay: delay,
            transform: `rotate(${rotate}deg) scaleX(${scaleX})`,
        }}
    />
);

interface ConfettiPiece {
    id: number;
    left: string;
    duration: string;
    delay: string;
    color: string;
    shape: 'leaf' | 'square';
}

const generateConfetti = (count: number): ConfettiPiece[] => {
    const pieces: ConfettiPiece[] = [];
    const colors = ['#FBBF24', '#38A169', '#D97706', '#795548'];
    const leafColors = ['#2F855A', '#38A169', '#276749'];

    for (let i = 0; i < count; i++) {
        const isLeaf = Math.random() < 0.3;
        pieces.push({
            id: i,
            left: `${Math.random() * 100}vw`,
            duration: `${Math.random() * 4 + 3}s`,
            delay: `${Math.random() * 6}s`,
            color: isLeaf ? leafColors[Math.floor(Math.random() * leafColors.length)] : colors[i % colors.length],
            shape: isLeaf ? 'leaf' : 'square',
        });
    }
    return pieces;
};

const BackgroundEffects = ({ showInitialConfetti }: { showInitialConfetti: boolean }) => {
    const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
    
    useEffect(() => {
        if (showInitialConfetti) {
            setConfetti(generateConfetti(120));
        } else {
            setConfetti([]);
        }
    }, [showInitialConfetti]);

    return (
        <>
            {/* Confetti */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50">
                {confetti.map(c => (
                    <div
                        key={c.id}
                        className="absolute"
                        style={{
                            width: c.shape === 'leaf' ? '12px' : '10px',
                            height: c.shape === 'leaf' ? '18px' : '10px',
                            backgroundColor: c.color,
                            opacity: 0.9,
                            left: c.left,
                            animation: `fall ${c.duration} linear infinite`,
                            animationDelay: c.delay,
                            clipPath: c.shape === 'leaf' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : 'none',
                        }}
                    />
                ))}
            </div>
            
            {/* Leaves */}
            <Leaf top="5%" left="2%" delay="0s" scale={0.7} rotate={-20} />
            <Leaf top="15%" right="3%" delay="1.2s" scale={1.1} rotate={15} />
            <Leaf top="80%" left="8%" delay="0.6s" scale={0.9} rotate={30} />
            <Leaf top="90%" right="5%" delay="1.8s" scale={0.8} rotate={-10} />
            <Leaf top="50%" left="1%" delay="2.5s" scale={1.0} rotate={5} />
            <Leaf top="60%" right="1%" delay="3s" scale={0.75} rotate={-25} />

            {/* Footprint Trail */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0 hidden md:block">
                <Footprint top="70%" left="10%" delay="0s" rotate={15} scaleX={1} />
                <Footprint top="65%" left="25%" delay="1s" rotate={-5} scaleX={-1} />
                <Footprint top="75%" left="40%" delay="2s" rotate={20} scaleX={1} />
                <Footprint top="60%" left="55%" delay="3s" rotate={0} scaleX={-1} />
                <Footprint top="80%" left="70%" delay="4s" rotate={10} scaleX={1} />
                <Footprint top="68%" left="85%" delay="5s" rotate={-15} scaleX={-1} />
            </div>
            
            {/* Decorative Dinos */}
            <div className="absolute top-5 right-5 w-36 h-auto opacity-20 z-0 pointer-events-none hidden lg:block transform -scale-x-100">
                <img src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%234A5568'%3E%3Cpath d='M85.6,28.1c-2.9-2.1-6.3-3.1-9.8-2.7c-3.5,0.4-6.7,2.1-9.1,4.5l-27.3,27.3c-1.4,1.4-3.3,2.2-5.3,2.2c-2,0-3.9-0.8-5.3-2.2 L14.4,45.1c-2.9-2.9-7.7-2.9-10.6,0s-2.9,7.7,0,10.6l14.4,14.4c2.9,2.9,6.8,4.5,10.9,4.5c4.1,0,8-1.6,10.9-4.5l27.3-27.3 c1.6-1.6,3.8-2.5,6.1-2.5c2.3,0,4.5,0.9,6.1,2.5c2.9,2.9,7.7,2.9,10.6,0C90.1,39.6,90.1,32.6,85.6,28.1z M50,10 C20,10 10,40 10,40 L30,60 L70,20 L50,10z M90,50 C90,80 60,90 60,90 L40,70 L80,30 L90,50z'/%3E%3C/svg%3E" alt="Pterodactyl silhouette" />
            </div>
            <div className="absolute bottom-1 left-2 w-48 h-auto opacity-20 z-0 pointer-events-none hidden lg:block">
                 <img src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%235A6673'%3E%3Cpath d='M80,60 C80,80 70,95 50,95 C30,95 20,80 20,60 C20,40 30,25 50,25 C70,25 80,40 80,60 Z M50,5 L50,25 M30,60 L10,50 M70,60 L90,50 M40,60 Q50,70 60,60 M45,30 Q50,20 55,30'/%3E%3C/svg%3E" alt="Brachiosaurus silhouette" />
            </div>
        </>
    );
};

export default BackgroundEffects;