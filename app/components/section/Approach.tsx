"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Approach = () => {
  return (
    <section className=" bg-navy-mid w-screen flex flex-col md:flex-row md:items-start md:gap-14">
      <div className="relative h-fit md:h-125 md:w-1/2">
        <Image
          src="/our-approach.jpg"
          alt="Our approach"
          height="4807"
          width="3205"
          sizes="(max-width: 767px) 100vw, 50vw"
          quality={90}
          className="object-cover w-full h-full"
        />
      </div>

      <motion.div
        className="max-w-125 md:flex-1 py-16 md:py-24 px-4 flex flex-col gap-4 md:gap-6"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="text-xl w-fit rounded-full font-heading font-bold">
          OUR APPROACH
        </span>
        <h2 className="flex flex-col w-fit text-2xl lg:text-4xl font-extralight leading-8 md:leading-15">
          Partners in Performance
        </h2>
        <p>
          We provide strategic equity investments designed to fuel sustainable
          growth and lasting partnerships. Rooted in principled decision-making,
          our mission is to provide exclusive access to aligned capital
          strategies that deliver a competitive advantage.We provide strategic
          equity investments designed to fuel sustainable growth and lasting
          partnerships. Rooted in principled decision-making, our
        </p>
      </motion.div>
    </section>
  );
};

export default Approach;
