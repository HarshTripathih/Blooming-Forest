// 'use client';
// import { useEffect, useRef, useState } from 'react';

// export default function CarMove() {
//   const containerRef = useRef(null);
//   const [localScrollY, setLocalScrollY] = useState(0);
//   const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

//   const maxLocalScroll = 3000;
//   const carWidth = 256;

//   const stops = [
//     { name: 'Future City', time: '10 MIN WITH CAR', position: '15vw', image: 'images/futurecity.jpg' },
//     { name: 'Manchester Global School', time: '15 MIN WITH CAR', position: '30vw', image: 'https://www.manchester.global/assets/img/infrastructure/infra_01.webp' },
//     { name: 'E-City', time: '20 MIN WITH CAR', position: '45vw', image: 'images/ecity.jpg' },
//     { name: 'ORR', time: '30 MIN WITH CAR', position: '60vw', image: 'images/orr.jpg' },
//     { name: 'Airport', time: '30 MIN WITH CAR', position: '75vw', image: 'images/airport.webp' },
//     { name: 'TCS', time: '30 MIN WITH CAR', position: '90vw', image: 'images/tcs.jpg' },
//   ];

//   // Set window size for SSR-safe rendering
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     handleResize(); // initial set
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Local scroll within section
//   useEffect(() => {
//     const handleScroll = () => {
//       if (!containerRef.current) return;

//       const rect = containerRef.current.getBoundingClientRect();
//       const sectionTop = rect.top;
//       const sectionHeight = rect.height;
//       const windowHeight = window.innerHeight;

//       if (sectionTop < 0 && Math.abs(sectionTop) <= sectionHeight - windowHeight) {
//         setLocalScrollY(Math.abs(sectionTop));
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   if (!windowSize.width) return null; // Don't render until window size is known

//   const vwToPx = (vw) => (parseFloat(vw) / 100) * windowSize.width;

//   const carX = Math.min((localScrollY / maxLocalScroll) * windowSize.width, windowSize.width - carWidth);
//   const carCenterX = carX + carWidth / 2;
//   const screenMaxSize = Math.max(windowSize.width, windowSize.height) * 2;
//   const growthPoint = 0.9;

//   const waveSize =
//     localScrollY < maxLocalScroll * growthPoint
//       ? 100 + (localScrollY / (maxLocalScroll * growthPoint)) * (screenMaxSize - 100)
//       : screenMaxSize;

//   const handleStopClick = (positionVW) => {
//     const px = vwToPx(positionVW);
//     const scrollTarget = (px / windowSize.width) * maxLocalScroll;
//     const containerTop = containerRef.current.offsetTop;
//     window.scrollTo({ top: containerTop + scrollTarget, behavior: 'smooth' });
//   };

//   return (
//     <div ref={containerRef} className="relative h-[400vh]">
//       {/* Sticky scroll scene */}
//       <div className="sticky top-0 h-screen w-full bg-[#031c00] text-white overflow-hidden">
//         {/* Road Line */}
//         <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700" />

//         {/* Start Point */}
//         <div
//           className={`absolute text-center transition-all duration-700 ease-out ${
//             carCenterX > 30 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
//           }`}
//           style={{ left: '0vw', top: '41%' }}
//         >
//           <img
//             src="/images/alienshub.webp"
//             alt="Start Point"
//             width={200}
//             height={200}
//             className="w-40 h-40 mx-auto rounded-full mb-2 shadow-[0_0_20px_5px_rgba(255,255,255,0.3)]"
//           />
//           <p className="font-semibold w-40 whitespace-normal break-words font-nostalgic text-3xl">Aliens Hub</p>
//         </div>

//         {/* Dots */}
//         {stops.map((stop, idx) => {
//           const stopX = vwToPx(stop.position);
//           const overlapThreshold = carWidth / 2;
//           const isCarOnPoint = Math.abs(carCenterX - stopX) < overlapThreshold;

//           if (!isCarOnPoint) {
//             return (
//               <div
//                 key={`dot-${idx}`}
//                 className="absolute top-1/2 w-3 h-3 bg-orange-400 rounded-full z-20"
//                 style={{ left: `calc(${stop.position} + 2vw)`, transform: 'translate(-50%, -50%)' }}
//               />
//             );
//           }
//           return null;
//         })}

