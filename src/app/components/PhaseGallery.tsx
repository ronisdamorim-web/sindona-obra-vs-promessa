import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle2, Clock, Circle, ExternalLink } from 'lucide-react';

interface PhaseData {
  name: string;
  description: string;
  status: string;
  percentage: number;
  details: string[];
}

const phases: PhaseData[] = [
  {
    name: 'Estrutura de Concreto',
    description: 'Estrutura em concreto armado com pilares, vigas e lajes. Sistema estrutural em andamento.',
    status: 'Em andamento',
    percentage: 9,
    details: [
      'Fundação e contenção: 60% concluída',
      'Terraplanagem: 50% concluída',
      'Estrutura de concreto: 9% em execução',
      'Concretagem de pilares e vigas iniciada',
      'Lajes em fase inicial de execução',
    ],
  },
  {
    name: 'Serviços Preliminares',
    description: 'Preparação do terreno e instalação do canteiro de obras.',
    status: 'Concluída',
    percentage: 100,
    details: [
      'Canteiro de obras instalado',
      'Ligações provisórias de água e energia',
      'Tapumes e proteções instaladas',
      'Infraestrutura de apoio completa',
    ],
  },
  {
    name: 'Fundação e Contenção',
    description: 'Fundações profundas em estacas e sistema de contenção.',
    status: 'Em andamento',
    percentage: 60,
    details: [
      'Estacas tipo hélice contínua em execução',
      'Blocos de fundação em andamento',
      'Sistema de contenção instalado',
      'Impermeabilização em processo',
    ],
  },
  {
    name: 'Instalações Iniciais',
    description: 'Início das instalações elétricas e hidráulicas.',
    status: 'Em andamento',
    percentage: 3,
    details: [
      'Instalações elétricas: 3% iniciadas',
      'Instalações hidráulicas: 2,3% iniciadas',
      'Prumadas em fase inicial',
      'Projeto executivo em implementação',
    ],
  },
  {
    name: 'Alvenaria e Acabamentos',
    description: 'Vedação, revestimentos e acabamentos finais.',
    status: 'Próxima',
    percentage: 0,
    details: [
      'Aguardando avanço da estrutura',
      'Alvenaria de vedação: 0%',
      'Revestimentos: 0%',
      'Esquadrias e acabamentos: 0%',
      'Previsão de início: após conclusão da estrutura',
    ],
  },
];

export function PhaseGallery() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-indigo-700 mb-2">Fases da Obra</h2>
        <p className="text-gray-600">
          Acompanhe o detalhamento de cada fase da construção do Sindona Paraíso com informações 
          reais sobre o andamento dos trabalhos.
        </p>
      </div>

      {/* Indicadores Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="size-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-700">2</div>
              <div className="text-sm text-gray-600">Fases Concluídas</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3">
            <Clock className="size-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-blue-700">3</div>
              <div className="text-sm text-gray-600">Fases em Andamento</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gray-50 border-gray-200">
          <div className="flex items-center gap-3">
            <Circle className="size-8 text-gray-600" />
            <div>
              <div className="text-2xl font-bold text-gray-700">1</div>
              <div className="text-sm text-gray-600">Fase Futura</div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Detalhamento das Fases */}
      {phases.map((phase, index) => (
        <Card key={index} className="p-6 border-indigo-200 hover:shadow-lg transition-shadow">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold">{phase.name}</h3>
              <Badge
                variant={
                  phase.status === 'Concluída'
                    ? 'default'
                    : phase.status === 'Em andamento'
                    ? 'secondary'
                    : 'outline'
                }
                className={phase.status === 'Concluída' ? 'bg-green-600' : phase.status === 'Em andamento' ? 'bg-blue-600' : ''}
              >
                {phase.status}
              </Badge>
            </div>
            <p className="text-gray-600 mb-4">{phase.description}</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 bg-indigo-100 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    phase.status === 'Concluída' 
                      ? 'bg-green-600' 
                      : phase.status === 'Em andamento' 
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600' 
                      : 'bg-gray-400'
                  }`}
                  style={{ width: `${phase.percentage}%` }}
                />
              </div>
              <span className="font-semibold text-sm w-12 text-right">{phase.percentage}%</span>
            </div>
          </div>
          
          {/* Detalhes da Fase */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-indigo-700">Detalhes:</h4>
            <ul className="space-y-2">
              {phase.details.map((detail, detailIndex) => (
                <li key={detailIndex} className="flex items-start gap-2 text-sm">
                  <span className={`mt-1 ${
                    phase.status === 'Concluída' 
                      ? 'text-green-600' 
                      : phase.status === 'Em andamento' 
                      ? 'text-blue-600' 
                      : 'text-gray-500'
                  }`}>
                    {phase.status === 'Concluída' ? '✓' : phase.status === 'Em andamento' ? '•' : '○'}
                  </span>
                  <span className="text-gray-700">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ))}

      {/* Link para mais informações */}
      <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <h3 className="font-semibold mb-3 text-indigo-700">📸 Fotos Reais da Obra</h3>
        <p className="text-sm text-gray-700 mb-4">
          Para visualizar fotos reais e atualizadas de cada fase da obra do Sindona Paraíso, 
          acesse as fontes oficiais:
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://apto.vc/br/sp/osasco/bussocaba/sindona-paraiso"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <span>Acessar Apto.vc</span>
            <ExternalLink className="size-4" />
          </a>
          <a
            href="https://www.youtube.com/results?search_query=sindona+paraiso+osasco+obra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <span>Vídeos no YouTube</span>
            <ExternalLink className="size-4" />
          </a>
          <a
            href="https://vitraengenharia.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <span>Site Vitra Engenharia</span>
            <ExternalLink className="size-4" />
          </a>
        </div>
      </Card>
    </div>
  );
}