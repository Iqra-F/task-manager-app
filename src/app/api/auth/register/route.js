import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { signToken } from "@/lib/jwt";
import { registerSchema } from "@/lib/validation"; // import your Joi schema

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    // Validate input using Joi
    const { error } = registerSchema.validate({ name, email, password });
    if (error) {
      return new Response(JSON.stringify({ error: error.details[0].message }), {
        status: 400,
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ error: "Email already in use" }), {
        status: 400,
      });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = signToken(user);

    return new Response(
      JSON.stringify({
        user: { id: user._id, name: user.name, email: user.email },
        token,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; SameSite=Lax; ${
            process.env.NODE_ENV === "production" ? "Secure" : ""
          }`,
        },
      }
    );
  } catch (err) {
    console.error("Register error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