//         {/* Car */}
//         <img
//           src="/images/car.png"
//           alt="Car"
//           className="absolute top-1/2 w-64 z-10"
//           style={{
//             transform: `translateX(${carX}px) translateY(-50%) rotate(90deg)`,
//             transition: 'transform 0.3s ease-out',
//           }}
//         />

//         {/* Stops */}
//         {stops.map((stop, idx) => {
//           const stopX = vwToPx(stop.position);
//           const overlapThreshold = carWidth / 2 + 30;
//           const isCarNearStop = Math.abs(carCenterX - stopX) < overlapThreshold;

//           return (
//             <div key={`stop-${idx}`} className="cursor-pointer" onClick={() => handleStopClick(stop.position)}>
//               <div
//                 className={`absolute text-center transition-all duration-500 ease-out ${
//                   isCarNearStop ? 'scale-110' : 'scale-100'
//                 }`}
//                 style={{ left: `calc(${stop.position} - 2.5vw)`, top: '10%' }}
//               >
//                 <img
//                   src={stop.image}
//                   alt={stop.name}
//                   className="w-40 h-40 mx-auto rounded-full mb-2 shadow-lg"
//                 />
//                 <p className="font-semibold w-40 whitespace-normal break-words font-nostalgic text-xl">
//                   {stop.name}
//                 </p>
//               </div>

//               {/* Time */}
//               <div
//                 className={`absolute text-white text-center transition-all duration-500 ease-out ${
//                   isCarNearStop ? 'scale-110' : 'scale-100'
//                 }`}
//                 style={{ left: `calc(${stop.position} - 1vw)`, top: '75%' }}
//               >
//                 <div className="flex items-center justify-center space-x-2">
//                   <span className="text-[80px] font-light leading-none">{stop.time.split(' ')[0]}</span>
//                   <div className="flex flex-col text-left leading-none">
//                     <span className="text-xs font-light">MIN</span>
//                     <span className="text-xs font-light">WITH CAR</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Final Spacer */}
//       <div
//         className="h-[100vh]"
//         style={{
//           opacity: localScrollY >= maxLocalScroll ? 1 : 0,
//           pointerEvents: localScrollY >= maxLocalScroll ? 'auto' : 'none',
//           transition: 'opacity 0.5s ease',
//         }}
//       />
//     </div>
//   );
// }






// 'use client';
// import { useEffect, useRef, useState } from 'react';

// export default function CarMove() {
//   const containerRef = useRef(null);
//   const [localScrollY, setLocalScrollY] = useState(0);
//   const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
//   const [isMobile, setIsMobile] = useState(false);
//   const [maxLocalScroll, setMaxLocalScroll] = useState(3000);

//   const carWidth = isMobile ? 160 : 256;

//   const stops = [
//     {
//       name: 'Future City',
//       time: '10 MIN WITH CAR',
//       position: isMobile ? '50vh' : '15vw',
//       image: 'images/futurecity.jpg',
//     },
//     {
//       name: 'Manchester Global School',
//       time: '15 MIN WITH CAR',
//       position: isMobile ? '90vh' : '30vw',
//       image: 'https://www.manchester.global/assets/img/infrastructure/infra_01.webp',
//     },
//     {
//       name: 'E-City',
//       time: '20 MIN WITH CAR',
//       position: isMobile ? '130vh' : '45vw',
//       image: 'images/ecity.jpg',
//     },
//     {
//       name: 'ORR',
//       time: '30 MIN WITH CAR',
//       position: isMobile ? '170vh' : '60vw',
//       image: 'images/orr.jpg',
//     },
//     {
//       name: 'Airport',
//       time: '30 MIN WITH CAR',
//       position: isMobile ? '210vh' : '75vw',
//       image: 'images/airport.webp',
//     },
//     {
//       name: 'TCS',
//       time: '30 MIN WITH CAR',
//       position: isMobile ? '250vh' : '90vw',
//       image: 'images/tcs.jpg',
//     },
//   ];

//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;
//       setWindowSize({ width, height });
//       setIsMobile(width <= 768);
//       setMaxLocalScroll(width <= 768 ? window.innerHeight * 2.2 : 3000);
//     };
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!containerRef.current) return;
//       const rect = containerRef.current.getBoundingClientRect();
//       const sectionTop = rect.top;
//       const sectionHeight = rect.height;
//       const windowHeight = window.innerHeight;

