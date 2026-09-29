import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  Calendar,
  Flame,
  Clock,
  Code2,
  TrendingUp,
  CheckCircle2,
  Layers,
  Sparkles
} from 'lucide-react';
import { DailyActivityLog } from '../../types';

export const ProgressView: React.FC = () => {
  const { activityLogs, stats, phases } = useApp();
  const [selectedDayLog, setSelectedDayLog] = useState<DailyActivityLog | null>(null);

  // Intensity color for GitHub-style heatmap
  const getCellIntensity = (hours: number) => {
    if (hours === 0) return 'bg-neutral-900 border-neutral-800';
    if (hours < 1.5) return 'bg-emerald-950 border-emerald-900/40 text-emerald-300';
    if (hours < 3) return 'bg-emerald-800 border-emerald-700/60 text-emerald-200';
    if (hours < 4.5) return 'bg-emerald-600 border-emerald-500 text-white';
    return 'bg-emerald-400 border-emerald-300 text-neutral-950 font-bold';
  };

  // Day of week labels for weekly hours chart
  const last7Days = activityLogs.slice(-7);
  const maxWeeklyHours = Math.max(5, ...last7Days.map(d => d.hours));

  const formatDayName = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, { weekday: 'short' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span>ANALYTICS & METRICS</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-100 mt-1">
              Learning Progress & Velocity
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 mt-1">
              Visualize your 30-day coding consistency, daily study volume, and discipline mastery curves.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-center">
              <span className="text-neutral-500 block text-[10px]">TOTAL HOURS</span>
              <span className="text-xl font-bold text-indigo-400 tabular-nums">
                {stats.totalHoursLogged}h
              </span>
            </div>
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-center">
              <span className="text-neutral-500 block text-[10px]">STREAK</span>
              <span className="text-xl font-bold text-amber-400 tabular-nums">
                {stats.streakDays}d
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub-Style 30-Day Activity Heatmap */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-mono text-neutral-400">STUDY HEATMAP</span>
            <h3 className="text-base font-bold text-neutral-100 mt-0.5">
              30-Day Contribution & Coding Activity
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
            <span>Less</span>
            <div className="h-3 w-3 rounded-sm bg-neutral-900 border border-neutral-800" />
            <div className="h-3 w-3 rounded-sm bg-emerald-950 border border-emerald-900/40" />
            <div className="h-3 w-3 rounded-sm bg-emerald-800 border border-emerald-700/60" />
            <div className="h-3 w-3 rounded-sm bg-emerald-600 border border-emerald-500" />
            <div className="h-3 w-3 rounded-sm bg-emerald-400 border border-emerald-300" />
            <span>More</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-flow-col grid-rows-5 gap-2 min-w-[500px]">
            {activityLogs.map((log) => (
              <div
                key={log.date}
                onClick={() => setSelectedDayLog(log)}
                title={`${log.date}: ${log.hours}h study, ${log.problemsCount} problems`}
                className={`h-8 rounded-lg border flex items-center justify-center cursor-pointer transition-all hover:scale-105 ${getCellIntensity(
                  log.hours
                )}`}
              >
                <span className="text-[10px] font-mono select-none opacity-80">
                  {log.hours > 0 ? `${log.hours}h` : ''}
                </span>
              </div>
            ))}
          </div>
        </div>

        {selectedDayLog && (
          <div className="mt-4 p-3 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-300 font-semibold">{selectedDayLog.date}</span>
            <div className="flex items-center gap-4 text-neutral-400">
              <span className="text-indigo-400">{selectedDayLog.hours} Hours Logged</span>
              <span>·</span>
              <span className="text-emerald-400">{selectedDayLog.problemsCount} DSA Solved</span>
              <span>·</span>
              <span>{selectedDayLog.topicsCompleted} Topics Completed</span>
            </div>
          </div>
        )}
      </div>

      {/* Row: Weekly Study Hours Bar Chart & Category Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Hours Bar Chart */}
        <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-mono text-indigo-400">RECENT VELOCITY</span>
                <h3 className="text-base font-bold text-neutral-100 mt-0.5">
                  Last 7 Days Study Hours
                </h3>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                Avg: {(stats.weeklyHoursLogged / 7).toFixed(1)}h / day
              </span>
            </div>

            {/* Bar chart */}
            <div className="h-48 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-neutral-800">
              {last7Days.map((d) => {
                const heightPercent = Math.max(12, Math.round((d.hours / maxWeeklyHours) * 100));

                return (
                  <div key={d.date} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <span className="text-[10px] font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {d.hours}h
                    </span>
                    <div
                      className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all duration-500 hover:brightness-110"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-[11px] font-mono text-neutral-400 mt-1">
                      {formatDayName(d.date)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-2 flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>Goal: 3.5h / day</span>
            <span className="text-emerald-400">Target Pace On Track</span>
          </div>
        </div>

        {/* Skill Discipline Breakdown */}
        <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
          <div className="mb-4">
            <span className="text-xs font-mono text-purple-400">DISCIPLINE RADAR</span>
            <h3 className="text-base font-bold text-neutral-100 mt-0.5">
              Domain Mastery Breakdown
            </h3>
          </div>

          <div className="space-y-4">
            {Object.entries(stats.categoryProgress).map(([cat, val]) => (
              <div key={cat}>
                <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                  <span className="text-neutral-300 font-sans font-medium">{cat}</span>
                  <span className="text-neutral-400">
                    {val.completed} / {val.total} ({val.percent}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                    style={{ width: `${val.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
