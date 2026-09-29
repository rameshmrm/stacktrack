import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FolderGit2,
  Plus,
  Github,
  Star,
  GitFork,
  ExternalLink,
  CheckCircle2,
  Circle,
  Trash2,
  RefreshCw,
  AlertCircle,
  Sparkles,
  Calendar,
  Layers,
  ArrowDownToLine
} from 'lucide-react';
import { Project, GitHubRepo } from '../../types';

export const ProjectsView: React.FC = () => {
  const {
    projects,
    addProject,
    updateProject,
    toggleProjectFeature,
    deleteProject,
    githubRepos,
    isFetchingRepos,
    reposError,
    fetchGitHubRepos,
    importGitHubRepoAsProject,
    userProfile,
    updateUserProfile
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all_projects' | 'github_repos'>('all_projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customGhUser, setCustomGhUser] = useState(userProfile.githubUsername || 'alexrivera-dev');
  const [isEditingGhUser, setIsEditingGhUser] = useState(false);

  // New project form state
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Project['category']>('Full-Stack');
  const [techStackStr, setTechStackStr] = useState('React, Node.js, PostgreSQL, Docker');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [learnings, setLearnings] = useState('');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const stack = techStackStr.split(',').map(s => s.trim()).filter(Boolean);

    addProject({
      title: title.trim(),
      tagline: tagline.trim() || title.trim(),
      description: description.trim(),
      category,
      techStack: stack,
      githubUrl: githubUrl.trim(),
      liveUrl: liveUrl.trim() || undefined,
      status: 'In Progress',
      progress: 25,
      features: [
        { id: `f-${Date.now()}-1`, name: 'Architecture and initial setup', completed: true },
        { id: `f-${Date.now()}-2`, name: 'Core feature implementation', completed: false },
        { id: `f-${Date.now()}-3`, name: 'Testing and cloud deployment', completed: false }
      ],
      keyLearnings: learnings.trim()
    });

    setTitle('');
    setTagline('');
    setDescription('');
    setGithubUrl('');
    setLiveUrl('');
    setLearnings('');
    setIsModalOpen(false);
  };

  const handleUpdateGhUser = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customGhUser.trim();
    if (clean) {
      updateUserProfile({ githubUsername: clean });
      fetchGitHubRepos(clean);
      setIsEditingGhUser(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              <span>PORTFOLIO & CODE ARTIFACTS</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-100 mt-1">
              Projects & GitHub Repositories
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 mt-1 max-w-2xl">
              Track full-stack applications with feature checklists, and automatically sync your public GitHub repositories with live stars, forks, and commit metrics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all whitespace-nowrap"
            >
              <Plus className="h-4 w-4" />
              <span>Create Project</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher & GitHub Profile Quick bar */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs">
            <button
              onClick={() => setActiveTab('all_projects')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'all_projects'
                  ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Tracked Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('github_repos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'github_repos'
                  ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Github className="h-3.5 w-3.5" />
              <span>Live GitHub Repos ({githubRepos.length})</span>
            </button>
          </div>

          {/* GitHub Account connector */}
          <div className="flex items-center gap-2 text-xs">
            {!isEditingGhUser ? (
              <div className="flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800">
                <Github className="h-3.5 w-3.5 text-neutral-400" />
                <span className="text-neutral-300 font-mono">@{userProfile.githubUsername || 'alexrivera-dev'}</span>
                <button
                  onClick={() => setIsEditingGhUser(true)}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 underline ml-1"
                >
                  Change
                </button>
                <button
                  onClick={() => fetchGitHubRepos(userProfile.githubUsername)}
                  disabled={isFetchingRepos}
                  className="text-neutral-400 hover:text-neutral-200 ml-1 p-0.5"
                  title="Refresh repos"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isFetchingRepos ? 'animate-spin text-indigo-400' : ''}`} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleUpdateGhUser} className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={customGhUser}
                  onChange={(e) => setCustomGhUser(e.target.value)}
                  placeholder="GitHub username"
                  className="bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-neutral-200 font-mono focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                >
                  Sync
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingGhUser(false)}
                  className="text-neutral-400 hover:text-neutral-200 text-xs px-1"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* View Content */}
      {activeTab === 'all_projects' ? (
        /* Tracked Projects Grid */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                        {project.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                          project.status === 'Deployed'
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                            : project.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-neutral-100 mt-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
                        title="View GitHub repository"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
                        title="View live deployment"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Tech Stack (clean unboxed text with separators) */}
                <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-neutral-400">
                  {project.techStack.map((tech, i) => (
                    <span key={tech} className="flex items-center gap-1.5">
                      <span className="text-neutral-300 font-mono text-[11px]">{tech}</span>
                      {i < project.techStack.length - 1 && <span className="text-neutral-600">·</span>}
                    </span>
                  ))}
                </div>

                {/* Feature Checklist */}
                <div className="mt-5 space-y-2 bg-neutral-950/70 border border-neutral-850 rounded-xl p-4">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-neutral-400">Feature Delivery</span>
                    <span className="text-neutral-200 font-bold">{project.progress}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    {project.features.map((feat) => (
                      <div
                        key={feat.id}
                        onClick={() => toggleProjectFeature(project.id, feat.id)}
                        className="flex items-center gap-2.5 text-xs cursor-pointer text-neutral-300 hover:text-white transition-colors"
                      >
                        {feat.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-neutral-600 shrink-0" />
                        )}
                        <span className={feat.completed ? 'line-through text-neutral-500' : ''}>
                          {feat.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key learnings */}
                {project.keyLearnings && (
                  <div className="mt-3 text-xs text-neutral-400 leading-relaxed italic bg-neutral-950/30 p-2.5 rounded-lg border border-neutral-850">
                    <strong className="font-mono not-italic text-neutral-300">Engineering Takeaway:</strong> {project.keyLearnings}
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>Created {project.createdAt}</span>
                <span className="text-indigo-400">Ready for Portfolio</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Live GitHub Repositories Integration Section */
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Github className="h-6 w-6 text-neutral-200" />
              <div>
                <h4 className="text-sm font-bold text-neutral-100">
                  Public Repositories for @{userProfile.githubUsername || 'alexrivera-dev'}
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Synchronized live with the GitHub REST API. Click "Import to StackTrack" to track feature milestones and milestones.
                </p>
              </div>
            </div>

            <button
              onClick={() => fetchGitHubRepos(userProfile.githubUsername)}
              disabled={isFetchingRepos}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 transition-colors"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isFetchingRepos ? 'animate-spin text-indigo-400' : ''}`} />
              <span>Refresh Repos</span>
            </button>
          </div>

          {reposError && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{reposError} (Displaying cached and portfolio repositories below).</span>
            </div>
          )}

          {isFetchingRepos && githubRepos.length === 0 ? (
            <div className="py-16 text-center text-neutral-400">
              <RefreshCw className="h-6 w-6 animate-spin mx-auto text-indigo-500 mb-2" />
              <p className="text-xs font-mono">Fetching public GitHub repositories...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {githubRepos.map((repo) => {
                const isImported = projects.some(
                  p => p.githubUrl.toLowerCase() === repo.htmlUrl.toLowerCase() || p.title.toLowerCase() === repo.name.toLowerCase()
                );

                return (
                  <div
                    key={repo.id}
                    className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between hover:border-neutral-700 transition-colors shadow-sm"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-neutral-100 truncate flex items-center gap-1.5">
                            <span className="text-indigo-400">{repo.name}</span>
                          </h4>
                          <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                            {repo.description || 'No description provided.'}
                          </p>
                        </div>

                        <a
                          href={repo.htmlUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-neutral-400 hover:text-neutral-200 transition-colors shrink-0"
                          title="Open repo on GitHub"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>

                      {/* Metrics: Stars, Forks, Language, Updated Date */}
                      <div className="mt-4 pt-3 border-t border-neutral-800 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
                        {repo.language && (
                          <span className="flex items-center gap-1.5 text-neutral-300">
                            <span className="h-2 w-2 rounded-full bg-indigo-400" />
                            <span>{repo.language}</span>
                          </span>
                        )}

                        <span className="flex items-center gap-1 text-amber-400">
                          <Star className="h-3.5 w-3.5 fill-amber-400/20" />
                          <span className="tabular-nums">{repo.starsCount}</span>
                        </span>

                        <span className="flex items-center gap-1 text-neutral-400">
                          <GitFork className="h-3.5 w-3.5" />
                          <span className="tabular-nums">{repo.forksCount}</span>
                        </span>

                        <span className="flex items-center gap-1 text-neutral-500 text-[11px]">
                          <Calendar className="h-3 w-3" />
                          <span>Pushed {formatDate(repo.pushedAt)}</span>
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-neutral-500">
                        Branch: {repo.defaultBranch}
                      </span>

                      {isImported ? (
                        <span className="flex items-center gap-1 text-xs font-mono text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Tracked in Projects</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => importGitHubRepoAsProject(repo)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 transition-colors"
                        >
                          <ArrowDownToLine className="h-3.5 w-3.5 text-indigo-400" />
                          <span>Import to StackTrack</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-neutral-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-neutral-100 mb-4">
              Add New Project
            </h3>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Task Queue & Dashboard"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Tagline (1 sentence summary)
                </label>
                <input
                  type="text"
                  placeholder="e.g. High-throughput job processing engine with BullMQ and Redis"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
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
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend/API">Backend/API</option>
                    <option value="DevOps/System">DevOps/System</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={techStackStr}
                    onChange={(e) => setTechStackStr(e.target.value)}
                    placeholder="React, Node.js, Docker, Postgres"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Architecture Overview & Key Learnings
                </label>
                <textarea
                  rows={3}
                  value={learnings}
                  onChange={(e) => setLearnings(e.target.value)}
                  placeholder="What were the biggest architectural decisions and challenges solved in this project?"
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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
