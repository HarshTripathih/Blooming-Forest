'use client';
import { useEffect, useRef, useState } from 'react';
import SalesforceForm from './form';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const parallaxRef = useRef(null);  // <--- specify HTMLDivElement
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 animate-fade-in-up">

        {/* Logo and About */}
        <div className="flex flex-col items-center md:items-start">
          <img src="https://alienshub.co.in/corinth-demo/assets/img/hub-logo.png" alt="Aliens Hub" className="w-24 mb-4" />
          <p className="text-base leading-7 text-center md:text-left">
            Aliens HUB where nature’s canvas meets architectural brilliance. Nestled in the heart of Hyderabad, this gated haven redefines luxury living.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center md:justify-end items-center md:items-start">
          <div className='w-1/2 flex flex-col'>
            <h3 className="text-xl font-semibold text-center md:text-start mb-3">Follow Us:</h3>
              <ul className="space-y-2 text-base text-center md:text-left">
                <li><a href="#" className="hover:underline">Facebook</a></li>
                <li><a href="#" className="hover:underline">Instagram</a></li>
                <li><a href="#" className="hover:underline">YouTube</a></li>
              </ul>
          </div>
        </div>

        {/* Other Projects */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-3">Our Other Projects:</h3>
          <ul className="space-y-2 text-base text-center md:text-left">
            <li><a href="#" className="hover:underline">Corinth Hill</a></li>
            <li><a href="#" className="hover:underline">Old Mango Garden</a></li>
            <li><a href="#" className="hover:underline">Cyntheria</a></li>
            <li><a href="#" className="hover:underline">Breezy Hills</a></li>
          </ul>
        </div>

      </div>

      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 animate-fade-in-up'>
        {/* Large Custom Form */}
        <div className='flex items-start'>
          <SalesforceForm />
        </div>
        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start md:mt-[5rem] text-center md:text-left space-y-4">
          <h3 className="text-xl font-semibold">Contact Us:</h3>

          <p className="text-base flex items-start gap-2">
            <MapPin className=" md:w-5 md:h-5 md:mt-1" />
            <span>
              <strong>Address:</strong> Aliens Hub, Near Kadthal Junction, Chennaram, Telangana 509321
            </span>
          </p>

          <p className="text-base flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <span>
              <strong>Phone:</strong> +91-7335640040
            </span>
          </p>

          <p className="text-base flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <span>
              <strong>Mail:</strong> marketing@aliensgroup.in
            </span>
          </p>
        </div>
      </div>

      <div className="bg-[#0D1009] text-white px-6 md:px-20 py-12 animate-fade-in-up">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Disclaimer */}
        <div>
        <h3 className="text-lg md:text-xl font-light mb-4">Disclaimer</h3>
        <p
          className="text-sm md:text-base font-light leading-relaxed text-gray-300"
          style={{ textAlign: 'justify' }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
          of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>

        {/* Logo Text */}
        <div className="text-center text-4xl md:text-[200px] font-nostalgic text-[#F3E6C2] leading-none tracking-tight">
          <span className="block">Aliens <span className='text-6xl md:text-[300px] font-waterfallregular'>Hub</span></span>
        </div>
      </div>
    </div>

      {/* Branding */}
      {/* <div className="mt-16 text-center font-[Cinzel] text-5xl md:text-6xl text-[#f0e6d2] animate-fade-in-up">
        Aliens <span className="italic">Hub</span>
      </div> */}

      {/* Bottom Bar */}
      <div className="mt-4 text-xs text-center border-t border-gray-700 pt-4">
        Designed and Developed by Aliens Group Pvt Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}
