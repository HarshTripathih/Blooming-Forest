// 'use client';
// import dynamic from 'next/dynamic';

// const MapView = dynamic(() => import('../components/MapView'), { ssr: false });

// export default function SoroundingDevelopment() {
//   return (
//     <main className="h-screen w-screen overflow-x-hidden">
//       <MapView />
//     </main>
//   );
// }







// 'use client';

// import { useEffect, useRef } from 'react';

// const VideoPlayer = () => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = (event) => {
//       const video = videoRef.current;
//       if (!video) return;

//       // Scroll up (deltaY negative): rewind, scroll down: fast-forward
//       const direction = event.deltaY > 0 ? 1 : -1;

//       // Adjust time in seconds
//       const timeChange = 5 * direction; // Half a second per scroll notch
//       video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + timeChange));

//       console.log(`Current time: ${video.currentTime.toFixed(2)}s`);
//     };

//     window.addEventListener('wheel', handleScroll);

//     return () => {
//       window.removeEventListener('wheel', handleScroll);
//     };
//   }, []);

//   return (
//     <div className="w-full max-w-2xl mx-auto mt-10">
//       <video ref={videoRef} controls className="w-full h-[50vh] object-cover">
//         <source src="/videos/heroleft.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//       <p className="mt-2 text-center text-gray-600">
//         Scroll on your touchpad to rewind or fast-forward
//       </p>
//     </div>
//   );
// };

// export default VideoPlayer;


'use client';
import dynamic from 'next/dynamic';

const Map3D = dynamic(() => import('../components/MapView'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Map3D />
    </div>
  );
}
