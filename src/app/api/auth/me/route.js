import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { authMiddleware } from "@/lib/authMiddleware";

export async function GET(req) {
  try {
    await connectDB();
    const user = await authMiddleware(req);

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const dbUser = await User.findById(user.id).select("-password");
    if (!dbUser) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(
      JSON.stringify({ user: { id: dbUser._id, name: dbUser.name, email: dbUser.email } }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Me error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
