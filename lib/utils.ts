import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function darkenColor(hexColor: string, factor: number = 0.7): string {
  let color = hexColor.replace("#", "");

  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const r = Math.max(
    0,
    Math.min(255, Math.floor(parseInt(color.substring(0, 2), 16) * factor)),
  );
  const g = Math.max(
    0,
    Math.min(255, Math.floor(parseInt(color.substring(2, 4), 16) * factor)),
  );
  const b = Math.max(
    0,
    Math.min(255, Math.floor(parseInt(color.substring(4, 6), 16) * factor)),
  );

  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
