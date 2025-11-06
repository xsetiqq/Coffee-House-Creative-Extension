"use client";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/lib/hooks/useGetUserFromLS";

export function MobileMenu() {
    const {
        user,
        username,
        isLoading,
      } = useUser();
  return (
    <Drawer direction="right">
      <DrawerTrigger
        aria-label="open mobile menu"
        className="inline-flex items-center justify-center rounded-md p-2 hover:bg-muted focus:outline-none focus:ring-0 "
      >
        <Menu className="h-6 w-6 text-primary" />
      </DrawerTrigger>

      <DrawerContent
        aria-describedby={undefined}
        className="right-0 ml-auto h-full w-[85vw] max-w-sm border-l bg-background/95 backdrop-blur-md border-ring"
      >
        <DrawerHeader className="flex items-center justify-between px-6 border-b border-ring">
          <DrawerTitle className="text-xl font-semibold tracking-tight text-primary">
            {username ? `Hi, ${username}` : "Welcome, to Coffee House!"}
          </DrawerTitle>
        </DrawerHeader>

        <nav className="mt-6 flex flex-col gap-2 px-4">
          <DrawerClose asChild>
            <Link
              href="#favorite"
              className="group flex items-center justify-between rounded-lg px-4 py-3 text-xl font-medium text-primary  hover:bg-muted hover:text-foreground transition-all"
            >
              Favorite coffee
            </Link>
          </DrawerClose>

          <DrawerClose asChild>
            <Link
              href="#about"
              className="group flex items-center justify-between rounded-lg px-4 py-3 text-xl font-medium text-primary hover:bg-muted hover:text-foreground transition-all"
            >
              About
            </Link>
          </DrawerClose>

          <DrawerClose asChild>
            <Link
              href="#mobile"
              className="group flex items-center justify-between rounded-lg px-4 py-3 text-xl font-medium text-primary hover:bg-muted hover:text-foreground transition-all"
            >
              Mobile app
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <Link
              href="#contact"
              className="group flex items-center justify-between rounded-lg px-4 py-3 text-xl font-medium text-primary hover:bg-muted hover:text-foreground transition-all"
            >
              Contact us
            </Link>
          </DrawerClose>
          {isLoading || !user ? (
            <DrawerClose asChild>
              <Link
                href="/auth-user"
                className="group flex items-center justify-between rounded-lg px-4 py-3 text-xl font-medium text-primary hover:bg-muted hover:text-foreground transition-all"
              >
                Sign in / Register
              </Link>
            </DrawerClose>
          ) : (
            <DrawerClose asChild>
              <button
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center justify-between rounded-lg px-4 py-3 text-xl font-medium text-primary hover:bg-muted hover:text-foreground transition-all"
              >
                Profile
              </button>
            </DrawerClose>
          )}

          <DrawerClose asChild className="border-t pt-5 border-ring">
            <Link
              href={"/"}
              className="relative text-md font-semibold text-primary flex gap-2 items-center pl-4
                 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5
                 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              <div>
                <div className="bg-primary rounded-full text-background text-sm flex items-center justify-center">
                  0
                </div>
                <p>Cart</p>
              </div>
              <ShoppingCart className="w-8 h-8" />
            </Link>
          </DrawerClose>
        </nav>

        <div className="mt-auto px-6 py-6 flex justify-center">
          <Image
            src={"/header/coffee-house-logo.svg"}
            alt={"coffe-house-logo"}
            width={100}
            height={60}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
