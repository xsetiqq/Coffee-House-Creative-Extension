"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "../ui/theme-switcher";
import { Clock3, MapPin, Phone } from "lucide-react";
import { motion } from 'framer-motion';





function Footer() {
  return (
    <footer id="contact" className="relative flex   mx-4 sm:mx-12  items-center justify-center mb-10 ">
      <div className="flex xl:gap-25 gap-10 sm:gap-15 max-w-[1360px] w-full bg-foreground px-4 py-15 xl:p-25 rounded-[40px] md:flex-row flex-col items-center ">
        <div className="flex max-w-[530px] w-full flex-col gap-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, scale: 0.95, x: -50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
              }}
              viewport={{ once: true }}
              className="text-secondary xl:text-[60px] md:text-[55px] text-[40px] sm:text-[50px] font-semibold md:text-start sm:text-center text-start"
            >
              Sip, Savor, Smile.
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, scale: 0.95, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.7,
              }}
              viewport={{ once: true }}
              className="text-accent xl:text-[60px] md:text-[55px] text-[40px] sm:text-[50px] font-semibold md:text-start sm:text-center text-start"
            >
              <i>It’s coffee time!</i>
            </motion.h2>
          </div>
          <div className="flex gap-3 w-full sm:justify-center md:justify-start justify-start ">
            <Link
              href="https://www.twitter.com/"
              target="_blank"
              className="group h-[60px] w-[60px] border border-secondary rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-background"
            >
              <Image
                src="/footer/twitter.svg"
                alt="facebook-icon"
                width={25}
                height={25}
                className="transition duration-300 group-hover:brightness-1"
              />
            </Link>
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              className="group h-[60px] w-[60px] border border-secondary rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-background"
            >
              <Image
                src="/footer/instagram.svg"
                alt="facebook-icon"
                width={25}
                height={25}
                className="transition duration-300 group-hover:brightness-1"
              />
            </Link>
            <Link
              href="https://www.facebook.com/"
              target="_blank"
              className="group h-[60px] w-[60px] border border-secondary rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-background"
            >
              <Image
                src="/footer/facebook.svg"
                alt="facebook-icon"
                width={25}
                height={25}
                className="transition duration-300 group-hover:brightness-1"
              />
            </Link>
          </div>
        </div>
        <div className="flex gap-8  max-w-[530px] w-full text-secondary flex-col items-start text-center md:items-start md:text-start sm:items-center ">
          <h3 className="font-semibold">Contact us</h3>

          <div className="flex flex-col gap-4">
            <Link
              href="#favorite"
              className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5
                 after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-2/3 flex items-center  gap-2"
            >
              <MapPin /> 8558 Green Rd., LA
            </Link>
            <Link
              href="#favorite"
              className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5
                 after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-2/3 flex items-center  gap-2"
            >
              <Phone /> +1 (603) 555-0123
            </Link>
            <Link
              href="#favorite"
              className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5
                 after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full flex items-center  gap-2"
            >
              <Clock3 /> Mon-Sat: 9:00 AM – 23:00 PM
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
