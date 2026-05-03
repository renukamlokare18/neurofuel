import focus from "@/assets/kit-focus.jpg";
import latenight from "@/assets/kit-latenight.jpg";
import tournament from "@/assets/kit-tournament.jpg";

export type Kit = {
  id: string;
  name: string;
  tagline: string;
  calories: number;
  tags: string[];
  image: string;
};

export const KITS: Kit[] = [
  {
    id: "focus-boost",
    name: "Focus Boost",
    tagline: "Berries, omega-3 nuts & greens for sharper aim.",
    calories: 480,
    tags: ["Focus", "Veg"],
    image: focus,
  },
  {
    id: "late-night-grind",
    name: "Late Night Grind",
    tagline: "Low-sugar snacks & electrolytes for marathon sessions.",
    calories: 320,
    tags: ["Energy", "Snack"],
    image: latenight,
  },
  {
    id: "tournament-mode",
    name: "Tournament Mode",
    tagline: "High-protein meal prep built for clutch moments.",
    calories: 720,
    tags: ["Protein", "Endurance"],
    image: tournament,
  },
];

export const SAMPLE_PLAN = [
  { time: "09:00", meal: "Greek yogurt + blueberries + walnuts" },
  { time: "13:00", meal: "Grilled chicken bowl, quinoa, avocado" },
  { time: "17:00", meal: "Dark chocolate + almonds + green tea" },
  { time: "21:00", meal: "Salmon, sweet potato, steamed broccoli" },
];

export type Log = {
  date: string;
  energy: number;
  focus: number;
  hours: number;
};

export const SAMPLE_LOGS: Log[] = [
  { date: "Mon", energy: 3, focus: 4, hours: 5 },
  { date: "Tue", energy: 4, focus: 4, hours: 6 },
  { date: "Wed", energy: 5, focus: 5, hours: 4 },
  { date: "Thu", energy: 4, focus: 3, hours: 7 },
  { date: "Fri", energy: 5, focus: 5, hours: 6 },
];
