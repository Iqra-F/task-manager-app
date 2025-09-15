import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import { authMiddleware } from "@/lib/authMiddleware";
import axios from "axios";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const user = await authMiddleware(req);
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { id } = params;
    const updates = await req.json();

    const task = await Task.findOneAndUpdate(
      { _id: id, user: user.id },
      updates,
      { new: true }
    );

    if (!task) {
      return new Response(JSON.stringify({ error: "Task not found" }), { status: 404 });
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SOCKET_URL}/emit`,
        {
          event: "task:updated",
          payload: task,
          room: user.id,
        },
        { headers: { "x-api-secret": process.env.SOCKET_API_SECRET } }
      );
    } catch (err) {
      console.error("Socket emit failed (task:updated):", err.message);
    }

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (err) {
    console.error("PUT /tasks error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const user = await authMiddleware(req);
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { id } = params;

    const task = await Task.findOneAndDelete({ _id: id, user: user.id });
    if (!task) {
      return new Response(JSON.stringify({ error: "Task not found" }), { status: 404 });
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SOCKET_URL}/emit`,
        {
          event: "task:deleted",
          payload: { _id: id },
          room: user.id,
        },
        { headers: { "x-api-secret": process.env.SOCKET_API_SECRET } }
      );
    } catch (err) {
      console.error("Socket emit failed (task:deleted):", err.message);
    }

    return new Response(JSON.stringify({ msg: "Task deleted" }), { status: 200 });
  } catch (err) {
    console.error("DELETE /tasks error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
