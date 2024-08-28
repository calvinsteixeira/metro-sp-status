import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateBR(isoString: string) {
  const [datePart, timePart] = isoString.split('T');
  const [year, month, day] = datePart.split('-');
  let [hour, minute] = timePart.split(':');

  let hourInt = parseInt(hour, 10);
  const period = hourInt >= 12 ? 'pm' : 'am';
  hourInt = hourInt % 12 || 12;
  hour = hourInt.toString().padStart(2, '0');

  return `${day}/${month}/${year} às ${hour}:${minute} ${period}`;
}