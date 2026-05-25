import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiArrowRight, HiSparkles } from "react-icons/hi";
import { tmdb, type Meal } from "@/lib/themealdb";
import { quoteOfDay } from "@/lib/quotes";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeSkeletonGrid } from "@/components/Loader";

export const Route = createFileRoute("/")({ component: Landing });

const HERO_CHIPS = ["egg", "tomato", "bread", "cheese", "chicken", "basil", "garlic", "pasta"];
const FEATURED_CATEGORIES = [
  { name: "Dessert", emoji: "🍰", grad: "from-pink-300 to-rose-400" },
  { name: "Pasta", emoji: "🍝", grad: "from-amber-300 to-orange-400" },
  { name: "Seafood", emoji: "🦐", grad: "from-sky-300 to-blue-400" },
  { name: "Vegetarian", emoji: "🥗", grad: "from-emerald-300 to-teal-400" },
  { name: "Breakfast", emoji: "🥞", grad: "from-yellow-300 to-amber-400" },
  { name: "Chicken", emoji: "🍗", grad: "from-rose-300 to-pink-400" },
];

function Landing() {
  const [trending, setTrending] = useState<Meal[]>([]);
  useEffect(() => {
    let alive = true;
    Promise.all([tmdb.random(), tmdb.random(), tmdb.random(), tmdb.random(), tmdb.random(), tmdb.random(), tmdb.random(), tmdb.random()])
      .then((rs) => {
        if (!alive) return;
        const map = new Map<string, Meal>();
        rs.forEach((r) => r.meals?.forEach((m) => map.set(m.idMeal, m)));
        setTrending(Array.from(map.values()).slice(0, 8));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      {/* Hero */}
      <section className="relative pt-6 sm:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid items-center gap-10 md:grid-cols-2"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-rose-600"
            >
              <HiSparkles className="h-3.5 w-3.5" /> AI-powered meal inspiration
            </motion.span>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl">
              Cook the <span className="gradient-text">prettiest</span>
              <br />
              meals of your week.
            </h1>
            <p className="mt-5 max-w-md text-base text-rose-900/65 sm:text-lg">
              Type what's in your fridge — get AI-curated recipes, healthy plates and Pinterest-worthy
              ideas in seconds. ✨
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/ai"
                className="group inline-flex items-center gap-2 rounded-full gradient-button px-7 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.03]"
              >
                What can I cook?
                <HiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/discover"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold text-rose-700"
              >
                Discover recipes
              </Link>
            </div>

            <p className="mt-7 text-xs uppercase tracking-widest text-rose-900/40">
              try with ingredients you love
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {HERO_CHIPS.map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="glass rounded-full px-3 py-1.5 text-xs font-medium text-rose-700"
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Floating gradient cards */}
          <div className="relative h-[420px] md:h-[520px]">
            <FloatingHeroCards />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 rounded-3xl glass px-6 py-4 text-center text-sm italic text-rose-900/70"
        >
          🌸 Quote of the day — “{quoteOfDay()}”
        </motion.div>
      </section>

      {/* Categories */}
      <section className="mt-20">
        <SectionHeader
          eyebrow="Explore"
          title="Categories that match your mood"
          link="/categories"
          linkLabel="All categories"
        />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {FEATURED_CATEGORIES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <Link
                to="/categories"
                className={`relative block overflow-hidden rounded-3xl bg-gradient-to-br ${c.grad} p-5 text-white shadow-lg ring-1 ring-white/40`}
              >
                <div className="text-4xl drop-shadow-md">{c.emoji}</div>
                <div className="mt-6 font-display text-lg font-semibold">{c.name}</div>
                <div className="absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-white/20 blur-2xl" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mt-20">
        <SectionHeader
          eyebrow="Trending today"
          title="Aesthetic dishes on rotation"
          link="/discover"
          linkLabel="See more"
        />
        <div className="mt-8">
          {trending.length === 0 ? (
            <RecipeSkeletonGrid />
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {trending.map((m, i) => (
                <RecipeCard key={m.idMeal} meal={m} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  link,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  link: string;
  linkLabel: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-rose-500/80">{eyebrow}</div>
        <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">{title}</h2>
      </div>
      <Link
        to={link}
        className="hidden shrink-0 rounded-full glass px-4 py-2 text-sm font-semibold text-rose-700 hover:text-rose-600 sm:inline-flex"
      >
        {linkLabel} →
      </Link>
    </div>
  );
}

function FloatingHeroCards() {
  const cards = [
    {
      title: "Strawberry pancakes",
      tag: "Breakfast",
      grad: "from-rose-300 via-pink-300 to-rose-400",
      emoji: "🥞",
      pos: "top-0 left-2 md:left-6",
      rot: "-rotate-6",
      delay: 0,
    },
    {
      title: "Peach burrata salad",
      tag: "Healthy",
      grad: "from-orange-200 via-amber-300 to-rose-300",
      emoji: "🥗",
      pos: "top-20 right-0 md:right-4",
      rot: "rotate-3",
      delay: 0.4,
    },
    {
      title: "Lavender latte",
      tag: "Cozy",
      grad: "from-purple-300 via-fuchsia-300 to-pink-300",
      emoji: "☕",
      pos: "bottom-4 left-10 md:left-20",
      rot: "rotate-6",
      delay: 0.8,
    },
  ];
  return (
    <>
      {cards.map((c) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 40, rotate: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: c.delay, duration: 0.8, ease: "easeOut" }}
          className={`absolute ${c.pos} floaty`}
          style={{ animationDelay: `${c.delay}s` }}
        >
          <div
            className={`w-56 ${c.rot} rounded-[28px] bg-gradient-to-br ${c.grad} p-5 text-white shadow-2xl ring-1 ring-white/30`}
          >
            <div className="flex items-start justify-between">
              <span className="rounded-full bg-white/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm">
                {c.tag}
              </span>
              <span className="text-3xl drop-shadow">{c.emoji}</span>
            </div>
            <div className="mt-12 font-display text-xl font-bold leading-tight drop-shadow">
              {c.title}
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-white/90">
              <span>✦ AI curated</span>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}
