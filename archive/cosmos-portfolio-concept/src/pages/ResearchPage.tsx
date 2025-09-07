import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataPath } from '../utils/paths';

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

const ResearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { researchId } = useParams();
  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

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

  // Scroll to research if researchId is provided
  useEffect(() => {
    if (researchId && research.length > 0) {
      const element = document.getElementById(researchId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [researchId, research]);

  const statuses = ['all', ...Array.from(new Set(research.map(r => r.status)))];
  const filteredResearch = selectedStatus === 'all' 
    ? research 
    : research.filter(r => r.status === selectedStatus);

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
      <div className="min-h-screen bg-cosmic-dark py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-cosmic-accent/20 rounded w-64 mx-auto"></div>
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-cosmic-accent/10 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cosmic-dark py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-400">Error loading research: {error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-cosmic-accent text-cosmic-dark px-6 py-2 rounded-lg hover:bg-cosmic-accent/80 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-dark py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => navigate('/')}
              className="text-cosmic-accent hover:text-cosmic-light transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cosmic-accent to-cosmic-blue bg-clip-text text-transparent">
              All Research
            </h1>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-cosmic-accent to-cosmic-blue mx-auto mb-4"></div>
          <p className="text-lg text-cosmic-light/70 max-w-3xl mx-auto">
            Comprehensive collection of research publications and ongoing projects
          </p>
        </motion.div>

        {/* Status Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize ${
                selectedStatus === status
                  ? 'bg-gradient-to-r from-cosmic-accent to-cosmic-blue text-cosmic-dark shadow-lg shadow-cosmic-accent/25'
                  : 'bg-cosmic-dark/40 border border-cosmic-accent/20 text-cosmic-light hover:border-cosmic-accent/40 hover:text-cosmic-accent'
              }`}
            >
              {status.replace('-', ' ')}
            </button>
          ))}
        </motion.div>

        {/* Research List */}
        <div className="space-y-8 mb-16">
          {filteredResearch.map((item, index) => (
            <motion.div
              key={item.id}
              id={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`group relative ${researchId === item.id ? 'ring-2 ring-cosmic-accent rounded-2xl' : ''}`}
            >
              <div className="relative bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl overflow-hidden hover:border-cosmic-accent/40 transition-all duration-500 p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Research Icon/Visual */}
                  <div className="lg:w-1/4 flex-shrink-0">
                    <div className="bg-gradient-to-br from-cosmic-accent/20 to-cosmic-blue/20 rounded-2xl p-8 text-center border border-cosmic-accent/30">
                      <svg className="w-16 h-16 mx-auto text-cosmic-accent mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      
                      {/* Status Badge */}
                      <div className={`inline-flex px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(item.status)}`}>
                        {item.status.replace('-', ' ').toUpperCase()}
                      </div>
                      
                      {/* Featured Badge */}
                      {item.featured && (
                        <div className="mt-3">
                          <div className="bg-gradient-to-r from-cosmic-accent to-cosmic-blue text-cosmic-dark px-3 py-1 rounded-full text-xs font-bold">
                            Featured
                          </div>
                        </div>
                      )}

                      {/* Citations */}
                      {item.citations && (
                        <div className="mt-3 text-cosmic-light/60 text-sm">
                          <span className="text-cosmic-accent font-bold">{item.citations}</span> citations
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-3/4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                      <div className="flex items-center gap-4 mb-2 lg:mb-0">
                        <span className="text-cosmic-light/40 text-sm">{item.date}</span>
                        <span className="text-cosmic-blue text-sm font-medium">{item.venue}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-cosmic-light group-hover:text-cosmic-accent transition-colors duration-300 mb-4">
                      {item.title}
                    </h3>

                    {/* Authors */}
                    <div className="text-cosmic-light/80 text-base mb-4">
                      <span className="font-medium">Authors: </span>
                      {item.authors.join(', ')}
                    </div>

                    <p className="text-cosmic-light/80 text-base leading-relaxed mb-6">
                      {item.summary}
                    </p>

                    {/* Detailed Description */}
                    <div className="text-cosmic-light/70 text-sm leading-relaxed mb-6 prose prose-invert max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: item.description.replace(/\n/g, '<br/>') }} />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-cosmic-accent/10 text-cosmic-accent border border-cosmic-accent/20 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      {item.links.paper && (
                        <motion.a
                          href={item.links.paper}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-cosmic-accent to-cosmic-blue text-cosmic-dark px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-cosmic-accent/25 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          Read Paper
                        </motion.a>
                      )}

                      {item.links.code && (
                        <motion.a
                          href={item.links.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border-2 border-cosmic-accent text-cosmic-accent px-6 py-3 rounded-lg font-medium hover:bg-cosmic-accent hover:text-cosmic-dark transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                          View Code
                        </motion.a>
                      )}

                      {item.links.demo && (
                        <motion.a
                          href={item.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border border-cosmic-blue text-cosmic-blue px-6 py-3 rounded-lg font-medium hover:bg-cosmic-blue hover:text-cosmic-dark transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 100-5 2.5 2.5 0 00-2.5 2.5V9zm4.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                          Live Demo
                        </motion.a>
                      )}

                      {item.links.presentation && (
                        <motion.a
                          href={item.links.presentation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border border-cosmic-accent/50 text-cosmic-accent/70 px-6 py-3 rounded-lg font-medium hover:bg-cosmic-accent/10 hover:text-cosmic-accent transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 18h14l-2-18M8 8h8M8 12h8" />
                          </svg>
                          Presentation
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Research Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="text-center bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl p-6">
            <div className="text-3xl font-bold text-cosmic-accent mb-2">{research.length}</div>
            <div className="text-cosmic-light/70">Total Research</div>
          </div>
          
          <div className="text-center bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl p-6">
            <div className="text-3xl font-bold text-cosmic-blue mb-2">
              {research.filter(r => r.status === 'published').length}
            </div>
            <div className="text-cosmic-light/70">Published</div>
          </div>
          
          <div className="text-center bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl p-6">
            <div className="text-3xl font-bold text-cosmic-accent mb-2">
              {research.filter(r => r.featured).length}
            </div>
            <div className="text-cosmic-light/70">Featured</div>
          </div>
          
          <div className="text-center bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl p-6">
            <div className="text-3xl font-bold text-cosmic-blue mb-2">
              {research.reduce((sum, r) => sum + (r.citations || 0), 0)}
            </div>
            <div className="text-cosmic-light/70">Total Citations</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResearchPage;
