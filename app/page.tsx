//COMPONENTS
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Home() {
  return (
    <main className="py-12">
      <div className="text-center space-y-4">
        <h2 className="text-lg">MetrôSP Status</h2>
        <p>
          Acompanhe o <strong className="text-primary">status atualizado</strong> das linhas de metrô de SP a cada 5 minutos
        </p>
      </div>
      <div className='space-y-4'>
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
              <SelectItem value="light">Operação normal</SelectItem>
              <SelectItem value="dark">Velocidade reduzida</SelectItem>
              <SelectItem value="system">Inoperante</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </main>
  );
}
