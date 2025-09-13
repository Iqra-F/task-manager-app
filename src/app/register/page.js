"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // include ensures httpOnly cookie will be set by server in response and used later
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      // store user profile in redux for UI (token is httpOnly cookie)
      dispatch(setUser(data.user));
      toast.success("Registered — redirecting to dashboard");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={onChange} placeholder="Name" className="w-full p-3 border rounded" />
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" type="email" className="w-full p-3 border rounded" />
        <input name="password" value={form.password} onChange={onChange} placeholder="Password" type="password" className="w-full p-3 border rounded" />
        <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white p-3 rounded">
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </main>
  );
}
