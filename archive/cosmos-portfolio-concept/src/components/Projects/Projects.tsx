import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getDataPath } from '../../utils/paths';

interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  tech: string[];
  links: {
    live?: string;
    code?: string;
    demo?: string;
  };
  category: string;
  date: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
}

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch(getDataPath('projects.json'));
        if (!response.ok) {
          throw new Error('Failed to load projects data');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Auto-carousel functionality
  useEffect(() => {
    if (projects.length > 3) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex + 1 >= projects.length ? 0 : prevIndex + 1
        );
      }, 4000); // Change every 4 seconds

      return () => clearInterval(interval);
    }
  }, [projects.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= projects.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleMoreClick = (projectId: string) => {
    // Store current scroll position
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    navigate(`/project/${projectId}`);
  };

  const handleViewAllProjects = () => {
    // Store current scroll position
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    navigate('/projects');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'planned': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-cosmic-accent/20 text-cosmic-accent border-cosmic-accent/30';
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-cosmic-accent/20 rounded w-64 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-80 bg-cosmic-accent/10 rounded-xl"></div>
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
          <p className="text-red-400">Error loading projects: {error}</p>
        </div>
      </section>
    );
  }

  const visibleProjects = [];
  for (let i = 0; i < 3; i++) {
    const index = (currentIndex + i) % projects.length;
    if (projects[index]) {
      visibleProjects.push(projects[index]);
    }
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cosmic-accent to-cosmic-blue bg-clip-text text-transparent mb-6">
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cosmic-accent to-cosmic-blue mx-auto mb-4"></div>
          <p className="text-lg text-cosmic-light/70 max-w-3xl mx-auto mb-8">
            Showcasing innovative solutions and creative implementations
          </p>
          
          {/* View All Projects Button */}
          <motion.button
            onClick={handleViewAllProjects}
            className="bg-gradient-to-r from-cosmic-accent to-cosmic-blue text-cosmic-dark px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-cosmic-accent/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.button>
        </motion.div>

        {/* Projects Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          {projects.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-cosmic-dark/80 backdrop-blur-md border border-cosmic-accent/30 text-cosmic-accent p-3 rounded-full hover:bg-cosmic-accent hover:text-cosmic-dark transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-cosmic-dark/80 backdrop-blur-md border border-cosmic-accent/30 text-cosmic-accent p-3 rounded-full hover:bg-cosmic-accent hover:text-cosmic-dark transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={`${project.id}-${currentIndex}-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative"
                >
                  <div className="relative bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl overflow-hidden hover:border-cosmic-accent/40 transition-all duration-500 h-full">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image || "https://picsum.photos/400/300"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://picsum.photos/400/300";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cosmic-dark via-transparent to-transparent opacity-60"></div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                          {project.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4">
                          <div className="bg-gradient-to-r from-cosmic-accent to-cosmic-blue text-cosmic-dark px-3 py-1 rounded-full text-xs font-bold">
                            Featured
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-cosmic-accent text-sm font-medium">{project.category}</span>
                        <span className="text-cosmic-light/40 text-sm">{project.date}</span>
                      </div>

                      <h3 className="text-xl font-bold text-cosmic-light group-hover:text-cosmic-accent transition-colors duration-300 mb-3">
                        {project.title}
                      </h3>

                      <p className="text-cosmic-light/70 text-sm leading-relaxed mb-4 line-clamp-3">
                        {project.summary}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-cosmic-accent/10 text-cosmic-accent border border-cosmic-accent/20 rounded text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="px-2 py-1 bg-cosmic-light/10 text-cosmic-light/60 rounded text-xs">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {project.links.live && (
                          <motion.a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gradient-to-r from-cosmic-accent to-cosmic-blue text-cosmic-dark text-center py-2 px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-cosmic-accent/25 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Live
                          </motion.a>
                        )}
                        
                        {project.links.code && (
                          <motion.a
                            href={project.links.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 border border-cosmic-accent text-cosmic-accent text-center py-2 px-4 rounded-lg font-medium hover:bg-cosmic-accent hover:text-cosmic-dark transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Code
                          </motion.a>
                        )}

                        <motion.button
                          onClick={() => handleMoreClick(project.id)}
                          className="flex-1 border border-cosmic-blue text-cosmic-blue text-center py-2 px-4 rounded-lg font-medium hover:bg-cosmic-blue hover:text-cosmic-dark transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          More
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

        </div>
    
      </div>
    </section>
  );
};

export default Projects;
