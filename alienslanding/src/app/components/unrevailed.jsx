//demo 1

// 'use client'

// import Image from 'next/image'
// import { useState, useRef, useEffect } from 'react'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

// const images = [
//   '/images/image1.jpeg',
//   '/images/image2.jpeg',
//   '/images/image3.jpeg',
//   '/images/image4.jpeg',
// ]

// export default function UnrivalledViews() {
//   const [current, setCurrent] = useState(0)
//   const thumbRef = useRef(null)
//   const trackRef = useRef(null)

//   const handlePrev = () => {
//     setCurrent((prev) => (prev - 1 + images.length) % images.length)
//   }

//   const handleNext = () => {
//     setCurrent((prev) => (prev + 1) % images.length)
//   }

//   // Handle drag
//   useEffect(() => {
//     const thumb = thumbRef.current
//     const track = trackRef.current
//     if (!thumb || !track) return

//     let isDragging = false

//     const onMouseDown = (e) => {
//       isDragging = true
//       document.body.style.userSelect = 'none'
//     }

//     const onMouseMove = (e) => {
//       if (!isDragging) return
//       const rect = track.getBoundingClientRect()
//       const percent = (e.clientX - rect.left) / rect.width
//       const index = Math.max(0, Math.min(images.length - 1, Math.round(percent * (images.length - 1))))
//       setCurrent(index)
//     }

//     const onMouseUp = () => {
//       isDragging = false
//       document.body.style.userSelect = ''
//     }

//     thumb.addEventListener('mousedown', onMouseDown)
//     window.addEventListener('mousemove', onMouseMove)
//     window.addEventListener('mouseup', onMouseUp)

//     return () => {
//       thumb.removeEventListener('mousedown', onMouseDown)
//       window.removeEventListener('mousemove', onMouseMove)
//       window.removeEventListener('mouseup', onMouseUp)
//     }
//   }, [])

//   return (
//     <section
//       className="relative w-full min-h-screen px-6 md:px-24 py-20 bg-white overflow-hidden"
//       style={{
//         backgroundImage: "url('/images/lineunrevailed.svg')",
//         backgroundRepeat: 'repeat-y',
//         backgroundPosition: 'left',
//         backgroundSize: 'auto 100%',
//       }}
//     >
//       {/* Header */}
//       <div className="mb-12">
//         <p className="text-sm text-black/50">01/08</p>
//         <h2 className="text-4xl md:text-5xl font-light leading-tight mt-2">
//           What‘s special about <br />
//           <span className="font-medium">Blooming Forest ?</span>
//         </h2>
//       </div>

//       {/* Text + Images */}
//       <div className="flex flex-col lg:flex-row gap-10 items-start justify-between">
//         {/* Text block */}
//        <p className="mt-4 underline text-lg font-medium">Unrivalled Views</p>

//         {/* Text block */}
//         <div className="lg:w-1/2 text-black text-base leading-relaxed">
//           The blooming forest beckons with its captivating allure, promising an
//           idyllic haven where nature’s grandeur and luxury living converge
//           seamlessly amidst the natural oasis, one can truly “get high on
//           Oxygen”.
//         </div>
//       </div>
//       {/* Images */}
//       <div className="mt-[5rem] lg:w-full flex gap-6">
//           <div className="rounded-2xl overflow-hidden w-[70%] h-[220px] relative bg-gray-300">
//             <Image
//               src={images[current]}
//               alt="Main"
//               fill
//               className="object-cover transition-all duration-500"
//             />
//           </div>
//           <div className="rounded-2xl overflow-hidden w-[30%] h-[220px] relative bg-gray-200 opacity-70">
//             <Image
//               src={images[(current + 1) % images.length]}
//               alt="Next"
//               fill
//               className="object-cover"
//             />
//           </div>
//      </div>

//       {/* Slider & Arrows */}
//       <div className="flex items-center justify-center mt-16 gap-8">
//         <button onClick={handlePrev}>
//           <ChevronLeft className="w-6 h-6 text-black hover:scale-125 transition" />
//         </button>

