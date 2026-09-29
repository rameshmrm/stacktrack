import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckSquare,
  Square,
  Plus,
  Calendar,
  Trash2,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { StudyTask } from '../../types';

export const TasksView: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useApp();
  const [filterTab, setFilterTab] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<StudyTask['category']>('Practice');
  const [newTaskPriority, setNewTaskPriority] = useState<StudyTask['priority']>('medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState(new Date().toISOString().split('T')[0]);

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredTasks = tasks.filter((t) => {
    // Tab filter
    if (filterTab === 'today' && t.dueDate !== todayStr) return false;
    if (filterTab === 'upcoming' && (t.dueDate <= todayStr || t.completed)) return false;
    if (filterTab === 'completed' && !t.completed) return false;

    // Category filter
    if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;

    return true;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask({
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      priority: newTaskPriority,
      dueDate: newTaskDueDate,
      completed: false
    });

    setNewTaskTitle('');
    setIsModalOpen(false);
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span>PRODUCTIVITY SPRINT</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-100 mt-1">
              Study & Execution Tasks
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 mt-1">
              Organize daily practice, lab assignments, capstone work, and mock interviews.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right font-mono text-xs hidden sm:block">
              <span className="text-neutral-400">Completed: </span>
              <strong className="text-emerald-400">{completedCount}</strong>
              <span className="text-neutral-500"> / {tasks.length}</span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>New Task</span>
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs">
            {(['all', 'today', 'upcoming', 'completed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  filterTab === tab
                    ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tab === 'all'
                  ? `All (${tasks.length})`
                  : tab === 'today'
                  ? 'Today'
                  : tab === 'upcoming'
                  ? 'Upcoming'
                  : `Completed (${completedCount})`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-neutral-500" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Categories</option>
              <option value="Theory">Theory</option>
              <option value="Practice">Practice</option>
              <option value="Project">Project</option>
              <option value="DSA">DSA</option>
              <option value="Revision">Revision</option>
              <option value="Interview">Interview</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 divide-y divide-neutral-800/80 shadow-sm">
        {filteredTasks.length === 0 ? (
          <div className="py-12 text-center text-neutral-500 text-xs font-mono">
            No tasks found in this view.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="py-3 sm:py-3.5 flex items-start sm:items-center justify-between gap-3 group transition-colors"
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="mt-0.5 sm:mt-0 text-neutral-500 hover:text-indigo-400 transition-colors shrink-0"
                >
                  {task.completed ? (
                    <CheckSquare className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <Square className="h-5 w-5 text-neutral-600" />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      task.completed ? 'line-through text-neutral-500' : 'text-neutral-100'
                    }`}
                  >
                    {task.title}
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-neutral-400 font-mono">
                    <span className="text-neutral-300">{task.category}</span>
                    <span>·</span>
                    <span
                      className={
                        task.priority === 'high'
                          ? 'text-rose-400'
                          : task.priority === 'medium'
                          ? 'text-amber-400'
                          : 'text-neutral-500'
                      }
                    >
                      {task.priority.toUpperCase()} Priority
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-neutral-400">
                      <Calendar className="h-3 w-3" />
                      {task.dueDate}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-rose-400 p-1 transition-all"
                title="Delete task"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-neutral-100">
            <h3 className="text-base font-bold text-neutral-100 mb-4">
              Add New Study Task
            </h3>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Build GraphQL schema with Apollo Server"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Category
                  </label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Practice">Practice</option>
                    <option value="Theory">Theory</option>
                    <option value="Project">Project</option>
                    <option value="DSA">DSA</option>
                    <option value="Revision">Revision</option>
                    <option value="Interview">Interview</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Priority
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
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
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
