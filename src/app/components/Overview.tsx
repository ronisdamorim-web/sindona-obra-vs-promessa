import { Building2, MapPin, Calendar, ArrowRight, Home, Map } from 'lucide-react';
import { Progress } from './ui/progress';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

import stateData from '../../data/state.json';

export function Overview() {
  const { obra, destaques, progressoDetalhado, proximosPassos, marcos } = stateData;

  // Filtrar marcos recentes (últimos 3)
  const recentUpdates = marcos
    .filter(m => m.status === 'concluido' || m.status === 'em_andamento')
    .slice(-3)
    .reverse();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* SEÇÃO 1: HERO - STATUS IMEDIATO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Principal: Status e Info Básica */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{obra.nome}</h1>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <MapPin className="size-4 text-indigo-600" />
              <span>{obra.localizacao}</span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
              {obra.descricao}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-5 border-l-4 border-l-indigo-600 bg-white shadow-sm hover:shadow-md transition-all">
              <div className="text-sm font-medium text-gray-500 mb-1">Fase Atual</div>
              <div className="font-bold text-indigo-700 text-lg">{obra.faseAtual}</div>
            </Card>
            <Card className="p-5 border-l-4 border-l-emerald-500 bg-white shadow-sm hover:shadow-md transition-all">
              <div className="text-sm font-medium text-gray-500 mb-1">Status</div>
              <div className="font-bold text-emerald-700 text-lg">{obra.status}</div>
            </Card>
            <Card className="p-5 border-l-4 border-l-blue-500 bg-white shadow-sm hover:shadow-md transition-all">
              <div className="text-sm font-medium text-gray-500 mb-1">Previsão</div>
              <div className="font-bold text-blue-700 text-lg">{obra.previsaoEntrega}</div>
            </Card>
          </div>
        </div>

        {/* Coluna Lateral: Destaque da Semana / Imagem */}
        <div className="lg:col-span-1">
          <Card className="h-full bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-indigo-200 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Última Atualização
              </div>
              <h3 className="text-xl font-bold mb-3">{destaques.titulo}</h3>
              <p className="text-indigo-100/90 text-sm leading-relaxed mb-6">
                "{destaques.mensagem}"
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10">
              <div className="text-xs text-indigo-300 font-medium">Data do registro</div>
              <div className="text-sm font-semibold">{destaques.data}</div>
            </div>
          </Card>
        </div>
      </div>

      {/* SEÇÃO 2 e 3: RAIO-X e LINHA DO TEMPO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Coluna Esquerda: Raio-X Técnico (2/3 da largura) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Building2 className="size-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Raio-X da Obra</h3>
              </div>
              <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 font-bold px-3 py-1">
                {obra.progressoGeral}% Concluído
              </Badge>
            </div>

            <div className="space-y-5">
              {/* Barra de Progresso Geral */}
              <div className="mb-8">
                <Progress value={obra.progressoGeral} className="h-3 bg-gray-100" />
              </div>

              {/* Detalhamento Técnico */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Fundação</span>
                    <span className="text-gray-500">{progressoDetalhado.fundacao}%</span>
                  </div>
                  <Progress value={progressoDetalhado.fundacao} className="h-2 bg-gray-100" indicatorClassName={progressoDetalhado.fundacao === 100 ? 'bg-green-500' : 'bg-indigo-600'} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Estrutura</span>
                    <span className="text-gray-500">{progressoDetalhado.estrutura}%</span>
                  </div>
                  <Progress value={progressoDetalhado.estrutura} className="h-2 bg-gray-100" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Alvenaria</span>
                    <span className="text-gray-500">{progressoDetalhado.alvenaria}%</span>
                  </div>
                  <Progress value={progressoDetalhado.alvenaria} className="h-2 bg-gray-100" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Instalações</span>
                    <span className="text-gray-500">{progressoDetalhado.instalacoes}%</span>
                  </div>
                  <Progress value={progressoDetalhado.instalacoes} className="h-2 bg-gray-100" indicatorClassName="bg-amber-500" />
                </div>
              </div>
            </div>
          </Card>

          {/* Card de Diferenciais/Info que já existia, mas compactado */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4 bg-gray-50 border-gray-200 flex items-center justify-center text-center">
              <div>
                <div className="font-semibold text-gray-900 text-sm">Segurança Total</div>
                <div className="text-xs text-gray-500 mt-1">Portaria 24h</div>
              </div>
            </Card>
            <Card className="p-4 bg-gray-50 border-gray-200 flex items-center justify-center text-center">
              <div>
                <div className="font-semibold text-gray-900 text-sm">Lazer Completo</div>
                <div className="text-xs text-gray-500 mt-1">Piscina e Deck</div>
              </div>
            </Card>
            <Card className="p-4 bg-gray-50 border-gray-200 flex items-center justify-center text-center">
              <div>
                <div className="font-semibold text-gray-900 text-sm">Vitra Engenharia</div>
                <div className="text-xs text-gray-500 mt-1">Qualidade Garantida</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Coluna Direita: Feed Recente e Próximos Passos (1/3 da largura) */}
        <div className="space-y-6">

          {/* Próximos Passos */}
          <Card className="p-5 border-l-4 border-l-amber-400 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ArrowRight className="size-5 text-amber-500" />
              Próximos Passos
            </h3>
            <ul className="space-y-3">
              {proximosPassos.map((passo, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 flex-shrink-0"></span>
                  {passo}
                </li>
              ))}
            </ul>
          </Card>

          {/* Atividades Recentes (Mini Timeline) */}
          <Card className="p-5 border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="size-5 text-indigo-600" />
              <h3 className="font-bold text-gray-900">Atividades Recentes</h3>
            </div>

            <div className="relative pl-2 space-y-6">
              {/* Linha vertical */}
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-100"></div>

              {recentUpdates.map((update) => (
                <div key={update.id} className="relative pl-6">
                  <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 ${update.status === 'concluido' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></div>

                  <div className="text-xs text-gray-500 font-medium mb-0.5">{update.data}</div>
                  <div className="text-sm font-semibold text-gray-900">{update.titulo}</div>
                  {update.descricao && (
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {update.descricao}
                    </p>
                  )}
                </div>
              ))}

              <div className="relative pl-6 pt-2">
                <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1">
                  Ver linha do tempo completa <ArrowRight className="size-3" />
                </button>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}