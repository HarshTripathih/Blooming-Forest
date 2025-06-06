'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { X } from 'lucide-react'
import SalesforceForm from './form';

const data = [
    {
        title: '18-hole hilltop Golf Course',
        description:
          "Aliens Hub offers a world-class 18-hole championship golf course spread across 69 scenic acres, where natural ponds, rugged boulders, and wild terrain turn every game into an immersive experience",
        image: '/class_aminities/Golf_course.jpg',
      },
      {
        title: 'Grand hilltop Clubhouse',
        description:
          'Rising majestically across 10 acres, the 3-floor grand clubhouse which can host over 800 guests redefines luxury with a mini cinema, gym, indoor and outdoor pools, conference spaces, stay cottages, and many more',
        image: '/class_aminities/Grand_Hilltop_Clubhouse.png',
      },
      {
        title: 'Atlantis Lakeside Amenities',
        description:
          'Every lake in the project is wrapped in thoughtfully designed sit out zones, each with its own unique theme, offering peaceful corners for reflection and relaxation ',
        image: '/class_aminities/Atlantis_Lakeside_Amenities.jpg',
      },
      {
        title: 'Daios Amphitheatre',
        description:
          'Nestled beside a serene lake and surrounded by elevated ground, the open-air Diaos Amphitheatre elicits the feeling of being in the stadium or an opera house',
        image: '/class_aminities/Daios_Amphitheatre.jpg',
      },
      {
        title: 'Enigma cave living',
        description:
          'Embrace the rare natural cave dwellings, transformed into private hideaways that offer solitude, serenity, and a connection to the earth ',
        image: '/class_aminities/Enigma_Cave_Living.jpg',
      },
      {
        title: 'Ourea nature park',
        description:
          'Ourea is a vibrant outdoor park designed for families to enjoy together, offering tree climbs, giant slides, bike tracks, zip lines and a variety of exciting activities that create fun and memorable experiences',
        image: '/class_aminities/Ourea_Nature_Park.jpeg',
      },
      {
        title: 'Astra night trails',
        description:
          'Wander through starlit hills, valleys and open fields with curated night trails that cater to different time commitments and fitness targets, making nature your nighttime companion',
        image: '/class_aminities/Astra_night_trails.jpg',
      },
      {
        title: 'Artemis night camping',
        description:
          'Set on a stunning highland, Artemis offers the perfect backdrop for stargazing and camping under the open sky, where every night feels like an escape',
        image: '/class_aminities/Artemis_Night_Camping.jpeg',
      }
];

