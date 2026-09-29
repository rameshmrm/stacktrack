import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Target,
  Plus,
  Calendar,
  CheckCircle2,
  Circle,
  Trash2,
  Clock,
  Sparkles
} from 'lucide-react';
import { Goal } from '../../types';

export const GoalsView: React.FC = () => {
  const { goals, addGoal, toggleGoalMilestone, deleteGoal } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Goal['category']>('Career');
  const [targetDate, setTargetDate] = useState('2027-01-15');
  const [milestonesStr, setMilestonesStr] = useState('Milestone 1, Milestone 2, Milestone 3');

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const milestones = milestonesStr.split(',').map((m, idx) => ({
      id: `m-${Date.now()}-${idx}`,
      text: m.trim(),
      done: false
    })).filter(m => m.text.length > 0);

    addGoal({
      title: title.trim(),
      category,
      targetDate,
      progress: 0,
      milestones,
      completed: false
    });

    setTitle('');
    setIsModalOpen(false);
  };

  const getDaysRemaining = (dateStr: string) => {
    try {
      const target = new Date(dateStr);
      const now = new Date();
      const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 ? `${diff} days remaining` : 'Target date passed';
    } catch {
      return '';
    }
  };

  const filteredGoals = goals.filter(g => filter === 'all' || g.category === filter);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
              <span>STRATEGIC MILESTONES</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-100 mt-1">
              Goals & Career Targets
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 mt-1">
              Track multi-month milestones: LeetCode targets, internship offers, and production capstone deployments.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all self-start sm:self-center"
          >
            <Plus className="h-4 w-4" />
            <span>New Goal</span>
          </button>
        </div>

        {/* Filter */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center gap-2 overflow-x-auto">
          {['all', 'Career', 'DSA', 'Skills', 'Projects'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === cat
                  ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {cat === 'all' ? 'All Goals' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGoals.map((goal) => (
          <div
            key={goal.id}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors shadow-sm"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                    {goal.category}
                  </span>
                  <h3 className="text-base font-bold text-neutral-100 mt-2">
                    {goal.title}
                  </h3>
                </div>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="text-neutral-500 hover:text-rose-400 p-1 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Progress */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-neutral-400">Milestone Progress</span>
                  <span className="text-purple-400 font-bold tabular-nums">{goal.progress}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              {/* Milestones check list */}
              <div className="mt-5 space-y-2 bg-neutral-950/70 border border-neutral-850 rounded-xl p-4">
                <span className="text-[11px] font-mono text-neutral-400 block mb-2">
                  KEY DELIVERABLES:
                </span>
                {goal.milestones.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => toggleGoalMilestone(goal.id, m.id)}
                    className="flex items-start gap-2.5 text-xs cursor-pointer text-neutral-300 hover:text-white transition-colors"
                  >
                    {m.done ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-neutral-600 mt-0.5 shrink-0" />
                    )}
                    <span className={m.done ? 'line-through text-neutral-500' : ''}>
                      {m.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span className="flex items-center gap-1.5 text-neutral-400">
                <Calendar className="h-3.5 w-3.5" />
                <span>Target: {goal.targetDate}</span>
              </span>
              <span className="text-indigo-400">
                {getDaysRemaining(goal.targetDate)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-neutral-100">
            <h3 className="text-base font-bold text-neutral-100 mb-4">
              Add New Goal & Milestones
            </h3>
            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Land Summer 2027 SWE Internship"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Career">Career</option>
                    <option value="DSA">DSA</option>
                    <option value="Skills">Skills</option>
                    <option value="Projects">Projects</option>
                    <option value="Academics">Academics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Milestones (comma separated)
                </label>
                <textarea
                  rows={3}
                  value={milestonesStr}
                  onChange={(e) => setMilestonesStr(e.target.value)}
                  placeholder="Finish resume, Solve 100 LeetCode, Build Capstone"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
