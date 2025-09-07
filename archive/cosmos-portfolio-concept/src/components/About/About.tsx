import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cosmic-accent to-cosmic-blue bg-clip-text text-transparent mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cosmic-accent to-cosmic-blue mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-cosmic-accent/30 shadow-2xl shadow-cosmic-accent/20">
                <img
                  src="../Assets/boy.png"
                  alt="Dinesh Kumar E"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-cosmic-accent rounded-full"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-cosmic-blue rounded-full"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  delay: 1,
                }}
              />
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-cosmic-light mb-4">
              Passionate Tech Innovator & Problem Solver
            </h3>
            
            <p className="text-lg text-cosmic-light/80 leading-relaxed">
              I'm a dedicated Machine Learning Engineer and Full-Stack Developer with a passion for 
              creating intelligent solutions that make a real-world impact. With expertise spanning 
              from cutting-edge AI research to scalable web applications, I bridge the gap between 
              theoretical innovation and practical implementation.
            </p>

            <p className="text-lg text-cosmic-light/80 leading-relaxed">
              My journey in technology is driven by curiosity and a commitment to continuous learning. 
              I thrive on solving complex problems, whether it's optimizing neural network architectures, 
              building responsive user interfaces, or conducting research that pushes the boundaries 
              of what's possible with AI.
            </p>

            <p className="text-lg text-cosmic-light/80 leading-relaxed">
              When I'm not coding or researching, you'll find me contributing to open-source projects, 
              mentoring aspiring developers, or exploring the latest advancements in quantum computing 
              and multimodal AI systems.
            </p>

            {/* Resume Button */}
            <motion.div
              className="pt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cosmic-accent to-cosmic-blue text-cosmic-dark px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cosmic-accent/25 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
