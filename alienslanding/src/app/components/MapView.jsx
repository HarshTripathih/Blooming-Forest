// "use client";

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import CarAnimation from './CarAnimation';

// export default function MapView() {
//   const [zoomIn, setZoomIn] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY > 100 && currentScrollY > lastScrollY) {
//         // Scrolling down
//         setZoomIn(true);
//       } else if (currentScrollY < lastScrollY) {
//         // Scrolling up
//         setZoomIn(false);
//       }

//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [lastScrollY]);

//   return (
//     <div className="relative h-[200vh] w-full">
//       <div
//         className="fixed top-0 left-0 w-full h-full origin-center z-0"
//         style={{
//           transform: zoomIn ? 'scale(2)' : 'scale(1)',
//           transition: 'transform 1s ease-in-out',
//         }}
//       >
//         <Image
//           src="/images/hyderabadmap.svg"
//           alt="Hyderabad Map"
//           layout="fill"
//           objectFit="cover"
//         />
//       </div>

//       {zoomIn && (
//         <div className="fixed top-0 left-0 w-full h-full z-10">
//           <CarAnimation />
//         </div>
//       )}
//     </div>
//   );
// }



// both maps are visible in this code



// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import CarAnimation from "./CarAnimation";

// export default function MapView() {
//   const [zoomIn, setZoomIn] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY > 100 && currentScrollY > lastScrollY) {
//         setZoomIn(true);
//       } else if (currentScrollY < lastScrollY) {
//         setZoomIn(false);
//       }

//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   return (
//     <div className="relative h-[200vh] w-full">
//       {/* HTML Map zoom on scroll */}
//       <div
//         className="fixed top-0 left-0 w-full h-full origin-center z-0"
//         style={{
//           transform: zoomIn ? "scale(3)" : "scale(1)",
//           transition: "transform 1s ease-in-out",
//         }}
//       >
//         <Image
//           src="/images/hyderabadmap.svg"
//           alt="Hyderabad Map"
//           layout="fill"
//           objectFit="cover"
//         />
//       </div>

//       {/* 3D Scene overlays after scroll */}
//       {zoomIn && (
//         <div className="fixed top-0 left-0 w-full h-full z-10">
//           <CarAnimation zoomed={zoomIn} />
//         </div>
//       )}
//     </div>
//   );
// }











// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import CarAnimation from "./CarAnimation";

// export default function MapView() {
//   const [zoomIn, setZoomIn] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [showMap, setShowMap] = useState(true); // State to manage map visibility
//   const [showClouds, setShowClouds] = useState(false); // State to manage clouds visibility
//   const [zoomTransitionComplete, setZoomTransitionComplete] = useState(false); // Track transition completion

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       // Check if we're scrolling down and zooming in
//       if (currentScrollY > 100 && currentScrollY > lastScrollY) {
//         setZoomIn(true);
//         setShowMap(true); // Keep map visible while zooming in
//         setZoomTransitionComplete(false); // Reset zoom transition

//         // Wait for the zoom transition to complete
//         setTimeout(() => {
//           setZoomTransitionComplete(true); // Zoom transition completed
//           setShowMap(false); // Hide the map after zoom completes
//           setShowClouds(true); // Show clouds when zoom is complete
//         }, 1000); // Match the transition duration (1s)
//       }
//       // Check if we're scrolling up and zooming out
//       else if (currentScrollY < lastScrollY) {
//         setZoomIn(false);
//         setShowMap(true); // Show map when zoomed out
//         setShowClouds(false); // Hide clouds when zoomed out
//         setZoomTransitionComplete(false); // Reset transition completion
//       }

//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   return (
//     <div className="relative h-[200vh] w-full">
//       {/* HTML Map zoom on scroll */}
//       <div
//         className="fixed top-0 left-0 w-full h-full origin-center z-0"
//         style={{
//           transform: zoomIn ? "scale(3)" : "scale(1)",
//           transition: "transform 1s ease-in-out",
//         }}
//       >
//         {showMap && !zoomTransitionComplete && ( // Only show map while zoom is in progress and transition is not complete
//           <Image
//             src="/images/hyderabadmap.svg"
//             alt="Hyderabad Map"
//             layout="fill"
//             objectFit="cover"
//           />
//         )}
//         {showClouds && zoomTransitionComplete && ( // Show clouds only after zoom transition is complete
//           <Image
//             src="/images/sky.jpg" // Make sure you have a clouds image
//             alt="Clouds"
//             layout="fill"
//             objectFit="cover"
//             className="transition-opacity duration-1000"
//             style={{ opacity: zoomIn ? 1 : 0 }}
//           />
//         )}
//       </div>

//       {/* 3D Scene overlays after scroll */}
//       {zoomIn && (
//         <div className="fixed top-0 left-0 w-full h-full z-10">
//           <CarAnimation zoomed={zoomIn} />
//         </div>
//       )}
//     </div>
//   );
// }




"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CarAnimation from "./CarAnimation";

