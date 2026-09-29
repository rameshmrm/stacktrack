import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Plus,
  Building,
  Calendar,
  DollarSign,
  ExternalLink,
  Trash2,
  Filter,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Internship } from '../../types';

export const InternshipsView: React.FC = () => {
  const { internships, addInternship, updateInternship, deleteInternship } = useApp();
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New application form
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('Full-Stack Software Engineer Intern');
  const [location, setLocation] = useState('San Francisco, CA / Remote');
  const [type, setType] = useState<Internship['type']>('Summer Intern');
  const [status, setStatus] = useState<Internship['status']>('Applied');
  const [stipend, setStipend] = useState('$55/hr');
  const [referral, setReferral] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [notes, setNotes] = useState('');

  const handleCreateInternship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim()) return;

    addInternship({
      company: company.trim(),
      role: role.trim(),
      location: location.trim(),
      type,
      status,
      dateApplied: new Date().toISOString().split('T')[0],
      salaryOrStipend: stipend.trim() || undefined,
      referral: referral.trim() || undefined,
      jobUrl: jobUrl.trim() || undefined,
      notes: notes.trim()
    });

    setCompany('');
    setNotes('');
    setReferral('');
    setJobUrl('');
    setIsModalOpen(false);
  };

  const columns: Internship['status'][] = ['Wishlist', 'Applied', 'OA', 'Interview', 'Offer', 'Rejected'];

  const getStatusColor = (st: Internship['status']) => {
    switch (st) {
      case 'Offer': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Interview': return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      case 'OA': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Applied': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30';
      case 'Wishlist': return 'text-neutral-400 bg-neutral-950 border-neutral-800';
      case 'Rejected': return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      default: return 'text-neutral-400 bg-neutral-950 border-neutral-800';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              <span>CAREER RECRUITING PIPELINE</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-100 mt-1">
              SWE Internship Application Tracker
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 mt-1">
              Manage summer engineering internships, online assessments, technical rounds, and offer packages.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs">
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  viewMode === 'kanban'
                    ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Kanban
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  viewMode === 'table'
                    ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Table
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all whitespace-nowrap"
            >
              <Plus className="h-4 w-4" />
              <span>Add Application</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Pipeline View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 items-start">
          {columns.map((col) => {
            const apps = internships.filter(i => i.status === col);

            return (
              <div
                key={col}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col min-h-[450px]"
              >
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80 mb-3">
                  <span className="text-xs font-bold font-mono text-neutral-300">
                    {col.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-neutral-500 bg-neutral-950 px-2 py-0.5 rounded">
                    {apps.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  {apps.map((app) => (
                    <div
                      key={app.id}
                      className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-xl p-3.5 space-y-2 transition-colors shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-neutral-100">
                          {app.company}
                        </h4>
                        <button
                          onClick={() => deleteInternship(app.id)}
                          className="text-neutral-500 hover:text-rose-400 p-0.5"
                          title="Delete"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>

                      <p className="text-[11px] text-neutral-400 leading-tight">
                        {app.role}
                      </p>

                      {app.salaryOrStipend && (
                        <div className="text-[10px] font-mono text-emerald-400">
                          {app.salaryOrStipend}
                        </div>
                      )}

                      {app.notes && (
                        <p className="text-[11px] text-neutral-400 bg-neutral-900/60 p-2 rounded border border-neutral-850 line-clamp-2 leading-relaxed">
                          {app.notes}
                        </p>
                      )}

                      <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                        <span>{app.dateApplied}</span>
                        <select
                          value={app.status}
                          onChange={(e) => updateInternship(app.id, { status: e.target.value as any })}
                          className="bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 rounded px-1.5 py-0.5 focus:outline-none"
                        >
                          {columns.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* High Density Table View */
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950/80 border-b border-neutral-800 text-neutral-400 font-mono">
                <tr>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Compensation</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-neutral-200">
                {internships.map((app) => (
                  <tr key={app.id} className="hover:bg-neutral-850/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-neutral-100">{app.company}</td>
                    <td className="py-3 px-4 text-neutral-300">{app.role}</td>
                    <td className="py-3 px-4 text-neutral-400">{app.location}</td>
                    <td className="py-3 px-4 font-mono text-emerald-400">{app.salaryOrStipend || '—'}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] border ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-neutral-400">{app.dateApplied}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => deleteInternship(app.id)}
                        className="text-neutral-500 hover:text-rose-400 p-1"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-neutral-100">
            <h3 className="text-base font-bold text-neutral-100 mb-4">
              Add Internship Application
            </h3>
            <form onSubmit={handleCreateInternship} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stripe, Cloudflare, Figma"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Role Title</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
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
                    {columns.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Compensation</label>
                  <input
                    type="text"
                    value={stipend}
                    onChange={(e) => setStipend(e.target.value)}
                    placeholder="$55/hr"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Interview Prep & Notes</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record referral contacts, OA questions, technical focus areas..."
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
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
