import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0 flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center space-x-3">
              <Logo size="md" />
              <span className={`font-playfair text-2xl font-bold ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                AfriFood
              </span>
            </div>
          </motion.div>

          {/* Navigation Desktop */}
          <div className="hidden md:flex space-x-8">
            {['Accueil', 'À Propos', 'Menu', 'Galerie', 'Contact'].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item === 'Accueil' ? 'hero' : item.toLowerCase().replace('à propos', 'about').replace('é', 'e'))}
                className={`font-medium transition-colors duration-200 hover:text-orange-600 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
              </motion.button>
            ))}
          </div>

          {/* Bouton Réservation */}
          <motion.button
            onClick={() => scrollToSection('contact')}
            className="hidden md:block btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Réserver
          </motion.button>

          {/* Menu Mobile */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-6 h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-gray-900' : 'bg-white'
              } ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-6 h-0.5 mt-1 transition-all duration-300 ${
                isScrolled ? 'bg-gray-900' : 'bg-white'
              } ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 mt-1 transition-all duration-300 ${
                isScrolled ? 'bg-gray-900' : 'bg-white'
              } ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Menu Mobile Dropdown */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          className="md:hidden overflow-hidden bg-white shadow-lg rounded-b-lg"
        >
          <div className="px-4 py-6 space-y-4">
            {['Accueil', 'À Propos', 'Menu', 'Galerie', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item === 'Accueil' ? 'hero' : item.toLowerCase().replace('à propos', 'about').replace('é', 'e'))}
                className="block w-full text-left text-gray-900 hover:text-orange-600 font-medium py-2"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full btn-primary mt-4"
            >
              Réserver
            </button>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Header;