//         <div
//           ref={trackRef}
//           className="w-full h-1 bg-black relative rounded-full cursor-pointer"
//         >
//           <div
//             ref={thumbRef}
//             className="absolute top-1/2 h-6 w-10 bg-[#edd9ba] rounded-full -translate-y-1/2 transition-all duration-300"
//             style={{
//               left: `${(current / (images.length - 1)) * 100}%`,
//               transform: 'translate(-50%, -50%)',
//             }}
//           ></div>
//         </div>

//         <button onClick={handleNext}>
//           <ChevronRight className="w-6 h-6 text-black hover:scale-125 transition" />
//         </button>
//       </div>
//     </section>
//   )
// }








//demo 2




// 'use client'

// import Image from 'next/image'
// import { useState, useRef, useEffect } from 'react'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

// const images = [
//   '/images/image1.jpeg',
//   '/images/image2.jpeg',
//   '/images/image3.jpeg',
//   '/images/image4.jpeg',
// ]

// export default function UnrivalledViews() {
//   const [current, setCurrent] = useState(0)
//   const thumbRef = useRef(null)
//   const trackRef = useRef(null)

//   const handlePrev = () => {
//     setCurrent((prev) => (prev - 1 + images.length) % images.length)
//   }

//   const handleNext = () => {
//     setCurrent((prev) => (prev + 1) % images.length)
//   }

//   // Handle drag
//   useEffect(() => {
//     const thumb = thumbRef.current
//     const track = trackRef.current
//     if (!thumb || !track) return

//     let isDragging = false

//     const onMouseDown = (e) => {
//       isDragging = true
//       document.body.style.userSelect = 'none'
//     }

//     const onMouseMove = (e) => {
//       if (!isDragging) return
//       const rect = track.getBoundingClientRect()
//       const percent = (e.clientX - rect.left) / rect.width
//       const index = Math.max(0, Math.min(images.length - 1, Math.round(percent * (images.length - 1))))
//       setCurrent(index)
//     }

//     const onMouseUp = () => {
//       isDragging = false
//       document.body.style.userSelect = ''
//     }

//     thumb.addEventListener('mousedown', onMouseDown)
//     window.addEventListener('mousemove', onMouseMove)
//     window.addEventListener('mouseup', onMouseUp)

//     return () => {
//       thumb.removeEventListener('mousedown', onMouseDown)
//       window.removeEventListener('mousemove', onMouseMove)
//       window.removeEventListener('mouseup', onMouseUp)
//     }
//   }, [])

//   return (
//     <section
//       className="relative w-full min-h-screen px-6 md:px-24 py-20 bg-white overflow-hidden"
//       style={{
//         backgroundImage: "url('/lines/lineunrevailed.svg')",
//         backgroundRepeat: 'repeat-y',
//         backgroundPosition: 'left',
//         backgroundSize: 'auto 100%',
//       }}
//     >

      
//       {/* Header */}
//       <div className="mb-12">
//         <p className="text-sm text-black/50">01/08</p>
//         <h2 className="text-4xl md:text-5xl font-light leading-tight mt-2">
//           What‘s special about <br />
//           <span className="font-medium">Blooming Forest ?</span>
//         </h2>
//       </div>

//       {/* Text + Images */}
//       <div className="flex flex-col lg:flex-row gap-10 items-start justify-between">
//         {/* Text block */}
//        <p className="mt-4 underline text-lg font-medium">Unrivalled Views</p>

