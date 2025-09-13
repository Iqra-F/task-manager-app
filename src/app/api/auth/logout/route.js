// Convenience route to clear auth cookie from client.
export async function POST() {
  const cookie = `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`;
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
  });
}