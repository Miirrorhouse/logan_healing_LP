# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

**Always build in code.** Do not use Pencil or `.pen` files unless explicitly asked.

## Development Commands

- `pnpm dev    # starts on port 4321
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm format` - Format with Prettier

Before committing, run lint then build.

## Tech Stack

- **Framework**: Astro 5 + React + TypeScript + Tailwind
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS + DaisyUI (check package.json for Tailwind version — do not mix v3/v4 syntax)
- **Icons**: `@phosphor-icons/react` — use this, not Lucide
- **Animation**: `framer-motion` — use for all motion (spring physics, layout transitions, hover)
- **State**: Zustand (global) + TanStack Query (server state)
- **Database**: Supabase (auth, database, storage)
- **Package Manager**: pnpm

## Directory Structure

```
app/              # Next.js App Router pages and layouts
components/       # Reusable UI components
  buttons/
  cards/
  forms/
  modals/
features/         # Feature modules (co-located components, hooks, stores)
data-access/      # API/database functions organized by entity
hooks/            # Shared React hooks
stores/           # Zustand global stores
libs/             # External service clients (Supabase, Stripe, etc.)
types/            # TypeScript type definitions
utils/            # Pure utility functions
public/           # Static assets
```

## Architecture Rules

- Default to **Server Components**. Only use `'use client'` for interactive leaf components.
- Features go in `features/[name]/` with co-located components, hooks, and stores.
- Data fetching lives in `data-access/`. Hooks in `hooks/` wrap data-access functions.
- Global state in `stores/`. Server state via TanStack Query.
- No CSS-in-JS. No custom stylesheets. TailwindCSS classes only.

## Component Patterns

- Functional components with arrow functions
- TypeScript interfaces for all props — no `any`
- `handle<Event>` naming for event handlers
- Early returns to avoid deep nesting
- Always implement: loading state, empty state, error state
- Always add accessibility: `aria-*`, `tabindex`, semantic HTML
- Validate all user inputs (client + server)

## Design System (@taste)

Reference `@taste.md` for UI generation rules. Key rules always active:

- DaisyUI is installed but **do not use DaisyUI default component classes** (`btn`, `card`, `badge`, etc.) — they conflict with the premium aesthetic from `@taste` and `@soft`. Use raw Tailwind classes instead.

- Use `min-h-[100dvh]` never `h-screen`
- Use CSS Grid over flex percentage math
- Max page width: `max-w-[1400px] mx-auto` or `max-w-7xl`
- Fonts: Geist, Outfit, Cabinet Grotesk, or Satoshi — NOT Inter
- Max 1 accent color, saturation < 80%
- No neon gradients. Neutral base (Zinc/Slate) + single accent.
- Hardware-accelerate only `transform` and `opacity`
- Buttons need tactile feedback: `scale-[0.98]` on `:active`

## Code Quality

- Functions under 50 lines, files under 800 lines, nesting under 4 levels
- No `console.log` in committed code
- Error boundaries and meaningful fallback UI
- Break UI into reusable, composable components
