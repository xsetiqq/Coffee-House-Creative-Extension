"use client";
import SliderSection from "@/components/Mainpage/slider-section";
import AboutSection from "@/components/Mainpage/about-section";
import VideoSection from "@/components/Mainpage/video-section";
import { FullScreenLoader } from "@/components/ui/FullScreenLoader";
import { useGetFavorites } from "@/lib/hooks/useProducts";
import { Coffee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from 'react'
import MobileSection from "@/components/Mainpage/mobile-section";

export default function Home() {
  const {
    data: favoritesResponse,
    isLoading,
    isError,
  } = useGetFavorites();

const [allLoadedInAbout, setAllLoadedInAbout] = useState(false);
const [allLoadedInMobile, setAllLoadedInMobile] = useState(false);
 
if (allLoadedInAbout && allLoadedInMobile ) {
  console.log(allLoadedInAbout);
}



  return (
    <div className="flex font-sans relative w-full flex-col">
      {isLoading && <FullScreenLoader />}
      <VideoSection />
      {!isError && favoritesResponse ? (
        <SliderSection favorites={favoritesResponse.data} />
      ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-[1360px] mb-25">
          <p className="text-destructive text-lg mb-4">
            Fail to load favorite products at this time. Try to refresh the
            page.
          </p>
        </div>
      )}
      <AboutSection onAllImagesLoaded={() => setAllLoadedInAbout(true)} />
      <MobileSection onAllImagesLoaded={() => setAllLoadedInMobile(true)} />
    </div>
  );
}
