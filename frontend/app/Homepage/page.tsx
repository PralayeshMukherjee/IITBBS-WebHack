"use client";
import { Orbitron } from "next/font/google";
import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { History, BellRing, LayoutDashboard } from "lucide-react";

import earthi from "../../public/images/earthi.png";
import avt from "../../public/icon/avt.png";

const lines = [
 
  "Your Cosmic Calendar is updated.",
  "The sky has been busy since your last login.",
  "There are new objects tracked in our neighborhood today.",
];
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
});
// Typewriter container
const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

// Typewriter letter animation
const letter: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// Floating animation
const floating: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

const Homepage = () => {
  return (
    <div className="bg-[radial-gradient(circle,rgba(1,2,18,1)_0%,rgba(13,25,43,1)_100%)] min-h-screen bg-cover bg-center relative">

      {/* NAVBAR */}
      <div className="flex items-center justify-between border-b border-amber-50 px-3">
        <a href="#" className="text-white hover:text-gray-400 p-4 font-semibold">
          VOID
        </a>

        <nav>
          <ul className="flex items-center gap-6 p-4">
            <li className="relative group">
              <a href="/" className="text-white">
                <LayoutDashboard />
              </a>
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition bg-blue-950 text-white text-xs px-3 py-1 rounded-md border border-blue-900">
                Dashboard
              </span>
            </li>

            <li className="relative group">
              <a href="#" className="text-white">
                <History />
              </a>
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition bg-blue-950 text-white text-xs px-3 py-1 rounded-md border border-blue-900">
                History
              </span>
            </li>

            <li className="relative group">
              <a href="#" className="text-white">
                <BellRing />
              </a>
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition bg-blue-950 text-white text-xs px-3 py-1 rounded-md border border-blue-900">
                Notifications
              </span>
            </li>

            <li className="relative group">
              <Image src={avt} alt="Avatar" className="w-6 h-6 rounded-full" />
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition bg-blue-950 text-white text-xs px-3 py-1 rounded-md border border-blue-900">
                Profile
              </span>
            </li>
          </ul>
        </nav>
      </div>

      {/* EARTH IMAGE */}
      <div className="h-screen flex justify-center items-center">
        <Image
          src={earthi}
          alt="Earth"
          className="mt-10 opacity-50 translate-y-[20%] h-[80%] w-auto"
        />
      </div>

      {/* TYPEWRITER + FLOATING TEXT */}
       <p className=" absolute top-[45%] -translate-y-1/2 font-serif ml-8  z-30  text-4xl font-sans-serif bg-clip-text text-sky-200  mb-2 tracking-widest ">
        "Welcome back, Enthusiast",       </p>
      
      <div className="text-gray-300 absolute top-1/2 -translate-y-1/2 font-mono ml-10 space-y-[1.3] z-30 text-lg mt-12">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            variants={floating}
            animate="animate"
          >
            <motion.p
              variants={container}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap"
            >
              {line.split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={letter}
                  className="whitespace-pre"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        ))}
      </div>

      </div>

  );
};

export default Homepage;
