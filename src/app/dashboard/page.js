"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { useGetTasksQuery } from "@/store/slices/tasksApi";
import { useMeQuery, useLogoutMutation } from "@/store/slices/authApi";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";

export default function DashboardPage() {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useMeQuery();
  const { data: tasks, isLoading: tasksLoading } = useGetTasksQuery(undefined, { skip: !user });
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  const [addingTask, setAddingTask] = useState(false);

  useEffect(() => {
    if (!userLoading && !user) router.replace("/login");
  }, [userLoading, user, router]);

  async function handleLogout() {
    try {
      await logout().unwrap();
      router.replace("/login");
      toast.success("Signed out");
    } catch {
      toast.error("Logout failed");
    }
  }

  if (userLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading user…</p>
      </div>
    );
  }

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        {user && (
          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {logoutLoading ? "Logging out…" : "Logout"}
          </button>
        )}
      </div>

      {user && (
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <p className="font-medium">Welcome, {user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      )}

      {/* Add Task */}
      {addingTask ? (
        <TaskForm onClose={() => setAddingTask(false)} />
      ) : (
        <button
          onClick={() => setAddingTask(true)}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Task
        </button>
      )}

      {/* Task list */}
      <section>
        {tasksLoading ? (
          <p>Loading tasks…</p>
        ) : tasks ? (
          <TaskList tasks={tasks} />
        ) : (
          <p>No tasks yet.</p>
        )}
      </section>
    </main>
  );
}
