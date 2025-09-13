import { authMiddleware } from "@/lib/authMiddleware";

export async function GET(req) {
  const user = authMiddleware(req);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  return new Response(JSON.stringify({ msg: "Access granted", user }), { status: 200 });
}
