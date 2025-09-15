export async function POST() {
  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; ${
        process.env.NODE_ENV === "production" ? "Secure" : ""
      }`,
    },
  });
}
