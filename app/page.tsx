'use client';

//COMPONENTS
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Suspense } from 'react';

//UTILS
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const result = await fetch('https://status-metro-api.onrender.com', {
        method: 'GET',
      });
      return await result.json();
    },
  });

  return (
    <main className="py-12">
      <div className="text-center space-y-4">
        <h2 className="text-lg">MetrôSP Status</h2>
        <p>
          Acompanhe o <strong className="text-primary">status atualizado</strong> das linhas de metrô de SP a cada 5 minutos
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
      <div className='mt-6'>
        {isLoading ? (
          <div>
            <Skeleton className="w-full h-[4rem] rounded-md" />
            <Skeleton className="w-full h-[5rem] rounded-md" />
            <Skeleton className="w-full h-[5rem] rounded-md" />
            <Skeleton className="w-full h-[5rem] rounded-md" />
            <Skeleton className="w-full h-[5rem] rounded-md" />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </main>
  );
}
