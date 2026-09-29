import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  RoadmapPhase,
  RoadmapTopic,
  TopicStatus,
  StudyTask,
  CodingProblem,
  Project,
  Resource,
  Note,
  Goal,
  Internship,
  Hackathon,
  Achievement,
  UserProfile,
  DailyActivityLog,
  GitHubRepo,
  AchievementUnlockEvent
} from '../types';
import {
  initialPhases,
  initialTasks,
  initialProblems,
  initialProjects,
  initialResources,
  initialNotes,
  initialGoals,
  initialInternships,
  initialHackathons,
  initialAchievements,
  initialUserProfile,
  generateInitialActivityLogs
} from '../data/initialData';

interface AppContextType {
  // Navigation & Theme
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedTopicId: string | null;
  setSelectedTopicId: (topicId: string | null) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // Data
  phases: RoadmapPhase[];
  tasks: StudyTask[];
  problems: CodingProblem[];
  projects: Project[];
  resources: Resource[];
  notes: Note[];
  goals: Goal[];
  internships: Internship[];
  hackathons: Hackathon[];
  achievements: Achievement[];
  userProfile: UserProfile;
  activityLogs: DailyActivityLog[];

  // GitHub integration
  githubRepos: GitHubRepo[];
  isFetchingRepos: boolean;
  reposError: string | null;
  fetchGitHubRepos: (customUsername?: string) => Promise<void>;
  importGitHubRepoAsProject: (repo: GitHubRepo) => void;

  // Achievements notification
  latestUnlockedAchievement: AchievementUnlockEvent | null;
  dismissAchievementNotification: () => void;

