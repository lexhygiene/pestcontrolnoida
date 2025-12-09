import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initialPosts } from '../data/posts';
import BlogCard from '../components/BlogCard';
import { updateMeta } from '../services/seo';
import { ShieldCheck, Bug, Leaf, Phone } from 'lucide-react';

const Home: React.FC = () => {
  useEffect(() => {
    updateMeta(
      "Pest Control Noida - Expert Pest Solutions in Noida & Delhi NCR",
      "Protect your home and office with our safe, effective, and herbal pest control solutions. Specializing in termite treatment and general pest control."
    );
  }, []);

  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    // Fetch posts from Server API
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const data = await response.json();
          // Sort by Date (Newest First)
          data.sort((a: any, b: any) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA);
          });
          setPosts(data);
        } else {
          console.error('Failed to fetch posts, falling back to local data');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const featuredPosts = posts.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-eco-green text-eco-beige py-20 md:py-32 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-eco-gold rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight animate-slide-up">
            Expert <span className="text-eco-gold">Termite & Pest Control</span> Services
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-eco-white/90 font-light animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Safe, effective, and herbal treatments for your home and office in Noida & Delhi NCR.
          </p>
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/contact"
              className="inline-block bg-eco-gold text-eco-green text-xl font-bold py-4 px-10 rounded-full shadow-lg hover:bg-white hover:text-eco-gold hover:scale-105 transition-all duration-300 border-2 border-eco-gold"
            >
              Get a Free Inspection
            </Link>
            <p className="mt-4 text-sm opacity-80">Free Consultation • 100% Safe • Certified Experts</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24 relative z-20">
            {[
              { title: 'Termite Control', icon: <ShieldCheck size={40} />, text: 'Advanced anti-termite treatment for pre & post construction.', link: '/category/termite-control' },
              { title: 'General Pest', icon: <Bug size={40} />, text: 'Cockroach, ant, and mosquito control solutions.', link: '/category/general-pest' },
              { title: 'Herbal Treatment', icon: <Leaf size={40} />, text: 'Eco-friendly and odorless herbal pest control.', link: '/category/herbal' },
            ].map((cat, idx) => (
              <Link
                key={idx}
                to={cat.link}
                className="bg-eco-beige p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-eco-green/10 group"
              >
                <div className="text-eco-green mb-4 group-hover:text-eco-gold transition-colors">{cat.icon}</div>
                <h3 className="text-2xl font-serif font-bold text-eco-green mb-2">{cat.title}</h3>
                <p className="text-gray-700">{cat.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-eco-beige">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-eco-green mb-2">Latest Insights</h2>
              <p className="text-gray-600 text-lg">Expert advice on keeping your property pest-free.</p>
            </div>
            <Link to="/blog" className="hidden md:block text-eco-green font-bold border-b-2 border-eco-gold hover:text-eco-gold transition-colors">View All Services</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post, idx) => (
              <BlogCard key={post.id} post={post} featured={idx === 0} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link to="/blog" className="inline-block px-6 py-3 border-2 border-eco-green text-eco-green font-bold rounded hover:bg-eco-green hover:text-white transition-colors">View All Services</Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-eco-green text-eco-beige">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16">How We Protect Your Home</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-eco-gold rounded-full flex items-center justify-center text-eco-green text-3xl font-bold mb-6">1</div>
              <h3 className="text-xl font-bold mb-3">Free Inspection</h3>
              <p className="opacity-80 max-w-xs">Our experts visit your property to identify the pest problem and extent of infestation.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-eco-gold rounded-full flex items-center justify-center text-eco-green text-3xl font-bold mb-6">2</div>
              <h3 className="text-xl font-bold mb-3">Custom Treatment</h3>
              <p className="opacity-80 max-w-xs">We apply safe, herbal, and effective treatments tailored to your specific needs.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-eco-gold rounded-full flex items-center justify-center text-eco-green text-3xl font-bold mb-6">3</div>
              <h3 className="text-xl font-bold mb-3">Long-Term Protection</h3>
              <p className="opacity-80 max-w-xs">Enjoy a pest-free environment with our warranty-backed services and prevention tips.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
                <img
                  src="https://res.cloudinary.com/dzcxiamxp/image/upload/v1764138047/main-sample.png"
                  alt="Pest Control Expert"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-eco-green mb-6">Why Choose Pest Control Noida?</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                We understand that pests can be a nuisance and a health hazard. That's why we offer prompt, professional, and permanent solutions.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                With years of experience in Noida and Delhi NCR, we are the trusted choice for thousands of homeowners and businesses.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-lg font-semibold text-eco-green">
                  <ShieldCheck className="text-eco-gold" /> Certified & Experienced Team
                </li>
                <li className="flex items-center gap-3 text-lg font-semibold text-eco-green">
                  <Leaf className="text-eco-gold" /> Herbal & Safe for Pets/Kids
                </li>
                <li className="flex items-center gap-3 text-lg font-semibold text-eco-green">
                  <Phone className="text-eco-gold" /> Responsive Customer Support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-eco-gold/20 border-y border-eco-gold/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-eco-green mb-4">Don't let pests take over your home.</h2>
          <p className="text-xl text-gray-700 mb-8">Call us today for a free consultation and quote.</p>
          <Link
            to="/contact"
            className="inline-block bg-eco-green text-eco-beige text-lg font-bold py-3 px-8 rounded shadow hover:bg-[#152b1e] transition-colors"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;