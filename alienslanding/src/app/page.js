'use client';

import { useEffect, useRef, useState } from "react";
import GolfSection from "./components/golfGroundSection";
import CarMove from "./components/car";
import Footer from "./components/footer";
import GallerySection from "./components/gallary";
import { useScroll, useTransform, motion } from 'framer-motion';
import { Bokor } from "next/font/google";
import UnrivalledViews from "./components/unrevailed";
import AmenitiesSection from "./components/ClassAminities";
import FourLevelsAppreciation from "./components/LevelofAppereation";
import Testimonials from "./components/testimonials";
import MapView from "./components/MapView";
import SalesforceModalTrigger from "./components/GlobalFormButton";
import UnrivalledScrollWrapper from "./components/UnrivalledScrollWrapper";
import PrimeLocationScrollWrapper from "./components/PrimeLocationSection";

const images = [
  "/images/fetured1.jpg",
  "/images/fetured2.jpg",
  "/images/fetured3.jpg",
  "/images/fetured4.jpg",
  "/images/fetured1.jpg",
  "/images/fetured2.jpg",
  "/images/fetured3.jpg",
  "/images/fetured4.jpg",
];


const bokorFont = Bokor({
  subsets: ['latin'],
  weight: "400",
  variable: "--font-bokor",
});

export default function Sectionsliding() {

  const sectionRef = useRef(null);
  const interiorRef = useRef(null);
  const sliderRef = useRef(null);
  const verticalRef = useRef(null);
  const secondSecRef = useRef(null);
  const secondSectionRef = useRef(null);
  const iframeRef = useRef(null);
  const brandcontainerRef = useRef(null);

  const [interiorScale, setInteriorScale] = useState(1);
  const [sliderTranslate, setSliderTranslate] = useState(0);
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [secondSecScale, setSecondSecScale] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // starts when section top hits bottom of viewport, ends when bottom hits top
  });

  // 1) state to hold viewport width
  const [vw, setVw] = useState(0);

  // 2) read it once on mount
  useEffect(() => {
    setVw(window.innerWidth);
    // optional: listen for resize if you want dynamic resizing
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // 3) now safe to use vw in your transform
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -images.length * 400 + vw]   // vw is 0 on the server, real value on client
  );

  const targetValues = useRef({
    interiorScale: 1,
    sliderTranslate: 0,
    verticalOffset: 0,
    secondSecScale: 1
  });

  const lerp = (start, end, factor) => start + (end - start) * factor;

  const brandlogos = [
    "/investors/NisusLogo.png",
    "/investors/PhoenixLogo.png",
    "/investors/SwamihLogo.png",
  ];
  

const calculateEffect = (ref) => {
  if (!ref.current) return 0;
  const rect = ref.current.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top >= windowHeight || rect.bottom <= 0) return 0;

  // calculate progress: 0 when entering, 1 when fully visible
  const progress = Math.min(Math.max(1 - rect.top / windowHeight, 0), 1);
  return progress;
};


const updateTargetValues = () => {
  const interiorProgress = calculateEffect(interiorRef);
  const sliderProgress = calculateEffect(sliderRef);
  const verticalProgress = calculateEffect(verticalRef);
  const secondSectionProgress = calculateEffect(secondSecRef);
  
  targetValues.current.interiorScale = 1 - interiorProgress * 0.3;  // scale from 1 to 0.7
  targetValues.current.sliderTranslate = sliderProgress * 300;      // translate X up to 300px
  targetValues.current.verticalOffset = verticalProgress * 200;     // translate Y up to 200px
  targetValues.current.secondSecScale = 1 - secondSectionProgress * 0.5;  // scale from 1 to 0.5
};


