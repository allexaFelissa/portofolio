"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Spark = { id: number; x: number; y: number };

export function GlobalClickSpark() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let id = 0;
    const createSpark = (event: PointerEvent) => {
      const spark = { id: ++id, x: event.clientX, y: event.clientY };
      setSparks((current) => [...current.slice(-5), spark]);
      window.setTimeout(() => setSparks((current) => current.filter((item) => item.id !== spark.id)), 760);
    };
    document.addEventListener("pointerdown", createSpark, { passive: true });
    return () => document.removeEventListener("pointerdown", createSpark);
  }, [reduced]);

  if (reduced) return null;
  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200] overflow-hidden">{sparks.map((spark) => <span key={spark.id} className="react-bits-click-spark react-bits-click-spark-global" style={{ left: spark.x, top: spark.y }}>{Array.from({ length: 10 }, (_, index) => <i key={index} style={{ transform: `rotate(${index * 36}deg)` }} />)}</span>)}</div>;
}
