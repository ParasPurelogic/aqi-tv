"use client";

import { Link } from "@/components/elements";
import { routes } from "@/config/routes";
import cn from "@/utility/cn";
import { usePathname } from "next/navigation";

const Navs = () => {
  // pathName
  const pathName = usePathname();

  // Navs
  const navs = [
    {
      ...routes.screens,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="aspect-[24/22] min-w-[2.2rem] max-w-[2.2rem]"
          fill="none"
          viewBox="0 0 24 22"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 20.917h4.667m-4.667 0H7.333m4.667 0V16.25m0 0c4.667 0 8.75-.389 9.333-.778S22.5 11.778 22.5 8.667c0-3.112-.583-6.417-1.167-6.806-.583-.389-4.666-.778-9.333-.778s-8.75.39-9.333.778C2.083 2.25 1.5 5.555 1.5 8.667c0 3.11.583 6.416 1.167 6.805.583.39 4.666.778 9.333.778"
          ></path>
        </svg>
      ),
    },
    {
      ...routes.myAccount,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="aspect-[20/23] min-w-[2.2rem] max-w-[2.2rem]"
          fill="none"
          viewBox="0 0 20 23"
        >
          <path
            fill="currentColor"
            d="M2.408 7.246c0 3.986 3.261 7.246 7.246 7.246s7.247-3.26 7.247-7.246C16.9 3.261 13.64 0 9.654 0S2.408 3.26 2.408 7.246m12.788 0c0 3.048-2.494 5.541-5.542 5.541s-5.54-2.493-5.54-5.54 2.493-5.542 5.54-5.542 5.542 2.494 5.542 5.541M1.215 22.25a11.83 11.83 0 0 1 8.44-3.495 11.83 11.83 0 0 1 8.44 3.495l1.214-1.215a13.64 13.64 0 0 0-9.655-3.985A13.64 13.64 0 0 0 0 21.035z"
          ></path>
        </svg>
      ),
    },
    {
      ...routes.playlist,
      name: "Manage Playlist",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="aspect-[20/23] min-w-[2.2rem] max-w-[2.2rem]"
          fill="none"
          viewBox="0 0 20 23"
        >
          <path
            fill="currentColor"
            d="M2.408 7.246c0 3.986 3.261 7.246 7.246 7.246s7.247-3.26 7.247-7.246C16.9 3.261 13.64 0 9.654 0S2.408 3.26 2.408 7.246m12.788 0c0 3.048-2.494 5.541-5.542 5.541s-5.54-2.493-5.54-5.54 2.493-5.542 5.54-5.542 5.542 2.494 5.542 5.541M1.215 22.25a11.83 11.83 0 0 1 8.44-3.495 11.83 11.83 0 0 1 8.44 3.495l1.214-1.215a13.64 13.64 0 0 0-9.655-3.985A13.64 13.64 0 0 0 0 21.035z"
          ></path>
        </svg>
      ),
    },
  ];

  // Return JSX
  return (
    <div className="[&_>_.op]:p-[2.5rem_5rem]">
      {/* Title */}
      <span className="op block">OPTIONS</span>

      {/* Navs */}
      {navs.map((nav) => {
        // is current
        const isCurrentPath = pathName.includes(nav.pathname);

        // Return Nav
        return (
          <Link
            key={nav.id}
            href={nav.url}
            className={cn(
              "op flex items-center gap-[1.2rem] text-title hover:bg-[#E5EAFA]/50 transition",
              isCurrentPath && "font-bold bg-[#E5EAFA]"
            )}
          >
            {/* Icon */}
            {nav.icon}

            {/* Name  */}
            <span className="truncate">{nav.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Navs;
