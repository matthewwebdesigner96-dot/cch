"use client";

import { useRef } from "react";
import type { Splide as SplideType } from "@splidejs/react-splide";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import { motion } from "framer-motion";
import type { EdgeSector } from "@/lib/wordpress";

interface EdgeProps {
  sectors: EdgeSector[];
}

const Edge = ({ sectors }: EdgeProps) => {
  const splideRef = useRef<SplideType | null>(null);

  return (
    <section className="w-full bg-white text-navy-dark">
      <div className="px-4 py-16 xl:px-0 md:py-24 w-screen max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col gap-4 mb-8 md:gap-6 md:px-4 lg:mb-12"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-xl w-fit rounded-full font-heading font-bold">
            OUR EDGE
          </span>
          <h2 className="flex flex-col w-fit text-2xl lg:text-4xl font-extralight leading-8 md:leading-15">
            Our Primary Investment Sectors
          </h2>
          <p className="hidden md:block md:w-1/2 text-justify">
            CCH Investments is a Canadian family office dedicated to investing
            in private companies with a long-term perspective and a focus on
            building lasting value. Guided by a hands.
          </p>
        </motion.div>

        <div className="relative md:pb-24">
          <Splide
            ref={splideRef}
            options={{
              perPage: 3,
              gap: "78px",
              breakpoints: {
                640: { perPage: 1 },
                1024: { perPage: 3 },
              },
              autoplay: false,
              pagination: false,
              arrows: false,
              rewind: true,
              height: "auto",
              updateOnMove: true,
            }}
            aria-label="Investment Sectors"
          >
            {sectors.map((el, index) => (
              <SplideSlide className="flex h-fit gap-4 flex-col" key={index}>
                <div className="group relative w-full h-64 md:h-115 rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={el.img}
                    alt={el.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1250px) 33vw, 365px"
                    className="object-cover"
                  />
                  <div className="bg-navy-dark opacity-80 hidden group-hover:flex absolute inset-0">
                    <Image
                      src={el.svg}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1250px) 33vw, 365px"
                      className="object-scale-down"
                    />
                  </div>
                </div>
                <h3 className="md:text-2xl font-heading">{el.title}</h3>
                <p className="leading-8.75 wrap-break-word">{el.description}</p>
              </SplideSlide>
            ))}
          </Splide>

          <div className="hidden md:flex absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none ">
            <button
              onClick={() => splideRef.current?.splide?.go("<")}
              className="pointer-events-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous slide"
            >
              <Image
                src="/circle-arrow-left.svg"
                alt=""
                height={60}
                width={60}
              />
            </button>

            <button
              onClick={() => splideRef.current?.splide?.go(">")}
              className="pointer-events-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next slide"
            >
              <Image
                src="/circle-arrow-right.svg"
                alt=""
                height={60}
                width={60}
              />
            </button>
          </div>

          {/* Mobile-only pagination buttons */}
          <>
            <button
              aria-label="Previous slide"
              onClick={() => splideRef.current?.splide?.go("<")}
              className="portfolio-prev absolute left-[-16] top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white/90 text-black shadow pointer-events-auto md:hidden"
              type="button"
            >
              &#10094;
            </button>

            <button
              aria-label="Next slide"
              onClick={() => splideRef.current?.splide?.go(">")}
              className="portfolio-next absolute right-[-15] top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white/90 text-black shadow pointer-events-auto md:hidden"
              type="button"
            >
              &#10095;
            </button>
          </>
        </div>
      </div>
    </section>
  );
};

export default Edge;
