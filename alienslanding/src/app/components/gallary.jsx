// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";

// const mediaItems = [
//   { type: "image", src: "/images/image1.jpeg" },
//   { type: "video", src: "/videos/video1.mp4" },
//   { type: "image", src: "/images/image2.jpeg" },
//   { type: "video", src: "/videos/video2.mp4" },
//   { type: "image", src: "/images/image3.jpeg" },
//   { type: "video", src: "/videos/video3.mp4" },
//   { type: "image", src: "/images/image4.jpeg" },
//   { type: "video", src: "/videos/video4.mp4" },
//   { type: "video", src: "/videos/video5.mp4" },
//   { type: "video", src: "/videos/video6.mp4" },
//   { type: "image", src: "/images/image1.jpeg" },
//   { type: "video", src: "/videos/video1.mp4" },
//   { type: "image", src: "/images/image2.jpeg" },
//   { type: "video", src: "/videos/video2.mp4" },
//   { type: "image", src: "/images/image3.jpeg" },
//   { type: "video", src: "/videos/video3.mp4" },
//   { type: "image", src: "/images/image4.jpeg" },
//   { type: "video", src: "/videos/video4.mp4" },
//   { type: "video", src: "/videos/video5.mp4" },
//   { type: "video", src: "/videos/video6.mp4" },
//   // Add more items here...
// ];

// // Group items into columns (e.g., 3 items per column)
// const groupIntoColumns = (items, itemsPerCol) => {
//   const columns = [];
//   for (let i = 0; i < items.length; i += itemsPerCol) {
//     columns.push(items.slice(i, i + itemsPerCol));
//   }
//   return columns;
// };

// const GallerySection = () => {
//   const galleryRef = useRef(null);
//   const [playVideos, setPlayVideos] = useState(false);

//   const media = [...mediaItems, ...mediaItems]; // Extend for scroll
//   const columns = groupIntoColumns(media, 3); // 3 items per column

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) setPlayVideos(true);
//       },
//       { threshold: 0.2 }
//     );

//     if (galleryRef.current) observer.observe(galleryRef.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//       ref={galleryRef}
//       className="w-full overflow-x-auto py-8"
//       style={{ WebkitOverflowScrolling: "touch" }}
//     >
//       <div className="flex gap-6 px-6 min-w-max">
//         {columns.map((column, colIdx) => (
//           <div key={colIdx} className="flex flex-col gap-4 w-[320px] ">
            
//             {column.map((item, idx) => (
//               <div
//                 key={`${colIdx}-${idx}`}
//                 className="relative rounded-xl overflow-hidden shadow-md "
//               >
//                 <div className="relative w-full">
//                   {item.type === "video" ? (
//                     <video
//                       src={item.src}
//                       autoPlay={playVideos}
//                       loop
//                       muted
//                       playsInline
//                       className="w-full h-auto object-cover rounded-xl"
//                     />
//                   ) : (
//                     <Image
//                       src={item.src}
//                       alt={`media-${idx}`}
//                       width={220}
//                       height={300}
//                       className="w-full h-auto object-cover rounded-xl"
//                     />
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GallerySection;





// import React, { useEffect, useMemo, useRef, useState } from "react";
// import Image from "next/image";

// // Media items list
// const mediaItems = [
//   { type: "image", src: "/images/image1.jpeg" },
//   { type: "video", src: "/videos/video1.mp4" },
//   { type: "image", src: "/images/image2.jpeg" },
//   { type: "video", src: "/videos/video2.mp4" },
//   { type: "image", src: "/images/image3.jpeg" },
//   { type: "video", src: "/videos/video3.mp4" },
//   { type: "image", src: "/images/image4.jpeg" },
//   { type: "video", src: "/videos/video4.mp4" },
//   { type: "video", src: "/videos/video5.mp4" },
//   { type: "video", src: "/videos/video6.mp4" },
//   { type: "image", src: "/images/image1.jpeg" },
//   { type: "video", src: "/videos/video1.mp4" },
//   { type: "image", src: "/images/image2.jpeg" },
//   { type: "video", src: "/videos/video2.mp4" },
//   { type: "image", src: "/images/image3.jpeg" },
//   { type: "video", src: "/videos/video3.mp4" },
//   { type: "image", src: "/images/image4.jpeg" },
//   { type: "video", src: "/videos/video4.mp4" },
//   { type: "video", src: "/videos/video5.mp4" },
//   { type: "video", src: "/videos/video6.mp4" },
// ];

// // Utility to group items into columns
// const groupIntoColumns = (items, itemsPerCol) => {
//   const columns = [];
//   for (let i = 0; i < items.length; i += itemsPerCol) {
//     columns.push(items.slice(i, i + itemsPerCol));
//   }
//   return columns;
// };

