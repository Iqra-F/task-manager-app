import jwt from "jsonwebtoken";

export function signToken(user, expiresIn = "7d") {
  if (!user || !user._id || !user.email) {
    throw new Error("Invalid user payload for signToken");
  }

  return jwt.sign(
    { id: user._id.toString(), email: user.email, name: user.name || null },
    process.env.JWT_SECRET,
    { expiresIn }
  );
}

export function verifyToken(token) {
  try {
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}
