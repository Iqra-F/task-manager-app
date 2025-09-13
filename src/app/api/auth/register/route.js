import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { registerSchema } from "@/lib/validate"; // ✅ Joi schema

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // ✅ Validate input
    const { error, value } = registerSchema.validate(body);
    if (error) {
      return new Response(JSON.stringify({ error: error.details[0].message }), {
        status: 400,
      });
    }
    const { name, email, password } = value;

    // ✅ Check duplicate
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    // ✅ Token
    const token = signToken(newUser);
    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return new Response(
      JSON.stringify({ user: { id: newUser._id, name, email } }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
