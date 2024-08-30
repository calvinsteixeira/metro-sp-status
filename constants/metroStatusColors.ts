type StatusColorClass = {
  colorBase: string;
};

type StatusColorMap = {
  [key in 'normal' | 'reduced_speed' | 'closed' | 'paralyzed']: StatusColorClass;
};

export const metroStatusColor: StatusColorMap = {
  normal: {
    colorBase: "hsl(var(--metro-status-normal))"
  },
  reduced_speed: {
    colorBase: "hsl(var(--metro-status-reduced_speed))"
  },
  closed: {
    colorBase: "hsl(var(--metro-status-closed))"
  },
  paralyzed: {
    colorBase: "hsl(var(--metro-status-paralyzed))"
  },
};