'use client';
import React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Product } from "@/lib/api/products";
import { isLogged } from "@/lib/utils";
import Image from "next/image";
import { motion } from 'framer-motion';

interface FavoritesProps {
  favorites: Product[];
}
export default function SliderSection(favorites: FavoritesProps) {
  const isLogin = isLogged();

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);


  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.5,
      }}
      viewport={{ once: true }}
      className="relative w-full max-w-[1360px] overflow-hidden mb-25 flex flex-col items-center"
    >
      <h2 className="m-0 mb-10 font-inter leading-[1.06] text-primary xl:text-[60px] md:text-[55px] text-[40px] sm:text-[50px] font-semibold text-center">
        Choose your<i className="text-accent"> favorite </i> coffee
      </h2>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
        plugins={[Autoplay({ delay: 8000, stopOnInteraction: true })]}
        className="w-full max-w-[1360px]"
      >
        <CarouselContent>
          {favorites.favorites.map((favorite) => (
            <CarouselItem key={favorite.id}>
              <div className="p-1">
                <div className="flex items-center justify-center">
                  <Image
                    src={`/images/${favorite.id}.jpg`}
                    alt={favorite.name}
                    width={400}
                    height={400}
                    className="border border-ring rounded-[60px] "
                  />
                </div>
                <div className="flex  items-center justify-center pt-6 flex-col">
                  <span className="text-2xl font-bold text-primary mb-2">
                    {favorite.name}
                  </span>
                  <span className="text-lg text-primary mb-2 text-center max-w-[480px] min-h-20">
                    {favorite.description}
                  </span>
                  <div className="flex items-center gap-2">
                    {favorite.discountPrice && isLogin ? (
                      <>
                        <span className="text-2xl font-bold text-primary">
                          ${favorite.discountPrice}
                        </span>
                        <span className="text-2xl text-primary/80 font-semibold line-through">
                          ${favorite.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-primary">
                        ${favorite.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious />
        </div>
        <div className="hidden md:block">
          <CarouselNext />
        </div>
      </Carousel>

      <div className="flex justify-center items-center gap-2 mt-6">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              current === index + 1 ? "bg-primary " : " bg-primary/50"
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}



