# PlatePal AI 🌸

A soft, aesthetic, AI-powered recipe discovery app. Type ingredients you have at
home and get instant meal ideas, Pinterest-style recipe cards, and dreamy
cooking inspiration.

## Stack
- React + TanStack Start (Vite under the hood)
- Tailwind CSS v4
- Framer Motion
- React Icons
- TheMealDB (recipes) + OpenRouter (AI suggestions)
- LocalStorage caching + favorites

## Run locally
```
bun install
bun dev
```

## Environment
Copy `.env.example` to `.env` and fill in:
```
VITE_OPENROUTER_API_KEY=sk-or-v1-...
```

## Pages
- `/` landing with trending dishes & categories
- `/discover` search recipes
- `/ai` AI ingredient → meal ideas
- `/categories` browse categories
- `/random` surprise recipe
- `/favorites` saved plates
- `/recipe/$id` recipe details

## Future backend
An `Express + MongoDB` backend can be added under `server/` to proxy AI calls,
sync favorites and host user recipes. The frontend works fully on its own.

Made with 🌸
# RoseRecipe