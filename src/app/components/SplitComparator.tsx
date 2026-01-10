import { useState, useRef, useEffect, MouseEvent, TouchEvent, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveHorizontal, ArrowLeftRight } from 'lucide-react';

interface SplitComparatorProps {
    promessa: {
        imagem: string;
        label: string;
    };
    realidade: {
        imagem: string;
        label: string;
    };
    className?: string;
}

export function SplitComparator({ promessa, realidade, className = '' }: SplitComparatorProps) {
    const [position, setPosition] = useState(50);
    const [isHovering, setIsHovering] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle resizing/interaction logic
    const updatePosition = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setPosition(percentage);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        // Only drag if mouse is down? Or follow mouse? 
        // User requested "arrastar". Usually implies drag. 
        // But for better desktop UX, follow-on-hover is often nicer or drag-handle.
        // Let's implement Drag behavior as standard for comparators.
        if (e.buttons === 1) { // Left click held
            updatePosition(e.clientX);
        }
    };

    // Mobile "Tap" support
    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        updatePosition(e.touches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        updatePosition(e.touches[0].clientX);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') setPosition(p => Math.max(0, p - 5));
        if (e.key === 'ArrowRight') setPosition(p => Math.min(100, p + 5));
    };

    // "Tap alterna" logic for click: 
    // If user clicks, move handle there.
    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        updatePosition(e.clientX);
    };

    return (
        <div
            className={`relative group select-none overflow-hidden rounded-xl bg-stone-100 shadow-2xl ring-1 ring-stone-900/5 ${className}`}
            onContextMenu={(e) => e.preventDefault()}
        >
            <div
                ref={containerRef}
                className="relative w-full aspect-[16/10] md:aspect-[21/9] cursor-col-resize touch-pan-y"
                onMouseDown={(e) => updatePosition(e.clientX)}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onClick={handleClick}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="slider"
                aria-valuenow={position}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Controle de comparação entre promessa e realidade"
            >

                {/* Layer 1: Realidade (Base / Right Side) */}
                <div className="absolute inset-0">
                    <img
                        src={realidade.imagem}
                        alt={realidade.label}
                        className="w-full h-full object-cover pointer-events-none"
                        draggable={false}
                    />
                    {/* Label Realidade */}
                    <div className="absolute bottom-6 right-6 z-10">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-stone-900/80 backdrop-blur-sm text-white text-xs md:text-sm font-medium border border-white/10 shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            {realidade.label}
                        </span>
                    </div>
                </div>

                {/* Layer 2: Promessa (Overlay / Left Side) - Clipped */}
                <div
                    className="absolute inset-0 z-20 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
                >
                    <img
                        src={promessa.imagem}
                        alt={promessa.label}
                        className="w-full h-full object-cover pointer-events-none"
                        draggable={false}
                    />
                    {/* Label Promessa */}
                    <div className="absolute bottom-6 left-6 z-30">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-stone-900/80 backdrop-blur-sm text-white text-xs md:text-sm font-medium border border-white/10 shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-indigo-500" />
                            {promessa.label}
                        </span>
                    </div>
                </div>

                {/* Slider Handle Line */}
                <div
                    className="absolute inset-y-0 z-40 w-1 bg-white cursor-col-resize pointer-events-none shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                    style={{ left: `${position}%` }}
                >
                    {/* Circular Handle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        <motion.div
                            animate={{ scale: isHovering || isFocused ? 1.1 : 1 }}
                            className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-stone-100/50 backdrop-blur-sm"
                        >
                            <ArrowLeftRight className="w-5 h-5 text-stone-700" />
                        </motion.div>
                    </div>

                    {/* Vertical Hints */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/50 hidden md:block" />
                </div>

                {/* Hint text on initial load or interaction */}
                <AnimatePresence>
                    {!isHovering && position === 50 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-10 z-50 pointer-events-none"
                        >
                            <div className="px-3 py-1 bg-black/50 text-white text-[10px] uppercase tracking-widest rounded-full backdrop-blur-sm">
                                Arraste
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
