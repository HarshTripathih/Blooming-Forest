// app/exploremap/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "../components/modals";

const mapDots = [
    { id: 1, name: "Patancheru", x: "15%", y: "35%", info: "Key industrial hub with connectivity to Mumbai highway." },
    { id: 2, name: "Jeedimetla", x: "20%", y: "25%", info: "Blue collar employment center with multiple factories." },
    { id: 3, name: "Balanagar", x: "30%", y: "40%", info: "Proximity to city and industrial sectors." },
    { id: 4, name: "Bachupally", x: "40%", y: "20%", info: "Emerging real estate and education zone." },
    { id: 5, name: "Miyapur", x: "45%", y: "30%", info: "Rapidly developing residential hub with metro access." },
    { id: 6, name: "Gachibowli", x: "60%", y: "40%", info: "IT corridor, business parks, and top education institutions." },
    { id: 7, name: "Hitech City", x: "65%", y: "35%", info: "Heart of Hyderabad’s tech scene and startups." },
    { id: 8, name: "Kondapur", x: "62%", y: "38%", info: "High-rise apartments and excellent connectivity." },
    { id: 9, name: "Financial District", x: "70%", y: "45%", info: "Home to MNCs and corporate HQs." },
    { id: 10, name: "Shamshabad", x: "55%", y: "80%", info: "Airport area with massive infrastructure growth." },
    { id: 11, name: "Adibatla", x: "80%", y: "75%", info: "Aerospace and defense manufacturing hub." },
    { id: 12, name: "LB Nagar", x: "85%", y: "50%", info: "Residential and commercial boom town." }
  ];
  

export default function ExploreMapPage() {
  const [activeDot, setActiveDot] = useState(null);

  return (
    <div className="relative w-full h-screen bg-[#0A1B13] text-[#f8f1d9] font-serif overflow-hidden">
      <div className="absolute top-5 left-5 text-xl">02/05</div>
      <h1 className="text-5xl font-light absolute top-16 left-5">Where to <br /> <span className="font-semibold">Invest In Hyderabad ?</span></h1>
      <div className="absolute top-[20%] left-[10%] w-[30%]">
        <div className="bg-[#f8f1d9] text-black px-4 py-2 w-fit font-bold rounded">1</div>
        <h2 className="underline mt-2 text-xl font-semibold">North-West Quadrant</h2>
        <ul className="mt-2 space-y-1 text-sm">
          <li>- Key Radial Road Mumbai Highway</li>
          <li>- Industrial Sector</li>
          <li>- Blue Collar Employment Engine</li>
          <li>- Patancheru, Jeedimetla, Balanagar, Bachupally</li>
        </ul>
      </div>

      <div className="absolute right-10 top-[10%] w-[40%]">
        <Image 
            src="/images/hyderabadouter.webp" 
            alt="Hyderabad Map" 
            width={600}
            height={600}
            className="w-full h-auto" 
            // layout="fill"
            // objectFit="cover"
        />
        {mapDots.map(dot => (
          <div
            key={dot.id}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full cursor-pointer"
            style={{ left: dot.x, top: dot.y }}
            onMouseEnter={() => setActiveDot(dot)}
            onMouseLeave={() => setActiveDot(null)}
          ></div>
        ))}
        {activeDot && (
          <Modal x={activeDot.x} y={activeDot.y} name={activeDot.name} info={activeDot.info} />
        )}
      </div>

      <button className="absolute bottom-10 left-10 border border-[#f8f1d9] px-6 py-2 text-[#f8f1d9] hover:bg-[#f8f1d9] hover:text-black rounded transition-all">
        BOOK A SITE VISIT
      </button>
    </div>
  );
}
