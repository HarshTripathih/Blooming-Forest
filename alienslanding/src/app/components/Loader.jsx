'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile screen
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 1000)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => {
        window.removeEventListener('load', handleLoad)
        window.removeEventListener('resize', checkMobile)
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center gap-6 px-4 text-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Spinner Container */}
          <motion.div
            className="relative w-32 h-32"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          >
            {/* Rotating Ring */}
            <motion.div
              className="absolute inset-0 border-8 border-gray-300 border-t-lime-700 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear',
              }}
            />

            {/* Center Logo */}
            <div className="absolute inset-4 rounded-full overflow-hidden">
              <Image
                src="https://alienshub.co.in/corinth-demo/assets/img/hub-logo.png"
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Mobile Warning Text */}
          {/* {isMobile && (
            <motion.p
                className="text-sm text-white text-[2rem] font-nostalgic whitespace-nowrap"
                initial="hidden"
                animate="visible"
                variants={{
                visible: {
                    transition: {
                    staggerChildren: 0.04,
                    },
                },
                }}
            >
                {"Best viewed on desktop".split("").map((char, index) => (
                <motion.span
                    key={index}
                    className="inline-block"
                    variants={{
                    hidden: { opacity: 0, y: 5 },
                    visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4 }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
                ))}
            </motion.p>
            )} */}

        </motion.div>
      )}
    </AnimatePresence>
  )
}
