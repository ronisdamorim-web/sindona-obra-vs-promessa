import { useState, useRef, MouseEvent, TouchEvent, useEffect } from 'react';
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
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

    if (isMobile) {
        return (
            <section className="w-full snap-start bg-black text-white py-6 px-4 overflow-x-hidden">
                <div className="max-w-2xl mx-auto">
                    {/* Título e Análise */}
                    <div className="mb-8 text-center">
                        <h2 className="font-serif text-2xl text-white mb-4 leading-tight">
                            {titulo}
                        </h2>
                        <p className="text-white/80 text-base font-light leading-relaxed">
                            {analise}
                        </p>
                    </div>

                    {/* Promessa */}
                    <div className="mb-8">
                        <div className="relative w-full overflow-hidden rounded-lg">
                            <img
                                src={promessa.imagem}
                                alt={promessa.label}
                                className="w-full h-auto object-cover"
                                draggable={false}
                            />
                            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded">
                                <span className="text-indigo-400 font-mono text-xs tracking-wider uppercase font-bold">
                                    {promessa.label}
                                </span>
                            </div>
                        </div>
                        <p className="text-xs text-white/50 font-mono mt-2 text-center leading-tight">
                            {promessa.fonte}
                        </p>
                    </div>

                    {/* Realidade */}
                    <div className="mb-8">
                        <div className="relative w-full overflow-hidden rounded-lg">
                            <img
                                src={realidade.imagem}
                                alt={realidade.label}
                                className="w-full h-auto object-cover"
                                draggable={false}
                            />
                            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded">
                                <span className="text-red-400 font-mono text-xs tracking-wider uppercase font-bold">
                                    {realidade.label}
                                </span>
                            </div>
                        </div>
                        <p className="text-xs text-white/50 font-mono mt-2 text-center leading-tight">
                            {realidade.fonte}
                        </p>
                    </div>


                </div>
            </section>
        );
    }

    return (
        <section
            className="relative w-full h-[100vh] snap-start overflow-hidden bg-black select-none"
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
                <div className="absolute top-1/2 right-4 md:right-12 -translate-y-1/2 z-10 pointer-events-none">
                    <span className="text-white/90 font-mono text-sm tracking-widest uppercase bg-black/40 px-3 py-1 backdrop-blur-md rounded border-r-2 border-red-500">
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
                <div className="absolute bottom-32 left-4 md:left-12 z-20 pointer-events-none opacity-60">
                    <p className="text-[10px] text-white font-mono max-w-xs leading-tight bg-black/30 p-1 backdrop-blur-sm">
                        {promessa.fonte}
                    </p>
                </div>

                {/* Label Promessa (Floating) */}
                <div className="absolute top-1/2 left-4 md:left-12 -translate-y-1/2 z-10 pointer-events-none">
                    <span className="text-white/90 font-mono text-sm tracking-widest uppercase bg-black/40 px-3 py-1 backdrop-blur-md rounded border-l-2 border-indigo-500">
                        {promessa.label}
                    </span>
                </div>
            </div>

            {/* Source Credit Realidade (Right Side) */}
            <div className="absolute bottom-32 right-4 md:right-12 z-20 pointer-events-none opacity-60 text-right">
                <p className="text-[10px] text-white font-mono max-w-xs leading-tight ml-auto bg-black/30 p-1 backdrop-blur-sm">
                    {realidade.fonte}
                </p>
            </div>

            {/* 3. SLIDER HANDLE */}
            <div
                className="absolute inset-y-0 w-1 bg-white/80 cursor-col-resize z-20 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center cursor-ew-resize hover:scale-110 transition-transform">
                    <MoveHorizontal className="w-5 h-5 text-black" />
                </div>
            </div>

            {/* 4. OVERLAY INFORMATIVO (Bottom) */}
            <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-32 pb-12 px-6 md:px-12 pointer-events-none">
                <div className="max-w-4xl mx-auto text-center md:text-left transition-opacity duration-500">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="font-serif text-3xl md:text-5xl text-white mb-4 leading-tight">
                            {titulo}
                        </h2>
                        <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl drop-shadow-lg">
                            {analise}
                        </p>
                    </motion.div>

                    <AnimatePresence>
                        {showInfo && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="mt-6 flex items-center gap-2 text-white/50 text-sm font-mono justify-center md:justify-start"
                            >
                                <Info className="w-4 h-4" />
                                <span>Arraste para comparar • Role para continuar</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>

            {/* Scroll Hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 animate-bounce pointer-events-none z-30">
                <ChevronDown className="w-6 h-6" />
            </div>

        </section>
    );
}
