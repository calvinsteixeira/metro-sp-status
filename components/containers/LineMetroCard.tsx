import React from 'react';

type LineMetroProps = {
  name: string;
  number: string;
  reason: string;
  statusDescription: string;
  status: 'normal' | 'reduced_speed' | 'closed' | 'paralyzed';
};

export default function LineMetroCard(props: LineMetroProps) {
  const statusColors = {
    normal: '#32a852',
    reduced_speed: '#a89c32',
    closed: '#969696',
    paralyzed: '#a83232',
  };

  function getStatusColor(status: LineMetroProps['status']) {
    return `text-[${statusColors[status]}]` 
  }

  return (
    <div className="px-4 py-6 border-primary border-[1px] border-[#dfdfdf] rounded-lg shadow-sm space-y-5">
      <div className="flex gap-2 justify-center">
        <h2 className="text-base py-1 px-6 bg-white shadow-sm rounded-sm border-[1px] border-[#f3e2e2]">{props.name}</h2>
        <p className="text-base py-1 px-6 bg-white shadow-sm rounded-sm border-[1px] border-[#dfdfdf]">{props.number}</p>
      </div>
      <div>
        <p className={`${getStatusColor(props.status)} text-center font-semibold`}>{props.statusDescription}</p>
      </div>
    </div>
  );
}

export type { LineMetroProps };
