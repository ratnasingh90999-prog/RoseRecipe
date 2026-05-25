import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineSearch } from "react-icons/hi";
import { tmdb, type Meal } from "@/lib/themealdb";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeSkeletonGrid } from "@/components/Loader";

export const Route = createFileRoute("/discover")({ component: Discover });

const SEEDS = ["chicken", "pasta", "salmon", "beef", "rice", "egg", "cheese", "tomato"];

function Discover() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState<Meal[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeSeed, setActiveSeed] = useState<string | null>("chicken");

  useEffect(() => {
    if (!activeSeed) return;
    setLoading(true);
    tmdb.searchByName(activeSeed)
      .then((r) => setMeals(r.meals || []))
      .finally(() => setLoading(false));
  }, [activeSeed]);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setActiveSeed(null);
    setLoading(true);
    tmdb.searchByName(query.trim())
      .then((r) => setMeals(r.meals || []))
      .finally(() => setLoading(false));
  };

  const empty = useMemo(() => meals !== null && meals.length === 0, [meals]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="text-xs uppercase tracking-[0.2em] text-rose-500/80">Discover</div>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
          Find your next <span className="gradient-text">favorite plate</span>
        </h1>
      </motion.div>

      <form onSubmit={onSearch} className="glass flex items-center gap-3 rounded-full px-5 py-3">
        <HiOutlineSearch className="h-5 w-5 text-rose-500" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search meals, cuisines, ingredients…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-rose-900/40"
        />
        <button
          type="submit"
          className="rounded-full gradient-button px-5 py-2 text-sm font-semibold"
        >
          Search
        </button>
      </form>

      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-2">
        {SEEDS.map((s) => (
          <button
            key={s}
            onClick={() => {
              setQuery("");
              setActiveSeed(s);
            }}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-all ${
              activeSeed === s
                ? "gradient-button"
                : "glass text-rose-700 hover:text-rose-600"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {loading || meals === null ? (
          <RecipeSkeletonGrid />
        ) : empty ? (
          <EmptyState query={query || activeSeed || ""} />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {meals.map((m, i) => (
              <RecipeCard key={m.idMeal} meal={m} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <div className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full glass text-4xl">
        🍽️
      </div>
      <h3 className="font-display text-2xl font-bold">No matches for "{query}"</h3>
      <p className="mt-2 text-sm text-rose-900/60">
        Try a different ingredient or browse a category instead.
      </p>
    </div>
  );
}