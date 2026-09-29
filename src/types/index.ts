export type TopicStatus = 'not_started' | 'in_progress' | 'completed';

export interface RoadmapTopic {
  id: string;
  title: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'DSA' | 'System Design' | 'General';
  status: TopicStatus;
  estimatedHours: number;
  importance: 'Essential' | 'High' | 'Recommended';
  summary: string;
  keyConcepts: string[];
  practicalExercise: string;
  codeSnippet?: {
    language: string;
    code: string;
    explanation: string;
  };
  documentationUrl?: string;
  completedAt?: string;
}

export interface RoadmapModule {
  id: string;
  title: string;
  description: string;
  topics: RoadmapTopic[];
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  iconName: string;
  estimatedWeeks: number;
  modules: RoadmapModule[];
}

export interface StudyTask {
  id: string;
  title: string;
  category: 'Theory' | 'Practice' | 'Project' | 'DSA' | 'Revision' | 'Interview';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  completed: boolean;
  completedAt?: string;
  phaseRef?: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  platform: 'LeetCode' | 'NeetCode' | 'HackerRank' | 'Codeforces' | 'Other';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string; // e.g. Arrays & Hashing, Two Pointers, Trees, Dynamic Programming
  status: 'Solved' | 'Review Needed' | 'Attempted';
  timeComplexity: string;
  spaceComplexity: string;
  solutionNotes: string;
  codeSnippet?: string;
  problemUrl?: string;
  dateSolved: string;
}

export interface ProjectFeature {
  id: string;
  name: string;
  completed: boolean;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Frontend' | 'Full-Stack' | 'Backend/API' | 'DevOps/System';
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  status: 'Idea' | 'In Progress' | 'Completed' | 'Deployed';
  progress: number; // 0 - 100
  features: ProjectFeature[];
  keyLearnings: string;
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  category: 'Documentation' | 'Course' | 'YouTube' | 'Book' | 'Tool' | 'Cheatsheet';
  rating: number; // 1-5
  tags: string[];
  description: string;
  bookmarked: boolean;
}

export interface Note {
  id: string;
  title: string;
  topic: string;
  category: string;
  content: string;
  codeSnippet?: string;
  tags: string[];
  updatedAt: string;
}

export interface GoalMilestone {
  id: string;
  text: string;
  done: boolean;
}

export interface Goal {
  id: string;
  title: string;
  category: 'Career' | 'Skills' | 'Projects' | 'DSA' | 'Academics';
  targetDate: string;
  progress: number;
  milestones: GoalMilestone[];
  completed: boolean;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  location: string;
  type: 'Summer Intern' | 'Co-op' | 'Part-time' | 'Off-campus';
  status: 'Wishlist' | 'Applied' | 'OA' | 'Interview' | 'Offer' | 'Rejected';
  dateApplied: string;
  salaryOrStipend?: string;
  jobUrl?: string;
  referral?: string;
  notes: string;
}

export interface Hackathon {
  id: string;
  name: string;
  platform: string;
  date: string;
  teamSize: number;
  projectTitle: string;
  submissionUrl?: string;
  status: 'Registered' | 'Submitted' | 'Winner' | 'Runner-up' | 'Finalist' | 'Participated';
  prizeOrAward?: string;
  learnings: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'Streak' | 'DSA' | 'Full-Stack' | 'Projects' | 'Career';
  icon: string;
  xp: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserProfile {
  name: string;
  university: string;
  major: string;
  graduationYear: string;
  targetRole: string;
  githubUsername: string;
  linkedinUsername: string;
  dailyHourGoal: number;
  weeklyProblemGoal: number;
}

export interface DailyActivityLog {
  date: string; // YYYY-MM-DD
  hours: number;
  problemsCount: number;
  topicsCompleted: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  starsCount: number;
  forksCount: number;
  openIssuesCount: number;
  language: string | null;
  topics: string[];
  updatedAt: string;
  pushedAt: string;
  isPrivate: boolean;
  defaultBranch: string;
}

export interface AchievementUnlockEvent {
  achievement: Achievement;
  timestamp: number;
}

