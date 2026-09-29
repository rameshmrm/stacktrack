import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Award,
  Flame,
  CheckCircle2,
  Lock,
  Zap,
  Sparkles,
  GitBranch,
  Rocket,
  Clock,
  Terminal,
  Cpu,
  BookOpen,
  Briefcase,
  Hourglass,
  FolderCheck
} from 'lucide-react';
import { Achievement } from '../../types';

export const AchievementsView: React.FC = () => {
  const { achievements, stats } = useApp();
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return Sparkles;
      case 'GitBranch': return GitBranch;
      case 'FolderCheck': return FolderCheck;
      case 'Rocket': return Rocket;
      case 'Terminal': return Terminal;
      case 'Cpu': return Cpu;
      case 'Flame': return Flame;
      case 'CheckCircle2': return CheckCircle2;
      case 'Clock': return Clock;
      case 'Hourglass': return Hourglass;
      case 'BookOpen': return BookOpen;
      case 'Briefcase': return Briefcase;
      case 'Trophy': return Trophy;
      default: return Award;
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalXP = stats.totalXP;
  const nextLevelXP = stats.userLevel * 350;
  const currentLevelBaseXP = (stats.userLevel - 1) * 350;
  const progressInLevel = Math.min(100, Math.max(0, Math.round(((totalXP - currentLevelBaseXP) / 350) * 100)));

  const filteredAchievements = achievements.filter((ach) => {
    if (filter === 'unlocked' && !ach.unlocked) return false;
    if (filter === 'locked' && ach.unlocked) return false;
    if (categoryFilter !== 'all' && ach.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Gamified Hero Card: Level, Rank, XP */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/20 border border-neutral-800 rounded-2xl p-6 lg:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Trophy className="h-4 w-4" />
              <span>DEVELOPER GAMIFICATION & MASTERY</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-neutral-100">
              Level {stats.userLevel} Full-Stack Apprentice
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl">
              Unlock badges by mastering topics, solving LeetCode problems, logging deep-work hours, and deploying projects.
            </p>
          </div>

          <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 md:w-72 shrink-0">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-neutral-400">XP Progress</span>
              <span className="text-amber-400 font-bold tabular-nums">{totalXP} XP</span>
            </div>
            <div className="w-full h-2.5 bg-neutral-900 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-indigo-500 rounded-full transition-all duration-700"
                style={{ width: `${progressInLevel}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>Lvl {stats.userLevel}</span>
              <span>{nextLevelXP - totalXP} XP to Lvl {stats.userLevel + 1}</span>
            </div>
          </div>
        </div>

        {/* Motivational Quote Banner */}
        <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center gap-3 text-xs text-neutral-400 italic">
          <Sparkles className="h-4 w-4 text-amber-400 shrink-0 not-italic" />
          <span>
            "First solve the problem. Then, write the code." – John Johnson · Stay disciplined and maintain your daily streak!
          </span>
        </div>
      </div>

      {/* Filter and stats row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-900 border border-neutral-800 rounded-xl p-4">
        <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filter === 'all'
                ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            All ({achievements.length})
          </button>
          <button
            onClick={() => setFilter('unlocked')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filter === 'unlocked'
                ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Unlocked ({unlockedCount})
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filter === 'locked'
                ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Locked ({achievements.length - unlockedCount})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Categories</option>
            <option value="Full-Stack">Full-Stack</option>
            <option value="Streak">Streak & Hours</option>
            <option value="DSA">DSA</option>
            <option value="Projects">Projects</option>
            <option value="Career">Career & Hackathons</option>
          </select>
        </div>
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAchievements.map((ach) => {
          const Icon = getAchievementIcon(ach.icon);

          return (
            <div
              key={ach.id}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                ach.unlocked
                  ? 'bg-neutral-900 border-amber-500/30 shadow-lg shadow-amber-500/5'
                  : 'bg-neutral-900/50 border-neutral-800/80 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border ${
                      ach.unlocked
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-600'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded ${
                        ach.unlocked
                          ? 'bg-amber-500/15 text-amber-300'
                          : 'bg-neutral-950 text-neutral-500 border border-neutral-850'
                      }`}
                    >
                      <Zap className="h-3 w-3" />
                      +{ach.xp} XP
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-neutral-100">
                      {ach.title}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-neutral-500">#{ach.category}</span>
                {ach.unlocked ? (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Unlocked {ach.unlockedAt || 'Recent'}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-neutral-500">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Locked</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
