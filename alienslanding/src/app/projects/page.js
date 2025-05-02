// 'use client';
// import { useEffect, useRef, useState } from 'react';

// export default function CarMove() {
//   const scrollRef = useRef(null);
//   const [scrollY, setScrollY] = useState(0);
//   const maxScroll = 3000;

//   const stops = [
//     // { name: 'Start Point', time: '', position: '0vw', image: '/images/start.jpg', isStart: true },
//     { name: 'Future City', time: '10 MIN WITH CAR', position: '15vw', image: 'images/futurecity.jpg' },
//     { name: 'Manchester Global School', time: '15 MIN WITH CAR', position: '30vw', image: 'images/mgs.jpg' },
//     { name: 'E-City', time: '20 MIN WITH CAR', position: '45vw', image: 'images/ecity.jpg' },
//     { name: 'ORR', time: '30 MIN WITH CAR', position: '60vw', image: 'images/orr.jpg' },
//     { name: 'Airport', time: '30 MIN WITH CAR', position: '75vw', image: 'images/airport.webp' },
//     { name: 'TCS', time: '30 MIN WITH CAR', position: '90vw', image: '/tcs.png' },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const carWidth = 256;
//   const carX = Math.min((scrollY / maxScroll) * window.innerWidth, window.innerWidth - carWidth);
//   const carCenterX = carX + carWidth / 2;

//   const screenMaxSize = Math.max(window.innerWidth, window.innerHeight) * 2;
//   const growthPoint = 0.9;

//   const waveSize =
//     scrollY < maxScroll * growthPoint
//       ? 100 + (scrollY / (maxScroll * growthPoint)) * (screenMaxSize - 100)
//       : screenMaxSize;

//   // Convert vw to px
//   const vwToPx = (vw) => (parseFloat(vw) / 100) * window.innerWidth;

//   // Handle scroll to stop
//   const handleStopClick = (positionVW) => {
//     const px = vwToPx(positionVW);
//     const scrollTo = (px / window.innerWidth) * maxScroll;
//     window.scrollTo({ top: scrollTo, behavior: 'smooth' });
//   };

//   return (
//     <section>
//       {/* Scroll space */}
//       <div style={{ height: `${maxScroll}px` }} ref={scrollRef}></div>

//       {/* Fixed visual scene */}
//       <div className="fixed top-0 left-0 w-screen h-screen bg-black text-white overflow-hidden">
//         {/* Road Line */}
//         <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700" />

//         {/* Start Point Image */}
//         <div
//           className="absolute text-center"
//           style={{ left: '0vw', top: '40%' }}
//         >
//           <img
//             src="/images/orr.jpg" // Your start image path
//             alt="Start Point"
//             className="w-40 h-40 mx-auto rounded-full mb-2 shadow-[0_0_20px_5px_rgba(255,255,255,0.3)]"
//           />
//           {/* <p className="font-semibold w-40 whitespace-normal break-words">Start Point</p> */}
//         </div>

//         {/* Dots on the road (disappear when car reaches) */}
//         {stops.map((stop, idx) => {
//           const stopX = vwToPx(stop.position);
//           const overlapThreshold = carWidth / 2;
//           const isCarOnPoint = Math.abs(carCenterX - stopX) < overlapThreshold;

//           if (!isCarOnPoint) {
//             return (
//               <div
//                 key={`dot-${idx}`}
//                 className="absolute top-1/2 w-3 h-3 ml-22 bg-orange-400 rounded-full z-20"
//                 style={{ left: stop.position, transform: 'translate(-50%, -50%)' }}
//               />
//             );
//           }

//           return null;
//         })}

//         {/* Expanding Wavy Circle */}
//         <div
//           className="absolute pointer-events-none"
//           style={{
//             left: carCenterX,
//             top: '50%',
//             width: `${waveSize}px`,
//             height: `${waveSize}px`,
//             transform: 'translate(-50%, -50%)',
//             borderRadius: '50%',
//             background: 'radial-gradient(circle, rgba(0,0,255,0.4), rgba(0,255,255,0.3))',
//             zIndex: 1,
//           }}
//         />

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

