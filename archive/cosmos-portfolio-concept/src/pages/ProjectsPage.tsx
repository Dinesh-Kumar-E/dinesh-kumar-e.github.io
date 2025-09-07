import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataPath } from '../utils/paths';

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

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  // Scroll to project if projectId is provided
  useEffect(() => {
    if (projectId && projects.length > 0) {
      const element = document.getElementById(projectId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [projectId, projects]);

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

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
      <div className="min-h-screen bg-cosmic-dark py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-cosmic-accent/20 rounded w-64 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-cosmic-accent/10 rounded-xl"></div>
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
          <p className="text-red-400">Error loading projects: {error}</p>
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
              All Projects
            </h1>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-cosmic-accent to-cosmic-blue mx-auto mb-4"></div>
          <p className="text-lg text-cosmic-light/70 max-w-3xl mx-auto">
            Complete collection of innovative solutions and creative implementations
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cosmic-accent to-cosmic-blue text-cosmic-dark shadow-lg shadow-cosmic-accent/25'
                  : 'bg-cosmic-dark/40 border border-cosmic-accent/20 text-cosmic-light hover:border-cosmic-accent/40 hover:text-cosmic-accent'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects List */}
        <div className="space-y-8 mb-16">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              id={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`group relative ${projectId === project.id ? 'ring-2 ring-cosmic-accent rounded-2xl' : ''}`}
            >
              <div className="relative bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl overflow-hidden hover:border-cosmic-accent/40 transition-all duration-500">
                <div className="flex flex-col lg:flex-row">
                  {/* Project Image */}
                  <div className="relative lg:w-1/3 h-64 lg:h-auto overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMWEyMDMzIi8+CjxwYXRoIGQ9Ik0yMDAgMTAwTDE2MCA4MEwyMDAgNjBMMjQwIDgwTDIwMCAxMDBaIiBmaWxsPSIjNjRmZmRhIi8+PC9zdmc+';
                      }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cosmic-dark/60 via-transparent to-transparent lg:bg-gradient-to-t lg:from-cosmic-dark lg:via-transparent lg:to-transparent"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status.replace('-', ' ').toUpperCase()}
                      </div>
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
                  <div className="lg:w-2/3 p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                      <div className="flex items-center gap-4 mb-2 lg:mb-0">
                        <span className="text-cosmic-accent text-sm font-medium bg-cosmic-accent/10 px-3 py-1 rounded-full">
                          {project.category}
                        </span>
                        <span className="text-cosmic-light/40 text-sm">{project.date}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-cosmic-light group-hover:text-cosmic-accent transition-colors duration-300 mb-4">
                      {project.title}
                    </h3>

                    <p className="text-cosmic-light/80 text-base leading-relaxed mb-6">
                      {project.summary}
                    </p>

                    {/* Detailed Description */}
                    <div className="text-cosmic-light/70 text-sm leading-relaxed mb-6 prose prose-invert max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: project.description.replace(/\n/g, '<br/>') }} />
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-cosmic-accent/10 text-cosmic-accent border border-cosmic-accent/20 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      {project.links.live && (
                        <motion.a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-cosmic-accent to-cosmic-blue text-cosmic-dark px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-cosmic-accent/25 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live Demo
                        </motion.a>
                      )}
                      
                      {project.links.code && (
                        <motion.a
                          href={project.links.code}
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

                      <motion.button
                        onClick={() => navigate(`/project/${project.id}`)}
                        className="inline-flex items-center gap-2 border border-cosmic-blue text-cosmic-blue px-6 py-3 rounded-lg font-medium hover:bg-cosmic-blue hover:text-cosmic-dark transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        More Details
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="text-center bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl p-6">
            <div className="text-3xl font-bold text-cosmic-accent mb-2">{projects.length}</div>
            <div className="text-cosmic-light/70">Total Projects</div>
          </div>
          
          <div className="text-center bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl p-6">
            <div className="text-3xl font-bold text-cosmic-blue mb-2">
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-cosmic-light/70">Completed</div>
          </div>
          
          <div className="text-center bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl p-6">
            <div className="text-3xl font-bold text-cosmic-accent mb-2">
              {projects.filter(p => p.featured).length}
            </div>
            <div className="text-cosmic-light/70">Featured</div>
          </div>
          
          <div className="text-center bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl p-6">
            <div className="text-3xl font-bold text-cosmic-blue mb-2">
              {Array.from(new Set(projects.flatMap(p => p.tech))).length}
            </div>
            <div className="text-cosmic-light/70">Technologies</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPage;
