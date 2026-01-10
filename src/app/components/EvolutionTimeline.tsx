import { Card } from './ui/card';

import { Badge } from './ui/badge';
import { Calendar, PlayCircle, Eye, ImageIcon, AlertCircle } from 'lucide-react';
import stateData from '../../data/state.json';

export function EvolutionTimeline() {
    const { marcos } = stateData;

    // Ordenar marcos (mais novo primeiro)
    const sortedMarcos = [...marcos].reverse();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Galeria de Evolução</h1>
                <p className="text-gray-600 max-w-2xl">
                    Acompanhe cada etapa da construção do Sindona Paraíso.
                    Transparência total desde a fundação até o acabamento.
                </p>
            </div>

            <div className="relative">
                {/* Linha vertical central */}
                <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-px bg-indigo-200" />

                <div className="space-y-12">
                    {sortedMarcos.map((marco, index) => {
                        const isFuture = marco.status === 'pendente';
                        const isLatest = index === 0 && !isFuture;

                        return (
                            <div key={marco.id} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}>
                                {/* Marcador Central */}
                                <div className="absolute left-4 md:left-1/2 -ml-3 md:-ml-3 w-6 h-6 rounded-full border-4 border-indigo-50 bg-indigo-600 z-10 shadow-sm mt-6"></div>

                                {/* Conteúdo - Lado Direito (ou Esquerdo alternado) */}
                                <div className="ml-12 md:ml-0 md:w-1/2 flex justify-center items-start px-4">
                                    <Card className={`w-full overflow-hidden hover:shadow-lg transition-all duration-300 ${isFuture ? 'opacity-75 border-dashed bg-gray-50' : 'border-indigo-100'
                                        }`}>

                                        {/* Media Area */}
                                        <div className="relative aspect-video bg-gray-200 group">
                                            {marco.tipo === 'video' ? (
                                                <iframe
                                                    src={marco.midiaUrl}
                                                    title={marco.titulo}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            ) : (
                                                <img
                                                    src={marco.midiaUrl}
                                                    alt={marco.titulo}
                                                    className={`w-full h-full object-cover transition-transform duration-700 ${!isFuture && 'group-hover:scale-105'
                                                        } ${isFuture && 'grayscale blur-[1px]'}`}
                                                />
                                            )}

                                            {/* Badges de Tipo */}
                                            <div className="absolute top-3 left-3 flex gap-2">
                                                {marco.tipo === 'simulacao' && (
                                                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                                                        <AlertCircle className="size-3 mr-1" /> Simulação 3D
                                                    </Badge>
                                                )}
                                                {marco.tipo === 'video' && (
                                                    <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
                                                        <PlayCircle className="size-3 mr-1" /> Vídeo
                                                    </Badge>
                                                )}
                                                {marco.tipo === 'foto' && (
                                                    <Badge variant="secondary" className="bg-white/90 text-gray-800 backdrop-blur-sm">
                                                        <ImageIcon className="size-3 mr-1" /> Foto Real
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-5">
                                            <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium mb-2">
                                                <Calendar className="size-4" />
                                                {marco.data}
                                                {isLatest && (
                                                    <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-wide font-bold">
                                                        Mais Recente
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{marco.titulo}</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {marco.descricao}
                                            </p>
                                        </div>
                                    </Card>
                                </div>

                                {/* Espaço Vazio para alinhamento alternado */}
                                <div className="hidden md:block md:w-1/2"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
