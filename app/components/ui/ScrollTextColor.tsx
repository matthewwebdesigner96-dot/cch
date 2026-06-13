"use client";
import { useEffect, useRef, ReactNode } from "react";

interface ScrollTextColorProps {
  children: ReactNode;
  className?: string;
  startScroll?: number;
  endScroll?: number;
}

const fromColor = { r: 255, g: 255, b: 255 };
const toColor = { r: 12, g: 36, b: 56 };

export default function ScrollTextColor({
  children,
  className = "",
  startScroll = 200,
  endScroll = 800,
}: ScrollTextColorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY - startScroll) / (endScroll - startScroll))
      );
      const r = Math.round(fromColor.r + (toColor.r - fromColor.r) * progress);
      const g = Math.round(fromColor.g + (toColor.g - fromColor.g) * progress);
      const b = Math.round(fromColor.b + (toColor.b - fromColor.b) * progress);
      if (ref.current) {
        ref.current.style.color = `rgb(${r}, ${g}, ${b})`;
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [startScroll, endScroll]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
