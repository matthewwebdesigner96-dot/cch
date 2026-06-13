"use client";

import { PortfolioItem } from "@/lib/wordpress";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const PortfolioList = ({ data }: { data: PortfolioItem[] }) => {
  return (
    <motion.section className="w-full flex flex-col">
      {data.map((el) => (
        <Link key={el.id} href={"/portfolios/" + el.slug}>
          <motion.div className="group text-white bg-white/10 backdrop-blur-xl border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] md:hover:bg-white md:hover:text-navy-dark md:hover:border-white transition-all duration-500 ease-in min-h-72 flex flex-col md:flex-row lg:gap-20 cursor-pointer overflow-hidden">
            <div className="relative w-full h-60 md:w-113 md:h-auto overflow-hidden">
              <Image
                className="
                  object-cover md:grayscale
                  md:group-hover:grayscale-0 md:group-hover:scale-105
                  transition-all duration-500 ease-in
                "
                src={el.acf.cover_image}
                alt={el.title.rendered}
                fill
                sizes="(min-width: 768px) 452px, 100vw"
              />
              <Image
                className="block group-hover:hidden absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-62 brightness-100"
                src={el.acf.project_logo}
                alt={el.title.rendered}
                height={80}
                width={240}
              />
            </div>
            <motion.div
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="py-10 md:py-0 px-4.5 self-center flex flex-col gap-4 md:max-h-48 overflow-hidden text-left"
            >
              <span className="w-fit text-gold font-light text-lg">{el.acf.key_tags}</span>
              <h2 className="text-2xl font-semibold font-heading">
                {el.title.rendered}
              </h2>
              <p className="md:max-w-[70ch]">
                {el.excerpt.rendered.replace(/<[^>]*>/g, "")}
              </p>
              <span className="md:hidden px-4 py-2 rounded-4xl text-xs w-fit bg-blue-light text-blue-deep uppercase tracking-wide">
                LEARN MORE
              </span>
            </motion.div>
          </motion.div>
        </Link>
      ))}
    </motion.section>
  );
};

export default PortfolioList;
