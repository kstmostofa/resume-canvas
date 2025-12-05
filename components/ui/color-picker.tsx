"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const PRESET_COLORS = [
  "#000000", // Black
  "#23405c", // Dark Blue (Default)
  "#3e3e3e", // Dark Gray
  "#475569", // Slate
  "#2563eb", // Blue
  "#1e3a8a", // Navy
  "#0284c7", // Sky
  "#0891b2", // Cyan
  "#0d9488", // Teal
  "#059669", // Emerald
  "#16a34a", // Green
  "#65a30d", // Lime
  "#3f6212", // Olive
  "#d97706", // Amber
  "#ea580c", // Orange
  "#dc2626", // Red
  "#b91c1c", // Dark Red
  "#7f1d1d", // Maroon
  "#db2777", // Pink
  "#e11d48", // Rose
  "#7c3aed", // Violet
  "#7e22ce", // Purple
  "#c026d3", // Fuchsia
  "#4f46e5", // Indigo
];

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={cn(
              "w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
              value === color && "ring-2 ring-offset-2 ring-primary",
            )}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          >
            {value === color && (
              <Check className="w-4 h-4 text-white drop-shadow-md" />
            )}
          </button>
        ))}

        <div className="relative">
          <button
            onClick={() => inputRef.current?.click()}
            className={cn(
              "w-8 h-8 rounded-full border border-dashed border-gray-400 flex items-center justify-center hover:border-gray-600 hover:bg-gray-50 transition-colors",
              !PRESET_COLORS.includes(value) &&
                "ring-2 ring-offset-2 ring-primary border-solid border-transparent",
            )}
            style={
              !PRESET_COLORS.includes(value)
                ? { backgroundColor: value }
                : undefined
            }
            title="Custom Color"
          >
            {!PRESET_COLORS.includes(value) ? (
              <Check className="w-4 h-4 text-white drop-shadow-md" />
            ) : (
              <Plus className="w-4 h-4 text-gray-500" />
            )}
          </button>
          <input
            ref={inputRef}
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute opacity-0 pointer-events-none w-0 h-0"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded border border-gray-200"
          style={{ backgroundColor: value }}
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono uppercase w-32"
          maxLength={7}
        />
      </div>
    </div>
  );
}
