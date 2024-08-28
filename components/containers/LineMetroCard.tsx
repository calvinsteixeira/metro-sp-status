//COMPONENETS

//UTILS
import React from 'react';
import { cn, formatDateBR } from '@/lib/utils';

type LineMetroProps = {
  name: string;
  number: string;
  reason: string;
  statusDescription: string;
  updatedAt: string;
  status: 'normal' | 'reduced_speed' | 'closed' | 'paralyzed';
};

export default function LineMetroCard(props: LineMetroProps) {
  const statusColorClass = {
    normal: {
      text: 'text-[#32a852]',
      background: 'bg-[#32a852]',
    },
    reduced_speed: {
      text: 'text-[#a89c32]',
      background: 'bg-[#a89c32]',
    },
    closed: {
      text: 'text-[#969696]',
      background: 'bg-[#969696]',
    },
    paralyzed: {
      text: 'text-[#a83232]',
      background: 'bg-[#a83232]',
    },
  };

  return (
    <div className="px-4 py-6 border-primary border-[1px] border-[#d6d6d6] rounded-lg shadow-sm space-y-5 text-sm">
      <div className="flex gap-2 justify-start">
        <h2 className="text-base py-1 px-6 bg-white shadow-sm rounded-sm border-[1px] border-[#d6d6d6]">{props.name}</h2>
        <p className="text-base py-1 px-6 bg-white shadow-sm rounded-sm border-[1px] border-[#d6d6d6]">{props.number}</p>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <span className={cn('w-2 h-2 rounded-full animate-pulse', statusColorClass[props.status].background)}></span>
            <p className={cn('font-semibold', statusColorClass[props.status].text)}>{props.statusDescription}</p>
          </div>
          {props.reason != props.statusDescription && <p className={cn('font-semibold', statusColorClass[props.status].text)}>{props.reason}</p>}
        </div>
        <p className="flex flex-col text-xs">
          Atualizado em: <span className="font-medium tex-sm">{formatDateBR(props.updatedAt)}</span>
        </p>
      </div>
    </div>
  );
}

export type { LineMetroProps };
