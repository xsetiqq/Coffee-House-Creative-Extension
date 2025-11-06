"use client";
import { FullScreenLoader } from "@/components/ui/FullScreenLoader";
import { useGetFavorites } from "@/lib/hooks/useProducts";
import { Coffee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from 'react'

export default function Home() {
  // const {
  //   data: favoritesResponse,
  //   isLoading,
  //   isError,
  //   error,
  // } = useGetFavorites();

 const [isLoaded, setIsLoaded] = useState(false);

 useEffect(() => {
   const timer = setTimeout(() => {
     setIsLoaded(true);
   }, 2000); 

   return () => clearTimeout(timer);
 }, []);

  return (
    <div className="flex font-sans relative w-full">
      {!isLoaded && <FullScreenLoader />}

      <div className="relative w-full max-w-[1360px] rounded-[40px] h-[644px] overflow-hidden">
        <video
          className="w-full  h-[644px] object-cover block transition-opacity duration-700 "
          autoPlay
          muted
          loop
          playsInline
          aria-label="Enjoy premium coffee"
        >
          <source src="/header/video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/30 max-h-[644px]" />

        <div className="absolute inset-0 max-w-[760px] px-4 py-15 md:p-25 text-white transition-opacity duration-700 h-full flex">
          <div className="flex flex-col justify-around  h-full ">
            <h1 className="m-0 mb-10 font-inter   leading-[1.06] text-secondary xl:text-[60px] md:text-[55px] text-[40px] sm:text-[50px] font-semibold md:text-start sm:text-center text-start">
              <i className="text-accent">Enjoy </i>
              premium coffee at our charming cafe
            </h1>

            <p className="text-[16px] leading-6 font-light max-w-[640px] mb-8">
              With its inviting atmosphere and delicious coffee options, the
              Coffee House Resource is a popular destination for coffee lovers
              and those seeking a warm and inviting space to enjoy their
              favorite beverage.
            </p>

            <Link
              href="/menu"
              className="relative inline-flex items-center w-50 gap-2 justify-center rounded-full px-16 py-4 bg-[#e1d4c9] text-[#403f3d] font-semibold text-[16px] leading-7 transition-all duration-300 hover:bg-[#d6c8b7] hover:shadow-[0_0_12px_rgba(225,212,201,0.6)] group"
            >
              Menu
              <Coffee className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
}