//         {/* Stops with image, name, time & click handler */}
//         {stops.map((stop, idx) => (
//           <div
//             key={`stop-${idx}`}
//             className="cursor-pointer"
//             onClick={() => handleStopClick(stop.position)}
//           >
//             {/* Image and name */}
//             <div
//               className="absolute text-center"
//               style={{ left: stop.position, top: '10%' }}
//             >
//               <img
//                 src={stop.image}
//                 alt={stop.name}
//                 className="w-40 h-40 mx-auto rounded-full mb-2 shadow-[0_0_20px_5px_rgba(255,255,255,0.3)]"
//               />
//               <p className="font-semibold w-40 whitespace-normal break-words">{stop.name}</p>
//             </div>

//             {/* Time */}
//             <div
//               className="absolute text-white text-center"
//               style={{ left: stop.position, top: '75%' }}
//             >
//               <p className="flex items-start justify-center leading-snug">
//                 <span className="text-[60px] font-light leading-none">{stop.time.split(' ')[0]}</span>
//                 <span className="text-sm font-light leading-snug ml-1 text-left">
//                   {stop.time.split(' ').slice(1).join(' ')}
//                 </span>
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }











// 'use client';
// import { useEffect, useRef, useState } from 'react';

// export default function CarMove() {
//   const containerRef = useRef(null);
//   const [localScrollY, setLocalScrollY] = useState(0);
//   const [showStartImage, setShowStartImage] = useState(false);

//   const maxLocalScroll = 3000; // how much scroll we want inside Section 6
//   const carWidth = 256;

//   const stops = [
//     { name: 'Future City', time: '10 MIN WITH CAR', position: '15vw', image: 'images/futurecity.jpg' },
//     { name: 'Manchester Global School', time: '15 MIN WITH CAR', position: '30vw', image: 'images/mgs.jpg' },
//     { name: 'E-City', time: '20 MIN WITH CAR', position: '45vw', image: 'images/ecity.jpg' },
//     { name: 'ORR', time: '30 MIN WITH CAR', position: '60vw', image: 'images/orr.jpg' },
//     { name: 'Airport', time: '30 MIN WITH CAR', position: '75vw', image: 'images/airport.webp' },
//     { name: 'TCS', time: '30 MIN WITH CAR', position: '90vw', image: 'images/tcs.jpg' },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!containerRef.current) return;

//       const rect = containerRef.current.getBoundingClientRect();
//       const sectionTop = rect.top;
//       const sectionHeight = rect.height;
//       const windowHeight = window.innerHeight;

//       // Only start counting localScroll when Section 6 is visible
//       if (sectionTop < 0 && Math.abs(sectionTop) <= sectionHeight - windowHeight) {
//         setLocalScrollY(Math.abs(sectionTop));
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const carX = Math.min((localScrollY / maxLocalScroll) * window.innerWidth, window.innerWidth - carWidth);
//   const carCenterX = carX + carWidth / 2;

//   const screenMaxSize = Math.max(window.innerWidth, window.innerHeight) * 2;
//   const growthPoint = 0.9;

//   const waveSize =
//     localScrollY < maxLocalScroll * growthPoint
//       ? 100 + (localScrollY / (maxLocalScroll * growthPoint)) * (screenMaxSize - 100)
//       : screenMaxSize;

//   // Convert vw to px
//   const vwToPx = (vw) => (parseFloat(vw) / 100) * window.innerWidth;

//   // Handle click to jump
//   const handleStopClick = (positionVW) => {
//     const px = vwToPx(positionVW);
//     const scrollTarget = (px / window.innerWidth) * maxLocalScroll;
//     const containerTop = containerRef.current.offsetTop;
//     window.scrollTo({ top: containerTop + scrollTarget, behavior: 'smooth' });
//   };

//   return (
//     <div ref={containerRef} className="relative h-[400vh]">
//       {/* 1. Sticky Scene */}
//       <div className="sticky top-0 h-screen w-full bg-black text-white overflow-hidden">
//         {/* Road Line */}
//         <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700" />

