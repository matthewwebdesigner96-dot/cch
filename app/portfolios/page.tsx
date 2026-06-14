import { getPortfolios } from "@/lib/wordpress";
import PortfolioList from "../components/section/PortfolioList";
import ContactSingle from "../components/section/ContactSingle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolios",
  description: "Investment that we currently manage",
};

const PortfoliosPage = async () => {
  const data = await getPortfolios();
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center gap-4 pt-40 pb-16 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold text-navy-dark">
          Portfolio
        </h1>
        <p className="text-base md:text-lg font-light text-navy-dark/70 max-w-xl">
          Driving growth, creating value, and building strategic connections
          through investments that maximize returns, foster innovation, and
          empower communities.
        </p>
      </div>
      <PortfolioList data={data} />
      <ContactSingle />
    </div>
  );
};

export default PortfoliosPage;
