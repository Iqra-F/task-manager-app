"use client";
import { useState } from "react";
import { useDeleteTaskMutation } from "@/store/slices/tasksApi";
import { toast } from "react-hot-toast";
import TaskForm from "./TaskForm";

export default function TaskCard({ task }) {
  const [editing, setEditing] = useState(false);
  const [deleteTask] = useDeleteTaskMutation();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(task._id).unwrap();
      toast.success("Task deleted");
    } catch {
      toast.error("Delete failed");
    }
  }

  return (
    <div className="p-3 border rounded mb-2 bg-white shadow-sm">
      {editing ? (
        <TaskForm task={task} onClose={() => setEditing(false)} />
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              {task.description && (
                <p className="text-sm text-gray-600">{task.description}</p>
              )}
              <div className="flex gap-2 mt-1 text-xs text-gray-500">
                <span>Status: {task.status}</span>
                <span>Priority: {task.priority}</span>
                <span>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(true)}
                className="text-blue-500 hover:underline text-sm"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="text-right text-xs text-gray-400 mt-1">
            {new Date(task.createdAt).toLocaleString()}
          </div>
        </>
      )}
    </div>
  );
}
