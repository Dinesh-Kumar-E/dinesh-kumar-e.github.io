import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import ProjectsPage from './pages/ProjectsPage';
import AchievementsPage from './pages/AchievementsPage';
import ResearchPage from './pages/ResearchPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectsPage />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/achievements/:achievementId" element={<AchievementsPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/research/:researchId" element={<ResearchPage />} />
        {/* Fallback route for any unmatched paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
