'use client';

//COMPONENTS
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

//UTILS
import * as React from 'react';
import { LineMetroProps } from '../containers/LineMetroCard';
import { formatDateBR } from '@/lib/utils';

type DonutChartProps = {
  chartData: { status: LineMetroProps['status']; availableLines: number; fill: string }[];
  chartConfig: { [key in LineMetroProps['status']]: { label: string; color?: string } };
  updatedAt: string | null;
};

export default function Component(props: DonutChartProps) {
  const totalLines = React.useMemo(() => {
    return props.chartData.reduce((total, item) => total + item.availableLines, 0);
  }, []);

  const chartConfig = props.chartConfig satisfies ChartConfig;

  return (
    <Card className="flex flex-col glow:border-glow dark:border-[#302f2f] border-[#c5c5c5]">
      <CardHeader className="pb-0 text-center">
        <CardTitle>Disponibilidade das linhas</CardTitle>
        <CardDescription>{new Date().toLocaleDateString('pt-BR')}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={props.chartData} dataKey="availableLines" nameKey="status" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalLines.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Linhas
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm text-center">
        {props.updatedAt && <div className="leading-none text-muted-foreground">Dados atualizados em: {formatDateBR(props.updatedAt)}</div>}
      </CardFooter>
    </Card>
  );
}

export type { DonutChartProps };