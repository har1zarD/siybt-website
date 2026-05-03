import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TOURNAMENT_START = new Date("2027-01-28T09:00:00+01:00");

export type Venue = { name: string; area: string; capacity: number; primary?: boolean; lat: number; lng: number };
export const VENUES: ReadonlyArray<Venue> = [
  { name: "Arena Hotel Hills 1", area: "Ilidža", capacity: 3200, lat: 43.82430, lng: 18.31790 },
  { name: "Hotel Hills 2", area: "Ilidža", capacity: 1400, lat: 43.82460, lng: 18.31760 },
  { name: "Hotel Hills 3", area: "Ilidža", capacity: 1100, lat: 43.82410, lng: 18.31820 },
  { name: "KSC Ilidža", area: "Ilidža", capacity: 1800, lat: 43.82780, lng: 18.31220 },
  { name: "Dvorana Hrasnica 1", area: "Hrasnica", capacity: 1200, lat: 43.80510, lng: 18.29650 },
  { name: "Dvorana Hrasnica 2", area: "Hrasnica", capacity: 900, lat: 43.80600, lng: 18.29800 },
  { name: "Malak Regency", area: "Ilidža", capacity: 900, lat: 43.81970, lng: 18.31480 },
];

export const CATEGORIES = [
  { code: "U12M", label: "Dječaci U12", year: "2015 god.", targetTeams: 10, clubFee: 300, perChildFee: 20 },
  { code: "U14M", label: "Dječaci U14", year: "2013 god.", targetTeams: 12, clubFee: 300, perChildFee: 20 },
  { code: "U16M", label: "Dječaci U16", year: "2011 god.", targetTeams: 12, clubFee: 300, perChildFee: 20 },
  { code: "U18M", label: "Dječaci U18", year: "2009 god.", targetTeams: 10, clubFee: 300, perChildFee: 20 },
  { code: "U12F", label: "Djevojčice U12", year: "2015 god.", targetTeams: 6, clubFee: 150, perChildFee: 20 },
  { code: "U14F", label: "Djevojčice U14", year: "2013 god.", targetTeams: 8, clubFee: 150, perChildFee: 20 },
  { code: "U16F", label: "Djevojčice U16", year: "2011 god.", targetTeams: 8, clubFee: 150, perChildFee: 20 },
  { code: "U18F", label: "Djevojčice U18", year: "2009 god.", targetTeams: 4, clubFee: 150, perChildFee: 20 },
] as const;

export type Hotel = {
  id: string; // hills | malak | hollywood | terme
  name: string;
  kind: "hotel" | "wellness";
  stars?: 4 | 5;
  badge?: string;
  address: string;
  area: string;
  tagline: string;
  rooms: string[];
  amenities: string[];
  url: string;
  images: string[];
  lat: number;
  lng: number;
  pricePerPerson?: number; // KM per person per night (indicative team rate)
};

export const HOTELS: ReadonlyArray<Hotel> = [
  {
    id: "hills",
    name: "Hotel Hills Sarajevo",
    kind: "hotel",
    stars: 5,
    pricePerPerson: 85,
    address: "Butmirska cesta 18, Ilidža",
    area: "Ilidža",
    tagline: "Glavni hotel turnira. Termalni & spa resort u zelenom okruženju Ilidže, povezan sa Hills dvoranama i Termalnom rivijerom.",
    rooms: ["Deluxe Double", "Deluxe Twin", "Deluxe Triple", "Deluxe Suite"],
    amenities: [
      "Termalna rivijera (15ha bazena u sklopu)",
      "Zatvoreni i otvoreni bazeni",
      "Spa & wellness - finska sauna · hammam · solana",
      "Fitness centar",
      "335 soba i suita",
    ],
    url: "https://hotelhills.ba/",
    images: [
      "/hotels/hills-exterior.jpg",
      "/hotels/hills-room.jpg",
      "/hotels/hills-interior.jpg",
      "/hotels/hills-spa.jpg",
      "/hotels/hills-view.jpg",
    ],
    lat: 43.82430,
    lng: 18.31790,
  },
  {
    id: "malak",
    name: "Malak Regency",
    kind: "hotel",
    stars: 5,
    pricePerPerson: 75,
    address: "Hrasnička cesta bb, Ilidža",
    area: "Ilidža",
    tagline: "Pet zvjezdica na Ilidži. Idealno za porodice koje žele tihi boravak između utakmica.",
    rooms: ["Classic", "Elegance", "Deluxe", "Regency", "Premium", "Royal Apartment"],
    amenities: [
      "Zatvoreni bazen",
      "Turski hammam",
      "Finska sauna",
      "Masaže & relax room",
      "Fitness centar",
    ],
    url: "https://www.malakregency.com/",
    images: [
      "/hotels/malak-exterior.jpg",
      "/hotels/malak-room.jpg",
      "/hotels/malak-suite.jpg",
      "/hotels/malak-premium.jpg",
      "/hotels/malak-spa.jpg",
    ],
    lat: 43.81970,
    lng: 18.31480,
  },
  {
    id: "hollywood",
    name: "Hotel Hollywood",
    kind: "hotel",
    stars: 4,
    pricePerPerson: 60,
    address: "Dr. Mustafe Pintola 23, Ilidža",
    area: "Ilidža",
    tagline: "Veliki kompleks na Ilidži sa sportskom dvoranom, kuglanom i kongresnim centrom - savršeno za delegacije.",
    rooms: ["Superior soba", "Deluxe soba", "Suite (466 jedinica ukupno)"],
    amenities: [
      "Zatvoreni bazen",
      "Finska, bio, infrared i steam sauna",
      "Hammam · solana · solarium",
      "Sportska dvorana & kuglana",
      "Kongresni centar (20–1.000 osoba)",
    ],
    url: "https://www.hotel-hollywood.ba/",
    images: [
      "/hotels/hollywood-exterior.png",
      "/hotels/hollywood-room.jpg",
      "/hotels/hollywood-interior.jpg",
      "/hotels/hollywood-pool.jpg",
      "/hotels/hollywood-event.jpg",
    ],
    lat: 43.82690,
    lng: 18.30790,
  },
  {
    id: "terme",
    name: "Termalna rivijera Sarajevo",
    kind: "wellness",
    badge: "Wellness · Bazeni",
    address: "Butmirska cesta 18, Ilidža",
    area: "Ilidža",
    tagline: "Termalni kompleks u sklopu Hotel Hills - 15 hektara bazena, wellness i animacijskih programa. Nije smještaj, ali je dostupno gostima hotela.",
    rooms: [],
    amenities: [
      "Vanjski i unutrašnji termalni bazeni",
      "Tobogani i animacija za djecu",
      "Wellness & spa centar",
      "Fitness centar",
      "Restorani & kafići · otvoreno 09–22",
    ],
    url: "https://terme-ilidza.ba/",
    images: [
      "/hotels/terme-hero.png",
      "/hotels/terme-1.jpg",
      "/hotels/terme-3.jpg",
      "/hotels/terme-4.jpg",
      "/hotels/terme-5.jpg",
    ],
    lat: 43.82780,
    lng: 18.31590,
  },
];

export const COUNTRIES = [
  "Bosna i Hercegovina", "Hrvatska", "Srbija", "Crna Gora", "Slovenija",
  "Sjeverna Makedonija", "Njemačka", "Austrija", "Švicarska", "Švedska",
  "Norveška", "Danska", "Turska", "Italija", "Francuska", "Holandija",
];
