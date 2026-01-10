import { motion } from 'framer-motion';
import { Ruler, Activity, AlertCircle } from 'lucide-react';

interface StatusObraProps {
    data: {
        vitra: {
            total: number;
            etapas: {
                preliminares: number;
                terraplanagem: number;
                fundacao: number;
                estrutura: number;
                alvenaria: number;
                hidraulica: number;
                eletrica: number;
                demais: number;
            };
            atualizacao: string;
        };
        caixa: {
            total: number;
        };
        nota: string;
    };
}

export default function StatusObra({ data }: StatusObraProps) {
    const etapas = [
        { label: "Serviços preliminares", valor: data.vitra.etapas.preliminares },
        { label: "Terraplanagem", valor: data.vitra.etapas.terraplanagem },
        { label: "Fundação", valor: data.vitra.etapas.fundacao },
        { label: "Estrutura", valor: data.vitra.etapas.estrutura },
        { label: "Alvenaria", valor: data.vitra.etapas.alvenaria },
        { label: "Inst. Hidráulicas", valor: data.vitra.etapas.hidraulica },
        { label: "Inst. Elétricas", valor: data.vitra.etapas.eletrica },
    ];

    return (
        <section className="h-screen w-full snap-start bg-zinc-950 flex items-center justify-center relative overflow-hidden text-stone-200">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/20 via-black to-black opacity-50" />

            <div className="max-w-6xl w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">

                {/* Esquerda: Números Macro */}
                <div className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-serif text-4xl md:text-6xl text-white mb-2">Status Atual</h2>
                        <p className="text-stone-500 font-mono text-sm tracking-widest uppercase">Evolução Física da Obra</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-6 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg"
                        >
                            <div className="flex items-center gap-2 mb-4 text-indigo-400">
                                <Ruler className="w-5 h-5" />
                                <span className="text-xs uppercase tracking-wider font-bold">Vitra Engenharia</span>
                            </div>
                            <div className="text-5xl font-light text-white mb-2">{data.vitra.total}%</div>
                            <div className="text-xs text-stone-500">Ref: {data.vitra.atualizacao}</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="p-6 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg"
                        >
                            <div className="flex items-center gap-2 mb-4 text-emerald-400">
                                <Activity className="w-5 h-5" />
                                <span className="text-xs uppercase tracking-wider font-bold">Caixa Econômica</span>
                            </div>
                            <div className="text-5xl font-light text-white mb-2">{data.caixa.total}%</div>
                            <div className="text-xs text-stone-500">Percentual Global</div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex gap-3 items-start text-stone-500 text-xs md:text-sm max-w-md"
                    >
                        <AlertCircle className="w-4 h-4 mt-0.5 text-stone-600 flex-shrink-0" />
                        <p>{data.nota}</p>
                    </motion.div>
                </div>

                {/* Direita: Detalhamento Vitra */}
                <div className="space-y-6">
                    <h3 className="text-stone-400 font-mono text-xs uppercase tracking-[0.2em] mb-6 border-b border-white/10 pb-2">
                        Detalhamento Técnico (Vitra)
                    </h3>

                    <div className="space-y-5">
                        {etapas.map((etapa, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * idx }}
                            >
                                <div className="flex justify-between text-sm mb-2 text-stone-300">
                                    <span>{etapa.label}</span>
                                    <span className="font-mono text-stone-500">{etapa.valor}%</span>
                                </div>
                                <div className="h-1 w-full bg-stone-900 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${etapa.valor}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-stone-100" // using white/stone for editorial look
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
