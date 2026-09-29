import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, X, Zap } from 'lucide-react';

export const AchievementToast: React.FC = () => {
  const { latestUnlockedAchievement, dismissAchievementNotification } = useApp();

  useEffect(() => {
    if (latestUnlockedAchievement) {
      const timer = setTimeout(() => {
        dismissAchievementNotification();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [latestUnlockedAchievement, dismissAchievementNotification]);

  if (!latestUnlockedAchievement) return null;

  const { achievement } = latestUnlockedAchievement;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce-short">
      <div className="bg-[#0e0f20]/95 border-2 border-fuchsia-500/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl shadow-fuchsia-500/25 text-neutral-100 flex items-start gap-4 anime-glow-purple relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-fuchsia-500/20 rounded-full blur-xl pointer-events-none" />
        <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-amber-500 to-fuchsia-500 border border-amber-400/50 flex items-center justify-center shrink-0 text-white shadow-lg shadow-amber-500/30">
          <Trophy className="h-6 w-6 animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-extrabold tracking-wider text-fuchsia-400 uppercase font-mono flex items-center gap-1.5">
              <span>★ QUEST CLEARED</span>
              <span className="text-neutral-500">·</span>
              <span className="text-[10px] text-cyan-300 font-bold">OBJECTIVE CLEARED!</span>
            </span>

            <button
              onClick={dismissAchievementNotification}
              className="text-neutral-400 hover:text-neutral-200 transition-colors p-1"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <h4 className="text-sm font-extrabold text-white mt-0.5 truncate font-display">
            {achievement.title}
          </h4>
          <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
            {achievement.description}
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-300 bg-amber-500/20 border border-amber-400/30 px-2 py-0.5 rounded-lg shadow-sm">
              <Zap className="h-3 w-3 fill-amber-300 text-amber-300" />
              +{achievement.xp} MANA XP
            </span>
            <span className="text-[11px] text-purple-300/70 font-mono">
              Title Added to Grimoire
            </span>
          </div>
        </div>
      </div>
    </div>
  );

};
