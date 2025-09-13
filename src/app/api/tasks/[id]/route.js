import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import { authMiddleware } from "@/lib/authMiddleware";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const user = authMiddleware(req);
    if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const { id } = params;
    const updates = await req.json();

    const task = await Task.findOneAndUpdate(
      { _id: id, user: user.id },
      updates,
      { new: true }
    );

    if (!task) return new Response(JSON.stringify({ error: "Task not found" }), { status: 404 });

    // Later we’ll call socket emit here
    return new Response(JSON.stringify(task), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const user = authMiddleware(req);
    if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const { id } = params;
    const task = await Task.findOneAndDelete({ _id: id, user: user.id });

    if (!task) return new Response(JSON.stringify({ error: "Task not found" }), { status: 404 });

    // Later we’ll call socket emit here
    return new Response(JSON.stringify({ msg: "Task deleted" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
