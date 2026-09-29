import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Plus,
  Calendar,
  Users,
  ExternalLink,
  Trash2,
  Award,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Hackathon } from '../../types';

export const HackathonsView: React.FC = () => {
  const { hackathons, addHackathon, updateHackathon, deleteHackathon } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New hackathon form
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState('Devpost');
  const [date, setDate] = useState('2026-10-24');
  const [teamSize, setTeamSize] = useState(3);
  const [projectTitle, setProjectTitle] = useState('');
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [status, setStatus] = useState<Hackathon['status']>('Registered');
  const [prize, setPrize] = useState('');
  const [learnings, setLearnings] = useState('');

  const handleCreateHackathon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addHackathon({
      name: name.trim(),
      platform: platform.trim(),
      date,
      teamSize,
      projectTitle: projectTitle.trim() || 'Hackathon Prototype',
      submissionUrl: submissionUrl.trim() || undefined,
      status,
      prizeOrAward: prize.trim() || undefined,
      learnings: learnings.trim()
    });

    setName('');
    setProjectTitle('');
    setSubmissionUrl('');
    setPrize('');
    setLearnings('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <span>RAPID PROTOTYPING & COMPETITIONS</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-100 mt-1">
              Hackathons & Sprints
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 mt-1">
              Document 24–48 hour builds, track awards, and capture high-pressure architectural learnings.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all self-start sm:self-center"
          >
            <Plus className="h-4 w-4" />
            <span>Add Hackathon</span>
          </button>
        </div>
      </div>

      {/* Hackathons Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hackathons.map((hack) => (
          <div
            key={hack.id}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors shadow-sm"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                      {hack.platform}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                        hack.status === 'Winner'
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : hack.status === 'Runner-up' || hack.status === 'Finalist'
                          ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                          : 'bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      {hack.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-100 mt-2">
                    {hack.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5">
                  {hack.submissionUrl && (
                    <a
                      href={hack.submissionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-neutral-400 hover:text-neutral-200 transition-colors"
                      title="Open submission"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  <button
                    onClick={() => deleteHackathon(hack.id)}
                    className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Award banner if won */}
              {hack.prizeOrAward && (
                <div className="mt-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 text-xs font-semibold text-amber-300">
                  <Trophy className="h-4 w-4 shrink-0 text-amber-400" />
                  <span>{hack.prizeOrAward}</span>
                </div>
              )}

              {/* Built project */}
              <div className="mt-4 text-xs">
                <span className="text-neutral-400 font-mono">Project Built: </span>
                <span className="text-neutral-200 font-semibold">{hack.projectTitle}</span>
              </div>

              {/* Learnings */}
              {hack.learnings && (
                <p className="mt-3 text-xs text-neutral-400 leading-relaxed bg-neutral-950/60 p-3 rounded-xl border border-neutral-850">
                  <strong className="text-neutral-300 font-mono">Post-Mortem: </strong>
                  {hack.learnings}
                </p>
              )}
            </div>

            <div className="mt-6 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span className="flex items-center gap-1.5 text-neutral-400">
                <Calendar className="h-3.5 w-3.5" />
                <span>{hack.date}</span>
              </span>
              <span className="flex items-center gap-1 text-neutral-400">
                <Users className="h-3.5 w-3.5" />
                <span>Team of {hack.teamSize}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Hackathon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-neutral-100">
            <h3 className="text-base font-bold text-neutral-100 mb-4">
              Add Hackathon Record
            </h3>
            <form onSubmit={handleCreateHackathon} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Hackathon Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CalHacks, HackMIT"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Platform</label>
                  <input
                    type="text"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    placeholder="MLH, Devpost, Unstop"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Registered">Registered</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Winner">Winner</option>
                    <option value="Runner-up">Runner-up</option>
                    <option value="Finalist">Finalist</option>
                    <option value="Participated">Participated</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Team Size</label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Project Title</label>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g. Real-Time Distributed Cache"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Prize / Award (Optional)</label>
                  <input
                    type="text"
                    value={prize}
                    onChange={(e) => setPrize(e.target.value)}
                    placeholder="e.g. 1st Place Overall ($5,000)"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Post-Mortem & Learnings</label>
                <textarea
                  rows={3}
                  value={learnings}
                  onChange={(e) => setLearnings(e.target.value)}
                  placeholder="Key technical lessons, architecture decisions made under time pressure..."
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
                  Save Hackathon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
