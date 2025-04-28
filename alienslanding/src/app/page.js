'use client';

import { useEffect, useRef, useState } from "react";
import GolfSection from "./components/golfGroundSection";
import ExploreMapPage from "./map/page";
import CarMove from "./projects/page";
import Footer from "./components/footer";
import GallerySection from "./components/gallary";

import { Bokor } from "next/font/google";

const bokorFont = Bokor({
  subsets: ['latin'],
  weight: "400",
  variable: "--font-bokor",
});

export default function Sectionsliding() {

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
  

  const targetValues = useRef({
    interiorScale: 1,
    sliderTranslate: 0,
    verticalOffset: 0,
    secondSecScale: 1
  });

  const lerp = (start, end, factor) => start + (end - start) * factor;

  const brandlogos = [
    "https://nisusfin.com/static/images/nifco-logo.png",
    "https://img.freepik.com/free-vector/abstract-graphic-logo_1043-36.jpg",
    "https://t4.ftcdn.net/jpg/07/50/55/09/360_F_750550908_0ELiZ0k3VEcWlGkWx2acRzxLbpJpfw1k.jpg",
    "https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/Handling-Finances.jpg",
    "https://thumbs.dreamstime.com/z/marketing-financial-business-logo-design-marketing-financial-business-logo-168152542.jpg",
    "https://logomakerr.ai/uploads/output/2024/02/22/791bc6a3f7bf902f3d979073694b0ce0.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeI373V4iXgZwutrCjV9cAC-H_oRgjEsi9jA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn0-t9ceek3-AF7siv7VWWRchM8rML13vSfg&s",
    "https://marketplace.canva.com/EAGHon18Id8/1/0/1600w/canva-blue-corporate-illustrative-flat-investment-group-finance-logo-VV79iObP8QI.jpg",
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
      <span key={index} className="letter p-2">{letter}</span>
    ));

    const forestLetters = forest.split("").map((letter, index) => (
      <span key={index} className="letter p-2">{letter}</span>
    ));

  

  return (
    <div className="relative w-full h-[700vh]"> {/* total height = sections × 100vh */}
      {/* Section 1 */}
      <section className={`sticky top-0 h-screen w-full flex items-center justify-center ${bokorFont.variable}`}>
          <div className="relative flex flex-col md:flex-row w-full h-full items-center justify-center overflow-hidden">

            {/* Two Videos Side-by-Side */}
            <div className="flex flex-col md:flex-row w-full h-full">
              {/* Left Video */} 
              <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
                <video
                  src="/videos/heroleft.mp4"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                ></video>
              </div>

              {/* Right Video */}
              <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
                <video
                  src="/videos/heroright.mp4"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                ></video>
              </div>
            </div>

            {/* Black Transparent Overlay */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-5 z-10 pointer-events-none"></div> */}

            {/* Center Text Content backdrop-blur-sm bg-black/40 */}
            <div className="absolute z-20 text-white text-center backdrop-blur-sm bg-black/10  p-2 xs:p-3 xsm:p-4 sm:p-6 md:p-8 rounded-2xl mx-2 xs:mx-4">
              <h1 className="font-nostalgic text-lg xs:text-xl xsm:text-3xl sm:text-4xl md:text-9xl lg:text-9xl mb-2 xsm:mb-4 md:p-4">
                <span className="font-nostalgic p-[2px]">{bloomingLetters}</span>&nbsp;
                <span className="font-waterfallregular text-[14rem]">{forestLetters}</span>
              </h1>

              <p className="font-belkinregular text-xs xs:text-sm xsm:text-base sm:text-lg md:text-3xl mb-4 xsm:mb-6">
                Embrace a lifestyle where the harmony of nature and <br></br> the comforts of mordern living intertwine
              </p>
            </div>

            {/* One Common Border */}
            {/* <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <img 
                  src="/images/videoborder.svg" 
                  alt="Video Border" 
                  className="w-full h-full object-cover"
                />
              </div> */}
    
            {/* Four Corner Frames */}
            {/* Top Left Frame */}
            <img 
              src="/images/borderframe.svg" 
              alt="Corner Frame" 
              className="absolute top-4 left-4 w-16 h-16 md:top-8 md:left-8 md:w-24 md:h-24 object-contain pointer-events-none z-30"
            />

            {/* Top Right Frame */}
            <img 
              src="/images/borderframe.svg" 
              alt="Corner Frame" 
              className="absolute top-4 right-4 w-16 h-16 md:top-8 md:right-8 md:w-24 md:h-24 object-contain pointer-events-none rotate-90 z-30"
            />

            {/* Bottom Left Frame */}
            <img 
              src="/images/borderframe.svg" 
              alt="Corner Frame" 
              className="absolute bottom-4 left-4 w-16 h-16 md:bottom-8 md:left-8 md:w-24 md:h-24 object-contain pointer-events-none -rotate-90 z-30"
            />

            {/* Bottom Right Frame */}
            <img 
              src="/images/borderframe.svg" 
              alt="Corner Frame" 
              className="absolute bottom-4 right-4 w-16 h-16 md:bottom-8 md:right-8 md:w-24 md:h-24 object-contain pointer-events-none -rotate-180 z-30"
            />

          </div>
      </section>



      {/* Section 2 and 3 together in normal flow */}
        <div className="h-[200vh] bg-white"> {/* 2 sections × 100vh = 200vh */}
          
          {/* Section 2 */}
          <div className="h-[200vh] bg-red-300 flex items-center justify-center">
            <GolfSection />
          </div>

          {/* Section 3 */}
          <div ref={secondSecRef} className="h-screen flex items-center justify-center relative overflow-hidden backdrop-blur-sm bg-black/50">
            <div className="flex items-center justify-between w-full h-full relative">

              {/* Left Side Content */}
              <div
                className="absolute left-2 xxs:left-4 sm:left-10 max-w-[240px] xxs:max-w-xs sm:max-w-md text-left"
                style={{
                  opacity: 1 - secondSecScale,
                  transform: `translateY(${(1 - secondSecScale) * 30}px)`,
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
              >
                <h2 className="text-xs xxs:text-sm sm:text-4xl md:text-5xl font-bold text-lime-700 mb-1 xxs:mb-2 sm:mb-4">
                  Prime Location
                </h2>
                <p className="text-xs xxs:text-base sm:text-lg md:text-xl text-black">
                  Nestled in the heart of the city, offering unparalleled convenience and charm.
                </p>
              </div>

              {/* Image Container Sliding Right */}
              <div className="h-full overflow-hidden w-full max-w-full relative">
                <img
                  src="https://innovate.co.il/api/optimized-image/9dc7c191b04266b0370ccb1ade1c9c80bebbffb68ecc2e025725af979f5e33cf.jpg?max-w=1920&auto=compress,format"
                  alt="Interior Design"
                  className={`
                    absolute top-0 left-0 object-cover
                    w-[100%] h-[27vh] xxs:w-[100%] xxs:h-[30vh]
                    xs:w-[100%] xs:h-[55vh]
                    xsm:w-[100%] xsm:h-[60vh]
                    sm:w-[100%] sm:h-[70vh]
                    md:w-[100%] md:h-[100%]
                    lg:w-[100%] lg:h-[100%]
                    xl:w-[100%] xl:h-[100%]
                    2xl:w-[100%] 2xl:h-[100%]
                  `}
                  style={{
                    transform: `translateX(${(1 - secondSecScale) * 50}%)`,
                  }}
                />
              </div>

            </div>
          </div>

        </div>


      {/* Section 4 */}
      <section className="sticky top-0 h-screen">
        <ExploreMapPage />
      </section>

      {/* Section 5 */}
      <section ref={interiorRef} className="sticky top-0 h-screen bg-white">
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

      {/* Section 6 */}
      <section className=" h-[400vh] ">
          <CarMove />
      </section>

      {/* Section 7 (holds both Section 7 content and Section 8) */}
      <section className="relative h-[200vh] bg-white"> 
        {/* Section 7 content pinned */}
        <div className="sticky top-0 h-screen flex items-center justify-center text-center px-4 z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold">Your Dream Home Awaits</h2>
        </div>

        {/* Section 8 scrolls over */}
        <div ref={sliderRef} className="absolute top-0 w-full h-screen z-20 bg-black text-white flex flex-col items-center justify-center" style={{ transform: 'translateY(100vh)' }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h2>
          <div
            className="flex space-x-8 overflow-x-hidden px-8 transition-transform duration-200 ease-out"
            style={{
              transform: `translateX(-${sliderTranslate}px)`
            }}
          >
            {[
              "/images/fetured1.jpg",
              "/images/fetured2.jpg",
              "/images/fetured3.jpg",
              "/images/fetured4.jpg",
            ].map((img, index) => (
              <img
                key={index}
                src={img}
                className="w-96 h-64 object-cover rounded-lg shadow-lg"
                alt="Scrolling Property"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 9 (holds both Section 9 content and Section 10) */}

    <section ref={verticalRef} className="sticky top-0 h-screen">
      <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
          <div className="absolute left-0 w-1/2 p-8 space-y-6 z-0">
            {[
              "/images/vertical1.JPG",
              "/images/vertical2.JPG",
              "/images/vertical3.JPG",
             ].map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Vertical Up"
                className="rounded-lg shadow-lg w-full transition-transform duration-100 ease-out"
                style={{
                  transform: `translateY(-${verticalOffset}px)`
                }}
              />
            ))}
          </div>
          <div className="absolute right-0 w-1/2 p-8 space-y-6 z-0">
            {[
              "/images/vertical4.JPG",
              "/images/vertical5.jpg",
            ].map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Vertical Down"
                className="rounded-lg shadow-lg w-full transition-transform duration-100 ease-out"
                style={{
                  transform: `translateY(${verticalOffset}px)`
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 10 */}
      <section className="sticky top-0 h-screen bg-white">
          <GallerySection />
      </section>

      {/* Section 11 */}
      <section className="sticky top-0 bg-[#0a0f05] py-16 overflow-hidden relative">
          <div className="max-w-4xl mx-auto text-center mb-10 px-4">
            <h2 className="text-4xl font-extrabold text-white mb-4">Our Trusted Brands</h2>
            <p className="text-lg text-gray-300">
              Partnering with top-tier brands to deliver trusted solutions across industries. Explore the power of collaboration.
            </p>
          </div>

          {/* brand logo section */}

          <div className="relative w-full overflow-hidden">
            <div ref={brandcontainerRef} className="flex w-max">
              {[...brandlogos, ...brandlogos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-8"
                  style={{ minWidth: "150px", filter: "drop-shadow(0 0 10px rgba(255,255,255,0.1))" }}
                >
                  <img src={logo} alt="Brand Logo" className="w-full h-20 object-contain grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Subtle Parallax Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none animate-pulse"></div>
      </section>

      {/* Section 12 */}
      <section className="sticky top-0 h-screen">
          <Footer />
      </section>

    </div>

  );
}


