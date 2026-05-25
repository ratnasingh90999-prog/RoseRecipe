import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { tmdb, type Category } from "@/lib/themealdb";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeSkeletonGrid } from "@/components/Loader";

export const Route = createFileRoute("/categories")({ component: Categories });

function Categories() {
  const [cats, setCats] = useState<Category[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [meals, setMeals] = useState<{ idMeal: string; strMeal: string; strMealThumb: string }[] | null>(null);

  useEffect(() => {
    tmdb.categories().then((r) => {
      setCats(r.categories);
      if (!active && r.categories[0]) setActive(r.categories[0].strCategory);
    });
  }, []);

  useEffect(() => {
    if (!active) return;
    setMeals(null);
    tmdb.filterByCategory(active).then((r) => setMeals(r.meals || []));
  }, [active]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="text-xs uppercase tracking-[0.2em] text-rose-500/80">Categories</div>
      <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
        Pick a <span className="gradient-text">vibe</span>
      </h1>

      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-2">
        {cats.map((c) => (
          <button
            key={c.idCategory}
            onClick={() => setActive(c.strCategory)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              active === c.strCategory
                ? "gradient-button"
                : "glass text-rose-700"
            }`}
          >
            {c.strCategory}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8">
        {!meals ? (
          <RecipeSkeletonGrid />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {meals.map((m, i) => (
              <RecipeCard key={m.idMeal} meal={m} index={i} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}