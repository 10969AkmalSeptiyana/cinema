import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { links } from "../lib/constans";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

function NavLinks() {
  const router = useRouter();

  return (
    <ul className="flex flex-col gap-y-10 mt-20 mx-auto">
      {links.map((link, index) => (
        <li
          key={index}
          className={router.pathname === link.href ? "active" : ""}
        >
          <Link href={link.href} passHref>
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
      <header>
        <nav className="hidden md:flex sticky top-0 h-screen flex-col bg-[#1a171e] w-[240px] py-14 rounded-r-[45px]">
          <h1 className="text-3xl text-[#EB1C24] font-bold text-center">
            CINEMA
          </h1>
          <NavLinks />
        </nav>
      </header>

      {/* mobile sidebar */}
      <div className="fixed top-7 right-5 z-10 md:hidden">
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

      <header>
        <nav
          className={`flex md:hidden flex-col bg-[#1a171e] w-[240px] py-14 rounded-r-[45px] fixed h-screen z-50 transition-all delay-150 ease-in-out ${
            mobileOpen ? "left-0" : "-left-full"
          }`}
        >
          <h1 className="text-3xl text-[#EB1C24] font-bold text-center">
            CINEMA
          </h1>
          <NavLinks />
        </nav>
      </header>
    </>
  );
}
