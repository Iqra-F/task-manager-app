import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import { authMiddleware } from "@/lib/authMiddleware";

export async function GET(req) {
  try {
    await connectDB();
    const user = await authMiddleware(req);
    if (!user)
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });

    const tasks = await Task.find({ user: user.id }).sort({ createdAt: -1 });
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const user = await authMiddleware(req);
    if (!user)
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });

    const { title, description, status, priority, dueDate } = await req.json();

    if (!title) {
      return new Response(JSON.stringify({ error: "Title required" }), {
        status: 400,
      });
    }

    const task = await Task.create({
      user: user.id,
      title,
      description,
      status,
      priority,
      dueDate,
    });

    return new Response(JSON.stringify(task), { status: 201 });
  } catch {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
