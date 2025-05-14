import { useEffect, useRef, useState } from "react";

export default function PrimeLocationScrollWrapper() {
  const containerRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollY = window.scrollY;
      const offsetTop = container.offsetTop;
      const height = container.offsetHeight;

      const progress = Math.min(
        Math.max((scrollY - offsetTop) / (height - window.innerHeight), 0),
        1
      );

      setTranslateX(progress * 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[220vh] z-20 bg-[#031c00]"
    >
      <div className="sticky top-0 h-screen overflow-hidden relative flex items-center justify-center">

        {/* Text behind image */}
        <div className="absolute z-10 xxs:left-[15rem] xs:left-[17rem] xsm:left-[23rem] sm:left-[12rem] md:left-[66rem]  xxs:top-[7rem] xs:top-[10rem] md:top-[25rem] max-w-[25%] xs:max-w-[25%] xsm:max-w-[30%] md:max-w-[70%] text-left">
          <h2 className="font-nostalgic text-xs xxs:text-sm sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">
            Prime Location
          </h2>
          <p className="font-belkinlight text-justify text-xs xxs:text-sm sm:text-base md:text-lg text-white leading-relaxed sm:leading-loose tracking-normal sm:tracking-wide">
            Nestled in the heart of the city, offering unparalleled convenience and charm.
          </p>
        </div>

        {/* Sliding image container */}
        <div
          className={`
            absolute z-20 
            w-[180%] h-[50%] 
            xxs:w-[150%] xxs:h-[50%] 
            xs:w-[140%] xs:h-[50%] 
            xsm:w-[130%] xsm:h-[50%] 
            sm:w-full sm:h-full 
            inset-0
          `}
          style={{
            transform: `translateX(-${translateX}%)`,
            transition: "transform 0.05s linear",
          }}
        >
          <img
            src="https://innovate.co.il/api/optimized-image/9dc7c191b04266b0370ccb1ade1c9c80bebbffb68ecc2e025725af979f5e33cf.jpg?max-w=1920&auto=compress,format"
            alt="Prime Location"
            className={`
              object-cover
              w-[67%] h-[100%]
              xxs:w-[67%] xxs:h-[100%]
              xs:w-[71.5%] xs:h-[100%]
              xsm:w-[77%] xsm:h-[100%]
              sm:w-full sm:h-full
            `}
          />
        </div>
      </div>
    </section>
  );
}