//         {/* Text block */}
//         <div className="lg:w-1/2 text-black text-base leading-relaxed">
//           The blooming forest beckons with its captivating allure, promising an
//           idyllic haven where nature’s grandeur and luxury living converge
//           seamlessly amidst the natural oasis, one can truly “get high on
//           Oxygen”.
//         </div>
//       </div>
//       {/* Images */}
//         <div className="mt-[5rem] w-full overflow-hidden relative h-[220px]">
//         <div
//             className="flex transition-transform duration-500 gap-6"
//             style={{
//             transform: `translateX(-${(current * (100 / 2))}%)`,
//             width: `${(images.length * 100) / 2}%`,
//             }}
//         >
//             {images.map((src, index) => (
//             <div
//                 key={index}
//                 className="w-[70%] lg:w-[70%] h-[220px] rounded-2xl overflow-hidden bg-gray-300 relative flex-shrink-0"
//             >
//                 <Image
//                 src={src}
//                 alt={`Image ${index + 1}`}
//                 fill
//                 className="object-cover"
//                 />
//             </div>
//             ))}
//         </div>
//         </div>


//       {/* Slider & Arrows */}
//       <div className="flex items-center justify-center mt-16 gap-8">
//         <button onClick={handlePrev}>
//           <ChevronLeft className="w-6 h-6 text-black hover:scale-125 transition" />
//         </button>

//         <div
//           ref={trackRef}
//           className="w-full h-1 bg-black relative rounded-full cursor-pointer"
//         >
//           <div
//             ref={thumbRef}
//             className="absolute top-1/2 h-6 w-10 bg-[#edd9ba] rounded-full -translate-y-1/2 transition-all duration-300"
//             style={{
//               left: `${(current / (images.length - 1)) * 100}%`,
//               transform: 'translate(-50%, -50%)',
//             }}
//           ></div>
//         </div>

//         <button onClick={handleNext}>
//           <ChevronRight className="w-6 h-6 text-black hover:scale-125 transition" />
//         </button>
//       </div>
//     </section>
//   )
// }











'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
  '/Special_About_Blooming_forest/Unrivalled_views.jpg',
  '/Special_About_Blooming_forest/Pure_oxygen_oasis.jpg',
  '/Special_About_Blooming_forest/Seasonal_serenity.jpeg',
  '/Special_About_Blooming_forest/well_planned_infrastructure.jpg',
  '/Special_About_Blooming_forest/versatile_plot_sizes.jpg',
  '/Special_About_Blooming_forest/Low_density_living.jpg',
  '/Special_About_Blooming_forest/idyllic_recreational_aminities.jpg',
]


const lines = [
  '/lines/lineunrevailed.svg',
  '/lines/lineunrevailed.svg',
  '/lines/lineunrevailed.svg',
  '/lines/lineunrevailed.svg',
]

const content = [
  {
    title: 'Unrivalled Views',
    description: 'Immerse yourself in the splendor of nature with unobstructed views of the sprawling 4000 acres of reserve forest, providing a picturesque backdrop to everyday living.'
  },
  {
    title: 'Pure Oxygen Oasis',
    description: 'Rejuvenate your senses and invigorate your soul as you "Get High on Oxygen" amidst the lush greenery and pristine air of The Blooming Forest, offering a sanctuary away from the hustle and bustle of city life.'
  },
  {
    title: 'Seasonal Serenity',
    description: 'Embrace tranquillity year-round with thoughtfully designed parks catering to every season, allowing residents to unwind and connect with nature amidst the changing landscape.'
  },
  {
    title: 'Well Planned Infrastructure',
    description: 'Navigate through the community seamlessly with wide 60 feet and 40 feet roads, ensuring smooth traffic flow and easy accessibility to all corners of The Blooming Forest.'
  },
  {
    title: 'Versatile Plot Sizes',
    description: 'Choose from a range of plot sizes, spanning from 200 sqyd. to 1000+ sqyd., allowing residents the flexibility to design their dream homes according to their unique preferences and requirements.'
  },
  {
    title: 'Low Density Living',
    description: 'Experience the luxury of space within a low-density project spread over 28 acres, with approximately 13 acres of open spaces conscientiously integrated into the landscape, fostering a sense of openness and freedom.'
  },
  {
    title: 'Idyllic Recreational Amenities',
    description: 'Enjoy an array of recreational facilities within The Blooming Forest, including jogging tracks, cycling paths, and serene meditation areas, enhancing the overall well-being of residents.'
  },
]


