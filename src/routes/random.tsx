import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiRefresh } from "react-icons/hi";
import { tmdb, type Meal } from "@/lib/themealdb";

export const Route = createFileRoute("/random")({ component: RandomPage });

function RandomPage() {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(false);

  const roll = async () => {
    setLoading(true);
    try {
      const r = await tmdb.random();
      setMeal(r.meals?.[0] || null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    roll();
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <div className="text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-rose-500/80">Surprise me</div>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
          Roll a <span className="gradient-text">random plate</span>
        </h1>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={roll}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full gradient-button px-7 py-3.5 text-sm font-semibold disabled:opacity-60"
        >
          <HiRefresh className={loading ? "animate-spin" : ""} />
          {loading ? "Rolling…" : "Roll again"}
        </button>
      </div>

      <div className="mt-10">
        {!meal ? (
          <div className="shimmer h-96 rounded-[32px]" />
        ) : (
          <motion.div
            key={meal.idMeal}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="overflow-hidden rounded-[32px] bg-white shadow-2xl ring-1 ring-rose-100"
          >
            <div className="relative h-72 sm:h-96">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="text-xs uppercase tracking-widest text-white/80">
                  {meal.strCategory} · {meal.strArea}
                </div>
                <h2 className="mt-1 font-display text-3xl font-bold drop-shadow">{meal.strMeal}</h2>
              </div>
            </div>
            <div className="p-6 text-center">
              <Link
                to="/recipe/$id"
                params={{ id: meal.idMeal }}
                className="inline-flex rounded-full gradient-button px-6 py-3 text-sm font-semibold"
              >
                See full recipe
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}