//         {/* Start Point Image */}
//         <div
//           className={`absolute text-center transition-all duration-700 ease-out ${
//             carCenterX > 30 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
//           }`}
//           style={{ left: '0vw', top: '41%' }}
//         >
//           <img
//             src="/images/alienshub.webp"
//             alt="Start Point"
//             className="w-40 h-40 mx-auto rounded-full mb-2 shadow-[0_0_20px_5px_rgba(255,255,255,0.3)]"
//           />
//           <p className="font-semibold w-40 whitespace-normal break-words">Aliens Hub</p>
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

//         {/* Expanding Circle */}
//         <div
//           className="absolute pointer-events-none"
//           style={{
//             left: carCenterX,
//             top: '50%',
//             width: `${waveSize}px`,
//             height: `${waveSize}px`,
//             transform: 'translate(-50%, -50%)',
//             borderRadius: '50%',
//             background: 'radial-gradient(circle, rgba(0,0,255,0.4), rgba(0,255,255,0.3))',
//             zIndex: 1,
//           }}
//         />

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
//         {stops.map((stop, idx) => (
//           <div
//             key={`stop-${idx}`}
//             className="cursor-pointer"
//             onClick={() => handleStopClick(stop.position)}
//           >
//             {/* Stop Info */}
//             <div
//               className="absolute text-center"
//               style={{ left: `calc(${stop.position} - 2.5vw)`, top: '10%' }}
//             >
//               <img
//                 src={stop.image}
//                 alt={stop.name}
//                 className="w-40 h-40 mx-auto rounded-full mb-2 "
//               />
//               <p className="font-semibold w-40 whitespace-normal break-words">{stop.name}</p>
//             </div>

