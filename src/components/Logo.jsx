import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <motion.div 
      className={`${sizes[size]} ${className} relative`}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background Circle */}
        <motion.circle
          cx="50" cy="50" r="45"
          fill="url(#gradient1)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "backOut" }}
        />
        
        {/* African Pattern */}
        <motion.path
          d="M20 30 Q50 10 80 30 Q50 50 20 30"
          fill="url(#gradient2)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
        
        {/* Palm Leaf */}
        <motion.path
          d="M50 20 Q40 35 30 50 Q50 45 50 20 Q60 35 70 50 Q50 45 50 20"
          fill="#22c55e"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        
        {/* Bowl */}
        <motion.ellipse
          cx="50" cy="65" rx="25" ry="8"
          fill="url(#gradient3)"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        />
        
        {/* Steam */}
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M${45 + i * 5} 55 Q${47 + i * 5} 45 ${45 + i * 5} 35`}
            stroke="#fbbf24"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 1, 0],
              y: [0, -5, 0]
            }}
            transition={{ 
              duration: 2,
              delay: 1.2 + i * 0.2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        ))}
        
        {/* Gradients */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default Logo;