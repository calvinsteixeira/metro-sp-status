'use client';

//COMPONENTS
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineMetroCard, LinesDonutChart } from '@/components/index';
import { Moon, Sun } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Glow, GlowCapture } from '@codaworks/react-glow';

//UTILS
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineMetroProps } from '@/components/containers/LineMetroCard';
import { DonutChartProps } from '@/components/charts/LinesDonutChart';
import { useTheme } from 'next-themes';
import { metroStatusColor } from '@/constants/metroStatusColors';

export default function Home() {
  const [filterLineName, setFilterLineName] = React.useState<string>('');
  const [filterStatusLine, setStatusLine] = React.useState<string>('all');
  const [requestTakingTooLong, setRequestTakingTooLong] = React.useState<boolean>(false);
  const { setTheme } = useTheme();
  const {
    isLoading,
    isError,
    data: metroStatusData,
  } = useQuery({
    queryKey: ['getMetroStatus'],
    queryFn: async () => {
      const timer = setTimeout(() => {
        setRequestTakingTooLong(true);
      }, 5000);
      try {
        const result = await fetch('https://status-metro-api.onrender.com', {
          method: 'GET',
        });
        clearTimeout(timer);
        if (result.ok) {
          const response: { lines: LineMetroProps[]; updatedAt: string } = await result.json();
          return response;
        } else {
          throw Error;
        }
      } catch (error) {
        console.log('Erro na chamada de status do metrô');
      }
    },
  });
  const chartConfig: DonutChartProps['chartConfig'] = {
    normal: { label: 'Operação Normal', color: metroStatusColor.normal.colorBase },
    reduced_speed: { label: 'Circulação de Trens', color: metroStatusColor.reduced_speed.colorBase },
    closed: { label: 'Operação encerrada', color: metroStatusColor.closed.colorBase },
    paralyzed: { label: 'Operação paralizada', color: metroStatusColor.paralyzed.colorBase },
  };
  const getCharData = (): DonutChartProps['chartData'] => {
    const statuses: LineMetroProps['status'][] = ['normal', 'reduced_speed', 'closed', 'paralyzed'];
    const data: DonutChartProps['chartData'] = [];
    for (let status of statuses) {
      data.push({
        status: status,
        availableLines: metroStatusData?.lines.filter((line) => line.status == status).length || 0,
        fill:
          chartConfig[status].color ||
          '#' +
            Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, '0'),
      });
    }
    return data;
  };
  const filteredLines = metroStatusData?.lines.filter(
    (line) =>
      (filterStatusLine === 'all' || line.status === filterStatusLine) &&
      (line.name.toLowerCase().includes(filterLineName.toLowerCase()) || line.number.toLowerCase().includes(filterLineName.toLowerCase()))
  );
  return (
    <main className="w-full py-10 pt-12 lg:px-28 xl:px-60">
      <AlertDialog open={requestTakingTooLong}>
        <AlertDialogContent className="max-w-[20rem]">
          <AlertDialogHeader>
            <AlertDialogTitle>Demora no carregamento dos dados?</AlertDialogTitle>
            <AlertDialogDescription>
              Devido a uma estratégia de cold start na hospedagem do servidor, o primeiro carregamento dos dados pode demorar mais do que o normal.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setRequestTakingTooLong(false)}>Ok, entendi.</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:gap-8 gap-4 sm:items-center">
          <h2 className="max-w-max flex flex-col font-bold text-4xl text-[#32a852]">
            METROSP<span className="font-light">STATUS</span>
          </h2>
          <div className="hidden sm:block w-[2px] h-[4rem] bg-[#32a852]"></div>
          <p className="max-w-[17rem]">Acompanhe de forma atualizada o status das linhas de metrô em SP.</p>
        </div>
        <div className="flex sm:flex-row-reverse flex-col-reverse sm:items-end sm:justify-between gap-2 sm:gap-0 mt-14">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
            <div className="space-y-2">
              <Label className="text-foreground" htmlFor="buscar-linha">
                Buscar pelo nome/id
              </Label>
              <Input className="max-w-[20rem]" id="buscar-linha" placeholder="informe o nome/id da linha" onChange={(e) => setFilterLineName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buscar-linha">Busque pelo status</Label>
              <Select onValueChange={setStatusLine} defaultValue={filterStatusLine}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="status da linha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="normal">Operação normal</SelectItem>
                  <SelectItem value="reduced_speed">Circulação de trens</SelectItem>
                  <SelectItem value="closed">Operação encerrada</SelectItem>
                  <SelectItem value="paralyzed">Operação paralizada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Alterar o tema</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mt-6">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="w-full h-[8rem] rounded-md" />
              <Skeleton className="w-full h-[8rem] rounded-md" />
              <Skeleton className="w-full h-[8rem] rounded-md" />
              <Skeleton className="w-full h-[8rem] rounded-md" />
              <Skeleton className="w-full h-[8rem] rounded-md" />
            </div>
          ) : (
            <div className="space-y-4">
              <LinesDonutChart updatedAt={metroStatusData?.updatedAt || null} chartConfig={chartConfig} chartData={getCharData()} />
              <div>
                {metroStatusData && filteredLines && filteredLines.length > 0 ? (
                  <GlowCapture>
                    <div className="flex flex-wrap gap-5">
                      {filteredLines.map((metroStatus: LineMetroProps, index: number) => (
                        <div key={index} className="flex-grow">
                          <Glow color="#32a852">
                            <LineMetroCard {...metroStatus} updatedAt={metroStatusData.updatedAt} />
                          </Glow>
                        </div>
                      ))}
                    </div>
                  </GlowCapture>
                ) : (
                  <div className="mt-4">
                    <p>Nenhuma linha foi encontrada</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
