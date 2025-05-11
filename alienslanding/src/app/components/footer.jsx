// 'use client';
// import { useEffect, useRef, useState } from 'react';
// import SalesforceForm from './form';
// import { MapPin, Phone, Mail } from 'lucide-react';
// import { motion, useAnimation, useInView } from 'framer-motion';

// const writingText = "Aliens Hub".split("");

//   const letterVariants = {
//     hidden: { opacity: 0, x: `0.5em` },
//     visible: (i) => ({
//       opacity: 1,
//       y: `0em`,
//       transition: {
//         delay: i * 0.2,
//         duration: 0.4,
//         ease: 'easeOut',
//       },
//     }),
//   };

// export default function Footer() {
//   const parallaxRef = useRef(null);  // <--- specify HTMLDivElement
//   const controls = useAnimation();
//   const ref = useRef(null);
//   const inView = useInView(ref, { triggerOnce: false, margin: '-20% 0px' });

//   useEffect(() => {
//     if (inView) {
//       controls.start((i) => letterVariants.visible(i));
//     } else {
//       controls.start('hidden');
//     }
//   }, [inView, controls]);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     plotsize: '',
//     budget: '',
//     designation: '',
//     phone: '',
//   });
//   const [status, setStatus] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus('Submitting...');

//     try {
//       const res = await fetch('/api/submit-form', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setStatus('Submitted successfully!');
//         window.location.href = data.redirect;
//       } else {
//         setStatus(data.error || 'Something went wrong.');
//       }
//     } catch (err) {
//       setStatus('Server error. Please try again.');
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const offset = window.scrollY * 0.2;
//       if (parallaxRef.current) {
//         parallaxRef.current.style.backgroundPosition = `center ${offset}px`;
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <footer
//       ref={parallaxRef}
//       className="relative bg-[#0a0f05] text-[#d5c9b3] pt-16 pb-8 px-8 overflow-hidden"
//       style={{
//         backgroundImage: "url('/your-parallax-background.jpg')",
//         backgroundSize: 'cover',
//         backgroundAttachment: 'fixed',
//       }}
//     >
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 animate-fade-in-up">

//         {/* Logo and About */}
//         <div className="flex flex-col items-center md:items-start">
//           <img src="https://alienshub.co.in/corinth-demo/assets/img/hub-logo.png" alt="Aliens Hub" className="w-24 mb-4" />
//           <p className="text-base leading-7 text-center md:text-left">
//             Aliens HUB where nature’s canvas meets architectural brilliance. Nestled in the heart of Hyderabad, this gated haven redefines luxury living.
//           </p>
//         </div>

//         {/* Social Links */}
//         <div className="flex justify-center md:justify-end items-center md:items-start">
//           <div className='w-1/2 flex flex-col'>
//             <h3 className="text-xl font-semibold text-center md:text-start mb-3">Follow Us:</h3>
//               <ul className="space-y-2 text-base text-center md:text-left">
//                 <li><a href="#" className="hover:underline">Facebook</a></li>
//                 <li><a href="#" className="hover:underline">Instagram</a></li>
//                 <li><a href="#" className="hover:underline">YouTube</a></li>
//               </ul>
//           </div>
//         </div>

//         {/* Other Projects */}
//         <div className="flex flex-col items-center md:items-start">
//           <h3 className="text-xl font-semibold mb-3">Our Other Projects:</h3>
//           <ul className="space-y-2 text-base text-center md:text-left">
//             <li><a href="#" className="hover:underline">Corinth Hill</a></li>
//             <li><a href="#" className="hover:underline">Old Mango Garden</a></li>
//             <li><a href="#" className="hover:underline">Cyntheria</a></li>
//             <li><a href="#" className="hover:underline">Breezy Hills</a></li>
//           </ul>
//         </div>

//       </div>

//       <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 animate-fade-in-up'>
//         {/* Large Custom Form */}
//         <div className='flex items-start'>
//           <SalesforceForm />
//         </div>
//         {/* Contact Info */}
//         <div className="flex flex-col items-center md:items-start md:mt-[5rem] text-center md:text-left space-y-4">
//           <h3 className="text-xl font-semibold">Contact Us:</h3>

