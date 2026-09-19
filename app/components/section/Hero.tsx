"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.section
      className="relative flex-1 px-4 flex items-center h-full w-full max-w-7xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-150 lg:max-w-full flex flex-col gap-8 md:gap-12">
        <motion.h1
          className="text-white text-4xl md:text-5xl md:leading-15 lg:text-8xl lg:tracking-tighter lg:leading-24 font-semibold font-heading"
          variants={itemVariants}
        >
          FUNDING SOLUTIONS BUILT ON TRUST
        </motion.h1>
        <motion.div variants={itemVariants}>
          <Link href="/portfolios" className="w-fit hover:bg-blue-light hover:text-blue-deep bg-blue-deep text-blue-light px-4 lg:px-6 py-2 rounded-4xl text-xs lg:text-base cursor-pointer transition-all ease-in duration-200 uppercase tracking-wide">
            LEARN MORE
          </Link>
        </motion.div>
      </div>

      <Image
        className="absolute bottom-10 -right-3/4 sm:-right-1/3 xl:-right-1/4 opacity-60 w-150 h-70 lg:w-150 lg:h-100"
        height={360}
        width={420}
        src="/logo.png"
        alt=""
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="rotate-90"
          width="48"
          height="48"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.75 30L41.25 30" stroke="#0C2438" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M33.75 37.5L41.25 30L33.75 22.5" stroke="#0C2438" strokeWidth="2.5" strokeLinecap="round" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 30C5 43.8071 16.1929 55 30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5C16.1929 5 5 16.1929 5 30Z"
            stroke="#0C2438"
            strokeWidth="2"
          />
        </svg>
      </div>
    </motion.section>
  );
};

export default Hero;
