"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const leftImages = [
  "/images/vertical1.JPG",
  "/images/vertical2.JPG",
  "/images/vertical3.JPG",
];

const rightImages = [
  "/images/vertical4.JPG",
  "/images/vertical5.jpg",
  "/images/vertical5.jpg",
];

export default function VerticalImageScroll() {
  const sectionRef = useRef(null);

  // Framer Motion scroll for mobile
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(leftImages.length + rightImages.length) * 300] // adjust 300px per image height
  );

  return (
    <section ref={sectionRef} className="relative h-[600vh] bg-[#031c00]">

      {/* ✅ Mobile Layout */}
      <div className="xsm:hidden sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: translateY }}
          className="flex flex-col items-center w-full space-y-8 px-4"
        >
          {[...leftImages, ...rightImages].map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt={`Mobile Slide ${index}`}
              className="w-full max-w-md rounded-xl shadow-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            />
          ))}
        </motion.div>
      </div>

      {/* ✅ Desktop Layout */}
      <div className="hidden xsm:flex sticky top-0 h-screen items-center justify-center pointer-events-none">
        <div className="absolute right-[5rem] md:left-0 md:w-1/2 p-8 space-y-6 z-0">
          {leftImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Vertical Up"
              className="rounded-lg shadow-lg w-full transition-transform duration-100 ease-out border border-double outline-offset-4 md:border-none"
              style={{
                transform: `translateY(-${scrollYProgress.get() * 1000}px)`, // dynamic or static based on your logic
              }}
            />
          ))}
        </div>
        <div className="absolute left-[5rem] md:right-0 md:w-1/2 p-8 space-y-6 z-0">
          {rightImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Vertical Down"
              className="rounded-lg shadow-lg w-full transition-transform duration-100 ease-out border border-double outline-offset-4 md:border-none"
              style={{
                transform: `translateY(${scrollYProgress.get() * 1000}px)`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
