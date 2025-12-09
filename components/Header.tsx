import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/blog' },
    { label: 'Termite Control', path: '/category/termite-control' },
    { label: 'General Pest', path: '/category/general-pest' },
    { label: 'Herbal', path: '/category/herbal' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-eco-gold' : 'text-eco-beige hover:text-eco-gold';
  };

  return (
    <header className="bg-eco-green text-eco-beige shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-eco-gold p-2 rounded-full text-eco-green group-hover:bg-white group-hover:text-eco-gold transition-colors">
              <ShieldCheck size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight">Pest Control Noida</h1>
              <p className="text-[10px] md:text-xs text-eco-gold uppercase tracking-widest block mt-0.5">Expert Pest Solutions • A Unit of Lex Hygiene India</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-sans font-medium text-lg transition-colors duration-300 ${isActive(item.path)}`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-eco-gold text-eco-green px-6 py-2 rounded font-bold hover:bg-white hover:text-eco-gold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-eco-gold focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 border-t border-eco-green/50 pt-4 pb-4 animate-slide-up bg-eco-green">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-xl font-medium py-2 px-4 hover:bg-white/5 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mx-4 bg-eco-gold text-eco-green px-6 py-3 rounded text-center font-bold mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;