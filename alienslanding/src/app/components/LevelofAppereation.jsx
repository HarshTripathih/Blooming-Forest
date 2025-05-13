'use client'

import { Play, Pause } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function FourLevelsAppreciation() {
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch((err) => {
        console.error('Autoplay error:', err)
        setIsPlaying(false)
      })
    }
  }, [])

  const togglePlayback = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="w-full py-24 px-6 md:px-24 bg-[#031c00] text-center relative overflow-hidden">
      {/* Heading */}
      <div className="mb-12">
        <p className="text-sm text-white/50">04/08</p>
        <h2 className="text-4xl md:text-5xl font-nostalgic text-[#edd9ba]">
          4 levels of Appreciation
        </h2>
      </div>

      {/* Border Image Overlay */}
        {/* <div className="absolute inset-0 z-10">
          <Image
            src="/images/videoborder.svg"
            alt="Video Border"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        </div> */}
      {/* Video Box with Border */}
      <div className="group relative w-full aspect-[16/9] bg-[#e8e8e8] rounded-lg overflow-hidden flex items-center justify-center">
        

        {/* Video */}
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dqqg1mr0u/video/upload/v1747123772/landnewupdated_c3tcgg.mp4"
          className="absolute inset-0 w-full h-full object-cover border border-lg rounded-lg"
          loop
          muted
          playsInline
        />

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayback}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute z-15 w-10 h-10 md:z-30 md:w-20 md:h-20 rounded-full border border-black flex items-center justify-center bg-white/50 backdrop-blur-sm hover:scale-110"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 md:w-8 md:h-8 text-black" />
          ) : (
            <Play className="w-4 h-4 md:w-8 md:h-8 text-black" fill="black" />
          )}
        </button>
      </div>
    </section>
  )
}
