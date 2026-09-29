import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Map,
  BookOpen,
  CheckSquare,
  Code2,
  FolderGit2,
  Bookmark,
  FileText,
  Target,
  Briefcase,
  Trophy,
  BarChart3,
  Award,
  Settings,
  Flame,
  Moon,
  Sun,
  X,
  Layers,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { activeTab, setActiveTab, stats, theme, toggleTheme, userProfile } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', sub: 'COMMAND CENTER', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Roadmap', sub: 'SKILL TREE', icon: Map },
    { id: 'learn', label: 'Training Grounds', sub: 'STUDY LAB', icon: BookOpen },
    { id: 'tasks', label: 'Daily Quests', sub: 'SPRINT TASKS', icon: CheckSquare },
    { id: 'coding', label: 'DSA Battles', sub: 'LEETCODE DRILLS', icon: Code2 },
    { id: 'projects', label: 'Artifact Projects', sub: 'PORTFOLIO REPOS', icon: FolderGit2 },
    { id: 'resources', label: 'Arcane Grimoire', sub: 'DEV RESOURCES', icon: Bookmark },
    { id: 'notes', label: 'Ninja Scrolls', sub: 'TECH NOTES', icon: FileText },
    { id: 'goals', label: 'Mastery Milestones', sub: 'CAREER GOALS', icon: Target },
    { id: 'internships', label: 'SWE Guilds', sub: 'APPLICATIONS', icon: Briefcase },
    { id: 'hackathons', label: 'Tournaments', sub: 'COMPETITIONS', icon: Trophy },
    { id: 'progress', label: 'Power Radar', sub: 'ANALYTICS', icon: BarChart3 },
    { id: 'achievements', label: 'Titles & Badges', sub: 'ACHIEVEMENTS', icon: Award },
    { id: 'settings', label: 'System Terminal', sub: 'CONFIG & BACKUP', icon: Settings },
  ];



  const handleNavClick = (id: string) => {
    setActiveTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Zone */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-purple-900/30 bg-[#0d0e1b]">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-purple-600 via-indigo-600 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 border border-purple-400/30">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white font-display">
                  StackTrack
                </span>
                <span className="text-[10px] text-fuchsia-400 font-mono font-semibold px-1 rounded bg-fuchsia-950/60 border border-fuchsia-500/30">
                  S-TIER
                </span>
              </div>
              <p className="text-[10px] text-purple-300/70 font-mono tracking-wider">
                FULL-STACK DEVELOPER ADVENTURE
              </p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded text-neutral-400 hover:text-neutral-200 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Status Window Card with Anime Character Avatar */}
        <div className="px-4 py-3 border-b border-purple-900/20 bg-[#080914] relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-purple-600/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-3 mb-2">
            <div className="relative h-11 w-11 rounded-xl overflow-hidden border-2 border-fuchsia-500/50 shadow-md shadow-fuchsia-500/20 shrink-0">
              <img
                src="/src/assets/images/anime_character_companion_1790661089336.jpg"
                alt="Anime Character Companion"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/60 px-1 rounded border border-cyan-800/40">
                  CODER CLASS
                </span>
                <div className="flex items-center gap-1 text-amber-400 font-mono text-[11px]">
                  <Flame className="h-3 w-3 fill-amber-400/30 text-amber-400" />
                  <span>{stats.streakDays}d</span>
                </div>
              </div>
              <p className="truncate text-xs font-bold text-white mt-0.5">{userProfile.name}</p>
            </div>
          </div>

          {/* Level & Mana / XP Bar */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono mb-1">
            <span className="text-fuchsia-400 font-bold">LV.{stats.userLevel} CODING MAGE</span>
            <span className="text-cyan-300 font-semibold">{stats.totalXP} MP</span>
          </div>
          <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-purple-900/40 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 rounded-full transition-all duration-500 shadow-sm shadow-fuchsia-500/50"
              style={{ width: `${(stats.totalXP % 350) / 3.5}%` }}
            />
          </div>
        </div>


        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-900/40 to-indigo-950/40 text-fuchsia-300 font-bold border-l-2 border-fuchsia-400 pl-2.5 shadow-sm shadow-purple-500/10'
                    : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/40'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-fuchsia-400' : 'text-neutral-400'}`} />
                  <div className="text-left truncate">
                    <span className="block truncate font-medium text-xs leading-tight">{item.label}</span>
                    <span className="block text-[9px] text-purple-400/60 font-mono leading-tight tracking-wider">{item.sub}</span>
                  </div>
                </div>
                {item.id === 'roadmap' && (
                  <span className="text-[10px] font-mono tabular-nums text-cyan-400 font-semibold bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-800/40">
                    {stats.overallProgressPercent}%
                  </span>
                )}
                {item.id === 'achievements' && (
                  <span className="text-[10px] font-mono text-amber-400 flex items-center gap-0.5">
                    <Sparkles className="h-3 w-3 animate-spin" />
                  </span>
                )}
              </button>
            );
          })}
        </nav>


        {/* Footer controls & Theme toggle */}
        <div className="p-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-neutral-800 hover:text-neutral-200 transition-colors"
            title="Toggle dark/light mode"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4 text-amber-400" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-indigo-400" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
          <div className="text-[11px] font-mono text-neutral-500 pr-1">
            2026 Edition
          </div>
        </div>
      </aside>
    </>
  );
};
