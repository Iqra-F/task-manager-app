"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetTasksQuery } from "@/store/slices/tasksApi";
import { useMeQuery, useLogoutMutation } from "@/store/slices/authApi";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const router = useRouter();
  const { data: user, error: userError, isLoading: userLoading } = useMeQuery();
  const { data: tasks, error: tasksError, isLoading: tasksLoading } = useGetTasksQuery(undefined, { skip: !user });
  const [logout] = useLogoutMutation();

  // Unauthorized redirects
  useEffect(() => {
    if (userError?.status === 401) {
      toast.error("Please sign in");
      router.push("/login");
    }
  }, [userError, router]);

  async function handleLogout() {
    try {
      await logout().unwrap();
      toast.success("Signed out");
      router.push("/login");
    } catch {
      toast.error("Logout failed");
    }
  }

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        )}
      </div>

      {/* User Info */}
      {userLoading && <p>Loading user…</p>}
      {user && (
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <p className="font-medium">Welcome, {user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      )}

      {/* Tasks */}
      {tasksLoading && <p>Loading tasks…</p>}
      {tasks && tasks.length === 0 && <p>No tasks yet — add your first one.</p>}
      {tasks &&
        tasks.map((t) => (
          <div key={t._id} className="p-3 border rounded mb-2">
            <div className="flex justify-between">
              <h3 className="font-semibold">{t.title}</h3>
              <span className="text-sm">{new Date(t.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">{t.description}</p>
          </div>
        ))}
    </main>
  );
}
