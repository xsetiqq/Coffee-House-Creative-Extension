"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <div
      className="relative w-full max-w-[1360px] overflow-hidden mb-25 flex flex-col items-center"
      id="about"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="m-0 mb-10 font-inter leading-[1.06] text-primary xl:text-[58px] md:text-[55px] text-[40px] sm:text-[50px] font-semibold text-center xl:text-start"
      >
        Resource is<i className="text-accent"> the perfect and cozy place </i>{" "}
        where you can enjoy a variety of hot beverages, relax, catch up with
        friends, or get some work done.
      </motion.h2>
      <div className="flex gap-10 flex-col md:flex-row w-full">
        <div className="flex gap-10 flex-col  w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="rounded-xl object-cover w-full h-[590px] relative"
          >
            <Image
              src={"/about/about1.jpg"}
              alt={"Girl"}
              width={400}
              height={400}
              priority={true}
              className="rounded-xl object-cover w-full h-[590px]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="hidden md:block rounded-xl object-cover w-full h-[430px]"
          >
            <Image
              src={"/about/about-2.jpg"}
              alt={"Man"}
              width={200}
              height={200}
              priority={true}
              className="hidden md:block rounded-xl object-cover w-full h-[430px]"
            />
          </motion.div>
        </div>
        <div className="flex gap-10 flex-col w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="hidden md:block rounded-xl object-cover w-full  h-[430px] relative"
          >
            <Image
              src={"/about/about-3.jpg"}
              alt={"Coffee"}
              fill
              priority={true}
              className="hidden md:block rounded-xl w-full  h-[430px] object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="rounded-xl  w-full h-[590px] relative"
          >
            <Image
              src={"/about/about-4.jpg"}
              alt={"Couple"}
              fill
              priority={true}
              className="rounded-xl object-cover w-full h-[590px]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
