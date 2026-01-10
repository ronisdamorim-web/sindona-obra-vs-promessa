import { Card } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';

interface ScheduleItem {
  phase: string;
  status: 'Concluída' | 'Em Andamento' | 'Planejada';
  startDate: string;
  endDate: string;
  notes: string;
}

const schedule: ScheduleItem[] = [
  {
    phase: 'Planejamento e Licenças',
    status: 'Concluída',
    startDate: 'Jan 2024',
    endDate: 'Mar 2024',
    notes: 'Aprovações obtidas',
  },
  {
    phase: 'Terraplanagem',
    status: 'Concluída',
    startDate: 'Mar 2024',
    endDate: 'Abr 2024',
    notes: 'Terreno preparado',
  },
  {
    phase: 'Fundação e Estacas',
    status: 'Concluída',
    startDate: 'Abr 2024',
    endDate: 'Jun 2024',
    notes: 'Sistema completo',
  },
  {
    phase: 'Estrutura de Concreto',
    status: 'Concluída',
    startDate: 'Jun 2024',
    endDate: 'Out 2024',
    notes: 'Todos os pavimentos',
  },
  {
    phase: 'Alvenaria e Vedação',
    status: 'Em Andamento',
    startDate: 'Out 2024',
    endDate: 'Mar 2025',
    notes: 'Paredes internas',
  },
  {
    phase: 'Instalações Hidráulicas',
    status: 'Planejada',
    startDate: 'Fev 2025',
    endDate: 'Mai 2025',
    notes: 'Água, esgoto e gás',
  },
  {
    phase: 'Instalações Elétricas',
    status: 'Planejada',
    startDate: 'Mar 2025',
    endDate: 'Jun 2025',
    notes: 'Rede elétrica completa',
  },
  {
    phase: 'Revestimentos',
    status: 'Planejada',
    startDate: 'Mai 2025',
    endDate: 'Set 2025',
    notes: 'Pisos e azulejos',
  },
  {
    phase: 'Pintura e Acabamento',
    status: 'Planejada',
    startDate: 'Set 2025',
    endDate: 'Nov 2025',
    notes: 'Acabamentos finais',
  },
  {
    phase: 'Áreas Comuns',
    status: 'Planejada',
    startDate: 'Out 2025',
    endDate: 'Dez 2025',
    notes: 'Lazer e paisagismo',
  },
  {
    phase: 'Entrega',
    status: 'Planejada',
    startDate: 'Dez 2025',
    endDate: 'Dez 2025',
    notes: 'Habite-se',
  },
];

export function Schedule() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-indigo-700">Cronograma de Execução</h2>
      
      <Card className="border-indigo-200 shadow-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <TableHead className="font-semibold">Etapa</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Início Previsto</TableHead>
              <TableHead className="font-semibold">Término Previsto</TableHead>
              <TableHead className="font-semibold">Observações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedule.map((item, index) => (
              <TableRow key={index} className="hover:bg-indigo-50/50 transition-colors">
                <TableCell className="font-medium">{item.phase}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === 'Concluída'
                        ? 'default'
                        : item.status === 'Em Andamento'
                        ? 'secondary'
                        : 'outline'
                    }
                    className={
                      item.status === 'Concluída' 
                        ? 'bg-indigo-600' 
                        : item.status === 'Em Andamento' 
                        ? 'bg-purple-600' 
                        : ''
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.startDate}</TableCell>
                <TableCell>{item.endDate}</TableCell>
                <TableCell className="text-gray-600">{item.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      
      <Card className="p-4 bg-indigo-50 border-indigo-200">
        <p className="text-sm text-indigo-800">
          <strong>Aviso:</strong> Cronograma estimado com base em informações públicas disponíveis. 
          Para informações oficiais atualizadas, consulte a Vitra Engenharia.
        </p>
      </Card>
    </div>
  );
}