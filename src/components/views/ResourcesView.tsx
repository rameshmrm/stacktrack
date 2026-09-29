import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bookmark,
  Plus,
  Search,
  ExternalLink,
  Star,
  Trash2,
  Tag,
  X,
  Filter,
  Check
} from 'lucide-react';
import { Resource } from '../../types';

export const ResourcesView: React.FC = () => {
  const {
    resources,
    addResource,
    deleteResource,
    toggleResourceBookmark,
    addTagToResource,
    removeTagFromResource
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTagResourceId, setEditingTagResourceId] = useState<string | null>(null);
  const [newTagInput, setNewTagInput] = useState('');

  // New resource modal state
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState<Resource['category']>('Documentation');
  const [rating, setRating] = useState(5);
  const [tagsStr, setTagsStr] = useState('JavaScript, Tutorial');
  const [description, setDescription] = useState('');

  // Collect all unique tags across all resources
  const allUniqueTags = useMemo(() => {
    const set = new Set<string>();
    // Include common prompt suggested tags as base options
    const defaults = ['JavaScript', 'React', 'CSS', 'Tutorial', 'Documentation', 'TypeScript', 'Node.js', 'PostgreSQL', 'DSA', 'Docker', 'System Design'];
    defaults.forEach(t => set.add(t));
    resources.forEach(r => {
      r.tags.forEach(t => set.add(t));
    });
    return Array.from(set).sort();
  }, [resources]);

  const toggleTagFilter = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSelectedTags([]);
    setSelectedCategory('all');
    setSearch('');
  };

  const handleAddTagSubmit = (resourceId: string) => {
    const clean = newTagInput.trim();
    if (clean) {
      addTagToResource(resourceId, clean);
      setNewTagInput('');
      setEditingTagResourceId(null);
    }
  };

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    const parsedTags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);

    addResource({
      title: title.trim(),
      url: url.trim(),
      category,
      rating,
      tags: parsedTags.length > 0 ? parsedTags : ['Tutorial'],
      description: description.trim(),
      bookmarked: false
    });

    setTitle('');
    setUrl('');
    setDescription('');
    setTagsStr('JavaScript, Tutorial');
    setIsModalOpen(false);
  };

  // Filter resources based on search, category, and selected tags
  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      !search ||
      res.title.toLowerCase().includes(search.toLowerCase()) ||
      res.description.toLowerCase().includes(search.toLowerCase()) ||
      res.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || res.category === selectedCategory;

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every(t => res.tags.includes(t));

    return matchesSearch && matchesCategory && matchesTags;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              <span>DEVELOPER KNOWLEDGE VAULT</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-100 mt-1">
              Resources & Technical Bookmarks
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 mt-1 max-w-2xl">
              Curate documentation, courses, cheat sheets, and architectural guides. Add tags and filter seamlessly to find study materials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all whitespace-nowrap"
            >
              <Plus className="h-4 w-4" />
              <span>Add Resource</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search resources by title, tag, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {['all', 'Documentation', 'Course', 'YouTube', 'Book', 'Tool'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {cat === 'all' ? 'All Types' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tag Filtering Bar */}
        <div className="mt-4 pt-3 border-t border-neutral-800/80">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
              <Tag className="h-3.5 w-3.5 text-indigo-400" />
              <span>Filter by Tags:</span>
              {selectedTags.length > 0 && (
                <span className="text-indigo-400 font-semibold">
                  ({selectedTags.length} active)
                </span>
              )}
            </div>
            {selectedTags.length > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-neutral-400 hover:text-neutral-200 font-mono transition-colors"
              >
                Clear Tag Filters
              </button>
            )}
          </div>

          {/* Interactive Tag Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {allUniqueTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTagFilter(tag)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white font-medium shadow-sm'
                      : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                  }`}
                >
                  <span>#{tag}</span>
                  {isSelected && <Check className="h-3 w-3" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.length === 0 ? (
          <div className="col-span-full py-16 text-center text-neutral-500 font-mono text-xs">
            No resources match your tag and category filter.
            <div className="mt-2">
              <button
                onClick={clearAllFilters}
                className="text-indigo-400 hover:underline"
              >
                Reset filters
              </button>
            </div>
          </div>
        ) : (
          filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between hover:border-neutral-700 transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                      {res.category}
                    </span>
                    <div className="flex items-center text-amber-400 text-xs">
                      <Star className="h-3 w-3 fill-amber-400" />
                      <span className="font-mono text-[11px] ml-1 text-neutral-300">
                        {res.rating}.0
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleResourceBookmark(res.id)}
                      className={`p-1 transition-colors ${
                        res.bookmarked
                          ? 'text-amber-400'
                          : 'text-neutral-500 hover:text-neutral-300'
                      }`}
                      title={res.bookmarked ? 'Remove bookmark' : 'Bookmark resource'}
                    >
                      <Bookmark className={`h-4 w-4 ${res.bookmarked ? 'fill-amber-400' : ''}`} />
                    </button>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-neutral-400 hover:text-neutral-200 transition-colors"
                      title="Open external resource"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => deleteResource(res.id)}
                      className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
                      title="Delete resource"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-neutral-100 mt-2.5">
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {res.title}
                  </a>
                </h3>

                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed line-clamp-3">
                  {res.description}
                </p>
              </div>

              {/* Tags Section with inline Add Tag & Delete Tag functionality */}
              <div className="mt-5 pt-3 border-t border-neutral-800">
                <div className="flex flex-wrap items-center gap-1.5">
                  {res.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-300 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800 group"
                    >
                      <span>#{tag}</span>
                      <button
                        onClick={() => removeTagFromResource(res.id, tag)}
                        className="text-neutral-500 hover:text-rose-400 transition-colors"
                        title="Remove tag"
                      >
                        <X className="h-2.5 w-2.5" />
                      </button>
                    </span>
                  ))}

                  {/* Add Tag Button or Input */}
                  {editingTagResourceId === res.id ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        placeholder="Tag name"
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTagSubmit(res.id);
                          } else if (e.key === 'Escape') {
                            setEditingTagResourceId(null);
                          }
                        }}
                        autoFocus
                        className="bg-neutral-950 border border-indigo-500 rounded px-1.5 py-0.5 text-[11px] font-mono text-neutral-100 w-24 focus:outline-none"
                      />
                      <button
                        onClick={() => handleAddTagSubmit(res.id)}
                        className="text-[10px] text-indigo-400 hover:text-indigo-300 px-1 font-mono"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setEditingTagResourceId(null)}
                        className="text-[10px] text-neutral-500 hover:text-neutral-300"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingTagResourceId(res.id);
                        setNewTagInput('');
                      }}
                      className="text-[11px] font-mono text-neutral-500 hover:text-indigo-400 transition-colors flex items-center gap-0.5 px-1 py-0.5"
                      title="Add tag to this resource"
                    >
                      <Plus className="h-3 w-3" />
                      <span>Tag</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Resource Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-neutral-100">
            <h3 className="text-base font-bold text-neutral-100 mb-4">
              Add New Resource
            </h3>
            <form onSubmit={handleCreateResource} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Resource Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Total TypeScript Essentials & Patterns"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
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
                    <option value="Documentation">Documentation</option>
                    <option value="Course">Course</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Book">Book</option>
                    <option value="Tool">Tool</option>
                    <option value="Cheatsheet">Cheatsheet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Rating (1 - 5)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value={5}>5 Stars (Exceptional)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Decent)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Tags (comma separated, e.g. React, JavaScript, Tutorial, CSS)
                </label>
                <input
                  type="text"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  placeholder="JavaScript, React, CSS, Tutorial, Documentation"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Description & Why It's Useful
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of what this resource covers..."
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
                  Save Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