export default function UnrivalledViews() {
  const [current, setCurrent] = useState(0)
  const thumbRef = useRef(null)
  const trackRef = useRef(null)

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length)
  }

  // Handle drag
  useEffect(() => {
    const thumb = thumbRef.current
    const track = trackRef.current
    if (!thumb || !track) return

    let isDragging = false

    const onMouseDown = () => {
      isDragging = true
      document.body.style.userSelect = 'none'
    }

    const onMouseMove = (e) => {
      if (!isDragging) return
      const rect = track.getBoundingClientRect()
      const percent = (e.clientX - rect.left) / rect.width
      const index = Math.max(0, Math.min(images.length - 1, Math.round(percent * (images.length - 1))))
      setCurrent(index)
    }

    const onMouseUp = () => {
      isDragging = false
      document.body.style.userSelect = ''
    }

    thumb.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      thumb.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return (
    <section className="relative w-full min-h-screen px-6 md:px-24 py-20 bg-white overflow-hidden">
      
      {/* Vector line image repeated 4 times vertically on the left */}
      <div className="absolute left-6 md:left-24 top-0 h-full z-0 flex flex-row justify-between gap-[8rem]">
        {lines.map((line, i) => (
          <div key={i} className="h-[100vh] left-[1rem] relative bg-black/20 w-px">
            <Image
              src={ line }
              alt="Vertical line"
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 mb-12">
        <p className="text-sm text-black/50">01/08</p>
        <h2 className="text-2xl md:text-5xl font-belkinlight text-black/40 mt-2">
          What‘s special about <br />
          <span className="font-nostalgic text-black font-medium tracking-[0.15em]">
            Blooming Forest ?
          </span>
        </h2>
      </div>

      {/* Text + Images */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-start justify-between">
        {/* Label */}
        <p className="mt-4 lg:w-1/3 underline decoration-[1px] underline-offset-2 font-belkinlight text-2xl md:text-3xl">
        {content[current]?.title}
      </p>

      <div className="lg:w-2/3 flex justify-end">
        <div className='lg:w-2/3 text-lg md:text-xl text-black font-belkinlight leading-relaxed'>
          {content[current]?.description}
        </div>
      </div>

      </div>

      {/* Image carousel */}
      <div className="relative z-10 mt-[5rem] w-full overflow-hidden h-[400px]">
        <div
          className="flex transition-transform duration-500 gap-6"
          style={{
            transform: `translateX(-${(current * (100 / 2))}%)`,
            width: `${(images.length * 100) / 2}%`,
          }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="w-[100%] md:w-[70%] lg:w-[10%] h-[200px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-300 relative flex-shrink-0"
            >
              <Image
                src={src}
                alt={`Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Slider & Arrows */}
     <div className="relative z-10 flex items-center justify-center -mt-[6rem] md:mt-[4rem] gap-8">
        {/* Left arrow */}
        <button onClick={handlePrev}>
          <ChevronLeft className="w-12 h-12 text-black hover:scale-125 transition"
            strokeWidth={1}
          />
        </button>

        {/* Track bar */}
        <div
          ref={trackRef}
          className="w-full h-[2px] bg-black relative rounded-full cursor-pointer"
        >
          {/* Thumb */}
          <div
            ref={thumbRef}
            className="absolute top-1/2 h-4 w-8 bg-[#edd9ba] rounded-full -translate-y-1/2 transition-all duration-300 shadow-md"
            style={{
              left: `${(current / (images.length - 1)) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          ></div>
        </div>

        {/* Right arrow */}
        <button onClick={handleNext}>
          <ChevronRight className="w-12 h-12 text-black hover:scale-125 transition" 
            strokeWidth={1}
          />
        </button>
    </div>

    </section>
  )
}