const animate = () => {
  setInteriorScale(prev => lerp(prev, targetValues.current.interiorScale, 0.1));
  setSliderTranslate(prev => lerp(prev, targetValues.current.sliderTranslate, 0.1));
  setVerticalOffset(prev => lerp(prev, targetValues.current.verticalOffset, 0.1));
  setSecondSecScale(prev => lerp(prev, targetValues.current.secondSecScale, 0.1));

  requestAnimationFrame(animate);
};


  useEffect(() => {
    const handleScroll = () => {
      updateTargetValues();
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial
    animate(); // start loop

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const togglePlayPause = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const message = JSON.stringify({
      event: 'command',
      func: isPlaying ? 'pauseVideo' : 'playVideo',
      args: []
    });
    iframe.contentWindow?.postMessage(message, '*');
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // Auto play on mount
    const iframe = iframeRef.current;
    if (iframe) {
      const message = JSON.stringify({
        event: 'command',
        func: 'playVideo',
        args: []
      });
      iframe.contentWindow?.postMessage(message, '*');
    }
  }, []);

  useEffect(() => {
    let offset = 0;
    let animationId;

    function animate() {
      if (brandcontainerRef.current) {
        offset -= 1; // Scroll speed
        brandcontainerRef.current.style.transform = `translateX(${offset}px)`;

        // Reset scroll when halfway through
        if (Math.abs(offset) >= brandcontainerRef.current.scrollWidth / 2) {
          offset = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

    const blooming = "Blooming";
    const forest = "Forest";

    const bloomingLetters = blooming.split("").map((letter, index) => (
      <span key={index} className="letter p-3 md:p-2">{letter}</span>
    ));

    const forestLetters = forest.split("").map((letter, index) => (
      <span key={index} className="letter p-4 md:p-2">{letter}</span>
    ));

  

  return (
    <div className="relative w-full h-[600vh]"> {/* total height = sections × 100vh */}
    <SalesforceModalTrigger/>
      {/* Section 1 */}
      <section id="home" className={`sticky top-0 h-screen w-full flex items-center justify-center bg-[#0d1c0f] ${bokorFont.variable}`}>
        <div className="relative flex flex-col sm:flex-row w-full h-full overflow-hidden">

          {/* Left Video - Full width on mobile, 1/3 on larger screens */}
          <div className="relative w-full sm:w-1/3 h-1/2 sm:h-full overflow-hidden">
            <video
              src="/videos/heroleft.mp4"
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
            {/* Border Overlay */}
            <img
              src="/images/videoborder.svg"
              alt="Left Border"
              className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
            />
          </div>

          {/* Right Video - Full width on mobile, 2/3 on larger screens */}
          <div className="relative w-full sm:w-2/3 h-1/2 sm:h-full overflow-hidden bg-[#031c00]">
            <div className="absolute top-0 left-0 w-full h-full mask-custom overflow-hidden">
              <video
                src="/videos/heroright.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
            {/* Border Overlay */}
            <img
              src="/images/videoborder.svg"
              alt="Right Border"
              className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
            />
          </div>

          {/* Full Dark Transparent Overlay */}
          <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none" />

          {/* Center Text Content */}
          <div className="absolute inset-0 flex items-center justify-center text-white z-30 p-4 text-center">
            <div className="z-30 text-white rounded-2xl">
            <h1 className="font-nostalgic text-3xl xs:text-4xl md:text-6xl lg:text-8xl xl:text-9xl mb-4 tracking-tighter">
              {/* Stack on small screens, inline on larger */}
              <span className="block sm:inline tracking-tight">{bloomingLetters}</span>
              <span className="block sm:inline font-waterfallregular text-[4rem] xs:text-[5rem] sm:text-[9rem] md:text-[11rem] lg:text-[14rem] sm:ml-2">
                {forestLetters}
              </span>
            </h1>

              <p className="font-belkinregular text-base xsm:text-lg sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-[#A2A2A2] via-[#C2C2C2] to-[#F9F9F9] bg-clip-text text-transparent">
                Embrace a lifestyle where the harmony of nature<br className="hidden sm:block" />
                and the comforts of modern living intertwine
              </p>
            </div>
          </div>

          {/* Decorative Corner Frames */}
          <img src="/images/borderframe.svg" className="absolute top-2 left-2 w-10 sm:w-16 md:w-24 z-40" />
          <img src="/images/borderframe.svg" className="absolute top-2 right-2 w-10 sm:w-16 md:w-24 rotate-90 z-40" />
          <img src="/images/borderframe.svg" className="absolute bottom-2 left-2 w-10 sm:w-16 md:w-24 -rotate-90 z-40" />
          <img src="/images/borderframe.svg" className="absolute bottom-2 right-2 w-10 sm:w-16 md:w-24 -rotate-180 z-40" />
        </div>
      </section>

        {/* Section 2 */}
        <sction id="about">
          <GolfSection/>
        </sction>
          
        {/* Section 3 */}
        <section id="projects">
          <UnrivalledScrollWrapper/>
        </section>
        {/* Section 4 */}   
        <PrimeLocationScrollWrapper />
        {/* Section 5 */}
          <section className="xs:h-[100vh] md:h-[100vh]">
            <MapView/>
          </section>

        <section className="sticky top-0  md:h-[125vh]">
          <FourLevelsAppreciation/>
        </section>

        <section className="sticky top-0 xxs:h-[140] xs:h-[120vh] md:h-[200vh]">
          <AmenitiesSection/>
        </section>

      {/* Section 6 */}
      <section ref={interiorRef} className="bg-red-300 sticky top-0 xxs:h-[90vh] xs:h-[60vh] md:h-screen bg-white z-40">
        <img
            // src="https://img.freepik.com/free-photo/3d-rendering-modern-dining-room-living-room-with-luxury-decor_105762-1934.jpg"
            src="/images/hubsite.JPG"
            alt="Interior Design"
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-200 ease-out"
            style={{
              transform: `scale(${interiorScale})`
            }}
          />
          <div className="relative text-white z-10 text-center p-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Elegant Interiors</h2>
            <p>Designed for comfort and sophistication</p>
          </div>
      </section>
      {/* Section 7 */}
      <section className="md:h-[400vh]">
          <CarMove />
      </section>

      {/* Section 8 (holds both Section 8 content and Section 9) */}
      {/* <section className="relative h-[400vh] bg-white">  */}
        {/* Section 8 content pinned */}
        {/* <div className="sticky top-0 h-screen flex items-center justify-center text-center px-4 z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold">Your Dream Home Awaits</h2>
        </div> */}

        {/* Section 9 scrolls over */}
        {/* <section ref={sectionRef} className="relative h-[300vh]"> */}
          {/* Sticky container */}
          {/* <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-[#031c00] text-white z-20 overflow-hidden">
            <h2 className="font-nostalgic text-[#a2790d] text-3xl md:text-7xl font-bold mb-6">
              Featured Projects
            </h2> */}

            {/* Horizontally scrolling image row */}
            {/* <motion.div
              style={{ x }}
              className="flex space-x-8 px-4"
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className="w-[40rem] h-[30rem] object-cover rounded-lg shadow-lg"
                  alt="Scrolling Property"
                />
              ))}
            </motion.div>
          </div>
        </section>
      </section> */}

      {/* Section 10 (holds both Section 10 content and Section 11) */}

    {/* <section ref={verticalRef} className="bg-[#031c00]"> */}
            {/* ✅ Mobile-only layout (xxs/xs/xsm) */}
            {/* <div className="xsm:hidden relative px-4 py-10 space-y-10"> */}
        {/* {[ */}
          {/* {
            src: "/images/vertical1.JPG",
            width: "w-4/5",
            height: "h-64",
            position: "ml-auto", // image on right → number on left
          },
          {
            src: "/images/vertical2.JPG",
            width: "w-4/5",
            height: "h-64",
            position: "mr-auto", // image on left → number on right
          },
          {
            src: "/images/vertical3.JPG",
            width: "w-4/5",
            height: "h-64",
            position: "ml-auto",
          },
          {
            src: "/images/vertical4.JPG",
            width: "w-4/5",
            height: "h-64",
            position: "mr-auto",
          },
          {
            src: "/images/vertical5.jpg",
            width: "w-4/5",
            height: "h-64",
            position: "ml-auto",
          },
        // ].map((img, index) => { */}
          {/* // const isLeft = img.position === "ml-auto"; // image on right, so number on left

          // return (
          //   <div key={index} className="flex items-center justify-between"> */}
              {/* Number on the side */}

              {/* {isLeft ? (
                <div className="w-1/5 text-right pr-2 font-nostalgic text-white text-7xl font-bold">
                  {index + 1}
                </div>
              ) : null} */}

              {/* Image container */}
              {/* <div className={`${img.width} ${img.height} relative`}>
                <img
                  src={img.src}
                  alt={`Image ${index}`}
                  className="rounded-lg shadow-lg border border-double object-cover w-full h-full"
                />
              </div> */}

              {/* Number on the other side */}
              {/* {!isLeft ? (
                <div className="w-1/5 text-left pl-2 font-nostalgic text-white text-7xl font-bold">
                  {index + 1}
                </div>
              ) : null}
            </div>
          );
        })}
      </div> */}

      {/* ✅ Desktop layout (xsm and up) with scroll transform */}
      {/* <div className="hidden xsm:flex sticky top-0 h-screen items-center justify-center pointer-events-none">
        <div className="absolute left-[5rem] md:left-0 md:w-1/2 p-8 space-y-6 z-0">
          {[
            "/images/vertical1.JPG",
            "/images/vertical2.JPG",
            "/images/vertical3.JPG",
          ].map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Vertical Up"
              className="rounded-lg shadow-lg w-full transition-transform duration-100 ease-out border border-double outline-offset-4 md:border-none"
              style={{
                transform: `translateY(-${verticalOffset}px)`
              }}
            />
          ))}
        </div>
        <div className="absolute right-[5rem] md:right-0 md:w-1/2 p-8 space-y-6 z-0">
          {[
            "/images/vertical4.JPG",
            "/images/vertical5.jpg",
            "/images/vertical5.jpg",
          ].map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Vertical Down"
              className="rounded-lg shadow-lg w-full transition-transform duration-100 ease-out border border-double outline-offset-4 md:border-none"
              style={{
                transform: `translateY(${verticalOffset}px)`
              }}
            />
          ))}
        </div>
      </div>
  </section> */}

      
      {/*------------- Testimonial section---------- */}
      <section id="testimonials" className="sticky top-0 h-[85vh] md:h-[78vh] 2xl:h-[80vh] bg-white">
        <Testimonials/>
      </section>

      {/* Section 10 */}
      <section id="gallary" className="sticky top-0  xs:h-[80vh] xsm:h-[85vh] md:h-screen bg-white">
          <GallerySection />
      </section>

      {/* Section 11 */}
      <section className="sticky top-0 bg-[#0a0f05] py-16 overflow-hidden relative">
          <div className="max-w-4xl mx-auto text-center mb-10 px-4">
            <h2 className="text-3xl md:text-7xl font-extrabold text-white mb-4 font-nostalgic text-[#a2790d]">Our Trusted Brands</h2>
            <p className="text-base md:text-xl text-gray-300">
              Partnering with top-tier brands to deliver trusted solutions across industries. Explore the power of collaboration.
            </p>
          </div>

          {/* brand logo section */}

          <div className="relative w-full overflow-hidden">
            <div ref={brandcontainerRef} className="flex w-max">
              {[...brandlogos, ...brandlogos, ...brandlogos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-8"
                  style={{ minWidth: "150px", filter: "drop-shadow(0 0 10px rgba(255,255,255,0.1))" }}
                >
                  <img src={logo} alt="Brand Logo" className="w-full h-20 object-contain transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Subtle Parallax Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none animate-pulse"></div>
      </section>

      {/* Section 12 */}
      <section id="contact" className="sticky top-0 h-screen">
          <Footer />
      </section>
     
    </div>

  );
}


