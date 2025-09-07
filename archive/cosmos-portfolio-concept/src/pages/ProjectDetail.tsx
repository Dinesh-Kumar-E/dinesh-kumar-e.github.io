import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getDataPath } from '../utils/paths';

interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  tech: string[];
  links: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  category: string;
  status: string;
  date: string;
  featured: boolean;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await fetch(getDataPath('projects.json'));
        if (!response.ok) {
          throw new Error('Failed to load projects data');
        }
        const projects: Project[] = await response.json();
        const foundProject = projects.find(p => p.id === id);
        
        if (!foundProject) {
          setError('Project not found');
        } else {
          setProject(foundProject);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProject();
    }
  }, [id]);

  // Convert markdown-like syntax to HTML
  const formatDescription = (description: string) => {
    return description
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-cosmic-light mb-6">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-cosmic-accent mb-4 mt-8">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-cosmic-blue mb-3 mt-6">$1</h3>')
      .replace(/^\*\*(.*?)\*\*/gm, '<strong class="font-bold text-cosmic-accent">$1</strong>')
      .replace(/^- (.*$)/gm, '<li class="text-cosmic-light/80 mb-2">$1</li>')
      .replace(/\n\n/g, '</p><p class="text-cosmic-light/70 leading-relaxed mb-4">')
      .replace(/^(?!<[h|l])/gm, '<p class="text-cosmic-light/70 leading-relaxed mb-4">')
      .replace(/(<li.*<\/li>)/gs, '<ul class="list-disc list-inside space-y-2 mb-6 ml-4">$1</ul>');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cosmic-dark text-cosmic-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cosmic-accent mx-auto mb-4"></div>
          <p className="text-cosmic-light/70">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-cosmic-dark text-cosmic-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-cosmic-accent mb-4">Project Not Found</h1>
          <p className="text-cosmic-light/70 mb-8">{error}</p>
          <motion.button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-cosmic-accent to-cosmic-blue text-cosmic-dark px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-cosmic-accent/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Portfolio
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-dark text-cosmic-light">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-cosmic-dark/80 backdrop-blur-md border-b border-cosmic-accent/20 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-cosmic-accent hover:text-cosmic-blue transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </motion.button>
          
          <div className="flex items-center gap-4">
            {Object.entries(project.links).map(([key, url]) => (
              <motion.a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cosmic-accent hover:text-cosmic-blue transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                {key === 'github' && (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                )}
                {key === 'demo' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
                {key === 'docs' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero Section */}
            <div className="mb-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-cosmic-accent/20 text-cosmic-accent border border-cosmic-accent/30 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : project.status === 'in-progress'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-cosmic-light/40">{project.date}</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cosmic-accent to-cosmic-blue bg-clip-text text-transparent mb-6">
                    {project.title}
                  </h1>
                  
                  <p className="text-xl text-cosmic-light/80 leading-relaxed mb-8">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-cosmic-accent/10 text-cosmic-accent border border-cosmic-accent/20 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-80 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMWEyMDMzIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE2MCAzMEwyMDAgMTBMMjQwIDMwTDIwMCAxNTBaIiBmaWxsPSIjNjRmZmRhIi8+CjwvZz4=';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cosmic-dark/60 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl p-8">
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: formatDescription(project.description) }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
