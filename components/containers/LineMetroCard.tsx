//COMPONENETS

//UTILS
import React from 'react';
import { cn, formatDateBR } from '@/lib/utils';
import { metroStatusTwClassColors } from '@/lib/constants';

type LineMetroProps = {
  name: string;
  number: string;
  reason: string;
  statusDescription: string;
  updatedAt: string;
  status: 'normal' | 'reduced_speed' | 'closed' | 'paralyzed';
};

export default function LineMetroCard(props: LineMetroProps) {
  return (
    <div className="p-6 bg-primaryContainer border-[1px] glow:border-glow dark:border-[#302f2f] border-[#ececec] rounded-lg shadow-sm space-y-5 text-sm">
      <div className="flex gap-2 justify-start items-center w-full py-2">
        <h2>{props.name}</h2>
        <p>{props.number}</p>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <span className={cn('w-2 h-2 rounded-full animate-pulse', metroStatusTwClassColors[props.status].background)}></span>
            <p className={cn('font-semibold', metroStatusTwClassColors[props.status].text)}>{props.statusDescription}</p>
          </div>
          {props.reason != props.statusDescription && <p className={cn('font-semibold max-w-96', metroStatusTwClassColors[props.status].text)}>{props.reason}</p>}
        </div>
        <p className="flex flex-col text-xs">
          Atualizado em: <span className="font-medium tex-sm">{formatDateBR(props.updatedAt)}</span>
        </p>
      </div>
    </div>
  );
}

export type { LineMetroProps };
