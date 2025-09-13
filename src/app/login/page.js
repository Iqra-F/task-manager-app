"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation, useMeQuery, useLogoutMutation } from "@/store/slices/authApi";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const [login, { isLoading: loggingIn }] = useLoginMutation();
  const [logout, { isLoading: loggingOut }] = useLogoutMutation();
  const { data: user, isLoading: checkingAuth } = useMeQuery();

  // Redirect if already logged in
  useEffect(() => {
    if (!checkingAuth && user) {
      router.replace("/dashboard");
    }
  }, [user, checkingAuth, router]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(form).unwrap();
      toast.success("Welcome back — redirecting...");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err?.data?.error || "Login failed");
    }
  }

  async function handleLogout() {
    try {
      await logout().unwrap();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch {
      toast.error("Failed to logout");
    }
  }

  // Show loading overlay while checking auth
  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Checking authentication...</p>
      </div>
    );
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email"
          type="email"
          className="w-full p-3 border rounded"
        />
        <input
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="Password"
          type="password"
          className="w-full p-3 border rounded"
        />
        <button
          type="submit"
          disabled={loggingIn}
          className="w-full bg-indigo-600 text-white p-3 rounded disabled:opacity-50"
        >
          {loggingIn ? "Signing in..." : "Sign in"}
        </button>
      </form>

      {user && (
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="mt-4 w-full bg-red-600 text-white p-3 rounded disabled:opacity-50"
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      )}
    </main>
  );
}
