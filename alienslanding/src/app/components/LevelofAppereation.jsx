'use client'

import Image from 'next/image'
import { Play } from 'lucide-react'

export default function FourLevelsAppreciation() {
  return (
    <section className="w-full py-24 px-6 md:px-24 bg-white text-center relative overflow-hidden">
      {/* Heading */}
      <div className="mb-12">
        <p className="text-sm text-black/50">04/08</p>
        <h2 className="text-4xl md:text-5xl font-nostalgic text-black">
          4 levels of Appreciation
        </h2>
      </div>

      {/* Video Box */}
      <div className="relative w-full aspect-[16/9] bg-[#e8e8e8] rounded-lg overflow-hidden flex items-center justify-center">
        {/* Optional grunge texture */}
        <Image
          src="/images/levelofappreation.png" // ✅ replace with your image path
          alt="Grunge background"
          fill
          className="object-cover opacity-70 pointer-events-none select-none"
        />

        {/* Play Button */}
        <button className="relative z-10 w-20 h-20 rounded-full border border-black flex items-center justify-center hover:scale-110 transition-transform duration-300 bg-white/50 backdrop-blur-sm">
          <Play className="w-8 h-8 text-black" fill="black" />
        </button>
      </div>
    </section>
  )
}
