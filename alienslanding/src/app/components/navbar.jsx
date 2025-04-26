// 'use client';
// import { useEffect, useState } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import Image from 'next/image';
// import Link from 'next/link';

// export default function Navbar() {
//   const controls = useAnimation();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       setIsScrolled(scrollY > 50);

//       controls.start({
//         y: scrollY * 0.2, // Parallax effect
//         transition: { type: "spring", stiffness: 50 }
//       });
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [controls]);

//   return (
//     <motion.nav
//       animate={controls}
//       className={`fixed w-full top-0 z-50 transition-all ${
//         isScrolled ? 'bg-[#0a0f05]/80 shadow-lg backdrop-blur' : 'bg-transparent'
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        
//         {/* Logo */}
//         <Link href="/" className="flex-shrink-0">
//           <Image
//             src="https://alienshub.co.in/corinth-demo/assets/img/hub-logo.png"
//             alt="Aliens Hub"
//             width={50}
//             height={50}
//             className="w-12 md:w-14 lg:w-16"
//           />
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-8 text-[#d5c9b3] font-semibold">
//           <Link href="/" className="hover:text-white transition">Home</Link>
//           <Link href="/about" className="hover:text-white transition">About</Link>
//           <Link href="/projects" className="hover:text-white transition">Projects</Link>
//           <Link href="/contact" className="hover:text-white transition">Contact</Link>
//         </div>

//         {/* Hamburger Button */}
//         <div className="md:hidden flex items-center">
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="inline-flex items-center justify-center p-2 rounded-md text-[#d5c9b3] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             <svg
//               className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               aria-hidden="true"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
//             </svg>
//             <svg
//               className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               aria-hidden="true"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           className="md:hidden bg-[#0a0f05]/95 backdrop-blur-sm px-6 py-4 space-y-4 text-[#d5c9b3] font-semibold"
//         >
//           <Link href="/" className="block hover:text-white transition" onClick={() => setIsMenuOpen(false)}>Home</Link>
//           <Link href="/about" className="block hover:text-white transition" onClick={() => setIsMenuOpen(false)}>About</Link>
//           <Link href="/projects" className="block hover:text-white transition" onClick={() => setIsMenuOpen(false)}>Projects</Link>
//           <Link href="/contact" className="block hover:text-white transition" onClick={() => setIsMenuOpen(false)}>Contact</Link>
//         </motion.div>
//       )}
//     </motion.nav>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], ["0%", "-100%"]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      style={{ y }}
      className="fixed top-0 left-0 w-full z-50 shadow-lg bg-white/70 backdrop-blur-md"
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://alienshub.co.in/corinth-demo/assets/img/hub-logo.png"
            alt="Logo"
            width={150}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          <Link href="/" className="hover:text-pink-600 transition">Home</Link>
          <Link href="/about" className="hover:text-pink-600 transition">About</Link>
          <Link href="/projects" className="hover:text-pink-600 transition">Projects</Link>
          <Link href="/contact" className="hover:text-pink-600 transition">Contact</Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white px-4 py-4 shadow-lg"
        >
          <Link href="/" className="block py-2" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" className="block py-2" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/projects" className="block py-2" onClick={() => setIsOpen(false)}>Projects</Link>
          <Link href="/contact" className="block py-2" onClick={() => setIsOpen(false)}>Contact</Link>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
