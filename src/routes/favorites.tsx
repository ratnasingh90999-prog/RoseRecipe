import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getFavorites, type FavMeal } from "@/lib/favorites";
import { RecipeCard } from "@/components/RecipeCard";

export const Route = createFileRoute("/favorites")({ component: Favorites });

function Favorites() {
  const [favs, setFavs] = useState<FavMeal[]>([]);
  useEffect(() => {
    const refresh = () => setFavs(getFavorites());
    refresh();
    window.addEventListener("platepal:fav", refresh);
    return () => window.removeEventListener("platepal:fav", refresh);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="text-xs uppercase tracking-[0.2em] text-rose-500/80">Loved</div>
      <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
        Your <span className="gradient-text">saved plates</span>
      </h1>

      <div className="mt-8">
        {favs.length === 0 ? (
          <div className="mx-auto max-w-md py-16 text-center">
            <div className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full glass text-4xl">
              💝
            </div>
            <h3 className="font-display text-2xl font-bold">No favorites yet</h3>
            <p className="mt-2 text-sm text-rose-900/60">
              Tap the heart on any recipe to save it here.
            </p>
            <Link
              to="/discover"
              className="mt-6 inline-flex rounded-full gradient-button px-6 py-3 text-sm font-semibold"
            >
              Discover recipes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {favs.map((m, i) => (
              <RecipeCard key={m.idMeal} meal={m} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}