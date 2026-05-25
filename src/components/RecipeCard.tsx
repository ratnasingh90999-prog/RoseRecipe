import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite, type FavMeal } from "@/lib/favorites";

export function RecipeCard({
  meal,
  index = 0,
}: {
  meal: FavMeal & { strCategory?: string; strArea?: string };
  index?: number;
}) {
  const [fav, setFav] = useState(false);
  useEffect(() => {
    setFav(isFavorite(meal.idMeal));
    const h = () => setFav(isFavorite(meal.idMeal));
    window.addEventListener("platepal:fav", h);
    return () => window.removeEventListener("platepal:fav", h);
  }, [meal.idMeal]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      <Link
        to="/recipe/$id"
        params={{ id: meal.idMeal }}
        className="block overflow-hidden rounded-[28px] bg-white shadow-[0_18px_50px_-20px_rgba(255,122,162,0.4)] ring-1 ring-rose-100/60 transition-shadow hover:shadow-[0_22px_60px_-18px_rgba(255,122,162,0.55)]"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/55 via-rose-900/0 to-transparent" />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const next = toggleFavorite(meal);
              setFav(next);
            }}
            aria-label="favorite"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-rose-500 backdrop-blur-md transition-transform hover:scale-110"
          >
            {fav ? <HiHeart className="h-5 w-5" /> : <HiOutlineHeart className="h-5 w-5" />}
          </button>
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            {(meal.strCategory || meal.strArea) && (
              <div className="mb-1 flex flex-wrap gap-1.5">
                {meal.strCategory && (
                  <span className="rounded-full bg-white/25 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider backdrop-blur-sm">
                    {meal.strCategory}
                  </span>
                )}
                {meal.strArea && (
                  <span className="rounded-full bg-white/25 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider backdrop-blur-sm">
                    {meal.strArea}
                  </span>
                )}
              </div>
            )}
            <h3 className="font-display text-lg font-semibold leading-tight drop-shadow">
              {meal.strMeal}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}