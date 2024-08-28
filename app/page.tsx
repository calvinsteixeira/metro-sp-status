'use client';

//COMPONENTS
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineMetroCard } from '@/components/index';
import { Suspense } from 'react';

//UTILS
import { useQuery } from '@tanstack/react-query';
import { LineMetroProps } from '@/components/containers/LineMetroCard';

export default function Home() {
  const {
    isLoading,
    isError,
    data: metroStatusData,
  } = useQuery({
    queryKey: ['getMetroStatus'],
    queryFn: async () => {
      try {
        const result = await fetch('https://status-metro-api.onrender.com', {
          method: 'GET',
        });

        if (result.ok) {
          const response: { lines: LineMetroProps[], updatedAt: string } = await result.json();
          return response;
        } else {
          throw Error;
        }
      } catch (error) {
        console.log('Erro na chamada de status do metrô');
      }
    },
  });

  return (
    <main className="py-12">
      <div className="text-start space-y-4">
        <h2 className="text-lg">MetrôSP Status</h2>
        <p>
          Acompanhe de forma atualizada o <strong className="text-primary">status</strong> das linhas de metrô em SP.
        </p>
      </div>
      <div className="space-y-4">
        <div className="w-full space-y-2 mt-12">
          <Label htmlFor="buscar-linha">Buscar pelo nome/id</Label>
          <Input id="buscar-linha" placeholder="informe o nome/id da linha" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="buscar-linha">Busque pelo status</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="status da linha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Operação normal</SelectItem>
              <SelectItem value="reduced_speed">Velocidade reduzida</SelectItem>
              <SelectItem value="closed">Inoperante</SelectItem>
              <SelectItem value="paralyzed">Paralizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-6">
        {isLoading ? (
          <div className='space-y-2'>
            <Skeleton className="w-full h-[8rem] rounded-md" />
            <Skeleton className="w-full h-[8rem] rounded-md" />
            <Skeleton className="w-full h-[8rem] rounded-md" />
            <Skeleton className="w-full h-[8rem] rounded-md" />
            <Skeleton className="w-full h-[8rem] rounded-md" />
          </div>
        ) : (
          <div>
            {metroStatusData && metroStatusData.lines.length > 0 ? (
              <div className='space-y-6'>
                {metroStatusData.lines.map((metroStatus: LineMetroProps) => (
                  <LineMetroCard {...metroStatus} updatedAt={metroStatusData.updatedAt}/>
                ))}
              </div>
            ) : (
              <div>
                <p>Nenhuma informação disponível</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
