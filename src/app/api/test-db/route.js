import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ ok: true, msg: "MongoDB connected!" });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
