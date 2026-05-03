"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const STATUSES = ["pending", "confirmed", "rejected"] as const;
export type RegStatus = (typeof STATUSES)[number];

export async function updateRegistrationStatus(id: string, status: RegStatus) {
  if (!process.env.DATABASE_URL) return { ok: false, reason: "no-db" };
  if (!STATUSES.includes(status)) return { ok: false, reason: "bad-status" };
  await prisma.registration.update({ where: { id }, data: { status } });
  revalidatePath("/admin/registrations");
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteRegistration(id: string) {
  if (!process.env.DATABASE_URL) return { ok: false, reason: "no-db" };
  await prisma.registration.delete({ where: { id } });
  revalidatePath("/admin/registrations");
  revalidatePath("/admin");
  return { ok: true };
}

const createSchema = z.object({
  clubName: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  contact: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  categories: z.array(z.string()).min(1),
  hotelChoice: z.enum(["hills", "malak", "hollywood", "none"]).default("none"),
  rooms: z.number().int().min(0).optional(),
  nights: z.number().int().min(0).optional(),
  notes: z.string().optional(),
  status: z.enum(STATUSES).default("confirmed"),
});

export async function createRegistration(input: z.infer<typeof createSchema>) {
  if (!process.env.DATABASE_URL) return { ok: false, reason: "no-db" as const };
  const parsed = createSchema.safeParse(input);
  if (!parsed.success) return { ok: false, reason: "invalid" as const, issues: parsed.error.issues };
  const d = parsed.data;
  await prisma.registration.create({
    data: {
      clubName: d.clubName,
      city: d.city,
      country: d.country,
      contact: d.contact,
      email: d.email,
      phone: d.phone,
      categories: d.categories,
      needsAccommodation: d.hotelChoice !== "none",
      hotelChoice: d.hotelChoice,
      rooms: d.rooms ?? 0,
      nights: d.nights ?? 0,
      notes: d.notes ?? null,
      status: d.status,
    },
  });
  revalidatePath("/admin/registrations");
  revalidatePath("/admin");
  return { ok: true as const };
}