export default function AmenitiesSection() {

  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const cardWidth = 300 + 24; // width + gap

  // 🔁 Scroll listener to detect activeIndex
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollLeft = scrollRef.current.scrollLeft;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup just in case
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);


  // 🔘 Click on dot => scroll to that card
  const handleDotClick = (index) => {
    if (scrollRef.current) {
      const maxScrollLeft =
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
  
      const targetScroll = index * cardWidth;
      scrollRef.current.scrollTo({
        left: Math.min(targetScroll, maxScrollLeft),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-[#031c00] text-white px-4 md:px-20 py-12 space-y-12 font-belkinlight">
      {/* Heading */}
      <div className="text-center space-y-2">
        <p className="text-sm">06/05</p>
        <p className="text-xl md:text-4xl font-nostalgic">Our best in</p>
        <h2 className="text-3xl md:text-7xl font-nostalgic text-[#edd9ba]">Class Amenities</h2>
      </div>

      {/* Main selected content */}
      <div
        className="relative rounded-xl text-black p-6 md:p-10 space-y-4 h-[200px] md:h-[400px] md:h-[500px] overflow-hidden flex flex-col justify-end bg-cover bg-center"
        style={{
          backgroundImage: `url(${data[activeIndex].image})`,
        }}
      >
        <div className="bg-[#e2e2e2]/20 backdrop-blur-sm p-4 md:p-6 rounded-xl max-w-2xl">
          <h3 className="text-base md:text-xl md:text-3xl font-belkinlight decoration-[1px] underline-offset-2 font-semibold underline">
            {data[activeIndex].title}
          </h3>
          <p className="text-xs md:text-2xl leading-relaxed font-belkinlight">{data[activeIndex].description}</p>
          <a href="#" className="underline decoration-[1px] underline-offset-2 text-base md:text-2xl block mt-2">
            See in detail.
          </a>
        </div>
      </div>

      {/* Scrollable Cards */}
      <div
        className="flex overflow-x-auto gap-6 pb-4 pr-6 scrollbar-hide"
        ref={scrollRef}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className={clsx(
              'w-[200px] md:min-w-[300px] md:w-[300px] h-[300px] md:h-[500px] rounded-xl cursor-pointer flex-shrink-0 transition-all border-4 overflow-hidden relative flex flex-col',
              activeIndex === index
                ? 'border-[#edd9ba]'
                : 'border-transparent hover:border-[#edd9ba]/50'
            )}
            onClick={() => setActiveIndex(index)}
          >
            {/* Image */}
            <div className="relative h-1/2 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="h-1/2 bg-[#e2e2e2] p-4 space-y-2 flex flex-col justify-between">
              <div>
                <h3 className="text-sm md:text-2xl font-semibold underline decoration-[1px] underline-offset-2 text-black">
                  {item.title}
                </h3>
                <p className="text-xs md:text-xl text-black line-clamp-4">
                  {item.description}
                </p>
              </div>
              <a href="#" className="underline decoration-[1px] underline-offset-2 text-sm md:text-xl text-black block">
                See in detail.
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3">
        {data.map((_, i) => (
          <button
            key={i}
            className={clsx(
              'h-3 w-3 rounded-full transition-all',
              i === activeIndex ? 'bg-[#edd9ba]' : 'bg-gray-500'
            )}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/20 pt-8">
        <h4 className="text-lg md:text-2xl text-[#edd9ba]">Come Visit Us Now</h4>
        <button 
          className="text-base md:text-xl font-belkinlight bg-gradient-to-b from-[#f6e6c7] to-[#edd9ba] text-black px-3 py-2 md:px-6 md:py-2 rounded-full shadow-md hover:scale-105 transition"
          onClick={openModal}
          >
          BOOK A SITE VISIT
        </button>
        {/* Overlay + Modal */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30 flex items-center justify-center"
            onClick={closeModal}
          >
            <div
              className="bg-[#031c00] w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg p-6 relative z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close icon */}
              <button
                className="absolute top-3 right-3 text-[#D5C9B3] hover:text-red-500"
                onClick={closeModal}
              >
                <X size={24} />
              </button>

              {/* Your Form */}
              <SalesforceForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import Image from 'next/image';
// import clsx from 'clsx';
// import { X } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import SalesforceForm from './form';

// const data = [
//     {
//         title: '18-hole hilltop Golf Course',
//         description:
//           "Aliens Hub offers a world-class 18-hole championship golf course spread across 69 scenic acres, where natural ponds, rugged boulders, and wild terrain turn every game into an immersive experience",
//         image: '/class_aminities/Golf_course.jpg',
//       },
//       {
//         title: 'Grand hilltop Clubhouse',
//         description:
//           'Rising majestically across 10 acres, the 3-floor grand clubhouse which can host over 800 guests redefines luxury with a mini cinema, gym, indoor and outdoor pools, conference spaces, stay cottages, and many more',
//         image: '/class_aminities/Grand_Hilltop_Clubhouse.png',
//       },
//       {
//         title: 'Atlantis Lakeside Amenities',
//         description:
//           'Every lake in the project is wrapped in thoughtfully designed sit out zones, each with its own unique theme, offering peaceful corners for reflection and relaxation ',
//         image: '/class_aminities/Atlantis_Lakeside_Amenities.jpg',
//       },
//       {
//         title: 'Daios Amphitheatre',
//         description:
//           'Nestled beside a serene lake and surrounded by elevated ground, the open-air Diaos Amphitheatre elicits the feeling of being in the stadium or an opera house',
//         image: '/class_aminities/Daios_Amphitheatre.jpg',
//       },
//       {
//         title: 'Enigma cave living',
//         description:
//           'Embrace the rare natural cave dwellings, transformed into private hideaways that offer solitude, serenity, and a connection to the earth ',
//         image: '/class_aminities/Enigma_Cave_Living.jpg',
//       },
//       {
//         title: 'Ourea nature park',
//         description:
//           'Ourea is a vibrant outdoor park designed for families to enjoy together, offering tree climbs, giant slides, bike tracks, zip lines and a variety of exciting activities that create fun and memorable experiences',
//         image: '/class_aminities/Ourea_Nature_Park.jpeg',
//       },
//       {
//         title: 'Astra night trails',
//         description:
//           'Wander through starlit hills, valleys and open fields with curated night trails that cater to different time commitments and fitness targets, making nature your nighttime companion',
//         image: '/class_aminities/Astra_night_trails.jpg',
//       },
//       {
//         title: 'Artemis night camping',
//         description:
//           'Set on a stunning highland, Artemis offers the perfect backdrop for stargazing and camping under the open sky, where every night feels like an escape',
//         image: '/class_aminities/Artemis_Night_Camping.jpeg',
//       }
// ];

// export default function AmenitiesSection() {
//   const [isOpen, setIsOpen] = useState(false);
//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const scrollRef = useRef(null);
//   const cardWidth = 300 + 24;

//   const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!scrollRef.current) return;
//       const scrollLeft = scrollRef.current.scrollLeft;
//       const index = Math.round(scrollLeft / cardWidth);
//       setActiveIndex(index);
//     };

//     const container = scrollRef.current;
//     container?.addEventListener('scroll', handleScroll);
//     return () => container?.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? 'hidden' : 'auto';
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [isOpen]);

//   const handleDotClick = (index) => {
//     if (scrollRef.current) {
//       const maxScrollLeft =
//         scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
//       const targetScroll = index * cardWidth;
//       scrollRef.current.scrollTo({
//         left: Math.min(targetScroll, maxScrollLeft),
//         behavior: 'smooth',
//       });
//     }
//   };

//   return (
//     <div
//       ref={ref}
//       className="bg-[#031c00] text-white px-4 md:px-20 py-12 space-y-12 font-belkinlight"
//     >
//       {/* Heading */}
//       <motion.div
//         initial={{ x: 200, opacity: 1 }}
//         animate={inView ? { x: 0, opacity: 1 } : {}}
//         transition={{ duration: 1, ease: 'easeOut' }}
//         className="text-center space-y-2"
//       >
//         <p className="text-sm">06/05</p>
//         <p className="text-xl md:text-4xl font-nostalgic">Our best in</p>
//         <h2 className="text-3xl md:text-7xl font-nostalgic text-[#edd9ba]">
//           Class Amenities
//         </h2>
//       </motion.div>

//       {/* Main Image Background Section */}
//       <motion.div
//         initial={{ x: 200, opacity: 1 }}
//         animate={inView ? { x: 0, opacity: 1 } : {}}
//         transition={{ duration: 1.2, ease: 'easeOut' }}
//         className="relative rounded-xl text-black p-6 md:p-10 space-y-4 h-[200px] md:h-[500px] overflow-hidden flex flex-col justify-end bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${data[activeIndex].image})`,
//         }}
//       >
//         <div className="bg-[#e2e2e2]/20 backdrop-blur-sm p-4 md:p-6 rounded-xl max-w-2xl">
//           <h3 className="text-base md:text-3xl font-semibold underline decoration-[1px] underline-offset-2">
//             {data[activeIndex].title}
//           </h3>
//           <p className="text-xs md:text-2xl leading-relaxed">{data[activeIndex].description}</p>
//           <a href="#" className="underline decoration-[1px] underline-offset-2 text-base md:text-2xl block mt-2">
//             See in detail.
//           </a>
//         </div>
//       </motion.div>

//       {/* Cards Scrollable */}
//       <motion.div
//         initial={{ x: -200, opacity: 1 }}
//         animate={inView ? { x: 0, opacity: 1 } : {}}
//         transition={{ duration: 1.3, ease: 'easeOut' }}
//         className="flex overflow-x-auto gap-6 pb-4 pr-6 scrollbar-hide"
//         ref={scrollRef}
//       >
//         {data.map((item, index) => (
//           <div
//             key={index}
//             className={clsx(
//               'w-[200px] md:min-w-[300px] md:w-[300px] h-[300px] md:h-[500px] rounded-xl cursor-pointer flex-shrink-0 transition-all border-4 overflow-hidden relative flex flex-col',
//               activeIndex === index
//                 ? 'border-[#edd9ba]'
//                 : 'border-transparent hover:border-[#edd9ba]/50'
//             )}
//             onClick={() => setActiveIndex(index)}
//           >
//             <div className="relative h-1/2 w-full">
//               <Image
//                 src={item.image}
//                 alt={item.title}
//                 fill
//                 className="object-cover"
//               />
//             </div>

//             <div className="h-1/2 bg-[#e2e2e2] p-4 space-y-2 flex flex-col justify-between">
//               <div>
//                 <h3 className="text-sm md:text-2xl font-semibold underline decoration-[1px] underline-offset-2 text-black">
//                   {item.title}
//                 </h3>
//                 <p className="text-xs md:text-xl text-black line-clamp-4">
//                   {item.description}
//                 </p>
//               </div>
//               <a href="#" className="underline decoration-[1px] underline-offset-2 text-sm md:text-xl text-black block">
//                 See in detail.
//               </a>
//             </div>
//           </div>
//         ))}
//       </motion.div>

//       {/* Pagination Dots */}
//       <motion.div
//         initial={{ y: 30, opacity: 1 }}
//         animate={inView ? { y: 0, opacity: 1 } : {}}
//         transition={{ delay: 0.6 }}
//         className="flex justify-center gap-3"
//       >
//         {data.map((_, i) => (
//           <button
//             key={i}
//             className={clsx(
//               'h-3 w-3 rounded-full transition-all',
//               i === activeIndex ? 'bg-[#edd9ba]' : 'bg-gray-500'
//             )}
//             onClick={() => handleDotClick(i)}
//           />
//         ))}
//       </motion.div>

//       {/* Footer */}
//       <motion.div
//         initial={{ opacity: 1, y: 40 }}
//         animate={inView ? { opacity: 1, y: 0 } : {opacity: 1, y: 40}}
//         transition={{ duration: 1, ease: 'easeOut' }}
//         className="flex items-center justify-between border-t border-white/20 pt-8"
//       >
//         <h4 className="text-lg md:text-2xl text-[#edd9ba]">Come Visit Us Now</h4>
//         <button
//           className="text-base md:text-xl font-belkinlight bg-gradient-to-b from-[#f6e6c7] to-[#edd9ba] text-black px-3 py-2 md:px-6 md:py-2 rounded-full shadow-md hover:scale-105 transition"
//           onClick={openModal}
//         >
//           BOOK A SITE VISIT
//         </button>
//       </motion.div>

//       {/* Modal */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black/30 flex items-center justify-center"
//           onClick={closeModal}
//         >
//           <div
//             className="bg-[#031c00] w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg p-6 relative z-50"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="absolute top-3 right-3 text-[#D5C9B3] hover:text-red-500"
//               onClick={closeModal}
//             >
//               <X size={24} />
//             </button>
//             <SalesforceForm />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
