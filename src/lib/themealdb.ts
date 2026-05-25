import { cachedFetch } from "./cache";

const BASE = "https://www.themealdb.com/api/json/v1/1";

export type Meal = {
  idMeal: string;
  strMeal: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strMealThumb: string;
  strYoutube?: string;
  strTags?: string | null;
  [k: string]: unknown;
};

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

async function get<T>(path: string): Promise<T> {
  return cachedFetch(path, async () => {
    const r = await fetch(`${BASE}/${path}`);
    return (await r.json()) as T;
  });
}

export const tmdb = {
  searchByName: (q: string) =>
    get<{ meals: Meal[] | null }>(`search.php?s=${encodeURIComponent(q)}`),
  lookup: (id: string) => get<{ meals: Meal[] | null }>(`lookup.php?i=${id}`),
  random: () => {
    // bypass cache so users get fresh randoms
    return fetch(`${BASE}/random.php`).then((r) => r.json() as Promise<{ meals: Meal[] }>);
  },
  categories: () => get<{ categories: Category[] }>(`categories.php`),
  filterByIngredient: (i: string) =>
    get<{ meals: { idMeal: string; strMeal: string; strMealThumb: string }[] | null }>(
      `filter.php?i=${encodeURIComponent(i)}`,
    ),
  filterByCategory: (c: string) =>
    get<{ meals: { idMeal: string; strMeal: string; strMealThumb: string }[] | null }>(
      `filter.php?c=${encodeURIComponent(c)}`,
    ),
  filterByArea: (a: string) =>
    get<{ meals: { idMeal: string; strMeal: string; strMealThumb: string }[] | null }>(
      `filter.php?a=${encodeURIComponent(a)}`,
    ),
  ingredients: () =>
    get<{ meals: { idIngredient: string; strIngredient: string; strDescription?: string }[] }>(
      `list.php?i=list`,
    ),
};

export function extractIngredients(meal: Meal): { name: string; measure: string }[] {
  const out: { name: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = (meal[`strIngredient${i}`] as string) || "";
    const measure = (meal[`strMeasure${i}`] as string) || "";
    if (name && name.trim()) out.push({ name: name.trim(), measure: (measure || "").trim() });
  }
  return out;
}