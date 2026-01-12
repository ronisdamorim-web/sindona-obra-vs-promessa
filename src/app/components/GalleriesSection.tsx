import { useState, useEffect, useRef, useCallback } from 'react';
import stateData from '../../data/state.json';
import {
    ExternalLink, Video, Image as ImageIcon, ChevronLeft, ChevronRight,
    X, Maximize2, MapPin, BedDouble, Ruler, Bath, Car, Trees, Building2, Layers, Hammer
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple utility to merge class names locally
function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}

interface GalleryItem {
    id: string;
    src: string;
    title: string;
}

interface HoverCarouselProps {
    items: GalleryItem[];
    type: 'promessa' | 'obra';
}

function HoverCarousel({ items, type }: HoverCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [showMobileHint, setShowMobileHint] = useState(true);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const isPromessa = type === 'promessa';
    const accentColor = isPromessa ? 'text-indigo-400' : 'text-emerald-400';
    const navHoverColor = isPromessa ? 'hover:text-indigo-400' : 'hover:text-emerald-400';
    const borderColor = isPromessa ? 'group-hover:border-indigo-500/50' : 'group-hover:border-emerald-500/50';

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    }, [items.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }, [items.length]);

    // Auto-play only when NOT zoomed and IS hovered
    useEffect(() => {
        if (isHovered && !isZoomed) {
            intervalRef.current = setInterval(nextSlide, 3000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isHovered, isZoomed, nextSlide]);

    // Hide mobile hint after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => setShowMobileHint(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    // Keyboard Navigation for Zoom Mode
    useEffect(() => {
        if (!isZoomed) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'Escape') setIsZoomed(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isZoomed, nextSlide, prevSlide]);

    // Touch Swipe Logic
    const touchStartX = useRef(0);
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX;
        if (Math.abs(diff) > 50) { // Threshold
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    };

    const handleClick = () => {
        setShowMobileHint(false);
        setIsZoomed(true);
    };

    return (
        <>
            {/* THUMBNAIL / CAROUSEL VIEW */}
            <div
                className="group relative w-full aspect-[4/3] bg-zinc-900 rounded-lg overflow-hidden border border-white/5 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:z-10 cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleClick}
            >
                <div className={cn("absolute inset-0 border-2 border-transparent transition-colors duration-300 pointer-events-none z-20", borderColor)} />

                {/* Mobile Hint Overlay */}
                {showMobileHint && (
                    <div className="md:hidden absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-40 transition-opacity duration-500">
                        <div className="bg-black/60 px-4 py-2 rounded-lg border border-white/20">
                            <p className="text-white/90 text-xs font-mono tracking-wide">
                                Toque para abrir
                            </p>
                        </div>
                    </div>
                )}

                {/* Images */}
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className={cn(
                            "absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out",
                            index === currentIndex ? "opacity-100" : "opacity-0"
                        )}
                    >
                        <img
                            src={item.src}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            draggable={false}
                        />
                        {/* Caption on Hover */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                            <p className={cn("text-xs font-bold uppercase tracking-widest", accentColor)}>
                                {index + 1} / {items.length} • {item.title}
                            </p>
                        </div>
                    </div>
                ))}

                {/* Hover Action Icon (Center) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
                    <div className="bg-black/50 p-3 rounded-full backdrop-blur-sm border border-white/10">
                        <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                </div>

                {/* Navigation Arrows (Visible on Hover - stopPropagation to avoid opening modal if clicking arrows) */}
                <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 z-30"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 z-30"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* FULLSCREEN ZOOM MODAL */}
            <AnimatePresence>
                {isZoomed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
                        onClick={() => setIsZoomed(false)} // Close on background click
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors p-2 z-50"
                            onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Main Image Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
                            onClick={(e) => e.stopPropagation()} // Prevent close when clicking image area
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            <img
                                src={items[currentIndex].src}
                                alt={items[currentIndex].title}
                                className="max-w-full max-h-full object-contain shadow-2xl rounded-sm select-none"
                                draggable={false}
                            />

                            {/* Nav Buttons (Floating) */}
                            <button
                                className={cn("absolute left-4 md:left-8 text-white/50 transition-colors p-4 hover:bg-white/5 rounded-full", navHoverColor)}
                                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                            >
                                <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" />
                            </button>
                            <button
                                className={cn("absolute right-4 md:right-8 text-white/50 transition-colors p-4 hover:bg-white/5 rounded-full", navHoverColor)}
                                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                            >
                                <ChevronRight className="w-10 h-10 md:w-12 md:h-12" />
                            </button>

                            {/* Image Counter (Minimalist) */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-1 rounded-full text-white/80 text-xs font-mono tracking-widest backdrop-blur-md">
                                {currentIndex + 1} / {items.length}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// ... imports ...

export default function GalleriesSection({ externalContent }: { externalContent?: any }) {
    const defaultPromessa = stateData.sindonaParaiso.galeriasComplementares.promessa;
    const defaultObra = stateData.sindonaParaiso.galeriasComplementares.obra;

    const [promessaItems, setPromessaItems] = useState(defaultPromessa);
    const [obraItems, setObraItems] = useState(defaultObra);

    // Fallback info if external Content is missing
    const info = externalContent?.informacoesProjeto || {
        status: "Em construção",
        localizacao: "Bussocaba — Osasco / SP",
        endereco: "R. Treze de Setembro, 27 – Jaguaribe, Osasco – SP, 06053-050",
        tipologias: "2 e 3 quartos",
        tipologiasSub: "(até 1 suíte)",
        metragens: "50 a 104 m²",
        torres: "2 Torres",
        pavimentos: "Térreo + 20 Andares",
        vagas: "1 a 3 vagas",
        terreno: "4.830 m²"
    };

    const textos = externalContent?.textos || {
        avisoLegal: "Imagens e frames extraídos de vídeos públicos do canteiro (2024–2025).",
        footerLegal: undefined
    };

    // Load order from externalContent if available
    useEffect(() => {
        if (externalContent?.galerias) {
            if (externalContent.galerias.promessa?.length > 0) {
                const newOrder = externalContent.galerias.promessa.map((filename: string) =>
                    defaultPromessa.find(item => item.src.includes(filename))
                ).filter(Boolean) as GalleryItem[];
                const existingIds = new Set(newOrder.map(it => it.id));
                const leftovers = defaultPromessa.filter(it => !existingIds.has(it.id));
                setPromessaItems([...newOrder, ...leftovers]);
            }
            if (externalContent.galerias.obraReal?.length > 0) {
                const newOrder = externalContent.galerias.obraReal.map((filename: string) =>
                    defaultObra.find(item => item.src.includes(filename))
                ).filter(Boolean) as GalleryItem[];
                const existingIds = new Set(newOrder.map(it => it.id));
                const leftovers = defaultObra.filter(it => !existingIds.has(it.id));
                setObraItems([...newOrder, ...leftovers]);
            }
        }
    }, [externalContent]);

    return (
        <section className="min-h-screen w-full snap-start bg-zinc-950 text-stone-200 py-12 md:py-16 px-4 md:px-12 flex flex-col justify-center border-t border-white/5">
            <div className="max-w-6xl mx-auto w-full space-y-12 md:space-y-16">

                {/* 0. INFORMAÇÕES GERAIS DO PROJETO */}
                <div>
                    <h2 className="text-xl md:text-2xl font-serif mb-6 md:mb-8 text-white border-b border-white/10 pb-4">
                        Projeto – Informações Gerais
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-sm text-stone-400">
                        {/* Status */}
                        <div className="flex flex-col gap-2 p-3 md:p-4 bg-zinc-900/30 rounded border border-white/5">
                            <Hammer className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
                            <div>
                                <span className="block text-white font-bold text-[10px] md:text-xs uppercase tracking-wider mb-1">Status</span>
                                <span className="text-xs md:text-sm">{info.status}</span>
                            </div>
                        </div>
                        {/* Location */}
                        <div className="flex flex-col gap-2 p-3 md:p-4 bg-zinc-900/30 rounded border border-white/5">
                            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
                            <div>
                                <span className="block text-white font-bold text-[10px] md:text-xs uppercase tracking-wider mb-1">Localização</span>
                                <span className="text-xs md:text-sm">{info.localizacao}</span>
                            </div>
                        </div>
                        {/* Dorms */}
                        <div className="flex flex-col gap-2 p-3 md:p-4 bg-zinc-900/30 rounded border border-white/5">
                            <BedDouble className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                            <div>
                                <span className="block text-white font-bold text-[10px] md:text-xs uppercase tracking-wider mb-1">Dormitórios</span>
                                <span className="text-xs md:text-sm">{info.tipologias}</span>
                                <span className="text-[10px] md:text-xs opacity-60 block">{info.tipologiasSub}</span>
                            </div>
                        </div>
                        {/* Area */}
                        <div className="flex flex-col gap-2 p-3 md:p-4 bg-zinc-900/30 rounded border border-white/5">
                            <Ruler className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                            <div>
                                <span className="block text-white font-bold text-[10px] md:text-xs uppercase tracking-wider mb-1">Área Privativa</span>
                                <span className="text-xs md:text-sm">{info.metragens}</span>
                            </div>
                        </div>
                        {/* Towers */}
                        <div className="flex flex-col gap-2 p-3 md:p-4 bg-zinc-900/30 rounded border border-white/5">
                            <Building2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                            <div>
                                <span className="block text-white font-bold text-[10px] md:text-xs uppercase tracking-wider mb-1">Torres</span>
                                <span className="text-xs md:text-sm">{info.torres}</span>
                            </div>
                        </div>
                        {/* Floors */}
                        <div className="flex flex-col gap-2 p-3 md:p-4 bg-zinc-900/30 rounded border border-white/5">
                            <Layers className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                            <div>
                                <span className="block text-white font-bold text-[10px] md:text-xs uppercase tracking-wider mb-1">Pavimentos</span>
                                <span className="text-xs md:text-sm">{info.pavimentos}</span>
                            </div>
                        </div>
                        {/* Parking */}
                        <div className="flex flex-col gap-2 p-3 md:p-4 bg-zinc-900/30 rounded border border-white/5">
                            <Car className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                            <div>
                                <span className="block text-white font-bold text-[10px] md:text-xs uppercase tracking-wider mb-1">Vagas</span>
                                <span className="text-xs md:text-sm">{info.vagas}</span>
                            </div>
                        </div>
                        {/* Terrain */}
                        <div className="flex flex-col gap-2 p-3 md:p-4 bg-zinc-900/30 rounded border border-white/5">
                            <Trees className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                            <div>
                                <span className="block text-white font-bold text-[10px] md:text-xs uppercase tracking-wider mb-1">Terreno</span>
                                <span className="text-xs md:text-sm">{info.terreno}</span>
                            </div>
                        </div>

                        {/* Full Width Address */}
                        <div className="col-span-1 sm:col-span-2 md:col-span-4 p-3 md:p-4 bg-zinc-900/30 rounded border border-white/5 flex items-start gap-3">
                            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-rose-400 shrink-0 mt-0.5" />
                            <div>
                                <span className="block text-white font-bold text-[10px] md:text-xs uppercase tracking-wider mb-1">Endereço do Estande / Obra</span>
                                <span className="text-xs md:text-sm text-stone-300">{info.endereco}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 1. SEÇÃO DE GALERIAS */}
                <div>
                    <h2 className="text-xl md:text-2xl font-serif mb-6 md:mb-8 text-white border-b border-white/10 pb-4">
                        Galerias Complementares
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Coluna Esquerda: Promessa + Fonte */}
                        <div className="space-y-4 md:space-y-6">
                            {/* Galeria Promessa */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-indigo-400 mb-2">
                                    <ImageIcon className="w-4 h-4" />
                                    <h3 className="uppercase tracking-widest text-xs font-bold">Galeria Promessa</h3>
                                </div>
                                <HoverCarousel items={promessaItems} type="promessa" />
                                <p className="text-xs text-stone-500 font-mono text-center md:text-left mt-2 hidden md:block opacity-0 hover:opacity-100 transition-opacity mb-2">
                                    Role sobre a imagem para navegar
                                </p>
                            </div>

                            {/* Fonte Promessa */}
                            <div className="pt-4 md:pt-6 border-t border-white/10 text-stone-500 text-xs md:text-sm">
                                <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" />
                                    Materiais Ilustrativos (Projeto / Promessa)
                                </h3>
                                <p className="mb-2">
                                    Perspectivas artísticas e implantação retiradas do material publicitário oficial do empreendimento
                                    <strong className="text-stone-300"> Sindona Paraíso</strong>.
                                </p>
                                <div className="flex flex-col gap-1">
                                    <a href="https://apto.vc/br/sp/osasco/bussocaba/sindona-paraiso" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors">
                                        Fonte das Imagens <ExternalLink className="w-3 h-3" />
                                    </a>
                                    <a href="https://vitraengenharia.com.br/empreendimento/sin-paraiso/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-stone-400 hover:text-white transition-colors text-xs">
                                        Site da Construtora (Vitra)<ExternalLink className="w-3 h-3" />
                                    </a>
                                    <a href="https://apto.vc/br/sp/osasco/bussocaba/sindona-paraiso" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-stone-400 hover:text-white transition-colors text-xs">
                                        apto.vc – Sindona Paraíso <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Coluna Direita: Obra Real + Fonte */}
                        <div className="space-y-4 md:space-y-6">
                            {/* Galeria Obra Real */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                                    <Video className="w-4 h-4" />
                                    <h3 className="uppercase tracking-widest text-xs font-bold">Galeria Obra Atual</h3>
                                </div>
                                <HoverCarousel items={obraItems} type="obra" />
                            </div>

                            {/* Fonte Obra Real */}
                            <div className="pt-4 md:pt-6 border-t border-white/10 text-stone-500 text-xs md:text-sm">
                                <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-2">
                                    <Video className="w-4 h-4" />
                                    Registro Visual da Obra (Real)
                                </h3>
                                <p className="mb-2">
                                    Imagens capturadas e compiladas a partir de registros públicos do youtuber
                                    <strong className="text-stone-300"> Wally Nunes (Walisson Nunes)</strong>.
                                </p>
                                <a href="https://www.youtube.com/@walissonnunes2901" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors">
                                    Acessar Canal Oficial <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
