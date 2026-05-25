import { cachedFetch } from "./cache";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;

const MODEL = "nvidia/nemotron-3-super-120b-a12b:free";

export type AIMealIdea = {
  title: string;
  description: string;
  tags: string[];
  tips: string[];
};

const SYSTEM = `You are RoséRecipe AI, an aesthetic, friendly meal-inspiration assistant.
You ONLY respond with valid minified JSON — no prose, no markdown. Schema:
{"ideas":[{"title":string,"description":string,"tags":string[],"tips":string[]}]}
Give 5 short, vivid, Pinterest-worthy meal ideas. tags are 2-4 short words like
"quick","cozy","high-protein". tips are 2-3 micro cooking tips (max 8 words each).`;

async function callOpenRouter(userPrompt: string): Promise<string> {
  const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
      "HTTP-Referer": typeof window !== "undefined" ? window.location.origin : "",
      "X-Title": "RoséRecipe",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.85,
    }),
  });
  if (!r.ok) throw new Error(`OpenRouter ${r.status}`);
  const j = await r.json();
  return j.choices?.[0]?.message?.content ?? "";
}

function parseIdeas(raw: string): AIMealIdea[] {
  let txt = raw.trim();
  const fence = txt.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) txt = fence[1].trim();
  const start = txt.indexOf("{");
  const end = txt.lastIndexOf("}");
  if (start >= 0 && end > start) txt = txt.slice(start, end + 1);
  try {
    const j = JSON.parse(txt);
    if (Array.isArray(j.ideas)) return j.ideas;
  } catch {
    /* fall through */
  }
  return [];
}

export async function suggestMeals(ingredients: string[]): Promise<AIMealIdea[]> {
  const key = `ai:${ingredients.slice().sort().join(",").toLowerCase()}`;
  return cachedFetch(key, async () => {
    const prompt =
      ingredients.length === 0
        ? "Suggest 5 trending, aesthetic, quick meals anyone can cook this week."
        : `Suggest 5 quick, aesthetic meals using these ingredients: ${ingredients.join(
            ", ",
          )}. Mix healthy and student-friendly options.`;
    const raw = await callOpenRouter(prompt);
    const ideas = parseIdeas(raw);
    if (!ideas.length) throw new Error("AI returned no ideas");
    return ideas;
  });
}