//       if (sectionTop < 0 && Math.abs(sectionTop) <= sectionHeight - windowHeight) {
//         setLocalScrollY(Math.abs(sectionTop));
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   if (!windowSize.width) return null;

//   const unitToPx = (val) => {
//     return isMobile
//       ? (parseFloat(val) / 100) * windowSize.height
//       : (parseFloat(val) / 100) * windowSize.width;
//   };

//   // Speed logic
//   const mobileSpeedFactor = 5;     // ⬅️ Speed up car on mobile
//   const desktopSpeedFactor = 1;    // ⬅️ Normal speed on desktop
//   const speed = isMobile ? mobileSpeedFactor : desktopSpeedFactor;

//   const carPos = isMobile
//   ? Math.min((localScrollY / maxLocalScroll) * (windowSize.height * 3.2), windowSize.height * 3.2 - carWidth)
//   : Math.min((localScrollY / maxLocalScroll) * windowSize.width, windowSize.width - carWidth);


//   const carCenter = carPos + carWidth / 2;

//   const handleStopClick = (positionUnit) => {
//     const px = unitToPx(positionUnit);
//     const scrollTarget = (px / (isMobile ? windowSize.height : windowSize.width)) * maxLocalScroll;
//     const containerTop = containerRef.current.offsetTop;
//     window.scrollTo({ top: containerTop + scrollTarget, behavior: 'smooth' });
//   };

//   return (
//     <div
//       ref={containerRef}
//       className={`relative ${isMobile ? 'h-[270vh]' : 'h-[400vh]'}`}
//     >
//       <div
//         className={`sticky ${
//           isMobile ? 'left-0 w-screen h-full' : 'top-0 h-screen w-full'
//         } bg-[#031c00] text-white overflow-hidden`}
//       >
//         <div
//           className={`absolute bg-gray-700 ${isMobile ? 'left-1/2 top-0 h-full w-1' : 'top-1/2 left-0 w-full h-1'}`}
//         />

//         <div
//           className={`absolute text-center transition-all duration-700 ease-out ${
//             carCenter > 30 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
//           }`}
//           style={{
//             left: isMobile ? '50%' : '0vw',
//             top: isMobile ? '5vh' : '41%',
//             transform: 'translate(-50%, -50%)',
//           }}
//         >
//           <img
//             src="/images/alienshub.webp"
//             alt="Start Point"
//             className={`${isMobile ? 'w-20 h-20 mt-20' : 'w-40 h-40' } mx-auto rounded-full mb-2 shadow-[0_0_20px_5px_rgba(255,255,255,0.3)]`}
//           />
//           <p className="font-semibold w-40 break-words font-nostalgic text-3xl">Aliens Hub</p>
//         </div>

//         {stops.map((stop, idx) => {
//           const stopPx = unitToPx(stop.position);
//           const isOnPoint = Math.abs(carCenter - stopPx) < carWidth / 2;
//           if (isOnPoint) return null;

//           return (
//             <div
//               key={`dot-${idx}`}
//               className="absolute w-3 h-3 bg-orange-400 rounded-full z-20"
//               style={{
//                 left: isMobile ? '50%' : `calc(${stop.position} + 2vw)`,
//                 top: isMobile ? `calc(${stop.position} + 2vh)` : '50%',
//                 transform: 'translate(-50%, -50%)',
//               }}
//             />
//           );
//         })}

//         <img
//           src="/images/car.png"
//           alt="Car"
//           className={`absolute ${isMobile ? 'w-[15rem]' : 'w-64'} z-10`}
//           style={{
//             transform: isMobile
//               ? `translateY(${carPos}px) translateX(-50%) rotate(180deg)`
//               : `translateX(${carPos}px) translateY(-50%) rotate(90deg)`,
//             left: isMobile ? '50%' : 'auto',
//             top: isMobile ? '0%' : '50%',
//             transition: 'transform 0.3s ease-out',
//           }}
//         />

//         {stops.map((stop, idx) => {
//           const stopPx = unitToPx(stop.position);
//           const isNearStop = Math.abs(carCenter - stopPx) < carWidth / 2 + 30;

