"use client";
import React, { useState } from "react";
import { Menu } from "./NavbarMenu";
import Link from "next/dist/client/link";
import { cn } from "@/app/utils/cn";


export function NavbarDemo() {
  return <Navbar />;
}

function Navbar({ className }: { className?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={cn(
        "relative fixed inset-x-0 mx-auto z-50 flex items-center justify-between bg-white p-[0.3rem] border-b-2 border-gray-300",
        className
      )}
    >
      {/* Left (desktop menu) */}
      <div className="hidden sm:flex items-center">
        <Menu>
          <Link
            className="text-neutral-700 font-bold px-[0.1rem] lg:px-[0.5rem] text-sm lg:text-lg hover:text-red-500 cursor-pointer"
            href="inicio"
            
          >
            INICIO
          </Link>
          <Link
            className="text-neutral-700 font-bold px-[0.1rem] lg:px-[0.5rem] text-sm lg:text-lg hover:text-red-500 cursor-pointer"
            href="nosotros"
            
          >
            NOSOTROS
          </Link>
        </Menu>
      </div>

      {/* Centered logo */}
      <div className="logo absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto">
        <Link href="hero"  className="cursor-pointer">
          <img
            src="/fillsLogo.png"
            alt="Company Logo"
            className="h-[6rem] w-auto"
          />
        </Link>
      </div>

      {/* Right (desktop extra links) */}
      <div className="hidden sm:flex items-center space-x-2">
        <Menu>
          <Link
            className="text-neutral-700 font-bold px-[0.1rem] lg:px-[0.5rem] text-sm lg:text-lg hover:text-red-500 cursor-pointer"
            href="marcas"
           
          >
            MARCAS
          </Link>
          <Link
            className="text-neutral-700 font-bold px-[0.1rem] lg:px-[0.5rem] text-sm lg:text-lg hover:text-red-500 cursor-pointer"
            href="contactanos"
            
          >
            CONTACTANOS
          </Link>
        </Menu>
      </div>

      {/* Mobile button (kept on the right) */}
      <button
        className="sm:hidden flex items-center text-neutral-700 focus:outline-none z-50"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <div className="space-y-2">
          <span className="block w-6 h-0.5 bg-gray-700"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
        </div>
      </button>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-40 sm:hidden">
          <Menu>
            <Link
              className="text-neutral-700 font-bold text-lg hover:text-red-500 cursor-pointer"
              href="hero"
              
            >
              INICIO
            </Link>
            <Link
              className="text-neutral-700 font-bold  text-lg hover:text-red-500 cursor-pointer"
              href="tabsDemo"
              
            >
              UNIDADES DE NEGOCIO
            </Link>
            <Link
              className="text-neutral-700 font-bold  text-lg hover:text-red-500 cursor-pointer"
              href="marcas"
              
            >
              MARCAS
            </Link>
            <Link
              className="text-neutral-700 font-bold  text-lg hover:text-red-500 cursor-pointer"
              href="nosotros"
              
            >
              NOSOTROS
            </Link>
            <Link
              className="text-neutral-700 font-bold  text-lg hover:text-red-500 cursor-pointer"
              href="contactanos"
              
            >
              CONTACTANOS
            </Link>
          </Menu>
        </div>
      )}
    </nav>
  );
}
