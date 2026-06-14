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
      <div className="w-full bg-navy-dark">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-4 pt-40 pb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white">
            CAPITAL PORTFOLIO
          </h1>
          <p className="text-base md:text-lg font-light text-white/70 max-w-xl">
            Partners in Performance
          </p>
        </div>
      </div>
      <PortfolioList data={data} />
      <ContactSingle />
    </div>
  );
};

export default PortfoliosPage;
