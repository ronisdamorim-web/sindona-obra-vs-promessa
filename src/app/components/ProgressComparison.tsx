import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Info } from 'lucide-react';

import stateData from '../../data/state.json';

export function ProgressComparison() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-indigo-700">Comparação de Cronogramas</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cronograma Caixa Detalhado */}
        <Card className="p-6 border-blue-300">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">
              📊 Cronograma Caixa Econômica
            </h3>
            <p className="text-sm text-gray-600">
              Medição oficial e certificada pela Caixa Econômica Federal
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-center py-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-6xl font-bold text-blue-600">29,96%</div>
              <div className="text-sm text-gray-600 mt-2">Obra Concluída</div>
            </div>

            <Progress value={29.96} className="h-3 bg-blue-200" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Fundação</span>
                <span className="font-semibold text-green-600">✓ Concluída</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estrutura</span>
                <span className="font-semibold text-green-600">✓ Concluída</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Alvenaria</span>
                <span className="font-semibold text-blue-600">⏱ Em Andamento</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Cronograma Construtora Detalhado */}
        <Card className="p-6 border-indigo-300">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">
              🏗️ Cronograma Vitra Engenharia
            </h3>
            <p className="text-sm text-gray-600">
              Acompanhamento interno da construtora
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Última atualização: 17/12/2025
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-center py-8 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-lg">
              <div className="text-6xl font-bold text-indigo-600">{stateData.generalProgress}%</div>
              <div className="text-sm text-gray-600 mt-2">Progresso Total</div>
            </div>

            <Progress value={stateData.generalProgress} className="h-3 bg-indigo-200" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Serviços Preliminares</span>
                <span className="font-semibold text-green-600">✓ 100%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fundação e Contenção</span>
                <span className="font-semibold text-green-600">✓ 60%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Terraplanagem</span>
                <span className="font-semibold text-blue-600">⏱ 50%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estrutura</span>
                <span className="font-semibold text-blue-600">⏱ 9%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Instalações Elétricas</span>
                <span className="font-semibold text-blue-600">⏱ 3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Instalações Hidráulicas</span>
                <span className="font-semibold text-blue-600">⏱ 2,3%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Explicação da Diferença */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Info className="size-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-2 text-blue-900">
              Por que os cronogramas são diferentes?
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Cronograma Caixa (29,96%):</strong> Reflete as etapas formalmente
                medidas, aprovadas e certificadas pela Caixa Econômica Federal. Este é o cronograma
                oficial usado para liberação de parcelas do financiamento. A Caixa utiliza sua
                própria metodologia de medição baseada em marcos contratuais.
              </p>
              <p>
                <strong>Cronograma Construtora (15%):</strong> Utiliza metodologia diferente de
                cálculo, ponderando todas as etapas da obra de forma proporcional ao custo total.
                Como as etapas iniciais (fundação, estrutura) têm peso menor no orçamento total
                comparado aos acabamentos, o percentual pode parecer menor mesmo com trabalhos avançados.
              </p>
              <p className="pt-2 border-t border-blue-200">
                <strong>Conclusão:</strong> A diferença entre os cronogramas é normal e esperada,
                pois cada um usa critérios e metodologias distintas de medição. Ambos são válidos
                e refletem o real andamento da obra sob perspectivas diferentes.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Gráfico Comparativo */}
      <Card className="p-6">
        <h4 className="font-semibold mb-4">Comparação Visual</h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-blue-700">Cronograma Caixa</span>
              <span className="text-sm font-bold text-blue-700">29,96%</span>
            </div>
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-end pr-3"
                style={{ width: '29.96%' }}
              >
                <span className="text-xs font-semibold text-white">29,96%</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-indigo-700">Cronograma Construtora</span>
              <span className="text-sm font-bold text-indigo-700">{stateData.generalProgress}%</span>
            </div>
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-end pr-3"
                style={{ width: `${stateData.generalProgress}%` }}
              >
                <span className="text-xs font-semibold text-white">{stateData.generalProgress}%</span>
              </div>
            </div>
          </div>

          <div className="pt-4 text-center">
            <p className="text-sm text-gray-600">
              Diferença: <span className="font-semibold text-indigo-600">14,96 pontos percentuais</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              (A Caixa está 14,96 pontos acima devido a metodologias distintas de cálculo)
            </p>
          </div>
        </div>
      </Card>

      {/* Detalhamento Completo da Construtora */}
      <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
        <h4 className="font-semibold mb-4 text-indigo-700">
          📋 Detalhamento Completo - Cronograma Vitra Engenharia (15%)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Serviços Preliminares e Canteiro', value: 100 },
            { name: 'Fundação e Contenção', value: 60 },
            { name: 'Terraplanagem/Movimentação de Terra', value: 50 },
            { name: 'Estrutura', value: 9 },
            { name: 'Instalações Elétricas', value: 3 },
            { name: 'Instalações Hidráulicas', value: 2.3 },
            { name: 'Alvenaria de Vedação/Paredes', value: 0 },
            { name: 'Impermeabilização', value: 0 },
            { name: 'Esquadrias/Serralheria', value: 0 },
            { name: 'Revestimentos/Acabamentos', value: 0 },
            { name: 'Paisagismo', value: 0 },
            { name: 'Limpeza Final', value: 0 },
          ].map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">{item.name}</span>
                <span className={`font-semibold ${item.value === 100 ? 'text-green-600' :
                  item.value > 0 ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                  {item.value}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.value === 100 ? 'bg-green-600' :
                    item.value > 0 ? 'bg-gradient-to-r from-indigo-500 to-blue-500' : 'bg-gray-300'
                    }`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}