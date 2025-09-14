"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { useGetTasksQuery } from "@/store/slices/tasksApi";
import { useMeQuery, useLogoutMutation } from "@/store/slices/authApi";

export default function DashboardPage() {
  const router = useRouter();

  const { data: user, error: userError, isLoading: userLoading } = useMeQuery();
  const {
    data: tasks,
    isLoading: tasksLoading,
    error: tasksError,
  } = useGetTasksQuery(undefined, { skip: !user });

  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();

  // 🔹 redirect to login if unauthorized
 useEffect(() => {
  if (!userLoading && !user) {
    router.replace("/login");
  }
}, [userError, userLoading, router]);

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

      <section>
        {tasksLoading && <p>Loading tasks…</p>}
        {tasksError && (
          <p className="text-red-500">Failed to load tasks. Please refresh.</p>
        )}
        {tasks && tasks.length === 0 && <p>No tasks yet — add your first one.</p>}
        {tasks &&
          tasks.map((t) => (
            <div key={t._id} className="p-3 border rounded mb-2">
              <div className="flex justify-between">
                <h3 className="font-semibold">{t.title}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(t.createdAt).toLocaleString()}
                </span>
              </div>
              {t.description && (
                <p className="text-sm text-gray-600">{t.description}</p>
              )}
            </div>
          ))}
      </section>
    </main>
  );
}
