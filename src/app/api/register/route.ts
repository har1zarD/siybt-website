import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  clubName: z.string().min(2),
  city: z.string().min(2),
  country: z.string().min(2),
  contact: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  categories: z.array(z.string()).min(1),
  needsAccommodation: z.boolean(),
  hotelChoice: z.enum(["hills", "malak", "hollywood"]).optional(),
  rooms: z.number().int().min(0).optional(),
  nights: z.number().int().min(0).optional(),
  notes: z.string().optional(),
});

async function sendMail(d: z.infer<typeof schema>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const text = [
    `Club: ${d.clubName} (${d.city}, ${d.country})`,
    `Contact: ${d.contact} - ${d.email} - ${d.phone}`,
    `Categories: ${d.categories.join(", ")}`,
    d.needsAccommodation ? `Accommodation: ${d.hotelChoice ?? "-"} · ${d.rooms ?? 0} rooms × ${d.nights ?? 0} nights` : "Accommodation: no",
    d.notes ? `\nNotes:\n${d.notes}` : "",
  ].join("\n");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "SIYBT <noreply@siybt.ba>",
      to: ["register@siybt.ba"],
      reply_to: d.email,
      subject: `[Register] ${d.clubName}`,
      text,
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
      await prisma.registration.create({ data: parsed.data });
      stored = true;
    }
  } catch (e) {
    console.error("register: db write failed", e);
  }

  const sent = await sendMail(parsed.data).catch(() => false);
  return NextResponse.json({ ok: true, stored, sent });
}
