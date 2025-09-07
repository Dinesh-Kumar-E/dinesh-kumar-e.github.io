import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  
  const roles = [
    'ML Engineer',
    'Web Developer', 
    'Researcher',
    'Problem Solver'
  ];

  useEffect(() => {
    const currentText = roles[currentRole];
    
    if (isTyping) {
      // Typing effect
      if (charIndex < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 150); // Typing speed
        return () => clearTimeout(timeout);
      } else {
        // Pause before backspacing
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Pause duration
        return () => clearTimeout(timeout);
      }
    } else {
      // Backspacing effect
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 100); // Backspace speed
        return () => clearTimeout(timeout);
      } else {
        // Move to next role
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }
  }, [currentRole, charIndex, isTyping, roles]);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        className="text-center z-10 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl text-cosmic-accent font-medium mb-2">
            Hello, I'm
          </h2>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cosmic-light via-cosmic-accent to-cosmic-blue bg-clip-text text-transparent">
            Dinesh Kumar E
          </h1>
        </motion.div>

        {/* Rotating Tagline with Typewriter Effect */}
        <motion.div
          variants={itemVariants}
          className="mb-8 h-16 sm:h-20 flex items-center justify-center"
        >
          <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-cosmic-light">
            {displayText}
            <span className="animate-pulse text-cosmic-accent">|</span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-cosmic-light/80 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Passionate about creating intelligent solutions that bridge the gap between 
          cutting-edge technology and real-world applications. Specializing in machine learning, 
          web development, and research-driven innovation.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={() => scrollToSection('#projects')}
            className="bg-gradient-to-r from-cosmic-accent to-cosmic-blue text-cosmic-dark px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg hover:shadow-cosmic-accent/25 transition-all duration-300 w-full sm:w-auto"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.button>
          
          <motion.button
            onClick={() => scrollToSection('#contact')}
            className="border-2 border-cosmic-accent text-cosmic-accent px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cosmic-accent hover:text-cosmic-dark transition-all duration-300 w-full sm:w-auto"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-cosmic-accent cursor-pointer"
            onClick={() => scrollToSection('#about')}
          >
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <p className="text-sm mt-2">Scroll Down</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-cosmic-accent rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            delay: 0,
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-cosmic-blue rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-cosmic-light rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            delay: 2,
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
