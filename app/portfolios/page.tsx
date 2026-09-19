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
          <span className="text-xl w-fit rounded-full font-heading font-bold">
            CAPITAL PORTFOLIO
          </span>
          <h1 className="flex flex-col w-fit text-2xl lg:text-4xl font-extralight leading-8 md:leading-15">
            Partners in Performance
          </h1>
        </div>
      </div>
      <PortfolioList data={data} />
      <ContactSingle />
    </div>
  );
};

export default PortfoliosPage;
