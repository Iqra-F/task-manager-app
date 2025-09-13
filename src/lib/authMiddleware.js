import { verifyToken } from "./jwt";
import { cookies } from "next/headers";

export function authMiddleware(req) {
  try {
    // 1) Authorization header
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      return verifyToken(token);
    }

    // 2) HttpOnly cookie (using Next's helper)
    const token = cookies().get("token")?.value;
    if (token) {
      return verifyToken(token);
    }

    return null;
  } catch {
    return null;
  }
}
