import Link from "next/link";
import { useState } from "react";

import { links } from "../lib/constans";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

function NavLinks() {
  return (
    <ul className="flex flex-col gap-y-10 mt-20 mx-auto">
      {links.map((link, index) => (
        <li key={index}>
          <Link href={link.href}>
            <a className="text-xl font-normal text-[#494a50] flex items-center gap-x-4">
              <link.icon className="w-6 h-6" />
              {link.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="hidden md:flex flex-col bg-[#1a171e] w-[240px] h-screen py-14 rounded-r-[45px]">
        <h1 className="text-3xl text-[#EB1C24] font-bold text-center">
          CINEMA
        </h1>
        <NavLinks />
      </div>

      {/* mobile sidebar */}
      <div className="absolute top-5 right-5 md:hidden">
        {mobileOpen ? (
          <XMarkIcon
            className="text-white w-9 h-9 cursor-pointer"
            onClick={() => setMobileOpen(false)}
          />
        ) : (
          <Bars3Icon
            className="text-white w-9 h-9 cursor-pointer"
            onClick={() => setMobileOpen(true)}
          />
        )}
      </div>

      <div
        className={`flex md:hidden flex-col bg-[#1a171e] w-[240px] h-screen py-14 rounded-r-[45px] absolute transition-all delay-150 ease-in-out ${
          mobileOpen ? "left-0" : "-left-full"
        }`}
      >
        <h1 className="text-3xl text-[#EB1C24] font-bold text-center">
          CINEMA
        </h1>
        <NavLinks />
      </div>
    </>
  );
}
