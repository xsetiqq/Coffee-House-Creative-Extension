"use client";
import SliderSection from "@/components/Mainpage/slider-section";
import AboutSection from "@/components/Mainpage/about-section";
import VideoSection from "@/components/Mainpage/video-section";
import { FullScreenLoader } from "@/components/ui/FullScreenLoader";
import { useGetFavorites, useGetProducts } from "@/lib/hooks/useProducts";
import React, { useEffect, useMemo, useState } from "react";

import MenuSection from "@/components/Menupage/menu-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Product, ProductsResponse } from "@/lib/api/products";
import { sortByCategory } from "@/lib/utils";
import { motion } from 'framer-motion';

export default function Home() {
  const { data: products, isLoading, isError } = useGetProducts();
  const [tab, setTab] = useState("Coffee");

  const categorizedProducts = products
    ? sortByCategory(products)
    : { coffee: [], tea: [], dessert: [] };

  console.log(categorizedProducts.coffee);

  return (
    <div className="flex font-sans relative w-full flex-col">
      {isLoading && <FullScreenLoader />}
      <div className="w-full flex items-center justify-center ">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: "backOut",
            delay: 0.2,
          }}
          className="m-0 mb-10 font-inter leading-[1.06] text-primary xl:text-[60px] md:text-[55px] text-[40px] sm:text-[50px] font-semibold text-center max-w-[800px]"
        >
          Behind each of our cups hides an{" "}
          <i className="text-accent"> amazing surprise </i>
        </motion.h2>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          ease: "backOut",
          delay: 0.5,
        }}
        className="flex font-sans relative w-full justify-center h-[46px] gap-0.5 sm:gap-4"
      >
        <Button
          variant={"ghost"}
          onClick={() => setTab("Coffee")}
          className={`text-md font-semibold text-primary flex items-center justify-center
                  after:absolute rounded-4xl
                  hover:bg-foreground hover:text-secondary  after:duration-300 cursor-pointer border border-ring p-2 h-[46px] w-[115px] gap-2
                  ${tab === "Coffee" ? "bg-foreground text-secondary" : ""}`}
        >
          <Image
            src={"/menu/coffe.png"}
            alt={"coffee"}
            width={30}
            height={30}
            priority={true}
          />
          Coffee
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => setTab("Tea")}
          className={`text-md font-semibold hover:text-secondary text-primary flex  items-center justify-center
                  after:absolute  rounded-4xl
                hover:bg-foreground after:duration-300  cursor-pointer border border-ring p-2 h-[46px] w-[90px] gap-2 ${
                  tab === "Tea" ? "bg-foreground text-secondary" : ""
                }`}
        >
          <Image
            src={"/menu/tea.png"}
            alt={"coffee"}
            width={30}
            height={30}
            priority={true}
          />
          Tea
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => setTab("Dessert")}
          className={`text-md font-semibold hover:text-secondary text-primary flex  items-center justify-center
                  after:absolute  rounded-4xl
                hover:bg-foreground  after:duration-300  cursor-pointer border border-ring p-2 h-[46px] w-[124px] gap-2 ${
                  tab === "Dessert" ? "bg-foreground text-secondary" : ""
                }`}
        >
          <Image
            src={"/menu/dessert.png"}
            alt={"coffee"}
            width={30}
            height={30}
            priority={true}
          />
          Dessert
        </Button>
      </motion.div>
      <Tabs value={tab} onValueChange={setTab} defaultValue="account">
        <TabsContent value="Coffee">
          {!isError && products ? (
            <MenuSection products={categorizedProducts.coffee} />
          ) : (
            <div className="flex flex-col items-center justify-center w-full max-w-[1360px] mb-25">
              <p className="text-destructive text-lg mb-4 pt-30">
                Fail to load favorite products at this time. Try to refresh the
                page.
              </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="Tea">
          {!isError && products ? (
            <MenuSection products={categorizedProducts.tea} />
          ) : (
            <div className="flex flex-col items-center justify-center w-full max-w-[1360px] mb-25">
              <p className="text-destructive text-lg mb-4 pt-30">
                Fail to load favorite products at this time. Try to refresh the
                page.
              </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="Dessert">
          {!isError && products ? (
            <MenuSection products={categorizedProducts.dessert} />
          ) : (
            <div className="flex flex-col items-center justify-center w-full max-w-[1360px] mb-25">
              <p className="text-destructive text-lg mb-4 pt-30">
                Fail to load favorite products at this time. Try to refresh the
                page.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
