import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Circle,
  Clock,
  Search,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Code2,
  Sparkles,
  Layers,
  Server,
  Database,
  Cloud,
  Cpu,
  Briefcase,
  Terminal
} from 'lucide-react';
import { TopicStatus } from '../../types';

export const RoadmapView: React.FC = () => {
  const { phases, toggleTopicStatus, setSelectedTopicId, setActiveTab, stats } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_progress' | 'completed' | 'not_started'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    'phase-0': true,
    'phase-1': true,
    'phase-2': true,
    'phase-3': true
  });

  const togglePhaseExpand = (phaseId: string) => {
    setExpandedPhases(prev => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  const getPhaseIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return Terminal;
      case 'Code': return Code2;
      case 'Layers': return Layers;
      case 'Server': return Server;
      case 'Database': return Database;
      case 'Cloud': return Cloud;
      case 'Cpu': return Cpu;
      case 'Briefcase': return Briefcase;
      default: return Layers;
    }
  };

  const handleStudyTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActiveTab('learn');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header & Roadmap Stats */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              <span>CURRICULUM SPECIFICATION</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-100 mt-1">
              Full-Stack Developer Roadmap
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 mt-1 max-w-2xl">
              From CS fundamentals and systems programming to modern microservices, database transactions, and cloud deployments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-center">
              <span className="text-[11px] font-mono text-neutral-500 block">TOTAL PROGRESS</span>
              <span className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
                {stats.overallProgressPercent}%
              </span>
            </div>
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-center">
              <span className="text-[11px] font-mono text-neutral-500 block">TOPICS MASTERED</span>
              <span className="text-xl font-bold font-mono text-neutral-100 tabular-nums">
                {stats.completedTopics} <span className="text-xs text-neutral-500 font-normal">/ {stats.totalTopics}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search topics (e.g., Docker, JWT, ACID, Next.js, Redux)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Interactive filter buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs">
              {(['all', 'in_progress', 'completed', 'not_started'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                    statusFilter === s
                      ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {s === 'all'
                    ? 'All'
                    : s === 'in_progress'
                    ? 'In Progress'
                    : s === 'completed'
                    ? 'Completed'
                    : 'Not Started'}
                </button>
              ))}
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Disciplines</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="DevOps">DevOps & Cloud</option>
              <option value="DSA">DSA & Algorithms</option>
              <option value="System Design">System Design</option>
              <option value="General">General CS</option>
            </select>
          </div>
        </div>
      </div>

      {/* Phases List */}
      <div className="space-y-4">
        {phases.map((phase) => {
          const PhaseIcon = getPhaseIcon(phase.iconName);
          const isExpanded = !!expandedPhases[phase.id];

          // Calculate phase completion
          let totalInPhase = 0;
          let completedInPhase = 0;
          phase.modules.forEach(m => {
            m.topics.forEach(t => {
              totalInPhase++;
              if (t.status === 'completed') completedInPhase++;
            });
          });
          const phasePercent = totalInPhase > 0 ? Math.round((completedInPhase / totalInPhase) * 100) : 0;

          // Filter topics inside phase
          const filteredModules = phase.modules.map(mod => ({
            ...mod,
            topics: mod.topics.filter(t => {
              const matchesSearch =
                !searchQuery ||
                t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.keyConcepts.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));

              const matchesStatus =
                statusFilter === 'all' || t.status === statusFilter;

              const matchesCategory =
                categoryFilter === 'all' || t.category === categoryFilter;

              return matchesSearch && matchesStatus && matchesCategory;
            })
          })).filter(mod => mod.topics.length > 0);

          // If search active and nothing matches this phase, hide it
          if (searchQuery && filteredModules.length === 0) return null;

          return (
            <div
              key={phase.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden transition-all shadow-sm"
            >
              {/* Phase Header Accordion */}
              <div
                onClick={() => togglePhaseExpand(phase.id)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-neutral-800/40 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center shrink-0 text-indigo-400">
                    <PhaseIcon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-medium text-indigo-400">
                        PHASE {phase.phaseNumber}
                      </span>
                      <span className="text-xs text-neutral-500">·</span>
                      <span className="text-xs text-neutral-400 font-mono">
                        ~{phase.estimatedWeeks} Weeks
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-neutral-100 truncate">
                      {phase.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5 hidden sm:block truncate">
                      {phase.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-mono font-bold text-neutral-200 tabular-nums">
                      {phasePercent}%
                    </span>
                    <span className="text-[11px] text-neutral-500 block font-mono">
                      {completedInPhase}/{totalInPhase} done
                    </span>
                  </div>
                  <div className="w-16 h-2 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800 hidden sm:block">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${phasePercent}%` }}
                    />
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-neutral-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-neutral-400" />
                  )}
                </div>
              </div>

              {/* Modules & Topics Content */}
              {isExpanded && (
                <div className="border-t border-neutral-800 bg-neutral-950/60 p-5 space-y-6">
                  {filteredModules.map((mod) => (
                    <div key={mod.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider font-mono">
                          {mod.title}
                        </h4>
                        <span className="text-[11px] text-neutral-500">
                          {mod.description}
                        </span>
                      </div>

                      {/* Topics Grid */}
                      <div className="grid grid-cols-1 gap-3">
                        {mod.topics.map((topic) => (
                          <div
                            key={topic.id}
                            className={`p-4 rounded-xl border transition-all ${
                              topic.status === 'completed'
                                ? 'bg-neutral-900/40 border-neutral-800/60'
                                : topic.status === 'in_progress'
                                ? 'bg-neutral-900 border-indigo-500/40 shadow-sm'
                                : 'bg-neutral-900/90 border-neutral-800 hover:border-neutral-700'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                              <div className="flex items-start gap-3">
                                {/* Toggle Status Checkbox */}
                                <button
                                  onClick={() => toggleTopicStatus(phase.id, mod.id, topic.id)}
                                  className="mt-0.5 shrink-0 text-neutral-400 hover:text-neutral-200 transition-colors"
                                  title={`Status: ${topic.status} (Click to advance)`}
                                >
                                  {topic.status === 'completed' ? (
                                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                  ) : topic.status === 'in_progress' ? (
                                    <Circle className="h-5 w-5 text-amber-400 fill-amber-400/20" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-neutral-600" />
                                  )}
                                </button>

                                <div className="space-y-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h5
                                      className={`text-sm font-semibold ${
                                        topic.status === 'completed'
                                          ? 'line-through text-neutral-400'
                                          : 'text-neutral-100'
                                      }`}
                                    >
                                      {topic.title}
                                    </h5>
                                    <span className="text-[10px] font-mono text-neutral-400">
                                      {topic.estimatedHours}h
                                    </span>
                                    <span
                                      className={`text-[10px] font-mono ${
                                        topic.importance === 'Essential'
                                          ? 'text-rose-400'
                                          : topic.importance === 'High'
                                          ? 'text-amber-400'
                                          : 'text-neutral-400'
                                      }`}
                                    >
                                      {topic.importance}
                                    </span>
                                  </div>

                                  <p className="text-xs text-neutral-400 leading-relaxed">
                                    {topic.summary}
                                  </p>

                                  {/* Key concepts */}
                                  <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-neutral-500 font-mono">
                                    {topic.keyConcepts.map((k, i) => (
                                      <span key={k} className="flex items-center gap-2">
                                        <span className="text-neutral-400">#{k}</span>
                                        {i < topic.keyConcepts.length - 1 && <span>·</span>}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Action: Study Deep Dive */}
                              <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
                                <button
                                  onClick={() => handleStudyTopic(topic.id)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 transition-colors"
                                >
                                  <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
                                  <span>Study Guide</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
