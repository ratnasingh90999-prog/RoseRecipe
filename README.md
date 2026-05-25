# RoseRecipe 🌸

A soft, aesthetic, AI-powered recipe discovery app. Type ingredients you have at
home and get instant meal ideas, Pinterest-style recipe cards, and dreamy
cooking inspiration.

## Stack
- React + TanStack Start (Vite under the hood)
- Tailwind CSS v4
- Framer Motion
- React Icons
- TheMealDB (recipes) + OpenRouter (AI suggestions)
- Node.js + Express (Backend API)
- MongoDB + Mongoose (Database)
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

## Backend Stack
The application uses an `Express + MongoDB` backend architecture located in the `server/` directory to manage recipes, proxy API calls, and sync user favorites securely.
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Routing:** RESTful API architecture

Made with 🌸
# RoseRecipe
