"use client";
import { useState, useEffect } from "react";
import { useDeleteTaskMutation } from "@/store/slices/tasksApi";
import { toast } from "react-hot-toast";
import TaskForm from "./TaskForm";
import { Edit3, Trash2, Calendar, Clock, AlertCircle, FileText, CheckCircle, Circle, PlayCircle } from "lucide-react";

export default function TaskCard({ task, isDark: initialDark }) {
  const [editing, setEditing] = useState(false);
  const [deleteTask, { isLoading: deleting }] = useDeleteTaskMutation();
  const [isDark, setIsDark] = useState(initialDark);

  useEffect(() => {
    setIsDark(initialDark);
  }, [initialDark]);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(task._id).unwrap();
      toast.success("Task deleted");
    } catch {
      toast.error("Delete failed");
    }
  }

  const getStatusInfo = () => {
    switch (task.status) {
      case "completed":
        return { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" };
      case "in-progress":
        return { icon: PlayCircle, color: "text-blue-500", bg: "bg-blue-500/10" };
      default:
        return { icon: Circle, color: "text-yellow-500", bg: "bg-yellow-500/10" };
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      default:
        return "text-green-500";
    }
  };

  const StatusIcon = getStatusInfo().icon;
  const statusColor = getStatusInfo().color;
  const statusBg = getStatusInfo().bg;
  const priorityColor = getPriorityColor();

  if (editing) {
    return <TaskForm task={task} onClose={() => setEditing(false)} isDark={isDark} />;
  }

  return (
    <div className={`p-5 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} shadow-lg transition-all hover:shadow-xl`}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-1.5 rounded-full ${statusBg}`}>
              <StatusIcon className={`w-4 h-4 ${statusColor}`} />
            </div>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {task.title}
            </h3>
          </div>

          {task.description && (
            <div className="flex items-start gap-2 mb-3">
              <FileText className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {task.description}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-4 text-sm">
            <div className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <AlertCircle className="w-4 h-4" />
              <span className={`font-medium ${priorityColor}`}>{task.priority}</span>
            </div>

            {task.dueDate && (
              <div className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <Calendar className="w-4 h-4" />
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}

            <div className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <Clock className="w-4 h-4" />
              <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => setEditing(true)}
            className={`p-2 rounded-lg transition-all hover:scale-110 ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
            title="Edit task"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`p-2 rounded-lg transition-all hover:scale-110 ${isDark ? 'bg-red-600/20 hover:bg-red-600/30 text-red-400' : 'bg-red-100 hover:bg-red-200 text-red-500'} disabled:opacity-50`}
            title="Delete task"
          >
            {deleting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200/50">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
          <StatusIcon className={`w-3 h-3 mr-1 ${statusColor}`} />
          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{task.status}</span>
        </div>
        
        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Created {new Date(task.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}