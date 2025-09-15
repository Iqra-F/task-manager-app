"use client";
import { useState, useEffect } from "react";
import { useAddTaskMutation, useUpdateTaskMutation } from "@/store/slices/tasksApi";
import { toast } from "react-hot-toast";
import { X, Calendar, AlertCircle, FileText } from "lucide-react";

export default function TaskForm({ task = null, onClose, isDark: initialDark }) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "pending");
  const [priority, setPriority] = useState(task?.priority || "medium");
  const [dueDate, setDueDate] = useState(task?.dueDate ? task.dueDate.slice(0, 10) : "");
  const [isDark, setIsDark] = useState(initialDark);

  const [addTask, { isLoading: adding }] = useAddTaskMutation();
  const [updateTask, { isLoading: updating }] = useUpdateTaskMutation();

  useEffect(() => {
    setIsDark(initialDark);
  }, [initialDark]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
    }
  }, [task]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return toast.error("Title is required");

    try {
      if (task) {
        await updateTask({
          id: task._id,
          title,
          description,
          status,
          priority,
          dueDate: dueDate || null,
        }).unwrap();
        toast.success("Task updated");
      } else {
        await addTask({
          title,
          description,
          status,
          priority,
          dueDate: dueDate || null,
        }).unwrap();
        toast.success("Task added");
      }
      onClose();
    } catch (err) {
      toast.error("Operation failed");
    }
  }

  return (
    <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} shadow-xl mb-6`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {task ? "Edit Task" : "Create New Task"}
        </h2>
        <button
          onClick={onClose}
          className={`p-1 rounded-full transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Title *
          </label>
          <div className="relative">
            <FileText className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'}`}
              required
              placeholder="Enter task title"
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'}`}
            rows={3}
            placeholder="Enter task description (optional)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isDark ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-white/50 border-gray-300 text-gray-900'}`}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isDark ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-white/50 border-gray-300 text-gray-900'}`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Due Date
            </label>
            <div className="relative">
              <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isDark ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-white/50 border-gray-300 text-gray-900'}`}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={adding || updating}
            className="group flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {adding || updating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                {task ? "Updating..." : "Adding..."}
              </>
            ) : (
              <>
                {task ? "Update Task" : "Add Task"}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-3 rounded-lg font-medium transition-all ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}