//           return (
//             <div key={`stop-${idx}`} className="cursor-pointer" onClick={() => handleStopClick(stop.position)}>
//               <div
//                 className={`absolute text-center transition-all duration-500 ease-out ${
//                   isNearStop ? 'scale-110' : 'scale-100'
//                 }`}
//                 style={{
//                   left: isMobile ? '20%' : `calc(${stop.position} - 2.5vw)`,
//                   top: isMobile ? stop.position : '10%',
//                   transform: 'translate(-50%, -50%)',
//                 }}
//               >
//                 <img
//                   src={stop.image}
//                   alt={stop.name}
//                   className={`${isMobile ? 'w-20 h-20' : 'w-40 h-40'} mx-auto rounded-full mb-2 shadow-lg`}
//                 />
//                 <p className={`font-semibold break-words font-nostalgic ${isMobile ? 'text-sm w-24' : 'text-xl w-40'}`}>
//                   {stop.name}
//                 </p>
//               </div>

//               <div
//                 className={`absolute text-white transition-all duration-500 ease-out ${
//                   isNearStop ? 'scale-110' : 'scale-100'
//                 }`}
//                 style={{
//                   left: isMobile ? '80%' : `calc(${stop.position} - 1vw)`,
//                   top: isMobile ? stop.position : '75%',
//                   transform: 'translate(-50%, -50%)',
//                 }}
//               >
//                 <div className="flex items-center justify-center space-x-1">
//                   <span className={`${isMobile ? 'text-2xl' : 'text-[80px]'} font-light leading-none`}>
//                     {stop.time.split(' ')[0]}
//                   </span>
//                   <div className={`${isMobile ? 'text-xs' : 'text-sm'} flex flex-col leading-none`}>
//                     <span className="font-light">MIN</span>
//                     <span className="font-light">WITH CAR</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div
//         className="h-[100vh]"
//         style={{
//           opacity: localScrollY >= maxLocalScroll ? 1 : 0,
//           pointerEvents: localScrollY >= maxLocalScroll ? 'auto' : 'none',
//           transition: 'opacity 0.5s ease',
//         }}
//       />
//     </div>
//   );
// }







'use client';
import { useEffect, useRef, useState } from 'react';

