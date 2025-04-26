'use client';
import { useEffect, useRef, useState } from 'react';
import SalesforceForm from './form';

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
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 animate-fade-in-up">

        {/* Logo and About */}
        <div className="flex flex-col items-center md:items-start">
          <img src="https://alienshub.co.in/corinth-demo/assets/img/hub-logo.png" alt="Aliens Hub" className="w-24 mb-4" />
          <p className="text-base leading-7 text-center md:text-left">
            Aliens HUB where nature’s canvas meets architectural brilliance. Nestled in the heart of Hyderabad, this gated haven redefines luxury living.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-3">Follow Us:</h3>
          <ul className="space-y-2 text-base text-center md:text-left">
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <li><a href="#" className="hover:underline">YouTube</a></li>
          </ul>
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

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-3">Contact Us:</h3>
          <p className="text-base text-center md:text-left"><strong>Address:</strong> Your Company Address Here</p>
          <p className="text-base text-center md:text-left"><strong>Phone:</strong> +91-XXXX-XXXXXX</p>
          <p className="text-base text-center md:text-left"><strong>Mail:</strong> contact@example.com</p>
        </div>

      </div>

      {/* Large Custom Form */}
      <SalesforceForm />

      {/* Branding */}
      <div className="mt-16 text-center font-[Cinzel] text-5xl md:text-6xl text-[#f0e6d2] animate-fade-in-up">
        Aliens <span className="italic">Hub</span>
      </div>

      {/* Bottom Bar */}
      <div className="mt-4 text-xs text-center border-t border-gray-700 pt-4">
        Designed and Developed by Aliens Group Pvt Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}
