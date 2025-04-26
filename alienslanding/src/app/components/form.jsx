'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

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
      <h3 className="text-2xl font-semibold mb-6 text-center">Looking for something specific?</h3>
      <div className="max-w-lg mx-auto w-full">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="p-3 bg-transparent border border-gray-400 rounded focus:outline-none text-base"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="p-3 bg-transparent border border-gray-400 rounded focus:outline-none text-base"
            required
          />

          <select
            name="plotsize"
            value={formData.plotsize}
            onChange={handleChange}
            className="p-3 bg-transparent border border-gray-400 rounded text-base focus:outline-none"
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
            className="p-3 bg-transparent border border-gray-400 rounded text-base focus:outline-none"
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
            className="p-3 bg-transparent border border-gray-400 rounded focus:outline-none text-base"
          />

          <div className="flex space-x-2">
            <span className="flex items-center bg-transparent border border-gray-400 rounded px-4 text-base">+91</span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="flex-1 p-3 bg-transparent border border-gray-400 rounded focus:outline-none text-base"
              required
            />
          </div>


          <button
            type="submit"
            className="w-full px-6 py-2 bg-[#d5c9b3] text-black font-semibold rounded-full hover:bg-white hover:text-black transform hover:translate-x-2 transition-transform text-center"
          >
            Submit
          </button>

          {status && <p className="text-center text-sm mt-2">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default SalesforceForm;