export default function CarMove() {
  const containerRef = useRef(null);
  const [localScrollY, setLocalScrollY] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [maxLocalScroll, setMaxLocalScroll] = useState(3000);

  const carWidth = isMobile ? 160 : 256;

  const stops = [
    { name: 'Future City', time: '10 MIN WITH CAR', position: isMobile ? '50vh' : '15vw', image: 'images/futurecity.jpg' },
    { name: 'Manchester Global School', time: '15 MIN WITH CAR', position: isMobile ? '90vh' : '30vw', image: 'https://www.manchester.global/assets/img/infrastructure/infra_01.webp' },
    { name: 'E-City', time: '20 MIN WITH CAR', position: isMobile ? '130vh' : '45vw', image: 'images/ecity.jpg' },
    { name: 'ORR', time: '30 MIN WITH CAR', position: isMobile ? '170vh' : '60vw', image: 'images/orr.jpg' },
    { name: 'Airport', time: '30 MIN WITH CAR', position: isMobile ? '210vh' : '75vw', image: 'images/airport.webp' },
    { name: 'TCS', time: '30 MIN WITH CAR', position: isMobile ? '250vh' : '90vw', image: 'images/tcs.jpg' },
  ];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({ width, height });
      setIsMobile(width <= 768);
      setMaxLocalScroll(width <= 768 ? height * 2.2 : 3000);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      if (sectionTop < 0 && Math.abs(sectionTop) <= sectionHeight - windowHeight) {
        setLocalScrollY(Math.abs(sectionTop));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!windowSize.width) return null;

  const unitToPx = (val) => {
    if (typeof val === 'string') {
      if (val.includes('vh')) {
        return (parseFloat(val) / 100) * windowSize.height;
      } else if (val.includes('vw')) {
        return (parseFloat(val) / 100) * windowSize.width;
      }
    }
    return parseFloat(val);
  };

  const carPos = isMobile
    ? Math.min((localScrollY / maxLocalScroll) * (windowSize.height * 3.2), windowSize.height * 3.2 - carWidth)
    : Math.min((localScrollY / maxLocalScroll) * windowSize.width, windowSize.width - carWidth);

  const carCenter = carPos + carWidth / 2;

  const handleStopClick = (positionUnit) => {
    const px = unitToPx(positionUnit);
    const scrollTarget = (px / (isMobile ? windowSize.height : windowSize.width)) * maxLocalScroll;
    const containerTop = containerRef.current.offsetTop;
    window.scrollTo({ top: containerTop + scrollTarget, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className={`relative ${isMobile ? 'h-[270vh]' : 'h-[400vh]'}`}>
      <div className={`sticky ${isMobile ? 'left-0 w-screen h-full' : 'top-0 h-screen w-full'} bg-[#031c00] text-white overflow-hidden`}>
        <div className={`absolute bg-gray-700 ${isMobile ? 'left-1/2 top-0 h-full w-1' : 'top-1/2 left-0 w-full h-1'}`} />

        {/* Start Point */}
        <div className={`absolute text-center transition-all duration-700 ease-out ${carCenter > 30 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ left: isMobile ? '50%' : '5.5vw', top: isMobile ? '5vh' : '52%', transform: 'translate(-50%, -50%)' }}>
          <img src="/images/alienshub.webp" alt="Start Point" className={`${isMobile ? 'w-20 h-20 mt-20' : 'w-40 h-40'} mx-auto rounded-full mb-2 shadow-[0_0_20px_5px_rgba(255,255,255,0.3)]`} />
          <p className="font-semibold w-40 break-words font-nostalgic text-3xl">Aliens Hub</p>
        </div>

        {/* Dots */}
        {stops.map((stop, idx) => {
          const stopPx = unitToPx(stop.position);
          const isOnPoint = Math.abs(carCenter - stopPx) < carWidth / 2;
          if (isOnPoint) return null;
          return (
            <div key={`dot-${idx}`} className="absolute w-3 h-3 bg-orange-400 rounded-full z-20" style={{ left: isMobile ? '50%' : `calc(${stop.position} + 2vw)`, top: isMobile ? `calc(${stop.position} + 2vh)` : '50%', transform: 'translate(-50%, -50%)' }} />
          );
        })}

        {/* Car */}
        <img src="/images/car.png" alt="Car" className={`absolute ${isMobile ? 'w-[10rem]' : 'w-64'} z-10`} style={{
          transform: isMobile
            ? `translateY(${carPos}px) translateX(-50%) rotate(180deg)`
            : `translateX(${carPos}px) translateY(-50%) rotate(90deg)`,
          left: isMobile ? '50%' : 'auto',
          top: isMobile ? '0%' : '50%',
          transition: 'transform 0.3s ease-out',
        }} />

        {/* Stops */}
        {stops.map((stop, idx) => {
          const stopPx = unitToPx(stop.position);
          const distance = Math.abs(carCenter - stopPx);
          const maxDistance = carWidth;
          const scaleFactor = distance < maxDistance ? 1.2 - (distance / maxDistance) * 0.2 : 1;

          return (
            <div key={`stop-${idx}`} className="cursor-pointer" onClick={() => handleStopClick(stop.position)}>
              {/* Stop Image & Name */}
              <div className="absolute text-center transition-all duration-300 ease-out" style={{
                transform: `translate(-50%, -50%) scale(${scaleFactor})`,
                left: isMobile ? '20%' : `calc(${stop.position} - 2.5vw)`,
                top: isMobile ? stop.position : '20%',
              }}>
                <img src={stop.image} alt={stop.name} className={`${isMobile ? 'w-20 h-20' : 'w-40 h-40'} mx-auto rounded-full mb-2 shadow-lg`} />
                <p className={`font-semibold break-words font-nostalgic ${isMobile ? 'text-sm w-24' : 'text-xl w-40'}`}>{stop.name}</p>
              </div>

              {/* Time Indicator */}
              <div className="absolute text-white transition-all duration-300 ease-out" style={{
                transform: `translate(-50%, -50%) scale(${scaleFactor})`,
                left: isMobile ? '80%' : `calc(${stop.position} - 1vw)`,
                top: isMobile ? `calc(${stop.position} + 10vh)` : '85%',
              }}>
                <div className="flex items-center justify-center space-x-2">
                  <span className={`${isMobile ? 'text-3xl' : 'text-[80px]'} font-light leading-none`}>{stop.time.split(' ')[0]}</span>
                  <div className={`flex flex-col text-left leading-none ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
                    <span className="font-light">MIN</span>
                    <span className="font-light">WITH CAR</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Final Spacer */}
      <div className="h-[100vh]" style={{ opacity: localScrollY >= maxLocalScroll ? 1 : 0, pointerEvents: localScrollY >= maxLocalScroll ? 'auto' : 'none', transition: 'opacity 0.5s ease' }} />
    </div>
  );
}
