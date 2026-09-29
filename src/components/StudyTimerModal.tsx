import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Pause, RotateCcw, Check, Clock, X } from 'lucide-react';

interface StudyTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyTimerModal: React.FC<StudyTimerModalProps> = ({ isOpen, onClose }) => {
  const { logStudySession, phases, selectedTopicId } = useApp();
  const [mode, setMode] = useState<'pomodoro' | 'deep' | 'stopwatch'>('pomodoro');
  const [secondsLeft, setSecondsLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [stopwatchSeconds, setStopwatchSeconds] = useState<number>(0);
  const [sessionTopic, setSessionTopic] = useState<string>('Full-Stack Study Session');
  const [loggedNotification, setLoggedNotification] = useState<string | null>(null);

  // Sync default topic from selectedTopicId if available
  useEffect(() => {
    if (selectedTopicId) {
      for (const p of phases) {
        for (const m of p.modules) {
          const found = m.topics.find(t => t.id === selectedTopicId);
          if (found) {
            setSessionTopic(`${found.title} (${found.category})`);
            return;
          }
        }
      }
    }
  }, [selectedTopicId, phases]);

  // Mode switch resets
  const switchMode = (newMode: 'pomodoro' | 'deep' | 'stopwatch') => {
    setIsRunning(false);
    setMode(newMode);
    if (newMode === 'pomodoro') setSecondsLeft(25 * 60);
    else if (newMode === 'deep') setSecondsLeft(50 * 60);
    else setStopwatchSeconds(0);
  };

  // Timer interval effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        if (mode === 'stopwatch') {
          setStopwatchSeconds(prev => prev + 1);
        } else {
          setSecondsLeft(prev => {
            if (prev <= 1) {
              setIsRunning(false);
              // Auto-log full completed session
              const durationHours = mode === 'pomodoro' ? 25 / 60 : 50 / 60;
              logStudySession(durationHours, undefined, `${sessionTopic} (${mode.toUpperCase()})`);
              setLoggedNotification(`Session completed! Logged ${(durationHours * 60).toFixed(0)} minutes.`);
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, mode, sessionTopic, logStudySession]);

  if (!isOpen) return null;

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleManualLog = () => {
    let hoursToLog = 0;
    if (mode === 'stopwatch') {
      hoursToLog = Math.max(0.1, Number((stopwatchSeconds / 3600).toFixed(2)));
    } else {
      const initialTotal = mode === 'pomodoro' ? 25 * 60 : 50 * 60;
      const elapsed = initialTotal - secondsLeft;
      hoursToLog = Math.max(0.1, Number((elapsed / 3600).toFixed(2)));
    }

    logStudySession(hoursToLog, undefined, sessionTopic);
    setLoggedNotification(`Logged ${(hoursToLog * 60).toFixed(0)}m of focused study!`);
    setIsRunning(false);
    setTimeout(() => {
      setLoggedNotification(null);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-neutral-100">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-400" />
            <h3 className="font-semibold text-neutral-100">Focused Study Session</h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-200 transition-colors p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mode selector */}
        <div className="mt-5 grid grid-cols-3 gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-xs font-medium">
          <button
            onClick={() => switchMode('pomodoro')}
            className={`py-2 rounded-lg transition-colors ${
              mode === 'pomodoro'
                ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            25m Pomodoro
          </button>
          <button
            onClick={() => switchMode('deep')}
            className={`py-2 rounded-lg transition-colors ${
              mode === 'deep'
                ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            50m Deep Work
          </button>
          <button
            onClick={() => switchMode('stopwatch')}
            className={`py-2 rounded-lg transition-colors ${
              mode === 'stopwatch'
                ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Stopwatch
          </button>
        </div>

        {/* Timer display */}
        <div className="my-8 text-center">
          <div className="text-6xl font-mono font-bold tracking-tight text-neutral-100 tabular-nums">
            {mode === 'stopwatch' ? formatTime(stopwatchSeconds) : formatTime(secondsLeft)}
          </div>
          <div className="mt-3 text-xs text-neutral-400">
            {isRunning ? 'Timer running · Stay focused' : 'Timer paused'}
          </div>
        </div>

        {/* Session subject / topic */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-neutral-400 mb-1.5">
            Current Study Topic / Focus:
          </label>
          <input
            type="text"
            value={sessionTopic}
            onChange={(e) => setSessionTopic(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="e.g. Next.js App Router & Server Actions"
          />
        </div>

        {loggedNotification && (
          <div className="mb-4 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <Check className="h-4 w-4 shrink-0" />
            <span>{loggedNotification}</span>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors ${
              isRunning
                ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4" /> Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" /> Start Focus
              </>
            )}
          </button>

          <button
            onClick={() => switchMode(mode)}
            title="Reset timer"
            className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            onClick={handleManualLog}
            title="Log elapsed time to stats"
            className="py-2.5 px-4 rounded-xl border border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700 text-sm font-medium transition-colors"
          >
            Log Session
          </button>
        </div>
      </div>
    </div>
  );
};