//           <p className="text-base flex items-start gap-2">
//             <MapPin className=" md:w-5 md:h-5 md:mt-1" />
//             <span>
//               <strong>Address:</strong> Aliens Hub, Near Kadthal Junction, Chennaram, Telangana 509321
//             </span>
//           </p>

//           <p className="text-base flex items-center gap-2">
//             <Phone className="w-5 h-5" />
//             <span>
//               <strong>Phone:</strong> +91-7335640040
//             </span>
//           </p>

//           <p className="text-base flex items-center gap-2">
//             <Mail className="w-5 h-5" />
//             <span>
//               <strong>Mail:</strong> marketing@aliensgroup.in
//             </span>
//           </p>
//         </div>
//       </div>

//       <div className="bg-[#0D1009] text-white px-6 md:px-20 py-12 animate-fade-in-up">
//       <div className="max-w-7xl mx-auto flex flex-col gap-8">
//         {/* Disclaimer */}
//         <div>
//         <h3 className="text-lg md:text-xl font-light mb-4">Disclaimer</h3>
//         <p
//           className="text-sm md:text-base font-light leading-relaxed text-gray-300"
//           style={{ textAlign: 'justify' }}
//         >
//           By using or accessing the webapge, you agree with the Disclaimer without any qualification or limitation. The Company/ Firm reserves the right to terminate, revoke, modify, alter, add and delete any one or more of the terms and conditions outlined in the brochure. The Company/ Firm shall be under no obligation to notify the user of the amendment to the terms and conditions and the user shall be bound by such amended terms and conditions. Computer generated images, walkthroughs and render images used on this webpage are the artist's impression and are indicative of the actual designs. The imagery used on the brochure may not represent actuals or may be indicative of style only. Company/ Firm to ensure that information in the webpage are up to date, accurate and correct, the readers/ users are requested to make their independent enquiry before relying upon the same. For any further information or clarification, reach out to us on our toll free number – 7330640040 or write to us on hub@aliensgroup.in.
//         </p>
//       </div>

//         {/* Logo Text */}
//           <div
//             ref={ref}
//             className="md:h-[40vh] w-full flex text-center items-center text-center"
//           >
//               <motion.h2
//                 className="flex justify-center items-center flex-nowrap"
//                 style={{ lineHeight: '1.1' }}
//               >
//                 {writingText.map((char, i) => (
//                   <motion.span
//                     key={i}
//                     custom={i}
//                     initial="hidden"
//                     animate={controls}
//                     variants={letterVariants}
//                     className={`inline-block ${
//                       i >= 7
//                         ? 'text-[80px] md:text-[300px] font-waterfallregular'
//                         : 'text-[40px] md:text-[200px] font-nostalgic'
//                     } text-[#F3E6C2]`}
//                   >
//                     {char === ' ' ? '\u00A0' : char}
//                   </motion.span>
//                 ))}
//               </motion.h2>
//             </div>
//         </div>
//     </div>

//       {/* Bottom Bar */}
//       <div className="mt-4 text-xs text-center border-t border-gray-700 pt-4">
//         Designed and Developed by Aliens Group Pvt Ltd. All Rights Reserved.
//       </div>
//     </footer>
//   );
// }








'use client';
import { useEffect, useRef, useState } from 'react';
import SalesforceForm from './form';
import { MapPin, Phone, Mail } from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';

const writingText = "Aliens Hub".split("");

