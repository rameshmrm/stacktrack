import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  User,
  Moon,
  Sun,
  Download,
  Upload,
  RotateCcw,
  Check,
  AlertTriangle,
  Github,
  Linkedin,
  Clock,
  Target
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    theme,
    toggleTheme,
    resetAllData,
    exportDataJSON,
    importDataJSON,
    fetchGitHubRepos
  } = useApp();

  const [formData, setFormData] = useState({ ...userProfile });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importStr, setImportStr] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
    if (formData.githubUsername !== userProfile.githubUsername) {
      fetchGitHubRepos(formData.githubUsername);
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleExport = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stacktrack-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importStr.trim()) return;
    const ok = importDataJSON(importStr.trim());
    if (ok) {
      setImportStatus('Data successfully restored!');
      setImportStr('');
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus('Error: Invalid JSON format.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data back to the default full-stack developer state?')) {
      resetAllData();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
          <span>PREFERENCES & DATA CONFIGURATION</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-neutral-100 mt-1">
          Settings & Student Profile
        </h2>
        <p className="text-xs md:text-sm text-neutral-400 mt-1">
          Customize your engineering targets, linked accounts, and export full JSON snapshots.
        </p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleProfileSubmit} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-indigo-400" />
            <h3 className="text-base font-bold text-neutral-100">
              Student & Candidate Profile
            </h3>
          </div>
          {saveSuccess && (
            <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono">
              <Check className="h-4 w-4" />
              <span>Saved!</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1">Target Role</label>
            <input
              type="text"
              required
              value={formData.targetRole}
              onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1">University / Institute</label>
            <input
              type="text"
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1">Degree / Major</label>
            <input
              type="text"
              value={formData.major}
              onChange={(e) => setFormData({ ...formData, major: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1">GitHub Username</label>
            <div className="relative">
              <Github className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="text"
                value={formData.githubUsername}
                onChange={(e) => setFormData({ ...formData, githubUsername: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-200 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1">LinkedIn Username</label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="text"
                value={formData.linkedinUsername}
                onChange={(e) => setFormData({ ...formData, linkedinUsername: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-200 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1">Daily Study Target (Hours)</label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="16"
              value={formData.dailyHourGoal}
              onChange={(e) => setFormData({ ...formData, dailyHourGoal: Number(e.target.value) })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1">Weekly Problem Target</label>
            <input
              type="number"
              min="1"
              max="50"
              value={formData.weeklyProblemGoal}
              onChange={(e) => setFormData({ ...formData, weeklyProblemGoal: Number(e.target.value) })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
          >
            Save Profile Changes
          </button>
        </div>
      </form>

      {/* Appearance */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex items-center justify-between shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-neutral-100">Theme Appearance</h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Switch between developer dark mode and daylight mode.
          </p>
        </div>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-xl text-xs font-medium text-neutral-200 transition-colors"
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
      </div>

      {/* Data Management: Export / Import */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="text-sm font-bold text-neutral-100">
          Data Backup & Portability
        </h3>
        <p className="text-xs text-neutral-400">
          Your entire curriculum progress, notes, tasks, LeetCode solutions, and goals can be exported as a standalone JSON file or restored on any machine.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-xl text-xs font-medium text-neutral-200 transition-colors"
          >
            <Download className="h-4 w-4 text-indigo-400" />
            <span>Export Backup (JSON)</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-950 border border-neutral-800 hover:border-rose-900/50 text-rose-400 rounded-xl text-xs font-medium transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset Sample Data</span>
          </button>
        </div>

        {/* Import JSON form */}
        <form onSubmit={handleImportSubmit} className="pt-4 border-t border-neutral-800 space-y-2">
          <label className="block text-xs font-medium text-neutral-400">
            Restore Backup from JSON:
          </label>
          <textarea
            rows={2}
            value={importStr}
            onChange={(e) => setImportStr(e.target.value)}
            placeholder="Paste exported JSON snapshot here..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-200 font-mono focus:outline-none focus:border-indigo-500"
          />
          {importStatus && (
            <div className="text-xs font-mono text-indigo-400">{importStatus}</div>
          )}
          <button
            type="submit"
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-medium"
          >
            Import & Restore Data
          </button>
        </form>
      </div>
    </div>
  );
};
