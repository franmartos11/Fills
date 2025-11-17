"use client";
import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Flavor = {
  id: string;
  name: string;
  img: string; // ruta pública, p.ej. /flavors/clasicas.png
  subtitle?: string;
  description?: string;
};

type Props = {
  flavors: Flavor[]; // array de sabores
  visibleCount?: number; // cuántas miniaturas mostrar a la vez (por defecto 4)
};

const BAG_VARIANTS = {
  enter: { opacity: 0, scale: 0.96, x: 30 },
  center: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 0.96, x: -30 },
};

export default function SaboresHero({ flavors, visibleCount = 4 }: Props): JSX.Element {
  // seguridad: si no hay sabores, mostrar vacío
  const list = flavors ?? [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [windowStart, setWindowStart] = useState(0); // índice inicial del "viewport" de miniaturas
  const containerRef = useRef<HTMLDivElement | null>(null);

  // mantener windowStart dentro de límites si cambian sabores o selected
  useEffect(() => {
    if (selectedIndex < windowStart) setWindowStart(selectedIndex);
    if (selectedIndex >= windowStart + visibleCount) setWindowStart(selectedIndex - (visibleCount - 1));
  }, [selectedIndex, windowStart, visibleCount]);

  const visibleFlavors = useMemo(() => list.slice(windowStart, windowStart + visibleCount), [list, windowStart, visibleCount]);

  const prevWindow = () => {
    setWindowStart((s) => Math.max(0, s - visibleCount));
  };
  const nextWindow = () => {
    setWindowStart((s) => Math.min(Math.max(0, list.length - visibleCount), s + visibleCount));
  };

  // optional: keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setSelectedIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setSelectedIndex((i) => Math.min(list.length - 1, i + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [list.length]);

  if (list.length === 0) return <div className="py-12 text-center text-gray-400">No hay sabores</div>;

  const selected = list[selectedIndex];

  return (
    <section id="sabores-hero" className="relative bg-transparent text-white py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* IZQUIERDA: Bolsa grande */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-[520px]">
              <div className="relative">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={selected.id}
                    src={selected.img}
                    alt={selected.name}
                    variants={BAG_VARIANTS}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="w-full h-auto select-none drop-shadow-2xl"
                    draggable={false}
                  />
                </AnimatePresence>

                {/* small floating / glow */}
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pointer-events-none absolute inset-0 rounded-lg mix-blend-screen"
                />
              </div>
            </div>
          </div>

          {/* DERECHA: nombre grande + subtítulo + thumbnails */}
          <div className="flex flex-col gap-6">
            {/* Nombre grande */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
                {selected.name}
              </h1>
              <p className="mt-2 text-lg text-gray-200 max-w-xl">{selected.subtitle ?? selected.description ?? "Sabor destacado"}</p>
            </div>

            {/* Miniaturas + controles */}
            <div>
              <div className="flex items-center gap-3">
                
                <div ref={containerRef} className="flex-1 overflow-hidden">
                  <div
                    className="flex gap-3 transition-all"
                    style={{
                      transform: `translateX(0px)`,
                    }}
                  >
                    {/* renderizamos solo el viewport */}
                    {visibleFlavors.map((f, idx) => {
                      const globalIndex = windowStart + idx;
                      const isSelected = globalIndex === selectedIndex;
                      return (
                        <button
                          key={f.id}
                          onClick={() => setSelectedIndex(globalIndex)}
                          className={`flex-shrink-0 w-28 sm:w-32 md:w-36 rounded-lg p-2 bg-white/6 hover:bg-white/10 transition-transform focus:outline-none ${isSelected ? "ring-2 ring-white scale-105 m-[0.4rem]" : ""}`}
                          aria-pressed={isSelected}
                        >
                          <div className="w-full h-20 md:h-24 flex items-center justify-center overflow-hidden">
                            <img src={f.img} alt={f.name} className="w-full h-full object-contain pointer-events-none" draggable={false} />
                          </div>
                          <div className="mt-2 text-xs text-center text-gray-200 truncate">{f.name}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* si hay más que se desplazan, mostrar indicadores */}
              {list.length > visibleCount && (
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-300">
                  <span>{Math.min(windowStart + 1, list.length)}-{Math.min(windowStart + visibleCount, list.length)} de {list.length} sabores</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
