import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Plus,
  Search,
  Copy,
  Check,
  Trash2,
  Edit3,
  Tag,
  BookOpen
} from 'lucide-react';
import { Note } from '../../types';

export const NotesView: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote } = useApp();
  const [search, setSearch] = useState('');
  const [selectedNoteId, setSelectedNoteId] = useState<string>(notes[0]?.id || '');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form / Edit state
  const [editTitle, setEditTitle] = useState('');
  const [editTopic, setEditTopic] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editSnippet, setEditSnippet] = useState('');
  const [editTags, setEditTags] = useState('');

  const selectedNote = notes.find(n => n.id === selectedNoteId) || notes[0];

  const handleCopySnippet = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartCreate = () => {
    setSelectedNoteId('new');
    setIsEditing(true);
    setEditTitle('');
    setEditTopic('General');
    setEditContent('');
    setEditSnippet('');
    setEditTags('Architecture, Best Practices');
  };

  const handleStartEdit = (note: Note) => {
    setSelectedNoteId(note.id);
    setIsEditing(true);
    setEditTitle(note.title);
    setEditTopic(note.topic);
    setEditContent(note.content);
    setEditSnippet(note.codeSnippet || '');
    setEditTags(note.tags.join(', '));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    const tagsArr = editTags.split(',').map(t => t.trim()).filter(Boolean);

    if (selectedNoteId === 'new') {
      addNote({
        title: editTitle.trim(),
        topic: editTopic.trim() || 'General',
        category: 'Full-Stack',
        content: editContent,
        codeSnippet: editSnippet.trim() || undefined,
        tags: tagsArr
      });
      setIsEditing(false);
      setTimeout(() => {
        if (notes.length > 0) setSelectedNoteId(notes[0].id);
      }, 50);
    } else {
      updateNote(selectedNoteId, {
        title: editTitle.trim(),
        topic: editTopic.trim(),
        content: editContent,
        codeSnippet: editSnippet.trim() || undefined,
        tags: tagsArr
      });
      setIsEditing(false);
    }
  };

  const filteredNotes = notes.filter(n =>
    !search ||
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.topic.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase()) ||
    n.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              <span>TECHNICAL NOTEBOOK</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-100 mt-1">
              Developer Study Notes
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 mt-1">
              Record system design trade-offs, algorithms invariants, SQL indexes, and code blueprints.
            </p>
          </div>

          <button
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all self-start sm:self-center"
          >
            <Plus className="h-4 w-4" />
            <span>New Note</span>
          </button>
        </div>
      </div>

      {/* Split Pane: Notes List (Left) and Note Viewer/Editor (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        {/* Left: Notes Sidebar */}
        <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => {
                  setSelectedNoteId(note.id);
                  setIsEditing(false);
                }}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedNoteId === note.id && !isEditing
                    ? 'bg-neutral-800/90 border-indigo-500/50 shadow-sm'
                    : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-semibold text-neutral-100 line-clamp-1">
                    {note.title}
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-500 shrink-0">
                    {note.updatedAt}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono">
                  <span className="text-indigo-400">#{note.topic}</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                  {note.content.replace(/###/g, '')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Note Detail / Editor */}
        <div className="lg:col-span-8 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between">
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h3 className="text-sm font-bold text-neutral-100">
                  {selectedNoteId === 'new' ? 'Create New Technical Note' : 'Edit Note'}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs"
                  >
                    Save Note
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Topic / Technology</label>
                  <input
                    type="text"
                    value={editTopic}
                    onChange={(e) => setEditTopic(e.target.value)}
                    placeholder="e.g. PostgreSQL, Redis, React"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={editTags}
                  onChange={(e) => setEditTags(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <label className="block text-xs font-medium text-neutral-400 mb-1">Content (Markdown supported)</label>
                <textarea
                  required
                  rows={8}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full flex-1 bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-200 font-mono focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Code Snippet (Optional)</label>
                <textarea
                  rows={4}
                  value={editSnippet}
                  onChange={(e) => setEditSnippet(e.target.value)}
                  placeholder="Paste relevant code implementation..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-200 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>
            </form>
          ) : selectedNote ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-neutral-800 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <span className="text-indigo-400 font-semibold">{selectedNote.topic}</span>
                    <span>·</span>
                    <span>Updated {selectedNote.updatedAt}</span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-100 mt-1">
                    {selectedNote.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleStartEdit(selectedNote)}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                    title="Edit Note"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteNote(selectedNote.id)}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-500 hover:text-rose-400 transition-colors"
                    title="Delete Note"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2">
                {selectedNote.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-neutral-300 bg-neutral-950 px-2.5 py-1 rounded-md border border-neutral-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Note Content */}
              <div className="text-sm text-neutral-200 leading-relaxed space-y-3 font-normal whitespace-pre-line bg-neutral-950/40 p-5 rounded-xl border border-neutral-850">
                {selectedNote.content}
              </div>

              {/* Code Snippet Box if available */}
              {selectedNote.codeSnippet && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>Code Blueprint</span>
                    <button
                      onClick={() => handleCopySnippet(selectedNote.codeSnippet!)}
                      className="flex items-center gap-1 hover:text-neutral-200 transition-colors"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 font-mono text-xs text-neutral-200 overflow-x-auto leading-relaxed">
                    <code>{selectedNote.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <div className="py-24 text-center text-neutral-500 text-xs font-mono">
              Select or create a note to begin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
