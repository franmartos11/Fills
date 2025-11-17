"use client";
import React from "react";
import Link, { LinkProps } from "next/link";
import Image from "next/image";

export const Menu = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="relative shadow-input flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4 py-4 sm:py-6">
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black">{title}</h4>
        <p className="text-neutral-700 text-sm max-w-[10rem]">{description}</p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
  ...rest
}: LinkProps & { children: React.ReactNode }) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 text-xl hover:text-red-500"
    >
      {children}
    </Link>
  );
};
