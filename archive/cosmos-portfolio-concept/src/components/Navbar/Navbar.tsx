import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Research', href: '#research' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state for background blur
      setIsScrolled(currentScrollY > 50);
      
      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Close mobile menu when hiding
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        // Scrolling up or near top - show navbar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 rounded-full ${
        isScrolled 
          ? 'bg-black/30 backdrop-blur-xl border border-cosmic-accent/20 shadow-lg shadow-cosmic-accent/5' 
          : 'bg-black/10 backdrop-blur-lg border border-white/5'
      }`}
    >
      <div className="px-6 py-2">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={() => scrollToSection('#hero')}
              className="flex items-center"
            >
              <img
                src="../Assets/boy.png"
                alt="Portfolio Logo"
                className="h-8 w-8 object-contain rounded-full"
                onError={(e) => {
                  // Fallback if image doesn't load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'h-8 w-8 bg-gradient-to-r from-cosmic-accent to-cosmic-blue rounded-full flex items-center justify-center text-cosmic-dark font-bold text-sm';
                  fallback.textContent = 'D';
                  target.parentNode?.appendChild(fallback);
                }}
              />
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-cosmic-light/90 hover:text-cosmic-accent px-3 py-1.5 text-sm font-medium transition-colors duration-200 relative group rounded-full"
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-cosmic-accent transition-all duration-300 group-hover:w-full rounded-full"></span>
              </motion.button>
            ))}
            
            {/* Resume Button */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-cosmic-accent to-cosmic-blue text-cosmic-dark px-4 py-1.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-cosmic-accent/25 transition-all duration-300 ml-2"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-cosmic-light hover:text-cosmic-accent p-1.5 rounded-full hover:bg-cosmic-accent/10 transition-colors duration-200"
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="h-5 w-5"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-black/40 backdrop-blur-xl border border-cosmic-accent/20 rounded-2xl shadow-lg shadow-cosmic-accent/10 overflow-hidden"
          >
            <div className="px-3 py-3 space-y-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-cosmic-light/90 hover:text-cosmic-accent block px-3 py-2 text-sm font-medium w-full text-left transition-colors duration-200 rounded-xl hover:bg-cosmic-accent/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-cosmic-accent to-cosmic-blue text-cosmic-dark px-3 py-2 rounded-xl text-sm font-semibold block text-center mt-3 hover:shadow-lg hover:shadow-cosmic-accent/25 transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
