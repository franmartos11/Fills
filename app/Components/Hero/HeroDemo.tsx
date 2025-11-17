import ModelViewer from "./Hero";
import Image from "next/image";
export default function HeroDemo(){
    return(
        <div className="pt-[4rem]">
        <section className="container mx-auto px-6 lg:px-12 min-h-[calc(100vh-6.5rem)] flex items-center">
          

        <div className="w-full flex flex-col items-start gap-6 px-4 py-8 md:px-8 md:py-12">
              <div className="w-full max-w-xl">
                

                <div className="mt-4 w-full">
                  <img
                    alt="FILLS Log"
                    src="/fillsLogo.png"
                    width={1200}
                    height={1200}
                    className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
                    
                  />
                </div>

                {/* Subtítulo */}
                <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-sm leading-relaxed mt-4">
                  
                </p>
              </div>
            </div>

            {/* DERECHA — Modelo 3D */}
            <div className="w-full flex items-center justify-center px-4 pb-8 md:pb-12">
              <div className="w-full max-w-[650px]">
                <div className="relative w-full aspect-square">
                  {/* contenedor responsivo para ModelViewer */}
                  <div className="absolute inset-0 w-full h-full">
                    <ModelViewer
                      url="/modelos/cheetos.glb"
                      width={800}
                      height={800}
                      // si ModelViewer acepta className, se puede forzar filling:
                      // className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
        </section>
      </div>
    )
}