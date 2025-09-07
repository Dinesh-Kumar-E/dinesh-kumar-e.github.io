import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getDataPath } from '../../utils/paths';

interface Research {
  id: string;
  title: string;
  summary: string;
  description: string;
  authors: string[];
  venue: string;
  date: string;
  status: 'published' | 'under-review' | 'draft';
  tags: string[];
  links: {
    paper?: string;
    code?: string;
    demo?: string;
    presentation?: string;
  };
  citations?: number;
  featured: boolean;
}

const Research: React.FC = () => {
  const navigate = useNavigate();
  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedResearch, setSelectedResearch] = useState<Research | null>(null);

  useEffect(() => {
    const loadResearch = async () => {
      try {
        const response = await fetch(getDataPath('research.json'));
        if (!response.ok) {
          throw new Error('Failed to load research data');
        }
        const data = await response.json();
        setResearch(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load research');
      } finally {
        setLoading(false);
      }
    };

    loadResearch();
  }, []);

  // Auto-carousel functionality
  useEffect(() => {
    if (research.length > 3) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex + 1 >= research.length ? 0 : prevIndex + 1
        );
      }, 4000); // Change every 4 seconds

      return () => clearInterval(interval);
    }
  }, [research.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= research.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? research.length - 1 : prevIndex - 1
    );
  };

  const handleViewAllResearch = () => {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    navigate('/research');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'under-review': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'draft': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
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
          <p className="text-red-400">Error loading research: {error}</p>
        </div>
      </section>
    );
  }

  const visibleResearch = [];
  for (let i = 0; i < 3; i++) {
    const index = (currentIndex + i) % research.length;
    if (research[index]) {
      visibleResearch.push(research[index]);
    }
  }

  return (
    <section id="research" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cosmic-accent to-cosmic-blue bg-clip-text text-transparent mb-6">
            Research & Publications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cosmic-accent to-cosmic-blue mx-auto mb-4"></div>
          <p className="text-lg text-cosmic-light/70 max-w-3xl mx-auto mb-8">
            Exploring the frontiers of AI, machine learning, and innovative technology solutions
          </p>
          
          <motion.button
            onClick={handleViewAllResearch}
            className="bg-gradient-to-r from-cosmic-accent to-cosmic-blue text-cosmic-dark px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-cosmic-accent/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Research
          </motion.button>
        </motion.div>

        <div className="relative">
          {research.length > 3 && (
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

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {visibleResearch.map((item, index) => (
                <motion.div
                  key={`${item.id}-${currentIndex}-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative"
                >
                  <div className="relative bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl overflow-hidden hover:border-cosmic-accent/40 transition-all duration-500 h-full">
                    <div className="relative bg-gradient-to-br from-cosmic-accent/10 to-cosmic-blue/10 p-6 border-b border-cosmic-accent/20">
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                          {item.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>

                      {item.featured && (
                        <div className="absolute top-4 left-4">
                          <div className="bg-gradient-to-r from-cosmic-accent to-cosmic-blue text-cosmic-dark px-3 py-1 rounded-full text-xs font-bold">
                            Featured
                          </div>
                        </div>
                      )}

                      <div className="mt-6">
                        <h3 className="text-xl font-bold text-cosmic-light group-hover:text-cosmic-accent transition-colors duration-300 mb-3 line-clamp-2">
                          {item.title}
                        </h3>

                        <div className="flex items-center gap-2 text-cosmic-light/60 text-sm mb-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {item.date}
                        </div>

                        <div className="flex items-center gap-2 text-cosmic-accent text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-6m-2-5.5v3m0 0v3.5m0-3.5h-3m3 0h3" />
                          </svg>
                          {item.venue}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-cosmic-light/70 text-sm leading-relaxed mb-4 line-clamp-3">
                        {item.summary}
                      </p>

                      <div className="mb-4">
                        <p className="text-cosmic-light/60 text-xs mb-1">Authors:</p>
                        <p className="text-cosmic-light text-sm line-clamp-2">
                          {item.authors.join(', ')}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-cosmic-accent/10 text-cosmic-accent border border-cosmic-accent/20 rounded text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="px-2 py-1 bg-cosmic-light/10 text-cosmic-light/60 rounded text-xs">
                            +{item.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {item.citations && (
                        <div className="flex items-center gap-2 text-cosmic-blue text-sm mb-4">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {item.citations} Citations
                        </div>
                      )}

                      <div className="flex gap-3">
                        {item.links.paper && (
                          <motion.a
                            href={item.links.paper}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gradient-to-r from-cosmic-accent to-cosmic-blue text-cosmic-dark text-center py-2 px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-cosmic-accent/25 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Paper
                          </motion.a>
                        )}

                        {item.links.code && (
                          <motion.a
                            href={item.links.code}
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
                          onClick={() => setSelectedResearch(item)}
                          className="flex-1 border border-cosmic-blue text-cosmic-blue text-center py-2 px-4 rounded-lg font-medium hover:bg-cosmic-blue hover:text-cosmic-dark transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Details
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {research.length > 3 && (
            <div className="flex justify-center mt-8 space-x-2">
              {research.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-cosmic-accent scale-125'
                      : 'bg-cosmic-accent/30 hover:bg-cosmic-accent/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedResearch && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-cosmic-dark border border-cosmic-accent/30 rounded-2xl max-w-4xl max-h-[80vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-cosmic-light">{selectedResearch.title}</h3>
                <button
                  onClick={() => setSelectedResearch(null)}
                  className="text-cosmic-light/60 hover:text-cosmic-accent transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: selectedResearch.description.replace(/\n/g, '<br/>') }} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Research;
