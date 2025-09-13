"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/store/slices/authApi";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [register, { isLoading }] = useRegisterMutation();

  // ✅ Redirect if already logged in
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();
        if (data.user) router.push("/dashboard");
      } catch {}
    }
    checkAuth();
  }, [router]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(form).unwrap();
      toast.success("Registered — redirecting to dashboard");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.data?.error || "Registration failed");
    }
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Name"
          className="w-full p-3 border rounded"
        />
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
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white p-3 rounded"
        >
          {isLoading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </main>
  );
}
