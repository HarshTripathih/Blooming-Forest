'use client';
import { useEffect, useRef, useState } from 'react';

export default function CarMove() {
  const scrollRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const maxScroll = 3000;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const carWidth = 256;
  const carX = Math.min((scrollY / maxScroll) * window.innerWidth, window.innerWidth - carWidth);

  const screenMaxSize = Math.max(window.innerWidth, window.innerHeight) * 2;
  const growthPoint = 0.9;

  const waveSize =
    scrollY < maxScroll * growthPoint
      ? 100 + (scrollY / (maxScroll * growthPoint)) * (screenMaxSize - 100)
      : screenMaxSize;

  return (
    <section>
      {/* Scroll space */}
      <div style={{ height: `${maxScroll}px` }} ref={scrollRef}></div>

      {/* Fixed visual scene */}
      <div className="fixed top-0 left-0 w-screen h-screen bg-black text-white overflow-hidden">
        {/* Road Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700" />

        {/* Expanding Wavy Circle */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: carX + carWidth / 2,
            top: '50%',
            width: `${waveSize}px`,
            height: `${waveSize}px`,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,0,255,0.4), rgba(0,255,255,0.3))',
            zIndex: 1,
          }}
        />

        {/* Car */}
        <img
          src="images/car.png"
          alt="Car"
          className="absolute top-1/2 w-96 z-10"
          style={{
            transform: `translateX(${carX}px) translateY(-50%) rotate(90deg)`,
            transition: 'transform 0.3s ease-out',
          }}
        />

        {/* Stops */}
        <div className="absolute top-[25%] left-[20vw] text-center">
          <img src="/town.png" alt="town" className="w-20 h-20 mx-auto rounded-full mb-2" />
          <p>New Town</p>
        </div>

        <div className="absolute top-[25%] left-[50vw] text-center">
          <img src="/gym.png" alt="gym" className="w-20 h-20 mx-auto rounded-full mb-2" />
          <p>Fitness Hub</p>
        </div>

        <div className="absolute top-[25%] left-[80vw] text-right">
          <p className="text-4xl font-bold">10</p>
          <p>MIN WITH CAR</p>
        </div>
      </div>
    </section>
  );
}
