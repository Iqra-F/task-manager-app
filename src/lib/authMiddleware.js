import { verifyToken } from "./jwt";
import { cookies } from "next/headers";

export async function authMiddleware(req) {
  try {
    // Normalize headers
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const payload = verifyToken(token);
      return payload || null;
    }

    // Cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (token) {
      const payload = verifyToken(token);
      return payload || null;
    }

    return null;
  } catch (err) {
    console.error("authMiddleware error:", err.message);
    return null;
  }
}
