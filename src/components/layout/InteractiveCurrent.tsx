"use client";

import { useEffect, useRef } from "react";

type PointerState = { x: number; y: number; active: boolean };

const STRANDS = [
  { y: .14, amplitude: 28, frequency: .008, speed: .00028, phase: .2 },
  { y: .29, amplitude: 42, frequency: .006, speed: -.00022, phase: 1.7 },
  { y: .43, amplitude: 24, frequency: .01, speed: .00034, phase: 3.1 },
  { y: .58, amplitude: 38, frequency: .007, speed: -.00026, phase: 4.3 },
  { y: .73, amplitude: 30, frequency: .009, speed: .00024, phase: 5.6 },
  { y: .88, amplitude: 44, frequency: .005, speed: -.0002, phase: 2.4 },
];

function channels(value: string) {
  return value.trim().split(/\s+/).join(", ");
}

export function InteractiveCurrent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || navigator.userAgent.includes("jsdom")) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer: PointerState = { x: -999, y: -999, active: false };
    let frame = 0;
    let width = 0;
    let height = 0;
    let accent = "151, 183, 137";
    let primary = "61, 39, 27";

    const updateColors = () => {
      const styles = getComputedStyle(document.documentElement);
      accent = channels(styles.getPropertyValue("--color-accent"));
      primary = channels(styles.getPropertyValue("--color-primary"));
    };

    const themeObserver = new MutationObserver(updateColors);

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const move = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const leave = () => { pointer.active = false; };

    const strandY = (x: number, index: number, time: number) => {
      const strand = STRANDS[index];
      let y = strand.y * height
        + Math.sin(x * strand.frequency + time * strand.speed + strand.phase) * strand.amplitude
        + Math.sin(x * .0028 - time * strand.speed * .62 + strand.phase) * strand.amplitude * .45;

      if (pointer.active) {
        const distance = Math.abs(x - pointer.x);
        const influence = Math.max(0, 1 - distance / 280);
        y += (pointer.y - y) * influence * influence * .32;
      }
      return y;
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);

      STRANDS.forEach((strand, index) => {
        const color = index % 3 === 1 ? primary : accent;
        context.beginPath();
        for (let x = -48; x <= width + 48; x += 32) {
          const y = strandY(x, index, time);
          if (x === -48) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = `rgba(${color}, ${index % 3 === 1 ? .08 : .18})`;
        context.lineWidth = index % 3 === 1 ? .7 : 1.05;
        context.shadowColor = `rgba(${accent}, .22)`;
        context.shadowBlur = 10;
        context.stroke();
        context.shadowBlur = 0;

        const travel = width + 160;
        const pulseX = ((time * (.018 + index * .0018) + strand.phase * 170) % travel) - 80;
        const pulseY = strandY(pulseX, index, time);
        const glow = context.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 12);
        glow.addColorStop(0, `rgba(${accent}, .72)`);
        glow.addColorStop(.18, `rgba(${accent}, .32)`);
        glow.addColorStop(1, `rgba(${accent}, 0)`);
        context.fillStyle = glow;
        context.beginPath();
        context.arc(pulseX, pulseY, 12, 0, Math.PI * 2);
        context.fill();
      });

      if (!reducedMotion.matches) frame = window.requestAnimationFrame(draw);
    };

    resize();
    updateColors();
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    if (finePointer.matches) {
      window.addEventListener("pointermove", move, { passive: true });
      document.documentElement.addEventListener("pointerleave", leave);
    }
    window.addEventListener("resize", resize, { passive: true });
    draw(0);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", resize);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="interactive-current" aria-hidden="true" />;
}
