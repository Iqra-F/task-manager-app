import { verifyToken } from "./jwt";

export function authMiddleware(req) {
  try {
    // 1) Check Authorization header
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      return verifyToken(token);
    }

    // 2) Check cookies from request
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const match = cookieHeader.match(/token=([^;]+)/);
      if (match) {
        return verifyToken(match[1]);
      }
    }

    return null;
  } catch (err) {
    return null;
  }
}
