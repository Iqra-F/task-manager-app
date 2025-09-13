"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetTasksQuery } from "@/store/slices/tasksApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  // RTK Query will include cookies (credentials: 'include'), so if cookie expired,
  // the query will return an error which we can use to redirect to login.
  const { data: tasks, isLoading, error } = useGetTasksQuery();

  useEffect(() => {
    if (error) {
      // If unauthorized, redirect user to login (we expect 401 from API)
      if (error?.status === 401) {
        toast.error("Please sign in");
        router.push("/login");
      }
    }
  }, [error, router]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      {isLoading && <p>Loading tasks…</p>}
      {tasks && tasks.length === 0 && <p>No tasks yet — add your first one.</p>}
      {tasks && tasks.map((t) => (
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
