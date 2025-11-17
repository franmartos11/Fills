"use client";
import CurvedLoop from "./Components/CurvedLoop/CurvedLoop";
import HeroDemo from "./Components/Hero/HeroDemo";
import SaboresHero from "./Components/Hero/SaboresHero";
import { NavbarDemo } from "./Components/Navbar/Navbar";
import { JSX } from "react";

export default function Home(): JSX.Element {
  const FLAVORS = [
    {
      id: "clasicas",
      name: "Clásicas",
      img: "/bolsaClasica.png",
      subtitle: "La clásica, simple y crujiente",
    },
    {
      id: "acanaladas",
      name: "Acanaladas",
      img: "/bolsaCremaYverdeo.png",
      subtitle: "Extra crujiente, ideal con dips",
    },
    {
      id: "crema",
      name: "Crema y Verdeo",
      img: "/bolsaClasica.png",
      subtitle: "Sabor cremoso y fresco",
    },
    {
      id: "cheddar",
      name: "Cheddar",
      img: "/bolsaClasica.png",
      subtitle: "Toque lácteo y potente",
    },
   
    
  ];

  <SaboresHero flavors={FLAVORS} visibleCount={4} />;

  return (
    <main id="hero" className="relative bg-[url('/bg.png')] bg-center bg-cover bg-no-repeat min-h-screen">
      <NavbarDemo />
      <HeroDemo></HeroDemo>
      <CurvedLoop 
  marqueeText="Mas Crocantes Que Nunca • Mas Crocantes Que Nunca • Mas Crocantes Que Nunca •"
  speed={2}
  curveAmount={500}
  direction="right"
  interactive={true}
  className=" custom-text-style"
/>
      <SaboresHero flavors={FLAVORS}></SaboresHero>
    </main>
  );
}
