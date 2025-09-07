import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getDataPath } from '../../utils/paths';

interface Skill {
  name: string;
  icon: string;
}

interface TechCategory {
  category: string;
  skills: Skill[];
}

const TechStack: React.FC = () => {
  const [techStack, setTechStack] = useState<TechCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTechStack = async () => {
      try {
        const response = await fetch(getDataPath('techstack.json'));
        if (!response.ok) {
          throw new Error('Failed to load tech stack data');
        }
        const data = await response.json();
        setTechStack(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tech stack');
      } finally {
        setLoading(false);
      }
    };

    loadTechStack();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-cosmic-accent/20 rounded w-64 mx-auto mb-8"></div>
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-8 bg-cosmic-accent/10 rounded w-48 mx-auto"></div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[...Array(6)].map((_, j) => (
                      <div key={j} className="h-24 bg-cosmic-accent/5 rounded-lg"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-400">Error loading tech stack: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="techstack" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cosmic-accent to-cosmic-blue bg-clip-text text-transparent mb-6">
            Tech Stack
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cosmic-accent to-cosmic-blue mx-auto mb-4"></div>
          <p className="text-lg text-cosmic-light/70 max-w-3xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {techStack.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              variants={itemVariants}
              className="group relative"
            >
              {/* Category Card */}
              <div className="relative bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl p-6 h-full hover:border-cosmic-accent/40 transition-all duration-500 overflow-hidden">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-accent/5 via-transparent to-cosmic-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                {/* Floating Orbs */}
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 bg-cosmic-accent/60 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    delay: categoryIndex * 0.5,
                  }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-cosmic-blue/60 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    delay: categoryIndex * 0.5 + 1,
                  }}
                />
                
                <div className="relative z-10">
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-cosmic-light group-hover:text-cosmic-accent transition-colors duration-300">
                      {category.category}
                    </h3>
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-cosmic-accent rounded-full opacity-60"></div>
                      <div className="w-1 h-1 bg-cosmic-blue rounded-full opacity-60"></div>
                      <div className="w-1 h-1 bg-cosmic-accent rounded-full opacity-60"></div>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                          duration: 0.4,
                          ease: [0.6, -0.05, 0.01, 0.99]
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          y: -2,
                          transition: { duration: 0.2 }
                        }}
                        className="relative bg-cosmic-dark/60 backdrop-blur-sm border border-cosmic-accent/10 rounded-xl p-3 text-center hover:border-cosmic-accent/30 hover:shadow-lg hover:shadow-cosmic-accent/10 transition-all duration-300 cursor-pointer group/skill"
                      >
                        {/* Skill Icon */}
                        <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                          {skill.icon.endsWith('.svg') || skill.icon.endsWith('.png') ? (
                            <img
                              src={skill.icon}
                              alt={skill.name}
                              className="w-full h-full object-contain group-hover/skill:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const fallback = document.createElement('div');
                                fallback.className = 'w-8 h-8 bg-gradient-to-br from-cosmic-accent/30 to-cosmic-blue/30 rounded-lg flex items-center justify-center text-cosmic-accent font-bold text-xs';
                                fallback.textContent = skill.name.substring(0, 2).toUpperCase();
                                target.parentNode?.appendChild(fallback);
                              }}
                            />
                          ) : (
                            <div className="text-lg group-hover/skill:scale-110 transition-transform duration-300">{skill.icon}</div>
                          )}
                        </div>
                        
                        {/* Skill Name */}
                        <p className="text-xs font-medium text-cosmic-light/80 group-hover/skill:text-cosmic-accent transition-colors duration-300 leading-tight">
                          {skill.name}
                        </p>

                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cosmic-accent/10 to-cosmic-blue/10 rounded-xl opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"></div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Category Stats */}
                  <div className="mt-6 pt-4 border-t border-cosmic-accent/10">
                    <div className="flex justify-between items-center text-xs text-cosmic-light/60">
                      <span>{category.skills.length} technologies</span>
                      <div className="flex gap-1">
                        {Array.from({ length: Math.min(5, Math.ceil(category.skills.length / 2)) }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-1 bg-cosmic-accent/40 rounded-full"
                            animate={{
                              opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 2,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
