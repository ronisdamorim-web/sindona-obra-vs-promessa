import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { Card } from './ui/card';

interface Phase {
  name: string;
  status: 'completed' | 'current' | 'upcoming';
  date: string;
  icon: React.ReactNode;
}

const phases: Phase[] = [
  { name: 'Planejamento', status: 'completed', date: 'Jan 2024', icon: <CheckCircle2 className="size-6" /> },
  { name: 'Terraplanagem', status: 'completed', date: 'Mar 2024', icon: <CheckCircle2 className="size-6" /> },
  { name: 'Fundação', status: 'completed', date: 'Mai 2024', icon: <CheckCircle2 className="size-6" /> },
  { name: 'Estrutura', status: 'completed', date: 'Ago 2024', icon: <CheckCircle2 className="size-6" /> },
  { name: 'Alvenaria', status: 'current', date: 'Jan 2025', icon: <Clock className="size-6" /> },
  { name: 'Instalações', status: 'upcoming', date: 'Abr 2025', icon: <Circle className="size-6" /> },
  { name: 'Acabamento', status: 'upcoming', date: 'Set 2025', icon: <Circle className="size-6" /> },
  { name: 'Entrega', status: 'upcoming', date: 'Dez 2025', icon: <Circle className="size-6" /> },
];

export function Timeline() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-indigo-700">Linha do Tempo</h2>
      
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-indigo-200" />
        
        <div className="space-y-8">
          {phases.map((phase, index) => (
            <Card
              key={index}
              className={`p-6 ml-20 relative transition-all hover:shadow-md ${
                phase.status === 'current'
                  ? 'border-indigo-500 border-2 bg-gradient-to-br from-indigo-50 to-purple-50'
                  : phase.status === 'completed'
                  ? 'bg-gray-50'
                  : 'bg-white'
              }`}
            >
              <div
                className={`absolute -left-14 top-6 p-2 rounded-full shadow-lg ${
                  phase.status === 'current'
                    ? 'bg-indigo-600 text-white'
                    : phase.status === 'completed'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {phase.icon}
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{phase.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{phase.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    phase.status === 'current'
                      ? 'bg-indigo-100 text-indigo-700'
                      : phase.status === 'completed'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {phase.status === 'current'
                    ? 'Em Andamento'
                    : phase.status === 'completed'
                    ? 'Concluída'
                    : 'Próxima'}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}