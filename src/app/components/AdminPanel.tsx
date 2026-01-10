import { useState, useEffect } from "react";
import stateData from "../../data/state.json";
import { Reorder } from "framer-motion";
import { Save, GripVertical } from "lucide-react";
import { getSiteContent } from "../../lib/supabase";

export default function AdminPanel() {
    const [content, setContent] = useState<any>(null);
    const [promessaItems, setPromessaItems] = useState(stateData.sindonaParaiso.galeriasComplementares.promessa);
    const [obraItems, setObraItems] = useState(stateData.sindonaParaiso.galeriasComplementares.obra);
    const [loading, setLoading] = useState(true);

    // Load content from Supabase + TEST
    useEffect(() => {
        // TEST SUPABASE CONNECTION
        console.log("🔵 ADMIN → Carregando do Supabase...");
        getSiteContent()
            .then((supabaseData) => {
                if (supabaseData) {
                    console.log("✅ SUPABASE ADMIN CONTENT OK:", supabaseData);

                    // Fallback or Merge Logic for Comparacoes
                    if (!supabaseData.comparacoes) {
                        supabaseData.comparacoes = stateData.sindonaParaiso.comparacoes;
                    }
                    setContent(supabaseData);

                    // Load galleries from Supabase data
                    if (supabaseData.galerias?.promessa?.length > 0) {
                        const newOrder = supabaseData.galerias.promessa.map((filename: string) =>
                            stateData.sindonaParaiso.galeriasComplementares.promessa.find(item => item.src.includes(filename))
                        ).filter(Boolean);
                        const existingIds = new Set(newOrder.map((it: any) => it.id));
                        const leftovers = stateData.sindonaParaiso.galeriasComplementares.promessa.filter(it => !existingIds.has(it.id));
                        setPromessaItems([...newOrder, ...leftovers] as any);
                    }

                    if (supabaseData.galerias?.obraReal?.length > 0) {
                        const newOrder = supabaseData.galerias.obraReal.map((filename: string) =>
                            stateData.sindonaParaiso.galeriasComplementares.obra.find(item => item.src.includes(filename))
                        ).filter(Boolean);
                        const existingIds = new Set(newOrder.map((it: any) => it.id));
                        const leftovers = stateData.sindonaParaiso.galeriasComplementares.obra.filter(it => !existingIds.has(it.id));
                        setObraItems([...newOrder, ...leftovers] as any);
                    }

                    setLoading(false);
                } else {
                    console.warn("⚠️ SUPABASE returned null/empty - usando fallback");
                    loadFallbackData();
                }
            })
            .catch((supabaseError) => {
                console.error("❌ SUPABASE ERROR:", supabaseError);
                console.log("📦 Carregando dados de fallback (state.json)...");
                loadFallbackData();
            });
    }, []);

    // Função para carregar dados de fallback
    const loadFallbackData = () => {
        const fallbackContent = {
            statusObra: {
                progressoConstrutora: 15,
                dataAtualizacao: "17/12/2025",
                progressoCaixa: 29.96,
                textoExplicativo: "Os percentuais apresentados provêm de fontes distintas e podem utilizar critérios diferentes de medição de avanço físico.",
                etapas: {
                    preliminares: 100,
                    terraplanagem: 50,
                    fundacao: 60,
                    estrutura: 9,
                    alvenaria: 0,
                    hidraulica: 2.3,
                    eletrica: 3,
                    demais: 0
                }
            },
            informacoesProjeto: {
                status: "Em construção",
                localizacao: "Bussocaba — Osasco / SP",
                endereco: "R. Treze de Setembro, 27",
                tipologias: "2 e 3 quartos",
                tipologiasSub: "(até 1 suíte)",
                metragens: "50 a 104 m²",
                torres: "2 Torres",
                pavimentos: "Térreo + 20 Andares",
                vagas: "1 a 3 vagas",
                terreno: "4.830 m²"
            },
            textos: {
                avisoLegal: "Este relatório é um material visual independente.",
                footerLegal: "Este relatório é um material visual independente.",
                textoEncerramento: "Fim do relatório",
                autoria: "Relatório visual independente desenvolvido por Roni Amorim de Lima.",
                contato: "roniamorim.ux@gmail.com"
            },
            comparacoes: stateData.sindonaParaiso.comparacoes,
            galerias: {
                promessa: [],
                obraReal: []
            }
        };
        setContent(fallbackContent);
        setLoading(false);
    };

    const handleSave = async () => {
        if (!content) return;

        // Prepare payload
        const payload = {
            ...content,
            galerias: {
                promessa: promessaItems.map((item: any) => item.src.split("/").pop()),
                obraReal: obraItems.map((item: any) => item.src.split("/").pop())
            }
        };

        console.log("ADMIN → salvando conteúdo no Supabase:", payload);

        try {
            // Import updateSiteContent dynamically to avoid issues
            const { updateSiteContent } = await import("../../lib/supabase");

            await updateSiteContent(payload);

            console.log("✅ ADMIN → Conteúdo salvo com sucesso no Supabase");
            alert("✅ Alterações salvas com sucesso!\n\nO site público será atualizado automaticamente ao recarregar.");
        } catch (error) {
            console.error("❌ ADMIN → Erro ao salvar no Supabase:", error);
            alert(`❌ Erro ao salvar alterações:\n\n${error}\n\nVerifique o console para mais detalhes.`);
        }
    };

    const updateField = (section: string, field: string, value: any) => {
        setContent((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const updateEtapa = (field: string, value: any) => {
        setContent((prev: any) => ({
            ...prev,
            statusObra: {
                ...prev.statusObra,
                etapas: {
                    ...prev.statusObra.etapas,
                    [field]: Number(value)
                }
            }
        }));
    };

    const updateComparacao = (index: number, field: string, value: any, subField?: string) => {
        setContent((prev: any) => {
            const newComparacoes = [...prev.comparacoes];
            if (subField) {
                newComparacoes[index] = {
                    ...newComparacoes[index],
                    [field]: {
                        ...newComparacoes[index][field],
                        [subField]: value
                    }
                };
            } else {
                newComparacoes[index] = {
                    ...newComparacoes[index],
                    [field]: value
                };
            }
            return { ...prev, comparacoes: newComparacoes };
        });
    };

    if (loading) return <div className="p-8 text-white">Carregando painel...</div>;
    if (!content) return <div className="p-8 text-white">Erro ao carregar data/content.json</div>;

    return (
        <div className="min-h-screen bg-zinc-950 text-stone-200 p-8 pb-32">
            <header className="max-w-6xl mx-auto flex items-center justify-between mb-12 border-b border-white/10 pb-6 sticky top-0 bg-zinc-950/95 backdrop-blur z-50 pt-4">
                <div>
                    <h1 className="text-2xl font-serif text-white">Painel Administrativo</h1>
                    <p className="text-sm opacity-50">Edição Geral do Site</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded font-bold transition-colors shadow-lg shadow-indigo-500/20"
                >
                    <Save className="w-5 h-5" />
                    Salvar Alterações
                </button>
            </header>

            <main className="max-w-6xl mx-auto space-y-12">

                {/* SECTION 0: VISUAL COMPARISONS */}
                <section className="bg-zinc-900 border border-white/5 p-6 rounded-lg">
                    <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-2">Comparações Visuais (Obra vs Promessa)</h2>
                    <div className="space-y-12">
                        {content.comparacoes?.map((comp: any, idx: number) => (
                            <div key={idx} className="bg-black/40 p-6 rounded border border-white/5 space-y-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-lg text-white">Comparativo #{idx + 1}</h3>
                                    {/* Future: Add Delete Button */}
                                </div>

                                {/* Main Info */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest mb-2 text-stone-500">Título</label>
                                        <input
                                            type="text"
                                            value={comp.titulo}
                                            onChange={(e) => updateComparacao(idx, 'titulo', e.target.value)}
                                            className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-white focus:border-indigo-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest mb-2 text-stone-500">Status ID</label>
                                        <input
                                            type="text"
                                            value={comp.status}
                                            onChange={(e) => updateComparacao(idx, 'status', e.target.value)}
                                            className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-white opacity-50 focus:border-indigo-500 outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs uppercase tracking-widest mb-2 text-stone-500">Análise / Descrição</label>
                                        <textarea
                                            value={comp.analise}
                                            onChange={(e) => updateComparacao(idx, 'analise', e.target.value)}
                                            className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-white focus:border-indigo-500 outline-none h-20"
                                        />
                                    </div>
                                </div>

                                {/* Sides */}
                                <div className="grid md:grid-cols-2 gap-8 border-t border-white/5 pt-6">
                                    {/* Promessa */}
                                    <div className="space-y-3">
                                        <h4 className="text-indigo-400 font-bold text-sm uppercase">Lado Esquerdo (Promessa)</h4>
                                        <div>
                                            <label className="block text-xs text-stone-500 mb-1">Caminho da Imagem</label>
                                            <input
                                                type="text"
                                                value={comp.promessa.imagem}
                                                onChange={(e) => updateComparacao(idx, 'promessa', e.target.value, 'imagem')}
                                                className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-xs text-white"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-xs text-stone-500 mb-1">Label (Legenda)</label>
                                                <input
                                                    type="text"
                                                    value={comp.promessa.label}
                                                    onChange={(e) => updateComparacao(idx, 'promessa', e.target.value, 'label')}
                                                    className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-xs text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-stone-500 mb-1">Fonte</label>
                                                <input
                                                    type="text"
                                                    value={comp.promessa.fonte}
                                                    onChange={(e) => updateComparacao(idx, 'promessa', e.target.value, 'fonte')}
                                                    className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-xs text-white"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Realidade */}
                                    <div className="space-y-3">
                                        <h4 className="text-emerald-400 font-bold text-sm uppercase">Lado Direito (Realidade)</h4>
                                        <div>
                                            <label className="block text-xs text-stone-500 mb-1">Caminho da Imagem</label>
                                            <input
                                                type="text"
                                                value={comp.realidade.imagem}
                                                onChange={(e) => updateComparacao(idx, 'realidade', e.target.value, 'imagem')}
                                                className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-xs text-white"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-xs text-stone-500 mb-1">Label (Legenda)</label>
                                                <input
                                                    type="text"
                                                    value={comp.realidade.label}
                                                    onChange={(e) => updateComparacao(idx, 'realidade', e.target.value, 'label')}
                                                    className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-xs text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-stone-500 mb-1">Fonte</label>
                                                <input
                                                    type="text"
                                                    value={comp.realidade.fonte}
                                                    onChange={(e) => updateComparacao(idx, 'realidade', e.target.value, 'fonte')}
                                                    className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-xs text-white"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 1: STATUS DA OBRA */}
                <section className="bg-zinc-900 border border-white/5 p-6 rounded-lg">
                    <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-2">Status da Obra</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs uppercase tracking-widest mb-2 text-stone-500">Progresso Construtora (%)</label>
                            <input
                                type="number"
                                value={content.statusObra.progressoConstrutora}
                                onChange={(e) => updateField('statusObra', 'progressoConstrutora', e.target.value)}
                                className="w-full bg-black border border-white/10 rounded p-2 text-white focus:border-indigo-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest mb-2 text-stone-500">Progresso Caixa (%)</label>
                            <input
                                type="number"
                                value={content.statusObra.progressoCaixa}
                                onChange={(e) => updateField('statusObra', 'progressoCaixa', e.target.value)}
                                className="w-full bg-black border border-white/10 rounded p-2 text-white focus:border-indigo-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest mb-2 text-stone-500">Data Atualização</label>
                            <input
                                type="text"
                                value={content.statusObra.dataAtualizacao}
                                onChange={(e) => updateField('statusObra', 'dataAtualizacao', e.target.value)}
                                className="w-full bg-black border border-white/10 rounded p-2 text-white focus:border-indigo-500 outline-none"
                            />
                        </div>
                        <div className="md:col-span-3">
                            <label className="block text-xs uppercase tracking-widest mb-2 text-stone-500">Texto Explicativo (Nota)</label>
                            <textarea
                                value={content.statusObra.textoExplicativo}
                                onChange={(e) => updateField('statusObra', 'textoExplicativo', e.target.value)}
                                className="w-full bg-black border border-white/10 rounded p-2 text-white focus:border-indigo-500 outline-none h-20"
                            />
                        </div>
                    </div>

                    <h3 className="text-sm font-bold text-stone-400 mt-6 mb-4 uppercase">Etapas (%)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(content.statusObra.etapas).map(([key, val]) => (
                            <div key={key}>
                                <label className="block text-xs uppercase tracking-wider mb-1 text-stone-600">{key}</label>
                                <input
                                    type="number"
                                    value={val as number}
                                    onChange={(e) => updateEtapa(key, e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded p-2 text-white text-sm focus:border-indigo-500 outline-none"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 2: INFORMAÇÕES DO PROJETO */}
                <section className="bg-zinc-900 border border-white/5 p-6 rounded-lg">
                    <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-2">Informações Gerais do Projeto</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {Object.entries(content.informacoesProjeto).map(([key, val]) => (
                            <div key={key} className={key === 'endereco' ? 'md:col-span-2' : ''}>
                                <label className="block text-xs uppercase tracking-widest mb-2 text-stone-500">{key}</label>
                                <input
                                    type="text"
                                    value={val as string}
                                    onChange={(e) => updateField('informacoesProjeto', key, e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded p-2 text-white focus:border-indigo-500 outline-none"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 3: TEXTOS GERAIS */}
                <section className="bg-zinc-900 border border-white/5 p-6 rounded-lg">
                    <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-2">Textos Gerais & Rodapé</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase tracking-widest mb-2 text-stone-500">Aviso Legal (Fontes)</label>
                            <textarea
                                value={content.textos.avisoLegal}
                                onChange={(e) => updateField('textos', 'avisoLegal', e.target.value)}
                                className="w-full bg-black border border-white/10 rounded p-2 text-white focus:border-indigo-500 outline-none h-24"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest mb-2 text-stone-500">Rodapé Legal</label>
                            <textarea
                                value={content.textos.footerLegal}
                                onChange={(e) => updateField('textos', 'footerLegal', e.target.value)}
                                className="w-full bg-black border border-white/10 rounded p-2 text-white focus:border-indigo-500 outline-none h-24"
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase tracking-widest mb-2 text-stone-500">Autoria</label>
                                <input
                                    type="text"
                                    value={content.textos.autoria}
                                    onChange={(e) => updateField('textos', 'autoria', e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded p-2 text-white focus:border-indigo-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest mb-2 text-stone-500">Contato</label>
                                <input
                                    type="text"
                                    value={content.textos.contato}
                                    onChange={(e) => updateField('textos', 'contato', e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded p-2 text-white focus:border-indigo-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: GALERIAS (Visual) */}
                <section className="grid md:grid-cols-2 gap-8">
                    <div className="bg-zinc-900 border border-white/5 p-6 rounded-lg">
                        <h3 className="text-lg font-bold text-indigo-400 mb-4">Galeria Promessa</h3>
                        <Reorder.Group axis="y" values={promessaItems} onReorder={setPromessaItems} className="space-y-2 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {promessaItems.map((item: any) => (
                                <Reorder.Item key={item.id} value={item} className="bg-black border border-white/5 p-2 rounded flex items-center gap-3 cursor-move hover:border-indigo-500/30">
                                    <div className="text-white/20"><GripVertical className="w-4 h-4" /></div>
                                    <img src={item.src} className="w-12 h-8 object-cover rounded" />
                                    <span className="text-xs truncate text-stone-300">{item.title}</span>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    </div>

                    <div className="bg-zinc-900 border border-white/5 p-6 rounded-lg">
                        <h3 className="text-lg font-bold text-emerald-400 mb-4">Galeria Obra</h3>
                        <Reorder.Group axis="y" values={obraItems} onReorder={setObraItems} className="space-y-2 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {obraItems.map((item: any) => (
                                <Reorder.Item key={item.id} value={item} className="bg-black border border-white/5 p-2 rounded flex items-center gap-3 cursor-move hover:border-emerald-500/30">
                                    <div className="text-white/20"><GripVertical className="w-4 h-4" /></div>
                                    <img src={item.src} className="w-12 h-8 object-cover rounded" />
                                    <span className="text-xs truncate text-stone-300">{item.title}</span>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    </div>
                </section>

            </main>
        </div>
    );
}
