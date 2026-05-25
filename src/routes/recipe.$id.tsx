import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiHeart, HiOutlineHeart, HiOutlineExternalLink, HiChevronLeft } from "react-icons/hi";
import { tmdb, extractIngredients, type Meal } from "@/lib/themealdb";
import { isFavorite, toggleFavorite } from "@/lib/favorites";

export const Route = createFileRoute("/recipe/$id")({ component: RecipeDetail });

function RecipeDetail() {
  const { id } = Route.useParams();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    tmdb.lookup(id).then((r) => {
      const m = r.meals?.[0] || null;
      setMeal(m);
      if (m) setFav(isFavorite(m.idMeal));
    });
  }, [id]);

  if (!meal) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="shimmer h-[420px] rounded-[32px]" />
      </div>
    );
  }

  const ingredients = extractIngredients(meal);
  const youtubeId = meal.strYoutube?.split("v=")[1];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <Link
        to="/discover"
        className="inline-flex items-center gap-1 text-sm text-rose-700 hover:text-rose-600"
      >
        <HiChevronLeft /> back
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 overflow-hidden rounded-[32px] bg-white shadow-2xl ring-1 ring-rose-100"
      >
        <div className="relative h-72 sm:h-[440px]">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/70 via-rose-900/10 to-transparent" />
          <button
            onClick={() => setFav(toggleFavorite(meal))}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/85 text-rose-500 backdrop-blur"
            aria-label="favorite"
          >
            {fav ? <HiHeart className="h-6 w-6" /> : <HiOutlineHeart className="h-6 w-6" />}
          </button>
          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
            <div className="flex flex-wrap gap-2">
              {meal.strCategory && (
                <span className="rounded-full bg-white/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-sm">
                  {meal.strCategory}
                </span>
              )}
              {meal.strArea && (
                <span className="rounded-full bg-white/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-sm">
                  {meal.strArea}
                </span>
              )}
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold drop-shadow sm:text-5xl">
              {meal.strMeal}
            </h1>
          </div>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-display text-xl font-bold">Ingredients</h2>
            <ul className="mt-4 space-y-2">
              {ingredients.map((ing) => (
                <li
                  key={ing.name}
                  className="flex items-center gap-3 rounded-2xl bg-rose-50/60 px-3 py-2"
                >
                  <img
                    src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(
                      ing.name,
                    )}-Small.png`}
                    alt=""
                    className="h-8 w-8 object-contain"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium capitalize">{ing.name}</div>
                    {ing.measure && (
                      <div className="text-xs text-rose-900/55">{ing.measure}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold">How to cook</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-rose-900/80 whitespace-pre-line">
              {meal.strInstructions}
            </div>

            {youtubeId && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full gradient-button px-5 py-3 text-sm font-semibold"
              >
                <HiOutlineExternalLink /> Watch tutorial
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}