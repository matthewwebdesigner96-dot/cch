"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortfolioItem } from "@/lib/wordpress";

interface PortfolioBackgroundCarouselProps {
    items: PortfolioItem[];
}

const MOBILE_QUERY = "(max-width: 767px)";

export default function PortfolioBackgroundCarousel({ items }: PortfolioBackgroundCarouselProps) {
    const loopedItems = useMemo(
        () => (items.length > 0 ? [...items, ...items] : []),
        [items]
    );
    const sectionRef = useRef<HTMLElement>(null);
    const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    // Mobile only: set --focus (0–1) on each card by how close it is to the
    // centre of the screen, so the overlay + logo fade in and out as it passes.
    useEffect(() => {
        const media = window.matchMedia(MOBILE_QUERY);
        let frame = 0;
        let inView = false;

        const update = () => {
            const center = window.innerWidth / 2;
            for (const card of cardRefs.current) {
                if (!card) continue;
                const rect = card.getBoundingClientRect();
                const distance = Math.abs(rect.left + rect.width / 2 - center);
                const focus = Math.max(0, 1 - distance / (rect.width * 0.75));
                card.style.setProperty("--focus", focus.toFixed(3));
            }
            frame = requestAnimationFrame(update);
        };

        const sync = () => {
            cancelAnimationFrame(frame);
            if (media.matches && inView) frame = requestAnimationFrame(update);
        };

        // Only measure while the carousel is on screen.
        const observer = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            sync();
        });
        if (sectionRef.current) observer.observe(sectionRef.current);
        media.addEventListener("change", sync);

        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            media.removeEventListener("change", sync);
        };
    }, [loopedItems]);

    if (items.length === 0) return null;

    return (
        <section ref={sectionRef} className="w-screen relative left-1/2 -translate-x-1/2">
            <div className="overflow-hidden">
                <div className="flex w-max animate-[marquee_80s_linear_infinite] md:animate-marquee hover:[animation-play-state:paused]">
                    {loopedItems.map((item, index) => {
                        const cover = item.acf?.cover_image;
                        const logo = item.acf?.project_logo;

                        return (
                            <Link
                                key={item.id + "-" + index}
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                                href={"/portfolios/" + item.slug}
                                className="group relative block h-56 w-72 md:h-72 md:w-96 shrink-0 overflow-hidden bg-navy-dark [--focus:0]"
                            >
                                {cover ? (
                                    <Image
                                        src={cover}
                                        alt={item.title.rendered}
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-105"
                                        sizes="320px"
                                    />
                                ) : null}

                                {/* Desktop: revealed on hover. Mobile: follows --focus. */}
                                <div className="absolute inset-0 bg-navy-dark/0 transition duration-300 group-hover:bg-navy-dark/85 max-md:bg-navy-dark/85 max-md:opacity-(--focus) max-md:transition-none" />

                                {logo ? (
                                    <div className="absolute inset-0 flex items-center justify-center p-6">
                                        <Image
                                            src={logo}
                                            alt={item.title.rendered + " logo"}
                                            width={220}
                                            height={110}
                                            className="h-24 w-full max-w-44 md:max-w-56 object-contain opacity-0 transition duration-300 group-hover:opacity-100 max-md:opacity-(--focus) max-md:transition-none"
                                        />
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center p-6">
                                        <p className="text-center text-white opacity-0 transition duration-300 group-hover:opacity-100 max-md:opacity-(--focus) max-md:transition-none">
                                            {item.title.rendered}
                                        </p>
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