// const GallerySection = () => {
//   const galleryRef = useRef(null);
//   const [playVideos, setPlayVideos] = useState(false);

//   // Extend the media list for scrolling effect
//   const media = useMemo(() => [...mediaItems, ...mediaItems], []);

//   // Randomize size once and store with each item
//   const randomizedMedia = useMemo(() => {
//     return media.map((item) => {
//       const isVideo = item.type === "video";
//       const width = 320 + Math.floor(Math.random() * 80); // 220–300px
//       const height = isVideo
//         ? 540 + Math.floor(Math.random() * 120) // 240–360px
//         : 280 + Math.floor(Math.random() * 120); // 180–300px
//       return { ...item, width, height };
//     });
//   }, [media]);

//   // Group the media with sizes into columns
//   const columns = useMemo(() => groupIntoColumns(randomizedMedia, 3), [randomizedMedia]);

//   // Play videos when in viewport
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) setPlayVideos(true);
//       },
//       { threshold: 0.2 }
//     );

//     if (galleryRef.current) observer.observe(galleryRef.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//       ref={galleryRef}
//       className="w-full overflow-x-auto py-8"
//       style={{ WebkitOverflowScrolling: "touch" }}
//     >
//       <div className="flex gap-6 px-6 min-w-max">
//         {columns.map((column, colIdx) => (
//           <div key={colIdx} className="flex flex-col gap-4 w-[420px]">
//             {column.map((item, idx) => {
//               const { type, src, width, height } = item;
//               const isVideo = type === "video";

//               return (
//                 <div
//                   key={`${colIdx}-${idx}`}
//                   className="relative rounded-xl overflow-hidden shadow-md"
//                   style={{ width, height }}
//                 >
//                   <div className="relative w-full h-full">
//                     {isVideo ? (
//                       <video
//                         src={src}
//                         autoPlay={playVideos}
//                         loop
//                         muted
//                         playsInline
//                         className="w-full h-full object-cover rounded-xl"
//                       />
//                     ) : (
//                       <Image
//                         src={src}
//                         alt={`media-${idx}`}
//                         width={width}
//                         height={height}
//                         className="w-full h-full object-cover rounded-xl"
//                       />
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GallerySection;







// import React, { useEffect, useMemo, useRef, useState } from "react";
// import Image from "next/image";

// const mediaItems = [
//   { type: "image", src: "/images/image1.jpeg" },
//   { type: "video", src: "/videos/video1.mp4" },
//   { type: "image", src: "/images/image2.jpeg" },
//   { type: "video", src: "/videos/video2.mp4" },
//   { type: "image", src: "/images/image3.jpeg" },
//   { type: "video", src: "/videos/video3.mp4" },
//   { type: "image", src: "/images/image4.jpeg" },
//   { type: "video", src: "/videos/video4.mp4" },
//   { type: "video", src: "/videos/video5.mp4" },
//   { type: "video", src: "/videos/video6.mp4" },
// ];

// const GallerySection = () => {
//   const galleryRef = useRef(null);
//   const [playVideos, setPlayVideos] = useState(false);

//   const media = useMemo(() => [...mediaItems, ...mediaItems], []);

//   const randomizedMedia = useMemo(() => {
//     return media.map((item) => {
//       const isVideo = item.type === "video";
//       const width = 320 + Math.floor(Math.random() * 80); // 220–300px
//       const height = isVideo
//         ? 420 + Math.floor(Math.random() * 200)
//         : 200 + Math.floor(Math.random() * 200);
//       const marginTop = Math.floor(Math.random() * 100); // add vertical randomness
//       return { ...item, width, height, marginTop };
//     });
//   }, [media]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) setPlayVideos(true);
//       },
//       { threshold: 0.2 }
//     );

//     if (galleryRef.current) observer.observe(galleryRef.current);
//     return () => observer.disconnect();
//   }, []);

//   const columns = useMemo(() => {
//     const cols = 6;
//     return Array.from({ length: cols }, (_, i) =>
//       randomizedMedia.filter((_, idx) => idx % cols === i)
//     );
//   }, [randomizedMedia]);

//   return (
//     <div
//       ref={galleryRef}
//       className="w-full overflow-x-auto py-16 bg-black"
//       style={{ WebkitOverflowScrolling: "touch" }}
//     >
//       <div className="flex gap-20 px-20 min-w-max">
//         {columns.map((column, colIdx) => (
//           <div key={colIdx} className="flex flex-col gap-6">
//             {column.map((item, idx) => {
//               const { type, src, width, height, marginTop } = item;
//               const isVideo = type === "video";

