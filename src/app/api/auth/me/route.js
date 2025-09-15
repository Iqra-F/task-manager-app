import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
console.log("Decoded user in /me:", decoded);

    return new Response(
      JSON.stringify({
        user: {
          id: decoded.id,          // consistent with register/login
          email: decoded.email,
          name: decoded.name || "", //  now dashboard sees name
        },
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /auth/me error:", err);
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
}
