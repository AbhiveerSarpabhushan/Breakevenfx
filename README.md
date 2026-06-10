# BreakevenFX

The official website for **BreakevenFX** — a private day trading mentorship
program founded by **Abhiveer Sarpabhushan** (Cumming, GA). 200+ students across
10+ countries, launched in 2025.

Built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **TypeScript**.
Deploys cleanly to **Vercel**.

---

## What's inside

- **Homepage** (`/`) — a single-page scroll with anchor navigation:
  navbar, hero (with animated ticker tape), program overview, founder story
  timeline, student testimonials, and an application form.
- **Blog index** (`/blog`) — a responsive grid of posts.
- **Blog posts** (`/blog/[slug]`) — dynamic routes rendered from `lib/posts.ts`,
  each with SEO metadata via `generateMetadata`.

---

## Run it locally

You need **Node 18.17+** (Node 20+ recommended).

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build locally
```

---

## Configuration you'll want to change

### 1. Formspree form ID (the application form)

The application form posts to [Formspree](https://formspree.io). Create a form
there, then open:

- **File:** `components/ApplicationForm.tsx`
- **Line:** the `FORMSPREE_ENDPOINT` constant near the top of the file

```ts
// Replace REPLACE_WITH_YOUR_ID with your actual Formspree form ID
const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_ID";
```

Swap `REPLACE_WITH_YOUR_ID` for your real Formspree ID (e.g. `xyzabcd`). That's
the only change needed — submissions will then land in your Formspree inbox.

### 2. Twitter/X and Discord links (the footer)

Open `components/Footer.tsx` and look for these two comments:

```tsx
{/* Add Twitter/X URL when available */}
<a href="#" ... >

{/* Add Discord URL when available */}
<a href="#" ... >
```

Replace each `href="#"` with the real URL. The Instagram link is already wired
to `https://instagram.com/abhiveersarpabhushan`.

---

## Adding a new blog post

All posts live in **`lib/posts.ts`** as objects in the `posts` array. To add one,
copy an existing object and fill in the fields:

```ts
{
  slug: "your-url-slug",          // becomes /blog/your-url-slug — must be unique
  title: "Your Post Title",
  date: "April 1, 2026",
  category: "Mindset",            // shown as the orange tag
  excerpt: "A two-sentence summary shown on the blog index card.",
  content: [
    "First paragraph...",
    "Second paragraph...",
    // each string in this array renders as its own <p>
  ],
}
```

The blog index (`/blog`) and the individual post page (`/blog/[slug]`) pick it
up automatically — no other files to touch. `generateStaticParams` will also
pre-render the new route at build time.

---

## Design system (quick reference)

Brand colors are defined in `tailwind.config.ts` under `theme.extend.colors`:

| Token                | Hex       | Use                          |
| -------------------- | --------- | ---------------------------- |
| `brand-orange`       | `#E8640C` | Primary accent / CTAs        |
| `brand-green`        | `#2D5A3D` | Secondary accent             |
| `brand-green-light`  | `#4A7C59` | Hover borders                |
| `brand-navy`         | `#0D1117` | Page background              |
| `brand-navy-2`       | `#0F1923` | Cards / alternating sections |
| `brand-navy-3`       | `#162032` | Inputs                       |
| `brand-border`       | `#1E2D3D` | Borders / dividers           |
| `brand-white`        | `#F0EDE8` | Primary text (warm white)    |
| `brand-muted`        | `#8A9BB0` | Secondary text               |
| `brand-red`          | `#C0444A` | Negative ticks / form errors |

Fonts are loaded via `next/font/google` in `app/layout.tsx`:
**Playfair Display** (display/headings), **Inter** (body), **JetBrains Mono**
(stats, ticker, dates).

---

## Project structure

```
breakevenfx/
  app/
    layout.tsx            # root layout, fonts, global metadata
    page.tsx              # homepage (assembles all sections)
    globals.css           # Tailwind + global styles
    blog/
      page.tsx            # blog index
      [slug]/page.tsx     # dynamic blog post
  components/
    Navbar.tsx
    Hero.tsx
    TickerTape.tsx
    AboutProgram.tsx
    FounderStory.tsx
    Testimonials.tsx
    ApplicationForm.tsx
    Footer.tsx
  lib/
    posts.ts              # blog content source
  public/
  tailwind.config.ts
  next.config.mjs         # Next 14 uses .mjs (next.config.ts needs Next 15+)
  package.json
```

---

## Deploying to Vercel

```bash
npx vercel
```

Follow the prompts to link/create the project. Vercel auto-detects Next.js — no
extra configuration required. Set up your Formspree ID (above) before going live
so the application form works in production.

---

_Built by a trader, for traders._
