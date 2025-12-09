import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-eco-green text-eco-beige mt-20 border-t-4 border-eco-gold">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* About */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="text-eco-gold" size={24} />
              <span className="text-2xl font-serif font-bold">Pest Control Noida</span>
              <span className="block text-xs text-eco-gold uppercase tracking-widest mt-1">A Unit of Lex Hygiene India</span>
            </div>
            <p className="text-eco-white/80 leading-relaxed mb-6">
              Professional pest control services in Noida and Delhi NCR. We specialize in termite treatment, general pest control, and herbal solutions for homes and offices.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 rounded hover:bg-eco-gold hover:text-eco-green transition-colors"><Facebook size={20} /></a>
              <a href="#" className="p-2 bg-white/10 rounded hover:bg-eco-gold hover:text-eco-green transition-colors"><Twitter size={20} /></a>
              <a href="#" className="p-2 bg-white/10 rounded hover:bg-eco-gold hover:text-eco-green transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-bold text-eco-gold mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/category/termite-control" className="hover:text-eco-gold transition-colors">Termite Control</Link></li>
              <li><Link to="/category/general-pest" className="hover:text-eco-gold transition-colors">General Pest Control</Link></li>
              <li><Link to="/category/herbal" className="hover:text-eco-gold transition-colors">Herbal Treatment</Link></li>
              <li><Link to="/category/commercial" className="hover:text-eco-gold transition-colors">Commercial Services</Link></li>
              <li><Link to="/blog" className="hover:text-eco-gold transition-colors">All Services</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-serif font-bold text-eco-gold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-eco-white/80">
              <li className="flex items-center gap-2"><Mail size={16} /> info@pestcontrolnoida.in</li>
              <li>Logix City Centre,Noida, Uttar Pradesh</li>
              <li>Delhi NCR, India</li>
              <li>Call: <a href="tel:+918882333782" className="hover:text-eco-gold transition-colors">+91 8882333782</a></li>
            </ul>
          </div>

          {/* Admin / Legal */}
          <div>
            <h3 className="text-xl font-serif font-bold text-eco-gold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="hover:text-eco-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-eco-gold transition-colors">Terms of Use</Link></li>
              <li><a href="/sitemap.xml" className="hover:text-eco-gold transition-colors">Sitemap</a></li>
              <li className="pt-6">
                <Link to="/editor" className="text-sm px-3 py-1 border border-eco-gold/30 rounded hover:bg-eco-gold hover:text-white transition-colors">
                  Editor Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-eco-white/60">
          <p>&copy; {new Date().getFullYear()} Pest Control Noida. All rights reserved. Professional Pest Control Services.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;