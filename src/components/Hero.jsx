import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: '/images/pate-rouge-plat-traditionnel-du-benin-e1686128990385.webp',
      title: 'Saveurs Authentiques du Bénin',
      subtitle: 'Découvrez la richesse de la cuisine béninoise à Cotonou'
    },
    {
      image: '/images/Riz-aux-haricots-blancs.webp',
      title: 'Plats Traditionnels',
      subtitle: 'Préparés avec amour selon les recettes ancestrales'
    },
    {
      image: '/images/Aloko.webp',
      title: 'Spécialités Locales',
      subtitle: 'Un voyage gastronomique au cœur du Bénin'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ 
            scale: index === currentSlide ? 1 : 1.1,
            opacity: index === currentSlide ? 1 : 0
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
            animate={{ 
              scale: index === currentSlide ? [1, 1.05, 1] : 1
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"
            animate={{
              background: [
                "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5), rgba(0,0,0,0.7))",
                "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(0,0,0,0.8))",
                "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5), rgba(0,0,0,0.7))"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      ))}
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.h1 
              className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold leading-tight relative"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
                textShadow: [
                  "0 0 20px rgba(251, 146, 60, 0.3)",
                  "0 0 40px rgba(251, 146, 60, 0.5)",
                  "0 0 20px rgba(251, 146, 60, 0.3)"
                ]
              }}
              transition={{ 
                delay: 0.3, 
                duration: 1.2,
                textShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 30px rgba(251, 146, 60, 0.8)"
              }}
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="bg-gradient-to-r from-white via-orange-200 to-white bg-[length:200%_100%] bg-clip-text text-transparent"
              >
                {slides[currentSlide].title}
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-2xl mx-auto relative"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                filter: "blur(0px)",
                textShadow: "0 2px 10px rgba(0,0,0,0.5)"
              }}
              transition={{ delay: 0.6, duration: 1 }}
              whileHover={{ 
                scale: 1.02,
                color: "#fed7aa",
                textShadow: "0 0 15px rgba(251, 146, 60, 0.5)"
              }}
            >
              <motion.span
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {slides[currentSlide].subtitle}
              </motion.span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.9, duration: 1, ease: "backOut" }}
            >
              <motion.button
                onClick={() => scrollToSection('menu')}
                className="relative btn-primary text-lg px-10 py-4 overflow-hidden group"
                initial={{ boxShadow: "0 4px 15px rgba(251, 146, 60, 0.3)" }}
                whileHover={{ 
                  scale: 1.08,
                  boxShadow: [
                    "0 4px 15px rgba(251, 146, 60, 0.3)",
                    "0 8px 25px rgba(251, 146, 60, 0.6)",
                    "0 4px 15px rgba(251, 146, 60, 0.3)"
                  ],
                  y: -2
                }}
                whileTap={{ scale: 0.95, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  boxShadow: { duration: 1.5, repeat: Infinity }
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Découvrir le Menu</span>
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="relative text-lg px-10 py-4 text-white border-2 border-white rounded-full font-semibold overflow-hidden group backdrop-blur-sm"
                initial={{ 
                  background: "rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 4px 15px rgba(255, 255, 255, 0.2)"
                }}
                whileHover={{ 
                  scale: 1.08,
                  background: "rgba(255, 255, 255, 0.95)",
                  color: "#ea580c",
                  boxShadow: [
                    "0 4px 15px rgba(255, 255, 255, 0.2)",
                    "0 8px 25px rgba(255, 255, 255, 0.4)",
                    "0 4px 15px rgba(255, 255, 255, 0.2)"
                  ],
                  y: -2
                }}
                whileTap={{ scale: 0.95, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  boxShadow: { duration: 1.5, repeat: Infinity }
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0, borderRadius: "50%" }}
                  whileHover={{ scale: 1, borderRadius: "0%" }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10">Réserver une Table</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-400 transition-colors duration-200 z-20"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-400 transition-colors duration-200 z-20"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-orange-500 scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-8 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">Scroll</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;