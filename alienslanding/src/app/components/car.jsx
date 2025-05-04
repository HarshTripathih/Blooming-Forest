'use client';
import { useEffect, useRef, useState } from 'react';

export default function CarMove() {
  const containerRef = useRef(null);
  const [localScrollY, setLocalScrollY] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const maxLocalScroll = 3000;
  const carWidth = 256;

  const stops = [
    { name: 'Future City', time: '10 MIN WITH CAR', position: '15vw', image: 'images/futurecity.jpg' },
    { name: 'Manchester Global School', time: '15 MIN WITH CAR', position: '30vw', image: 'images/mgs.jpg' },
    { name: 'E-City', time: '20 MIN WITH CAR', position: '45vw', image: 'images/ecity.jpg' },
    { name: 'ORR', time: '30 MIN WITH CAR', position: '60vw', image: 'images/orr.jpg' },
    { name: 'Airport', time: '30 MIN WITH CAR', position: '75vw', image: 'images/airport.webp' },
    { name: 'TCS', time: '30 MIN WITH CAR', position: '90vw', image: 'images/tcs.jpg' },
  ];

  // Set window size for SSR-safe rendering
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // initial set
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Local scroll within section
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

  if (!windowSize.width) return null; // Don't render until window size is known

  const vwToPx = (vw) => (parseFloat(vw) / 100) * windowSize.width;

  const carX = Math.min((localScrollY / maxLocalScroll) * windowSize.width, windowSize.width - carWidth);
  const carCenterX = carX + carWidth / 2;
  const screenMaxSize = Math.max(windowSize.width, windowSize.height) * 2;
  const growthPoint = 0.9;

  const waveSize =
    localScrollY < maxLocalScroll * growthPoint
      ? 100 + (localScrollY / (maxLocalScroll * growthPoint)) * (screenMaxSize - 100)
      : screenMaxSize;

  const handleStopClick = (positionVW) => {
    const px = vwToPx(positionVW);
    const scrollTarget = (px / windowSize.width) * maxLocalScroll;
    const containerTop = containerRef.current.offsetTop;
    window.scrollTo({ top: containerTop + scrollTarget, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Sticky scroll scene */}
      <div className="sticky top-0 h-screen w-full bg-[#031c00] text-white overflow-hidden">
        {/* Road Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700" />

        {/* Start Point */}
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
          const overlapThreshold = carWidth / 2 + 30;
          const isCarNearStop = Math.abs(carCenterX - stopX) < overlapThreshold;

          return (
            <div key={`stop-${idx}`} className="cursor-pointer" onClick={() => handleStopClick(stop.position)}>
              <div
                className={`absolute text-center transition-all duration-500 ease-out ${
                  isCarNearStop ? 'scale-110' : 'scale-100'
                }`}
                style={{ left: `calc(${stop.position} - 2.5vw)`, top: '10%' }}
              >
                <img
                  src={stop.image}
                  alt={stop.name}
                  className="w-40 h-40 mx-auto rounded-full mb-2 shadow-lg"
                />
                <p className="font-semibold w-40 whitespace-normal break-words font-nostalgic text-xl">
                  {stop.name}
                </p>
              </div>

              {/* Time */}
              <div
                className={`absolute text-white text-center transition-all duration-500 ease-out ${
                  isCarNearStop ? 'scale-110' : 'scale-100'
                }`}
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

      {/* Final Spacer */}
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
