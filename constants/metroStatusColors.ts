type StatusColorClass = {
  colorBase: string;
  text: string;
  background: string;
};

type StatusColorMap = {
  [key in 'normal' | 'reduced_speed' | 'closed' | 'paralyzed']: StatusColorClass;
};

export const metroStatusColor: StatusColorMap = {
  normal: {
    colorBase: "#32a852",
    text: 'text-[#32a852]',
    background: 'bg-[#32a852]',
  },
  reduced_speed: {
    colorBase: "#e0982b",
    text: 'text-[#e0982b]',
    background: 'bg-[#e0982b]',
  },
  closed: {
    colorBase: "#969696",
    text: 'text-[#969696]',
    background: 'bg-[#969696]',
  },
  paralyzed: {
    colorBase: "#a83232",
    text: 'text-[#a83232]',
    background: 'bg-[#a83232]',
  },
};