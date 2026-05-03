import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

async function sendMail(data: z.infer<typeof schema>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "SIYBT <noreply@siybt.ba>",
      to: ["info@siybt.ba"],
      reply_to: data.email,
      subject: `[Contact] ${data.subject}`,
      text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
    }),
  });
  return res.ok;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });

  let stored = false;
  try {
    if (process.env.DATABASE_URL) {
      await prisma.contactMessage.create({ data: parsed.data });
      stored = true;
    }
  } catch (e) {
    console.error("contact: db write failed", e);
  }

  const sent = await sendMail(parsed.data).catch(() => false);
  return NextResponse.json({ ok: true, stored, sent });
}
