
"use client";
import React, {  useEffect, useState  } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";

type AboutSectionProps = {
  onAllImagesLoaded?: () => void;
};
export default function MobileSection({ onAllImagesLoaded }: AboutSectionProps) {
   const totalImages = 3;
   const [loadedCount, setLoadedCount] = useState(0);

   const handleImageLoad = () => {
     setLoadedCount((prev) => prev + 1);
   };

   useEffect(() => {
     if (loadedCount === totalImages) {
       const t = setTimeout(() => {
         onAllImagesLoaded?.();
       }, 0);
       return () => clearTimeout(t);
     }
   }, [loadedCount, totalImages, onAllImagesLoaded]);
  return (
    <div
      className="relative w-full max-w-[1360px] overflow-hidden mb-25 flex flex-col items-center"
      id="mobile"
    >
      <div className="flex gap-10 sm:gap-25 flex-col lg:flex-row w-full">
        <div className="flex gap-10 flex-col  lg:max-w-[630px] justify-center items-center w-full">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="m-0 font-inter leading-[1.06] text-primary xl:text-[58px] md:text-[55px] text-[40px] sm:text-[50px] font-semibold text-center xl:text-start"
          >
            <i className="text-accent"> Download </i> our apps to start ordering
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="m-0  font-inter leading-[1.06] text-lg text-primary font-semibold text-start w-full"
          >
            Download the Resource app today and experience the comfort of
            ordering your favorite coffee from wherever you are
          </motion.h2>

          <div className="flex gap-4 w-full sm:flex-row flex-col justify-center lg:justify-start pl-2">
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="flex items-center justify-center"
            >
              <Link
                href={"https://www.apple.com/pl/app-store/"}
                className="border border-primary flex rounded-4xl w-55 items-center justify-around px-3 h-16"
              >
                <Image
                  src={"/mobile/apple.svg"}
                  alt={"Couple"}
                  width={32}
                  height={32}
                  onLoad={handleImageLoad}
                  priority={true}
                />
                <div className="font-semibold text-primary">
                  <p className="text-sm">Avaliable on the</p>
                  <h3 className="text-xl">App Store</h3>
                </div>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="flex items-center justify-center"
            >
              <Link
                href={"https://play.google.com/"}
                className="border border-primary flex rounded-4xl w-55 items-center justify-around px-3 h-16"
              >
                <Image
                  src={"/mobile/Google.svg"}
                  alt={"Couple"}
                  width={32}
                  height={32}
                  priority={true}
                  onLoad={handleImageLoad}
                />
                <div className="font-semibold text-primary ">
                  <p className="text-sm">Get it on</p>
                  <h3 className="text-xl">Google Play</h3>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="flex gap-10 flex-col w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.5,
              ease: "backOut",
              delay: 0.2,
            }}
            viewport={{ once: true }}
            className="rounded-xl  w-full h-full"
          >
            <motion.div
              initial={{ y: 0, scale: 1 }}
              animate={{ y: [0, -0, 0], scale: [1, 1.03, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="rounded-xl  w-full h-full"
            >
              <Image
                src={"/mobile/mobile-screens.png"}
                alt={"Couple"}
                width={630}
                height={630}
                priority={true}
                onLoad={handleImageLoad}
                className="rounded-xl  w-full h-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}