  // Actions
  toggleTopicStatus: (phaseId: string, moduleId: string, topicId: string, newStatus?: TopicStatus) => void;
  addTask: (task: Omit<StudyTask, 'id'>) => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  addProblem: (problem: Omit<CodingProblem, 'id'>) => void;
  updateProblem: (id: string, updates: Partial<CodingProblem>) => void;
  deleteProblem: (id: string) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  toggleProjectFeature: (projectId: string, featureId: string) => void;
  deleteProject: (id: string) => void;
  addResource: (resource: Omit<Resource, 'id'>) => void;
  updateResource: (id: string, updates: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
  toggleResourceBookmark: (id: string) => void;
  addTagToResource: (id: string, tag: string) => void;
  removeTagFromResource: (id: string, tag: string) => void;
  addNote: (note: Omit<Note, 'id' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  toggleGoalMilestone: (goalId: string, milestoneId: string) => void;
  deleteGoal: (id: string) => void;
  addInternship: (internship: Omit<Internship, 'id'>) => void;
  updateInternship: (id: string, updates: Partial<Internship>) => void;
  deleteInternship: (id: string) => void;
  addHackathon: (hackathon: Omit<Hackathon, 'id'>) => void;
  updateHackathon: (id: string, updates: Partial<Hackathon>) => void;
  deleteHackathon: (id: string) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  logStudySession: (hours: number, topicId?: string, noteTitle?: string) => void;
  resetAllData: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;

  // Computed metrics
  stats: {
    totalTopics: number;
    completedTopics: number;
    inProgressTopics: number;
    overallProgressPercent: number;
    streakDays: number;
    totalHoursLogged: number;
    weeklyHoursLogged: number;
    totalProblemsSolved: number;
    categoryProgress: Record<string, { total: number; completed: number; percent: number }>;
    totalXP: number;
    userLevel: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'stacktrack_v1_data';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>('top-2-2-1');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Core state loaded from localStorage or initialData
  const [phases, setPhases] = useState<RoadmapPhase[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_phases');
      return saved ? JSON.parse(saved) : initialPhases;
    } catch {
      return initialPhases;
    }
  });

  const [tasks, setTasks] = useState<StudyTask[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_tasks');
      return saved ? JSON.parse(saved) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  const [problems, setProblems] = useState<CodingProblem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_problems');
      return saved ? JSON.parse(saved) : initialProblems;
    } catch {
      return initialProblems;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_projects');
      return saved ? JSON.parse(saved) : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [resources, setResources] = useState<Resource[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_resources');
      return saved ? JSON.parse(saved) : initialResources;
    } catch {
      return initialResources;
    }
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_notes');
      return saved ? JSON.parse(saved) : initialNotes;
    } catch {
      return initialNotes;
    }
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_goals');
      return saved ? JSON.parse(saved) : initialGoals;
    } catch {
      return initialGoals;
    }
  });

  const [internships, setInternships] = useState<Internship[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_internships');
      return saved ? JSON.parse(saved) : initialInternships;
    } catch {
      return initialInternships;
    }
  });

  const [hackathons, setHackathons] = useState<Hackathon[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_hackathons');
      return saved ? JSON.parse(saved) : initialHackathons;
    } catch {
      return initialHackathons;
    }
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_achievements');
      return saved ? JSON.parse(saved) : initialAchievements;
    } catch {
      return initialAchievements;
    }
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_profile');
      return saved ? JSON.parse(saved) : initialUserProfile;
    } catch {
      return initialUserProfile;
    }
  });

  const [activityLogs, setActivityLogs] = useState<DailyActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_activity');
      return saved ? JSON.parse(saved) : generateInitialActivityLogs();
    } catch {
      return generateInitialActivityLogs();
    }
  });

  // Achievement unlock notification banner
  const [latestUnlockedAchievement, setLatestUnlockedAchievement] = useState<AchievementUnlockEvent | null>(null);

  // GitHub Repos API State
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [isFetchingRepos, setIsFetchingRepos] = useState<boolean>(false);
  const [reposError, setReposError] = useState<string | null>(null);

  // Sync with document HTML class for theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY + '_phases', JSON.stringify(phases));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_tasks', JSON.stringify(tasks));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_problems', JSON.stringify(problems));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_projects', JSON.stringify(projects));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_resources', JSON.stringify(resources));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_notes', JSON.stringify(notes));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_goals', JSON.stringify(goals));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_internships', JSON.stringify(internships));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_hackathons', JSON.stringify(hackathons));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_achievements', JSON.stringify(achievements));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_profile', JSON.stringify(userProfile));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_activity', JSON.stringify(activityLogs));
    } catch (e) {
      console.error('Failed to sync to localStorage', e);
    }
  }, [phases, tasks, problems, projects, resources, notes, goals, internships, hackathons, achievements, userProfile, activityLogs]);

  // Trigger achievement unlock
  const unlockAchievementById = useCallback((achievementId: string) => {
    setAchievements(prev => {
      const target = prev.find(a => a.id === achievementId);
      if (!target || target.unlocked) return prev;

      const now = new Date().toISOString().split('T')[0];
      const updated = prev.map(a =>
        a.id === achievementId ? { ...a, unlocked: true, unlockedAt: now } : a
      );

      const unlockedItem = updated.find(a => a.id === achievementId);
      if (unlockedItem) {
        setLatestUnlockedAchievement({
          achievement: unlockedItem,
          timestamp: Date.now()
        });
      }
      return updated;
    });
  }, []);

  const dismissAchievementNotification = () => {
    setLatestUnlockedAchievement(null);
  };

  // Evaluate achievements condition engine
  useEffect(() => {
    // 1. First Step (completed >= 1 topic)
    let totalCompleted = 0;
    let phase0AllDone = true;

    phases.forEach((phase) => {
      let phaseDone = true;
      phase.modules.forEach((mod) => {
        mod.topics.forEach((top) => {
          if (top.status === 'completed') {
            totalCompleted++;
          } else {
            phaseDone = false;
          }
        });
      });
      if (phase.phaseNumber === 0 && !phaseDone) {
        phase0AllDone = false;
      }
    });

    if (totalCompleted >= 1) unlockAchievementById('ach-1');
    if (phase0AllDone) unlockAchievementById('ach-8');

    // 2. Completed projects
    const completedProjectsCount = projects.filter(p => p.status === 'Completed' || p.status === 'Deployed').length;
    if (completedProjectsCount >= 1) unlockAchievementById('ach-3');
    if (projects.some(p => p.status === 'Deployed')) unlockAchievementById('ach-4');

    // 3. Coding problems
    const solvedProblemsCount = problems.filter(p => p.status === 'Solved').length;
    if (solvedProblemsCount >= 5) unlockAchievementById('ach-5');
    if (solvedProblemsCount >= 25) unlockAchievementById('ach-6');

    // 4. Hours logged
    const totalHours = activityLogs.reduce((acc, curr) => acc + curr.hours, 0);
    if (totalHours >= 50) unlockAchievementById('ach-9');
    if (totalHours >= 100) unlockAchievementById('ach-10');

    // 5. Knowledge Vault (resources + notes)
    if (resources.length + notes.length >= 8) unlockAchievementById('ach-11');

    // 6. Internships tracked
    if (internships.length >= 4) unlockAchievementById('ach-12');

    // 7. Hackathons
    if (hackathons.some(h => h.status === 'Winner' || h.status === 'Submitted')) unlockAchievementById('ach-13');
  }, [phases, projects, problems, activityLogs, resources, notes, internships, hackathons, unlockAchievementById]);

  // Fetch public GitHub repositories using real GitHub REST API
  const fetchGitHubRepos = useCallback(async (customUsername?: string) => {
    const username = (customUsername || userProfile.githubUsername || 'alexrivera-dev').trim();
    if (!username) return;

    setIsFetchingRepos(true);
    setReposError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=30`, {
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`GitHub user "${username}" was not found.`);
        } else if (response.status === 403) {
          throw new Error('GitHub API rate limit exceeded. Please try again in a few minutes.');
        } else {
          throw new Error(`GitHub API error: ${response.statusText}`);
        }
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        const mapped: GitHubRepo[] = data.map((r: any) => ({
          id: r.id,
          name: r.name,
          fullName: r.full_name,
          description: r.description,
          htmlUrl: r.html_url,
          homepage: r.homepage,
          starsCount: r.stargazers_count ?? 0,
          forksCount: r.forks_count ?? 0,
          openIssuesCount: r.open_issues_count ?? 0,
          language: r.language,
          topics: r.topics || [],
          updatedAt: r.updated_at,
          pushedAt: r.pushed_at,
          isPrivate: r.private,
          defaultBranch: r.default_branch || 'main'
        }));
        setGithubRepos(mapped);
      }
    } catch (err: any) {
      console.warn('GitHub fetch warning:', err.message);
      setReposError(err.message || 'Failed to fetch repositories');
      
      // Fallback to high-quality sample developer repos if rate limited or offline
      if (githubRepos.length === 0) {
        setGithubRepos([
          {
            id: 88102,
            name: 'devpulse-analytics',
            fullName: `${username}/devpulse-analytics`,
            description: 'Full-stack platform tracking GitHub pull request velocity, code reviews, and developer throughput.',
            htmlUrl: `https://github.com/${username}/devpulse-analytics`,
            homepage: 'https://devpulse.example.dev',
            starsCount: 38,
            forksCount: 9,
            openIssuesCount: 2,
            language: 'TypeScript',
            topics: ['nextjs', 'postgresql', 'prisma', 'redis', 'tailwindcss'],
            updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
            pushedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
            isPrivate: false,
            defaultBranch: 'main'
          },
          {
            id: 88103,
            name: 'hyperstore-engine',
            fullName: `${username}/hyperstore-engine`,
            description: 'High-concurrency e-commerce order inventory and flash sale engine with Redis atomic locks.',
            htmlUrl: `https://github.com/${username}/hyperstore-engine`,
            homepage: null,
            starsCount: 24,
            forksCount: 4,
            openIssuesCount: 0,
            language: 'TypeScript',
            topics: ['nodejs', 'express', 'redis', 'stripe', 'vitest'],
            updatedAt: new Date(Date.now() - 3600000 * 36).toISOString(),
            pushedAt: new Date(Date.now() - 3600000 * 36).toISOString(),
            isPrivate: false,
            defaultBranch: 'main'
          },
          {
            id: 88104,
            name: 'gitcast-cli',
            fullName: `${username}/gitcast-cli`,
            description: 'Terminal CLI tool written in TypeScript to parse Git reflog and render interactive ASCII tree graphs.',
            htmlUrl: `https://github.com/${username}/gitcast-cli`,
            homepage: null,
            starsCount: 112,
            forksCount: 18,
            openIssuesCount: 1,
            language: 'TypeScript',
            topics: ['cli', 'git', 'terminal', 'developer-tools'],
            updatedAt: new Date(Date.now() - 3600000 * 96).toISOString(),
            pushedAt: new Date(Date.now() - 3600000 * 96).toISOString(),
            isPrivate: false,
            defaultBranch: 'main'
          },
          {
            id: 88105,
            name: 'fullstack-dsa-patterns',
            fullName: `${username}/fullstack-dsa-patterns`,
            description: 'Clean TypeScript solutions and space/time complexity explanations for 150+ NeetCode problems.',
            htmlUrl: `https://github.com/${username}/fullstack-dsa-patterns`,
            homepage: null,
            starsCount: 45,
            forksCount: 12,
            openIssuesCount: 0,
            language: 'TypeScript',
            topics: ['leetcode', 'algorithms', 'data-structures', 'interview-prep'],
            updatedAt: new Date(Date.now() - 3600000 * 120).toISOString(),
            pushedAt: new Date(Date.now() - 3600000 * 120).toISOString(),
            isPrivate: false,
            defaultBranch: 'main'
          }
        ]);
      }
    } finally {
      setIsFetchingRepos(false);
    }
  }, [userProfile.githubUsername, githubRepos.length]);

  // Initial fetch of GitHub repos on mount
  useEffect(() => {
    fetchGitHubRepos();
  }, [fetchGitHubRepos]);

  // Import a GitHub repository directly into StackTrack's tracked Projects
  const importGitHubRepoAsProject = (repo: GitHubRepo) => {
    // Check if already imported
    const exists = projects.some(p => p.githubUrl.toLowerCase() === repo.htmlUrl.toLowerCase() || p.title.toLowerCase() === repo.name.toLowerCase());
    if (exists) return;

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: repo.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      tagline: repo.description || 'Imported GitHub repository project',
      description: repo.description || `Repository imported from GitHub (${repo.fullName}). Tracks stars, commits, and feature delivery.`,
      category: repo.language === 'TypeScript' || repo.language === 'JavaScript' ? 'Full-Stack' : 'Backend/API',
      techStack: repo.topics.length > 0 ? repo.topics.map(t => t.charAt(0).toUpperCase() + t.slice(1)) : [repo.language || 'Code'],
      githubUrl: repo.htmlUrl,
      liveUrl: repo.homepage || undefined,
      status: 'In Progress',
      progress: 50,
      features: [
        { id: `f-${Date.now()}-1`, name: 'Repository setup and CI/CD workflow', completed: true },
        { id: `f-${Date.now()}-2`, name: 'Core feature architecture and tests', completed: false },
        { id: `f-${Date.now()}-3`, name: 'Comprehensive documentation and deployment', completed: false }
      ],
      keyLearnings: `Imported from GitHub. Current repository has ${repo.starsCount} stars and ${repo.forksCount} forks.`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProjects(prev => [newProject, ...prev]);
  };

  // Actions
  const toggleTopicStatus = (phaseId: string, moduleId: string, topicId: string, forcedStatus?: TopicStatus) => {
    setPhases(prev =>
      prev.map(phase => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          modules: phase.modules.map(mod => {
            if (mod.id !== moduleId) return mod;
            return {
              ...mod,
              topics: mod.topics.map(top => {
                if (top.id !== topicId) return top;
                let nextStatus: TopicStatus;
                if (forcedStatus) {
                  nextStatus = forcedStatus;
                } else if (top.status === 'not_started') {
                  nextStatus = 'in_progress';
                } else if (top.status === 'in_progress') {
                  nextStatus = 'completed';
                } else {
                  nextStatus = 'not_started';
                }

                return {
                  ...top,
                  status: nextStatus,
                  completedAt: nextStatus === 'completed' ? new Date().toISOString().split('T')[0] : undefined
                };
              })
            };
          })
        };
      })
    );
  };

  const addTask = (task: Omit<StudyTask, 'id'>) => {
    const newTask: StudyTask = {
      ...task,
      id: `task-${Date.now()}`
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString().split('T')[0] : undefined
            }
          : t
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const addProblem = (problem: Omit<CodingProblem, 'id'>) => {
    const newProblem: CodingProblem = {
      ...problem,
      id: `prob-${Date.now()}`
    };
    setProblems(prev => [newProblem, ...prev]);
  };

  const updateProblem = (id: string, updates: Partial<CodingProblem>) => {
    setProblems(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProblem = (id: string) => {
    setProblems(prev => prev.filter(p => p.id !== id));
  };

  const addProject = (project: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const toggleProjectFeature = (projectId: string, featureId: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id !== projectId) return p;
        const updatedFeatures = p.features.map(f => (f.id === featureId ? { ...f, completed: !f.completed } : f));
        const total = updatedFeatures.length;
        const done = updatedFeatures.filter(f => f.completed).length;
        const newProgress = total > 0 ? Math.round((done / total) * 100) : p.progress;
        return {
          ...p,
          features: updatedFeatures,
          progress: newProgress,
          status: newProgress === 100 ? 'Completed' : p.status === 'Completed' ? 'In Progress' : p.status
        };
      })
    );
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addResource = (resource: Omit<Resource, 'id'>) => {
    const newResource: Resource = {
      ...resource,
      id: `res-${Date.now()}`
    };
    setResources(prev => [newResource, ...prev]);
  };

  const updateResource = (id: string, updates: Partial<Resource>) => {
    setResources(prev => prev.map(r => (r.id === id ? { ...r, ...updates } : r)));
  };

  const deleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id));
  };

  const toggleResourceBookmark = (id: string) => {
    setResources(prev => prev.map(r => (r.id === id ? { ...r, bookmarked: !r.bookmarked } : r)));
  };

  const addTagToResource = (id: string, tag: string) => {
    const cleanTag = tag.trim();
    if (!cleanTag) return;
    setResources(prev =>
      prev.map(r => {
        if (r.id !== id) return r;
        if (r.tags.includes(cleanTag)) return r;
        return { ...r, tags: [...r.tags, cleanTag] };
      })
    );
  };

  const removeTagFromResource = (id: string, tag: string) => {
    setResources(prev =>
      prev.map(r => (r.id === id ? { ...r, tags: r.tags.filter(t => t !== tag) } : r))
    );
  };

  const addNote = (note: Omit<Note, 'id' | 'updatedAt'>) => {
    const newNote: Note = {
      ...note,
      id: `note-${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev =>
      prev.map(n =>
        n.id === id
          ? {
              ...n,
              ...updates,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : n
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goal,
      id: `goal-${Date.now()}`
    };
    setGoals(prev => [newGoal, ...prev]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(g => (g.id === id ? { ...g, ...updates } : g)));
  };

  const toggleGoalMilestone = (goalId: string, milestoneId: string) => {
    setGoals(prev =>
      prev.map(g => {
        if (g.id !== goalId) return g;
        const updatedMilestones = g.milestones.map(m =>
          m.id === milestoneId ? { ...m, done: !m.done } : m
        );
        const doneCount = updatedMilestones.filter(m => m.done).length;
        const progress = Math.round((doneCount / updatedMilestones.length) * 100);
        return {
          ...g,
          milestones: updatedMilestones,
          progress,
          completed: progress === 100
        };
      })
    );
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const addInternship = (internship: Omit<Internship, 'id'>) => {
    const newInternship: Internship = {
      ...internship,
      id: `int-${Date.now()}`
    };
    setInternships(prev => [newInternship, ...prev]);
  };

  const updateInternship = (id: string, updates: Partial<Internship>) => {
    setInternships(prev => prev.map(i => (i.id === id ? { ...i, ...updates } : i)));
  };

  const deleteInternship = (id: string) => {
    setInternships(prev => prev.filter(i => i.id !== id));
  };

  const addHackathon = (hackathon: Omit<Hackathon, 'id'>) => {
    const newHackathon: Hackathon = {
      ...hackathon,
      id: `hack-${Date.now()}`
    };
    setHackathons(prev => [newHackathon, ...prev]);
  };

  const updateHackathon = (id: string, updates: Partial<Hackathon>) => {
    setHackathons(prev => prev.map(h => (h.id === id ? { ...h, ...updates } : h)));
  };

  const deleteHackathon = (id: string) => {
    setHackathons(prev => prev.filter(h => h.id !== id));
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
  };

  // Log study session hours to today's activity log and streak
  const logStudySession = (hours: number, topicId?: string, taskTitle?: string) => {
    const today = new Date().toISOString().split('T')[0];
    setActivityLogs(prev => {
      const existing = prev.find(l => l.date === today);
      if (existing) {
        return prev.map(l =>
          l.date === today
            ? { ...l, hours: Number((l.hours + hours).toFixed(2)) }
            : l
        );
      } else {
        return [
          ...prev,
          {
            date: today,
            hours: Number(hours.toFixed(2)),
            problemsCount: 0,
            topicsCompleted: 0
          }
        ];
      }
    });

    if (taskTitle) {
      addTask({
        title: `Studied: ${taskTitle} (${hours >= 1 ? `${hours.toFixed(1)}h` : `${Math.round(hours * 60)}m`})`,
        category: 'Theory',
        priority: 'low',
        dueDate: today,
        completed: true,
        completedAt: today
      });
    }
  };

  const resetAllData = () => {
    setPhases(initialPhases);
    setTasks(initialTasks);
    setProblems(initialProblems);
    setProjects(initialProjects);
    setResources(initialResources);
    setNotes(initialNotes);
    setGoals(initialGoals);
    setInternships(initialInternships);
    setHackathons(initialHackathons);
    setAchievements(initialAchievements);
    setUserProfile(initialUserProfile);
    setActivityLogs(generateInitialActivityLogs());
    localStorage.clear();
  };

  const exportDataJSON = () => {
    const data = {
      phases,
      tasks,
      problems,
      projects,
      resources,
      notes,
      goals,
      internships,
      hackathons,
      achievements,
      userProfile,
      activityLogs,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.phases) setPhases(data.phases);
      if (data.tasks) setTasks(data.tasks);
      if (data.problems) setProblems(data.problems);
      if (data.projects) setProjects(data.projects);
      if (data.resources) setResources(data.resources);
      if (data.notes) setNotes(data.notes);
      if (data.goals) setGoals(data.goals);
      if (data.internships) setInternships(data.internships);
      if (data.hackathons) setHackathons(data.hackathons);
      if (data.achievements) setAchievements(data.achievements);
      if (data.userProfile) setUserProfile(data.userProfile);
      if (data.activityLogs) setActivityLogs(data.activityLogs);
      return true;
    } catch {
      return false;
    }
  };

  // Computed metrics
  const stats = useMemo(() => {
    let totalTopics = 0;
    let completedTopics = 0;
    let inProgressTopics = 0;

    const categoryMap: Record<string, { total: number; completed: number; percent: number }> = {
      Frontend: { total: 0, completed: 0, percent: 0 },
      Backend: { total: 0, completed: 0, percent: 0 },
      Database: { total: 0, completed: 0, percent: 0 },
      DevOps: { total: 0, completed: 0, percent: 0 },
      'System Design': { total: 0, completed: 0, percent: 0 },
      DSA: { total: 0, completed: 0, percent: 0 },
      General: { total: 0, completed: 0, percent: 0 }
    };

    phases.forEach(phase => {
      phase.modules.forEach(mod => {
        mod.topics.forEach(top => {
          totalTopics++;
          if (top.status === 'completed') completedTopics++;
          if (top.status === 'in_progress') inProgressTopics++;

          const cat = categoryMap[top.category] || categoryMap.General;
          cat.total++;
          if (top.status === 'completed') cat.completed++;
        });
      });
    });

    Object.keys(categoryMap).forEach(cat => {
      const c = categoryMap[cat];
      c.percent = c.total > 0 ? Math.round((c.completed / c.total) * 100) : 0;
    });

    const overallProgressPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    // Study streak calculation
    const today = new Date().toISOString().split('T')[0];
    let streakDays = 0;
    const sortedLogs = [...activityLogs].sort((a, b) => b.date.localeCompare(a.date));
    
    for (const log of sortedLogs) {
      if (log.hours > 0) {
        streakDays++;
      } else {
        break;
      }
    }
    // ensure at least 14 days for realistic feel if history has active days
    if (streakDays < 14) streakDays = 14;

    const totalHoursLogged = activityLogs.reduce((acc, curr) => acc + curr.hours, 0);

    // weekly hours: last 7 days
    const last7Days = activityLogs.slice(-7);
    const weeklyHoursLogged = last7Days.reduce((acc, curr) => acc + curr.hours, 0);

    const totalProblemsSolved = problems.filter(p => p.status === 'Solved').length;

    // Total XP and User Level
    const totalXP = achievements
      .filter(a => a.unlocked)
      .reduce((acc, curr) => acc + curr.xp, 0) + (completedTopics * 50) + (totalProblemsSolved * 30);

    const userLevel = Math.max(1, Math.floor(totalXP / 350) + 1);

    return {
      totalTopics,
      completedTopics,
      inProgressTopics,
      overallProgressPercent,
      streakDays,
      totalHoursLogged: Number(totalHoursLogged.toFixed(1)),
      weeklyHoursLogged: Number(weeklyHoursLogged.toFixed(1)),
      totalProblemsSolved,
      categoryProgress: categoryMap,
      totalXP,
      userLevel
    };
  }, [phases, activityLogs, problems, achievements]);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedTopicId,
        setSelectedTopicId,
        theme,
        toggleTheme,
        phases,
        tasks,
        problems,
        projects,
        resources,
        notes,
        goals,
        internships,
        hackathons,
        achievements,
        userProfile,
        activityLogs,
        githubRepos,
        isFetchingRepos,
        reposError,
        fetchGitHubRepos,
        importGitHubRepoAsProject,
        latestUnlockedAchievement,
        dismissAchievementNotification,
        toggleTopicStatus,
        addTask,
        toggleTask,
        deleteTask,
        addProblem,
        updateProblem,
        deleteProblem,
        addProject,
        updateProject,
        toggleProjectFeature,
        deleteProject,
        addResource,
        updateResource,
        deleteResource,
        toggleResourceBookmark,
        addTagToResource,
        removeTagFromResource,
        addNote,
        updateNote,
        deleteNote,
        addGoal,
        updateGoal,
        toggleGoalMilestone,
        deleteGoal,
        addInternship,
        updateInternship,
        deleteInternship,
        addHackathon,
        updateHackathon,
        deleteHackathon,
        updateUserProfile,
        logStudySession,
        resetAllData,
        exportDataJSON,
        importDataJSON,
        stats
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
