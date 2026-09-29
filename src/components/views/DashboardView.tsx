import React from 'react';
import { useApp } from '../../context/AppContext';
import { DailyCodingStreakCalendar } from '../DailyCodingStreakCalendar';
import {
  Flame,
  CheckCircle2,
  Clock,
  Code2,
  FolderGit2,
  Calendar,
  Award,
  ArrowRight,
  TrendingUp,
  Layers,
  Sparkles,
  ExternalLink,
  Github
} from 'lucide-react';

interface DashboardViewProps {
  onOpenTimer: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onOpenTimer }) => {
  const {
    userProfile,
    stats,
    phases,
    tasks,
    problems,
    projects,
    goals,
    achievements,
    setActiveTab,
    setSelectedTopicId,
    toggleTask
  } = useApp();

  // Find the active/current topic to continue
  let activeTopic: { topicTitle: string; phaseTitle: string; topicId: string } | null = null;
  for (const p of phases) {
    for (const m of p.modules) {
      const found = m.topics.find(t => t.status === 'in_progress');
      if (found) {
        activeTopic = {
          topicTitle: found.title,
          phaseTitle: `Phase ${p.phaseNumber}: ${p.title}`,
          topicId: found.id
        };
        break;
      }
    }
    if (activeTopic) break;
  }

  if (!activeTopic && phases[0]?.modules[0]?.topics[0]) {
    activeTopic = {
      topicTitle: phases[0].modules[0].topics[0].title,
      phaseTitle: `Phase 0: ${phases[0].title}`,
      topicId: phases[0].modules[0].topics[0].id
    };
  }

  const handleContinueLearning = () => {
    if (activeTopic) {
      setSelectedTopicId(activeTopic.topicId);
      setActiveTab('learn');
    } else {
      setActiveTab('roadmap');
    }
  };

  // Filter today's tasks
  const todayTasks = tasks.slice(0, 4);

  // Solved problems breakdown
  const easySolved = problems.filter(p => p.status === 'Solved' && p.difficulty === 'Easy').length;
  const medSolved = problems.filter(p => p.status === 'Solved' && p.difficulty === 'Medium').length;
  const hardSolved = problems.filter(p => p.status === 'Solved' && p.difficulty === 'Hard').length;

  // Active / recent projects
  const activeProjects = projects.slice(0, 2);

  // Recent achievements (unlocked ones)
  const recentAchievements = achievements.filter(a => a.unlocked).slice(-3);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner / Anime Hunter Status Window with Anime Coder Hero Background */}
      <div className="bg-[#121326] border-2 border-purple-500/30 rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xl relative overflow-hidden anime-glow-purple">
        {/* Background anime hero image with dark scrim */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="/src/assets/images/anime_coder_hero_1790661106262.jpg"
            alt="Anime Coder Workstation"
            className="w-full h-full object-cover object-right"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/20 via-rose-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start sm:items-center gap-4 relative z-10">
          {/* Anime Character Companion Portrait */}
          <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border-2 border-fuchsia-400 shadow-xl shadow-fuchsia-500/30 shrink-0">
            <img
              src="/src/assets/images/anime_character_companion_1790661089336.jpg"
              alt="Anime Character Companion"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-fuchsia-400">
              <span className="px-2 py-0.5 rounded bg-fuchsia-950/80 border border-fuchsia-500/40 text-[10px]">
                PLAYER STATUS
              </span>
              <span className="text-purple-300">HUNTER PROFILE · {userProfile.name}</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white font-display flex flex-wrap items-center gap-2">
              <span>LEVEL {stats.userLevel} FULL-STACK MAGE</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                RANK S
              </span>
            </h2>
            <p className="text-sm text-purple-200/80 max-w-xl">
              {userProfile.university} · Class: <span className="text-cyan-300 font-semibold">{userProfile.targetRole}</span>
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                <Flame className="h-4 w-4 fill-amber-400/40 text-amber-400 animate-pulse" />
                {stats.streakDays} Day Continuous Streak
              </span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span className="text-emerald-400 font-semibold">
                {stats.completedTopics}/{stats.totalTopics} Spells Mastered ({stats.overallProgressPercent}%)
              </span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span className="text-cyan-300 font-semibold">
                {stats.weeklyHoursLogged}h Mana Charged
              </span>
            </div>
          </div>
        </div>

        {/* Continue Learning CTA Card - Active Quest */}
        <div className="bg-[#0b0c1b]/95 border border-purple-500/40 rounded-xl p-5 lg:w-80 shrink-0 flex flex-col justify-between gap-3 relative z-10 shadow-lg">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-fuchsia-400 font-bold uppercase tracking-wider">
                ACTIVE QUEST // CURRENT OBJECTIVE
              </span>
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <h4 className="text-sm font-bold text-white mt-1 line-clamp-1 font-display">
              {activeTopic?.topicTitle || 'Modern React Reconciliation'}
            </h4>
            <p className="text-xs text-purple-300/70 mt-0.5 truncate font-mono">
              {activeTopic?.phaseTitle}
            </p>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleContinueLearning}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-gradient-to-r from-purple-600 via-fuchsia-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-xs font-bold text-white transition-all shadow-md shadow-fuchsia-600/30 font-display"
            >
              <span>RESUME QUEST</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={onOpenTimer}
              className="p-2.5 rounded-lg bg-[#14152b] border border-purple-500/40 hover:bg-purple-900/40 text-neutral-300 transition-colors"
              title="Start focus timer for this quest"
            >
              <Clock className="h-4 w-4 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>



      {/* Metric Cards Row - Anime Status Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        {/* Streak */}
        <div className="bg-[#101222] border border-amber-500/30 rounded-xl p-4 relative overflow-hidden group hover:border-amber-400 transition-colors shadow-lg">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="text-[11px] text-amber-300 font-bold">連続記録 · STREAK</span>
            <Flame className="h-4 w-4 text-amber-400 animate-bounce" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold font-display text-white tabular-nums">
              {stats.streakDays}
            </span>
            <span className="text-xs text-amber-400 font-bold">DAYS</span>
          </div>
          <div className="mt-1 text-[10px] text-amber-300/80 font-bold tracking-wider">
            FIRE AURA ACTIVE
          </div>
        </div>

        {/* Weekly Hours */}
        <div className="bg-[#101222] border border-purple-500/30 rounded-xl p-4 relative overflow-hidden group hover:border-purple-400 transition-colors shadow-lg">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="text-[11px] text-purple-300 font-bold">修業時間 · MANA HRS</span>
            <Clock className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold font-display text-white tabular-nums">
              {stats.weeklyHoursLogged}
            </span>
            <span className="text-xs text-purple-400 font-bold">/ 25h</span>
          </div>
          <div className="mt-1 text-[10px] text-cyan-300 font-bold tracking-wider">
            {Math.round((stats.weeklyHoursLogged / 25) * 100)}% MANA CAP CHARGED
          </div>
        </div>

        {/* Coding Problems */}
        <div className="bg-[#101222] border border-emerald-500/30 rounded-xl p-4 relative overflow-hidden group hover:border-emerald-400 transition-colors shadow-lg">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="text-[11px] text-emerald-300 font-bold">討伐数 · DSA CLEARED</span>
            <Code2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold font-display text-white tabular-nums">
              {stats.totalProblemsSolved}
            </span>
            <span className="text-xs text-emerald-400 font-bold">BOSSES</span>
          </div>
          <div className="mt-1 text-[10px] text-emerald-400 font-mono">
            {easySolved}E · {medSolved}M · {hardSolved}H
          </div>
        </div>

        {/* Total XP / Rank */}
        <div className="bg-[#101222] border border-fuchsia-500/30 rounded-xl p-4 relative overflow-hidden group hover:border-fuchsia-400 transition-colors shadow-lg">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="text-[11px] text-fuchsia-300 font-bold">名誉戦闘力 · EXP</span>
            <Award className="h-4 w-4 text-fuchsia-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold font-display text-white tabular-nums">
              {stats.totalXP}
            </span>
            <span className="text-xs text-fuchsia-400 font-bold">EXP</span>
          </div>
          <div className="mt-1 text-[10px] text-fuchsia-300 font-bold tracking-wider">
            RANK S · MAGE CLASS
          </div>
        </div>
      </div>


      {/* Daily Coding Streak Calendar Component */}
      <DailyCodingStreakCalendar onOpenTimer={onOpenTimer} />

      {/* Main Grid: Full-Stack Journey Progress Card & Today's Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Large Progress Card: Full-Stack Journey - Anime Skill Tree */}
        <div className="lg:col-span-7 bg-[#101222] border-2 border-purple-500/20 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-fuchsia-400 font-bold uppercase tracking-wider">
                  SKILL TREE // DISCIPLINE RADAR
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5 font-display flex items-center gap-2">
                  <span>Full-Stack Mastery Tree</span>
                  <span className="text-xs font-mono text-cyan-400 font-normal">RANK S</span>
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="text-xs text-purple-300 hover:text-fuchsia-400 transition-colors flex items-center gap-1 font-mono font-semibold"
              >
                <span>OPEN TREE</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>


            <div className="mt-6 space-y-4">
              {/* Frontend */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                  <span className="font-semibold text-purple-200">Frontend Alchemy (React / TS / CSS)</span>
                  <span className="text-cyan-300 font-bold tabular-nums">
                    {stats.categoryProgress.Frontend?.percent || 72}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#080914] rounded-full overflow-hidden border border-purple-900/40 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-700 shadow-sm shadow-purple-500/30"
                    style={{ width: `${stats.categoryProgress.Frontend?.percent || 72}%` }}
                  />
                </div>
              </div>

              {/* Backend */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                  <span className="font-semibold text-purple-200">Backend Engineering & Node Protocol</span>
                  <span className="text-cyan-300 font-bold tabular-nums">
                    {stats.categoryProgress.Backend?.percent || 50}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#080914] rounded-full overflow-hidden border border-purple-900/40 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700 shadow-sm shadow-emerald-500/30"
                    style={{ width: `${stats.categoryProgress.Backend?.percent || 50}%` }}
                  />
                </div>
              </div>

              {/* Database */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                  <span className="font-semibold text-purple-200">Relational Vaults & Caching (SQL, Redis)</span>
                  <span className="text-cyan-300 font-bold tabular-nums">
                    {stats.categoryProgress.Database?.percent || 40}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#080914] rounded-full overflow-hidden border border-purple-900/40 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-700 shadow-sm shadow-amber-500/30"
                    style={{ width: `${stats.categoryProgress.Database?.percent || 40}%` }}
                  />
                </div>
              </div>

              {/* DevOps */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                  <span className="font-semibold text-purple-200">DevOps & Cloud Summoning (Docker, CI/CD)</span>
                  <span className="text-cyan-300 font-bold tabular-nums">
                    {stats.categoryProgress.DevOps?.percent || 25}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#080914] rounded-full overflow-hidden border border-purple-900/40 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full transition-all duration-700 shadow-sm shadow-cyan-500/30"
                    style={{ width: `${stats.categoryProgress.DevOps?.percent || 25}%` }}
                  />
                </div>
              </div>

              {/* System Design & DSA */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                  <span className="font-semibold text-purple-200">High-Concurrency Architecture & DSA</span>
                  <span className="text-cyan-300 font-bold tabular-nums">
                    {stats.categoryProgress.DSA?.percent || 35}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#080914] rounded-full overflow-hidden border border-purple-900/40 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-fuchsia-500 to-rose-500 rounded-full transition-all duration-700 shadow-sm shadow-fuchsia-500/30"
                    style={{ width: `${stats.categoryProgress.DSA?.percent || 35}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-purple-900/30 flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span>
              TOTAL SYNC: <strong className="text-cyan-300">{stats.overallProgressPercent}%</strong>
            </span>
            <button
              onClick={handleContinueLearning}
              className="px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg font-bold transition-colors font-display"
            >
              LEVEL UP →
            </button>
          </div>
        </div>

        {/* Today's Tasks Card - Anime Quest Board */}
        <div className="lg:col-span-5 bg-[#101222] border-2 border-purple-500/20 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  QUEST BOARD // DAILY OBJECTIVES
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5 font-display">Daily Quest Log</h3>
              </div>
              <button
                onClick={() => setActiveTab('tasks')}
                className="text-xs text-purple-300 hover:text-cyan-300 transition-colors flex items-center gap-1 font-mono font-semibold"
              >
                <span>ALL QUESTS</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>


            <div className="mt-4 space-y-2.5">
              {todayTasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => toggleTask(t.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    t.completed
                      ? 'bg-[#080914]/40 border-purple-900/30 opacity-60'
                      : 'bg-[#0b0c1b] border-purple-800/40 hover:border-purple-500/60 shadow-sm'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTask(t.id)}
                    className="mt-0.5 h-4 w-4 rounded border-purple-700 text-fuchsia-600 focus:ring-0 focus:ring-offset-0 bg-neutral-900 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-semibold leading-snug ${
                        t.completed ? 'line-through text-neutral-500' : 'text-neutral-100'
                      }`}
                    >
                      {t.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-purple-300/70 font-mono">
                      <span>[{t.category}]</span>
                      <span>·</span>
                      <span
                        className={
                          t.priority === 'high'
                            ? 'text-rose-400 font-bold'
                            : t.priority === 'medium'
                            ? 'text-amber-400 font-bold'
                            : 'text-neutral-400'
                        }
                      >
                        {t.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-purple-900/30">
            <button
              onClick={() => setActiveTab('tasks')}
              className="w-full py-2.5 bg-[#0b0c1b] border border-purple-600/40 hover:bg-purple-900/30 text-purple-200 hover:text-white rounded-xl text-xs font-bold font-display transition-colors text-center"
            >
              + ACCEPT NEW QUEST
            </button>
          </div>
        </div>
      </div>


      {/* Row: Active Projects & Upcoming Deadlines / Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Projects */}
        <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-mono text-indigo-400">PORTFOLIO</span>
              <h3 className="text-lg font-bold text-neutral-100 mt-0.5">Active Projects</h3>
            </div>
            <button
              onClick={() => setActiveTab('projects')}
              className="text-xs text-neutral-400 hover:text-indigo-400 transition-colors flex items-center gap-1"
            >
              <span>Manage Projects</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {activeProjects.map((p) => (
              <div
                key={p.id}
                className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-100 flex items-center gap-2">
                      <span>{p.title}</span>
                      <span className="text-[10px] font-mono font-normal text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        {p.status}
                      </span>
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                      {p.tagline}
                    </p>
                  </div>
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-neutral-200 p-1"
                      title="View GitHub repository"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono mb-1">
                    <span>Feature Completion</span>
                    <span>{p.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>

                {/* Tech stack tags (clean unboxed text with separators) */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-400">
                  {p.techStack.map((tech, idx) => (
                    <span key={tech} className="flex items-center gap-1.5">
                      <span className="text-neutral-300 font-mono">{tech}</span>
                      {idx < p.techStack.length - 1 && <span className="text-neutral-600">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Goals & Milestones with Anime Tech Mentor */}
        <div className="lg:col-span-5 bg-[#101222] border-2 border-purple-500/20 rounded-2xl p-6 flex flex-col justify-between shadow-xl space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                  TARGETS & AMBITIONS
                </span>
                <h3 className="text-base font-bold text-white mt-0.5 font-display">Upcoming Milestones</h3>
              </div>
              <button
                onClick={() => setActiveTab('goals')}
                className="text-xs text-purple-300 hover:text-cyan-300 transition-colors flex items-center gap-1 font-mono font-semibold"
              >
                <span>VIEW ALL</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {goals.slice(0, 2).map((g) => (
                <div
                  key={g.id}
                  className="bg-[#0b0c1b] border border-purple-800/40 rounded-xl p-3.5 hover:border-purple-500/60 transition-colors shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-semibold text-neutral-100 line-clamp-1">
                      {g.title}
                    </h4>
                    <span className="text-[10px] font-mono text-cyan-300 font-bold shrink-0">
                      {g.progress}%
                    </span>
                  </div>
                  <div className="mt-2 w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                      style={{ width: `${g.progress}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-purple-300/70 font-mono">
                    <span>Target: {g.targetDate}</span>
                    <span>{g.milestones.filter(m => m.done).length}/{g.milestones.length} milestones</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Anime Tech Mentor Advisory Banner */}
          <div className="bg-gradient-to-r from-purple-950/70 via-indigo-950/50 to-[#0e0f22] border border-purple-500/30 rounded-xl p-3 flex items-center gap-3 relative overflow-hidden">
            <div className="h-14 w-14 rounded-xl overflow-hidden border-2 border-cyan-400/60 shadow-md shadow-cyan-500/20 shrink-0">
              <img
                src="/src/assets/images/anime_quest_sensei_1790661118051.jpg"
                alt="Anime Tech Mentor"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-300 font-bold uppercase">
                <span>MENTOR SENSEI · ADVISORY</span>
              </div>
              <p className="text-xs text-neutral-200 mt-0.5 leading-snug">
                "Keep your coding streak burning! Today's practice will unlock your next SWE Guild interview."
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
