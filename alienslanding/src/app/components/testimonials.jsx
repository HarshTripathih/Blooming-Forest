'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

const testimonials = [
  {
    name: 'Mr. Praveen Kumar',
    text: `Absolutely great place to visit. My experience at Alien HUB near Hyderabad sounds fantastic. The serene environment with positive mountain vibes, and the welcoming hospitality from the Aliens HUB team create a perfect recipe for relaxation. Best place to invest.`,
  },
  {
    name: 'Mr. Sharat Chandra',
    text: `I’m a customer of Aliens HUB, purchased a plot at happening hilltop and very much delighted with completion of registration. The service is authentic, kind and responsive even during unavoidable minor delay and for the ones looking for futuristic investments, this is one place stop.`,
  },
  {
    name: 'Mr. Ravi Varma Amaravathi',
    text: `It's been a great experience. If someone looking for an investment or retirement home, Aliens HUB is the right place. The venture is very close to the nature with beautiful views. Their hospitality and future vision are much appreciated.`,
  },
]

const lines = [
    '/lines/lineunrevailed.svg',
    '/lines/lineunrevailed.svg',
    '/lines/lineunrevailed.svg',
    '/lines/lineunrevailed.svg',
    '/lines/lineunrevailed.svg',
    '/lines/lineunrevailed.svg',
    '/lines/lineunrevailed.svg',
    '/lines/lineunrevailed.svg',
  ]

export default function Testimonials() {
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Update activeIndex based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollLeft = scrollRef.current.scrollLeft
      const width = scrollRef.current.clientWidth
      const index = Math.round(scrollLeft / width)
      setActiveIndex(index)
    }

    const refCurrent = scrollRef.current
    refCurrent.addEventListener('scroll', handleScroll)
    return () => refCurrent.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToIndex = (index) => {
    scrollRef.current.scrollTo({
      left: scrollRef.current.clientWidth * index,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <section className="w-full px-6 py-24 text-center relative">

        {/* Vector line image repeated 8 times vertically on the left */}
        <div className="absolute left-6 md:left-24 top-0 h-full z-0 flex flex-row justify-between gap-[11rem]">
        {lines.map((line, i) => (
            <div key={i} className="h-[100vh] left-[1rem] relative bg-black/20 w-px">
            <Image
                src={line}
                alt="Vertical line"
                fill
                className="object-contain"
            />
            </div>
        ))}
        </div>


        {/* Title */}
        <div className="mb-12">
          <p className="text-sm text-black/50">07/08</p>
          <h2 className="text-4xl md:text-5xl font-nostalgic text-black">Testimonials</h2>
        </div>

        {/* Scrollable testimonials */}
        <div
         ref={scrollRef}
         className="relative z-10 flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        >

          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full md:w-[70%] px-6 snap-start flex flex-col items-start justify-start text-start mx-auto"
            >
              <p className="md:text-xl leading-relaxed text-4xl text-black font-belkinlight max-w-2xl">{t.text}</p>
              <p className="mt-6 font-medium font-belkinlight text-black text-2xl">{t.name}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i === activeIndex ? 'bg-black' : 'bg-black/20'
              }`}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <div className="bg-[#031c00] text-white flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-10 space-y-4 md:space-y-0">
        <h3 className="text-2xl md:text-3xl font-belkinlight">Come Visit Us Now</h3>
        <button className="bg-gradient-to-r from-[#f9e2c5] to-[#edd1a1] text-black px-6 py-3 rounded-md shadow hover:scale-105 transition">
          BOOK A SITE VISIT
        </button>
      </div>
    </>
  )
}
