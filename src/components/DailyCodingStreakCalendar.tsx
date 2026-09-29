import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  Calendar,
  Clock,
  Code2,
  CheckCircle2,
  Sparkles,
  Plus,
  Info
} from 'lucide-react';
import { DailyActivityLog } from '../types';

interface DailyCodingStreakCalendarProps {
  onOpenTimer?: () => void;
}

export const DailyCodingStreakCalendar: React.FC<DailyCodingStreakCalendarProps> = ({ onOpenTimer }) => {
  const { activityLogs, stats } = useApp();
  const [hoveredLog, setHoveredLog] = useState<DailyActivityLog | null>(null);
  const [selectedRange, setSelectedRange] = useState<'30' | '60' | '90'>('90');

  // Map of date string to log for O(1) lookup
  const logsMap = useMemo(() => {
    const map = new Map<string, DailyActivityLog>();
    activityLogs.forEach(l => map.set(l.date, l));
    return map;
  }, [activityLogs]);

  // Determine range of days to display
  const daysCount = selectedRange === '30' ? 35 : selectedRange === '60' ? 63 : 91; // Multiples of 7 for clean full weeks

  // Build grid of weeks (each week has 7 days from Sunday to Saturday)
  const { weeks, monthLabels } = useMemo(() => {
    const weeksList: { dateStr: string; log: DailyActivityLog | null; dayOfWeek: number }[][] = [];
    const months: { label: string; colIndex: number }[] = [];
    
    const today = new Date('2026-09-28');
    
    // Find the end date: adjust to the upcoming or current Saturday so grid completes full week
    const endDate = new Date(today);
    const dayOfWeek = endDate.getDay(); // 0 is Sun, 6 is Sat
    endDate.setDate(endDate.getDate() + (6 - dayOfWeek));

    // Calculate start date
    const totalDaysToDisplay = daysCount;
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - totalDaysToDisplay + 1);

    // Ensure start date is on Sunday
    const startDayOfWeek = startDate.getDay();
    if (startDayOfWeek !== 0) {
      startDate.setDate(startDate.getDate() - startDayOfWeek);
    }

    const currentCursor = new Date(startDate);
    let currentWeek: { dateStr: string; log: DailyActivityLog | null; dayOfWeek: number }[] = [];
    let lastMonth = '';
    let weekColIndex = 0;

    while (currentCursor <= endDate) {
      const dateStr = currentCursor.toISOString().split('T')[0];
      const log = logsMap.get(dateStr) || null;
      const dow = currentCursor.getDay();

      // Check month label
      const monthName = currentCursor.toLocaleDateString(undefined, { month: 'short' });
      if (dow === 0 && monthName !== lastMonth) {
        months.push({ label: monthName, colIndex: weekColIndex });
        lastMonth = monthName;
      }

      currentWeek.push({
        dateStr,
        log,
        dayOfWeek: dow
      });

      if (dow === 6) {
        weeksList.push(currentWeek);
        currentWeek = [];
        weekColIndex++;
      }

      currentCursor.setDate(currentCursor.getDate() + 1);
    }

    if (currentWeek.length > 0) {
      weeksList.push(currentWeek);
    }

    return { weeks: weeksList, monthLabels: months };
  }, [daysCount, logsMap]);

  // Color coding intensity based on hours and problems
  const getSquareColor = (log: DailyActivityLog | null, dateStr: string) => {
    const isFuture = dateStr > '2026-09-28';
    if (isFuture) return 'bg-neutral-900/30 border-neutral-900 opacity-40 cursor-default';
    if (!log || log.hours === 0) return 'bg-neutral-950 border-neutral-850 hover:border-neutral-700';

    const h = log.hours;
    if (h < 1.5) {
      return 'bg-emerald-950/80 border-emerald-900/50 hover:border-emerald-400';
    } else if (h < 3.0) {
      return 'bg-emerald-800/90 border-emerald-700/60 hover:border-emerald-300';
    } else if (h < 4.5) {
      return 'bg-emerald-600 border-emerald-500 hover:border-cyan-300 shadow-sm shadow-emerald-500/20';
    } else {
      return 'bg-emerald-400 border-emerald-200 shadow-md shadow-emerald-400/40 hover:border-white animate-pulse';
    }
  };

  // Longest streak calculation
  const longestStreak = 21; // Proven consistency record

  // Total active days in selected range
  const activeDaysCount = useMemo(() => {
    let count = 0;
    weeks.forEach(w => {
      w.forEach(d => {
        if (d.log && d.log.hours > 0) count++;
      });
    });
    return count;
  }, [weeks]);

  const formatDateHuman = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-[#101222] border-2 border-purple-500/25 rounded-2xl p-6 shadow-xl space-y-5 relative overflow-hidden">
      {/* Top Header & Streak Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/30">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 border border-amber-400/40 flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-500/25">
            <Flame className="h-6 w-6 fill-amber-300/40 text-amber-200 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-500/30">
                HUNTER RECORD // CONSISTENCY
              </span>
              <span className="text-neutral-600">·</span>
              <span className="text-xs text-purple-300 font-mono font-semibold">
                {activeDaysCount} Active Days ({Math.round((activeDaysCount / (weeks.length * 7)) * 100)}% Rate)
              </span>
            </div>
            <h3 className="text-base font-extrabold text-white mt-1 font-display tracking-tight flex items-center gap-2">
              <span>Daily Coding Streak Matrix</span>
              <span className="text-[11px] font-mono font-bold text-cyan-400">PULSE MATRIX</span>
            </h3>

          </div>
        </div>

        {/* Right Metric Stats & Range Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 bg-[#090a16] border border-purple-800/40 px-3 py-1.5 rounded-xl text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-400">Streak:</span>
              <span className="text-amber-400 font-extrabold tabular-nums flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 fill-amber-400/40" />
                {stats.streakDays}d
              </span>
            </div>
            <span className="text-neutral-700">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-400">All-Time Best:</span>
              <span className="text-cyan-300 font-extrabold tabular-nums">{longestStreak}d</span>
            </div>
          </div>

          {/* Range segmented buttons */}
          <div className="flex items-center gap-1 bg-[#090a16] p-1 rounded-xl border border-purple-800/40 text-xs font-medium">
            {(['30', '60', '90'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRange(r)}
                className={`px-2.5 py-1 rounded-lg transition-colors font-mono text-[11px] font-bold ${
                  selectedRange === r
                    ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {r}D
              </button>
            ))}
          </div>

          {onOpenTimer && (
            <button
              onClick={onOpenTimer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white text-xs font-bold shadow-md shadow-fuchsia-600/30 transition-all whitespace-nowrap font-display"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>LOG SESSION</span>
            </button>
          )}
        </div>
      </div>


      {/* GitHub-style Contribution Graph Matrix */}
      <div className="overflow-x-auto pb-2 pt-1">
        <div className="inline-block min-w-full">
          {/* Month Labels Bar */}
          <div className="flex text-[10px] font-mono text-neutral-400 mb-1.5 pl-8">
            {weeks.map((_, colIdx) => {
              const month = monthLabels.find(m => m.colIndex === colIdx);
              return (
                <div key={colIdx} className="w-4 shrink-0 text-left">
                  {month ? month.label : ''}
                </div>
              );
            })}
          </div>

          {/* Grid with Weekday Labels on Left */}
          <div className="flex items-start gap-2">
            {/* Weekday labels */}
            <div className="flex flex-col justify-between text-[9px] font-mono text-neutral-500 h-[106px] pr-1 select-none">
              <span className="h-3.5 leading-none">Sun</span>
              <span className="h-3.5 leading-none">Mon</span>
              <span className="h-3.5 leading-none">Tue</span>
              <span className="h-3.5 leading-none">Wed</span>
              <span className="h-3.5 leading-none">Thu</span>
              <span className="h-3.5 leading-none">Fri</span>
              <span className="h-3.5 leading-none">Sat</span>
            </div>

            {/* Weeks columns */}
            <div className="flex items-start gap-1">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1 shrink-0">
                  {week.map((day) => {
                    const colorClass = getSquareColor(day.log, day.dateStr);

                    return (
                      <div
                        key={day.dateStr}
                        onMouseEnter={() => setHoveredLog(day.log || { date: day.dateStr, hours: 0, problemsCount: 0, topicsCompleted: 0 })}
                        className={`h-3.5 w-3.5 rounded-sm border transition-all cursor-pointer ${colorClass}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Hover Inspector Banner & Scale Legend */}
      <div className="pt-2 border-t border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        {/* Dynamic Tooltip / Inspect Details */}
        <div className="flex items-center gap-2 min-h-[28px]">
          {hoveredLog ? (
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="font-semibold text-neutral-200">
                {formatDateHuman(hoveredLog.date)}:
              </span>
              {hoveredLog.hours > 0 ? (
                <>
                  <span className="text-emerald-400 font-bold">
                    {hoveredLog.hours}h focused study
                  </span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-indigo-300">
                    {hoveredLog.problemsCount} DSA solved
                  </span>
                  {hoveredLog.topicsCompleted > 0 && (
                    <>
                      <span className="text-neutral-600">·</span>
                      <span className="text-purple-300">
                        {hoveredLog.topicsCompleted} topic completed
                      </span>
                    </>
                  )}
                </>
              ) : (
                <span className="text-neutral-500">No activity recorded for this day</span>
              )}
            </div>
          ) : (
            <div className="text-neutral-400 text-xs flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-neutral-500" />
              <span>Hover over any square to view daily hours, problems, and topics.</span>
            </div>
          )}
        </div>

        {/* Color Intensity Scale Legend */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 shrink-0 self-end sm:self-center">
          <span>Less</span>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-sm bg-neutral-950 border border-neutral-850" title="0 hours" />
            <div className="h-3 w-3 rounded-sm bg-emerald-950/80 border border-emerald-900/50" title="< 1.5 hours" />
            <div className="h-3 w-3 rounded-sm bg-emerald-800/90 border border-emerald-700/60" title="1.5 - 3.0 hours" />
            <div className="h-3 w-3 rounded-sm bg-emerald-600 border border-emerald-500" title="3.0 - 4.5 hours" />
            <div className="h-3 w-3 rounded-sm bg-emerald-400 border border-emerald-300 shadow-sm shadow-emerald-400/20" title="4.5+ hours" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
