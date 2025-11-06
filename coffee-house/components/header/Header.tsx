"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "../ui/theme-switcher";
import { ShoppingCart } from "lucide-react";

import UserMenu from "./usermenu/Usermenu";
import { MobileMenu } from "./mobile-menu";



function Header() {
  return (
    <header className="relative flex bg-background mx-auto max-w-[1440px] items-center justify-between px-4 md:px-10 py-5">
      <div className="flex items-center gap-16 justify-center">
        <Link href={"/"}>
          <Image
            src={"/header/coffee-house-logo.svg"}
            alt={"coffe-house-logo"}
            width={100}
            height={60}
          />
        </Link>

        <nav className="hidden lg:flex gap-10 items-center text-md font-semibold text-primary">
          <Link
            href="#favorite"
            className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5
                 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Favorite coffee
          </Link>

          <Link
            href="#about"
            className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5
                 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            About
          </Link>

          <Link
            href="#mobile"
            className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5
                 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Mobile app
          </Link>

          <Link
            href="#contact"
            className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5
                 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Contact us
          </Link>
        </nav>
      </div>
      <div className="hidden md:flex gap-8 items-center">
        <ModeToggle />
        <UserMenu />
        <Link
          href={"/"}
          className="relative text-md font-semibold text-primary flex gap-2 items-center justify-center
                 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5
                 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
        >
          <ShoppingCart className="w-8 h-8" />
          <div>
            <div className="bg-primary rounded-full text-background text-sm flex items-center justify-center">
              0
            </div>
            <p>Cart</p>
          </div>
        </Link>
      </div>
      <div className="md:hidden">
        <MobileMenu />
      </div>
    </header>
  );
}

export default Header;
