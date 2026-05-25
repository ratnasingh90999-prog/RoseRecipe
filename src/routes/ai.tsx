import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { HiOutlineSparkles, HiPlus } from "react-icons/hi";
import { IngredientChip } from "@/components/IngredientChip";
import { suggestMeals, type AIMealIdea } from "@/lib/openrouter";

export const Route = createFileRoute("/ai")({ component: AISuggestions });

const SUGGESTED = [
  "egg",
  "bread",
  "tomato",
  "cheese",
  "chicken",
  "garlic",
  "onion",
  "rice",
  "pasta",
  "spinach",
  "mushroom",
  "lemon",
];

function AISuggestions() {
  const [ingredients, setIngredients] = useState<string[]>(["egg", "tomato", "cheese"]);
  const [input, setInput] = useState("");
  const [ideas, setIdeas] = useState<AIMealIdea[] | null>(null);
  const [loading, setLoading] = useState(false);

  const add = (raw: string) => {
    const v = raw.trim().toLowerCase();
    if (!v || ingredients.includes(v)) return;
    setIngredients((p) => [...p, v]);
    setInput("");
  };

  const cook = async () => {
    setLoading(true);
    setIdeas(null);
    try {
      const result = await suggestMeals(ingredients);
      setIdeas(result);
    } catch (e) {
      console.error(e);
      toast.error("AI is shy right now — try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-xs uppercase tracking-[0.2em] text-rose-500/80">AI cook</div>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
          What's in your <span className="gradient-text">kitchen?</span>
        </h1>
        <p className="mt-3 max-w-xl text-rose-900/65">
          Drop your ingredients and let RoséRecipe AI invent dreamy, balanced meal ideas just for you.
        </p>
      </motion.div>

      <div className="mt-8 rounded-[32px] glass p-6 sm:p-8">
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {ingredients.map((i) => (
              <IngredientChip
                key={i}
                label={i}
                active
                onRemove={() => setIngredients((p) => p.filter((x) => x !== i))}
              />
            ))}
          </AnimatePresence>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            add(input);
          }}
          className="mt-5 flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 ring-1 ring-rose-100"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="add an ingredient…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-rose-900/40"
          />
          <button
            type="submit"
            className="grid h-9 w-9 place-items-center rounded-full gradient-button"
          >
            <HiPlus />
          </button>
        </form>

        <div className="mt-4">
          <div className="mb-2 text-[11px] uppercase tracking-widest text-rose-500/70">
            Quick add
          </div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED.filter((s) => !ingredients.includes(s)).map((s) => (
              <IngredientChip key={s} label={s} onClick={() => add(s)} />
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            onClick={cook}
            className="inline-flex items-center gap-2 rounded-full gradient-button px-7 py-3.5 text-sm font-semibold disabled:opacity-60"
          >
            <HiOutlineSparkles className="h-4 w-4" />
            {loading ? "Whisking ideas…" : "What can I cook?"}
          </motion.button>
        </div>
      </div>

      <div className="mt-10">
        {loading && <SkeletonIdeas />}
        {ideas && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea, i) => (
              <IdeaCard key={i} idea={idea} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const GRADIENTS = [
  "from-rose-300 to-pink-400",
  "from-amber-300 to-rose-400",
  "from-purple-300 to-fuchsia-400",
  "from-orange-300 to-rose-400",
  "from-pink-300 to-rose-500",
  "from-fuchsia-300 to-rose-400",
];

function IdeaCard({ idea, index }: { idea: AIMealIdea; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 120 }}
      className="group relative overflow-hidden rounded-[28px] bg-white p-5 shadow-xl ring-1 ring-rose-100/60"
    >
      <div
        className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${
          GRADIENTS[index % GRADIENTS.length]
        } opacity-40 blur-2xl transition-opacity group-hover:opacity-70`}
      />
      <div className="relative">
        <div
          className={`mb-3 inline-block rounded-full bg-gradient-to-br ${
            GRADIENTS[index % GRADIENTS.length]
          } px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white`}
        >
          Idea #{index + 1}
        </div>
        <h3 className="font-display text-xl font-bold leading-tight">{idea.title}</h3>
        <p className="mt-2 text-sm text-rose-900/65">{idea.description}</p>
        {idea.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {idea.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-rose-100/70 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rose-700"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        {idea.tips?.length > 0 && (
          <ul className="mt-4 space-y-1.5 border-t border-rose-100 pt-3 text-xs text-rose-900/70">
            {idea.tips.map((t, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-rose-400">✦</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

function SkeletonIdeas() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="shimmer h-56 rounded-[28px]" />
      ))}
    </div>
  );
}