export default function MapView() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMap, setShowMap] = useState(true);
  const [showClouds, setShowClouds] = useState(false);
  const [zoomTransitionComplete, setZoomTransitionComplete] = useState(false);
  const [activeQuadrant, setActiveQuadrant] = useState(1);
  const [showBoxes, setShowBoxes] = useState(true);

  const quadrantData = {
    1: {
      title: "North-West Quadrant",
      points: [
        "Key Radial Road: Mumbai Highway",
        "Industrial Sector",
        "Blue Collar Employment Engine",
        "Patancheru, Jeedimetla, Balanagar, Bachupally",
      ],
    },
    2: {
      title: "South-West Quadrant",
      points: [
        "Key Radial Road: Bengaluru Highway & Srishailam/Chennai Highway",
        "IT Sector",
        "White Collar Employment Engine",
        "Gachibowli, Hitech City, Tellapur, Shamshabad",
      ],
    },
    3: {
      title: "North-East Quadrant",
      points: [
        "Key Radial Road: Nagpur/Delhi Highway & Warangal Highway",
        "Defence Sector",
        "Government Employment Engine",
        "Begumpet, Secunderabad, Bolarum, Sainik Puri, ECIL",
      ],
    },
    4: {
      title: "South-East Quadrant",
      points: [
        "Key Radial Road: Vijayawada Highway",
        "Traditional Sector",
        "Local Business Employment Engine",
        "Abids, Uppal, Dilsukhnagar",
      ],
    },
  };

  const quadrantPositions = {
    1: { top: "13.8%", left: "37.1%" },
    2: { top: "26.4%", left: "40.6%" },
    3: { top: "17.9%", left: "53.7%" },
    4: { top: "29.5%", left: "56.1%" },
  };

  // Scroll observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Zoom logic
  useEffect(() => {
    if (!inView) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 10) {
        setShowBoxes(false);
      } else {
        setShowBoxes(true);
      }

      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setZoomIn(true);
        setShowMap(true);
        setZoomTransitionComplete(false);
        setTimeout(() => {
          setZoomTransitionComplete(true);
          setShowMap(false);
          setShowClouds(true);
        }, 1000);
      } else if (currentScrollY < lastScrollY) {
        setZoomIn(false);
        setShowMap(true);
        setShowClouds(false);
        setZoomTransitionComplete(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, inView]);

  return (
    <div ref={sectionRef} className="relative h-[100vh] w-full">
      {/* Map Zoom Section: Only when in view */}
      {inView && (
        <div
          className="fixed top-0 left-0 w-full h-full origin-center z-0"
          style={{
            transform: zoomIn ? "scale(3)" : "scale(1)",
            transition: "transform 1s ease-in-out",
          }}
        >
          {showMap && !zoomTransitionComplete && (
            <Image
              src="/images/hyderabadmap.svg"
              alt="Hyderabad Map"
              layout="fill"
              objectFit="cover"
            />
          )}
          {showClouds && zoomTransitionComplete && (
            <Image
              src="/images/sky.jpg"
              alt="Clouds"
              layout="fill"
              objectFit="cover"
              className="transition-opacity duration-1000"
              style={{ opacity: zoomIn ? 1 : 0 }}
            />
          )}
        </div>
      )}

      {/* Quadrant Selector Boxes */}
      {inView &&
        showBoxes &&
        [1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className="absolute z-20 cursor-pointer"
            style={{
              top: quadrantPositions[num].top,
              left: quadrantPositions[num].left,
            }}
            onClick={() => setActiveQuadrant(num)}
          >
            <div
              className={`bg-white text-black font-bold w-6 h-6 rounded-sm flex items-center justify-center shadow ${
                activeQuadrant === num ? "ring-2 ring-yellow-400" : ""
              }`}
            >
              {num}
            </div>
          </div>
        ))}

      {/* Info Box */}
      {inView && (
        <div className="fixed bottom-28 left-10 text-white p-6 rounded-lg max-w-md z-30 shadow-lg font-['Plus_Jakarta_Sans']">
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-3">
            <span className="border border-white text-white w-6 h-6 rounded-sm flex items-center justify-center text-sm font-bold">
              {activeQuadrant}
            </span>
            <span className="font-bold text-2xl font-nostalgic">
              {quadrantData[activeQuadrant].title}
            </span>
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-base font-light">
            {quadrantData[activeQuadrant].points.map((point, idx) => (
              <li className="font-belkinlight" key={idx}>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bottom Bar Selector */}
      {inView && (
        <div className="fixed bottom-10 left-[9rem] transform -translate-x-1/2 flex space-x-4 z-40">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              onClick={() => setActiveQuadrant(num)}
              className={`w-6 h-2 cursor-pointer transition-colors duration-300 ${
                activeQuadrant === num ? "bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      )}

      {/* Car Animation Overlay */}
      {inView && zoomIn && (
        <div className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none">
          <CarAnimation zoomed={zoomIn} />
        </div>
      )}
    </div>
  );
}
