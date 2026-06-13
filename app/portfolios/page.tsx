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
    <div className="min-h-screen w-full bg-navy-dark">
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-6 pt-40 pb-20">
        <h1 className="font-heading text-lg md:text-xl font-bold text-white">
          Capital Portfolio
        </h1>
        <p className="text-2xl md:text-5xl font-light text-white">
          Partners in Performance
        </p>
      </div>
      <PortfolioList data={data} />
      <ContactSingle />
    </div>
  );
};

export default PortfoliosPage;
