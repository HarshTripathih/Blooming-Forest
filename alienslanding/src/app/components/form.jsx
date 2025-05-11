'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ArrowRight } from 'lucide-react';

const SalesforceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plotsize: '',
    budget: '',
    designation: '',
    phone: '',
  });

  const [status, setStatus] = useState('');

  // const utmParams = {
  //   utm_campaign: 'YourCampaign',
  //   utm_source: 'Google',
  //   utm_medium: 'CPC',
  //   utm_term: 'luxury+plots',
  //   utm_content: 'ad1',
  //   utm_remarketing: 'yes',
  //   utm_campaign_id: '12345',
  //   utm_audience_id: '56789',
  //   utm_audience_name: 'Hyderabad Investors',
  //   utm_ad_id: '99999',
  //   utm_ad_name: 'PlotAd',
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Submitting...');
    setStatus('Submitting...');

    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          // utmParams,
          formType: 'form2',
        }),
      });

      const data = await res.json();
      toast.dismiss(loadingToast);

      if (res.ok) {
        toast.success(data.message || 'Form submitted successfully!', {
          style: {
            background: '#d5c9b3',
            color: '#000',
            fontWeight: 'bold',
          },
          icon: '✅',
        });
        setStatus('Submitted successfully!');
        setFormData({
          name: '',
          email: '',
          plotsize: '',
          budget: '',
          designation: '',
          phone: '',
        });
      } else {
        toast.error(data.error || 'Something went wrong!');
        setStatus(data.error || 'Something went wrong.');
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      setStatus('Server error. Please try again.');
    }
  };

  return (
    <div className="mt-16 md:mt-20 animate-fade-in-up">
      <h3 className="text-2xl font-semibold mb-6 text-center text-[#D5C9B3]">Looking for something specific?</h3>
      <div className="max-w-lg mx-auto w-full">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full bg-transparent border-b border-[#d5c9b3] outline-none py-2 placeholder-gray-400 text-white"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="bg-transparent border-b border-[#d5c9b3] outline-none text-base py-2 text-white"
            required
          />

          <select
            name="plotsize"
            value={formData.plotsize}
            onChange={handleChange}
            className="bg-transparent border-b border-[#d5c9b3] outline-none text-base py-2 text-white"
            required
          >
            <option value="">Select Plot Size*</option>
            <option>150 - 300 sq. yards</option>
            <option>300 - 500 sq. yards</option>
            <option>Above 500 sq. yards</option>
          </select>

          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="bg-transparent border-b border-[#d5c9b3] outline-none py-2 text-base text-white"
            required
          >
            <option value="">Select Budget</option>
            <option>Below 50L</option>
            <option>50L - 1Cr</option>
            <option>Above 1Cr</option>
          </select>

          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="bg-transparent border-b border-[#d5c9b3] outline-none py-2  text-base text-white"
          />

          <div className="flex space-x-2">
            <span className="flex items-center border-b border-[#d5c9b3] outline-none py-2 px-4 text-base text-white">+91</span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="flex-1 p-3 bg-transparent border-b border-[#d5c9b3] outline-none py-2 text-base text-white"
              required
            />
          </div>


          <button
            type="submit"
            className="flex items-center gap-2 text-[#d5c9b3] group"
          >
            <div className="w-[100px] h-[2px] bg-[#d5c9b3] -mr-3 group-hover:translate-x-2 transition-transform duration-300" />
            <ArrowRight className="stroke-[#d5c9b3] w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </button>


          {status && <p className="text-center text-sm mt-2">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default SalesforceForm;
