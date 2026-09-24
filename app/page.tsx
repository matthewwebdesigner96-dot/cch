import AboutUs from "./components/section/AboutUs";
import Hero from "./components/section/Hero";
import Portfolios from "./components/section/Portfolios";
import Edge from "./components/section/Edge";
import Approach from "./components/section/Approach";
import Contact from "./components/section/Contact";
import { getPortfolios, getEdgeSectors } from "@/lib/wordpress";
import BackgroundSection from "./components/layout/BackgroundSection";
import HashScroll from "./components/layout/HashScroll";
import Image from "next/image";

export default async function Home() {
  const portfolios = await getPortfolios();
  const logos = portfolios.map((p) => ({
    src: p.acf.project_logo,
    slug: p.slug,
  }));
  const edgeSectors = await getEdgeSectors();

  return (
    <div className="flex overflow-hidden min-h-screen  bg-zinc-50 font-sans">
      <main>
        <HashScroll />
        <BackgroundSection variant="gradient" parallax={false}>
          <Hero />
        </BackgroundSection>
        <section id="about-us">
          <AboutUs logos={logos} />
        </section>

        <div>
          <Image
            src="/lions-gate-bridge.jpg"
            alt="building view"
            width="3975"
            height="2981"
            className="object-cover w-full h-220"
          />
        </div>

        <section id="our-edge">
          <Edge sectors={edgeSectors} />
        </section>

        <section id="our-approach">
          <Approach />
        </section>

        <section id="portfolio">
          <Portfolios initialSlides={portfolios} />
        </section>

        <section id="contact-us">
          <Contact />
        </section>
      </main>
    </div>
  );
}
