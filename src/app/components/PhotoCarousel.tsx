import Slider from 'react-slick';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AlertCircle } from 'lucide-react';

interface Photo {
  url: string;
  caption: string;
  date: string;
  phase: string;
  source: string;
}

const photos: Photo[] = [
  {
    url: 'https://images.unsplash.com/photo-1747555094127-9a922d56a64c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXNpZGVudGlhbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2NzgwOTk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Vista do Empreendimento',
    date: 'Jan 2026',
    phase: 'Alvenaria',
    source: 'Imagem Ilustrativa',
  },
  {
    url: 'https://images.unsplash.com/photo-1614331358939-7ff75e9e9dd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZyUyMHN1bnNldHxlbnwxfHx8fDE3Njc3OTQ0MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Fachada ao Entardecer',
    date: 'Dez 2025',
    phase: 'Estrutura',
    source: 'Imagem Ilustrativa',
  },
  {
    url: 'https://images.unsplash.com/photo-1664976706112-864d7a38e12c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzY3OTA4MTE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Evolução da Obra',
    date: 'Nov 2025',
    phase: 'Estrutura',
    source: 'Imagem Ilustrativa',
  },
  {
    url: 'https://images.unsplash.com/photo-1670550689653-90d40d543d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGNvbXBsZXglMjBwb29sfGVufDF8fHx8MTc2NzkwOTc4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Área de Lazer - Projeto',
    date: 'Mar 2024',
    phase: 'Planejamento',
    source: 'Imagem Ilustrativa',
  },
  {
    url: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njc4NTEzMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Apartamento Modelo',
    date: 'Fev 2024',
    phase: 'Projeto',
    source: 'Imagem Ilustrativa',
  },
];

export function PhotoCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-indigo-700">Evolução da Obra</h2>
      
      <Card className="p-4 bg-amber-50 border-amber-300">
        <div className="flex items-start gap-3">
          <AlertCircle className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800">
              <strong>Nota Importante:</strong> As imagens abaixo são ilustrativas. Para visualizar fotos 
              reais e atualizadas do empreendimento Sindona Paraíso, acesse o site oficial da Vitra 
              Engenharia ou busque por vídeos no YouTube (seção "Vídeos").
            </p>
          </div>
        </div>
      </Card>
      
      <Card className="overflow-hidden border-indigo-200 shadow-xl">
        <Slider {...settings}>
          {photos.map((photo, index) => (
            <div key={index} className="outline-none">
              <div className="relative">
                <ImageWithFallback
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  IMAGEM ILUSTRATIVA
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-900/90 via-purple-900/70 to-transparent p-8 text-white">
                  <h3 className="text-2xl font-semibold mb-2">{photo.caption}</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <span>Fase: {photo.phase}</span>
                    <span>•</span>
                    <span>{photo.date}</span>
                    <span>•</span>
                    <span>{photo.source}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </Card>
    </div>
  );
}