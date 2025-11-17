"use client";
import React, { JSX, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

type Flavor = {
  id: string;
  name: string;
  img: string;
  accent?: string;
};

const FLAVORS: Flavor[] = [
  { id: "clasicas", name: "Clásicas", img: "/bolsa.png", accent: "bg-yellow-50" },
  { id: "acanaladas", name: "Acanaladas", img: "/flavors/acanaladas.png", accent: "bg-blue-50" },
  { id: "crema", name: "Crema y Verdeo", img: "/flavors/crema.png", accent: "bg-green-50" },
  { id: "costillar", name: "Costillar Ahumado", img: "/flavors/costillar.png", accent: "bg-black/5" },
  { id: "salame", name: "Salame", img: "/flavors/salame.png", accent: "bg-red-50" },
  { id: "cheddar", name: "Cheddar", img: "/flavors/cheddar.png", accent: "bg-orange-50" },
  { id: "limon", name: "Limón", img: "/flavors/limon.png", accent: "bg-lime-50" },
  { id: "picantes", name: "Picantes", img: "/flavors/picantes.png", accent: "bg-purple-50" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { when: "beforeChildren", staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 220, damping: 22 } },
  hover: { scale: 1.04, zIndex: 20, transition: { type: "spring", stiffness: 300 } },
};

function useAutoCarousel(length: number, interval = 3800) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setInterval(() => setIndex((i) => (i + 1) % length), interval);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [length, interval]);

  const pause = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resume = () => {
    if (timerRef.current) return;
    timerRef.current = window.setInterval(() => setIndex((i) => (i + 1) % length), interval);
  };

  return { index, setIndex, pause, resume };
}

export default function FlavorsSection(): JSX.Element {
  const heroRef = useRef<HTMLDivElement | null>(null);

  // subtle cursor parallax for hero image
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    let bound: DOMRect | null = null;

    const onMove = (e: MouseEvent) => {
      if (!bound) bound = el.getBoundingClientRect();
      const cx = bound.left + bound.width / 2;
      const cy = bound.top + bound.height / 2;
      const dx = (e.clientX - cx) / bound.width;
      const dy = (e.clientY - cy) / bound.height;
      el.style.transform = `translate3d(${dx * 6}px, ${dy * 6}px, 0) rotate(${dx * 2}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "";
      bound = null;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const { index: activeIdx, setIndex, pause, resume } = useAutoCarousel(FLAVORS.length, 3800);

  return (
    <section id="sabores" className="relative overflow-hidden bg-gradient-to-b from-gray-900/60 to-gray-900/75 text-white">
      <div className="absolute -left-20 -top-16 w-[48rem] h-[48rem] rounded-full bg-gradient-to-r from-orange-500/20 via-transparent to-pink-500/10 blur-3xl pointer-events-none" />
      <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* LEFT - hero bag */}
          <div className="w-full lg:w-6/12 flex justify-center lg:justify-start">
            <div className="relative w-[330px] sm:w-[420px] md:w-[520px] lg:w-[560px]">
              <motion.div
                ref={heroRef}
                initial={{ y: 8 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative mx-auto"
                aria-hidden
              >
                <img src="/fillsHero.png" alt="Bolsa FILLS - hero" className="w-full h-auto drop-shadow-2xl select-none" draggable={false} />
                <div className="absolute inset-0 pointer-events-none mix-blend-screen" />
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.18 }} transition={{ duration: 1.2 }} className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent rounded-lg" aria-hidden />
            </div>
          </div>

          {/* RIGHT - flavor cards */}
          <div className="w-full lg:w-6/12">
            <header className="mb-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">Sabores FILLS</h2>
              <p className="text-gray-300 max-w-xl mt-3">Explora cada sabor con animaciones profesionales: hover 3D, micro-interactions y previews ampliadas.</p>
            </header>

            <motion.div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6" variants={containerVariants} initial="hidden" animate="visible">
              {FLAVORS.map((f, i) => (
                <FlavorCard
                  key={f.id}
                  flavor={f}
                  index={i}
                  active={i === activeIdx}
                  onEnter={() => {
                    pause();
                    setIndex(i);
                  }}
                  onLeave={() => resume()}
                  variants={cardVariants}
                />
              ))}
            </motion.div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex gap-2" role="tablist" aria-label="Seleccionar sabor">
                {FLAVORS.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Ver ${FLAVORS[i].name}`}
                    onClick={() => setIndex(i)}
                    onMouseEnter={() => pause()}
                    onMouseLeave={() => resume()}
                    className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-semibold ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all ${i === activeIdx ? "bg-white/10 ring-white/30 scale-105" : "bg-white/5 hover:bg-white/8"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <div className="ml-auto flex gap-2">
                <button onClick={() => setIndex((activeIdx - 1 + FLAVORS.length) % FLAVORS.length)} className="px-3 py-2 rounded-md bg-white/6 hover:bg-white/8" aria-label="Anterior">
                  ←
                </button>
                <button onClick={() => setIndex((activeIdx + 1) % FLAVORS.length)} className="px-3 py-2 rounded-md bg-white/6 hover:bg-white/8" aria-label="Siguiente">
                  →
                </button>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
}

/* FlavorCard: tilt + framer-motion */
function FlavorCard({
  flavor,
  index,
  active,
  onEnter,
  onLeave,
  variants,
}: {
  flavor: Flavor;
  index: number;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  variants: Variants;
}): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (ev: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width;
      const py = (ev.clientY - r.top) / r.height;
      const rx = (py - 0.5) * 10; // rotateX
      const ry = (px - 0.5) * -10; // rotateY
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${active ? 8 : 0}px)`;
    };
    const handleLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [active]);

  return (
    <motion.div
      ref={ref}
      role="button"
      tabIndex={0}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      variants={variants}
      whileHover="hover"
      className="rounded-xl p-3 cursor-pointer select-none ring-1 ring-white/6 backdrop-blur-sm"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-20 h-20 rounded-lg flex items-center justify-center bg-white/6 p-2">
          <img src={flavor.img} alt={flavor.name} className="w-full h-full object-contain pointer-events-none" draggable={false} />
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold">{flavor.name}</div>
          <div className="text-xs text-gray-300">Sabor único</div>
        </div>
      </div>
    </motion.div>
  );
}
