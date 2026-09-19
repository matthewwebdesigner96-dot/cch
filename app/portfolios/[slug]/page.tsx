import { notFound } from "next/navigation";
import Image from "next/image";
import BackgroundSection from "../../components/layout/BackgroundSection";
import PortfolioBackgroundCarousel from "../../components/section/PortfolioBackgroundCarousel";
import ContactSingle from "@/app/components/section/ContactSingle";
import { getPortfolioBySlug, getPortfolios } from "@/lib/wordpress";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) {
    return { title: "Portfolio not found" };
  }

  const ogImage =
    portfolio._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    portfolio.acf?.cover_image;

  return {
    title: portfolio.title.rendered,
    description: portfolio.acf.description,
    openGraph: {
      title: portfolio.title.rendered,
      description: portfolio.excerpt.rendered.replace(/<[^>]*>/g, ""),
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
  };
}

export default async function PortfolioPage({ params }: PageProps) {
  const { slug } = await params;
  const [portfolio, allPortfolios] = await Promise.all([
    getPortfolioBySlug(slug),
    getPortfolios(),
  ]);

  if (!portfolio) {
    notFound();
  }

  const featuredImage =
    portfolio?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    portfolio?.acf?.cover_image ||
    "";

  return (
    <>
      <BackgroundSection variant="none" className="bg-foreground text-black">
        {featuredImage ? (
          <div className="relative h-[80vh] -mx-2 md:-mx-4">
            <Image
              src={featuredImage}
              alt={portfolio.title.rendered}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        ) : null}

        <div className={`mx-auto max-w-7xl px-4 ${featuredImage ? "" : "pt-20"}`}>
          {/* <h1 className="mt-10 w-full max-w-7xl text-2xl md:text-3xl mb-6">
            {portfolio.title.rendered}
          </h1> */}

          <div className="pt-8 lg:py-25 w-full max-w-7xl mx-auto">
          <div id="portfolio-content" className="space-y-4 flex lg:flex-row flex-col gap-12">
            <div className="lg:w-2/5 lg:mx-12">
              <Image
                src={portfolio.acf?.project_logo || ""}
                alt={portfolio.title.rendered + " logo"}
                width={400}
                height={400}
                className="mb-4 mx-auto lg:mx-0 grayscale brightness-0"
              />
              <div className="mx-12 lg:mx-0 lg:pl-7.5 space-y-4">
                <div className="flex flex-col lg:flex-row lg:gap-1">
                  <strong>Region:</strong>
                  <span>{portfolio.acf?.region}</span>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-1">
                  <strong>Industry:</strong>
                  <span>{portfolio.acf?.industry}</span>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-1">
                  <strong>Year:</strong>
                  <span>{portfolio.acf?.year}</span>
                </div>
                <div className="flex gap-4 mt-2">
                  {portfolio.acf?.linkedin_url && (
                    <a
                      href={portfolio.acf.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="opacity-70 hover:opacity-100 transition-opacity duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                  {portfolio.acf?.website_url && (
                    <a
                      href={portfolio.acf.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Website"
                      className="opacity-70 hover:opacity-100 transition-opacity duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:w-3/5 lg:pl-12 lg:border-l border-gray-300 lg:flex lg:items-center">
              <div className="space-y-6 text-lg">
                {(portfolio.acf?.description || "")
                  .split(/\r?\n\r?\n/)
                  .filter((chunk: string) => chunk.trim().length > 0)
                  .map((chunk: string, i: number) => (
                    <p key={i}>{chunk}</p>
                  ))}
              </div>
            </div>
          </div>
          </div>
        </div>
        <PortfolioBackgroundCarousel items={allPortfolios} />
      </BackgroundSection>
      <ContactSingle />
    </>
  );
}
