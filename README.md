# Agun Gunawan — Portfolio

Personal portfolio website built with Next.js 15 and deployed to Netlify.

🌐 **Live site:** [https://agun-gunawan.vercel.app](https://agun-gunawan.vercel.app)

## Tech Stack

- **Framework:** Next.js 15 (static export)
- **UI:** shadcn/ui + Tailwind CSS v4
- **Fonts:** Inter, Plus Jakarta Sans, JetBrains Mono (via `next/font`)
- **Deployment:** Netlify (auto-deploy on push to `main`)

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

## Build

```bash
npm run build
```

Produces a static export in the `/out/` directory — this is the Netlify publish target.

## Deployment

This site auto-deploys to Netlify on every push to `main`. Build configuration is in `netlify.toml`.
