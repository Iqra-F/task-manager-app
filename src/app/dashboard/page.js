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

import { CheckCircle2, Plus, LogOut, Sun, Moon, User, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isDark, setIsDark] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { data: me, isLoading: userLoading } = useMeQuery();
  const user = me?.user; // ✅ flatten response

  const { data: tasks, isLoading: tasksLoading, error: tasksError } = useGetTasksQuery(undefined, {
    skip: !user,
  });

  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  const [addingTask, setAddingTask] = useState(false);

  // Mouse tracking for background effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      <div className={`min-h-screen transition-all duration-500 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }} />
        </div>

        <div className="flex items-center justify-center min-h-screen">
          <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} shadow-2xl`}>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-pulse">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <p className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Loading dashboard...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push('/')}>
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            TaskFlow
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-lg transition-all hover:scale-110 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
          
          {user && (
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className={`group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white font-medium disabled:opacity-50`}
            >
              {logoutLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              <span>{logoutLoading ? "Logging out…" : "Logout"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 pt-2 max-w-6xl mx-auto">
        {user && (
          <div className={`mb-8 p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} shadow-xl`}>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full border border-purple-200/20 mb-4">
              <Sparkles className="w-4 h-4 text-purple-500 mr-2" />
              <span className="text-sm font-medium text-purple-600">Welcome back</span>
            </div>
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'} mr-4`}>
                <User className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.name}</h2>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Your Tasks</h1>
          
          {!addingTask && (
            <button
              onClick={() => setAddingTask(true)}
              className="group flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-[1.02] hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add Task</span>
            </button>
          )}
        </div>

        {addingTask ? (
          <div className={`mb-8 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} shadow-xl`}>
            <TaskForm onClose={() => setAddingTask(false)}  isDark={isDark} />
          </div>
        ) : null}

        <section className={`rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} shadow-xl p-6`}>
          {tasksLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              <span className={`ml-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Loading tasks…</span>
            </div>
          ) : tasksError ? (
            <div className={`p-4 rounded-lg ${isDark ? 'bg-red-900/20' : 'bg-red-50'} border ${isDark ? 'border-red-700/50' : 'border-red-200'}`}>
              <p className={`text-center ${isDark ? 'text-red-300' : 'text-red-600'}`}>Failed to load tasks. Please refresh.</p>
            </div>
          ) : tasks && tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mb-4">
                <CheckCircle2 className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>No tasks yet</h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Add your first task to get started</p>
            </div>
          ) : (
            <TaskList tasks={tasks} isDark={isDark}/>
          )}
        </section>
      </div>
    </div>
  );
}