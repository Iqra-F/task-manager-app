import jwt from "jsonwebtoken";

/**
 * Create a signed JWT for the given user
 */
export function signToken(user) {
  if (!user || !user._id || !user.email) {
    throw new Error("Invalid user payload for signToken");
  }

  return jwt.sign(
    {
      id: user._id.toString(), // normalize _id to string
      email: user.email,
      name: user.name || null, // safe optional
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
}

/**
 * Verify JWT and return payload if valid
 * Returns `null` instead of throwing
 */
export function verifyToken(token) {
  try {
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded && typeof decoded === "object" ? decoded : null;
  } catch {
    return null;
  }
}
