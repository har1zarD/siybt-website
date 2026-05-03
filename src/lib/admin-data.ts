import "server-only";
import { prisma } from "./prisma";

const SAMPLE = {
  registrations: [
    { id: "demo-1", createdAt: new Date(), clubName: "KK Bosna", city: "Sarajevo", country: "BiH", contact: "Office", email: "office@example.test", phone: "+387", categories: ["U14M", "U16M"], needsAccommodation: true, hotelChoice: "hills", rooms: 4, nights: 3, notes: "Sample row - DATABASE_URL not set.", status: "pending", emailSent: false },
    { id: "demo-2", createdAt: new Date(Date.now() - 86_400_000), clubName: "ALBA Berlin Y", city: "Berlin", country: "DE", contact: "Office", email: "office@example.test", phone: "+49", categories: ["U18M"], needsAccommodation: true, hotelChoice: "hollywood", rooms: 2, nights: 3, notes: null, status: "confirmed", emailSent: true },
  ],
  contact: [
    { id: "c-1", createdAt: new Date(), name: "Sample Sender", email: "sender@example.test", subject: "Sample inquiry", message: "Sample row - DATABASE_URL not set.", read: false },
  ],
  family: [
    { id: "f-1", createdAt: new Date(), fullName: "Parent Name", email: "parent@example.test", phone: "+387", club: "KK Bosna", arrival: new Date("2027-01-28"), departure: new Date("2027-01-31"), adults: 2, children: 1, skiAddon: true, notes: null, status: "pending" },
  ],
  press: [
    { id: "p-1", createdAt: new Date(), fullName: "Reporter", outlet: "Sample Outlet", email: "press@example.test", phone: "+387", notes: null, status: "pending" },
  ],
};

const dbReady = () => Boolean(process.env.DATABASE_URL);

export async function getOverview() {
  if (!dbReady()) {
    return {
      counts: {
        registrations: SAMPLE.registrations.length,
        contact: SAMPLE.contact.length,
        family: SAMPLE.family.length,
        press: SAMPLE.press.length,
      },
      recent: { registrations: SAMPLE.registrations, contact: SAMPLE.contact },
      mode: "sample" as const,
    };
  }
  const [registrations, contact, family, press, recentRegs, recentContact] = await Promise.all([
    prisma.registration.count(),
    prisma.contactMessage.count(),
    prisma.familyBooking.count(),
    prisma.pressAccreditation.count(),
    prisma.registration.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);
  return {
    counts: { registrations, contact, family, press },
    recent: { registrations: recentRegs, contact: recentContact },
    mode: "live" as const,
  };
}

export async function getRegistrations() {
  if (!dbReady()) return { rows: SAMPLE.registrations, mode: "sample" as const };
  const rows = await prisma.registration.findMany({ orderBy: { createdAt: "desc" } });
  return { rows, mode: "live" as const };
}

export async function getContact() {
  if (!dbReady()) return { rows: SAMPLE.contact, mode: "sample" as const };
  const rows = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  return { rows, mode: "live" as const };
}

export async function getFamily() {
  if (!dbReady()) return { rows: SAMPLE.family, mode: "sample" as const };
  const rows = await prisma.familyBooking.findMany({ orderBy: { createdAt: "desc" } });
  return { rows, mode: "live" as const };
}

export async function getPress() {
  if (!dbReady()) return { rows: SAMPLE.press, mode: "sample" as const };
  const rows = await prisma.pressAccreditation.findMany({ orderBy: { createdAt: "desc" } });
  return { rows, mode: "live" as const };
}

export type DataMode = "live" | "sample";
