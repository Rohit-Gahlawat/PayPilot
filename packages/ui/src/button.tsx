"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C9B59C] px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm transition-all duration-200 hover:brightness-95 hover:shadow active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9B59C] focus-visible:ring-offset-2"
    >
      {children}
    </button>
  );
};
