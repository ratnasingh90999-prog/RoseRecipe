export const DAILY_QUOTES = [
  "Cooking is love made visible.",
  "A recipe has no soul. You must bring soul to the recipe.",
  "Good food is the foundation of genuine happiness.",
  "Eat pretty. Live softly. Glow daily.",
  "Tiny dinners, big serotonin.",
  "Make today delicious.",
  "Pasta la vista, bad days.",
  "Spice up your soft girl era.",
];
export function quoteOfDay() {
  const d = new Date();
  const i = (d.getFullYear() + d.getMonth() * 31 + d.getDate()) % DAILY_QUOTES.length;
  return DAILY_QUOTES[i];
}