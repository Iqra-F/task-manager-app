import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { loginSchema } from "@/lib/validate"; // ✅ Joi schema

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // ✅ Validate input
    const { error, value } = loginSchema.validate(body);
    if (error) {
      return new Response(JSON.stringify({ error: error.details[0].message }), {
        status: 400,
      });
    }
    const { email, password } = value;

    // ✅ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // ✅ Token
    const token = signToken(user);
    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return new Response(
      JSON.stringify({ user: { id: user._id, name: user.name, email } }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
