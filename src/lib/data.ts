import { CATEGORIES, VENUES } from "./utils";

export type Match = {
  id: string;
  day: "thu" | "fri" | "sat" | "sun";
  time: string;
  venue: string;
  category: string;
  home: string;
  away: string;
  live?: boolean;
};

const TEAM_NAMES = [
  "KK Bosna", "KK Sloboda", "KK Igokea", "KK Spars", "KK Vogošća",
  "KK Cedevita", "KK Mega", "KK Crvena Zvezda", "KK Partizan", "KK Olimpija",
  "Bayern Youth", "Real Madrid Cantera", "ALBA Berlin Y", "ASVEL Lyon", "FC Barcelona Y",
  "MZT Skopje", "Spartak Subotica", "Cibona", "Zadar", "Široki",
];

function pick(seed: number, n: number) {
  return TEAM_NAMES[(seed * 7 + n * 13) % TEAM_NAMES.length];
}

export const MATCHES: Match[] = (() => {
  const days: Match["day"][] = ["thu", "fri", "sat", "sun"];
  const times = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30", "21:00"];
  const out: Match[] = [];
  let n = 0;
  for (const d of days) {
    for (let t = 0; t < times.length; t++) {
      for (let v = 0; v < VENUES.length; v++) {
        if ((t + v + days.indexOf(d)) % 3 === 0) continue;
        const cat = CATEGORIES[(n + t + v) % CATEGORIES.length];
        out.push({
          id: `${d}-${t}-${v}`,
          day: d,
          time: times[t],
          venue: VENUES[v].name,
          category: cat.code,
          home: pick(n, 0),
          away: pick(n, 1),
          live: d === "sat" && t === 4 && v === 0,
        });
        n++;
      }
    }
  }
  return out;
})();

export type TeamRecord = {
  name: string;
  city: string;
  country: string;
  category: string;
  confirmed: boolean;
};

export const TEAMS: TeamRecord[] = (() => {
  const cities = ["Sarajevo", "Tuzla", "Banja Luka", "Mostar", "Zagreb", "Split", "Ljubljana", "Beograd", "Novi Sad", "Skopje", "Stockholm", "Berlin", "Vienna", "Zurich", "Istanbul", "Milano", "Paris", "Amsterdam", "Munich", "Hamburg"];
  const countries = ["Bosna i Hercegovina", "Bosna i Hercegovina", "Bosna i Hercegovina", "Bosna i Hercegovina", "Hrvatska", "Hrvatska", "Slovenija", "Srbija", "Srbija", "Sjeverna Makedonija", "Švedska", "Njemačka", "Austrija", "Švicarska", "Turska", "Italija", "Francuska", "Holandija", "Njemačka", "Njemačka"];
  const out: TeamRecord[] = [];
  for (let i = 0; i < 52; i++) {
    out.push({
      name: TEAM_NAMES[i % TEAM_NAMES.length] + (i >= TEAM_NAMES.length ? " II" : ""),
      city: cities[i % cities.length],
      country: countries[i % countries.length],
      category: CATEGORIES[i % CATEGORIES.length].code,
      confirmed: true,
    });
  }
  return out;
})();