//               return (
//                 <div
//                   key={`${colIdx}-${idx}`}
//                   className="relative rounded-xl overflow-hidden shadow-md"
//                   style={{ width, height, marginTop }}
//                 >
//                   {isVideo ? (
//                     <video
//                       src={src}
//                       autoPlay={playVideos}
//                       loop
//                       muted
//                       playsInline
//                       className="w-full h-full object-cover rounded-xl"
//                     />
//                   ) : (
//                     <Image
//                       src={src}
//                       alt={`media-${idx}`}
//                       width={width}
//                       height={height}
//                       className="w-full h-full object-cover rounded-xl"
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GallerySection;








//gallary 3

import React from "react";

const mediaBlocks = [
  {
    image: "/images/image1.jpeg",
    imageWidth: "w-[20rem]", // 20rem
    imageHeight: "h-[15rem]", // 15rem
  },
  {
    videoOnly: "/videos/video1.mp4",
    videoWidth: "w-[15rem]", // 60rem
    videoHeight: "h-96", // 96rem
  },
  {
    image: "/images/image2.jpeg",
    imageWidth: "w-[25rem]", // 20rem
    imageHeight: "h-[13rem]", // 15rem
  },
  {
    videoOnly: "/videos/video2.mp4",
    videoWidth: "w-80", // 60rem
    videoHeight: "h-96", // 96rem
  },
  {
    image: "/images/image3.jpeg",
    imageWidth: "w-[18rem]", // 20rem
    imageHeight: "h-[15rem]", // 15rem
  },
  {
    videoOnly: "/videos/video3.mp4",
    videoWidth: "w-60", // 60rem
    videoHeight: "h-96", // 96rem
  },
  {
    image: "/images/image4.jpeg",
    imageWidth: "w-[20rem]", // 20rem
    imageHeight: "h-[15rem]", // 15rem
  },
  {
    videoOnly: "/videos/video4.mp4",
    videoWidth: "w-80", // 60rem
    videoHeight: "h-[27rem]", // 96rem
  },
  {
    image: "/images/image4.jpeg",
    imageWidth: "w-[19rem]", // 20rem
    imageHeight: "h-[13rem]", // 15rem
  },
  {
    videoOnly: "/videos/video5.mp4",
    videoWidth: "w-[18rem]", // 60rem
    videoHeight: "h-96", // 96rem
  },
];

// Split mediaBlocks into groups of 10
function splitIntoChunks(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

export default function GallerySection() {
  const blockChunks = splitIntoChunks(mediaBlocks, 10);

  return (
    <div className="relative w-full h-screen bg-white overflow-x-auto overflow-y-hidden snap-x snap-mandatory">
      
      {/* Title */}
      <h2 className="text-5xl font-normal text-center mb-5 p-4">
        Gallery
      </h2>

      {/* Scrollable container */}
      <div className="flex w-max h-[90%] gap-20 px-10">
        {blockChunks.map((chunk, chunkIndex) => (
          <div
            key={chunkIndex}
            className="relative w-screen h-full flex-shrink-0 snap-start"
          >
            {/* Each Group of 10 */}
            {chunk.map((block, index) => (
              <div
                key={index}
                className={`absolute ${getPositionStyles(index)} transition-all duration-500 transform hover:scale-105 hover:translate-y-2`}
              >
                {block.videoOnly ? (
                  <div
                    className={`${block.videoWidth} ${block.videoHeight} relative`}
                  >
                    <video
                      src={block.videoOnly}
                      className="object-cover w-full h-full rounded-lg animate-float"
                      controls
                      autoPlay
                      muted // Auto play and mute video initially
                      loop // Ensure the video loops
                      preload="metadata"
                    />
                  </div>
                ) : (
                  <>
                    {/* Main Image */}
                    <div
                      className={`${block.imageWidth} ${block.imageHeight} relative`}
                    >
                      <img
                        src={block.image}
                        alt=""
                        className="object-cover w-full h-full rounded-lg animate-float"
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Manual positioning for each block (first 10)
 */
function getPositionStyles(index) {
  const positions = [
    "top-0 left-20",          
    "top-7 left-[40rem]",      
    "top-0 left-[60rem]",     
    "top-96 left-[5rem]",          
    "top-[9rem] left-[75rem]",     
    "top-[8rem] left-[21rem]",     
    "top-[33rem] left-[40rem]",
    "top-[22rem] left-[65rem]",     
    "top-0 left-[90rem]",
    "top-[20rem] left-[90rem]",
  ];
  return positions[index % positions.length] || "";
}
