import React, { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { LeadForm } from '../types';

const SidebarForm: React.FC = () => {
  const [formData, setFormData] = useState<LeadForm>({
    fullName: '',
    email: '',
    phone: '',
    referralSource: 'Google',
    message: '',
    consent: false
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, consent: e.target.checked }));
  };

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.consent) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    setStatus('submitting');

    try {
      const token = await executeRecaptcha('contact_form');

      // Use relative path for production (relies on proxy or same-origin)
      // or use environment variable import.meta.env.VITE_API_URL
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          service: formData.referralSource, // Using referral source as service for now or add service field
          message: formData.message,
          token // Send reCAPTCHA token
        }),
      });

      if (response.ok) {
        setStatus('success');
        window.location.href = '/thank-you'; // Redirect to Thank You page
      } else {
        const data = await response.json();
        setStatus('error');
        alert(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="bg-eco-white border border-eco-gold/30 p-6 rounded-lg shadow-sm sticky top-24">
      <h3 className="text-2xl font-serif text-eco-green mb-2">Get a Free Quote</h3>
      <p className="text-gray-600 mb-6 text-base">Stop Pests Now! Check Your Area for Availability</p>

      {status === 'success' ? (
        <div className="bg-green-100 text-green-800 p-4 rounded text-center animate-fade-in">
          <p className="font-bold">Thank you!</p>
          <p>We have received your details and will be in touch shortly.</p>
          <button onClick={() => setStatus('idle')} className="mt-4 text-sm underline">Send another</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-eco-green mb-1">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:border-eco-gold focus:ring-1 focus:ring-eco-gold outline-none bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-eco-green mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:border-eco-gold focus:ring-1 focus:ring-eco-gold outline-none bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-eco-green mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:border-eco-gold focus:ring-1 focus:ring-eco-gold outline-none bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-eco-green mb-1">How did you hear about us?</label>
            <select
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:border-eco-gold focus:ring-1 focus:ring-eco-gold outline-none bg-white"
            >
              <option value="Google">Google Search</option>
              <option value="Referral">Friend/Family Referral</option>
              <option value="Social Media">Social Media</option>
              <option value="Event">Local Event</option>
              <option value="Leaflet">Leaflet/Flyer</option>
              <option value="Repeat Customer">Repeat Customer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-eco-green mb-1">Tell us about your home</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded focus:border-eco-gold focus:ring-1 focus:ring-eco-gold outline-none bg-white"
              placeholder="e.g. Looking for termite control services..."
            ></textarea>
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={handleCheckbox}
              className="mt-1.5 accent-eco-green w-5 h-5"
            />
            <label htmlFor="consent" className="text-sm text-gray-600 leading-tight">
              I agree to the <a href="/privacy" className="underline text-eco-green">Privacy Policy</a> and consent to being contacted regarding my enquiry.
            </label>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-eco-green hover:bg-[#152b1e] text-eco-beige font-bold py-4 rounded transition-all duration-300 shadow-md hover:shadow-lg border-b-4 border-[#152b1e] hover:border-eco-green active:border-0 active:translate-y-1"
          >
            {status === 'submitting' ? 'Sending...' : 'Get a Free Quote'}
          </button>
        </form>
      )}
    </div>
  );
};

export default SidebarForm;