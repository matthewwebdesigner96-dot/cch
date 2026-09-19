import AboutUs from "./components/section/AboutUs";
import Hero from "./components/section/Hero";
import VideoPlayer from "./components/ui/VideoPlayer";
import Portfolios from "./components/section/Portfolios";
import Edge from "./components/section/Edge";
import Approach from "./components/section/Approach";
import Contact from "./components/section/Contact";
import { getPortfolios } from "@/lib/wordpress";
import BackgroundSection from "./components/layout/BackgroundSection";
import HashScroll from "./components/layout/HashScroll";
import Image from "next/image";

export default async function Home() {
  const portfolios = await getPortfolios();
  const logos = portfolios.map((p) => ({
    src: p.acf.project_logo,
    slug: p.slug,
  }));

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
            src="/lions-gate-bridge.webp"
            alt="building view"
            width="1512"
            height="572"
            className="object-cover w-full"
          />
        </div>

        <section id="our-edge">
          <Edge />
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
