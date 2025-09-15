"use client";
import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { Search, Filter, X } from "lucide-react";

export default function TaskList({ tasks, isDark: initialDark }) {
  const safeTasks = tasks || [];
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [isDark, setIsDark] = useState(initialDark);

  useEffect(() => {
    setIsDark(initialDark);
  }, [initialDark]);

  const filteredTasks = safeTasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.description &&
        t.description.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = filterStatus === "all" || t.status === filterStatus;
    const matchesPriority =
      filterPriority === "all" || t.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const clearFilters = () => {
    setSearch("");
    setFilterStatus("all");
    setFilterPriority("all");
  };

  const hasActiveFilters = search !== "" || filterStatus !== "all" || filterPriority !== "all";

  return (
    <div>
      <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800/30' : 'bg-white/30'} backdrop-blur-xl border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} mb-6`}>
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[250px]">
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Search tasks
            </label>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search by title or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'}`}
              />
            </div>
          </div>

          <div className="min-w-[150px]">
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isDark ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-white/50 border-gray-300 text-gray-900'}`}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="min-w-[150px]">
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Priority
            </label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isDark ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-white/50 border-gray-300 text-gray-900'}`}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className={`flex items-center space-x-1 px-3 py-3 rounded-lg font-medium transition-all ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              <X className="w-4 h-4" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {hasActiveFilters && (
          <div className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {filteredTasks.length} of {safeTasks.length} tasks
          </div>
        )}
      </div>

      {filteredTasks.length === 0 ? (
        <div className={`text-center py-12 rounded-2xl ${isDark ? 'bg-gray-800/30' : 'bg-white/30'} backdrop-blur-xl border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mb-4">
            <Filter className="w-8 h-8 text-purple-500" />
          </div>
          <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {hasActiveFilters ? "No tasks match your filters" : "No tasks yet"}
          </h3>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {hasActiveFilters ? "Try adjusting your search or filters" : "Create your first task to get started"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task._id} task={task} isDark={isDark} />
          ))}
        </div>
      )}
    </div>
  );
}