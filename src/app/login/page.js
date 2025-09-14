"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useLoginMutation, useLogoutMutation, useMeQuery } from "@/store/slices/authApi";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const [login, { isLoading: loggingIn }] = useLoginMutation();
  const [logout, { isLoading: loggingOut }] = useLogoutMutation();
  const { data: user, isLoading, isFetching } = useMeQuery();

  const authResolved = !isLoading && !isFetching && !loggingOut;

  useEffect(() => {
    if (authResolved && user) router.replace("/dashboard");
  }, [authResolved, user, router]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
  e.preventDefault();
  try {
    await login(form).unwrap();
    toast.success("Welcome back — redirecting...");
    router.replace("/dashboard");
  } catch (err) {
    toast.error(err?.data?.error || "Login failed");
  }
}
  if (!authResolved)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">
          {loggingOut ? "Logging out..." : "Checking authentication..."}
        </p>
      </div>
    );

  return (
    <main className="max-w-md mx-auto p-6">
      {!user && (
        <>
          <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Email"
              type="email"
              className="w-full p-3 border rounded"
              required
            />
            <input
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Password"
              type="password"
              className="w-full p-3 border rounded"
              required
            />
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full bg-indigo-600 text-white p-3 rounded disabled:opacity-50"
            >
              {loggingIn ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </>
      )}
    </main>
  );
}
