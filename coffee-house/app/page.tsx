"use client";
import { useGetFavorites } from "@/lib/hooks/useProducts";
import Image from "next/image";

export default function Home() {
  const {
    data: favoritesResponse,
    isLoading,
    isError,
    error,
  } = useGetFavorites();
  console.log(favoritesResponse);
  console.log(isLoading);
 
  console.log(isError);
  console.log(error);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     
     
    </div>
  );
}
