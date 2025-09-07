import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import educationData from '../../data/education.json';

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  endYear: string;
  grade?: string;
  description: string;
  type: 'university' | 'college' | 'certification' | 'online';
}

const Education: React.FC = () => {
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEducation = async () => {
      try {
        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        setEducation(educationData as EducationItem[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load education');
      } finally {
        setLoading(false);
      }
    };

    loadEducation();
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'university':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'college':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'certification':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-cosmic-accent/20 rounded w-64 mx-auto"></div>
            <div className="space-y-16">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-6 h-6 bg-cosmic-accent/20 rounded-full"></div>
                  <div className="ml-20 flex-1">
                    <div className="h-32 bg-cosmic-accent/10 rounded-xl"></div>
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
          <p className="text-red-400">Error loading education: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Education Cards - One per row */}
        <div className="space-y-8 mb-16">
          {education.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative bg-cosmic-dark/40 backdrop-blur-md border border-cosmic-accent/20 rounded-2xl overflow-hidden hover:border-cosmic-accent/40 transition-all duration-500">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-accent/5 via-transparent to-cosmic-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Left Section - Type Icon and Grade */}
                    <div className="lg:w-1/4 flex-shrink-0">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-4 bg-cosmic-accent/20 rounded-2xl text-cosmic-accent">
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="text-cosmic-accent font-medium text-sm capitalize">
                          {item.type}
                        </div>
                        {item.grade && (
                          <div className="bg-gradient-to-r from-cosmic-accent/10 to-cosmic-blue/10 border border-cosmic-accent/20 rounded-lg p-3 w-full">
                            <div className="text-cosmic-accent font-bold text-xl">
                              {item.grade}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Section - Content */}
                    <div className="lg:w-3/4">
                      {/* Header with Institution and Year */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                        <h3 className="text-2xl lg:text-3xl font-bold text-cosmic-light group-hover:text-cosmic-accent transition-colors duration-300">
                          {item.institution}
                        </h3>
                        <div className="text-cosmic-blue font-bold text-lg mt-2 sm:mt-0">
                          {item.endYear}
                        </div>
                      </div>

                      {/* Degree and Field */}
                      <div className="text-cosmic-blue font-medium text-lg mb-2">
                        {item.degree}
                      </div>
                      <div className="text-cosmic-light/80 mb-4">
                        {item.field}
                      </div>

                      {/* Description */}
                      <p className="text-cosmic-light/70 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Duration */}
                      <div className="text-cosmic-light/60">
                        {item.duration}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      
      </div>
    </section>
  );
};

export default Education;
