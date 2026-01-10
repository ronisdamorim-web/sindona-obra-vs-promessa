import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'; // Assuming we can use standard UI tabs or build simple ones
import { ArrowLeftRight, Building, Hammer, PaintBucket, ArrowDownToLine, MoveHorizontal, BedDouble, Ruler } from 'lucide-react';
import stateData from '../../data/state.json';

export function ProjectDetails() {
    const { projeto } = stateData;
    const [activeTab, setActiveTab] = useState('comparativo');

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">O Projeto</h1>
                <p className="text-gray-600">
                    Entenda o que está sendo construído com transparência total.
                    Compare o planejado com o real e explore as plantas.
                </p>
            </div>

            <div className="space-y-6">
                {/* Simple Custom Tabs */}
                <div className="flex p-1 bg-gray-100 rounded-lg w-full md:w-fit">
                    <button
                        onClick={() => setActiveTab('comparativo')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'comparativo'
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        Real x Projeto
                    </button>
                    <button
                        onClick={() => setActiveTab('plantas')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'plantas'
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        Plantas
                    </button>
                    <button
                        onClick={() => setActiveTab('fases')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'fases'
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        Entenda as Fases
                    </button>
                </div>

                {/* Content Area */}
                <div className="mt-6">

                    {/* ABA COMPARATIVO */}
                    {activeTab === 'comparativo' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {projeto.comparativos.map((item) => (
                                <Card key={item.id} className="overflow-hidden border-indigo-100">
                                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                                        <h3 className="font-bold text-gray-900">{item.titulo}</h3>
                                        <p className="text-xs text-gray-500 mt-1">{item.descricao}</p>
                                    </div>

                                    <div className="relative group h-64 md:h-80 cursor-ew-resize">
                                        {/* Imagem Real (Base) */}
                                        <div className="absolute inset-0">
                                            <img
                                                src={item.imagemReal}
                                                alt="Real"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute bottom-3 right-3">
                                                <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/80">Foto Real</Badge>
                                            </div>
                                        </div>

                                        {/* Imagem Simulação (Overlay com Clip-path ou Opacidade no Hover para simular slider simples) */}
                                        {/* Nota: Implementando um efeito de Hover simples para "Revelar" a simulação */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <img
                                                src={item.imagemSimulacao}
                                                alt="Projeto"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute bottom-3 left-3">
                                                <Badge variant="secondary" className="bg-indigo-600/90 text-white hover:bg-indigo-700">Projeto 3D</Badge>
                                            </div>
                                        </div>

                                        {/* Instrução */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md p-2 rounded-full text-white pointer-events-none group-hover:opacity-0 transition-opacity">
                                            <ArrowLeftRight className="size-6" />
                                        </div>
                                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/90 text-xs font-medium drop-shadow-md pointer-events-none">
                                            Passe o mouse para comparar
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* ABA PLANTAS */}
                    {activeTab === 'plantas' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {projeto.plantas.map((planta) => (
                                <Card key={planta.id} className="overflow-hidden hover:shadow-lg transition-all">
                                    <div className="aspect-[4/3] bg-gray-100 relative p-4 group">
                                        <img
                                            src={planta.imagemUrl}
                                            alt={planta.titulo}
                                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4 border-t border-gray-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-bold text-gray-900">{planta.titulo}</h3>
                                            <Badge variant="outline" className="border-indigo-200 text-indigo-700">{planta.area}m²</Badge>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <BedDouble className="size-4" />
                                                <span>{planta.quartos} Dorms</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Ruler className="size-4" />
                                                <span>{planta.area}m² Privativos</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* ABA FASES EDUCATIVAS */}
                    {activeTab === 'fases' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projeto.fasesEducativas.map((fase) => {
                                const Icon = fase.icon === 'ArrowDownToLine' ? ArrowDownToLine :
                                    fase.icon === 'Building' ? Building :
                                        fase.icon === 'BrickWall' ? MoveHorizontal : // Fallback visual
                                            PaintBucket;

                                return (
                                    <Card key={fase.id} className="p-6 hover:border-indigo-300 transition-colors group">
                                        <div className="flex gap-4">
                                            <div className="p-3 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors h-fit">
                                                <Icon className="size-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-2">{fase.titulo}</h3>
                                                <p className="text-sm text-gray-600 leading-relaxed">{fase.descricao}</p>
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
