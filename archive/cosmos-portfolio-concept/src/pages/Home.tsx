import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import TechStack from '../components/TechStack/TechStack';
import Projects from '../components/Projects/Projects';
import Achievements from '../components/Achievements/Achievements';
import Research from '../components/Research/Research';
import Education from '../components/Education/Education';
import Experience from '../components/Experience/Experience';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import CosmosBackground from '../components/CosmosBackground/CosmosBackground';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-cosmic-dark text-cosmic-light overflow-x-hidden">
      <CosmosBackground />
      
      <div className="relative z-10">
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <Achievements />
          <Research />
          <Education />
          <Experience />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Home;
