import { headers } from "next/headers";

export async function requireAdmin(): Promise<{ ok: true } | { ok: false; response: Response }> {
  const user = process.env.ADMIN_USERNAME;
  const pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) {
    return {
      ok: false,
      response: new Response(
        "Admin disabled. Set ADMIN_USERNAME and ADMIN_PASSWORD environment variables.",
        { status: 503 }
      ),
    };
  }
  const h = await headers();
  const auth = h.get("authorization") ?? "";
  const expected = "Basic " + Buffer.from(`${user}:${pass}`).toString("base64");
  if (auth !== expected) {
    return {
      ok: false,
      response: new Response("Unauthorized", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="SIYBT Admin", charset="UTF-8"' },
      }),
    };
  }
  return { ok: true };
}