//             {/* Time */}
//             <div
//               className="absolute text-white text-center"
//               style={{ left: `calc(${stop.position} - 1vw)`, top: '75%' }}
//             >
//               <div className="flex items-center justify-center space-x-2">
//                 <span className="text-[80px] font-light leading-none">{stop.time.split(' ')[0]}</span>
//                 <div className="flex flex-col text-left leading-none">
//                   <span className="text-xs font-light">MIN</span>
//                   <span className="text-xs font-light">WITH CAR</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* 2. Spacer to Control 7th Section Visibility */}
//       {/* Only scroll to Section 7 when car is finished */}
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
  const [showStartImage, setShowStartImage] = useState(false);

  const maxLocalScroll = 3000; // how much scroll we want inside Section 6
  const carWidth = 256;

  const stops = [
    { name: 'Future City', time: '10 MIN WITH CAR', position: '15vw', image: 'images/futurecity.jpg' },
    { name: 'Manchester Global School', time: '15 MIN WITH CAR', position: '30vw', image: 'images/mgs.jpg' },
    { name: 'E-City', time: '20 MIN WITH CAR', position: '45vw', image: 'images/ecity.jpg' },
    { name: 'ORR', time: '30 MIN WITH CAR', position: '60vw', image: 'images/orr.jpg' },
    { name: 'Airport', time: '30 MIN WITH CAR', position: '75vw', image: 'images/airport.webp' },
    { name: 'TCS', time: '30 MIN WITH CAR', position: '90vw', image: 'images/tcs.jpg' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Only start counting localScroll when Section 6 is visible
      if (sectionTop < 0 && Math.abs(sectionTop) <= sectionHeight - windowHeight) {
        setLocalScrollY(Math.abs(sectionTop));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const carX = Math.min((localScrollY / maxLocalScroll) * window.innerWidth, window.innerWidth - carWidth);
  const carCenterX = carX + carWidth / 2;

  const screenMaxSize = Math.max(window.innerWidth, window.innerHeight) * 2;
  const growthPoint = 0.9;

  const waveSize =
    localScrollY < maxLocalScroll * growthPoint
      ? 100 + (localScrollY / (maxLocalScroll * growthPoint)) * (screenMaxSize - 100)
      : screenMaxSize;

  // Convert vw to px
  const vwToPx = (vw) => (parseFloat(vw) / 100) * window.innerWidth;

  // Handle click to jump
  const handleStopClick = (positionVW) => {
    const px = vwToPx(positionVW);
    const scrollTarget = (px / window.innerWidth) * maxLocalScroll;
    const containerTop = containerRef.current.offsetTop;
    window.scrollTo({ top: containerTop + scrollTarget, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* 1. Sticky Scene */}
      <div className="sticky top-0 h-screen w-full bg-[#031c00] text-white overflow-hidden">
        {/* Road Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700" />

        {/* Start Point Image */}
        <div
          className={`absolute text-center transition-all duration-700 ease-out ${
            carCenterX > 30 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{ left: '0vw', top: '41%' }}
        >
          <img
            src="/images/alienshub.webp"
            alt="Start Point"
            className="w-40 h-40 mx-auto rounded-full mb-2 shadow-[0_0_20px_5px_rgba(255,255,255,0.3)]"
          />
          <p className="font-semibold w-40 whitespace-normal break-words font-nostalgic text-3xl">Aliens Hub</p>
        </div>

        {/* Dots */}
        {stops.map((stop, idx) => {
          const stopX = vwToPx(stop.position);
          const overlapThreshold = carWidth / 2;
          const isCarOnPoint = Math.abs(carCenterX - stopX) < overlapThreshold;

          if (!isCarOnPoint) {
            return (
              <div
                key={`dot-${idx}`}
                className="absolute top-1/2 w-3 h-3 bg-orange-400 rounded-full z-20"
                style={{ left: `calc(${stop.position} + 2vw)`, transform: 'translate(-50%, -50%)' }}
              />
            );
          }
          return null;
        })}

        {/* Expanding Circle
        <div
          className="absolute pointer-events-none"
          style={{
            left: carCenterX,
            top: '50%',
            width: `${waveSize}px`,
            height: `${waveSize}px`,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,0,255,0.4), rgba(0,255,255,0.3))',
            zIndex: 1,
          }}
        /> */}

        {/* Car */}
        <img
          src="/images/car.png"
          alt="Car"
          className="absolute top-1/2 w-64 z-10"
          style={{
            transform: `translateX(${carX}px) translateY(-50%) rotate(90deg)`,
            transition: 'transform 0.3s ease-out',
          }}
        />

        {/* Stops */}
        {stops.map((stop, idx) => {
          const stopX = vwToPx(stop.position);
          const overlapThreshold = carWidth / 2 + 30; // Adjust threshold for nicer effect
          const isCarNearStop = Math.abs(carCenterX - stopX) < overlapThreshold;

          return (
            <div
              key={`stop-${idx}`}
              className="cursor-pointer"
              onClick={() => handleStopClick(stop.position)}
            >
              {/* Stop Info */}
              <div
                className={`absolute text-center transition-all duration-500 ease-out ${isCarNearStop ? 'scale-110' : 'scale-100'}`}
                style={{ left: `calc(${stop.position} - 2.5vw)`, top: '10%' }}
              >
                <img
                  src={stop.image}
                  alt={stop.name}
                  className="w-40 h-40 mx-auto rounded-full mb-2 shadow-lg"
                />
                <p className="font-semibold w-40 whitespace-normal break-words font-nostalgic text-xl">{stop.name}</p>
              </div>

              {/* Time */}
              <div
                className={`absolute text-white text-center transition-all duration-500 ease-out ${isCarNearStop ? 'scale-110' : 'scale-100'}`}
                style={{ left: `calc(${stop.position} - 1vw)`, top: '75%' }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-[80px] font-light leading-none">{stop.time.split(' ')[0]}</span>
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-xs font-light">MIN</span>
                    <span className="text-xs font-light">WITH CAR</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      </div>

      {/* 2. Spacer to Control 7th Section Visibility */}
      {/* Only scroll to Section 7 when car is finished */}
      <div
        className="h-[100vh]"
        style={{
          opacity: localScrollY >= maxLocalScroll ? 1 : 0,
          pointerEvents: localScrollY >= maxLocalScroll ? 'auto' : 'none',
          transition: 'opacity 0.5s ease',
        }}
      />
    </div>
  );
}

