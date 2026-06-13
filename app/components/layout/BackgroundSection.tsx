"use client";
import { ReactNode, useEffect, useRef } from "react";

type BackgroundVariant = "gradient" | "none";

interface BackgroundSectionProps {
    children: ReactNode;
    className?: string;
    variant?: BackgroundVariant;
}

export default function BackgroundSection({
    children,
    className = "",
    variant = "gradient",
}: BackgroundSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (variant !== "gradient") return;

        const handleScroll = () => {
            const position = Math.min((window.scrollY / 600) * 30, 30);
            if (sectionRef.current) {
                sectionRef.current.style.backgroundPosition = `50% ${position}%`;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [variant]);

    const baseClasses = [
        "flex flex-col px-2 md:px-4 min-h-screen max-w-screen",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <section
            ref={sectionRef}
            className={baseClasses}
            style={
                variant === "gradient"
                    ? {
                          backgroundImage:
                              "linear-gradient(to bottom, #0C2438 0%, #0d2e47 8%, #113d60 16%, #194B75 26%, #2d6e96 34%, #6aadd4 42%, #b8ddf0 47%, #F9FCFF 50%, #F9FCFF 100%)",
                          backgroundSize: "100% 200%",
                          backgroundPosition: "50% 0%",
                      }
                    : undefined
            }
        >
            {children}
        </section>
    );
}
