"use client";

import { PortfolioItem } from "@/lib/wordpress";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const playfair = Inter({
  subsets: ["latin"],
  display: "swap",
});

const PortfolioList = ({ data }: { data: PortfolioItem[] }) => {
  return (
    <section className="w-full flex flex-col">
      {data.map((el) => {
        const rawDescription =
          el.acf.description || el.excerpt.rendered.replace(/<[^>]*>/g, "");
        const description = rawDescription.replace(/^Overview\s*/i, "");

        return (
          <Link key={el.id} href={"/portfolios/" + el.slug}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="group flex flex-col md:flex-row cursor-pointer transition-all duration-300 border-b border-black/10 bg-white text-navy-dark hover:bg-navy-dark hover:text-white"
            >
              {/* Image */}
              <div className="relative w-full h-56 md:w-72 lg:w-112 md:h-auto shrink-0 overflow-hidden self-stretch">
                <Image
                  className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  src={el.acf.cover_image}
                  alt={el.title.rendered}
                  fill
                  sizes="(min-width: 1024px) 448px, (min-width: 768px) 288px, 100vw"
                />
                <Image
                  className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-32 brightness-0 invert"
                  src={el.acf.project_logo}
                  alt={el.title.rendered}
                  height={50}
                  width={128}
                />
              </div>

              {/* Content — simple flex on md, 3-col grid on lg */}
              <div className="flex flex-1 flex-col justify-center gap-3 px-6 py-6 md:px-10 md:py-20 md:grid md:grid-cols-[1fr_1.8fr] lg:grid-cols-[1fr_1.8fr_auto] md:items-center md:gap-x-10 lg:gap-x-16">
                {/* Label + tag + title */}
                <div className="flex flex-col gap-4">
                  <Image
                    src="/logo.svg"
                    alt="CCH Investments"
                    width={120}
                    height={32}
                    className="transition-all duration-300 [filter:brightness(0)_saturate(100%)_invert(10%)_sepia(40%)_saturate(800%)_hue-rotate(180deg)] group-hover:[filter:brightness(0)_invert(1)]"
                  />

                  {el.acf.industry && (
                    <span className="w-fit text-xs px-3 py-1 rounded-sm border border-navy-dark/25 text-navy-dark/60 group-hover:border-gold group-hover:text-gold transition-colors duration-300">
                      {el.acf.industry}
                    </span>
                  )}

                  <h2 className="text-base font-bold font-heading leading-snug tracking-tight">
                    {el.title.rendered}
                  </h2>
                </div>

                {/* Description — hidden on md, visible on lg */}
                <p
                  className={`${playfair.className} text-sm leading-relaxed line-clamp-3 text-navy-dark/55 group-hover:text-white/65 transition-colors duration-300`}
                >
                  {description}
                </p>

                {/* Explore — lg only */}
                <span className="hidden lg:block text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 text-navy-dark group-hover:text-white group-hover:opacity-60">
                  Explore
                </span>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </section>
  );
};

export default PortfolioList;