const letterVariants = {
  hidden: { opacity: 0, x: `0.5em` },
  visible: (i) => ({
    opacity: 1,
    y: `0em`,
    transition: {
      delay: i * 0.2,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export default function Footer() {
  const parallaxRef = useRef(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { triggerOnce: false, margin: '-20% 0px' });

  useEffect(() => {
    if (inView) {
      controls.start((i) => letterVariants.visible(i));
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plotsize: '',
    budget: '',
    designation: '',
    phone: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('Submitted successfully!');
        window.location.href = data.redirect;
      } else {
        setStatus(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('Server error. Please try again.');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY * 0.2;
      if (parallaxRef.current) {
        parallaxRef.current.style.backgroundPosition = `center ${offset}px`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer
      ref={parallaxRef}
      className="relative bg-[#0a0f05] text-[#d5c9b3] pt-16 pb-8 px-8 overflow-hidden"
      style={{
        backgroundImage: "url('/your-parallax-background.jpg')",
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="flex flex-col items-center md:items-start">
          <img src="https://alienshub.co.in/corinth-demo/assets/img/hub-logo.png" alt="Aliens Hub" className="w-24 mb-4" />
          <p className="text-base leading-7 text-center md:text-left">
            Aliens HUB where nature’s canvas meets architectural brilliance. Nestled in the heart of Hyderabad, this gated haven redefines luxury living.
          </p>
        </div>

        <div className="flex justify-center md:justify-end items-center md:items-start">
          <div className='w-1/2 flex flex-col'>
            <h3 className="text-xl font-semibold text-center md:text-start mb-3">Follow Us:</h3>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              {["Facebook", "Instagram", "YouTube"].map((platform, idx) => (
                <motion.li
                  key={idx}
                  variants={fadeInUp}
                  className="hover:underline text-base text-center md:text-left"
                >
                  <a href="#">{platform}</a>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-3">Our Other Projects:</h3>
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {["Corinth Hill", "Old Mango Garden", "Cyntheria", "Breezy Hills"].map((project, idx) => (
              <motion.li
                key={idx}
                variants={fadeInUp}
                className="hover:underline text-base text-center md:text-left"
              >
                <a href="#">{project}</a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      <motion.div
        className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0'
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className='flex items-start'>
          <SalesforceForm />
        </div>

        <div className="flex flex-col items-center md:items-start md:mt-[5rem] text-center md:text-left space-y-4">
          <h3 className="text-xl font-semibold">Contact Us:</h3>
          <p className="text-base flex items-start gap-2">
            <MapPin className=" md:w-5 md:h-5 md:mt-1" />
            <span><strong>Address:</strong> Aliens Hub, Near Kadthal Junction, Chennaram, Telangana 509321</span>
          </p>
          <p className="text-base flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <span><strong>Phone:</strong> +91-7335640040</span>
          </p>
          <p className="text-base flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <span><strong>Mail:</strong> marketing@aliensgroup.in</span>
          </p>
        </div>
      </motion.div>

      <motion.div
        className="bg-[#0D1009] text-white px-6 md:px-20 py-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div>
            <h3 className="text-lg md:text-xl font-light mb-4">Disclaimer</h3>
            <p className="text-sm md:text-base font-light leading-relaxed text-base text-justify">
              By using or accessing the webapge, you agree with the Disclaimer without any qualification or limitation. The Company/ Firm reserves the right to terminate, revoke, modify, alter, add and delete any one or more of the terms and conditions outlined in the brochure. The Company/ Firm shall be under no obligation to notify the user of the amendment to the terms and conditions and the user shall be bound by such amended terms and conditions. Computer generated images, walkthroughs and render images used on this webpage are the artist's impression and are indicative of the actual designs. The imagery used on the brochure may not represent actuals or may be indicative of style only. Company/ Firm to ensure that information in the webpage are up to date, accurate and correct, the readers/ users are requested to make their independent enquiry before relying upon the same. For any further information or clarification, reach out to us on our toll free number – 7330640040 or write to us on hub@aliensgroup.in.
            </p>
          </div>

          <div
            ref={ref}
            className="md:h-[40vh] w-full flex text-center items-center text-center"
          >
            <motion.h2
              className="flex justify-center items-center flex-nowrap"
              style={{ lineHeight: '1.1' }}
            >
              {writingText.map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate={controls}
                  variants={letterVariants}
                  className={`inline-block ${
                    i >= 7
                      ? 'text-[80px] md:text-[300px] font-waterfallregular'
                      : 'text-[40px] md:text-[200px] font-nostalgic'
                  } text-[#F3E6C2]`}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h2>
          </div>
        </div>
      </motion.div>

      <div className="mt-4 text-xs text-center border-t border-gray-700 pt-4">
        Designed and Developed by Aliens Group Pvt Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}
