import { Card } from './ui/card';
import { ExternalLink, Camera, Video, FileText, Building2 } from 'lucide-react';

export function Comparison() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-indigo-700 mb-2">Comparação Visual</h2>
        <p className="text-gray-600">
          Acesse as fontes oficiais para visualizar comparações entre o projeto e o estágio atual da obra.
        </p>
      </div>
      
      {/* Card principal explicativo */}
      <Card className="p-8 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full">
            <Camera className="size-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-indigo-700">
            Fotos Reais do Empreendimento
          </h3>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Para visualizar comparações reais entre o projeto original e o andamento atual da obra, 
            acesse as fontes oficiais do Sindona Paraíso listadas abaixo.
          </p>
        </div>
      </Card>

      {/* Fontes para Comparação */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Projeto Original */}
        <Card className="p-6 border-indigo-300 hover:shadow-xl transition-all">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Building2 className="size-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-indigo-700">Projeto Original</h3>
            </div>
            <p className="text-sm text-gray-600">
              Visualize plantas, perspectivas artísticas, tour virtual 360° e o projeto arquitetônico 
              completo do Sindona Paraíso.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-700">
                <strong>Disponível em:</strong>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600">•</span>
                  <span>Plantas dos apartamentos (2 e 3 dorms)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600">•</span>
                  <span>Perspectivas artísticas renderizadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600">•</span>
                  <span>Tour virtual 360° (quando disponível)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600">•</span>
                  <span>Imagens da área de lazer planejada</span>
                </li>
              </ul>
            </div>
            <a
              href="https://apto.vc/br/sp/osasco/bussocaba/sindona-paraiso"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors w-full justify-center"
            >
              <FileText className="size-4" />
              <span>Ver Projeto no Apto.vc</span>
              <ExternalLink className="size-4" />
            </a>
          </div>
        </Card>

        {/* Obra Atual */}
        <Card className="p-6 border-purple-300 hover:shadow-xl transition-all">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Camera className="size-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-purple-700">Obra Atual</h3>
            </div>
            <p className="text-sm text-gray-600">
              Acompanhe o progresso real da construção através de fotos e vídeos do canteiro de obras 
              em diferentes estágios.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-700">
                <strong>Disponível em:</strong>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Fotos atualizadas da obra</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Vídeos do andamento mensal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Timelapse da evolução</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Registros das diferentes fases</span>
                </li>
              </ul>
            </div>
            <a
              href="https://www.youtube.com/results?search_query=sindona+paraiso+osasco+obra+andamento"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors w-full justify-center"
            >
              <Video className="size-4" />
              <span>Buscar Vídeos no YouTube</span>
              <ExternalLink className="size-4" />
            </a>
          </div>
        </Card>
      </div>

      {/* Como Fazer a Comparação */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="font-semibold mb-4 text-indigo-700 flex items-center gap-2">
          <Camera className="size-5" />
          Como Comparar o Projeto com a Obra Atual
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div>
              <strong>Acesse o Apto.vc</strong> para visualizar as plantas, perspectivas artísticas e 
              o projeto completo do empreendimento
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div>
              <strong>Busque vídeos no YouTube</strong> procurando por "Sindona Paraíso Osasco" para 
              encontrar registros atualizados da obra
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div>
              <strong>Compare os elementos</strong> como fachada, estrutura, área de lazer e 
              acabamentos entre o projeto e o estágio atual da construção
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div>
              <strong>Acompanhe a evolução</strong> consultando regularmente as fontes oficiais para 
              ver o progresso mês a mês
            </div>
          </div>
        </div>
      </Card>

      {/* Comparações Disponíveis */}
      <div>
        <h3 className="font-semibold mb-4 text-indigo-700">O que você pode comparar:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border-indigo-200">
            <h4 className="font-semibold mb-2 text-indigo-600">Fachada</h4>
            <p className="text-sm text-gray-600">
              Compare o projeto da fachada com o andamento atual da estrutura e fechamento externo
            </p>
          </Card>
          <Card className="p-4 border-indigo-200">
            <h4 className="font-semibold mb-2 text-indigo-600">Estrutura</h4>
            <p className="text-sm text-gray-600">
              Veja como a estrutura de concreto está sendo executada conforme o projeto estrutural
            </p>
          </Card>
          <Card className="p-4 border-indigo-200">
            <h4 className="font-semibold mb-2 text-indigo-600">Área de Lazer</h4>
            <p className="text-sm text-gray-600">
              Acompanhe a construção da piscina, churrasqueira e espaços de convivência
            </p>
          </Card>
          <Card className="p-4 border-indigo-200">
            <h4 className="font-semibold mb-2 text-indigo-600">Implantação</h4>
            <p className="text-sm text-gray-600">
              Compare o layout do terreno planejado com a execução real do projeto
            </p>
          </Card>
          <Card className="p-4 border-indigo-200">
            <h4 className="font-semibold mb-2 text-indigo-600">Acabamentos</h4>
            <p className="text-sm text-gray-600">
              Confira materiais, cores e detalhes de acabamento à medida que a obra avança
            </p>
          </Card>
          <Card className="p-4 border-indigo-200">
            <h4 className="font-semibold mb-2 text-indigo-600">Entorno</h4>
            <p className="text-sm text-gray-600">
              Veja a localização real e o contexto urbano do empreendimento em Osasco
            </p>
          </Card>
        </div>
      </div>

      {/* Links Rápidos */}
      <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <h3 className="font-semibold mb-4 text-indigo-700">🔗 Links Rápidos para Comparação</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <a
            href="https://apto.vc/br/sp/osasco/bussocaba/sindona-paraiso"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-white border border-indigo-300 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <FileText className="size-5 text-indigo-600" />
            <div className="flex-1">
              <div className="font-medium text-sm">Apto.vc</div>
              <div className="text-xs text-gray-500">Projeto Completo</div>
            </div>
            <ExternalLink className="size-4 text-gray-400" />
          </a>
          <a
            href="https://www.youtube.com/results?search_query=sindona+paraiso+osasco"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Video className="size-5 text-red-600" />
            <div className="flex-1">
              <div className="font-medium text-sm">YouTube</div>
              <div className="text-xs text-gray-500">Vídeos da Obra</div>
            </div>
            <ExternalLink className="size-4 text-gray-400" />
          </a>
          <a
            href="https://vitraengenharia.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-white border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors"
          >
            <Building2 className="size-5 text-purple-600" />
            <div className="flex-1">
              <div className="font-medium text-sm">Vitra Engenharia</div>
              <div className="text-xs text-gray-500">Site Oficial</div>
            </div>
            <ExternalLink className="size-4 text-gray-400" />
          </a>
        </div>
      </Card>
    </div>
  );
}