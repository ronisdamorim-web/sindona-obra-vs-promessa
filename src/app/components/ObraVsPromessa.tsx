import { useState, useRef, MouseEvent, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveHorizontal, ChevronDown, Info } from 'lucide-react';

interface ObraVsPromessaProps {
    titulo: string;
    promessa: {
        imagem: string;
        label: string;
        fonte: string;
    };
    realidade: {
        imagem: string;
        label: string;
        fonte: string;
    };
    analise: string;
    status: 'executado' | 'em-execucao' | 'nao-identificavel';
}

export default function ObraVsPromessa({
    titulo,
    promessa,
    realidade,
    analise,
}: ObraVsPromessaProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [showInfo, setShowInfo] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const updatePosition = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (e.buttons === 1) updatePosition(e.clientX);
    };

    const handleInteractionStart = () => setShowInfo(false);

    return (
        <section
            className="relative w-full h-[60vh] md:h-[100vh] snap-start overflow-hidden bg-black select-none"
            ref={containerRef}
            onMouseDown={(e) => { handleInteractionStart(); updatePosition(e.clientX); }}
            onMouseMove={handleMouseMove}
            onTouchStart={(e) => { handleInteractionStart(); updatePosition(e.touches[0].clientX); }}
            onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
        >

            {/* 1. LAYER REALIDADE (Fundo / Direita) */}
            <div className="absolute inset-0">
                <img
                    src={realidade.imagem}
                    alt={realidade.label}
                    className="w-full h-full object-cover"
                    draggable={false}
                />
                {/* Label Realidade (Floating) */}
                <div className="absolute top-1/2 right-2 md:right-12 -translate-y-1/2 z-10 pointer-events-none">
                    <span className="text-white/90 font-mono text-[10px] md:text-sm tracking-widest uppercase bg-black/40 px-2 py-1 md:px-3 backdrop-blur-md rounded border-r-2 border-red-500">
                        {realidade.label}
                    </span>
                </div>
            </div>

            {/* 2. LAYER PROMESSA (Topo / Esquerda - Clipped) */}
            <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img
                    src={promessa.imagem}
                    alt={promessa.label}
                    className="w-full h-full object-cover"
                    draggable={false}
                />

                {/* Source Credit Promessa */}
                <div className="absolute bottom-20 md:bottom-32 left-2 md:left-12 z-20 pointer-events-none opacity-60">
                    <p className="text-[8px] md:text-[10px] text-white font-mono max-w-[150px] md:max-w-xs leading-tight bg-black/30 p-1 backdrop-blur-sm">
                        {promessa.fonte}
                    </p>
                </div>

                {/* Label Promessa (Floating) */}
                <div className="absolute top-1/2 left-2 md:left-12 -translate-y-1/2 z-10 pointer-events-none">
                    <span className="text-white/90 font-mono text-[10px] md:text-sm tracking-widest uppercase bg-black/40 px-2 py-1 md:px-3 backdrop-blur-md rounded border-l-2 border-indigo-500">
                        {promessa.label}
                    </span>
                </div>
            </div>

            {/* Source Credit Realidade (Right Side) */}
            <div className="absolute bottom-20 md:bottom-32 right-2 md:right-12 z-20 pointer-events-none opacity-60 text-right">
                <p className="text-[8px] md:text-[10px] text-white font-mono max-w-[150px] md:max-w-xs leading-tight ml-auto bg-black/30 p-1 backdrop-blur-sm">
                    {realidade.fonte}
                </p>
            </div>

            {/* 3. SLIDER HANDLE */}
            <div
                className="absolute inset-y-0 w-0.5 md:w-1 bg-white/80 cursor-col-resize z-20 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-2xl flex items-center justify-center cursor-ew-resize hover:scale-110 transition-transform">
                    <MoveHorizontal className="w-4 h-4 md:w-5 md:h-5 text-black" />
                </div>
            </div>

            {/* 4. OVERLAY INFORMATIVO (Bottom) */}
            <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-16 md:pt-32 pb-6 md:pb-12 px-4 md:px-12 pointer-events-none">
                <div className="max-w-4xl mx-auto text-center md:text-left transition-opacity duration-500">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="font-serif text-xl md:text-5xl text-white mb-2 md:mb-4 leading-tight">
                            {titulo}
                        </h2>
                        <p className="text-white/80 text-sm md:text-xl font-light leading-relaxed max-w-2xl drop-shadow-lg">
                            {analise}
                        </p>
                    </motion.div>

                    <AnimatePresence>
                        {showInfo && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="mt-3 md:mt-6 flex items-center gap-2 text-white/50 text-xs md:text-sm font-mono justify-center md:justify-start"
                            >
                                <Info className="w-3 h-3 md:w-4 md:h-4" />
                                <span className="hidden md:inline">Arraste para comparar • Role para continuar</span>
                                <span className="md:hidden">Arraste para comparar</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>

            {/* Scroll Hint */}
            <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 text-white/30 animate-bounce pointer-events-none z-30">
                <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
            </div>

        </section>
    );
}
