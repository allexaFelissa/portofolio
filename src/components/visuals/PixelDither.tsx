import type { CSSProperties } from "react";

type PixelDitherProps = {
  className?: string;
  density?: "low" | "medium" | "strong";
  origin?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  drift?: "up" | "down" | "none";
};

const densityThreshold = { low: 0.68, medium: 0.6, strong: 0.52 };

const hash = (column: number, row: number) => {
  const value = Math.sin(column * 91.7 + row * 47.3) * 43758.5453;
  return value - Math.floor(value);
};

export function PixelDither({ className = "", density = "low", origin = "top-left", drift = "none" }: PixelDitherProps) {
  const columns = 13;
  const rows = 9;
  const step = 13;
  const originColumn = origin.includes("right") ? columns - 1 : 0;
  const originRow = origin.includes("bottom") ? rows - 1 : 0;
  const pixels: Array<{ x: number; y: number; size: number; opacity: number }> = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const dx = Math.abs(column - originColumn) / columns;
      const dy = Math.abs(row - originRow) / rows;
      const distance = Math.sqrt(dx * dx * 0.76 + dy * dy * 1.08);
      const boundary = 0.98 - Math.sin(row * 0.91 + column * 0.27) * 0.07;
      const strength = Math.max(0, 1 - distance / boundary);
      const noise = hash(column, row);
      const threshold = densityThreshold[density] + distance * 0.28;

      if (strength > 0.06 && noise > threshold) {
        pixels.push({
          x: column * step + (row % 2) * 1.5,
          y: row * step,
          size: 1.6 + strength * 5.2,
          opacity: 0.16 + strength * 0.72,
        });
      }
    }
  }

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${columns * step} ${rows * step}`}
      className={`pixel-dither pixel-dither--${drift} pointer-events-none ${className}`}
      style={{ "--pixel-drift": drift === "up" ? "-12px" : drift === "down" ? "12px" : "0px" } as CSSProperties}
    >
      {pixels.map((pixel, index) => <rect key={`${pixel.x}-${pixel.y}-${index}`} x={pixel.x} y={pixel.y} width={pixel.size} height={pixel.size} fill="currentColor" opacity={pixel.opacity} />)}
    </svg>
  );
}
