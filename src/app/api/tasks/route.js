import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import { authMiddleware } from "@/lib/authMiddleware";
import axios from "axios";

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
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
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

    // 🔹 Emit socket event
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SOCKET_URL}/emit`,
        {
          event: "task:created",
          payload: task,
          room: user.id,
        },
        { headers: { "x-api-secret": process.env.SOCKET_API_SECRET } }
      );
    } catch (err) {
      console.error("Socket emit failed", err.message);
    }

    return new Response(JSON.stringify(task), { status: 201 });
  } catch {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
