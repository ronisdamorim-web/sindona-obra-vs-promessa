import { ExternalLink, Youtube, Building2, FileText, Globe, Map } from 'lucide-react';
import { Card } from './ui/card';

interface Source {
  name: string;
  url: string;
  type: 'website' | 'youtube' | 'document' | 'map';
  description: string;
  icon: React.ReactNode;
}

const sources: Source[] = [
  {
    name: 'Google Maps - Localização',
    url: 'https://share.google/qZwRC3ACo7j0krfGQ',
    type: 'map',
    description: 'Localização exata do empreendimento no Google Maps',
    icon: <Map className="size-5" />,
  },
  {
    name: 'Apto.vc - Ficha Completa',
    url: 'https://apto.vc/br/sp/osasco/bussocaba/sindona-paraiso',
    type: 'website',
    description: 'Página detalhada do empreendimento com plantas, localização e especificações',
    icon: <Globe className="size-5" />,
  },
  {
    name: 'Vitra Engenharia - Site Oficial',
    url: 'https://vitraengenharia.com.br',
    type: 'website',
    description: 'Site oficial da construtora responsável pelo empreendimento',
    icon: <Building2 className="size-5" />,
  },
  {
    name: 'YouTube - Vídeos do Sindona Paraíso',
    url: 'https://www.youtube.com/results?search_query=sindona+paraiso+osasco',
    type: 'youtube',
    description: 'Busca por vídeos oficiais e de terceiros sobre o empreendimento',
    icon: <Youtube className="size-5" />,
  },
  {
    name: 'Portais Imobiliários',
    url: '#',
    type: 'document',
    description: 'Informações coletadas de diversos portais imobiliários da região',
    icon: <FileText className="size-5" />,
  },
];

export function Sources() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-indigo-700">Fontes e Referências</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((source, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-indigo-200">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${source.type === 'map' ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'}`}>
                {source.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{source.name}</h3>
                  <ExternalLink className="size-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-3">{source.description}</p>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:underline font-medium"
                >
                  Acessar fonte
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Informações do Empreendimento */}
      <Card className="p-6 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
        <h3 className="font-semibold mb-4 text-indigo-700">Sobre o Sindona Paraíso</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Localização:</strong> Rua Paraíso, Bussocaba
            </div>
            <div>
              <strong>Cidade:</strong> Osasco/SP
            </div>
            <div>
              <strong>Construtora:</strong> Vitra Engenharia
            </div>
            <div>
              <strong>Tipologia:</strong> Apartamentos 2 e 3 dormitórios
            </div>
            <div>
              <strong>Previsão de Entrega:</strong> Dezembro 2025
            </div>
            <div>
              <strong>Região:</strong> Próximo ao Shopping União
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-indigo-50 border-indigo-200">
        <div className="space-y-4">
          <h3 className="font-semibold text-indigo-700">Aviso Legal e Transparência</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Este painel foi desenvolvido para fins informativos e de acompanhamento visual do 
            empreendimento <strong>Sindona Paraíso</strong> em Osasco/SP. Todas as informações, 
            imagens e vídeos são provenientes de fontes públicas disponíveis na internet, incluindo 
            portais imobiliários especializados (Apto.vc) e o site oficial da <strong>Vitra Engenharia</strong>.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong>Importante:</strong> As datas, percentuais e informações técnicas apresentadas são 
            estimativas baseadas em dados públicos e podem não refletir o estado real e atual da obra. 
            Para informações oficiais, atualizadas e comerciais, entre em contato diretamente com a 
            <strong> Vitra Engenharia</strong> ou acesse os canais oficiais de venda.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Este site possui caráter <strong>educacional e informativo</strong>, sem finalidade comercial. 
            Desenvolvido como exemplo de painel técnico de acompanhamento de obras residenciais.
          </p>
        </div>
      </Card>
    </div>
  );
}