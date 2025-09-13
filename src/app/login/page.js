"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      // store profile in redux so UI can be updated
      dispatch(setUser(data.user));
      toast.success("Welcome back — redirecting");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message || "Login error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" type="email" className="w-full p-3 border rounded" />
        <input name="password" value={form.password} onChange={onChange} placeholder="Password" type="password" className="w-full p-3 border rounded" />
        <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white p-3 rounded">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
