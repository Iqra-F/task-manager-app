"use client";
import { useState, useEffect } from "react";
import { useAddTaskMutation, useUpdateTaskMutation } from "@/store/slices/tasksApi";
import { toast } from "react-hot-toast";

export default function TaskForm({ task = null, onClose }) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "pending");
  const [priority, setPriority] = useState(task?.priority || "medium");
  const [dueDate, setDueDate] = useState(task?.dueDate ? task.dueDate.slice(0, 10) : "");

  const [addTask, { isLoading: adding }] = useAddTaskMutation();
  const [updateTask, { isLoading: updating }] = useUpdateTaskMutation();

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
    <div className="p-4 border rounded bg-gray-50 mb-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-3 py-2 rounded w-full"
            rows={3}
          />
        </div>

        <div className="flex gap-3 flex-wrap">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={adding || updating}
          >
            {task ? (updating ? "Updating…" : "Update Task") : adding ? "Adding…" : "Add Task"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
