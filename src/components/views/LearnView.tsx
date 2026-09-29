import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileEdit,
  Code2,
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';
import { RoadmapTopic, RoadmapPhase, RoadmapModule } from '../../types';

interface LearnViewProps {
  onOpenTimer: () => void;
}

export const LearnView: React.FC<LearnViewProps> = ({ onOpenTimer }) => {
  const { phases, selectedTopicId, setSelectedTopicId, toggleTopicStatus, addNote, setActiveTab } = useApp();
  const [copied, setCopied] = useState<boolean>(false);
  const [showNoteEditor, setShowNoteEditor] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteContent, setNoteContent] = useState<string>('');

  // Find the selected topic and its phase/module
  let currentTopic: RoadmapTopic | null = null;
  let currentPhase: RoadmapPhase | null = null;
  let currentModule: RoadmapModule | null = null;

  // Flatten all topics for Next/Prev navigation
  const allTopics: { topic: RoadmapTopic; phase: RoadmapPhase; module: RoadmapModule }[] = [];

  for (const p of phases) {
    for (const m of p.modules) {
      for (const t of m.topics) {
        allTopics.push({ topic: t, phase: p, module: m });
        if (t.id === selectedTopicId) {
          currentTopic = t;
          currentPhase = p;
          currentModule = m;
        }
      }
    }
  }

  // Fallback if not found
  if (!currentTopic && allTopics.length > 0) {
    currentTopic = allTopics[0].topic;
    currentPhase = allTopics[0].phase;
    currentModule = allTopics[0].module;
  }

  const currentIndex = allTopics.findIndex(item => item.topic.id === currentTopic?.id);
  const prevItem = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextItem = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveNote = () => {
    if (!noteTitle.trim()) return;
    addNote({
      title: noteTitle,
      topic: currentTopic?.title || 'General',
      category: currentTopic?.category || 'Full-Stack',
      content: noteContent || `Notes from studying ${currentTopic?.title}.`,
      tags: [currentTopic?.category || 'Study', 'Concepts']
    });
    setShowNoteEditor(false);
    setNoteTitle('');
    setNoteContent('');
  };

  if (!currentTopic || !currentPhase || !currentModule) {
    return (
      <div className="p-12 text-center text-neutral-400">
        <p>No topic selected. Please choose a topic from the Roadmap.</p>
        <button
          onClick={() => setActiveTab('roadmap')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold"
        >
          Open Roadmap
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Navigation bar between topics */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => prevItem && setSelectedTopicId(prevItem.topic.id)}
          disabled={!prevItem}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
            prevItem
              ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800'
              : 'bg-neutral-950 border-neutral-900 text-neutral-600 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous Topic</span>
        </button>

        <div className="text-center min-w-0">
          <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider block">
            Phase {currentPhase.phaseNumber} · {currentModule.title}
          </span>
          <span className="text-xs text-neutral-400 font-mono">
            Topic {currentIndex + 1} of {allTopics.length}
          </span>
        </div>

        <button
          onClick={() => nextItem && setSelectedTopicId(nextItem.topic.id)}
          disabled={!nextItem}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
            nextItem
              ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800'
              : 'bg-neutral-950 border-neutral-900 text-neutral-600 cursor-not-allowed'
          }`}
        >
          <span className="hidden sm:inline">Next Topic</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Main Topic Guide Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 lg:p-8 space-y-8 shadow-sm">
        {/* Header & Status */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-neutral-800">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
              <span className="font-mono text-indigo-400">#{currentTopic.category}</span>
              <span>·</span>
              <span className="font-mono text-neutral-400">{currentTopic.estimatedHours} Hours Required</span>
              <span>·</span>
              <span
                className={`font-mono font-medium ${
                  currentTopic.importance === 'Essential'
                    ? 'text-rose-400'
                    : currentTopic.importance === 'High'
                    ? 'text-amber-400'
                    : 'text-neutral-400'
                }`}
              >
                {currentTopic.importance}
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-100">
              {currentTopic.title}
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">
              {currentTopic.summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Toggle Status Button */}
            <button
              onClick={() => toggleTopicStatus(currentPhase!.id, currentModule!.id, currentTopic!.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                currentTopic.status === 'completed'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : currentTopic.status === 'in_progress'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>
                {currentTopic.status === 'completed'
                  ? 'Completed'
                  : currentTopic.status === 'in_progress'
                  ? 'In Progress'
                  : 'Mark In Progress'}
              </span>
            </button>

            {/* Launch Study Timer */}
            <button
              onClick={onOpenTimer}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium border border-neutral-700 transition-colors"
              title="Launch Pomodoro or Stopwatch for this topic"
            >
              <Clock className="h-4 w-4 text-indigo-400" />
              <span>Timer</span>
            </button>
          </div>
        </div>

        {/* Section 1: Core Key Concepts */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-semibold text-neutral-400 uppercase tracking-wider">
            01. Core Architecture & Key Concepts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentTopic.keyConcepts.map((concept, idx) => (
              <div
                key={concept}
                className="bg-neutral-950/80 border border-neutral-800/80 rounded-xl p-3.5 flex items-start gap-3"
              >
                <span className="text-xs font-mono font-bold text-indigo-400 mt-0.5">
                  {(idx + 1).toString().padStart(2, '0')}.
                </span>
                <span className="text-xs font-medium text-neutral-200">
                  {concept}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Code Implementation Blueprint */}
        {currentTopic.codeSnippet && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-semibold text-neutral-400 uppercase tracking-wider">
                02. Code Implementation Blueprint ({currentTopic.codeSnippet.language})
              </h3>
              <button
                onClick={() => handleCopyCode(currentTopic!.codeSnippet!.code)}
                className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-200 font-mono transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="relative rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden font-mono text-xs text-neutral-200 p-4 leading-relaxed">
              <pre className="overflow-x-auto">
                <code>{currentTopic.codeSnippet.code}</code>
              </pre>
            </div>
            <p className="text-xs text-neutral-400 italic">
              {currentTopic.codeSnippet.explanation}
            </p>
          </div>
        )}

        {/* Section 3: Hands-On Practical Exercise */}
        <div className="space-y-3 bg-neutral-950/60 border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-indigo-400">
            <Terminal className="h-4 w-4" />
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider">
              03. Hands-On Practical Exercise
            </h3>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            {currentTopic.practicalExercise}
          </p>
          {currentTopic.documentationUrl && (
            <div className="pt-2">
              <a
                href={currentTopic.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <span>Read Official Documentation Specification</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>

        {/* Quick Note taking drawer / button */}
        <div className="pt-2 border-t border-neutral-800">
          {!showNoteEditor ? (
            <button
              onClick={() => {
                setShowNoteEditor(true);
                setNoteTitle(`Study Notes: ${currentTopic!.title}`);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 hover:bg-neutral-800 text-xs font-medium text-neutral-300 transition-colors"
            >
              <FileEdit className="h-4 w-4 text-indigo-400" />
              <span>Record Personal Technical Notes on this Topic</span>
            </button>
          ) : (
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-200">
                  New Technical Note
                </span>
                <button
                  onClick={() => setShowNoteEditor(false)}
                  className="text-xs text-neutral-400 hover:text-neutral-200"
                >
                  Cancel
                </button>
              </div>
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Note title"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
              />
              <textarea
                rows={4}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Write your personal takeaways, edge cases, or code examples..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleSaveNote}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
              >
                Save to Notes Vault
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
