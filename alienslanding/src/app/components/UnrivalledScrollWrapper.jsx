import { useEffect, useRef, useState } from "react";
import UnrivalledViews from "./unrevailed";

export default function UnrivalledScrollWrapper() {
  const containerRef = useRef(null);
  const [translateX, setTranslateX] = useState(100);
  const [scrollImageIndex, setScrollImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollY = window.scrollY;
      const offsetTop = container.offsetTop;
      const containerHeight = container.offsetHeight;

      const windowHeight = window.innerHeight;
      const scrollStart = offsetTop;
      const scrollEnd = offsetTop + containerHeight - windowHeight;

      const totalScrollRange = containerHeight - windowHeight;
      const currentScroll = scrollY - scrollStart;

      // Split into two phases
      const phase1End = windowHeight; // horizontal animation finishes at 100vh scroll
      const phase2Start = phase1End;

      if (currentScroll <= phase1End) {
        // Phase 1: horizontal scroll progress
        const progress = Math.min(currentScroll / phase1End, 1);
        setTranslateX(100 - progress * 100);
        setScrollImageIndex(0); // Reset carousel when not in phase 2
      } else {
        // Phase 2: carousel control
        setTranslateX(0);

        const extraScroll = currentScroll - phase2Start;
        const phase2ScrollRange = windowHeight * 0.8; // Adjust this to control how fast the carousel scrolls

        const progress = Math.min(extraScroll / phase2ScrollRange, 1);
        const totalImages = 7;
        const index = Math.floor(progress * (totalImages - 1));
        setScrollImageIndex(index);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[300vh] z-20 bg-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="w-full h-full transition-transform duration-100"
          style={{
            transform: `translateX(-${translateX}%)`,
          }}
        >
          <UnrivalledViews scrollImageIndex={scrollImageIndex} />
        </div>
      </div>
    </section>
  );
}
