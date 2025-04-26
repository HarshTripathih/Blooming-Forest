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


//galary 2

// GallerySection.jsx
import React from "react";

const mediaBlocks = [
  {
    image: "/images/image1.jpeg",
    overlay: { type: "video", src: "/videos/video1.mp4", width: "w-80", height: "h-96" },
  },
  {
    image: "/images/image2.jpeg",
    overlay: { type: "image", src: "/images/image3.jpeg", width: "w-60", height: "h-80" },
  },
  {
    videoOnly: "/videos/video2.mp4",
  },
  {
    image: "/images/image3.jpeg",
    overlay: { type: "video", src: "/videos/video3.mp4", width: "w-80", height: "h-96" },
  },
  {
    image: "/images/image4.jpeg",
    overlay: { type: "image", src: "/images/image4.jpeg", width: "w-60", height: "h-80" },
  },
  {
    videoOnly: "/videos/video4.mp4",
  },
  {
    image: "/images/image3.jpeg",
    overlay: { type: "video", src: "/videos/video3.mp4", width: "w-80", height: "h-96" },
  },
  {
    image: "/images/image4.jpeg",
    overlay: { type: "image", src: "/images/image4.jpeg", width: "w-60", height: "h-80" },
  },
  {
    videoOnly: "/videos/video4.mp4",
  },
];


export default function GallerySection() {
  return (
    <div className="relative  overflow-x-auto scrollbar-hidden whitespace-nowrap h-[650px]">
      <div className="flex gap-40 px-20 py-10">
        {mediaBlocks.map((block, index) => (
          <div key={index} className="relative group">
            {/* Case: Video only */}
            {block.videoOnly ? (
              <div className="w-60 h-96 relative">
                <video
                  src={block.videoOnly}
                  className="object-cover w-full h-full rounded-lg animate-float"
                  autoPlay 
                  loop
                  muted
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center text-white text-xl rounded-lg hover-popup">
                  Video Preview
                </div>
              </div>
            ) : (
              <>
                {/* Main Image */}
                <div className="relative w-60 h-60 z-10">
                  <img
                    src={block.image}
                    alt=""
                    className="object-cover w-full h-full rounded-lg animate-float"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 text-white flex items-center justify-center text-lg rounded-lg hover-popup">
                    Image Preview
                  </div>
                </div>

                {/* Overlay */}
                {block.overlay && (
                  <div
                    className={`absolute top-full left-full -translate-y-1/2 -translate-x-1/2 ${block.overlay.width} ${block.overlay.height} z-20`}
                  >
                    {block.overlay.type === "video" ? (
                      <video
                        src={block.overlay.src}
                        className="object-cover w-full h-full rounded-lg animate-float"
                        autoPlay
                        loop
                        muted
                      />
                    ) : (
                      <img
                        src={block.overlay.src}
                        alt=""
                        className="object-cover w-full h-full rounded-lg animate-float"
                      />
                    )}
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 text-white flex items-center justify-center text-lg rounded-lg hover-popup">
                      {block.overlay.type === "video" ? "Video Preview" : "Image Preview"}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
