import { Youtube, ExternalLink, Search } from 'lucide-react';
import { Card } from './ui/card';

interface VideoSearch {
  title: string;
  description: string;
  searchQuery: string;
  url: string;
}

const videoSearches: VideoSearch[] = [
  {
    title: 'Vídeos Oficiais da Vitra Engenharia',
    description: 'Canal oficial da construtora com vídeos do empreendimento, tours virtuais e atualizações da obra',
    searchQuery: 'sindona paraiso osasco vitra engenharia',
    url: 'https://www.youtube.com/results?search_query=sindona+paraiso+osasco+vitra+engenharia',
  },
  {
    title: 'Evolução e Andamento da Obra',
    description: 'Vídeos mostrando o progresso da construção, timelapse e atualizações mensais',
    searchQuery: 'sindona paraiso osasco obra andamento',
    url: 'https://www.youtube.com/results?search_query=sindona+paraiso+osasco+obra+andamento',
  },
  {
    title: 'Apartamentos Decorados',
    description: 'Tours pelos apartamentos modelo de 2 e 3 dormitórios com decoração',
    searchQuery: 'sindona paraiso apartamento decorado',
    url: 'https://www.youtube.com/results?search_query=sindona+paraiso+apartamento+decorado',
  },
  {
    title: 'Área de Lazer e Infraestrutura',
    description: 'Detalhes da área de lazer, piscina, churrasqueira e espaços comuns do condomínio',
    searchQuery: 'sindona paraiso area lazer',
    url: 'https://www.youtube.com/results?search_query=sindona+paraiso+area+lazer',
  },
  {
    title: 'Localização e Entorno',
    description: 'Vídeos sobre o bairro Bussocaba, proximidades do Shopping União e região de Osasco',
    searchQuery: 'sindona paraiso osasco bussocaba localização',
    url: 'https://www.youtube.com/results?search_query=sindona+paraiso+osasco+bussocaba',
  },
  {
    title: 'Plantas e Detalhes Técnicos',
    description: 'Informações sobre as plantas dos apartamentos, metragens e especificações técnicas',
    searchQuery: 'sindona paraiso plantas apartamentos',
    url: 'https://www.youtube.com/results?search_query=sindona+paraiso+plantas+apartamentos',
  },
];

export function Videos() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-indigo-700 mb-2">Vídeos do Empreendimento</h2>
        <p className="text-gray-600">
          Encontre vídeos reais do Sindona Paraíso no YouTube. Clique nos cards abaixo para buscar 
          conteúdo oficial da Vitra Engenharia e registros do empreendimento.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videoSearches.map((video, index) => (
          <a
            key={index}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="p-6 hover:shadow-xl transition-all border-indigo-200 group cursor-pointer h-full">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 rounded-lg group-hover:bg-red-600 transition-colors">
                  <Youtube className="size-6 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 group-hover:text-indigo-700 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {video.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-indigo-600">
                    <Search className="size-4" />
                    <span className="font-medium">Buscar no YouTube</span>
                    <ExternalLink className="size-3" />
                  </div>
                </div>
              </div>
            </Card>
          </a>
        ))}
      </div>

      {/* Canais Oficiais */}
      <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <h3 className="font-semibold mb-3 text-indigo-700">📺 Onde Encontrar Vídeos Oficiais</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <div>
              <strong>Canal da Vitra Engenharia:</strong> Busque por "Vitra Engenharia" no YouTube 
              para encontrar o canal oficial da construtora com todos os empreendimentos
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <div>
              <strong>Site Apto.vc:</strong> Acesse{' '}
              <a 
                href="https://apto.vc/br/sp/osasco/bussocaba/sindona-paraiso" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 underline font-medium"
              >
                a página do Sindona Paraíso
              </a>
              {' '}para ver fotos e vídeos oficiais
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <div>
              <strong>Redes Sociais:</strong> Busque por "Sindona Paraíso" ou "Vitra Engenharia" 
              no Instagram, Facebook e outras redes sociais
            </div>
          </div>
        </div>
      </Card>

      {/* Aviso */}
      <Card className="p-4 bg-blue-50 border-blue-300">
        <p className="text-sm text-blue-800">
          <strong>Nota:</strong> Os links acima direcionam para buscas no YouTube que mostrarão 
          vídeos reais disponíveis sobre o Sindona Paraíso. O conteúdo pode variar conforme 
          a disponibilidade de uploads oficiais e de terceiros.
        </p>
      </Card>
    </div>
  );
}