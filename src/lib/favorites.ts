const KEY = "platepal:favorites";

export type FavMeal = { idMeal: string; strMeal: string; strMealThumb: string };

export function getFavorites(): FavMeal[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
export function isFavorite(id: string) {
  return getFavorites().some((m) => m.idMeal === id);
}
export function toggleFavorite(meal: FavMeal): boolean {
  const cur = getFavorites();
  const exists = cur.some((m) => m.idMeal === meal.idMeal);
  const next = exists ? cur.filter((m) => m.idMeal !== meal.idMeal) : [...cur, meal];
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("platepal:fav"));
  return !exists;
}