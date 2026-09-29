import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Code2,
  Plus,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Trash2,
  ChevronDown,
  Terminal,
  Cpu
} from 'lucide-react';
import { CodingProblem } from '../../types';

export const CodingPracticeView: React.FC = () => {
  const { problems, addProblem, updateProblem, deleteProblem } = useApp();
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New problem form
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState<CodingProblem['platform']>('LeetCode');
  const [difficulty, setDifficulty] = useState<CodingProblem['difficulty']>('Medium');
  const [topic, setTopic] = useState('Arrays & Hashing');
  const [timeComp, setTimeComp] = useState('O(n)');
  const [spaceComp, setSpaceComp] = useState('O(1)');
  const [notes, setNotes] = useState('');
  const [problemUrl, setProblemUrl] = useState('');

  const easyCount = problems.filter(p => p.status === 'Solved' && p.difficulty === 'Easy').length;
  const medCount = problems.filter(p => p.status === 'Solved' && p.difficulty === 'Medium').length;
  const hardCount = problems.filter(p => p.status === 'Solved' && p.difficulty === 'Hard').length;
  const totalSolved = easyCount + medCount + hardCount;

  const filteredProblems = problems.filter(p => {
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.topic.toLowerCase().includes(search.toLowerCase()) ||
      p.solutionNotes.toLowerCase().includes(search.toLowerCase());

    const matchesDiff = diffFilter === 'all' || p.difficulty === diffFilter;

    return matchesSearch && matchesDiff;
  });

  const handleCreateProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addProblem({
      title: title.trim(),
      platform,
      difficulty,
      topic,
      status: 'Solved',
      timeComplexity: timeComp || 'O(n)',
      spaceComplexity: spaceComp || 'O(1)',
      solutionNotes: notes,
      problemUrl: problemUrl || undefined,
      dateSolved: new Date().toISOString().split('T')[0]
    });

    setTitle('');
    setNotes('');
    setProblemUrl('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header & Stats */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              <span>DATA STRUCTURES & ALGORITHMS</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-100 mt-1">
              Coding Practice & LeetCode Tracker
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 mt-1">
              Log algorithmic patterns, space/time trade-offs, and maintain recall for technical interviews.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Visual ratio bar */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 min-w-[200px]">
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-neutral-400">Total Solved</span>
                <span className="text-neutral-100 font-bold tabular-nums">{totalSolved}</span>
              </div>
              <div className="flex items-center h-2 bg-neutral-900 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${totalSolved > 0 ? (easyCount / totalSolved) * 100 : 33}%` }}
                  title={`Easy: ${easyCount}`}
                />
                <div
                  className="bg-amber-500 h-full"
                  style={{ width: `${totalSolved > 0 ? (medCount / totalSolved) * 100 : 33}%` }}
                  title={`Medium: ${medCount}`}
                />
                <div
                  className="bg-rose-500 h-full"
                  style={{ width: `${totalSolved > 0 ? (hardCount / totalSolved) * 100 : 33}%` }}
                  title={`Hard: ${hardCount}`}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mt-1.5">
                <span className="text-emerald-400">{easyCount} Easy</span>
                <span className="text-amber-400">{medCount} Med</span>
                <span className="text-rose-400">{hardCount} Hard</span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all whitespace-nowrap"
            >
              <Plus className="h-4 w-4" />
              <span>Log Problem</span>
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search problems, topics, or complexity..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs">
            {(['all', 'Easy', 'Medium', 'Hard'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDiffFilter(d)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  diffFilter === d
                    ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {d === 'all' ? 'All' : d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Problem Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProblems.map((prob) => (
          <div
            key={prob.id}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between hover:border-neutral-700 transition-colors shadow-sm"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                      prob.difficulty === 'Easy'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : prob.difficulty === 'Medium'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {prob.difficulty}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {prob.platform}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {prob.problemUrl && (
                    <a
                      href={prob.problemUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-neutral-200 p-1"
                      title="Open problem link"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => deleteProblem(prob.id)}
                    className="text-neutral-500 hover:text-rose-400 p-1"
                    title="Delete entry"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-bold text-neutral-100 mt-2">
                {prob.title}
              </h4>
              <div className="text-xs text-neutral-400 font-mono mt-0.5">
                Topic: <span className="text-neutral-300 font-medium">{prob.topic}</span>
              </div>

              {prob.solutionNotes && (
                <p className="text-xs text-neutral-400 mt-3 leading-relaxed line-clamp-3 bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-850">
                  {prob.solutionNotes}
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="text-indigo-400">T: {prob.timeComplexity}</span>
                <span>·</span>
                <span className="text-purple-400">S: {prob.spaceComplexity}</span>
              </div>
              <span className="text-neutral-500">{prob.dateSolved}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Problem Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-neutral-100">
            <h3 className="text-base font-bold text-neutral-100 mb-4">
              Log Coding Practice Problem
            </h3>
            <form onSubmit={handleCreateProblem} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Problem Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Longest Repeating Character Replacement"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="LeetCode">LeetCode</option>
                    <option value="NeetCode">NeetCode</option>
                    <option value="HackerRank">HackerRank</option>
                    <option value="Codeforces">Codeforces</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Sliding Window"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Time Complexity
                  </label>
                  <input
                    type="text"
                    value={timeComp}
                    onChange={(e) => setTimeComp(e.target.value)}
                    placeholder="e.g. O(n log n)"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Space Complexity
                  </label>
                  <input
                    type="text"
                    value={spaceComp}
                    onChange={(e) => setSpaceComp(e.target.value)}
                    placeholder="e.g. O(1)"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Problem URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://leetcode.com/problems/..."
                  value={problemUrl}
                  onChange={(e) => setProblemUrl(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Key Intuition & Edge Case Notes
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record the invariant, tricky edge cases, and why this algorithmic pattern works..."
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
                  Save Problem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
