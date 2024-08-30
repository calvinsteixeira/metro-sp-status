//UTILS
import React from 'react';
import { cn, formatDateBR } from '@/lib/utils';
import { metroStatusColor } from '@/constants/metroStatusColors';

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
    <div className="p-6 bg-primaryContainer border-[1px] glow:border-[#32a852]  dark:border-[#302f2f] border-[#ececec] rounded-lg shadow-sm space-y-5 text-sm">
      <div className="flex gap-2 justify-start items-center w-full py-2">
        <h2>{props.name}</h2>
        <p>{props.number}</p>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <span style={{ backgroundColor: metroStatusColor[props.status].colorBase }} className={'w-2 h-2 rounded-full animate-pulse'}></span>
            <p style={{ color: metroStatusColor[props.status].colorBase }} className={'font-semibold'}>
              {props.statusDescription}
            </p>
          </div>
          {props.reason != props.statusDescription && (
            <p style={{ color: metroStatusColor[props.status].colorBase }} className={'font-semibold max-w-96'}>
              {props.reason}
            </p>
          )}
        </div>
        <p className="flex flex-col text-xs">
          Atualizado em: <span className="font-medium tex-sm">{formatDateBR(props.updatedAt)}</span>
        </p>
      </div>
    </div>
  );
}

export type { LineMetroProps };
