import { useEffect, useRef, useState } from "react";
import UnrivalledViews from "./unrevailed"; // Update path as needed

export default function UnrivalledScrollWrapper() {
  const containerRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollY = window.scrollY;
      const offsetTop = container.offsetTop;
      const height = container.offsetHeight;

      const progress = Math.min(
        Math.max((scrollY - offsetTop) / (height - window.innerHeight), 0),
        1
      );

      setTranslateX(100 - progress * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
// bg-[#031c00]
  return (
    <section ref={containerRef} className="relative h-[220vh] z-20 bg-white ">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            transform: `translateX(-${translateX}%)`,
            transition: "transform 0.05s linear",
          }}
        >
          <UnrivalledViews />
        </div>
      </div>
    </section>
  );
}
