"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import socket from "@/lib/socketClient";

import { useGetTasksQuery } from "@/store/slices/tasksApi";
import { useMeQuery, useLogoutMutation } from "@/store/slices/authApi";
import { tasksApi } from "@/store/slices/tasksApi";
import { useDispatch } from "react-redux";

import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: me, isLoading: userLoading } = useMeQuery();
  const user = me?.user; // ✅ flatten response

  const { data: tasks, isLoading: tasksLoading, error: tasksError } = useGetTasksQuery(undefined, {
    skip: !user,
  });

  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  const [addingTask, setAddingTask] = useState(false);

  // 🔹 Connect socket for this user
  useEffect(() => {
    if (!user) return;
    console.log("Dashboard user:", user);

    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id, "joining room:", user.id);
      socket.emit("presence:join", { userId: user.id, name: user.name });
    });

    const handleEvent = (event, payload) => {
      console.log("Received socket event:", event, payload);

      dispatch(
        tasksApi.util.updateQueryData("getTasks", undefined, (draft) => {
          if (event === "task:created") {
            draft.unshift(payload);
          } else if (event === "task:updated") {
            const idx = draft.findIndex((t) => t._id === payload._id);
            if (idx !== -1) draft[idx] = payload;
          } else if (event === "task:deleted") {
            return draft.filter((t) => t._id !== payload._id);
          }
        })
      );
    };

    socket.on("task:created", (task) => handleEvent("task:created", task));
    socket.on("task:updated", (task) => handleEvent("task:updated", task));
    socket.on("task:deleted", (task) => handleEvent("task:deleted", task));

    return () => {
      socket.off("connect");
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:deleted");
      socket.disconnect();
    };
  }, [user, dispatch]);

  // 🔹 Redirect to login if unauthorized
  useEffect(() => {
    if (!userLoading && !user) {
      router.replace("/login");
    }
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

      <section>
        {tasksLoading ? (
          <p>Loading tasks…</p>
        ) : tasksError ? (
          <p className="text-red-500">Failed to load tasks. Please refresh.</p>
        ) : tasks && tasks.length === 0 ? (
          <p>No tasks yet — add your first one.</p>
        ) : (
          <TaskList tasks={tasks} />
        )}
      </section>
    </main>
  );
}
