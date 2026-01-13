import ObraVsPromessa from './components/ObraVsPromessa';
import StatusObra from './components/StatusObra';
import GalleriesSection from './components/GalleriesSection';
import AdminPanel from './components/AdminPanel';
import { ParticleBackground } from './components/ParticleBackground';
import { GlitchText } from './components/MatrixText';
import stateData from '../data/state.json';
import { ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSiteContent, updateSiteContent } from '../lib/supabase';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    // Check Admin Route
    if (window.location.pathname === '/admin') {
      setIsAdmin(true);
      return;
    }

    // Load content from Supabase
    console.log("🏠 HOME → Carregando conteúdo do Supabase...");
    getSiteContent()
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          console.log("✅ HOME → Conteúdo recebido do Supabase:", data);
          console.log("📊 HOME → Progresso Construtora:", data.statusObra?.progressoConstrutora);
          setContent(data);
        } else {
          console.warn("⚠️ HOME → Supabase retornou vazio ou null");
          console.log("📦 HOME → Usando dados de fallback (state.json)");
          // Não seta nada, deixa usar o fallback padrão do stateData
        }
      })
      .catch((error) => {
        console.error("❌ HOME → Erro ao carregar do Supabase:", error);
        console.log("📦 HOME → Usando fallback de state.json");
        // Não seta nada, deixa usar o fallback padrão do stateData
      });

  }, []);

  if (isAdmin) {
    return <AdminPanel />;
  }

  // Fallback data if content.json not loaded yet or failed
  const statusData = content?.statusObra ? {
    vitra: {
      total: Number(content.statusObra.progressoConstrutora),
      atualizacao: content.statusObra.dataAtualizacao,
      etapas: content.statusObra.etapas
    },
    caixa: { total: Number(content.statusObra.progressoCaixa) },
    nota: content.statusObra.textoExplicativo
  } : stateData.sindonaParaiso.metadata.status;

  const { comparacoes = stateData.sindonaParaiso.comparacoes, textos: footerText = {
    footerLegal: "Este relatório é um material visual independente, sem vínculo institucional ou comercial com a construtora ou com os produtores de conteúdo citados. As imagens foram coletadas exclusivamente de fontes públicas, com os devidos créditos aos autores.",
    textoEncerramento: "Fim do relatório",
    autoria: "Relatório visual independente desenvolvido por Roni Amorim de Lima.",
    contato: "roniamorim.ux@gmail.com"
  } } = content || {};

  return (
    // Snap Container Root
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black scroll-smooth">

      {/* SEÇÃO 1: HERO / CAPA */}
      <section className="min-h-screen md:h-screen w-full snap-start relative flex items-center justify-center bg-stone-950 text-white overflow-hidden py-12 md:py-0">
        {/* Particle Background - Desktop Only */}
        <ParticleBackground />

        {/* Background Abstract/Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-800 via-stone-950 to-black opacity-80" />

        <div className="relative z-10 text-center max-w-4xl px-4 md:px-6">
          <p className="font-mono text-stone-400 tracking-[0.3em] text-xs md:text-sm mb-4 md:mb-6 uppercase">
            Relatório Visual Independente
          </p>
          <h1 className="font-serif text-4xl md:text-8xl font-bold mb-6 md:mb-8 leading-tight">
            <span className="hidden md:inline">
              <GlitchText text="Sindona " className="text-white" />
              <GlitchText
                text="Paraíso"
                className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
              />
            </span>
            <span className="md:hidden">
              <GlitchText text="Sindona " className="text-white" triggerOnce />
              <GlitchText
                text="Paraíso"
                className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
                triggerOnce
              />
            </span>
          </h1>
          <p className="text-base md:text-2xl text-stone-300 font-light max-w-2xl mx-auto leading-relaxed px-4">
            Obra vs Promessa: Uma investigação visual detalhada comparando os renders artísticos com a realidade atual do canteiro.
          </p>

          <div className="mt-12 md:mt-16 animate-bounce hidden md:flex justify-center">
            <div className="flex flex-col items-center gap-2 text-stone-500">
              <span className="text-xs uppercase tracking-widest">Iniciar Leitura</span>
              <ArrowDown className="w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÕES DE COMPARAÇÃO */}
      {comparacoes.map((comparacao: any) => (
        <ObraVsPromessa
          key={comparacao.id}
          titulo={comparacao.titulo}
          promessa={comparacao.promessa}
          realidade={comparacao.realidade}
          analise={comparacao.analise}
          status={comparacao.status as any}
        />
      ))}

      {/* SEÇÃO 3: STATUS DETALHADO DA OBRA */}
      <StatusObra data={statusData} />

      {/* SEÇÃO 4: GALERIAS COMPLEMENTARES E FONTES */}
      <GalleriesSection externalContent={content} />

      {/* FOOTER / CONCLUSÃO */}
      <section className="min-h-[40vh] md:h-[50vh] w-full snap-start bg-black flex items-center justify-center p-6 md:p-8">
        <div className="text-center text-stone-500">
          {/* Refresh Trigger   */}
          <p className="mb-4 text-sm md:text-base">{footerText.textoEncerramento}</p>
          <p className="text-xs max-w-md mx-auto opacity-50 leading-relaxed">
            {footerText.footerLegal}
          </p>

          <div className="mt-8 md:mt-12 text-xs opacity-40 space-y-1">
            <p>{footerText.autoria.replace("Roni Amorim de Lima.", "")}</p>
            <p>Roni Amorim de Lima.</p>
            <p className="pt-2">Contato profissional:</p>
            <p>{footerText.contato}</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;