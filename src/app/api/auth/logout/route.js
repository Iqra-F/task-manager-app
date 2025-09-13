// Convenience route to clear auth cookie from client.
export async function POST() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie":
        "token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure",
    },
  });
}
