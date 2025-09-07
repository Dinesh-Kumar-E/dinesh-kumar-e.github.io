import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataPath } from '../utils/paths';

interface Achievement {
  id: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  tech: string[];
  links: {
    certificate?: string;
    media?: string;
    leaderboard?: string;
    paper?: string;
    github?: string;
    presentation?: string;
  };
  category: string;
  date: string;
  featured: boolean;
}

const AchievementsPage: React.FC = () => {
  const navigate = useNavigate();
  const { achievementId } = useParams();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const response = await fetch(getDataPath('achievements.json'));
        if (!response.ok) {
          throw new Error('Failed to load achievements data');
        }
        const data = await response.json();
        setAchievements(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load achievements');
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, []);

  // Scroll to achievement if achievementId is provided
  useEffect(() => {
    if (achievementId && achievements.length > 0) {
      const element = document.getElementById(achievementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [achievementId, achievements]);

  const categories = ['all', ...Array.from(new Set(achievements.map(a => a.category)))];
  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'competitive programming':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'research':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      case 'hackathon':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
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
          <p className="text-red-400">Error loading achievements: {error}</p>
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
              All Achievements
            </h1>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-cosmic-accent to-cosmic-blue mx-auto mb-4"></div>
          <p className="text-lg text-cosmic-light/70 max-w-3xl mx-auto">
            Recognition and accomplishments in competitive programming, research, and innovation
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

        {/* Achievements List */}
        <div className="space-y-8 mb-16">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              id={achievement.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`group relative ${achievementId === achievement.id ? 'ring-2 ring-cosmic-accent rounded-2xl' : ''}`}
            >
              <div className="relative bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl overflow-hidden hover:border-cosmic-accent/40 transition-all duration-500">
                <div className="flex flex-col lg:flex-row">
                  {/* Achievement Image */}
                  <div className="relative lg:w-1/3 h-64 lg:h-auto overflow-hidden">
                    <img
                      src={achievement.image || "https://picsum.photos/400/300"}
                      alt={achievement.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://picsum.photos/400/300";
                      }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cosmic-dark/60 via-transparent to-transparent lg:bg-gradient-to-t lg:from-cosmic-dark lg:via-transparent lg:to-transparent"></div>
                    
                    {/* Category Icon */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-cosmic-accent/20 backdrop-blur-md border border-cosmic-accent/30 text-cosmic-accent p-3 rounded-lg">
                        {getCategoryIcon(achievement.category)}
                      </div>
                    </div>

                    {/* Featured Badge */}
                    {achievement.featured && (
                      <div className="absolute top-4 right-4">
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
                          {achievement.category}
                        </span>
                        <span className="text-cosmic-light/40 text-sm">{achievement.date}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-cosmic-light group-hover:text-cosmic-accent transition-colors duration-300 mb-4">
                      {achievement.title}
                    </h3>

                    <p className="text-cosmic-light/80 text-base leading-relaxed mb-6">
                      {achievement.summary}
                    </p>

                    {/* Detailed Description */}
                    <div className="text-cosmic-light/70 text-sm leading-relaxed mb-6 prose prose-invert max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: achievement.description.replace(/\n/g, '<br/>') }} />
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {achievement.tech.map((tech) => (
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
                      {achievement.links.certificate && (
                        <motion.a
                          href={achievement.links.certificate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-cosmic-accent to-cosmic-blue text-cosmic-dark px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-cosmic-accent/25 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          Certificate
                        </motion.a>
                      )}

                      {achievement.links.media && (
                        <motion.a
                          href={achievement.links.media}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border-2 border-cosmic-accent text-cosmic-accent px-6 py-3 rounded-lg font-medium hover:bg-cosmic-accent hover:text-cosmic-dark transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Media
                        </motion.a>
                      )}

                      {achievement.links.leaderboard && (
                        <motion.a
                          href={achievement.links.leaderboard}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border border-cosmic-blue text-cosmic-blue px-6 py-3 rounded-lg font-medium hover:bg-cosmic-blue hover:text-cosmic-dark transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          Leaderboard
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl p-6">
            <div className="text-3xl font-bold text-cosmic-accent mb-2">{achievements.length}</div>
            <div className="text-cosmic-light/70">Total Achievements</div>
          </div>
          
          <div className="text-center bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl p-6">
            <div className="text-3xl font-bold text-cosmic-blue mb-2">
              {achievements.filter(a => a.featured).length}
            </div>
            <div className="text-cosmic-light/70">Featured</div>
          </div>
          
          <div className="text-center bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl p-6">
            <div className="text-3xl font-bold text-cosmic-accent mb-2">
              {Array.from(new Set(achievements.map(a => a.category))).length}
            </div>
            <div className="text-cosmic-light/70">Categories</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AchievementsPage;
