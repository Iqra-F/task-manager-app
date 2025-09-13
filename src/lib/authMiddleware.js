// explanation: this middleware extracts a JWT token either from
// the `Authorization: Bearer <token>` header OR from a httpOnly cookie named "token".
// It then verifies the token and returns the decoded payload (or null if invalid).

import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

/**
 * Extract token from Authorization header OR from httpOnly cookie.
 * Returns decoded payload (user info) or null if not available/invalid.
 */
export function authMiddleware(req) {
  // 1) Check Authorization header
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    return verifyToken(token);
  }

  // 2) Check httpOnly cookie
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  return verifyToken(token);
}
