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











"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CarAnimation from "./CarAnimation";

export default function MapView() {
  const [zoomIn, setZoomIn] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMap, setShowMap] = useState(true); // State to manage map visibility
  const [showClouds, setShowClouds] = useState(false); // State to manage clouds visibility
  const [zoomTransitionComplete, setZoomTransitionComplete] = useState(false); // Track transition completion

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if we're scrolling down and zooming in
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setZoomIn(true);
        setShowMap(true); // Keep map visible while zooming in
        setZoomTransitionComplete(false); // Reset zoom transition

        // Wait for the zoom transition to complete
        setTimeout(() => {
          setZoomTransitionComplete(true); // Zoom transition completed
          setShowMap(false); // Hide the map after zoom completes
          setShowClouds(true); // Show clouds when zoom is complete
        }, 1000); // Match the transition duration (1s)
      }
      // Check if we're scrolling up and zooming out
      else if (currentScrollY < lastScrollY) {
        setZoomIn(false);
        setShowMap(true); // Show map when zoomed out
        setShowClouds(false); // Hide clouds when zoomed out
        setZoomTransitionComplete(false); // Reset transition completion
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="relative h-[200vh] w-full">
      {/* HTML Map zoom on scroll */}
      <div
        className="fixed top-0 left-0 w-full h-full origin-center z-0"
        style={{
          transform: zoomIn ? "scale(3)" : "scale(1)",
          transition: "transform 1s ease-in-out",
        }}
      >
        {showMap && !zoomTransitionComplete && ( // Only show map while zoom is in progress and transition is not complete
          <Image
            src="/images/hyderabadmap.svg"
            alt="Hyderabad Map"
            layout="fill"
            objectFit="cover"
          />
        )}
        {showClouds && zoomTransitionComplete && ( // Show clouds only after zoom transition is complete
          <Image
            src="/images/sky.jpg" // Make sure you have a clouds image
            alt="Clouds"
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-1000"
            style={{ opacity: zoomIn ? 1 : 0 }}
          />
        )}
      </div>

      {/* 3D Scene overlays after scroll */}
      {zoomIn && (
        <div className="fixed top-0 left-0 w-full h-full z-10">
          <CarAnimation zoomed={zoomIn} />
        </div>
      )}
    </div>
  );
}
