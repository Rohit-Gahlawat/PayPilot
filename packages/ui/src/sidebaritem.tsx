"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({
    href,
    title,
    icon,
}: {
    href: string;
    title: string;
    icon: React.ReactNode;
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href;

    return (
        <div
            onClick={() => router.push(href)}
            className={`
        group relative flex items-center gap-3
        cursor-pointer select-none
        rounded-xl px-3 py-2.5
        justify-center md:justify-start
        transition-colors duration-200
        ${selected
                    ? "bg-[#C9B59C]/25 text-stone-800"
                    : "text-stone-500 hover:bg-[#EFE9E3] hover:text-stone-800"
                }
      `}
        >
            {/* Active accent bar on the left edge */}
            <span
                className={`
          absolute left-0 top-1/2 -translate-y-1/2
          h-6 w-1 rounded-r-full bg-[#C9B59C]
          transition-opacity duration-200
          ${selected ? "opacity-100" : "opacity-0"}
        `}
            />

            {/* Icon — inherits color via currentColor */}
            <span
                className={`
          shrink-0 transition-colors duration-200
          ${selected ? "text-stone-800" : "text-stone-400 group-hover:text-stone-700"}
        `}
            >
                {icon}
            </span>

            {/* Label — hidden on the mobile rail, shown from md up */}
            <span className="hidden text-sm font-semibold md:block">{title}</span>
        </div>
    );
};
