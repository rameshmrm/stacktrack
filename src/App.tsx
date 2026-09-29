import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StudyTimerModal } from './components/StudyTimerModal';
import { AchievementToast } from './components/AchievementToast';

// Views
import { DashboardView } from './components/views/DashboardView';
import { RoadmapView } from './components/views/RoadmapView';
import { LearnView } from './components/views/LearnView';
import { TasksView } from './components/views/TasksView';
import { CodingPracticeView } from './components/views/CodingPracticeView';
import { ProjectsView } from './components/views/ProjectsView';
import { ResourcesView } from './components/views/ResourcesView';
import { NotesView } from './components/views/NotesView';
import { GoalsView } from './components/views/GoalsView';
import { InternshipsView } from './components/views/InternshipsView';
import { HackathonsView } from './components/views/HackathonsView';
import { ProgressView } from './components/views/ProgressView';
import { AchievementsView } from './components/views/AchievementsView';
import { SettingsView } from './components/views/SettingsView';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView onOpenTimer={() => setIsTimerModalOpen(true)} />;
      case 'roadmap':
        return <RoadmapView />;
      case 'learn':
        return <LearnView onOpenTimer={() => setIsTimerModalOpen(true)} />;
      case 'tasks':
        return <TasksView />;
      case 'coding':
        return <CodingPracticeView />;
      case 'projects':
        return <ProjectsView />;
      case 'resources':
        return <ResourcesView />;
      case 'notes':
        return <NotesView />;
      case 'goals':
        return <GoalsView />;
      case 'internships':
        return <InternshipsView />;
      case 'hackathons':
        return <HackathonsView />;
      case 'progress':
        return <ProgressView />;
      case 'achievements':
        return <AchievementsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView onOpenTimer={() => setIsTimerModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        isMobileOpen={isMobileNavOpen}
        onCloseMobile={() => setIsMobileNavOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
          onOpenTimer={() => setIsTimerModalOpen(true)}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Focus Timer Modal */}
      <StudyTimerModal
        isOpen={isTimerModalOpen}
        onClose={() => setIsTimerModalOpen(false)}
      />

      {/* Achievement Unlocked Notification Toast */}
      <AchievementToast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
