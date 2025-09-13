import { verifyToken } from "./jwt";
import { cookies } from "next/headers";

/**
 * Auth middleware:
 * - Tries to extract JWT from Authorization header ("Bearer <token>")
 * - Or from HttpOnly cookie named "token"
 * - Returns decoded payload (user info) or null if invalid/missing
 */
export async function authMiddleware(req) {
  try {
    // 1) Authorization header
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const payload = verifyToken(token);
      return payload || null;
    }

    // 2) HttpOnly cookie
    const token = cookies().get("token")?.value;
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
