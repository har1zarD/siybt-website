import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TOURNAMENT_START = new Date("2027-01-28T09:00:00+01:00");

export type Venue = { name: string; area: string; capacity: number; primary?: boolean };
export const VENUES: ReadonlyArray<Venue> = [
  { name: "Hotel Hills Arena", area: "Ilidža", capacity: 3200, primary: true },
  { name: "KSC Ilidža", area: "Ilidža", capacity: 1800 },
  { name: "Dvorana Hrasnica", area: "Hrasnica", capacity: 1200 },
  { name: "Malak Regency Hall", area: "Centar", capacity: 900 },
  { name: "Dvorana Ramiz Salčin", area: "Mojmilo", capacity: 2400 },
  { name: "Skenderija Mala", area: "Centar", capacity: 1500 },
];

export const CATEGORIES = [
  { code: "U12M", label: "Dječaci U12", year: "2015 god." },
  { code: "U14M", label: "Dječaci U14", year: "2013 god." },
  { code: "U16M", label: "Dječaci U16", year: "2011 god." },
  { code: "U18M", label: "Dječaci U18", year: "2009 god." },
  { code: "U12F", label: "Djevojčice U12", year: "2015 god." },
  { code: "U14F", label: "Djevojčice U14", year: "2013 god." },
  { code: "U16F", label: "Djevojčice U16", year: "2011 god." },
  { code: "U18F", label: "Djevojčice U18", year: "2009 god." },
] as const;

export const COUNTRIES = [
  "Bosna i Hercegovina", "Hrvatska", "Srbija", "Crna Gora", "Slovenija",
  "Sjeverna Makedonija", "Njemačka", "Austrija", "Švicarska", "Švedska",
  "Norveška", "Danska", "Turska", "Italija", "Francuska", "Holandija",
];
