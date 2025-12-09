import React, { useEffect } from 'react';
import SidebarForm from '../components/SidebarForm';
import { updateMeta } from '../services/seo';

export const AboutPage: React.FC = () => {
  useEffect(() => updateMeta("About Us | Pest Control Noida", "Learn about our mission to provide safe pest control services."), []);

  return (
    <div className="bg-eco-beige min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-eco-green mb-12 text-center">About Pest Control Noida</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg prose prose-lg max-w-none text-gray-700">
              <p className="lead text-xl font-medium text-eco-green">
                Pest Control Noida <span className="text-gray-500 text-base">(A Unit of Lex Hygiene India)</span> is a leading provider of pest management services in Noida, Delhi, and the NCR region.
              </p>
              <p>
                We are dedicated to creating healthy, pest-free environments for homes and businesses. Our team of certified professionals uses the latest technology and eco-friendly methods to tackle all types of pests, from termites to cockroaches.
              </p>

              <h3 className="text-eco-green font-serif">Our Mission</h3>
              <p>
                To deliver safe, effective, and affordable pest control solutions while maintaining the highest standards of hygiene and customer satisfaction. We believe in a proactive approach to pest management, focusing on prevention and long-term solutions.
              </p>

              <h3 className="text-eco-green font-serif">Why Choose Us?</h3>
              <ul className="space-y-2">
                <li><strong className="text-eco-gold">Expertise:</strong> Over 10 years of experience in the pest control industry with a team of certified technicians.</li>
                <li><strong className="text-eco-gold">Safety First:</strong> We use herbal and government-approved chemicals that are safe for humans, pets, and the environment.</li>
                <li><strong className="text-eco-gold">Reliability:</strong> Prompt service, transparent pricing, and long-term warranties on our anti-termite treatments.</li>
                <li><strong className="text-eco-gold">Responsive Support:</strong> We are always available to address your pest concerns.</li>
              </ul>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="text-eco-green font-bold mb-2">Contact Details • A Unit of Lex Hygiene India</h4>
                <p className="mb-1 font-medium">Pest Control Noida</p>
                <p className="mb-1 text-gray-600">Logix City Centre, Noida, Uttar Pradesh, India</p>
                <p className="mb-1 text-gray-600"><strong>Phone:</strong> <a href="tel:+918882333782" className="hover:text-eco-green transition-colors">+91 8882333782</a></p>
                <p className="mb-1 text-gray-600"><strong>Email:</strong> info@pestcontrolnoida.in</p>
                <p className="text-gray-600"><strong>Hours:</strong> Mon - Sun: 8:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <SidebarForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  useEffect(() => updateMeta("Contact Us | Pest Control Noida", "Get in touch for a free inspection or quote."), []);

  return (
    <div className="bg-eco-beige min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-eco-green mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">Have a pest problem? We're here to help. Get a free quote today.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content - Contact Info */}
          <div className="lg:w-2/3">
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
              <h2 className="text-2xl font-serif font-bold text-eco-green mb-6">Get In Touch</h2>
              <p className="text-gray-700 mb-8">
                Whether you have a termite infestation or need general pest control, our experts are ready to assist you.
                Fill out the form, or reach out to us directly using the contact details below.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-eco-beige/30 rounded-lg border border-eco-beige">
                  <h3 className="font-bold text-eco-green text-lg mb-3">Office Address</h3>
                  <p className="text-gray-800 font-medium">Pest Control Noida</p>
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">A Unit of Lex Hygiene India</p>
                  <p className="text-gray-600">Logix City Centre, Noida</p>
                  <p className="text-gray-600">Uttar Pradesh, India</p>
                  <p className="text-gray-600 mt-2">Serving: Noida, Delhi, Greater Noida, Ghaziabad, Gurgaon</p>
                </div>

                <div className="p-6 bg-eco-beige/30 rounded-lg border border-eco-beige">
                  <h3 className="font-bold text-eco-green text-lg mb-3">Contact Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 font-bold uppercase">Phone</p>
                      <a href="tel:+918882333782" className="text-gray-800 font-medium hover:text-eco-green transition-colors">+91 8882333782</a>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-bold uppercase">Email</p>
                      <p className="text-gray-800 font-medium">info@pestcontrolnoida.in</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-bold uppercase">Hours</p>
                      <p className="text-gray-800 font-medium">Mon - Sun: 8:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-lg overflow-hidden h-64 bg-gray-200 border border-gray-300 flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.6718213366253!2d77.29971187617409!3d28.489428390563507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce9baa3b08a0f%3A0x4d62d56e4b6c152f!2sLex%20Hygiene%20India!5e0!3m2!1sen!2sin!4v1764134990863!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Sidebar - Fixed Form */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <SidebarForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPage: React.FC = () => {
  useEffect(() => updateMeta("Privacy Policy | Pest Control Noida", "Our privacy policy."), []);

  return (
    <div className="bg-eco-beige min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-serif font-bold text-eco-green mb-6">Privacy Policy</h1>
        <div className="bg-white p-8 rounded shadow prose text-gray-700">
          <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your personal data.</p>

          <h3>Comments</h3>
          <p>When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.</p>

          <h3>Media</h3>
          <p>If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.</p>

          <h3>Cookies</h3>
          <p>If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</p>
          <p>If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p>

          <h3>Embedded content from other websites</h3>
          <p>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p>

          <h3>Who we share your data with</h3>
          <p>If you request a password reset, your IP address will be included in the reset email.</p>

          <h3>How long we retain your data</h3>
          <p>If you leave a comment, the comment and its metadata are retained indefinitely. For users that register on our website, we also store the personal information they provide in their user profile.</p>

          <h3>What rights you have over your data</h3>
          <p>If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you. You can also request that we erase any personal data we hold about you.</p>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  useEffect(() => updateMeta("Terms of Use | Pest Control Noida", "Our terms of use."), []);

  return (
    <div className="bg-eco-beige min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-serif font-bold text-eco-green mb-6">Service Terms & Conditions</h1>
        <div className="bg-white p-8 rounded shadow prose text-gray-700">
          <p>To ensure we provide the best possible service and maintain clear communication, please review our terms and conditions below:</p>

          <h3>Targeted Treatment Approach</h3>
          <p>To ensure effective and efficient pest control, our technicians will focus treatment on the infected or affected areas of your property as identified during the assessment. We believe in a targeted approach to minimize chemical use and maximize efficacy.</p>

          <h3>Service Request Hours</h3>
          <p>We process service requests and complaints during our standard business hours, Monday to Friday, from 10:00 AM to 6:00 PM IST. Requests submitted outside of business hours will be addressed on the next business day.</p>

          <h3>Complaint Resolution Timeline</h3>
          <p>Once your complaint or service request is officially registered, we aim to resolve it within 24 to 48 business hours. We do not schedule or resolve complaints on weekends or public holidays.</p>

          <h3>Emergency Services</h3>
          <p>For urgent pest issues outside of our standard business hours, we offer emergency call-out services. An emergency call-out charge of Rs. 1000 + GST will apply.</p>

          <h3>Customer Responsibilities</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Prepare the Area:</strong> Ensure affected areas are cleared and accessible.</li>
            <li><strong>Post-Treatment Precautions:</strong> Follow ventilation and re-entry instructions for safety.</li>
            <li><strong>Provide Access:</strong> An authorized individual must be present to grant access.</li>
          </ul>

          <h3>Payment Terms</h3>
          <p>Payment for services rendered is due upon completion of the service. We accept payments via UPI, Cash, and major Credit Cards.</p>

          <h3>Warranty/Guarantee</h3>
          <p>Any specific warranty provided will be explicitly mentioned on your invoice. Warranty covers re-treatment of affected areas only unless otherwise agreed.</p>

          <h3>Cancellation & Rescheduling</h3>
          <p>We require a minimum of 12 hours’ notice for cancellation or rescheduling. Failure to provide notice may result in a fee.</p>

          <h3>Limitation of Liability</h3>
          <p>Our liability is limited to the extent permitted by law. We are not liable for pre-existing structural issues or damages resulting from failure to follow instructions.</p>
        </div>
      </div>
    </div>
  );
};

export const NotFoundPage: React.FC = () => (
  <div className="min-h-screen bg-eco-beige flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-6xl font-serif font-bold text-eco-green mb-4">404</h1>
    <p className="text-xl text-gray-600 mb-8">Page not found.</p>
    <a href="/" className="bg-eco-green text-eco-beige px-6 py-3 rounded font-bold hover:bg-[#152b1e] transition-colors">Return Home</a>
  </div>
);