import React from 'react';
import { useApp } from '../context/AppContext';
import { Menu, Clock, Target, Plus, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onOpenMobileNav: () => void;
  onOpenTimer: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileNav, onOpenTimer }) => {
  const { activeTab, setActiveTab, stats, phases } = useApp();

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'roadmap': return 'Full-Stack Engineering Roadmap';
      case 'learn': return 'Deep Dive & Interactive Study Guide';
      case 'tasks': return 'Study & Sprint Tasks';
      case 'coding': return 'Coding Practice & DSA Tracker';
      case 'projects': return 'Portfolio & GitHub Repositories';
      case 'resources': return 'Curated Resource Vault';
      case 'notes': return 'Developer Technical Notes';
      case 'goals': return 'Milestones & CSE Career Goals';
      case 'internships': return 'SWE Internship Pipeline';
      case 'hackathons': return 'Hackathon Showcase';
      case 'progress': return 'Analytics & Activity Heatmap';
      case 'achievements': return 'Developer Achievements & XP';
      case 'settings': return 'Profile & App Settings';
      default: return 'StackTrack';
    }
  };

  // Find active phase
  const currentPhase = phases.find(p => p.modules.some(m => m.topics.some(t => t.status === 'in_progress'))) || phases[1];

  return (
    <header className="h-16 px-4 md:px-6 bg-[#0a0b16]/90 backdrop-blur-md border-b border-purple-900/30 sticky top-0 z-30 flex items-center justify-between">
      {/* Zone 1: Mobile toggle & Breadcrumb Trail */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 font-display">
          <span className="text-xs text-purple-400 font-mono hidden sm:inline font-bold">SYSTEM</span>
          <span className="text-neutral-600 hidden sm:inline">/</span>
          <h1 className="text-sm md:text-base font-bold text-white tracking-tight flex items-center gap-2 truncate">
            <span>{getBreadcrumbTitle()}</span>
          </h1>
        </div>
      </div>

      {/* Zone 2: Current Phase Context (Clean unboxed metadata with anime aura) */}
      <div className="hidden xl:flex items-center gap-3 text-xs text-neutral-400 font-mono">
        <span className="text-purple-400 font-semibold">STAGE:</span>
        <button
          onClick={() => setActiveTab('roadmap')}
          className="text-neutral-200 hover:text-fuchsia-400 transition-colors font-medium flex items-center gap-1.5"
        >
          <span>P{currentPhase.phaseNumber}: {currentPhase.title}</span>
        </button>
        <span aria-hidden="true" className="text-neutral-700">·</span>
        <span className="text-cyan-400 font-mono flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          {stats.overallProgressPercent}% SYNCED
        </span>
      </div>

      {/* Zone 3: Actions (Study Timer, Quick Actions & Anime Character Avatar) */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Study Focus Timer Trigger */}
        <button
          onClick={onOpenTimer}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/40 text-xs font-semibold text-purple-200 hover:text-white transition-all shadow-sm shadow-purple-500/10 font-mono"
          title="Open Focus Mana Timer"
        >
          <Clock className="h-3.5 w-3.5 text-cyan-400" />
          <span className="hidden sm:inline">FOCUS MANA</span>
        </button>

        {/* Quick Jump to Continue Learning */}
        <button
          onClick={() => setActiveTab('learn')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-xs font-bold text-white transition-all shadow-md shadow-fuchsia-600/30 whitespace-nowrap font-display"
        >
          <span>TRAINING →</span>
        </button>

        {/* Small Anime Companion Icon */}
        <div className="h-8 w-8 rounded-lg overflow-hidden border border-fuchsia-500/40 shadow-sm shrink-0 hidden sm:block">
          <img
            src="/src/assets/images/anime_character_companion_1790661089336.jpg"
            alt="Anime Character"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

    </header>

  );
};
