"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "../ui/theme-switcher";


function Header() {
  return (
    <header className="flex bg-background mx-auto max-w-[1440px] items-center justify-between px-4 md:px-10 py-5">
      <Link href={"/"}>
        <Image
          src={"/header/coffee-house-logo.svg"}
          alt={"coffe-house-logo"}
          width={100}
          height={60}
        ></Image>
      </Link>
      <nav className="hidden lg:flex gap-10 items-center text-md font-semibold text-primary ">
        <Link href="#favorite" className="">
          Favorite coffee
        </Link>
        <Link href="#about" className="">
          About
        </Link>
        <Link href="#mobile" className="">
          Mobile app
        </Link>
        <Link href="#contact" className="">
          Contact us
        </Link>
      </nav>
      <div className="hidden lg:flex gap-4 items-center">
        <Link className=" text-md font-semibold text-primary " href={"/"}>
          Login
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
